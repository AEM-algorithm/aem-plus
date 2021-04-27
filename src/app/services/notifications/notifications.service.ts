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
}
