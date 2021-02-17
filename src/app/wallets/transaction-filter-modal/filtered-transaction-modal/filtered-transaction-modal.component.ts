import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Transaction } from 'src/app/services/models/transaction.model';

@Component({
  selector: 'app-filtered-transaction-modal',
  templateUrl: './filtered-transaction-modal.component.html',
  styleUrls: ['./filtered-transaction-modal.component.scss'],
})
export class FilteredTransactionModalComponent implements OnInit {
  @Input() filteredTransaction: Transaction[];
  @Input() filterInfo: string[];

  constructor(private modalCtrl: ModalController) {}

  getDate(time: number) {
    return new Date(time).toDateString(); // Mon 18 May 2020
  }

  ngOnInit() {
    console.log(this.filteredTransaction);
  }
  close() {
    this.modalCtrl.dismiss();
  }
}
