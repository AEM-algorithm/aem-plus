import { Injectable } from '@angular/core';

import { Notification } from '../models/notification.model';
import { Storage } from '@ionic/storage';

export const NOTIFICATION_KEY = 'notifications';

@Injectable({
  providedIn: 'root',
})
export class NotificationsProvider {
  notifications: Notification[];

  constructor(private storage: Storage) {
    this.getNotifications();
  }

  async getNotifications() {
    this.notifications = await this.storage.get(NOTIFICATION_KEY);
    if (!this.notifications) {
      this.notifications = [];
      this.setNotifications();
    }
    return this.notifications;
  }

  async setNotifications(): Promise<boolean> {
    try {
      await this.storage.set(NOTIFICATION_KEY, this.notifications);
      return true;
    } catch (e) {
      return false;
    }
  }

  public addNotifications(newNotifcation: Notification): Promise<boolean> {
    this.notifications.unshift(newNotifcation);
    return this.setNotifications();
  }

  getAllNotificationCounts() {
    return this.notifications.length;
  }

  getWalletNotificationNums(walletAddress: string) {
    let counts = 0;
    this.notifications.forEach((notification) => {
      if (
        notification.walletAddress &&
        notification.walletAddress == walletAddress
      ) {
        // console.log('inside of notification service:', notification.walletAddress, walletAddress);
        counts += 1;
      }
    });

    // console.log('inside of notification service:', counts);
    return counts;
  }

  getWalletNotifications(address: string) {
    return this.notifications.filter(
      (notifiction) => notifiction.walletAddress === address
    );
  }
}
