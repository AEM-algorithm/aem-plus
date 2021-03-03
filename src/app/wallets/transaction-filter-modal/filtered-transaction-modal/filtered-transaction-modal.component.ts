import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Transaction } from 'src/app/services/models/transaction.model';
import { TransactionDetailComponent } from '../../sharedComponents/transaction-item/transaction-detail/transaction-detail.component';
import { TransactionFilterModalComponent } from '../transaction-filter-modal.component';

@Component({
  selector: 'app-filtered-transaction-modal',
  templateUrl: './filtered-transaction-modal.component.html',
  styleUrls: ['./filtered-transaction-modal.component.scss'],
})
export class FilteredTransactionModalComponent implements OnInit {
  @Input() filteredTransaction: Transaction[];
  @Input() filterInfo: string[];
  @Input() allTransaction: Transaction[];

  constructor(private modalCtrl: ModalController) {}

  getDate(time: number) {
    return new Date(time).toDateString(); // Mon 18 May 2020
  }

  ngOnInit() {
    console.log(this.filteredTransaction);
  }

  showFilter() {
    this.close();

    this.modalCtrl
      .create({
        component: TransactionFilterModalComponent,
        componentProps: { transactions: this.allTransaction },
        cssClass: 'transaction-filter-modal-style',
      })
      .then((modalEl) => {
        modalEl.present();
      });
  }

  viewTransDetail(transaction: Transaction) {
    this.modalCtrl
      .create({
        component: TransactionDetailComponent,
        componentProps: { selectedTrans: transaction },
      })
      .then((modalEl) => {
        modalEl.present();
      });
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
