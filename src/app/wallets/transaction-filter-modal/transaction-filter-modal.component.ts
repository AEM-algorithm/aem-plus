import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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

  // @ViewChild('fromDateRef', { static: true }) fromDateEl: ElementRef;
  // @ViewChild('endDateRef', { static: true }) endDateEl: ElementRef;

  // @ViewChild('fromAmountRef', { static: true }) fromAmountEl: ElementRef;
  // @ViewChild('toAmountRef', { static: true }) toAmountEl: ElementRef;

  finalTransactions: Transaction[];
  filterInfo: string;

  startDate: Date;
  endDate: Date;

  minAmount: number;
  maxAmount: number;

  // ----> combine different filter
  fixedPeriodSel: string; // determine which btn seleted: day, week, month, year
  daterange = false; // determine if date time selected
  amountrange = false; // determine if amount range selected

  finalFilterSel: string;

  constructor(private modalCtrl: ModalController, private helperService: HelperFunService) {
    this.fixedPeriodSel = '';
    this.finalFilterSel = '';
  }

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

  // ------- filter funcitons:
  private onDayFilter() {
    this.finalTransactions = this.transactions.filter((trans) =>
      this.helperService.isSameDay(new Date(trans.time), new Date())
    );
  }

  private onWeekFilter() {
    this.finalTransactions = this.transactions.filter((trans) => this.helperService.isThisWeek(new Date(trans.time)));
    console.log(this.finalTransactions);
  }

  onMonthFilter() {
    this.finalTransactions = this.transactions.filter((trans) =>
      this.helperService.isThisMonth(new Date(trans.time), new Date())
    );
  }

  onYearFilter() {
    this.finalTransactions = this.transactions.filter((trans) =>
      this.helperService.isThisYear(new Date(trans.time), new Date())
    );
  }

  private dateRangeFilter() {
    // this.startDate = new Date(this.fromDateEl.nativeElement.value);
    // this.endDate = new Date(this.endDateEl.nativeElement.value);

    this.daterange = true;

    this.finalTransactions = this.transactions.filter((trans) =>
      this.helperService.isInDateRange(new Date(trans.time), this.startDate, this.endDate)
    );
  }

  private amountRangeFilter(transactions: Transaction[]) {
    // search by the aud dollors
    // this.finalTransactions = this.transactions.filter((trans) => {
    this.finalTransactions = transactions.filter((trans) => {
      // this.minAmount = +this.fromAmountEl.nativeElement.value;
      // this.maxAmount = +this.toAmountEl.nativeElement.value;
      // this.amountrange = true;
      return trans.amountAUD < this.maxAmount && trans.amountAUD > this.minAmount;
    });
  }

  fixedFilterSelected(selection: string) {
    this.fixedPeriodSel = selection;
    console.log(this.fixedPeriodSel);
  }

  onStartDateSel(e: any) {
    console.log('start', e.detail.value);
    this.startDate = new Date(e.detail.value);
    console.log(this.startDate);
  }

  onEndDateSel(e: any) {
    console.log('end', e.detail.value);
    this.endDate = new Date(e.detail.value);
    console.log(this.endDate);
  }

  onInputMin(e: any) {
    this.minAmount = +e.detail.value;
  }
  onInputMax(e: any) {
    this.maxAmount = +e.detail.value;
  }

  onSearch() {
    if (!this.transactions && this.transactions.length < 0) {
      return;
    }
    // console.log(this.endDate);
    // console.log(this.startDate);

    //  1. fixed period only:          4 cases
    //  2. amount only :               1
    //  3. date range only:            1                  ---X
    //  4. fixed period + amount:      4
    //  5. date range + amount range.: 1     ===> 11
    //      =======> how to manage more cases if-else
    // this.dateRangeFilter();
    // this.amountRangeFilter();

    if (this.startDate && this.endDate) {
      this.daterange = true;
      // console.log(this.daterange);
    }
    if (this.maxAmount && this.minAmount) {
      this.amountrange = true;
      // console.log(this.amountrange);
    }

    // console.log('amont?', this.amountrange);

    // console.log('date?', this.daterange);

    if (this.daterange && !this.amountrange) {
      //------ this case only select date range only
      this.finalFilterSel = this.fixedPeriodSel + 'date';

      this.filterInfo = `Transaction between ${new Date(this.startDate).toDateString()} and  ${new Date(
        this.endDate
      ).toDateString()}`;

      this.dateRangeFilter();
    } else if (!this.daterange && this.amountrange) {
      //---- amount range only + amount with a fixed period time

      //  --- amount range with a fixed period:
      //         get the this fixed period trans first
      if (this.fixedPeriodSel !== '') {
        switch (this.fixedPeriodSel) {
          case 'day': {
            this.filterInfo = `Filtered by day filter (amount range:${this.minAmount} ~ ${this.maxAmount} )`;
            this.onDayFilter();
            break;
          }
          case 'week': {
            //statements;
            this.filterInfo = `Filtered by week filter (amount range:${this.minAmount} ~ ${this.maxAmount} )`;
            this.onWeekFilter();
            break;
          }
          case 'month': {
            this.filterInfo = `Filtered by month filter (amount range:${this.minAmount} ~ ${this.maxAmount} )`;
            this.onMonthFilter();
            break;
          }
          case 'year': {
            this.filterInfo = `Filtered by year filter (amount range:${this.minAmount} ~ ${this.maxAmount} )`;
            this.onYearFilter();
            break;
          }
          default: {
            break;
          }
        }
        this.amountRangeFilter(this.finalTransactions);
      } else {
        // --- onlu amout range:
        this.filterInfo = `Transaction between ${this.minAmount} and ${this.maxAmount}`;
        this.amountRangeFilter(this.transactions);
      }
    } else if (this.daterange && this.amountrange) {
      //  ------ two ragne selections:
      this.filterInfo = `Transaction from ${new Date(this.startDate).toDateString()} to  ${new Date(
        this.endDate
      ).toDateString()} (amount: ${this.minAmount} ~ ${this.maxAmount})`;

      this.dateRangeFilter();
      this.amountRangeFilter(this.finalTransactions);
    } else {
      //  ------- only fixed period selection
      switch (this.fixedPeriodSel) {
        case 'day': {
          this.filterInfo = `Filtered by day filter`;
          this.onDayFilter();
          break;
        }
        case 'week': {
          this.filterInfo = `Filtered by week filter `;
          this.onWeekFilter();
          break;
        }
        case 'month': {
          this.filterInfo = `Filtered by month filter`;
          this.onMonthFilter();
          break;
        }
        case 'year': {
          this.filterInfo = `Filtered by year filter`;
          this.onYearFilter();
          break;
        }
        default: {
          break;
        }
      }
    }

    console.log(this.finalFilterSel);

    // switch (this.finalFilterSel) {
    //   //  1. fixed period only
    //   case 'day': {
    //     this.filterInfo = 'Filtered by day filter';
    //     this.onDayFilter();
    //     break;
    //   }
    //   case 'week': {
    //     //statements;
    //     this.filterInfo = `Filtered by week filter`;
    //     this.onWeekFilter();
    //     break;
    //   }
    //   case 'month': {
    //     break;
    //   }
    //   case 'year': {
    //     break;
    //   }
    //   // case 'day'
    //   default: {
    //     break;
    //   }
    // }

    this.showFilteredTrans();
    this.close();
  }
}
