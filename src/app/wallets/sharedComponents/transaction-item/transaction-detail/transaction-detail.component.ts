import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Transaction } from 'src/app/services/models/transaction.model';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss'],
})
export class TransactionDetailComponent implements OnInit {
  @Input() selectedTrans: Transaction;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  close() {
    this.modalCtrl.dismiss();
  }
}
