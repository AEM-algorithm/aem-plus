import { Component, OnInit } from '@angular/core';

// services
import {SettingProvider} from '@app/services/setting/setting.provider';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  notificationSettings: any;
  keyNotificationAll = 'notification.all';
  keyNotificationReceiveCurrency = 'notification.receive.currency';
  keyNotificationAccountUpdate = 'notification.account.update';

  constructor(
    private settings: SettingProvider,
  ) {
    this.notificationSettings = {};
  }

  async ngOnInit() {
    const settings = await this.getSettings();
    this.notificationSettings = settings;
  }

  async getSettings() {
    return this.settings.getNotification({
      [this.keyNotificationAll]: true,
      [this.keyNotificationReceiveCurrency]: false,
      [this.keyNotificationAccountUpdate]: false,
    });
  }

  async handleAllNotificationOnChange(event) {
    const settings = await this.getSettings();
    const value = event.detail.checked;
    await this.settings.setNotification({
      ...settings,
      [this.keyNotificationAll]: value,
    });
  }

  async handleReceiveCurrencyOnChange(event) {
    const settings = await this.getSettings();
    const value = event.detail.checked;
    await this.settings.setNotification({
      ...settings,
      [this.keyNotificationReceiveCurrency]: value,
    });
  }

  async handleAccountUpdateOnChange(event) {
    const settings = await this.getSettings();
    const value = event.detail.checked;
    await this.settings.setNotification({
      ...settings,
      [this.keyNotificationAccountUpdate]: value,
    });
  }
}
