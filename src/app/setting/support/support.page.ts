import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
})
export class SupportPage implements OnInit {

  supportList = [
    {
      label: 'FAQ',
      link: '/tabnav/setting/support'
    },
    {
      label: 'Contact Us',
      link: '/tabnav/setting/support/contact-us'
    },
    {
      label: 'Security',
      link: '/tabnav/setting/support'
    },
    {
      label: 'Fees',
      link: '/tabnav/setting/support'
    },
    {
      label: 'Legal',
      link: '/tabnav/setting/support'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
