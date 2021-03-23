import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ModalController } from '@ionic/angular';

import { Wallet } from 'src/app/services/models/wallet.model';

@Component({
  selector: 'app-select-wallet-modal',
  templateUrl: './select-wallet-modal.component.html',
  styleUrls: ['./select-wallet-modal.component.scss'],
})
export class SelectWalletModalComponent implements OnInit {
  @Input() mode: 'send' | 'receive' | 'wallet';
  @Input() selectedWallet: Wallet;

  constructor(private modalCtrl: ModalController, private router: Router) {}

  ngOnInit() {}

  closeModal() {
    this.modalCtrl.dismiss();
  }

  navToWallet() {
    // nav to nem or eth wallet page:
    if (this.selectedWallet.walletType === 'NEM') {
      this.router.navigate(['/tabnav', 'wallets', 'nem', this.selectedWallet.walletId]);
    }

    if (this.selectedWallet.walletType === 'ETH') {
      this.router.navigate(['/tabnav', 'wallets', 'eth', this.selectedWallet.walletId]);
    }

    this.modalCtrl.dismiss();
  }

  onSelect() {
    // TODO passing this wallet's address to send & receive:
    if (this.mode === 'send') {
      this.router.navigate(['/', 'send', 'main']);
    } else if (this.mode === 'receive') {
      this.router.navigate(['/', 'receive', this.selectedWallet.walletId]);
    } else {
      this.navToWallet();
    }

    this.closeModal();
  }
}
