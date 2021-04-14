import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Wallet } from 'src/app/services/models/wallet.model';
import { Token } from '../../services/models/token.model';
import { WalletsService } from 'src/app/services/wallets/wallets.service';
import { SelectAddressModalComponent } from './select-address-modal/select-address-modal.component';

@Component({
  selector: 'app-send',
  templateUrl: './send.page.html',
  styleUrls: ['./send.page.scss'],
})
export class SendPage implements OnInit {
  // selectedWallet = {
  //   walletType: 'AUD',
  //   walletName: 'WalletName',
  //   walletAddress: 'dfasdfasdfasdfsdfsdfasdfasd',
  //   walletBalance: [100, 0.553],
  // };

  selectedType = 'AUD';
  amount = 0.0;

  selectedWallet: Wallet;
  isTokenSelected = false; // determine select a walllet or token

  selectedToken: Token;

  cryptoBanlance: number;
  audBanlance: number;

  transformedWalletData: {};

  constructor(
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private walletsService: WalletsService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.selectedWallet = this.walletsService.getWallet(params.get('walletId'));

      this.cryptoBanlance = this.selectedWallet.walletBalance[1];
      this.audBanlance = this.selectedWallet.walletBalance[0];

      this.transformedWalletData = this.selectedWallet;

      if (params.has('tokenId')) {
        this.isTokenSelected = true;
        // get the selected token:
        this.selectedToken = this.walletsService.getToken(this.selectedWallet, params.get('tokenId'));
        // console.log('send token page:', this.selectedToken);
        this.cryptoBanlance = this.selectedToken.balance[1];
        this.audBanlance = this.selectedToken.balance[0];
      }
    });
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  onSelectType(e: any) {
    this.selectedType = e.detail.value;
    console.log('selected type:', this.selectedType);
  }

  showAddressList() {
    this.modalCtrl
      .create({
        component: SelectAddressModalComponent,
        // cssClass: 'height-eightyfive-modal',
        cssClass: 'height-sixty-modal',
        componentProps: {
          selectedWalletType: this.selectedWallet.walletType,
        },
      })
      .then((modal) => {
        modal.present();
      });
  }
}
