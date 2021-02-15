import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Transaction } from 'src/app/services/models/transaction.model';
import { TransactionFilterModalComponent } from '../../transaction-filter-modal/transaction-filter-modal.component';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
})
export class TransactionListComponent implements OnInit {
  @Input() transactions: Transaction[];

  filteredTransaction;
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    this.filteredTransaction = this.transactions;
  }

  ionViewWillEnter() {
    this.filteredTransaction = this.transactions;
  }

  getDate(time: number) {
    return new Date(time).toDateString(); // Mon 18 May 2020
  }

  onFilterData() {
    this.modalCtrl
      .create({
        component: TransactionFilterModalComponent,
        componentProps: { transactions: this.transactions },
        cssClass: 'transaction-filter-modal-style',
      })
      .then((modalEl) => {
        modalEl.present();
      });
  }

  onSearchTransaction(e: any) {
    // console.log(e);
    // console.log(e.target.value);

    this.filteredTransaction = this.transactions;

    const inputValue = e.target.value;

    if (inputValue && inputValue.trim() !== '') {
      this.filteredTransaction = this.filteredTransaction.filter((transaction) => {
        return (
          transaction.receiver.toLowerCase().indexOf(inputValue.toLowerCase()) > -1 ||
          transaction.description.toLowerCase().indexOf(inputValue.toLowerCase()) > -1 ||
          transaction.recevierAddress.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
        );
      });
    }
  }
}
