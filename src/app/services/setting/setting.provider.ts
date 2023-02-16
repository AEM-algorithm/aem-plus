import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

export const SETTING_KEY = 'settings';
export const CURRENCY_KEY = 'currency';
export const FEES_KEY = 'fees';
export const NOTIFICATION_KEY = 'notifications';
export const COUNTRY_KEY = 'country';

@Injectable({
  providedIn: 'root',
})
export class SettingProvider {
  constructor(private platform: Platform, private storage: Storage) {}

  public async getFees(defaultFees: {
    minFee: number;
    maxFee: number;
  }): Promise<{ minFee: number; maxFee: number }> {
    const setting = await this.storage.get(SETTING_KEY);

    if (setting?.[FEES_KEY]) {
      return setting[FEES_KEY];
    } else {
      await this.setFees(defaultFees);
    }

    return defaultFees;
  }

  public async setFees(fees: { minFee: number; maxFee: number }): Promise<void> {
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

    if (setting && setting[CURRENCY_KEY]) {
      return setting[CURRENCY_KEY];
    } else {
      await this.setCurrency(defaultCurrency);
    }

    return defaultCurrency;
  }

  public async setCurrency(currency): Promise<void> {
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

  public async getNotification(defaultValue): Promise<any> {
    const setting = await this.storage.get(SETTING_KEY);

    if (setting && setting[NOTIFICATION_KEY]) {
      return setting[NOTIFICATION_KEY];
    } else {
      await this.setNotification(defaultValue);
    }

    return defaultValue;
  }

  public async setNotification(value): Promise<void> {
    let setting = await this.storage.get(SETTING_KEY);
    if (setting) {
      setting = {
        ...setting,
        [NOTIFICATION_KEY]: value,
      };
    } else {
      setting = {
        [NOTIFICATION_KEY]: value,
      };
    }
    await this.storage.set(SETTING_KEY, setting);
  }

  public async getCountry(defaultValue): Promise<string> {
    const setting = await this.storage.get(SETTING_KEY);
    if (setting && setting[COUNTRY_KEY]) {
      return setting[COUNTRY_KEY];
    } else {
      await this.setCountry(defaultValue);
    }
    return defaultValue;
  }

  public async setCountry(value): Promise<void> {
    let setting = await this.storage.get(SETTING_KEY);
    if (setting) {
      setting = {
        ...setting,
        [COUNTRY_KEY]: value,
      };
    } else {
      setting = {
        [COUNTRY_KEY]: value,
      };
    }
    await this.storage.set(SETTING_KEY, setting);
  }
}
