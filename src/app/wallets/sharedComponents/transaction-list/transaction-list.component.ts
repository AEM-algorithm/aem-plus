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
  @Input() selectedWallet: any;
  @Input() fiatSymbol: string;

  filteredTransaction;
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    this.filteredTransaction = this.transactions;
  }

  ionViewWillEnter() {
    this.filteredTransaction = this.transactions;
  }

  onFilterData() {
    this.modalCtrl
      .create({
        component: TransactionFilterModalComponent,
        componentProps: {
          transactions: this.transactions,
          selectedWallet: this.selectedWallet,
        },
        cssClass: 'height-sixty-modal',
      })
      .then((modalEl) => {
        modalEl.present();
      });
  }

  onSearchTransaction(e: any) {
    this.filteredTransaction = this.transactions;

    const inputValue = e.target.value;

    if (inputValue) {
      this.filteredTransaction = this.filteredTransaction.filter(
        (transaction) => {
          return (
            transaction.receiver
              .toLowerCase()
              .indexOf(inputValue.trim().toLowerCase()) > -1 ||
            transaction.description
              .toLowerCase()
              .indexOf(inputValue.trim().toLowerCase()) > -1 ||
            transaction.receiverAddress
              .toLowerCase()
              .indexOf(inputValue.trim().toLowerCase()) > -1
          );
        }
      );
    }
  }
}
