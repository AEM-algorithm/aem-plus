import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

export const SETTING_KEY = 'settings';
export const CURRENCY_KEY = 'currency';
export const FEES_KEY = 'fees';

@Injectable({
  providedIn: 'root',
})
export class SettingProvider {
  constructor(
    private platform: Platform,
    private storage: Storage,
  ) {
  }

  public async getFees(defaultFees: {minFee: number, maxFee: number}): Promise<{minFee: number, maxFee: number}> {
    const setting = await this.storage.get(SETTING_KEY);

    if (setting?.[FEES_KEY]) {
      return setting[FEES_KEY];
    } else {
      await this.setFees(defaultFees);
    }

    return defaultFees;
  }

  public async setFees(fees: {minFee: number, maxFee: number}) {
    let setting = await this.storage.get(SETTING_KEY);
    if (setting) {
      setting = {
        ...setting,
        [FEES_KEY]: fees,
      };
    } else {
      setting = {
        [FEES_KEY]: fees,
      };
    }

    await this.storage.set(SETTING_KEY, setting);
  }

  public async getCurrency(defaultCurrency): Promise<string> {
    const setting = await this.storage.get(SETTING_KEY);

    if (setting?.[CURRENCY_KEY]) {
      return setting[CURRENCY_KEY];
    } else {
      await this.setCurrency(defaultCurrency);
    }

    return defaultCurrency;
  }

  public async setCurrency(currency) {
    let setting = await this.storage.get(SETTING_KEY);
    if (setting) {
      setting = {
        ...setting,
        [CURRENCY_KEY]: currency,
      };
    } else {
      setting = {
        [CURRENCY_KEY]: currency,
      };
    }

    await this.storage.set(SETTING_KEY, setting);
  }
}
