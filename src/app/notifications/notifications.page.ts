import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Notification } from 'src/app/services/models/notification.model';
import { NotificationsProvider } from 'src/app/services/notifications/notifications.provider';
import { WalletProvider } from 'src/app/services/wallets/wallet.provider';
import { ModalController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  notifications: any;

  constructor(
    public navCtrl: NavController,
    private route: ActivatedRoute,
    private notificationService: NotificationsProvider,
    private wallet: WalletProvider,
    private router: Router,

  ) { }

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
  async ionViewDidEnter() {
    await this.notificationService.removeNotifications();
  }

  async ionViewWillEnter() {
    await this.notificationService.removeNotifications();
  }
  async ngOnDestroy() {
    await this.notificationService.removeNotifications();

  }
  handleBackOnClick() {
    this.router.navigate(['/tabnav/wallets', { replaceUrl: true }]);

  }
  getDate(time: number) {
    return new Date(time).toDateString();
  }
}
