import { Component } from '@angular/core';

import { NavController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { Storage } from '@ionic/storage';

import { LanguageProvider } from './services/language/language.provider';
import { ContactProvider } from './services/contact/contact.provider';
import { WalletProvider } from './services/wallets/wallet.provider';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private language: LanguageProvider,
    private wallet: WalletProvider,
    private nav: NavController,
    private sqlite: SQLite,
    private contact: ContactProvider,
    private storage: Storage,
  ) {
    this.initializeApp();
    this.initStorage();
    this.language.setLanguage();
    platform.ready().then(() => {
      this.language.setLanguage();
      this.setDatabase();

      //ionic default
      statusBar.styleDefault();
      this.wallet.checkMnemonic().then(exists => {
          if (exists) this.nav.navigateRoot('/tabnav/wallets');
          if (!exists) {
              // Promise.all([this.wallet.getBitcoinWallet(), this.wallet.getNemWallet(), this.wallet.getCatapultWallet()])
              Promise.all([this.wallet.getNemWallet()])
                  .then( values => {
                      if(values[0]) this.nav.navigateRoot('/tabnav/wallets');
                      else this.nav.navigateRoot('/login');
                  });
          }

          this.splashScreen.hide();
      });
  });
}

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  private setDatabase() {
    if (this.platform.is('cordova')) {
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        console.log('INFO: Database created');
        this.contact.setDatabase(db);
        this.contact.createTable().then(_ => {
          this.splashScreen.hide();
        });

      }).catch(error => {
        console.error(error);
      });
    } else {
      this.splashScreen.hide();
    }

  }

  private initStorage() {
    this.storage.create().then((_) => {
      console.log('storage', 'create');
    });
  }
}
