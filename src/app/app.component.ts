import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {SQLiteObject} from '@ionic-native/sqlite/ngx';
import {SQLite} from '@ionic-native/sqlite/ngx';
import { Storage } from '@ionic/storage';

import {ContactProvider} from './services/contact/contact.provider';

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
    private sqlite: SQLite,
    private contact: ContactProvider,
    private storage: Storage,
    ) {
      this.initializeApp();
      // this.language.setLanguage();
      platform.ready().then(() => {
          // this.language.setLanguage();
          this.setDatabase();
          this.initStorage();
          //ionic default
          statusBar.styleDefault();
          // this.wallet.checkMnemonic().then(exists => {
          //     if (exists) this.nav.navigateRoot('/currencies');
          //     if (!exists) {
          //         Promise.all([this.wallet.getBitcoinWallet(), this.wallet.getNemWallet(), this.wallet.getCatapultWallet()])
          //             .then( values => {
          //                 if(values[0] || values[1] || values[2]) this.nav.navigateRoot('/currencies');
          //                 else this.nav.navigateRoot('/signup');
          //             });
          //     }

              this.splashScreen.hide();
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
