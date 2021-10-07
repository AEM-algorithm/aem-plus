import { Injectable } from '@angular/core';

import { Notification } from '../models/notification.model';
import { notifications } from '../dummyData/notifications.data';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  notifications: Notification[] = notifications;

  constructor() {}

  getAllNotifictions() {
    return this.notifications;
  }

  async getAllNotificationCounts() {
    return this.notifications.length;
  }

  getWalletNotificationNums(walletAddress: string) {
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
    return this.notifications.filter((notifiction) => notifiction.walletAddress === address);
  }
}
