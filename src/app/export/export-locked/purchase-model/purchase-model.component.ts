import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-purchase-model',
  templateUrl: './purchase-model.component.html',
  styleUrls: ['./purchase-model.component.scss'],
})
export class PurchaseModelComponent implements OnInit {
  price: number;

  @Input() unlock: string;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  closeModal() {
    this.modalCtrl.dismiss();
  }

  onPurchase() {
    this.modalCtrl.dismiss(null, 'confirm');
  }
}
