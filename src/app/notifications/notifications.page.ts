import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Notification } from '../services/models/notification.model';
import { WalletsService } from '../services/wallets/wallets.service';
import { NotificationsService } from '../services/notifications/notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  notifications: Notification[];

  constructor(
    private route: ActivatedRoute,
    private notificationService: NotificationsService,
    private waletsService: WalletsService
  ) {}

  ngOnInit() {
    // determine all nitification page || a wallet's notifiction page
    this.route.paramMap.subscribe((paramMap) => {
      if (paramMap.has('walletId')) {
        const id = paramMap.get('walletId');
        const selectedWallet = this.waletsService.getWallet(id);
        this.notifications = this.notificationService.getWalletNotifications(selectedWallet.walletAddress);
        console.log('wallet notification: ', this.notifications);
        return;
      }

      this.notifications = this.notificationService.getAllNotifictions();
      console.log('all notifications:', this.notifications);
    });
  }

  getDate(time: number) {
    return new Date(time).toDateString();
  }
}
