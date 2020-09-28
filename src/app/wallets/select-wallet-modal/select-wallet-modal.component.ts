import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-select-wallet-modal',
  templateUrl: './select-wallet-modal.component.html',
  styleUrls: ['./select-wallet-modal.component.scss'],
})
export class SelectWalletModalComponent implements OnInit {

  btcTokenList = [
    {
      tokenName: 'Token 1',
      btc: 0.00023,
      aud: 200.89
    },
    {
      tokenName: 'Token 2',
      btc: 0.0023023,
      aud: 230.89
    },
    {
      tokenName: 'Token 3',
      btc: 0.000423,
      aud: 20.89
    },
    {
      tokenName: 'Token 4',
      btc: 5.00023,
      aud: 21234123340.89
    },
    {
      tokenName: 'Token 5',
      btc: 0.03323,
      aud: 20120.89
    },
    {
      tokenName: 'Token 6',
      btc: 0.0073,
      aud: 20230.89
    },
    {
      tokenName: 'Token 7',
      btc: 0.000993,
      aud: 200.89232
    },

  ]

  constructor(private modalCtrl: ModalController, private router: Router) {}

  ngOnInit() {}

  closeModal() {
    this.modalCtrl.dismiss();
  }
  onSelect() {
    // TODO: dynamically navigate to the sub wallet page
    this.router.navigate(['/', 'tabnav', 'wallets', 'bitcoin']);
    this.closeModal();
  }
}
