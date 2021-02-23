import { Component, Input, OnInit } from '@angular/core';
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
  @Input() filteredWalletsArr: Wallet[];

  constructor(
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private router: Router,
    private walletsService: WalletsService
  ) {}

  ngOnInit() {}

  createModel(wallet: Wallet, mode: string) {
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

  navToWallet(wallet: Wallet, mode: string) {
    if (wallet.walletType === 'BTC') {
      this.router.navigate(['/tabnav', 'wallets', 'bitcoin', wallet.walletId]);
      return;
    }

    // --- other type of wallet, open the select token modal:
    this.createModel(wallet, mode);
  }

  selectWalletToken(wallet: Wallet, mode: 'send' | 'receive' | 'wallet') {
    if (wallet.walletType === 'BTC' && mode === 'send') {
      this.router.navigate(['/send'], { relativeTo: this.route });
      return;
    } else if (wallet.walletType === 'BTC' && mode === 'receive') {
      this.router.navigate(['/receive', wallet.walletId], { relativeTo: this.route });
      return;
    }

    this.createModel(wallet, mode);
  }

  filterWallets(e: any) {
    const searchStr = e.target.value;
    this.filteredWalletsArr = this.walletsService.filterWallets(searchStr);
  }
}
