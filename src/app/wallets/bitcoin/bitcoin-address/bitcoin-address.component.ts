import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-bitcoin-address',
  templateUrl: './bitcoin-address.component.html',
  styleUrls: ['./bitcoin-address.component.scss'],
})
export class BitcoinAddressComponent implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}
  closeAddress() {
    this.modalCtrl.dismiss();
  }
}
