import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from "@ionic/storage";
import { ModalController } from '@ionic/angular';
import { PinProvider } from 'src/app/services/pin/pin.provider';
import { PasswordModalComponent } from '../../password-modal/password-modal.component';
import { WalletProvider } from 'src/app/services/wallets/wallet.provider';
import { AlertProvider } from 'src/app/services/alert/alert.provider';
import { Crypto } from 'symbol-sdk';


import { NavController } from '@ionic/angular';
import { Coin } from '@app/enums/enums';
import { SUPPORTED_COINS, CoinInfo } from '@app/constants/constants';
@Component({
  selector: 'app-add-wallet-private',
  templateUrl: './add-wallet-private.page.html',
  styleUrls: ['./add-wallet-private.page.scss'],
})
export class AddWalletPrivatePage implements OnInit {
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
  constructor(
    private router: Router,
    private storage: Storage,
    private modlaCtrl: ModalController,
    private pinProvider: PinProvider,
    private walletProvider: WalletProvider,
    private alertProvider: AlertProvider,
    public navCtrl: NavController,
  ) { }

  async ionViewWillEnter() {
    this.supportedCoins = Object.values(SUPPORTED_COINS);
    console.log(this.supportedCoins);

  }

  ngOnInit() {
  }


  selectCoin() {
    this.showSelect = !this.showSelect;
  }

  chooseCoin(coinSelect: CoinInfo) {
    this.selectedCoin = coinSelect;
    this.showCoin = true;
    this.showSelect = false;
  }

  privateKeyOnEnter() {
    console.log(this.credentials.privateKey);
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

  isValidPrivateKey() {

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
