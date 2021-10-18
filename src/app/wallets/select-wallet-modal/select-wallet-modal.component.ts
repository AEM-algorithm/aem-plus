import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ModalController } from '@ionic/angular';
import { Coin } from 'src/app/enums/enums';

import { Wallet } from 'src/app/services/models/wallet.model';
import { WalletsService } from 'src/app/services/wallets/wallets.service';
import { WALLET_ICON } from 'src/app/constants/constants';

@Component({
  selector: 'app-select-wallet-modal',
  templateUrl: './select-wallet-modal.component.html',
  styleUrls: ['./select-wallet-modal.component.scss'],
})
export class SelectWalletModalComponent implements OnInit {
  @Input() mode: 'send' | 'receive' | 'wallet';
  @Input() selectedWallet: Wallet;

  walletIcon = WALLET_ICON;

  constructor(private modalCtrl: ModalController, private router: Router, private walletsService: WalletsService) {}

  ngOnInit() {}

  close() {
    this.modalCtrl.dismiss();
  }

  private navToWallet() {
    let walletPage;
    switch (this.selectedWallet.walletType) {
      case Coin.NEM:
        walletPage = 'nem';
        break;
      case Coin.SYMBOL:
        walletPage = 'symbol';
        break;
      case Coin.BITCOIN:
        // TODO:
        walletPage = 'bitcoin';
        break;
    }

    if (walletPage) {
      this.router.navigate(['/tabnav', 'wallets', walletPage, this.selectedWallet.walletId]);
    }

    this.modalCtrl.dismiss();
  }

  private navToToken(index) {
    let walletPage;

    switch (this.selectedWallet.walletType) {
      case Coin.NEM:
        walletPage = 'nem';
        break;
      case Coin.SYMBOL:
        walletPage = 'symbol';
        break;
      case Coin.BITCOIN:
        // TODO:
        walletPage = 'bitcoin';
        break;
    }

    const token = this.walletsService.getTokenByIndex(this.selectedWallet, index);

    if (walletPage) {
      this.router.navigate(['/tabnav', 'wallets', walletPage, this.selectedWallet.walletId, 'token', token.id]);
    }

    this.modalCtrl.dismiss();
  }

  // onSelect() {
  //   // TODO passing this wallet's address to send & receive:
  //   if (this.mode === 'send') {
  //     this.router.navigate(['/', 'send', 'main']);
  //   } else if (this.mode === 'receive') {
  //     this.router.navigate(['/', 'receive', this.selectedWallet.walletId]);
  //   } else {
  //     this.navToWallet();
  //   }

  //   this.closeModal();
  // }

  onSelectWallet() {
    console.log('hvh', ' select-wallet-modal', 'onSelectWallet()', 'mode: ', this.mode, 'wallet:', this.selectedWallet);
    if (this.mode === 'send') {
      // wallet send route:
      this.router.navigate(['/tabnav', 'wallets', 'send', this.selectedWallet.walletId]);
    } else if (this.mode === 'receive') {
      this.router.navigate(['/', 'receive', this.selectedWallet.walletId]);
    } else {
      this.navToWallet();
    }

    this.close();
  }

  onSelectToekn(index) {
    console.log('hvh', ' select-wallet-modal', 'onSelectToekn()');
    if (this.mode === 'send') {
      // find the selected token:
      const selectedToken = this.selectedWallet.tokens[index];
      // console.log('send selected token', selectedToken);
      this.router.navigate(['/tabnav', 'wallets', 'send', this.selectedWallet.walletId, 'token', selectedToken.id]);
    } else if (this.mode === 'receive') {
      this.router.navigate(['/', 'receive', this.selectedWallet.walletId]);
    } else {
      this.navToToken(index);
    }

    this.close();
  }
}
