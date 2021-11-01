import { Component, OnInit } from '@angular/core';

import { NotificationsService } from '../services/notifications/notifications.service';
import { WalletProvider } from '../services/wallets/wallet.provider';

@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.page.html',
  styleUrls: ['./wallets.page.scss'],
})
export class WalletsPage implements OnInit {
  wallets: any;
  allBalanceInAud: number;
  notificationCounts: number;
  isLoading = true;

  constructor(
    private wallet: WalletProvider,
    private notificationService: NotificationsService,
    ) {}

  async ngOnInit() {
    // --- Fack the fetching request:
    // setTimeout(async () => {
    //   this.wallets = await this.wallet.getAllWallets();
    //   this.allBalanceInAud = await this.walletsService.getAllBalanceAud();
    //   this.notificationCounts = await this.notificationService.getAllNotificationCounts();
    //   this.isLoading = false;
    // }, 2000);
  }

  async ionViewWillEnter() {
    // this.wallets = await this.wallet.getAllWallets();
    // this.allBalanceInAud = this.walletsService.getAllBalanceAud();
    this.allBalanceInAud = 0;
    this.wallets = await this.wallet.getAllWallets();
    this.allBalanceInAud = this.wallet.getWalletBalance(this.wallets);
    this.notificationCounts = await this.notificationService.getAllNotificationCounts();
    this.isLoading = false;
  }

}
