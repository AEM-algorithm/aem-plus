// modules
import { Component, OnInit } from '@angular/core';
import {NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

// services
import {LanguageProvider} from '@app/services/language/language.provider';

// constants
import {SUPPORTED_LANGUAGE} from '@app/constants/constants';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  language: string;

  supportedLanguage = SUPPORTED_LANGUAGE;

  constructor(
    public navCtrl: NavController,
    public translate: TranslateService,
    private languageProvider: LanguageProvider,
    private translateService: TranslateService,
  ) {}

  ngOnInit() {
    this.initLanguageSetting();
  }

  async initLanguageSetting() {
    this.language = await this.languageProvider.getLocalLangSetting();
  }

  async handleLanguageOnChange(e) {
    const language = e.detail.value;
    this.translateService.use(language);
    await this.languageProvider.setLocalLangSetting(language);
  }
}
