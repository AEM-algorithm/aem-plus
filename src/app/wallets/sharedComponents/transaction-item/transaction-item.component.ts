import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Transaction } from 'src/app/services/models/transaction.model';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';

@Component({
  selector: 'app-transaction-item',
  templateUrl: './transaction-item.component.html',
  styleUrls: ['./transaction-item.component.scss'],
})
export class TransactionItemComponent implements OnInit {
  @Input() transaction: Transaction;

  constructor(private modalCtl: ModalController) {}

  ngOnInit() {}

  viewTransDetail() {
    this.modalCtl
      .create({
        component: TransactionDetailComponent,
        componentProps: { selectedTrans: this.transaction },
        cssClass: 'height-eightyfive-modal',
      })
      .then((modalEl) => {
        modalEl.present();
      });
  }
}
