import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ModalController } from '@ionic/angular';

import { Wallet } from 'src/app/services/models/wallet.model';
import { WalletsService } from 'src/app/services/wallets/wallets.service';

import { SelectWalletModalComponent } from '../select-wallet-modal/select-wallet-modal.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  filteredWalletsArr: Wallet[];
  wallets: Wallet[];

  constructor(private modalCtrl: ModalController, private router: Router, private walletsService: WalletsService) {}

  ngOnInit() {
    this.wallets = this.walletsService.wallets;
    this.filteredWalletsArr = this.wallets;
  }

  onNavigation() {
    // TODO: navigate based on the wallet type to the difference component:
    //      other type has to open modal first then navigate
    //     btc type wallet:
    this.router.navigateByUrl('/tabnav/wallets/bitcoin');
  }

  selectWallet(mode: 'send' | 'receive') {
    this.modalCtrl
      .create({
        component: SelectWalletModalComponent,
        componentProps: {
          mode: mode, // determine the navigation page: send | receive
        },
        cssClass: 'select-wallet-modal-style',
      })
      .then((modal) => {
        modal.present();
      });
  }

  filterWallets(e: any) {
    // console.log(e.detail.value);
    console.log(e.target.value);

    this.filteredWalletsArr = this.wallets;

    const searchStr = e.target.value;

    if (searchStr && searchStr.trim() !== '') {
      this.filteredWalletsArr = this.filteredWalletsArr.filter((wallet) => {
        return wallet.walletName.toLowerCase().indexOf(searchStr.toLowerCase()) > -1;
      });
    }
  }
}
