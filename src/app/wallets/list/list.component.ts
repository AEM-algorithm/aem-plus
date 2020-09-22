import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  wallets = [
    {
      walletType: 'BTC',
      walletName: 'My Wallet 1',
      walletAddress: '88070ee21ef642d263a01a21880beef200c3f48b',
      cryptocurrency: 0.000523,
      aud: 100
    },
    {
      walletType: 'NEM',
      walletName: 'My Wallet 2',
      walletAddress: '5f089734bdf230d19a954748db1985877e0c13e8',
      cryptocurrency: 563.278,
      aud: 200
    },
    {
      walletType: 'ETH',
      walletName: 'My Wallet 3',
      walletAddress: '4ed960dd3722149676b7f37c6d8b81ee732d70c1',
      cryptocurrency: 0.0927,
      aud: 600
    },
  ]

  constructor() { }

  ngOnInit() {}

}
