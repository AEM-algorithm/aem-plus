import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HelperFunService } from 'src/app/services/helper/helper-fun.service';
import { Transaction } from 'src/app/services/models/transaction.model';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss'],
})
export class TransactionDetailComponent implements OnInit {
  @Input() selectedTrans: Transaction;

  date: string;
  walletType = 'btc'; // TODO: get the wallet's info

  constructor(private modalCtrl: ModalController, private helperService: HelperFunService) {}

  ngOnInit() {
    this.getDate();
  }

  // date format:
  getDate() {
    // this.date = this.helperService.dateFormat(new Date(this.selectedTrans.time));
    this.date = new Date(this.selectedTrans.time).toDateString();
    // console.log(new Date(this.selectedTrans.time).toDateString());
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
