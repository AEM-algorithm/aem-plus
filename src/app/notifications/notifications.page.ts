import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Notification } from 'src/app/services/models/notification.model';
import { NotificationsProvider } from 'src/app/services/notifications/notifications.provider';
import { WalletProvider } from 'src/app/services/wallets/wallet.provider';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  notifications: any;

  constructor(
    private route: ActivatedRoute,
    private notificationService: NotificationsProvider,
    private wallet: WalletProvider
  ) {}

  ngOnInit() {
    // determine all nitification page || a wallet's notifiction page
    this.route.paramMap.subscribe(async (paramMap) => {
      if (paramMap.has('walletId')) {
        const walletId = paramMap.get('walletId');
        const selectedWallet = await this.wallet.getWalletByWalletId(walletId);
        console.log('hvh', 'notification.page', 'ngOnInit()', selectedWallet);
        this.notifications = this.notificationService.getWalletNotifications(selectedWallet.walletAddress);
        console.log('wallet notification: ', this.notifications);
        return;
      }

      this.notifications = await this.notificationService.getNotifications();
      console.log('all notifications:', this.notifications);
    });
  }

  getDate(time: number) {
    return new Date(time).toDateString();
  }
}
