import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  address = [
    {
      walletType: 'BTC',
      walletAddress: '88070ee21ef642d263a01a21880beef200c3f48b'
    },
    {
      walletType: 'NEM',
      walletAddress: '1edd072aad695cf469832e2d473dca2eec0d5ef9'
    },
    {
      walletType: 'ETH',
      walletAddress: '7c4a8d09ca3762af61e59520943dc26494f8941b'
    }
  ]



  constructor() { }

  ngOnInit() {
  }

}
