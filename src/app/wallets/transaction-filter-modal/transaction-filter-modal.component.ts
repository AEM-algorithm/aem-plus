import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { HelperFunService } from 'src/app/services/helper/helper-fun.service';

import { Transaction } from 'src/app/services/models/transaction.model';
import { ToastProvider } from 'src/app/services/toast/toast.provider';
import { ExchangeProvider } from 'src/app/services/exchange/exchange.provider';

import { FilteredTransactionModalComponent } from './filtered-transaction-modal/filtered-transaction-modal.component';

@Component({
  selector: 'app-transaction-filter-modal',
  templateUrl: './transaction-filter-modal.component.html',
  styleUrls: ['./transaction-filter-modal.component.scss'],
})
export class TransactionFilterModalComponent implements OnInit {
  @Input() transactions: Transaction[];
  @Input() selectedWallet: any;

  finalTransactions: Transaction[];
  filterInfo: string[] = [];

  startDate: Date;
  endDate: Date;

  amountType: 'Crypto' | 'Currency' = 'Currency';
  currency: string;

  minAmount: number;
  maxAmount: number;

  fixedPeriodSel: string; // determine which btn seleted: day, week, month, year

  isFixedTimeSel = false;
  isDateRangeSel = false; //      determine if date range selected
  isAmountRangeSel = false; //    determine if amount range selected

  maxDateTime;

  constructor(
    private modalCtrl: ModalController,
    private helperService: HelperFunService,
    private toast: ToastProvider,
    private exchange: ExchangeProvider
  ) {
    this.fixedPeriodSel = '';
    this.maxDateTime = this.helperService.momentFormatDate(
      new Date(),
      'YYYY-MM-DD'
    );
  }

  periodOptions = {
    Day: {
      value: 'Day',
      isSelected: false,
      onFilter: () => this.helperService.onDayFilter(this.transactions),
    },
    Week: {
      value: 'Week',
      isSelected: false,
      onFilter: () => this.helperService.onWeekFilter(this.transactions),
    },
    Month: {
      value: 'Month',
      isSelected: false,
      onFilter: () => this.helperService.onMonthFilter(this.transactions),
    },
    Year: {
      value: 'Year',
      isSelected: false,
      onFilter: () => this.helperService.onYearFilter(this.transactions),
    },
    Default: {
      value: 'Default',
      isSelected: false,
      onFilter: () => this.transactions,
    },
  };

  async ngOnInit() {
    this.currency = await this.exchange.getCurrency();
  }

  isNil = (value: any): boolean =>
    value === null || value === undefined || value === '';

  formatRangePrice = (val1: number, val2: number): string =>
    `$${val1} - $${val2}`;

  setPeriodDefault() {
    this.renderPeriodOptions(this.periodOptions.Default.value);
  }

  renderPeriodOptions(selection) {
    for (const item in this.periodOptions) {
      if (item === selection) {
        const isSelected = this.periodOptions[selection].isSelected;
        this.periodOptions[selection].isSelected = !isSelected;
        this.fixedPeriodSel = isSelected ? '' : selection;
      } else {
        this.periodOptions[item].isSelected = false;
      }
    }
  }

  close() {
    this.modalCtrl.dismiss();
  }

  /**
   * Open filtered transaction modal
   */
  private showFilteredTrans() {
    this.modalCtrl
      .create({
        component: FilteredTransactionModalComponent,
        componentProps: {
          filteredTransaction: this.finalTransactions,
          filterInfo: this.filterInfo,
          allTransaction: this.transactions,
          selectedWallet: this.selectedWallet,
        },
        cssClass: 'height-eightyfive-modal',
      })
      .then((modalEl) => {
        modalEl.present();
      });
  }

  /**
   * Get user inputs: priod time, date range, amount type ...
   */
  fixedFilterSelected(selection: string) {
    // this.fixedPeriodSel = selection;
    this.isFixedTimeSel = true;
    this.renderPeriodOptions(selection);
  }

  getStartDateSel(e: any) {
    this.startDate = new Date(e.detail.value);

    this.setPeriodDefault();
  }

  getEndDateSel(e: any) {
    this.endDate = new Date(e.detail.value);

    this.setPeriodDefault();
  }

  amountTypeChange(e: any) {
    this.amountType = e.detail.value;
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
    const info = `${
      this.fixedPeriodSel === this.periodOptions.Default.value
        ? ''
        : this.fixedPeriodSel
    }`;
    const amountRangeInfo = this.formatRangePrice(
      this.minAmount,
      this.maxAmount
    );

    if (this.isAmountRangeSel) {
      this.filterInfo.push(info);
      this.filterInfo.push(amountRangeInfo);
    } else {
      this.filterInfo.push(info);
    }

    const period = this.fixedPeriodSel
      ? this.fixedPeriodSel
      : this.periodOptions.Default.value;
    this.finalTransactions = this.periodOptions[period].onFilter();
  }

  /**
   * Check if has transaction & date range / amount range selected
   */
  private checkBeforeSearch() {
    if (!this.transactions && this.transactions.length < 0) {
      return;
    }
    if (this.startDate && this.endDate) {
      this.isDateRangeSel = true;
    }
    if (!this.isNil(this.maxAmount) && !this.isNil(this.minAmount)) {
      this.isAmountRangeSel = true;
    }
  }

  isValidSearch(): boolean {
    if (
      this.helperService.momentFormatDate(this.startDate, 'L') >
      this.helperService.momentFormatDate(this.endDate, 'L')
    ) {
      this.toast.showErrorPeriod();
      return false;
    }

    if (
      this.minAmount < 0 ||
      this.maxAmount < 0 ||
      this.minAmount > this.maxAmount
    ) {
      this.toast.showErrorSearchByAmount();
      return false;
    }

    return true;
  }

  /**
   *   get the format start data & end date: DD/MMM,YYYY - DD/MMM,YYYY
   */
  private getDateInfo() {
    // start date format:
    return `${this.helperService.dateFormat(new Date(this.startDate))} -
    ${this.helperService.dateFormat(new Date(this.endDate))}`;
  }

  onSearch() {
    this.checkBeforeSearch();

    const isValidSearch = this.isValidSearch();
    if (!isValidSearch) {
      return;
    }

    // ========== 11 user case checking: ==========
    if (this.isDateRangeSel && !this.isAmountRangeSel) {
      // Use case: select date range only ==> 1 case
      // console.log('transaction-filter-moda', 'onSearch', 'case1');
      const dateInfo = this.getDateInfo();
      this.filterInfo.push(dateInfo);

      this.finalTransactions = this.helperService.dateRangeFilter(
        this.transactions,
        this.startDate,
        this.endDate
      );
    } else if (!this.isDateRangeSel && this.isAmountRangeSel) {
      // Use case: amount range with a fixed period time ==> 5 case

      if (this.fixedPeriodSel === '') {
        // amount range only:
        // console.log('transaction-filter-moda', 'onSearch', 'case2');
        const info = this.formatRangePrice(this.minAmount, this.maxAmount);
        this.filterInfo.push(info);
        this.finalTransactions = this.helperService.amountRangeWithTypeFilter(
          this.transactions,
          this.maxAmount,
          this.minAmount,
          this.amountType
        );
      } else {
        // amount range + a fixed period
        // console.log('transaction-filter-moda', 'onSearch', 'case3');
        this.filterByFixedPeriod();
        this.finalTransactions = this.helperService.amountRangeWithTypeFilter(
          this.finalTransactions,
          this.maxAmount,
          this.minAmount,
          this.amountType
        );
      }
    } else if (this.isDateRangeSel && this.isAmountRangeSel) {
      // Use cae: two ragne selections: 1
      // console.log('transaction-filter-modal', 'onSearch', 'case4');
      const dateInfo = this.getDateInfo();
      const amountInfo = this.formatRangePrice(this.minAmount, this.maxAmount);

      this.filterInfo.push(dateInfo);
      this.filterInfo.push(amountInfo);

      const dateRangeFilteredTrans = this.helperService.dateRangeFilter(
        this.transactions,
        this.startDate,
        this.endDate
      );

      this.finalTransactions = this.helperService.amountRangeWithTypeFilter(
        dateRangeFilteredTrans,
        this.maxAmount,
        this.minAmount,
        this.amountType
      );
    } else {
      // User case: fixed period only: 4
      // console.log('transaction-filter-moda', 'onSearch', 'case5');
      this.filterByFixedPeriod();
    }

    this.close();
    this.showFilteredTrans();
  }
}
