import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { HelperFunService } from 'src/app/services/helper/helper-fun.service';

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

  startDate: Date;
  endDate: Date;

  minAmount: number;
  maxAmount: number;

  fixedPeriodSel: string; // determine which btn seleted: day, week, month, year
  daterange = false; //      determine if date range selected
  amountrange = false; //    determine if amount range selected

  constructor(private modalCtrl: ModalController, private helperService: HelperFunService) {
    this.fixedPeriodSel = '';
  }

  ngOnInit() {}

  private close() {
    this.modalCtrl.dismiss();
  }

  /**
   * Open filtered transaction modal
   */
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

  /**
   * Get the selected fixed period: day/week/month/year
   */
  fixedFilterSelected(selection: string) {
    this.fixedPeriodSel = selection;
  }

  getStartDateSel(e: any) {
    this.startDate = new Date(e.detail.value);
  }

  getEndDateSel(e: any) {
    this.endDate = new Date(e.detail.value);
  }

  getInputMin(e: any) {
    this.minAmount = +e.detail.value;
  }
  getInputMax(e: any) {
    this.maxAmount = +e.detail.value;
  }

  /**
   *  Filter Transaction by day, week, month, year: use case
   */
  private filterByFixedPeriod() {
    const info = `Filtered by ${this.fixedPeriodSel} filter`;
    const amountRangeInfo = ` (amount range:${this.minAmount} ~ ${this.maxAmount} )`;

    this.amountrange ? (this.filterInfo = info + amountRangeInfo) : (this.filterInfo = info);

    switch (this.fixedPeriodSel) {
      case 'day': {
        this.finalTransactions = this.helperService.onDayFilter(this.transactions);
        break;
      }
      case 'week': {
        this.finalTransactions = this.helperService.onWeekFilter(this.transactions);
        break;
      }
      case 'month': {
        this.finalTransactions = this.helperService.onMonthFilter(this.transactions);
        break;
      }
      case 'year': {
        this.finalTransactions = this.helperService.onYearFilter(this.transactions);
        break;
      }
      default: {
        this.finalTransactions = this.transactions;
        break;
      }
    }
  }

  /**
   * Check if has transaction & date range / amount range selected
   */
  private checkBeforeSearch() {
    if (!this.transactions && this.transactions.length < 0) {
      return;
    }

    if (this.startDate && this.endDate) {
      this.daterange = true;
    }
    if (this.maxAmount && this.minAmount) {
      this.amountrange = true;
    }
  }

  onSearch() {
    this.checkBeforeSearch();

    //========== 11 user case checking: ==========
    if (this.daterange && !this.amountrange) {
      // Use case: select date range only ==> 1 case
      this.filterInfo = `Transaction between ${new Date(this.startDate).toDateString()} and  ${new Date(
        this.endDate
      ).toDateString()}`;

      this.finalTransactions = this.helperService.dateRangeFilter(this.transactions, this.startDate, this.endDate);
    } else if (!this.daterange && this.amountrange) {
      // Use case: amount range with a fixed period time ==> 5 case

      if (this.fixedPeriodSel === '') {
        // ---- amount range only:
        this.filterInfo = `Transaction between ${this.minAmount} and ${this.maxAmount}`;
        this.finalTransactions = this.helperService.amountRangeFilter(
          this.transactions,
          this.maxAmount,
          this.minAmount
        );
        return;
      }

      // --- amount range + a fixed period
      this.filterByFixedPeriod();
      this.finalTransactions = this.helperService.amountRangeFilter(
        this.finalTransactions,
        this.maxAmount,
        this.minAmount
      );
    } else if (this.daterange && this.amountrange) {
      //  Use cae: two ragne selections: 1
      this.filterInfo = `Transaction from ${new Date(this.startDate).toDateString()} to  ${new Date(
        this.endDate
      ).toDateString()} (amount: ${this.minAmount} ~ ${this.maxAmount})`;

      const dateRangeFilteredTrans = this.helperService.dateRangeFilter(
        this.transactions,
        this.startDate,
        this.endDate
      );

      this.finalTransactions = this.helperService.amountRangeFilter(
        dateRangeFilteredTrans,
        this.maxAmount,
        this.minAmount
      );
    } else {
      // User case: fixed period only: 4
      this.filterByFixedPeriod();
    }

    this.showFilteredTrans();
    this.close();
  }
}
