import { Injectable } from '@angular/core';

import { Notification } from '../models/notification.model';
import { notifications } from '../dummyData/notifications.data';
import { Storage } from '@ionic/storage';

export const NOTIFICATION_KEY = 'notifications';

@Injectable({
  providedIn: 'root',
})
export class NotificationsProvider {
  notifications: Notification[];

  constructor(
    private storage: Storage,
  ) {
    this.getAllNotifictions();
  }

  ngOnInit() {
    this.getAllNotifictions();
  }

  getAllNotifictions() {
    if (this.notifications) return this.notifications;
    return this.getNotifications();
  }

  getNotifications() {
    this.storage.get(NOTIFICATION_KEY).then(notifications => {
      return notifications ? notifications : null;
    });
  }

  async setNotifications(): Promise<boolean> {
    try {
      await this.storage.set(NOTIFICATION_KEY, this.notifications);
      return true;
    } catch (e) {
      return false;
    }
  }

  addNotifications(newNotifcation: Notification): Promise<boolean> {
    this.notifications.unshift(newNotifcation);
    return this.setNotifications();
  }

  getAllNotificationCounts() {
    return this.notifications.length;
  }

  getWalletNotificationNums(walletAddress: string) {
    if(!this.notifications) return 0;
    let counts = 0;
    this.notifications.forEach((notification) => {
      if (notification.walletAddress && notification.walletAddress == walletAddress) {
        // console.log('inside of notification service:', notification.walletAddress, walletAddress);
        counts += 1;
      }
    });

    // console.log('inside of notification service:', counts);
    return counts;
  }

  getWalletNotifications(address: string) {
    if (this.notifications) return [];
    return this.notifications.filter((notifiction) => notifiction.walletAddress === address);
  }
}
