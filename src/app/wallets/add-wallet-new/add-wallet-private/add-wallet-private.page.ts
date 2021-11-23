import { Component, OnInit, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators,  } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from "@ionic/storage";
import { ModalController } from '@ionic/angular';
import { PinProvider } from 'src/app/services/pin/pin.provider';
import { WalletProvider } from 'src/app/services/wallets/wallet.provider';
import { AlertProvider } from 'src/app/services/alert/alert.provider';

import { NavController } from '@ionic/angular';
import { Coin } from '@app/enums/enums';
import { SUPPORTED_COINS, CoinInfo } from '@app/constants/constants';
import { BitcoinProvider } from '@app/services/bitcoin/bitcoin.provider';
import { NemProvider } from '@app/services/nem/nem.provider';
import { SymbolProvider } from '@app/services/symbol/symbol.provider';
@Component({
  selector: 'app-add-wallet-private',
  templateUrl: './add-wallet-private.page.html',
  styleUrls: ['./add-wallet-private.page.scss'],
})

export class AddWalletPrivatePage implements OnInit {
  importForm: FormGroup;
  importFormData: {
    coinType: Coin,
    privateKey: string,
    walletName: string,
  };
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
  // showSelect = false;
  // showCoin = false;
  coin: any;
  // error = false;
  // enumCoin:any;
  privateKey: any;
  // messageError: any;
  // credentials = {
  //   address: '',
  //   username: '',
  //   password: '',

  // };
  constructor(
    private router: Router,
    private storage: Storage,
    private modlaCtrl: ModalController,
    private pinProvider: PinProvider,
    private walletProvider: WalletProvider,
    private bitcoin: BitcoinProvider,
    private nem: NemProvider,
    private symbol: SymbolProvider,
    private alertProvider: AlertProvider,
    public navCtrl: NavController,
  ) { }

  async ionViewWillEnter() {
    this.supportedCoins = Object.values(SUPPORTED_COINS);
    console.log(this.supportedCoins);

  }

  ngOnInit() {

    this.importForm = new FormGroup({
      coinType: new FormControl('', Validators.required),
      privateKey: new FormControl('', Validators.required),
      walletName: new FormControl('', Validators.required),
    });
  }

  // selectCoin() {

  //   if (!this.showSelect) {
  //     this.showSelect = true;
  //   }
  //   else {
  //     this.showSelect = false;
  //   }
  // }
  selectCoin($event: any) {
    this.showSelect = !this.showSelect;
  }

  chooseCoin(coinSelect: CoinInfo) {
    this.credentials.address = null;
    this.selectedCoin = coinSelect;
    this.showCoin = true;
    this.showSelect = false;
  }
  // chooseCoin(coinSelect) {
  //   this.showCoin = true;
  //   switch (coinSelect) {
  //     case 'btc':
  //       coinSelect = 'Bitcoin (BTC)';
  //       // this.enumCoin ='BTC';
  //       break;
  //     case 'xem':
  //       coinSelect = 'NEM (XEM)';
  //       // this.enumCoin ='NEM';
  //       break;
  //     case 'eth':
  //       coinSelect = 'Ethereum (ETH)';
  //       // this.enumCoin ='ETH';
  //       break;
  //     default:
  //       // this.enumCoin = "XYM"
  //       break;
  //   }
  //   this.coin = coinSelect;
  //   this.showSelect = false;

  // }



  privateKeyChanged(event?: any) {
    console.log("private key is ", this.credentials.privateKey);
  }

  async continue() {
    if (this.checkRequired()) {
      this.error = true;
    }
    else {
      this.storage.remove('address-signer');
      this.error = false;

      const pin = await this.pinProvider.showEnterPinAddAddress();

      if (pin) {
        const isValidPin = await this.walletProvider.isValidPin(pin);
        if (isValidPin) {
          let generateWallet = await this.walletProvider.generateWalletFromPrivateKey(this.credentials.privateKey, pin, this.enumCoin, this.credentials.username, false);
          if (generateWallet) {
            this.navCtrl.navigateRoot('/tabnav/wallets');
          }
          else {
            this.messageError = 'Add new wallet fail';
            return true
          }

        } else {
          this.alertProvider.showIncorrectPassword();
        }
      }
    }
  }

  isValidPrivateKey(changePrivateKeyEvent?: any) {
    const updatedPrivateKey = changePrivateKeyEvent;
    if (!this.selectedCoin) return false;
    let result: boolean = false;
    switch (this.selectedCoin.id) {
      case Coin.BITCOIN:
        result = this.bitcoin.isValidPrivateKey(updatedPrivateKey);
        if (result) {
          this.credentials.address = this.bitcoin.createPrivateKeyWallet(updatedPrivateKey, '1111').address;
        }
        break;
      case Coin.NEM:
        result = this.nem.isValidPrivateKey(updatedPrivateKey);
        if (result) {
          this.credentials.address = this.nem.createPrivateKeyWallet('nem', updatedPrivateKey, 'nemWallet').address.pretty();
        }
        break;
      case Coin.SYMBOL:
        result = this.symbol.isValidPrivateKey(updatedPrivateKey);
        if (result) {
          this.credentials.address = this.symbol.createPrivateKeyWallet('symbol', updatedPrivateKey, 'symbolWallet').address.pretty();
        }
        break;
      default:
        result = false;
    }
    if(result) {

    }
    return result;
  }

  checkRequired() {
    if (!this.credentials.username) {
      this.messageError = 'Please input custom name';
      return true
    }
    else if (!this.selectedCoin) {
      this.messageError = 'Please choose currency type';
      return true
    }
    else if (!this.credentials.privateKey) {
      this.messageError = 'Please input private key';
      return true
    }
    else {
      return false
    }
  }
}
