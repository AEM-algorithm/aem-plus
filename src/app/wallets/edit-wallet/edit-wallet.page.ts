import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Clipboard } from '@ionic-native/clipboard/ngx';
import { AlertController, LoadingController, Platform, ToastController } from '@ionic/angular';

import { Wallet } from '../../services/models/wallet.model';
import { WalletsService } from 'src/app/services/wallets/wallets.service';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FileOpener } from '@ionic-native/file-opener/ngx';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-edit-wallet',
  templateUrl: './edit-wallet.page.html',
  styleUrls: ['./edit-wallet.page.scss'],
})
export class EditWalletPage implements OnInit, OnDestroy {
  selectedWallet: Wallet;

  newWalletName: string;
  editForm: FormGroup;

  pkLength: number;

  isEditing = false;

  showPrivateKey = false;
  showMnemonic = false;

  walletPaperPdf = null;

  // qrcode data:
  // notesImg = null;
  // addressImg = null;

  constructor(
    private route: ActivatedRoute,
    private walletsService: WalletsService,
    private clipboard: Clipboard,
    private toastCtrl: ToastController,
    private alterCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router,
    private plt: Platform,
    private http: HttpClient,
    private fileOpener: FileOpener
  ) {}

  ngOnInit() {
    this.selectedWallet = this.walletsService.getWallet(this.route.snapshot.params['walletId']);

    this.newWalletName = this.selectedWallet.walletName;

    // console.log(this.route);
    this.route.params.subscribe((data: Params) => {
      // console.log(data); //walletId: w1
      const id = data['walletId'];
      this.selectedWallet = this.walletsService.getWallet(id);
      console.log('subscribe', this.walletsService.getWallet(id));
    });

    this.initEditForm();
  }

  private initEditForm() {
    this.editForm = new FormGroup({
      name: new FormControl(this.selectedWallet.walletName),
    });
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

  onEdit() {
    this.isEditing = true;
    // 1.TODO: atuo focus on the input element
    // 2. open keyboard

    // console.log(this.selectedWallet);
  }

  onSave() {
    this.newWalletName = this.editForm.get('name').value;

    console.log(this.newWalletName);

    this.walletsService.updateWalletName(this.selectedWallet.walletId, this.newWalletName);
    this.isEditing = false;
    // this.router.navigateByUrl('/tabnav/wallets');
  }

  cancelEidt() {
    this.isEditing = false;
  }

  createWalletPaper() {
    // create testing contents:
    // TODO: our wallet paper pdf view design!!!!
    const walletPaperDoc = {
      watermark: { text: 'AEM Algorithm', color: 'blue', opacity: 0.2, bold: true },
      content: [{ text: 'testing the creating pdf and download function', style: 'header' }],

      styles: {
        header: { fontSize: 20 },
      },
    };

    this.walletPaperPdf = pdfMake.createPdf(walletPaperDoc);
  }

  downloadWalletPdf() {
    this.createWalletPaper();
    console.log(this.walletPaperPdf);

    if (this.walletPaperPdf) {
      if (this.plt.is('cordova')) {
        // mobile device:  download method
        //  TODO: learn capacitor Filesystem API
        console.log('mobile device download pdf file');
      } else {
        // web download:
        this.walletPaperPdf.download();
      }
    }
  }

  ngOnDestroy() {
    this.clipboard.clear();
  }
}
