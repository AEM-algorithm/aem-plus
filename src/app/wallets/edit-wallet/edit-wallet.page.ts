import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Plugins, FilesystemDirectory } from '@capacitor/core';

import { AlertController, LoadingController, Platform, ToastController } from '@ionic/angular';
import { FormControl, FormGroup } from '@angular/forms';

import { Clipboard } from '@ionic-native/clipboard/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';

import { Wallet } from '../../services/models/wallet.model';
import { WalletsService } from 'src/app/services/wallets/wallets.service';
import { WalletProvider } from 'src/app/services/wallets/wallet.provider';
import { PinProvider } from '@app/services/pin/pin.provider';
import { AlertProvider } from '@app/services/alert/alert.provider';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Coin, WalletDataType } from 'src/app/enums/enums';

import { WALLET_ICON } from 'src/app/constants/constants';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
const { Filesystem } = Plugins;

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

  walletImgData = null;
  walletPaperNote = '';
  walletPaperPdf = null;

  walletIcon = WALLET_ICON;

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
    private pin: PinProvider,
    private router: Router,
    private plt: Platform,
    private http: HttpClient,
    private fileOpener: FileOpener,
    private alertProvider: AlertProvider,
    private wallet: WalletProvider,
  ) {
    this.selectedWallet = new Wallet(
      '',
      '',
      '',
      null,
      '',
      [],
      null,
      [],
      '',
      '',
      [],
    );
  }

  ngOnInit() {
    this.route.params.subscribe(async (data: Params) => {
      const walletId = data['walletId'];
      this.loadSavedWallet(walletId);
    });

    this.initEditForm();

    //  get the wallet img for the pdf
    this.loadImageToBase64();
  }

  private initEditForm() {
    this.editForm = new FormGroup({
      name: new FormControl(this.selectedWallet.walletName),
    });
  }

  private async loadSavedWallet(walletId: string) {
    this.selectedWallet = await this.wallet.getWalletByWalletId(walletId);
    this.newWalletName = this.selectedWallet.walletName;
  }

  public async onShowPk() {
    if (!this.showPrivateKey) {
      const getWallet = await this.handleGetWalletData(this.selectedWallet, WalletDataType.PRIVATE_KEY);
      if (getWallet) {
        this.selectedWallet = getWallet;
        this.showPrivateKey = true;
      }
    } else {
      this.loadSavedWallet(this.selectedWallet.walletId);
      this.showPrivateKey = false;
    }
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
    // TODO: put all the toast notification into a service:
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

  loadImageToBase64() {
    let walletImgPath = this.walletIcon[this.selectedWallet.walletType];

    this.http.get(walletImgPath, { responseType: 'blob' }).subscribe((res) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.walletImgData = reader.result;
        console.log(this.walletImgData);
      };
      reader.readAsDataURL(res);
    });
  }

  onMakeNote(e: any) {
    this.walletPaperNote = e.detail.value;
    console.log('paper note', this.walletPaperNote);
  }

  createWalletPaper() {
    const walletPaperDoc = {
      watermark: { text: 'AEM Algorithm', color: '#0F4B73', opacity: 0.1, bold: true },

      pageSize: {
        width: 295,
        height: 715,
      },

      pageMargins: 0,

      content: [
        {
          layout: 'noBorders',
          table: {
            widths: [295],
            heights: ['*', '*', 150, 230, 230],

            body: [
              [
                {
                  text: 'AEM+ Paper wallet',
                  style: 'header',
                  fillColor: '#0F4B73',
                },
              ],
              //  ---------- image & name
              [
                {
                  stack: [
                    { image: `${this.walletImgData}`, width: 20 }, //image loaded are not correct
                    {
                      text: this.selectedWallet.walletName,
                      style: 'name',
                    },
                  ],
                  fillColor: '#0F4B73',
                },
              ],
              [
                // ------------  balance on Date row
                {
                  stack: [
                    {
                      text: 'Balance on DATE / Note',
                      style: ['title'],
                    },
                    {
                      text: `${new Date().toLocaleDateString()}`,
                      style: {
                        margin: [0, 50, 0, 5],
                      },
                    },
                    {
                      text: [
                        { text: `${this.selectedWallet.walletBalance[0]}`, style: { fontSize: 14, italics: true } },
                        { text: ' AUD', style: { fontSize: 9, italics: true } },
                      ],
                      style: {
                        margin: [0, 30, 0, 5],
                      },
                    },
                    {
                      text: [
                        { text: `${this.selectedWallet.walletBalance[1]}`, style: { fontSize: 14, italics: true } },
                        { text: ` ${this.selectedWallet.walletType}`, style: { fontSize: 9, italics: true } },
                      ],
                    },
                    {
                      text: `${this.walletPaperNote}`,
                      style: {
                        italics: true,
                      },
                    },
                  ],
                  fillColor: '#F7F7F7',
                },
              ],
              [
                // ------------ Private key row
                {
                  stack: [
                    {
                      text: 'Your Private Key',
                      style: 'title',
                    },
                    {
                      text: `${this.selectedWallet.privateKey}`,
                      style: 'info',
                    },
                    { qr: this.selectedWallet.privateKey, fit: '130', style: 'qrcode' },
                  ],
                },
              ],
              [
                // ------------ address row
                {
                  stack: [
                    {
                      text: 'Your address',
                      margin: [0, 20, 0, 5],
                      style: 'title',
                    },
                    {
                      text: `${this.selectedWallet.walletAddress}`,
                      style: 'info',
                      margin: [0, 5, 0, 5],
                    },
                    { qr: this.selectedWallet.privateKey, fit: '130', style: 'qrcode' },
                  ],
                  fillColor: '#F7F7F7',
                },
              ],
            ],
          },
        },
      ],
      defaultStyle: {
        alignment: 'center',
      },
      styles: {
        header: {
          fontSize: 20,
          bold: true,
          alignment: 'center',
          color: '#F9FAFC',
          margin: [0, 10, 0, 10],
        },
        name: {
          fontSize: 14,
          lineHeight: 2,
          margin: [0, 10, 0, 0],
          color: '#F9FAFC',
        },
        info: {
          fontSize: 12,
          margin: [0, 5, 0, 5],
        },
        title: {
          fontSize: 16,
          bold: true,
          margin: [0, 30, 0, 0],
        },
      },
    };

    this.walletPaperPdf = pdfMake.createPdf(walletPaperDoc);
  }

  // ------ On mobile device: open pdf then share:
  private openWalletPaper(data: any) {
    const fileName = 'walletpaper.pdf'; // any requirement for file name???
    try {
      Filesystem.writeFile({
        path: fileName,
        data: data,
        directory: FilesystemDirectory.Documents,
      }).then(() => {
        console.log('File Written successfully!');
        Filesystem.getUri({
          directory: FilesystemDirectory.Documents,
          path: fileName,
        }).then(
          (getUriResult) => {
            console.log('geting pdf uri');

            const path = getUriResult.uri;
            console.log('open, get path uri', path);
            // if (Capacitor.getPlatform() === 'ios') {
            this.fileOpener
              .open(path, 'application/pdf')
              .then(() => console.log('File is opened'))
              .catch((error) => console.log('Error openening file', error));
            // }
          },
          (error) => {
            console.log(error);
          }
        );
      });
    } catch (error) {
      console.error('Unable to write file', error);
    }
  }

  downloadWalletPdf() {
    this.createWalletPaper();
    console.log(this.walletPaperPdf);

    if (this.walletPaperPdf) {
      if (this.plt.is('cordova')) {
        this.walletPaperPdf.getBase64(async (data) => {
          this.openWalletPaper(data);
        });
      } else {
        // web download:
        this.walletPaperPdf.download();
      }
    }
  }

  /**
   * Handle get wallet data
   * @param wallet wallet
   * @param getData 
   * @return promise with saved wallet data
   */
  private async handleGetWalletData(wallet: Wallet, getData: WalletDataType) {
    const pin = await this.pin.showEnterPin();
    if (pin) {
      const decryptedWallet = await this.wallet.decryptWallet(wallet, pin, getData);
      if (decryptedWallet) {
        return decryptedWallet;
      } else {
        this.alertProvider.showIncorrectPassword();
      }
    }
  }

  ngOnDestroy() {
    this.clipboard.clear();
  }
}
