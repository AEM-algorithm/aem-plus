import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction.model';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class HelperFunService {
  constructor() {}

  getDate(date: Date) {
    // Thu,10 Feb 2020
    console.log(date);
  }

  dateFormat(date: Date) {
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    // DD MMM YY
    return (
      date.getDate() + '/' + months[date.getMonth()].substring(0, 3) + '/' + date.getFullYear().toString().substr(-2)
    );
  }

  isSameDay(d1: Date, d2: Date) {
    return d1.getFullYear() === d2.getFullYear() && d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth();
  }

  isThisWeek(date: Date) {
    const todayObj = new Date();
    const todayDate = todayObj.getDate();
    const todayDay = todayObj.getDay();

    const firstDayOfWeek = new Date(todayObj.setDate(todayDate - todayDay));
    const lastDayOfWeek = new Date(firstDayOfWeek);

    lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);

    return date >= firstDayOfWeek && date <= lastDayOfWeek;
  }

  isThisMonth(d1: Date, d2: Date) {
    return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth();
  }

  isThisYear(d1: Date, d2: Date) {
    return d1.getFullYear() === d2.getFullYear();
  }

  momentFormatDate(date: Date, format?: string) {
    return moment(date).format(format);
  }

  isInDateRange(date: Date, start: Date, end: Date) {
    return date.getTime() >= start.getTime()
      && date.getTime() <= end.getTime();
  }

  isInAmountRange(amount: number, maxAmount: number, minAmount: number) {
    return amount >= minAmount && amount <= maxAmount;
  }

  //  fixed period fitered transaction:
  onDayFilter(transactions: Transaction[]) {
    return transactions.filter((trans) => this.isSameDay(new Date(trans.time), new Date()));
  }

  onWeekFilter(transactions: Transaction[]) {
    return transactions.filter((trans) => this.isThisWeek(new Date(trans.time)));
  }

  onMonthFilter(transactions: Transaction[]) {
    return transactions.filter((trans) => this.isThisMonth(new Date(trans.time), new Date()));
  }

  onYearFilter(transactions: Transaction[]) {
    return transactions.filter((trans) => this.isThisYear(new Date(trans.time), new Date()));
  }

  // range filtered transaction:
  dateRangeFilter(transactions: Transaction[], startDate: Date, endDate: Date) {
    return transactions.filter((trans) => this.isInDateRange(new Date(trans.time), startDate, endDate));
  }

  amountRangeFilter(transactions: Transaction[], maxAmount: number, minAmount: number) {
    return transactions.filter((trans) => this.isInAmountRange(trans.amountAUD, maxAmount, minAmount));
  }

  amountRangeWithTypeFilter(transactions: Transaction[], maxAmount: number, minAmount: number, type: 'Currency' | 'Crypto') {
    if (type === 'Currency') {
      return transactions.filter((trans) => this.isInAmountRange(trans.amountAUD, maxAmount, minAmount));
    } else {
      // crypto currency amount
      return transactions.filter((trans) => this.isInAmountRange(trans.amount, maxAmount, minAmount));
    }
  }
}
