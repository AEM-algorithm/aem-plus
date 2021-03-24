import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SelectWalletModalComponent } from '../../wallets/select-wallet-modal/select-wallet-modal.component';
import { AddressListModalComponent } from '../address-list-modal/address-list-modal.component';
import { Wallet } from 'src/app/services/models/wallet.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  selectedType = 'AUD';
  amountType = [];

  constructor(
    private changeTokenModalController: ModalController,
    private addressListModalController: ModalController
  ) {}

  ngOnInit() {
    this.amountType = [
      {
        value: 'AUD',
      },
      {
        value: 'XEM',
      },
    ];
  }

  onSelectType(e: any) {
    this.selectedType = e.detail.value;
  }

  changeToken(wallet: Wallet, mode: 'send') {
    this.changeTokenModalController
      .create({
        component: SelectWalletModalComponent,
        componentProps: {
          selectedWallet: wallet, // pass the data of cilcked wallet
          mode: mode, //nav to send
        },
        cssClass: 'height-sixty-modal',
      })
      .then((modal) => {
        modal.present();
      });
  }

  showAddressList() {
    this.addressListModalController
      .create({
        component: AddressListModalComponent,
        cssClass: 'height-sixty-modal',
      })
      .then((modal) => {
        modal.present();
      });
  }
}
