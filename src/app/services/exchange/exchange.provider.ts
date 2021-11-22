import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';

import { HTTP } from '@ionic-native/http/ngx';

@Injectable({ providedIn: 'root' })
export class ExchangeProvider {

  // TODO set apiURL & apiKey to ENV config.
  apiURL = 'https://pro-api.coinmarketcap.com/';
  apiKey = 'a2de77d6-dd9c-49dc-9ba9-678b69d7c889';
  private currency = '';
  private defaultCurrency = 'AUD';

  constructor(
    private http: HTTP,
    private httpClient: HttpClient,
    private platform: Platform,
    private storage: Storage,
  ) { }

  public round = (value: number): number => (value !== undefined && value !== null) ? Math.round(value * 100) / 100 : null;

  public async getExchangeRate(coin: string): Promise<number> {
    let url = `${this.apiURL}v1/cryptocurrency/quotes/latest`;
    const headers = {
      'X-CMC_PRO_API_KEY': this.apiKey,
    };
    const convert = await this.getCurrency();

    if (this.platform.is('cordova')) {
      try {
        const response: any = await this.http.get(url,
          {
            symbol: coin,
            convert,
          },
          headers
        );
        const { data } = JSON.parse(response.data);
        const { quote } = data[coin];
        const { price } = quote[convert];
        return price;
      } catch (e) {
        console.log('crypto.provider', 'cryptoExchangeRate()', 'platform: cordova', e);
        return 0;
      }
    } else {
      try {
        url = `${url}?symbol=${coin}&convert=${convert}`;
        const response: any = await this.httpClient.get(url, { headers }).toPromise();
        const { quote } = response.data[coin];
        const { price } = quote[convert];
        return price;
      } catch (e) {
        console.log('crypto.provider', 'cryptoExchangeRate()', e);
        console.warn(
          'Please use extension below to allow cors-access-control in your browser\n' +
          'Chrome ex:' +
          'https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf'
        );
        return 0;
      }
    }
  }

  public async getCurrency(): Promise<string> {
    if (this.currency) {
      return this.currency;
    }
  
    const setting = await this.storage.get('settings');
  
    if (setting && setting?.currency) {
      this.currency = setting.currency;
    } else {
      await this.setCurrency(this.defaultCurrency);
    }
  
    return this.currency;
  }
  
  public async setCurrency(currency) {
    this.currency = currency;
  
    let setting = await this.storage.get('settings');
    if (setting) {
      setting = {
        ...setting,
        currency
      };
    } else {
      setting = {
        currency
      };
    }
  
    await this.storage.set('settings', setting);
  }
}
