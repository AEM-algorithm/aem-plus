import { Component, OnInit } from '@angular/core';

// models
import {DonationWalletModal} from '@app/services/models/donation-wallet.modal';

@Component({
  selector: 'app-contribute-donation',
  templateUrl: './contribute-donation.page.html',
  styleUrls: ['./contribute-donation.page.scss'],
})
export class ContributeDonationPage implements OnInit {
  donationWalletModal: DonationWalletModal;
  wallets = ['BTC', 'XYM', 'NEM', 'ETH', 'ETH1', 'ETH2', 'ETH3', 'ETH4', 'ETH5', 'ETH6'];

  constructor() {
    this.donationWalletModal = new DonationWalletModal(
      null,
      null,
      null,
      0,
      null,
      null,
      0
    );
  }

  ngOnInit() {
  }

}
