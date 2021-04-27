import { Component, OnInit } from '@angular/core';
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
  notificaitonNumsArr: number[] = []; // all wallets' notification number

  transformedWallets = [{}];

  constructor(private walletsService: WalletsService, private notificationService: NotificationsService) {}

  ngOnInit() {
    this.wallets = this.walletsService.getWallets();
    this.allBalanceInAud = this.walletsService.getAllBalanceAud();

    this.notificationCounts = this.notificationService.getAllNotificationCounts();

    this.wallets.forEach((wallet) => {
      // console.log('inside of forEach, wallet: ', wallet);
      const counts = this.notificationService.getWalletNotificationNums(wallet.walletAddress);
      // console.log('wallet notificaiton number:', counts);
      // this.notificaitonNumsArr.push(counts);
      // transaform wallets to new structure which contains notificaiton num:
      this.transformedWallets.push({ ...wallet, counts });

      // this.transformedWallets = [[...this.transformedWallets], { ...wallet, counts }];
      console.log('wallets page transformed wallets:', this.transformedWallets);
      return this.notificaitonNumsArr;
    });

    this.transformedWallets = this.transformedWallets.slice(1);
    console.log('final transformed wallets:', this.transformedWallets);
  }

  ionViewWillEnter() {
    this.wallets = this.walletsService.getWallets();
  }
}
