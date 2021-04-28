import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import { Wallet } from '../services/models/wallet.model';
import { NotificationsService } from '../services/notifications/notifications.service';
import { WalletsService } from '../services/wallets/wallets.service';

@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.page.html',
  styleUrls: ['./wallets.page.scss'],
})
export class WalletsPage implements OnInit {
  wallets: Wallet[];
  allBalanceInAud: number;
  notificationCounts: number;

  isLoading = true;

  constructor(private walletsService: WalletsService, private notificationService: NotificationsService) {}

  ngOnInit() {
    // --- Fack the fetching request:
    setTimeout(() => {
      this.wallets = this.walletsService.getWallets();
      this.allBalanceInAud = this.walletsService.getAllBalanceAud();
      this.notificationCounts = this.notificationService.getAllNotificationCounts();
      this.isLoading = false;
    }, 2000);
  }

  ionViewWillEnter() {
    this.wallets = this.walletsService.getWallets();
    this.allBalanceInAud = this.walletsService.getAllBalanceAud();
  }
}
