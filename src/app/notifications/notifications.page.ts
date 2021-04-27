import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from '../services/notifications/notifications.service';
import { Notification } from '../services/models/notification.model';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  //  dummy data
  notifications = [
    {
      id: 'n1',
      type: 'system',
      title: 'New Version',
      message: 'New version of AEM+ 2.0 will release this year',
      date: 1549756800000,
      isRead: false,
    },
    {
      id: 'n2',
      type: 'system',
      title: 'System update',
      message: 'AEM+ will perform a scheduled system update starting at 2021-05-01, this update will take about  hours',
      date: new Date().getTime(),
      isRead: false,
    },
  ];

  constructor() {}

  ngOnInit() {}
}
