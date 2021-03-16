import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-send',
  templateUrl: './send.page.html',
  styleUrls: ['./send.page.scss'],
})
export class SendPage implements OnInit {

  addressList = [
    {
      name: 'William Shakespeare'
    },
    {
      name: 'Will Smith'
    },
    {
      name: 'Napoleon Bonaparte'
    },
    {
      name: 'George Walker Bush'
    },
    {
      name: 'Albert Einstein'
    },
    {
      name: 'Thomas Alva Edison'
    },
    {
      name: 'Mark Twain'
    },
    {
      name: 'Isaac Newton'
    },
    {
      name: 'Bill Gates'
    },
    {
      name: 'David Beckham'
    },
  ]

  constructor() { }

  ngOnInit() {
  }

}
