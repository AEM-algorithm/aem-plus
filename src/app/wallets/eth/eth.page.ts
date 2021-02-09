import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Transaction } from 'src/app/services/models/transaction.model';
import { Wallet } from 'src/app/services/models/wallet.model';
import { WalletsService } from 'src/app/services/wallets/wallets.service';
import { NodeSelectionComponent } from '../node-selection/node-selection.component';

@Component({
  selector: 'app-eth',
  templateUrl: './eth.page.html',
  styleUrls: ['./eth.page.scss'],
})
export class EthPage implements OnInit {
  ethWallet: Wallet;
  transactions: Transaction[];
  isShowChart = false;

  constructor(
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private walletsService: WalletsService
  ) {}

  ngOnInit() {
    // -----  get the wallet info:
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.ethWallet = this.walletsService.getWallet(id);
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
}
