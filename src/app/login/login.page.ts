import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    public navCtrl: NavController,
    public translate: TranslateService,
    private storage: Storage) { }

  ngOnInit(): void {
    this.storage.get('mnemonic').then(mnemonic => {
      if (mnemonic) {
        this.navCtrl.navigateRoot('/tabnav/wallets');
      }
    });
  }


  /**
   * Moves to Login Page
   */
  public goToLoginPage() {
    this.navCtrl.navigateForward('/login');
  }

  /**
   * Moves to Signup Page
   */
  public goToSignupPage() {
    this.navCtrl.navigateForward('/signup');
  }
}
