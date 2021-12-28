import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';

import { SettingProvider } from '@app/services/setting/setting.provider';

import { HTTP } from '@ionic-native/http/ngx';
import { Coin } from '@app/enums/enums';

@Injectable({ providedIn: 'root' })
export class ExchangeProvider {

  // TODO set apiURL & apiKey to ENV config.
  apiURL = 'https://pro-api.coinmarketcap.com/';
  apiKeys = ['e79ec505-0913-439d-ae07-069e296a6079', '231f04b7-44ce-4dcd-8dfd-0f0e0e1fbda4', 'a2de77d6-dd9c-49dc-9ba9-678b69d7c889', '791281c5-37e6-42b6-b2a3-56d62218e5bb'];
  private currency = '';
  private defaultCurrency = 'AUD';
  private exchangeRates;

  constructor(
    private http: HTTP,
    private httpClient: HttpClient,
    private platform: Platform,
    private storage: Storage,
    private setting: SettingProvider,
  ) { }

  public round = (value: number): number => (value !== undefined && value !== null) ? Math.round(value * 100) / 100 : null;

  public async getExchangeRate(coin: Coin): Promise<number> {
    if (this.exchangeRates && this.exchangeRates[coin] !== undefined && this.exchangeRates[coin] !== null) return this.exchangeRates[coin];
    let i = 0;
    do {
      let url = `${this.apiURL}v1/cryptocurrency/quotes/latest`;
      const headers = {
        'X-CMC_PRO_API_KEY': this.apiKeys[i],
      };
      const convert = await this.getCurrency();

      let response: any;
      if (this.platform.is('cordova')) {
        try {
          const _response = await this.http.get(url,
            {
              symbol: coin,
              convert,
            },
            headers
          );
          response = JSON.parse(_response.data);
        } catch (e) {
          console.log('crypto.provider', 'cryptoExchangeRate()', 'platform: cordova', e);
          response = JSON.parse(e.error);
        }
      } else {
        url = `${url}?symbol=${coin}&convert=${convert}`;
        try {
          response = await this.httpClient.get(url, { headers }).toPromise();
        } catch (e) {
          console.log('crypto.provider', 'cryptoExchangeRate()', e);
          console.warn(
            'Please use extension below to allow cors-access-control in your browser\n' +
            'Chrome ex:' +
            'https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf'
            );
          response = e.error;
        }
      }

      const price = this.handleExchangeResponse(response, coin, convert);
      if (price < 0) {
        i = i + 1;
        continue;
      } else {
        this.exchangeRates = {...this.exchangeRates, [coin]: price};
        return price;
      }

    } while (i < this.apiKeys.length)
    return 0;
  }

  private handleExchangeResponse(response: any, coin: string, convert: string): number {
    switch (response.status.error_code) {
      case 0:
        // Got token price
        const { quote } = response.data[coin];
        const { price } = quote[convert];
        return price;
      case 1010:
        // Exceed quota limit for API
        return -1;
      case 404:
      default:
        // Not found mosaic on exchange
        return 0;
    }
  }

  public async getCurrency(): Promise<string> {
    if (this.currency) {
      return this.currency;
    }
    this.currency = await this.setting.getCurrency(this.defaultCurrency);
    return this.currency;
  }

  public async setCurrency(currency) {
    this.currency = currency;
    await this.setting.setCurrency(currency);
  }
}
