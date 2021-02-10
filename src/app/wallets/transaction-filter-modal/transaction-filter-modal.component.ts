import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Transaction } from 'src/app/services/models/transaction.model';

import { FilteredTransactionModalComponent } from './filtered-transaction-modal/filtered-transaction-modal.component';

@Component({
  selector: 'app-transaction-filter-modal',
  templateUrl: './transaction-filter-modal.component.html',
  styleUrls: ['./transaction-filter-modal.component.scss'],
})
export class TransactionFilterModalComponent implements OnInit {
  @Input() transactions: Transaction[];
  finalTransactions: Transaction[];
  filterInfo: string;

  // get today's day, month, year
  today = new Date(); //Wed Feb 10 2021 15:16:34 GMT+1100 (Australian Eastern Daylight Time)
  year = this.today.getFullYear(); //2021
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  private close() {
    this.modalCtrl.dismiss();
  }

  private showFilteredTrans() {
    this.modalCtrl
      .create({
        component: FilteredTransactionModalComponent,
        componentProps: { filteredTransaction: this.finalTransactions, filterInfo: this.filterInfo },
        cssClass: 'filtered-transaction-modal',
      })
      .then((modalEl) => {
        modalEl.present();
      });
  }

  // utilities:
  private isSameDay(d1: Date, d2: Date) {
    return d1.getFullYear() === d2.getFullYear() && d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth();
  }

  dateRangeTrans(from: Date, end: Date) {}

  amountRangeTrans(from: number, end: number) {}

  // ------- filter funcitons:
  onDayFilter() {
    // console.log(this.today);
    if (!this.transactions && this.transactions.length < 0) {
      return;
    }

    this.finalTransactions = this.transactions.filter((trans) => this.isSameDay(new Date(trans.time), new Date()));
    this.filterInfo = `Filtered by day filter`;
    this.showFilteredTrans();
    this.close();

    // console.log(this.finalTransactions);

    // ------- testing:
    // if (this.transactions && this.transactions.length > 0) {
    //   const trans = this.transactions[0];
    //   console.log(trans.time);
    //   console.log(new Date(trans.time));
    //   console.log(new Date(trans.time).getMonth()); //1: Feb
    //   console.log(new Date(trans.time).getFullYear()); //1: Feb
    // }
  }

  onWeekFilter() {}

  onMonthFilter() {}

  onYearFilter() {}

  onRangeSearch() {}
}
