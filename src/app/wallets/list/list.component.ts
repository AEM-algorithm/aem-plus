import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private router: Router,
    private walletsService: WalletsService
  ) {}

  ngOnInit() {
    this.wallets = this.walletsService.wallets;
    this.filteredWalletsArr = this.wallets;
  }

  ionViewWillEnter() {
    this.wallets = this.walletsService.wallets;
    this.filteredWalletsArr = this.wallets;
  }

  onNavigation() {
    // TODO: navigate based on the wallet type to the difference component:
    //      other type has to open modal first then navigate
    //     btc type wallet:
    this.router.navigateByUrl('/tabnav/wallets/bitcoin');
  }

  selectWalletToken(wallet: Wallet, mode: 'send' | 'receive') {
    if (wallet.walletType === 'BTC' && mode === 'send') {
      this.router.navigate(['/send'], { relativeTo: this.route });
      return;
    } else if (wallet.walletType === 'BTC' && mode === 'receive') {
      this.router.navigate(['/receive'], { relativeTo: this.route });
      return;
    }

    this.modalCtrl
      .create({
        component: SelectWalletModalComponent,
        componentProps: {
          selectedWallet: wallet, // pass the data of cilcked wallet
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
    // console.log(e.target.value);

    this.filteredWalletsArr = this.wallets;
    const searchStr = e.target.value;

    if (searchStr && searchStr.trim() !== '') {
      this.filteredWalletsArr = this.filteredWalletsArr.filter((wallet) => {
        return (
          wallet.walletName.toLowerCase().indexOf(searchStr.toLowerCase()) > -1 ||
          wallet.walletAddress.toLowerCase().indexOf(searchStr.toLowerCase()) > -1
        );
      });
    }
  }
}
