import { Component, OnInit } from '@angular/core';
import { BNBWallet } from '@app/services/models/wallet.model';
import { WalletProvider } from '@app/services/wallets/wallet.provider';

@Component({
  selector: 'app-bnb',
  templateUrl: './bnb.page.html',
  styleUrls: ['./bnb.page.scss'],
})
export class BNBPage implements OnInit {
  bnbWallet: BNBWallet;
  isComponentActive: boolean = false;
  selectedWallet: BNBWallet;

  constructor(private walletProvider: WalletProvider) {
    this.isComponentActive = true;
  }

  async ngOnInit() {}

  async getSelectedWallet(walletId): Promise<BNBWallet> {
    const wallet = await this.walletProvider.getBNBWalletById(walletId);
    if (this.isComponentActive) {
      return wallet;
    }
    return null;
  }
}
