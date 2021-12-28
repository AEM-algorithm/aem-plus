import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from "@ionic/storage";
import { Crypto } from 'symbol-sdk';
import { SUPPORTED_COINS } from '@app/constants/constants';
import { Coin } from '@app/enums/enums';
import { WalletProvider } from '@app/services/wallets/wallet.provider';
import { BitcoinProvider } from '@app/services/bitcoin/bitcoin.provider';
import { SymbolProvider } from '@app/services/symbol/symbol.provider';
import { NemProvider } from '@app/services/nem/nem.provider';

@Component({
  selector: 'app-add-wallet-multisig',
  templateUrl: './add-wallet-multisig.page.html',
  styleUrls: ['./add-wallet-multisig.page.scss'],
})
export class AddWalletMultisigPage implements OnInit {
  showSelect = false;
  showCoin = false;
  coin: any;
  isShowBtn = false;
  error = false;
  privateKey;
  supportedCoins: any[];
  messageError: any;
  isCustomeName = false;
  isCurrencyType = false;
  isPrivateKey = false;
  isCustomName;
  constructor(
    private router: Router,
    private storage: Storage,
    private wallet: WalletProvider,
    private bitcoin: BitcoinProvider,
    private symbol: SymbolProvider,
    private nem: NemProvider,
  ) { }

  ngOnInit() {
    this.storage.remove('address-signer');
    this.supportedCoins = Object.values(SUPPORTED_COINS);
  }

  selectCoin() {
    this.showSelect = !this.showSelect;
  }

  onCustomName($event) {
    this.isCustomName = $event.target.value;
    this.isCustomeName = !!this.isCustomName;
    this.checkRequired();
  }

  chooseWalletType(coinSelect) {
    this.coin = coinSelect;
    this.showCoin = true;
    this.showSelect = false;
    this.isCurrencyType = true;
    this.isPrivateKey = this.checkValidPrivateKey();
    this.checkRequired();
  }
  onPrivateKey($event) {
    this.privateKey = $event.target.value;
    this.isPrivateKey = this.checkValidPrivateKey();
    this.checkRequired();
  }

  async continue() {
    const encryptedPin = await this.storage.get('pin');
    const encryptedPrivateKey = WalletProvider.encrypt(this.privateKey, encryptedPin);
    await this.storage.set('address-signer', { name: this.isCustomName, selectedCoin: this.coin.id, privateKey: encryptedPrivateKey});
    this.error = false;
    this.router.navigateByUrl('/tabnav/wallets/add-wallet-new/add-wallet-multisig/add-signer');
  }
  checkRequired() {
    if (this.isCustomeName && this.isCurrencyType && this.isPrivateKey) {
      this.isShowBtn = true;
    }
    else{
      this.isShowBtn = false;
    }

  }

  public checkValidPrivateKey(): boolean {
    if (!this.coin?.id) return false;
    let result = false;
    switch (this.coin.id) {
      case Coin.BITCOIN:
        result = this.bitcoin.isValidPrivateKey(this.privateKey);
        break;
      case Coin.NEM:
        result = this.nem.isValidPrivateKey(this.privateKey);
        break;
      case Coin.SYMBOL:
        result = this.symbol.isValidPrivateKey(this.privateKey);
        break;
      default:
        result = false;
    }
    return result;
  }
}
