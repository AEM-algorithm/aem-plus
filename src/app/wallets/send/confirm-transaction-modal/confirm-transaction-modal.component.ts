import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { WalletsService } from 'src/app/services/wallets/wallets.service';

@Component({
  selector: 'app-confirm-transaction-modal',
  templateUrl: './confirm-transaction-modal.component.html',
  styleUrls: ['./confirm-transaction-modal.component.scss'],
})
export class ConfirmTransactionModalComponent implements OnInit {
  @Input() transactionData;
  @Input() walletType;
  @Input() walletId;

  date: string;
  constructor(
    private modalCtrl: ModalController,
    private walletsService: WalletsService,
    private loadingCtrl: LoadingController,
    private router: Router
  ) {}

  ngOnInit() {
    this.date = new Date(this.transactionData.time).toDateString();
  }

  close() {
    this.modalCtrl.dismiss();
  }
  confirm() {
    this.loadingCtrl
      .create({
        message: 'transaction is processing',
        duration: 200,
        spinner: 'circles',
      })
      .then((loadingEl) => {
        loadingEl.present();
        try {
          this.walletsService.sendTransaction(this.transactionData, this.walletId);
        } catch (err) {
          // catch any error from backend
          console.log(err);
        }
      });

    this.close();
    this.router.navigateByUrl('/tabnav/wallets');
  }
}
