import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Clipboard } from '@ionic-native/clipboard/ngx';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

import { Wallet } from '../../services/models/wallet.model';
import { WalletsService } from 'src/app/services/wallets/wallets.service';

@Component({
  selector: 'app-edit-wallet',
  templateUrl: './edit-wallet.page.html',
  styleUrls: ['./edit-wallet.page.scss'],
})
export class EditWalletPage implements OnInit, OnDestroy {
  selectedWallet: Wallet;

  pkLength: number;

  showPrivateKey = false;
  showMnemonic = false;

  constructor(
    private route: ActivatedRoute,
    private walletsService: WalletsService,
    private clipboard: Clipboard,
    private toastCtrl: ToastController,
    private alterCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router
  ) {}

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

  onCopyPk() {
    this.clipboard.copy(this.selectedWallet.privateKey);
    this.toastCtrl
      .create({
        message: 'private key copyed!',
        duration: 3000,
        position: 'top',
        buttons: [
          {
            text: 'Okay',
            role: 'cancel',
          },
        ],
      })
      .then((toaseEl) => {
        toaseEl.present();
      });
  }

  onCopyMnemonic() {
    const mnemonicStr = this.selectedWallet.mnemonic.toString();

    console.log(mnemonicStr);

    this.clipboard.copy(mnemonicStr);
    this.toastCtrl
      .create({
        message: 'Mnemonic copyed!',
        duration: 3000,
        position: 'top',
        buttons: [
          {
            text: 'Okay',
            role: 'cancel',
          },
        ],
      })
      .then((toaseEl) => {
        toaseEl.present();
      });
  }

  onDelete() {
    this.alterCtrl
      .create({
        header: 'Alert',
        // subHeader: 'Subtitle',
        message: 'Are you sure you want to delete this wallet?',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            cssClass: 'secondary',
            // handler: (blah) => {
            //   console.log('Confirm Cancel: blah');
            // },
          },
          {
            text: 'Yes',
            handler: () => {
              // TODO: show the pin modal
              this.loadingCtrl
                .create({
                  message: 'Deleting....',
                  translucent: true,
                  // backdropDismiss: true,
                })
                .then((loadingEl) => {
                  loadingEl.present();
                  setTimeout(() => {
                    this.walletsService.deleteWallet(this.selectedWallet.walletId);
                    loadingEl.dismiss();
                    this.router.navigateByUrl('/tabnav/wallets');
                  }, 2000);
                });
            },
          },
        ],
      })
      .then((alterEl) => {
        alterEl.present();
      });
  }

  ngOnDestroy() {
    this.clipboard.clear();
  }
}
