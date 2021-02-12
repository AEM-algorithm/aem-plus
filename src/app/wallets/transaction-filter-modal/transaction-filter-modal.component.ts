import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('fromDateRef', { static: true }) fromDateEl: ElementRef;
  @ViewChild('endDateRef', { static: true }) endDateEl: ElementRef;

  @ViewChild('fromAmountRef', { static: true }) fromAmountEl: ElementRef;
  @ViewChild('toAmountRef', { static: true }) toAmountEl: ElementRef;

  finalTransactions: Transaction[];
  filterInfo: string;

  startDate: Date;
  endDate: Date;

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

  private isThisWeek(date: Date) {
    const todayObj = new Date();
    const todayDate = todayObj.getDate();
    const todayDay = todayObj.getDay();

    const firstDayOfWeek = new Date(todayObj.setDate(todayDate - todayDay));
    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);

    return date >= firstDayOfWeek && date <= lastDayOfWeek;
  }

  private isThisMonth(d1: Date, d2: Date) {
    return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth();
  }

  private isThisYear(d1: Date, d2: Date) {
    return d1.getFullYear() === d2.getFullYear();
  }

  private isInDateRange(date: Date) {
    // pass the user selected date: from date, end date:

    this.startDate = new Date(this.fromDateEl.nativeElement.value);
    this.endDate = new Date(this.endDateEl.nativeElement.value);
    return date > this.startDate && date < this.endDate;
  }

  // ------- filter funcitons:
  onDayFilter() {
    // console.log(this.today);
    if (!this.transactions && this.transactions.length < 0) {
      return;
    }

    this.finalTransactions = this.transactions.filter((trans) => this.isSameDay(new Date(trans.time), new Date()));
    // this.filterInfo = `Filtered by day filter`;
    // this.showFilteredTrans();
    // this.close();

    console.log(this.finalTransactions);

    // ------- testing:
    // if (this.transactions && this.transactions.length > 0) {
    //   const trans = this.transactions[0];
    //   console.log(trans.time);
    //   console.log(new Date(trans.time));
    //   console.log(new Date(trans.time).getMonth()); //1: Feb
    //   console.log(new Date(trans.time).getFullYear()); //1: Feb
    // }
  }

  onWeekFilter() {
    if (!this.transactions && this.transactions.length < 0) {
      return;
    }

    this.finalTransactions = this.transactions.filter((trans) => this.isThisWeek(new Date(trans.time)));
    this.filterInfo = `Filtered by week filter`;
    this.showFilteredTrans();
    this.close();
  }

  onMonthFilter() {
    if (!this.transactions && this.transactions.length < 0) {
      return;
    }

    this.finalTransactions = this.transactions.filter((trans) => this.isThisMonth(new Date(trans.time), new Date()));
    this.filterInfo = `Filtered by month filter`;
    this.showFilteredTrans();
    this.close();
  }

  onYearFilter() {
    if (!this.transactions && this.transactions.length < 0) {
      return;
    }

    this.finalTransactions = this.transactions.filter((trans) => this.isThisYear(new Date(trans.time), new Date()));
    this.filterInfo = `Filtered by year filter`;
    this.showFilteredTrans();
    this.close();
  }

  private dateRangeFilter() {
    if (!this.transactions && this.transactions.length < 0) {
      return;
    }
    this.finalTransactions = this.transactions.filter((trans) => this.isInDateRange(new Date(trans.time)));
    this.filterInfo = `Transaction between ${new Date(this.startDate).toDateString()} and  ${new Date(
      this.endDate
    ).toDateString()}`;
    this.showFilteredTrans();
    this.close();
  }

  private amountRangeFilter() {
    let minAmount: number;
    let maxAmount: number;

    if (!this.transactions && this.transactions.length < 0) {
      return;
    }
    // search by the aud dollors
    this.finalTransactions = this.transactions.filter((trans) => {
      //   if (trans.amountAUD < this.maxAmount && trans.amountAUD > this.minAmount) {
      //     console.log('aud:', trans.amountAUD);
      //   }
      //   console.log(this.isInAmountRange(trans.amountAUD));

      //   return this.isInAmountRange(trans.amountAUD);
      minAmount = +this.fromAmountEl.nativeElement.value;
      maxAmount = +this.toAmountEl.nativeElement.value;
      return trans.amountAUD < maxAmount && trans.amountAUD > minAmount;
    });
    // this.filterInfo = `Transaction between ${this.minAmount} and ${this.maxAmount}`;
    this.filterInfo = `Transaction between ${minAmount} and ${maxAmount}`;

    this.showFilteredTrans();
    this.close();
  }

  onSearch() {
    //  1. fixed period only
    //  2. amount only
    //  3. date range only
    //  4. fixed period + amount
    //  5. date range + amount range.
    // this.dateRangeFilter();
    this.amountRangeFilter();
  }
}
