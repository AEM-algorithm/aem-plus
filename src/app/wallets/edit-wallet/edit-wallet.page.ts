import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationExtras,
  Params,
  Router,
} from '@angular/router';
import { HttpClient } from '@angular/common/http';

import {
  AlertController,
  LoadingController,
  Platform,
  ToastController,
} from '@ionic/angular';
import { FormControl, FormGroup } from '@angular/forms';

import { FileOpener } from '@ionic-native/file-opener/ngx';

import { Wallet } from '@app/services/models/wallet.model';
import { WalletProvider } from 'src/app/services/wallets/wallet.provider';
import { PinProvider } from '@app/services/pin/pin.provider';
import { AlertProvider } from '@app/services/alert/alert.provider';
import { FileProvider } from '@app/services/file/file.provider';
import { ExchangeProvider } from '@app/services/exchange/exchange.provider';
import { ClipboardProvider } from '@app/services/clipboard/clipboard.provider';

import * as pdfMake from 'pdfmake/build/pdfmake';
import '@utils/pdfMake.font';

import { Coin, WalletDataType } from 'src/app/enums/enums';

import { EDIT_WALLET_IMG, WALLET_ICON } from 'src/app/constants/constants';

@Component({
  selector: 'app-edit-wallet',
  templateUrl: './edit-wallet.page.html',
  styleUrls: ['./edit-wallet.page.scss'],
})
export class EditWalletPage implements OnInit, OnDestroy {
  selectedWallet: Wallet;
  encryptedPrivateKey: string;

  newWalletName: string;
  editForm: FormGroup;

  isEditing = false;
  privateKeyAvailable = false;

  showPrivateKey = false;
  showMnemonic = false;

  walletImgData = null;
  walletPaperNote = '';
  walletPaperPdf = null;

  walletIcon = WALLET_ICON;

  walletYourAdressImg = null;
  walletYourPrivateImg = null;
  walletYourBalanceImg = null;

  constructor(
    private route: ActivatedRoute,
    private clipboard: ClipboardProvider,
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
    private file: FileProvider,
    private exchange: ExchangeProvider
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
      []
    );
  }

  async ngOnInit() {
    this.route.params.subscribe(async (data: Params) => {
      const walletId = data['walletId'];
      const getData = await this.loadSavedWalletData(walletId);
      if (getData) {
        this.initEditForm();

        //  get the wallet img for the pdf
        this.loadImageToBase64(
          this.walletIcon[
            this.selectedWallet.walletType == 'BTC'
              ? 'BTC_50'
              : this.selectedWallet.walletType
          ],
          'walletImgData'
        );
        this.loadImageToBase64(
          EDIT_WALLET_IMG.yourprivatekey,
          'walletYourPrivateImg'
        );
        this.loadImageToBase64(
          EDIT_WALLET_IMG.youradress,
          'walletYourAdressImg'
        );
        this.loadImageToBase64(
          EDIT_WALLET_IMG.yourbalance,
          'walletYourBalanceImg'
        );
      }

      this.selectedWallet.currency = await this.exchange.getCurrency();
    });
  }

  goToWalletsPage() {
    const navigationExtras: NavigationExtras = {
      queryParams: { reload: true },
      replaceUrl: true,
    };
    this.router.navigate(['/tabnav/wallets'], navigationExtras);
  }

  private initEditForm() {
    this.editForm = new FormGroup({
      name: new FormControl(this.selectedWallet.walletName),
    });
  }

  private async loadSavedWalletData(
    walletId: string,
    getData?: WalletDataType
  ) {
    try {
      const getSavedWallet = await this.wallet.getWalletByWalletId(
        walletId,
        true,
        true
      );
      this.privateKeyAvailable = !(
        getSavedWallet.walletType == Coin.BITCOIN && getSavedWallet.isMultisig
      );
      switch (getData) {
        case WalletDataType.MNEMONIC:
          this.selectedWallet.mnemonic = getSavedWallet.mnemonic;
          break;
        case WalletDataType.PRIVATE_KEY:
          this.selectedWallet.privateKey = getSavedWallet.privateKey;
          break;
        default:
          this.selectedWallet = getSavedWallet;
          this.encryptedPrivateKey = getSavedWallet.privateKey;
          break;
      }
      this.newWalletName = this.selectedWallet.walletName;
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  public async onShowPk() {
    if (!this.showPrivateKey) {
      const pureWallet =
        this.selectedWallet.walletType === Coin.ETH
          ? { ...this.selectedWallet, privateKey: this.encryptedPrivateKey }
          : this.selectedWallet;
      const getWallet = await this.handleGetWalletData(
        pureWallet,
        WalletDataType.PRIVATE_KEY
      );
      if (getWallet) {
        this.selectedWallet = getWallet;
        this.showPrivateKey = true;
      } else {
        this.loadSavedWalletData(this.selectedWallet.walletId);
        this.showMnemonic = false;
        this.showPrivateKey = false;
      }
    } else {
      this.loadSavedWalletData(
        this.selectedWallet.walletId,
        WalletDataType.PRIVATE_KEY
      );
      this.showPrivateKey = false;
    }
  }

  public async onShowMnemonic() {
    if (!this.showMnemonic) {
      const getWallet = await this.handleGetWalletData(
        this.selectedWallet,
        WalletDataType.MNEMONIC
      );
      if (getWallet) {
        this.selectedWallet = getWallet;
        this.showMnemonic = true;
      } else {
        this.loadSavedWalletData(this.selectedWallet.walletId);
        this.showMnemonic = false;
        this.showPrivateKey = false;
      }
    } else {
      this.loadSavedWalletData(
        this.selectedWallet.walletId,
        WalletDataType.MNEMONIC
      );
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
        message: 'Are you sure you want to delete this wallet?',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            cssClass: 'secondary',
          },
          {
            text: 'Yes',
            handler: async () => {
              let getWallet: Wallet;
              if (
                this.selectedWallet.walletType === Coin.ETH ||
                this.selectedWallet.walletType === Coin.BNB
              ) {
                getWallet = {
                  ...this.selectedWallet,
                  privateKey: this.encryptedPrivateKey,
                };
              } else {
                getWallet = {
                  ...this.selectedWallet,
                  privateKey: '',
                  mnemonic: '',
                };
              }
              getWallet = await this.handleGetWalletData(
                getWallet,
                WalletDataType.PRIVATE_KEY
              );
              if (getWallet) {
                this.loadingCtrl
                  .create({
                    message: 'Deleting....',
                    translucent: true,
                  })
                  .then((loadingEl) => {
                    loadingEl.present();
                    setTimeout(() => {
                      this.wallet.deleteWallet(
                        this.selectedWallet.walletId,
                        this.selectedWallet.walletType
                      );
                      loadingEl.dismiss();
                      this.goToWalletsPage();
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
    this.wallet.updateWalletName(
      this.selectedWallet.walletId,
      this.newWalletName,
      this.selectedWallet.walletType
    );
    this.isEditing = false;
  }

  cancelEidt() {
    this.isEditing = false;
  }

  private loadImageToBase64(imgPath, output) {
    this.http.get(imgPath, { responseType: 'blob' }).subscribe((res) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (output == 'walletImgData') {
          this.walletImgData = reader.result;
        }
        if (output == 'walletYourPrivateImg') {
          this.walletYourPrivateImg = reader.result;
        }
        if (output == 'walletYourAdressImg') {
          this.walletYourAdressImg = reader.result;
        }
        if (output == 'walletYourBalanceImg') {
          this.walletYourBalanceImg = reader.result;
        }
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
      watermark: {
        text: 'AEM Algorithm',
        color: '#0F4B73',
        opacity: 0.1,
        bold: true,
      },

      pageSize: {
        width: 294,
        height: 928,
      },
      pageMargins: 0,

      content: [
        {
          layout: 'noBorders',
          table: {
            widths: [294],
            heights: [300, 300, 300],
            body: [
              [
                {
                  stack: [
                    {
                      text: 'AEM+ Paper wallet',
                      style: 'header',
                    },
                    {
                      alignment: 'center',
                      margin: [70, 0, 0, 0],
                      columnGap: 0,
                      columns: [
                        {
                          image: `${this.walletImgData}`,
                          width: 15,
                          height: 15,
                          margin: [0, 0, 5, 0],
                        },
                        {
                          width: '80%',
                          alignment: 'left',
                          text: `${walletData.walletName}`,
                          style: 'subHeader',
                        },
                      ],
                    },
                    {
                      alignment: 'center',
                      width: 'auto',
                      margin: [70, 30, 0, 0],
                      columnGap: -30,
                      columns: [
                        {
                          margin: [0, 20, 0, 0],
                          table: {
                            widths: [120],
                            body: [
                              [
                                {
                                  text: `${new Date().toLocaleDateString()}`,
                                  fontSize: 20,
                                },
                              ],
                              [
                                {
                                  text: [
                                    {
                                      text: `${
                                        walletData.walletBalance[0]
                                          ? walletData.walletBalance[0]
                                          : ' '
                                      }`,
                                      style: { fontSize: 20, italics: true },
                                    },
                                    {
                                      text: ` ${this.selectedWallet.currency}`,
                                      style: { fontSize: 20, italics: true },
                                    },
                                  ],
                                },
                              ],
                              [
                                {
                                  text: [
                                    {
                                      text: `${
                                        walletData.walletBalance[1]
                                          ? walletData.walletBalance[1]
                                          : ' '
                                      }`,
                                      style: { fontSize: 20, italics: true },
                                    },
                                    {
                                      text: ` ${walletData.walletType}`,
                                      style: { fontSize: 20, italics: true },
                                    },
                                  ],
                                },
                              ],
                              [
                                {
                                  text: `${
                                    this.walletPaperNote
                                      ? this.walletPaperNote
                                      : ' '
                                  }`,
                                  fontSize: 20,
                                  style: {
                                    italics: true,
                                  },
                                },
                              ],
                            ],
                          },
                          layout: 'noBorders',
                          color: 'black',
                          fillColor: 'white',
                        },
                        {
                          margin: [0, 0, 0, 0],
                          image: `${this.walletYourBalanceImg}`,
                          fit: [50, 200],
                          //   style: "rotate",
                        },
                      ],
                    },
                  ],
                  fillColor: '#0F4B73',
                },
              ],
              //  ---------- image & name

              [
                // ------------  balance on Date row
                {
                  stack: [
                    {
                      text: 'Your Private Key',
                      style: 'privateKeyTitle',
                    },
                    {
                      text: `${walletData.privateKey}`,
                      style: ['privateKey'],
                    },
                    {
                      alignment: 'center',
                      width: 'auto',
                      margin: [70, 30, 0, 0],
                      columnGap: -30,
                      columns: [
                        {
                          margin: [0, 10, 0, 0],
                          qr: `${walletData.privateKey || ' '}`,
                          fit: '118',
                          width: 118,
                          height: 118,
                          style: 'qrcode',
                        },
                        {
                          margin: [0, 20, 0, 0],
                          fit: [100, 100],
                          image: `${this.walletYourPrivateImg}`,
                        },
                      ],
                    },
                  ],
                  fillColor: 'white',
                },
              ],
              [
                // ------------  balance on Date row
                {
                  stack: [
                    {
                      text: 'Your address',
                      style: 'privateKeyTitle',
                    },
                    {
                      text: `${walletData.walletAddress}`,
                      style: ['privateKey'],
                    },
                    {
                      alignment: 'center',
                      width: 'auto',
                      margin: [70, 30, 0, 0],
                      columnGap: -30,
                      columns: [
                        {
                          margin: [0, 10, 0, 0],
                          qr: `${walletData.walletAddress}`,
                          fit: '124',
                          width: 124,
                          height: 124,
                          style: 'qrcode',
                        },
                        {
                          margin: [0, 20, 0, 0],
                          fit: [100, 100],
                          image: `${this.walletYourAdressImg}`,
                        },
                      ],
                    },
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
          fontSize: 22,
          bold: true,
          alignment: 'center',
          color: '#F9FAFC',
        },
        subHeader: {
          fontSize: 12,
          alignment: 'center',
          color: '#F9FAFC',
        },
        privateKeyTitle: {
          fontSize: 16,
          bold: true,
          margin: [19, 20, 19, 0],
          alignment: 'left',
        },
        privateKey: {
          margin: [19, 0, 19, 0],
          alignment: 'left',
          fontSize: 12,
        },
        name: {
          fontSize: 12,
          color: '#F9FAFC',
        },
        image: {
          fontSize: 10,
        },
        info: {
          fontSize: 12,
          margin: [0, 5, 0, 5],
        },
        title: {
          fontSize: 16,
          bold: true,
        },
      },
    };

    try {
      this.walletPaperPdf = pdfMake.createPdf(walletPaperDoc);
    } catch (e) {
      console.log('pdfMake.createPdf', e);
    }
  }

  public async downloadWalletPdf() {
    let getWallet: Wallet;
    if (
      this.selectedWallet.walletType === Coin.ETH ||
      this.selectedWallet.walletType === Coin.BNB
    ) {
      getWallet = {
        ...this.selectedWallet,
        privateKey: this.encryptedPrivateKey,
      };
    } else {
      getWallet = {
        ...this.selectedWallet,
        privateKey: '',
        mnemonic: '',
      };
    }
    getWallet = await this.handleGetWalletData(
      getWallet,
      WalletDataType.PRIVATE_KEY
    );
    if (getWallet) {
      const walletData = await this.wallet.getWalletByWalletId(
        this.selectedWallet.walletId,
        false
      );
      getWallet = { ...getWallet, walletBalance: walletData.walletBalance };
      this.createWalletPaper(getWallet);
      getWallet = null;
      if (this.walletPaperPdf) {
        if (this.plt.is('cordova')) {
          this.walletPaperPdf.getBase64(async (data) => {
            const base64Response = await fetch(
              `data:image/jpeg;base64,${data}`
            );
            const blob = await base64Response.blob();
            this.file.exportPDF(
              blob,
              `PaperWallet_${this.selectedWallet.walletName.replace(
                / /g,
                '_'
              )}.pdf`
            );
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
      const decryptedWallet = await this.wallet.decryptWallet(
        wallet,
        pin,
        getData
      );
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
// playground requires you to assign document definition to a variable called dd
