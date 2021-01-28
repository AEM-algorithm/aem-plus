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
  @Input() mode: 'send' | 'receive';
  @Input() selectedWallet: Wallet;

  constructor(private modalCtrl: ModalController, private router: Router) {}

  ngOnInit() {}

  closeModal() {
    this.modalCtrl.dismiss();
  }

  onSelect() {
    // TODO passing this wallet's address along:
    if (this.mode === 'send') {
      this.router.navigate(['/', 'send']);
    } else {
      this.router.navigate(['/', 'receive']);
    }

    // this.router.navigate(['/', 'tabnav', 'wallets', 'bitcoin']);
    this.closeModal();
  }
}
