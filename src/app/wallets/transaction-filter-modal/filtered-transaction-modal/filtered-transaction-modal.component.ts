import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Transaction } from 'src/app/services/models/transaction.model';

@Component({
  selector: 'app-filtered-transaction-modal',
  templateUrl: './filtered-transaction-modal.component.html',
  styleUrls: ['./filtered-transaction-modal.component.scss'],
})
export class FilteredTransactionModalComponent implements OnInit {
  //  dummy data
  @Input() filteredTransaction: Transaction[];
  @Input() filterInfo: string;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}
  close() {
    this.modalCtrl.dismiss();
  }
}
