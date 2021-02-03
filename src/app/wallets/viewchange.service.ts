import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ViewchangeService {
  //  hide chart: emit on chart component:
  // hideChart = new EventEmitter<boolean>();
  // show chart: emit on transaction list component
  showChart = new EventEmitter<boolean>();

  constructor() {}
}
