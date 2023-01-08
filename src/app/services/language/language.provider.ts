import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Platform } from '@ionic/angular';
import { Globalization } from '@ionic-native/globalization/ngx';
import {Storage} from '@ionic/storage';

// import { Http } from '@angular/http';
// import 'rxjs/add/operator/map';

/*
 Generated class for the Alert provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular DI.
 */

@Injectable({ providedIn: 'root' })
export class LanguageProvider {
  availableLanguages: string[];
  defaultLanguage: string;

  constructor(
    private translateService: TranslateService,
    private platform: Platform,
    private globalization: Globalization,
    public storage: Storage,
  ) {
    this.availableLanguages = [
      'en',
      'jp',
      'zh_CN',
    ];
    this.defaultLanguage = 'en';
  }

  async setLanguage() {
    // i18n configuration
    this.translateService.setDefaultLang('en');
    const langSetting = await this.storage.get('setting.language');
    if (langSetting) {
      this.translateService.use(langSetting);
      return;
    }

    if (this.platform.is('cordova')) {
      this.globalization
        .getPreferredLanguage()
        .then((language) => {
          // if the file is available
          if (language.value in this.availableLanguages) {
            this.translateService.use(language.value);
          }
          // else, try with the first substring
          else {
            for (const langAvailable of this.availableLanguages) {
              if (language.value.split('-')[0] === langAvailable) {
                this.translateService.use(langAvailable);
                break;
              }
            }
          }
        })
        .catch((e) => console.log(e));
    } else {
      this.translateService.use(this.defaultLanguage);
    }
  }

  async getLocalLangSetting(): Promise<string> {
    const lang = await this.storage.get('setting.language');
    if (lang) {
      return lang;
    }
    return this.translateService.currentLang || this.defaultLanguage;
  }

  async setLocalLangSetting(language: string) {
    await this.storage.set('setting.language', language);
  }
}
