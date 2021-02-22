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

  constructor(private walletsService: WalletsService) {}

  ngOnInit() {
    this.wallets = this.walletsService.getWallets();
    console.log('wallets : ng init');
    console.log(this.wallets);
  }

  ionViewWillEnter() {
    console.log('wallest: wii enter');
    this.wallets = this.walletsService.getWallets();
    console.log(this.wallets);
  }

  ionViewDidEnter() {
    console.log('wallest: did enter');
    this.wallets = this.walletsService.getWallets();
    console.log(this.wallets);
  }
}
