import { Component, OnInit } from '@angular/core';
import { Wallet } from '../services/models/wallet.model';
import { WalletsService } from '../services/wallets/wallets.service';

@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.page.html',
  styleUrls: ['./wallets.page.scss'],
})
export class WalletsPage implements OnInit {
  wallets: Wallet[];
  allBalanceInAud: number;

  constructor(private walletsService: WalletsService) {}

  ngOnInit() {
    this.wallets = this.walletsService.getWallets();
    this.allBalanceInAud = this.walletsService.getAllBalanceAud();
  }

  ionViewWillEnter() {
    this.wallets = this.walletsService.getWallets();
  }
}
