import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from '../services/notifications/notifications.service';
import { Notification } from '../services/models/notification.model';
import { WalletsService } from '../services/wallets/wallets.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  //  dummy data
  notifications: Notification[];
  //   Notification[] = [
  //   new Notification('Multisig', 'n1', 'Someone adds you to a Multisig wallet'),
  //   new Notification('Transaction', 'n2', 'here is a transaction notification'),
  //   new Notification('Multisig', 'n3', 'Someone1 adds you to a Multisig wallet'),
  //   new Notification('Multisig', 'n4', 'Someone2 adds you to a Multisig wallet'),
  //   new Notification('Transaction', 'n5', 'here is another transaction notification'),
  // ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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
