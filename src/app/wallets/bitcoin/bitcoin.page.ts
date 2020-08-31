import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bitcoin',
  templateUrl: './bitcoin.page.html',
  styleUrls: ['./bitcoin.page.scss'],
})
export class BitcoinPage implements OnInit {
  segmentModel: string;

  constructor() {}

  ngOnInit() {
    this.segmentModel = 'balance';
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }
}
