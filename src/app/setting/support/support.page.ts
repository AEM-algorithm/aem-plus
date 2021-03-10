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
      link: ''
    },
    {
      label: 'Contact Us',
      link: ''
    },
    {
      label: 'Security',
      link: ''
    },
    {
      label: 'Fees',
      link: ''
    },
    {
      label: 'Legal',
      link: ''
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
