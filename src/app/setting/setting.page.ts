import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  partOne = [
    {
      label: 'My Profile',
      link: '/tabnav/setting/my-profile'
    },
    {
      label: 'Invoice Profile',
      link: '/tabnav/setting/invoice-profile'
    },
    {
      label: 'Change Currency',
      link: ''
    },
    {
      label: 'Change Country',
      link: ''
    },
    {
      label: 'Notifications',
      link: ''
    },
    {
      label: 'Transaction Fees',
      link: ''
    },
  ];

  partTwo = [
    {
      label: 'Security',
      link: ''
    },
    {
      label: 'Support',
      link: ''
    },
    {
      label: 'Logout',
      link: ''
    }
  ];


  constructor() {
  }

  ngOnInit() {
  }

}
