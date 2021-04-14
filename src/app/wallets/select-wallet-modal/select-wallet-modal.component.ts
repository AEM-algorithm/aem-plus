import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ModalController } from '@ionic/angular';

import { Wallet } from 'src/app/services/models/wallet.model';
import { WalletsService } from 'src/app/services/wallets/wallets.service';

@Component({
  selector: 'app-select-wallet-modal',
  templateUrl: './select-wallet-modal.component.html',
  styleUrls: ['./select-wallet-modal.component.scss'],
})
export class SelectWalletModalComponent implements OnInit {
  @Input() mode: 'send' | 'receive' | 'wallet';
  @Input() selectedWallet: Wallet;

  constructor(private modalCtrl: ModalController, private router: Router, private walletsService: WalletsService) {}

  ngOnInit() {}

  close() {
    this.modalCtrl.dismiss();
  }

  private navToWallet() {
    if (this.selectedWallet.walletType === 'NEM') {
      this.router.navigate(['/tabnav', 'wallets', 'nem', this.selectedWallet.walletId]);
    }

    if (this.selectedWallet.walletType === 'ETH') {
      this.router.navigate(['/tabnav', 'wallets', 'eth', this.selectedWallet.walletId]);
    }

    this.modalCtrl.dismiss();
  }

  private navToToken(index) {
    if (this.selectedWallet.walletType === 'NEM') {
      const token = this.walletsService.getTokenByIndex(this.selectedWallet, index);
      console.log(token);
      this.router.navigate(['/tabnav', 'wallets', 'nem', this.selectedWallet.walletId, 'token', token.id]);
    }

    if (this.selectedWallet.walletType === 'ETH') {
      const ethToken = this.walletsService.getTokenByIndex(this.selectedWallet, index);
      this.router.navigate(['/tabnav', 'wallets', 'nem', this.selectedWallet.walletId, 'token', ethToken.id]);
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
