import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Transaction } from 'src/app/services/models/transaction.model';
import { Wallet } from 'src/app/services/models/wallet.model';
import { WalletsService } from 'src/app/services/wallets/wallets.service';
import { NodeSelectionComponent } from '../node-selection/node-selection.component';
import { Coin } from 'src/app/enums/enums';

interface tokenWallet {
  walletName: string;
  walletType: string;
  walletBalance: number[];
  walletAddress: string;
}

@Component({
  selector: 'app-eth',
  templateUrl: './eth.page.html',
  styleUrls: ['./eth.page.scss'],
})
export class EthPage implements OnInit {
  ethWallet: Wallet;
  transactions: Transaction[];

  segmentModel: string;

  isTokenSelected = false;
  selectedEthToken: tokenWallet;
  finalTrans: Transaction[];

  constructor(
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private walletsService: WalletsService
  ) {}

  ngOnInit() {
    this.segmentModel = 'transaction';

    this.route.paramMap.subscribe((params) => {
      this.ethWallet = this.walletsService.getWallet(params.get('id'));

      if (params.has('tokenId')) {
        this.isTokenSelected = true;
        const ethToken = this.walletsService.getToken(this.ethWallet, params.get('tokenId'));

        this.selectedEthToken = {
          walletName: ethToken.name,
          walletType: Coin[this.ethWallet.walletType],
          walletBalance: ethToken.balance,
          walletAddress: this.ethWallet.walletAddress,
        };

        //  no mock data for this view:
        this.finalTrans = this.walletsService.getTokenTransaction(this.ethWallet, ethToken.id);
      } else {
        this.isTokenSelected = false;
        this.finalTrans = this.ethWallet.transactions;
      }
    });
  }

  async openNodeSelectionModal() {
    const modal = await this.modalCtrl.create({
      component: NodeSelectionComponent,
    });
    return await modal.present();
  }
}
