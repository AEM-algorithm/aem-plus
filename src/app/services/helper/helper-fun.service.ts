import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class HelperFunService {
  constructor() {}

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

  isInDateRange(date: Date, start: Date, end: Date) {
    // pass the user selected date: from date, end date:

    // this.startDate = new Date(this.fromDateEl.nativeElement.value);
    // this.endDate = new Date(this.endDateEl.nativeElement.value);
    return date > start && date < end;
  }

  onDayFilter(transactions: Transaction[]) {
    return transactions.filter((trans) => this.isSameDay(new Date(trans.time), new Date()));
  }
}
