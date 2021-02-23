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
      link: ''
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
    }
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
