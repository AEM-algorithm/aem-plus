import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HelperFunService } from 'src/app/services/helper/helper-fun.service';
import { Transaction } from 'src/app/services/models/transaction.model';
import { WalletsService } from 'src/app/services/wallets/wallets.service';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss'],
})
export class TransactionDetailComponent implements OnInit {
  @Input() selectedTrans: Transaction;

  date: string;
  walletType: string; // TODO: get the wallet's info
  walletName: string;

  fromAddress: string;
  receiver: string;

  constructor(
    private modalCtrl: ModalController,
    private walletsService: WalletsService,
    private helperService: HelperFunService
  ) {}

  ngOnInit() {
    this.getDate();

    const wallet = this.walletsService.getWalletByAddress(this.selectedTrans.address);
    this.walletName = wallet.walletName;
    this.walletType = wallet.walletType;
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
