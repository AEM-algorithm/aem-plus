import { Component, OnInit } from '@angular/core';

import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { TranslateService } from '@ngx-translate/core';
import { PinProvider } from 'src/app/services/pin/pin.provider';
import { WalletProvider } from 'src/app/services/wallets/wallet.provider';
import { AlertProvider } from 'src/app/services/alert/alert.provider';

import { BIOMETRY_VERIFIED } from '@app/constants/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    public navCtrl: NavController,
    public translate: TranslateService,
    private storage: Storage,
    private pin: PinProvider,
    private walletProvider: WalletProvider,
    private alertProvider: AlertProvider,
  ) { }

  ngOnInit(): void {
  }


  /**
   * Moves to Login Page
   */
  public goToLoginPage() {
    this.navCtrl.navigateForward('/login');
  }

  handleCreateAccountClick() {
    this.navCtrl.pop();
  }

  async handleLoginClick() {
    const pin = await this.pin.showEnterPin(true);
    if (pin === BIOMETRY_VERIFIED) {
      this.navCtrl.navigateRoot('/tabnav/wallets');
    } else if (pin) {
      const mnemonic = await this.walletProvider.getMnemonics(pin);
      if (mnemonic) {
        this.navCtrl.navigateRoot('/tabnav/wallets');
      } else {
        this.alertProvider.showIncorrectPassword();
      }
    }
  }

  handleForgotPinClick() {
    this.navCtrl.navigateRoot('/login/forgot-pin')
  }
}
