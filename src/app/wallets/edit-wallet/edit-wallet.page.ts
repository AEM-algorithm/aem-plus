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
import { FileProvider } from '@app/services/file/file.provider';

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
    private file: FileProvider
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

  async ngOnInit() {
    await this.route.params.subscribe(async (data: Params) => {
      const walletId = data['walletId'];
      const getData = await this.loadSavedWalletData(walletId);
      if (getData) {
        this.initEditForm();

        //  get the wallet img for the pdf
        this.loadImageToBase64();
      }
    });
  }

  private initEditForm() {
    this.editForm = new FormGroup({
      name: new FormControl(this.selectedWallet.walletName),
    });
  }

  private async loadSavedWalletData(walletId: string, getData?: WalletDataType) {
    try {
      const getSavedWallet = await this.wallet.getWalletByWalletId(walletId);
      switch (getData) {
        case WalletDataType.MNEMONIC:
          this.selectedWallet.mnemonic = getSavedWallet.mnemonic;
          break;
        case WalletDataType.PRIVATE_KEY:
          this.selectedWallet.privateKey = getSavedWallet.privateKey;
          break;
        default:
          this.selectedWallet = getSavedWallet;
          break;
      }
      this.newWalletName = this.selectedWallet.walletName;
      return true
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  public async onShowPk() {
    if (!this.showPrivateKey) {
      const getWallet = await this.handleGetWalletData(this.selectedWallet, WalletDataType.PRIVATE_KEY);
      if (getWallet) {
        this.selectedWallet = getWallet;
        this.showPrivateKey = true;
      } else {
        this.loadSavedWalletData(this.selectedWallet.walletId);
        this.showMnemonic = false;
        this.showPrivateKey = false;
      }
    } else {
      this.loadSavedWalletData(this.selectedWallet.walletId, WalletDataType.PRIVATE_KEY);
      this.showPrivateKey = false;
    }
  }

  public async onShowMnemonic() {
    if (!this.showMnemonic) {
      const getWallet = await this.handleGetWalletData(this.selectedWallet, WalletDataType.MNEMONIC);
      if (getWallet) {
        this.selectedWallet = getWallet;
        this.showMnemonic = true;
      } else {
        this.loadSavedWalletData(this.selectedWallet.walletId);
        this.showMnemonic = false;
        this.showPrivateKey = false;
      }
    } else {
      this.loadSavedWalletData(this.selectedWallet.walletId, WalletDataType.MNEMONIC);
      this.showMnemonic = false;
    }
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

  public onDelete() {
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
            handler: async () => {
              let getWallet: Wallet = {
                ...this.selectedWallet, privateKey: '', mnemonic: ''
              }
              getWallet = await this.handleGetWalletData(getWallet, WalletDataType.PRIVATE_KEY);
              if (getWallet) {
                this.loadingCtrl
                  .create({
                    message: 'Deleting....',
                    translucent: true,
                    // backdropDismiss: true,
                  })
                  .then((loadingEl) => {
                    loadingEl.present();
                    setTimeout(() => {
                      this.wallet.deleteWallet(this.selectedWallet.walletId, this.selectedWallet.walletType);
                      loadingEl.dismiss();
                      this.router.navigateByUrl('/tabnav/wallets');
                    }, 2000);
                  });
              }
              getWallet = null;
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
    this.selectedWallet.walletName = this.newWalletName;
    this.wallet.updateWalletName(this.selectedWallet.walletId, this.newWalletName, this.selectedWallet.walletType);
    this.isEditing = false;
    // this.router.navigateByUrl('/tabnav/wallets');
  }

  cancelEidt() {
    this.isEditing = false;
  }

  private loadImageToBase64() {
    const walletImgPath = this.walletIcon[this.selectedWallet.walletType];

    this.http.get(walletImgPath, { responseType: 'blob' }).subscribe((res) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.walletImgData = reader.result;
      };
      reader.readAsDataURL(res);
    });
  }

  onMakeNote(e: any) {
    this.walletPaperNote = e.detail.value;
    console.log('paper note', this.walletPaperNote);
  }

  createWalletPaper(walletData: Wallet) {
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
                      text: walletData.walletName,
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
                        { text: `${walletData.walletBalance[0]}`, style: { fontSize: 14, italics: true } },
                        { text: ' AUD', style: { fontSize: 9, italics: true } },
                      ],
                      style: {
                        margin: [0, 30, 0, 5],
                      },
                    },
                    {
                      text: [
                        { text: `${walletData.walletBalance[1]}`, style: { fontSize: 14, italics: true } },
                        { text: ` ${walletData.walletType}`, style: { fontSize: 9, italics: true } },
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
                      text: `${walletData.privateKey}`,
                      style: 'info',
                    },
                    { qr: walletData.privateKey, fit: '130', style: 'qrcode' },
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
                      text: `${walletData.walletAddress}`,
                      style: 'info',
                      margin: [0, 5, 0, 5],
                    },
                    { qr: walletData.walletAddress, fit: '130', style: 'qrcode' },
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

  public async downloadWalletPdf() {
    let getWallet: Wallet = {
      ...this.selectedWallet, privateKey: '', mnemonic: ''
    }
    getWallet = await this.handleGetWalletData(getWallet, WalletDataType.PRIVATE_KEY);
    if (getWallet) {
      const walletData = await this.wallet.getWalletByWalletId(this.selectedWallet.walletId, false);
      getWallet = { ...getWallet, walletBalance: walletData.walletBalance };
      this.createWalletPaper(getWallet);
      getWallet = null;

      if (this.walletPaperPdf) {
        if (this.plt.is('cordova')) {
          this.walletPaperPdf.getBase64(async (data) => {
            const base64Response = await fetch(`data:image/jpeg;base64,${data}`);
            const blob = await base64Response.blob();
            this.file.exportPDF(blob, `PaperWallet${this.selectedWallet.walletName}.pdf`);
          });
        } else {
          // web download:
          this.walletPaperPdf.download();
        }
      }
    } else {
      this.loadSavedWalletData(this.selectedWallet.walletId);
      this.showMnemonic = false;
      this.showPrivateKey = false;
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
        return null;
      }
    }
  }

  ngOnDestroy() {
    this.clipboard.clear();
    this.selectedWallet = null;
  }
}
