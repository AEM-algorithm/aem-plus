import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bitcoin',
  templateUrl: './bitcoin.page.html',
  styleUrls: ['./bitcoin.page.scss'],
})
export class BitcoinPage implements OnInit {
  // set default selected segment button
  segmentModel = 'balance';
  constructor() {}

  ngOnInit() {}
  segmentChanged(event) {
    console.log(this.segmentModel);

    console.log(event);
  }
}
