import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { WalletsService } from 'src/app/services/wallets/wallets.service';
import { ConfirmModalComponent } from '../../../send/confirm-modal/confirm-modal.component';
import { ConfirmTransactionModalComponent } from '../confirm-transaction-modal/confirm-transaction-modal.component';

@Component({
  selector: 'app-send-fee',
  templateUrl: './send-fee.page.html',
  styleUrls: ['./send-fee.page.scss'],
})
export class SendFeePage implements OnInit {
  fee: number;
  feeTooLow: boolean;
  feeTooHigh: boolean;

  walletId: string;
  tokenId: string;

  constructor(
    private confirmModalController: ModalController,
    private route: ActivatedRoute,
    private walletsService: WalletsService
  ) {
    this.fee = 13;
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.walletId = params.get('walletId');

      if (params.has('tokenId')) {
        this.tokenId = params.get('tokenId');
      }
    });
  }

  async showConfirmPopup() {
    this.confirmModalController
      .create({
        component: ConfirmModalComponent,
        cssClass: 'send-confirm-modal',
      })
      .then((modalElement) => {
        modalElement.present();
      });
  }

  feeChange() {
    this.feeTooLow = this.fee < 3 ? true : false;
    this.feeTooHigh = this.fee > 17 ? true : false;
  }
}
