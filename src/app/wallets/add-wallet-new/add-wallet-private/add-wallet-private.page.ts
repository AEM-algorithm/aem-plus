import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { AlertProvider } from 'src/app/services/alert/alert.provider';
import { PinProvider } from 'src/app/services/pin/pin.provider';
import { WalletProvider } from 'src/app/services/wallets/wallet.provider';

import { CoinInfo, SUPPORTED_COINS } from '@app/constants/constants';
import { Coin } from '@app/enums/enums';
import { BitcoinProvider } from '@app/services/bitcoin/bitcoin.provider';
import { BnbProvider } from '@app/services/bnb/bnb.provider';
import { EthersProvider } from '@app/services/ethers/ethers.provider';
import { NemProvider } from '@app/services/nem/nem.provider';
import { SymbolProvider } from '@app/services/symbol/symbol.provider';
import { NavController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
@Component({
  selector: 'app-add-wallet-private',
  templateUrl: './add-wallet-private.page.html',
  styleUrls: ['./add-wallet-private.page.scss'],
})
export class AddWalletPrivatePage implements OnInit {
  importForm: FormGroup;
  importFormData: {
    coinType: Coin;
    privateKey: string;
    walletName: string;
  };
  custom_name;
  selectedCoin: CoinInfo;
  showSelect = false;
  showCoin = false;
  supportedCoins: any[];
  error = false;
  enumCoin: Coin;
  messageError: any;
  credentials = {
    address: '',
    username: '',
    privateKey: '',
  };
  showBtnSave = false;
  coin: any;
  privateKey: any;
  pk;
  checkCurrentType = false;
  checkPrivateKey = false;
  checkCN = false;

  constructor(
    private storage: Storage,
    private pinProvider: PinProvider,
    private walletProvider: WalletProvider,
    private bitcoin: BitcoinProvider,
    private nem: NemProvider,
    private symbol: SymbolProvider,
    private ethers: EthersProvider,
    private alertProvider: AlertProvider,
    public navCtrl: NavController,
    private bnb: BnbProvider,
    private router: Router
  ) {}

  async ionViewWillEnter() {
    this.supportedCoins = SUPPORTED_COINS;
  }

  ngOnInit() {}

  selectCoin() {
    this.showSelect = !this.showSelect;
  }

  async chooseCoin(coinSelect: CoinInfo) {
    this.credentials.address = null;
    this.selectedCoin = coinSelect;
    this.showCoin = true;
    this.showSelect = false;
    this.checkCurrentType = true;
    if (this.pk) {
      this.onCheckPrivateKey(this.pk);
    }
    this.checkRequired();
  }

  goToWalletsPage() {
    const navigationExtras: NavigationExtras = {
      queryParams: { reload: true },
      replaceUrl: true,
    };
    this.router.navigate(['/tabnav/wallets'], navigationExtras);
  }

  async continue() {
    this.storage.remove('address-signer');
    this.error = false;
    const pin = await this.pinProvider.showEnterPinAddAddress();
    if (pin) {
      const isValidPin = await this.walletProvider.isValidPin(pin);
      if (isValidPin) {
        let generateWallet =
          await this.walletProvider.generateWalletFromPrivateKey(
            this.pk,
            pin,
            this.selectedCoin.id,
            this.custom_name,
            false
          );
        if (generateWallet) {
          this.goToWalletsPage();
        } else {
          this.messageError = 'Add new wallet fail';
          this.error = true;
        }
      } else {
        this.alertProvider.showIncorrectPassword();
      }
    }
  }

  isValidPrivateKey(updatedPrivateKey: string) {
    if (!this.selectedCoin) return false;
    let result: boolean = false;
    switch (this.selectedCoin.id) {
      case Coin.BITCOIN:
        result = this.bitcoin.isValidPrivateKey(updatedPrivateKey);
        if (result) {
          this.credentials.address = this.bitcoin.createPrivateKeyWallet(
            updatedPrivateKey,
            '1111'
          ).address;
        }
        break;
      case Coin.NEM:
        result = this.nem.isValidPrivateKey(updatedPrivateKey);
        if (result) {
          this.credentials.address = this.nem
            .createPrivateKeyWallet('nem', updatedPrivateKey, 'nemWallet')
            .address.pretty();
        }
        break;
      case Coin.SYMBOL:
        result = this.symbol.isValidPrivateKey(updatedPrivateKey);
        if (result) {
          this.credentials.address = this.symbol
            .createPrivateKeyWallet('symbol', updatedPrivateKey, 'symbolWallet')
            .address.pretty();
        }
        break;
      case Coin.ETH:
        result = this.ethers.isValidPrivateKey(updatedPrivateKey);
        if (result) {
          this.ethers
            .createPrivateKeyWallet(updatedPrivateKey)
            .getAddress()
            .then((address) => (this.credentials.address = address));
        }
        break;
      case Coin.BNB:
        let bnbAddress =
          this.bnb.getBnbAddressFromPrivateKey(updatedPrivateKey);
        result = this.bnb.isValidPrivateKey(updatedPrivateKey);
        if (result) {
          this.credentials.address = bnbAddress.address;
        }
        break;
      default:
        result = false;
    }
    if (result) {
    }
    return result;
  }

  checkRequired() {
    if (this.checkCN && this.checkPrivateKey && this.checkCurrentType) {
      this.showBtnSave = true;
    }
  }

  async onPrivateKey($event) {
    this.pk = $event.target.value;
    this.onCheckPrivateKey(this.pk);
  }

  async onCustomName($event) {
    this.custom_name = $event.target.value;
    this.checkCN = true;
    this.checkRequired();
  }

  async onCheckPrivateKey(privatekey) {
    if (!this.selectedCoin) {
      this.messageError = 'Please choose currency type';
      this.error = true;
    } else {
      let checkPk = await this.isValidPrivateKey(privatekey);
      this.checkPrivateKey = true;
      if (!checkPk) {
        this.messageError = 'Invalid private key';
        this.error = true;
        this.credentials.address = '';
      } else {
        this.error = false;
      }
    }
    this.checkRequired();
  }
}
