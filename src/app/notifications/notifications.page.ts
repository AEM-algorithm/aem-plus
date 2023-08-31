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
        this.notifications = this.notificationService.getWalletNotifications(
          selectedWallet.walletAddress
        );
        return;
      }
      this.notifications = await this.notificationService.getNotifications();
    });
  }

  getDate(time: number) {
    return new Date(time).toDateString();
  }

  async handleNtfClear() {
    await this.notificationService.clearNtfOnClick();
  }
}
