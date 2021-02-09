import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Wallet } from '../../services/models/wallet.model';
import { WalletsService } from 'src/app/services/wallets/wallets.service';

@Component({
  selector: 'app-edit-wallet',
  templateUrl: './edit-wallet.page.html',
  styleUrls: ['./edit-wallet.page.scss'],
})
export class EditWalletPage implements OnInit {
  selectedWallet: Wallet;

  pkLength: number;

  showPrivateKey = false;
  showMnemonic = false;

  constructor(private route: ActivatedRoute, private walletsService: WalletsService) {}

  ngOnInit() {
    this.selectedWallet = this.walletsService.getWallet(this.route.snapshot.params['walletId']);

    // console.log(this.route);
    this.route.params.subscribe((data: Params) => {
      // console.log(data); //walletId: w1
      const id = data['walletId'];
      this.selectedWallet = this.walletsService.getWallet(id);
      console.log('subscribe', this.walletsService.getWallet(id));
    });

    // Get the pk length:
    this.pkLength = this.selectedWallet.privateKey.length;
    console.log(this.pkLength);
  }

  onShowPk() {
    // TODO: show the Pin modal first:
    this.showPrivateKey = !this.showPrivateKey;
  }
  onShowMnemonic() {
    // TODO: show the Pin modal first:
    this.showMnemonic = !this.showMnemonic;
  }
}
