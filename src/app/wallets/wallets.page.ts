import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.page.html',
  styleUrls: ['./wallets.page.scss'],
})
export class WalletsPage implements OnInit {
  walletSegmentModel: string;

  constructor() {
  }

  ngOnInit() {
    this.walletSegmentModel = 'myAccount';
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

}
