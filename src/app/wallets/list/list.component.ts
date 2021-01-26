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
  // wallets = [
  //   {
  //     walletType: 'BTC',
  //     walletName: 'My Wallet 1',
  //     walletAddress: '88070ee21ef642d263a01a21880beef200c3f4',
  //     cryptocurrency: 0.000523,
  //     aud: 100,
  //   },
  //   {
  //     walletType: 'NEM',
  //     walletName: 'My Wallet 2',
  //     walletAddress: '5f089734bdf230d19a954748db1985877e0c1',
  //     cryptocurrency: 563.278,
  //     aud: 200,
  //   },
  //   {
  //     walletType: 'ETH',
  //     walletName: 'My Wallet 3',
  //     walletAddress: '4ed960dd3722149676b7f37c6d8b81ee732d1',
  //     cryptocurrency: 0.0927,
  //     aud: 600,
  //   },
  // ];

  constructor(private modalCtrl: ModalController, private router: Router, private walletsService: WalletsService) {}

  ngOnInit() {
    this.wallets = this.walletsService.wallets;
    this.filteredWalletsArr = this.wallets;
  }

  onNavigation() {
    // btc type wallet:
    this.router.navigateByUrl('/tabnav/wallets/bitcoin');
    //  other type has to open modal first then navigate
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
