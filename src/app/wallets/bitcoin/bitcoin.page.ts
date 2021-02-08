import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ModalController } from '@ionic/angular';

import { Transaction } from 'src/app/services/models/transaction.model';
import { Wallet } from 'src/app/services/models/wallet.model';

import { WalletsService } from 'src/app/services/wallets/wallets.service';
import { ViewchangeService } from '../viewchange.service';

import { NodeSelectionComponent } from '../node-selection/node-selection.component';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-bitcoin',
  templateUrl: './bitcoin.page.html',
  styleUrls: ['./bitcoin.page.scss'],
})
export class BitcoinPage implements OnInit {
  btcWallet: Wallet;
  transactions: Transaction[];
  isShowChart = false;
  // isShowChart = true;

  // viewSubp: Subscription;

  constructor(
    private modalCtrl: ModalController,
    private viewChangeServive: ViewchangeService,
    private route: ActivatedRoute,
    private walletsService: WalletsService
  ) {}

  ngOnInit() {
    // this.viewSubp = this.viewChangeServive.showChart.subscribe((data) => {
    //   this.isShowChart = data;
    // });

    // -----  get the wallet info:
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.btcWallet = this.walletsService.getWallet(id);
      console.log(this.btcWallet);
    });

    // -----  get this wallet's transactions:
    if (this.btcWallet) {
      // console.log(this.walletsService.getWalletTransaction(this.btcWallet.walletAddress));
      this.transactions = this.walletsService.getWalletTransaction(this.btcWallet.walletAddress);
    }
  }

  ionViewWillEnter() {
    this.viewChangeServive.showChart.subscribe((data) => {
      this.isShowChart = data;
    });
  }

  onHideChart(eventData: boolean) {
    this.isShowChart = eventData;
    console.log(this.isShowChart);
  }

  showChart(e: boolean) {
    this.isShowChart = e;
  }

  async openNodeSelectionModal() {
    const modal = await this.modalCtrl.create({
      component: NodeSelectionComponent,
    });
    return await modal.present();
  }

  // ngOnDestroy() {
  //   this.viewSubp.unsubscribe();
  // }
}
