import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ModalController } from '@ionic/angular';

import { Wallet } from 'src/app/services/models/wallet.model';
import { NotificationsProvider } from 'src/app/services/notifications/notifications.provider';

import { SelectWalletModalComponent } from '../select-wallet-modal/select-wallet-modal.component';
import { UtilsService } from 'src/app/services/helper/utils.service';
import { Coin } from 'src/app/enums/enums';
import { WALLET_ICON } from 'src/app/constants/constants';
import { WalletProvider } from '@app/services/wallets/wallet.provider';
import { ClipboardProvider } from '@app/services/clipboard/clipboard.provider';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() filteredWalletsArr;

  walletIcon = WALLET_ICON;

  constructor(
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private router: Router,
    private wallet: WalletProvider,
    private notificationService: NotificationsProvider,
    private utilsService: UtilsService,
    private clipboardProvider: ClipboardProvider,
  ) { }

  ngOnInit() {
  }

  getWalletNotiNum(address: string) {
    return this.notificationService.getWalletNotificationNums(address);
  }

  // ----   Select wallet or tokens modal:
  private openSelectWalletModal(wallet: Wallet, mode: string) {
    this.modalCtrl
      .create({
        component: SelectWalletModalComponent,
        componentProps: {
          selectedWallet: wallet, // pass the data of clicked wallet
          mode: mode, // determine the navigation page: send | receive
        },
        cssClass: 'height-sixty-modal',
      })
      .then((modal) => {
        modal.present();
      });
  }

  navToWallet(wallet: Wallet, mode: string) {
    if (wallet.walletType === Coin.BITCOIN) {
      this.router.navigate(['/tabnav', 'wallets', 'bitcoin', wallet.walletId]);
      return;
    }
    // --- other type of wallet, open the select token modal:
    this.openSelectWalletModal(wallet, mode);
  }

  selectWalletToken(wallet: Wallet, mode: 'send' | 'receive' | 'wallet') {
    if (wallet.walletType === Coin.BITCOIN && mode === 'send') {
      this.router.navigate(['/tabnav', 'wallets', 'send', wallet.walletId], {
        relativeTo: this.route,
      });
      return;
    } else if (wallet.walletType === Coin.BITCOIN && mode === 'receive') {
      this.router.navigate(['/tabnav', 'wallets', 'receive', wallet.walletId], {
        relativeTo: this.route,
      });
      return;
    }
    //  not btc wallet, then open the modal:
    this.openSelectWalletModal(wallet, mode);
  }

  filterWallets(e: any) {
    const searchStr = e.target.value;
    this.filteredWalletsArr = this.wallet.filterWallets(searchStr);
  }

  onCopyAddress(address: string) {
    this.clipboardProvider.copy(address);
    this.utilsService.showAddressCopyMessage();
  }

}
