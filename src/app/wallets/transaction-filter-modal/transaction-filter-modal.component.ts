import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { FilteredTransactionModalComponent } from './filtered-transaction-modal/filtered-transaction-modal.component';

@Component({
  selector: 'app-transaction-filter-modal',
  templateUrl: './transaction-filter-modal.component.html',
  styleUrls: ['./transaction-filter-modal.component.scss'],
})
export class TransactionFilterModalComponent implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}
  close() {
    this.modalCtrl.dismiss();
  }

  onSearch() {
    this.modalCtrl
      .create({
        component: FilteredTransactionModalComponent,
        cssClass: 'filtered-transaction-modal',
      })
      .then((modalEl) => {
        modalEl.present();
      });
  }
}
