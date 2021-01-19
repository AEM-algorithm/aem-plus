import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SelectWalletModalComponent } from '../select-wallet-modal/select-wallet-modal.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  wallets = [
    {
      walletType: 'BTC',
      walletName: 'My Wallet 1',
      walletAddress: '88070ee21ef642d263a01a21880beef200c3f4',
      cryptocurrency: 0.000523,
      aud: 100,
    },
    {
      walletType: 'NEM',
      walletName: 'My Wallet 2',
      walletAddress: '5f089734bdf230d19a954748db1985877e0c1',
      cryptocurrency: 563.278,
      aud: 200,
    },
    {
      walletType: 'ETH',
      walletName: 'My Wallet 3',
      walletAddress: '4ed960dd3722149676b7f37c6d8b81ee732d1',
      cryptocurrency: 0.0927,
      aud: 600,
    },
  ];

  constructor(private modalCtrl: ModalController, private router: Router) {}

  ngOnInit() {}

  onNavigation() {
    // btc type wallet:
    this.router.navigateByUrl('/tabnav/wallets/bitcoin');
    //  other type has to open modal first then navigate
  }

  selectWallet(mode: 'send' | 'receive') {
    this.modalCtrl
      .create({
        component: SelectWalletModalComponent,
        componentProps: {
          mode: mode, // determine the navigation page: send | receive
        },
        cssClass: 'select-wallet-modal-style',
      })
      .then((modal) => {
        modal.present();
      });
  }
}
