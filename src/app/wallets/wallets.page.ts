import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import { Wallet } from '../services/models/wallet.model';
import { NotificationsService } from '../services/notifications/notifications.service';
import { WalletProvider } from '../services/wallets/wallet.provider';
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

  constructor(private wallet: WalletProvider, private notificationService: NotificationsService) {}

  ngOnInit() {
    // --- Fack the fetching request:
    setTimeout(() => {
      this.wallet.getNemWallets().then((wallets) => this.wallets = wallets);
      // this.allBalanceInAud = this.walletsService.getAllBalanceAud();
      this.notificationCounts = this.notificationService.getAllNotificationCounts();
      this.isLoading = false;
    }, 2000);
  }

  ionViewWillEnter() {
      this.wallet.getNemWallets().then((wallets) => this.wallets = wallets);
    // this.allBalanceInAud = this.walletsService.getAllBalanceAud();   
  }
}
