import { Component, OnInit } from '@angular/core';
import { Notification } from './notification.model';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  //  dummy data
  notifications: Notification[] = [
    new Notification('Multisig', 'n1', 'Someone adds you to a Multisig wallet'),
    new Notification('Transaction', 'n2', 'here is a transaction notification'),
    new Notification('Multisig', 'n3', 'Someone1 adds you to a Multisig wallet'),
    new Notification('Multisig', 'n4', 'Someone2 adds you to a Multisig wallet'),
    new Notification('Transaction', 'n5', 'here is another transaction notification'),
  ];

  constructor() {}

  ngOnInit() {}
}
