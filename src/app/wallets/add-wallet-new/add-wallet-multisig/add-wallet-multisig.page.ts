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
  pk;
  supportedCoins: any[];
  messageError: any;
  isCustomeName = false;
  isCurrencyType = false;
  isPrivateKey = false;
  isCustomName;
  constructor(
    private router: Router,
    private storage: Storage,) { }

  ngOnInit() {
    this.storage.remove('address-signer');
    this.supportedCoins = Object.values(SUPPORTED_COINS);
  }

  selectCoin() {
    if (!this.showSelect) {
      this.showSelect = true;
    }
    else {
      this.showSelect = false;
    }
  }
  onCustomName($event) {
    this.isCustomName = $event.target.value;
    if (this.isCustomName) {
      this.isCustomeName = true;

    }
    else{
      this.isCustomeName = false;
    }

    this.checkRequired();
  }
  chooseCoin(coinSelect) {
    this.showCoin = true;
    this.coin = coinSelect.name;
    this.showSelect = false;
    this.isCurrencyType = true;
    this.checkRequired();
  }
  onPrivateKey($event) {
    this.pk = $event.target.value;
    if (this.pk) {
      this.isPrivateKey = true;
    }
    else{
      this.isPrivateKey = false;
    }
    this.checkRequired();
  }

  async continue() {
    await this.storage.set('address-signer', { selectedCoin: this.coin.id });
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
  generateHexString() {
    const randomString = Crypto.randomBytes(32).toString('hex');
    return randomString
  }
}
