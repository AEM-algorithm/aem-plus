import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Notification } from 'src/app/services/models/notification.model';
import { WalletsService } from 'src/app/services/wallets/wallets.service';
import { NotificationsService } from 'src/app/services/notifications/notifications.service';
import { WalletProvider } from 'src/app/services/wallets/wallet.provider';

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
    private walletsService: WalletsService,
    private walletProvider: WalletProvider
  ) {}

  ngOnInit() {
    // determine all nitification page || a wallet's notifiction page
    this.route.paramMap.subscribe(async (paramMap) => {
      if (paramMap.has('walletId')) {
        const walletId = paramMap.get('walletId');
        const selectedWallet = await this.walletProvider.getWalletByWalletId(walletId);
        console.log('hvh', 'notification.page', 'ngOnInit()', selectedWallet);
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
