import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Wallet } from 'src/app/services/models/wallet.model';
import { WalletsService } from 'src/app/services/wallets/wallets.service';

@Component({
  selector: 'app-edit-wallet',
  templateUrl: './edit-wallet.page.html',
  styleUrls: ['./edit-wallet.page.scss'],
})
export class EditWalletPage implements OnInit {
  selectedWallet: Wallet;

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
  }
}
