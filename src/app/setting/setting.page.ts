// modules
import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Storage } from '@ionic/storage';
import {
  AlertController,
  LoadingController,
} from '@ionic/angular';
import {Router} from '@angular/router';

// services
import { FileProvider } from '@app/services/file/file.provider';
import { ExchangeProvider } from '@app/services/exchange/exchange.provider';
import {LanguageProvider} from '@app/services/language/language.provider';
import {TranslateService} from '@ngx-translate/core';
import {SettingProvider} from '@app/services/setting/setting.provider';
import {WalletProvider} from '@app/services/wallets/wallet.provider';

// constants
import {SUPPORTED_LANGUAGE} from '@app/constants/constants';
import {COUNTRIES} from '@app/constants/countries';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  currency: any;
  currencySelected: any;
  isCurrency;
  isCountry;
  countryData = COUNTRIES;
  isLoading = false;
  country: any;
  countrySelected: any;
  fullName: any;
  iconAvatar: any;
  isImage = false;
  currentCurrency: string;

  language: string;
  supportedLanguage = SUPPORTED_LANGUAGE;

  constructor(
    private inappBrowser: InAppBrowser,
    public storage: Storage,
    private fileProvider: FileProvider,
    private exchange: ExchangeProvider,
    private languageProvider: LanguageProvider,
    private translateService: TranslateService,
    private settings: SettingProvider,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router,
    private wallet: WalletProvider,
    private translate: TranslateService,
  ) {}

  onOpenPrivacy() {
    // Opens in the system's web browser.
    this.inappBrowser.create(
      'https://www.aemalgorithm.io/privacy-policy',
      '_system'
    );
  }
  onOpenTC() {
    this.inappBrowser.create(
      'https://www.aemalgorithm.io/terms-conditions',
      '_system'
    );
  }
  async onSelectImage() {
    let image = await this.fileProvider.imagePicker();
    this.isImage = true;
    this.iconAvatar = image;
    let check_profile = await this.storage.get('Setting');
    let json = {
      my_profile_invoice: check_profile[0].my_profile_invoice,
      my_profile: {
        ...check_profile[0].my_profile,
        avatar: image,
      },
    };
    this.storage.set('Setting', [json]);
  }
  settingPartTwo = [
    {
      label: 'Security',
      link: '/tabnav/setting/security',
    },
    {
      label: 'Support',
      link: '/tabnav/setting/support',
    },
    {
      label: 'Legal',
      link: '/tabnav/setting/legal',
    },
    {
      label: 'Logout',
      link: 'login',
    },
  ];

  async ionViewWillEnter() {
    this.currentCurrency = await this.exchange.getCurrency();

    try {
      let check_profile = await this.storage.get('Setting');
      if (!check_profile) {
        await this.storage.set('Setting', [
          {
            my_profile: {
              fname: '',
              lname: '',
              email: '',
              phone: '',
              add1: '',
              add2: '',
              suburd: '',
              state: '',
              postcode: '',
              avatar: '',
            },
            my_profile_invoice: {
              business_name: '',
              business_number: '',
              company_address: '',
              phone_number: '',
              tax: '',
              inclusive: '',
            },
            currency: '',
            country: '',
          },
        ]);
      } else {
        this.isCountry = check_profile[0].country.name;
        this.isCurrency = check_profile[0].currency;
        this.iconAvatar = check_profile[0].avatar;
        this.fullName =
          check_profile[0].my_profile.fname +
          ' ' +
          check_profile[0].my_profile.lname;
      }
      this.isLoading = true;
    } catch (error) {
      this.isLoading = true;
    }
    
    this.initLanguageSetting();
  }

  ngOnInit() {
    this.initCountrySetting();
  }

  async onChangeInput(e) {
    this.isCurrency = e.detail.value;
    let check_profile = await this.storage.get('Setting');
    let json = {
      my_profile_invoice: check_profile[0].my_profile_invoice,
      my_profile: check_profile[0].my_profile,
      currency: e.detail.value,
      country: check_profile[0].country,
    };
    this.storage.set('Setting', [json]);
  }

  async onChangeCountry(e) {
    this.isCountry = e.value.name;
    await this.settings.setCountry(e.value.name);
  }

  async initLanguageSetting() {
    this.language = await this.languageProvider.getLocalLangSetting();
  }

  async initCountrySetting() {
    const savedCountry = await this.settings.getCountry('');
    const country = this.countryData.find(item => item.name === savedCountry);
    this.countrySelected = country;
  }

  async handleLanguageOnChange(e) {
    const language = e.detail.value;
    this.translateService.use(language);
    await this.languageProvider.setLocalLangSetting(language);
  }

  async handleRemoveAccountOnClick() {
    const t = await this.translate.get([
      'settings.notify_remove_account',
      'settings.removing_account',
      'common.cancel',
      'common.confirm',
    ]).toPromise();
    const deleteAccount = await this.alertCtrl.create({
      message: t['settings.notify_remove_account'],
      buttons: [
        {
          text: t['common.cancel'],
        },
        {
          text: t['common.confirm'],
          handler: async () => {
            const loading = await this.loadingCtrl.create({
              message: t['settings.removing_account'],
              spinner: 'circles',
            });
            await loading.present();
            await this.wallet.removeAccountData();
            await loading.dismiss();
            await this.router.navigate(['./signup'], {replaceUrl: true});
          },
        },
      ],
    });

    await deleteAccount.present();
  }
}
