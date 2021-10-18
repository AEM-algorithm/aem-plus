import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Platform } from '@ionic/angular';

import { HTTP } from '@ionic-native/http/ngx';

@Injectable({ providedIn: 'root' })
export class CryptoProvider {

  // TODO set apiURL & apiKey to ENV config.
  apiURL = 'https://pro-api.coinmarketcap.com/';
  apiKey = 'a2de77d6-dd9c-49dc-9ba9-678b69d7c889';

  constructor(
    private http: HTTP,
    private httpClient: HttpClient,
    private platform: Platform,
  ) {}

  round = (value: number): number => Math.round(value * 100) / 100;

  async getExchangeRate(coin: string, convert: string): Promise<number> {
    let url = `${this.apiURL}v1/cryptocurrency/quotes/latest`;
    const headers = {
      'X-CMC_PRO_API_KEY': this.apiKey,
    };

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
      }catch (e) {
        console.log('crypto.provider', 'cryptoExchangeRate()', 'platform: cordova', e);
        return 0;
      }
    } else {
      try {
        url = `${url}?symbol=${coin}&convert=${convert}`;
        const response: any = await this.httpClient.get(url, {headers}).toPromise();
        const { quote } = response.data[coin];
        const { price } = quote[convert];
        return price;
      }catch (e) {
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

}
