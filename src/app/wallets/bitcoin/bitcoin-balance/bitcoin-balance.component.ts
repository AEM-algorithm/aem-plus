import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { BitcoinAddressComponent } from '../bitcoin-address/bitcoin-address.component';

@Component({
  selector: 'app-bitcoin-balance',
  templateUrl: './bitcoin-balance.component.html',
  styleUrls: ['./bitcoin-balance.component.scss'],
})
export class BitcoinBalanceComponent implements OnInit {
  constructor(private router: Router, private modalCtrl: ModalController) {}

  ngOnInit() {}

  showAddress() {
    this.modalCtrl
      .create({
        component: BitcoinAddressComponent,
      })
      .then((modalEl) => modalEl.present());
  }
}
