// modules
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';

// services
import { SettingProvider } from '@app/services/setting/setting.provider';

// constants
import { SUPPORTED_CURRENCIES } from '@app/constants/constants';
import { PRICE_CONVERSION_CMC_URL } from '@app/constants/urls';

// utils
import { Coin } from '@app/enums/enums';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class ExchangeProvider {
  // TODO apiKeys unused
  apiKeys = environment.COINMARKETCAP_APIKEYS;
  private currency = '';
  private defaultCurrency = 'AUD';
  private exchangeRates;

  constructor(
    private http: HTTP,
    private httpClient: HttpClient,
    private platform: Platform,
    private storage: Storage,
    private setting: SettingProvider
  ) {}

  public round = (value: number): number =>
    value !== undefined && value !== null
      ? Math.round(value * 100) / 100
      : null;

  public async getExchangeRate(
    coin: Coin,
    isCurrencyChanged?: boolean
  ): Promise<number> {
    if (isCurrencyChanged) {
      return this.getExchangeRateCMC(coin);
    }

    const isHadExR =
      this.exchangeRates && this.exchangeRates[coin] !== undefined;
    if (isHadExR) {
      return this.exchangeRates[coin];
    }

    return this.getExchangeRateCMC(coin);
  }

  public async getExchangeRateCMC(crypto: Coin): Promise<number> {
    const cryptoCMCId = {
      [Coin.BITCOIN]: 1,
      [Coin.ETH]: 1027,
      [Coin.NEM]: 873,
      [Coin.SYMBOL]: 8677,
      [Coin.BNB]: 1839,
    };
    const fiatCurrency = await this.getFiatCurrency();
    try {
      let response: any;
      if (this.platform.is('cordova')) {
        response = await this.http.get(
          PRICE_CONVERSION_CMC_URL,
          {
            amount: '1',
            convert_id: fiatCurrency.coiMarketCapId.toString(),
            id: cryptoCMCId[crypto].toString(),
          },
          null
        );
        response = JSON.parse(response.data);
        response = response.data || {};
      } else {
        response = (await this.httpClient
          .get(PRICE_CONVERSION_CMC_URL, {
            params: {
              amount: '1',
              convert_id: fiatCurrency.coiMarketCapId.toString(),
              id: cryptoCMCId[crypto].toString(),
            },
          })
          .toPromise()) as any;
        response = response.data || {};
      }
      const price =
        response.quote && response.quote[0] ? response.quote[0].price : 0;
      this.exchangeRates = { ...this.exchangeRates, [crypto]: price };
      return price;
    } catch (e) {
      console.log('crypto.provider', 'cryptoExchangeRate()', e);
      console.warn(
        'Please use extension below to allow cors-access-control in your browser\n' +
          'Chrome ex:' +
          'https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf'
      );
      this.exchangeRates = {
        [Coin.BITCOIN]: 0,
        [Coin.ETH]: 0,
        [Coin.NEM]: 0,
        [Coin.SYMBOL]: 0,
        [Coin.BNB]: 0,
      };
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

  public async getFiatCurrency(): Promise<{
    value: string;
    name: string;
    fiatSymbol: string;
    coiMarketCapId: number;
  }> {
    try {
      const currency = await this.getCurrency();
      return SUPPORTED_CURRENCIES[currency.toLowerCase()];
    } catch (e) {
      console.log('ExchangeProvider', 'getFiatCurrency', e);
    }
    return SUPPORTED_CURRENCIES.usd;
  }

  public async setCurrency(currency) {
    this.currency = currency;
    await this.setting.setCurrency(currency);
  }
}
