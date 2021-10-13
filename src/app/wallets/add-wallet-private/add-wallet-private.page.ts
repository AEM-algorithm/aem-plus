import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from "@ionic/storage";
import { ModalController } from '@ionic/angular';
import { PinProvider } from 'src/app/services/pin/pin.provider';
import { PasswordModalComponent } from '../password-modal/password-modal.component';
import { WalletProvider } from 'src/app/services/wallets/wallet.provider';
import { AlertProvider } from 'src/app/services/alert/alert.provider';

import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-wallet-private',
  templateUrl: './add-wallet-private.page.html',
  styleUrls: ['./add-wallet-private.page.scss'],
})
export class AddWalletPrivatePage implements OnInit {
  showSelect = false;
  showCoin = false;
  coin: any;
  error = false;
  messageError : any;
  credentials = {
    address:'',
    username: '',
    password: '',

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

  ngOnInit() {
  }
  selectCoin() {

    if (!this.showSelect) {
      this.showSelect = true;
    }
    else {
      this.showSelect = false;
    }
  }
  chooseCoin(coinSelect) {
    this.showCoin = true;
    switch (coinSelect) {
      case 'btc':
        coinSelect = 'Bitcoin (BTC)';
        break;
      case 'xem':
        coinSelect = 'NEM (XEM)'
        break;
      case 'eth':
        coinSelect = 'Ethereum (ETH)'
        break;

      default:
        break;
    }
    this.coin = coinSelect;
    this.showSelect = false;

  }

  async continue() {
    if(this.checkRequired()){
      this.error = true;
    }
    else{
      this.storage.remove('address-signer');
      this.error = false;

      const pin = await this.pinProvider.showEnterPinAddAddress();
      
      if (pin) {
        const mnemonic = await this.walletProvider.getMnemonic(pin);
        if (mnemonic) {
          let pk = `13f50828fd189c6928605decadd2a1f4372b83ffcc02cd14ce9676c5c4387e54`
          let a = this.walletProvider.generateBitcoinWalletFromPrivateKey(pk, pin);
          console.log(a);
          // this.navCtrl.navigateRoot('/tabnav/wallets');
        } else {
          this.alertProvider.showIncorrectPassword();
        }
      }


      // this.modlaCtrl
      // .create({
      //   component: PasswordModalComponent,
      //   cssClass: 'height-sixty-modal',
      //   // componentProps: {
      //   //   contact: this.address,
      //   //   isNewContact: false,
      //   // },
      // })
      // .then((modal) => {
      //   modal.present();
      // });
      // this.router.navigateByUrl('/tabnav/wallets/add-signer/?a');
    }
  }
  checkRequired() {
    if(!this.credentials.username){
      this.messageError = 'Please input customer name';
      return true
    }
    else if(!this.coin){
      this.messageError = 'Please choose currency type';
      return true
    }
    else if(!this.credentials.password){
      this.messageError = 'Please input password';
      return true
    }
    else{
      return false
    }
  }
}
