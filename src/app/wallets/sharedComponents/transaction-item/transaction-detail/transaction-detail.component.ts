import { Component, Input, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { Transaction } from 'src/app/services/models/transaction.model';
import { WalletsService } from 'src/app/services/wallets/wallets.service';

import { FileOpener } from '@ionic-native/file-opener/ngx';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Capacitor, Plugins, FilesystemDirectory } from '@capacitor/core';
import { HttpClient } from '@angular/common/http';
import { BoundElementProperty } from '@angular/compiler';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

const { Filesystem } = Plugins;

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss'],
})
export class TransactionDetailComponent implements OnInit {
  @Input() selectedTrans: Transaction;

  date: string;
  walletType: string;
  walletName: string;

  fromAddress: string;
  receiver: string;

  invoicePdf = null;

  logoImgData = null;

  constructor(
    private modalCtrl: ModalController,
    private walletsService: WalletsService,
    private plt: Platform,
    private http: HttpClient,
    private fileOpener: FileOpener
  ) {}

  loadImageToBase64() {
    let logoImgPath = 'assets/logos/logo.png';

    this.http.get(logoImgPath, { responseType: 'blob' }).subscribe((res) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.logoImgData = reader.result;
        console.log(this.logoImgData);
      };
      reader.readAsDataURL(res);
    });
  }

  ngOnInit() {
    this.getDate();

    const wallet = this.walletsService.getWalletByAddress(
      this.selectedTrans.address
    );
    this.walletName = wallet?.walletName;

    this.loadImageToBase64();
  }

  getDate() {
    this.date = new Date(this.selectedTrans.time).toDateString();
  }

  private createInvoicePdf() {
    const invoiceDoc = {
      pageSize: {
        width: 375,
        height: 812,
      },
      pageMargins: 0,
      // ------- add bg to entire page:
      background: function () {
        return {
          canvas: [
            {
              type: 'rect',
              x: 0,
              y: 0,
              w: 375,
              h: 812,
              color: '#F7F7F7',
            },
          ],
        };
      },

      content: [
        //  =============== title & image table: done
        {
          layout: 'noBorders',
          style: 'titleTable',
          table: {
            widths: [320],
            body: [
              [
                {
                  stack: [
                    {
                      image: `${this.logoImgData}`,
                      width: 50,
                      alignment: 'center',
                    },
                    {
                      text: 'TAX INVOICE',
                      style: 'header',
                    },
                  ],
                },
              ],
            ],
          },
        },

        //  =============== invoice amount table: : last row margin bottom
        {
          style: 'defaultTableMargin',
          table: {
            widths: [120, 200],
            heights: ['*', '*', '*', '30'],
            body: [
              [
                {
                  text: 'Invoice Amount',
                  style: 'tableHeader',
                  border: [false, false, false, false],
                },
                {
                  text: '',
                  border: [false, false, false, false],
                },
              ],
              [
                {
                  text: 'Amount',
                  style: 'greyText',
                  border: [false, false, false, false],
                },
                {
                  text: `$ ${this.selectedTrans.amountAUD}`,
                  style: { alignment: 'right' },
                  border: [false, false, false, false],
                },
              ],
              [
                {
                  text: '',
                  border: [false, false, false, false],
                },
                {
                  text: `${this.selectedTrans.amount} ${this.walletType}`,
                  style: ['greyText', { alignment: 'right' }],
                  border: [false, false, false, false],
                },
              ],
              [
                {
                  text: 'Tax',
                  style: ['greyText', { margin: [0, 0, 0, 20] }],
                  border: [false, false, false, true],
                  borderColor: ['#F7F7F7', '#F7F7F7', '#F7F7F7', '#E4E4E4'],
                },
                {
                  text: `${this.selectedTrans.tax}`,
                  style: [
                    'greyText',
                    { alignment: 'right', margin: [0, 0, 0, 20] },
                  ],
                  border: [false, false, false, true],
                  borderColor: ['#F7F7F7', '#F7F7F7', '#F7F7F7', '#E4E4E4'],
                },
              ],
            ],
          },
        },

        // ================ amount area:
        {
          style: 'amountArea',
          // layout: 'headerLineOnly',
          table: {
            widths: [320],
            heights: [90],
            // headerRow: 1,

            body: [
              [
                {
                  stack: [
                    {
                      text: `$ ${this.selectedTrans.amountAUD} AUD`,
                      style: {
                        color: '#074673',
                        bold: true,
                        fontSize: 30,
                        alignment: 'center',
                      },
                    },
                    {
                      text: `${this.selectedTrans.amount} ${this.walletType}`,
                      style: ['greyText', { alignment: 'center' }],
                    },
                  ],
                  border: [false, false, false, true],
                  borderColor: ['#F7F7F7', '#F7F7F7', '#F7F7F7', '#E6E7E8'],
                },
              ],
            ],
          },
        },

        //  ================ Invoice detail
        {
          style: 'defaultTableMargin',
          table: {
            widths: [120, 200],
            heights: [20, 30],
            body: [
              [
                {
                  text: 'Invoice Detail',
                  style: 'tableHeader',
                  border: [false, false, false, false],
                },
                {
                  text: '',
                  border: [false, false, false, false],
                },
              ],
              [
                {
                  text: 'Invoice no',
                  style: 'greyText',
                  border: [false, false, false, true],
                  borderColor: ['#F7F7F7', '#F7F7F7', '#F7F7F7', '#E4E4E4'],
                },
                {
                  text: 'XXXX 0123 4567',
                  style: { alignment: 'right' },
                  border: [false, false, false, true],
                  borderColor: ['#F7F7F7', '#F7F7F7', '#F7F7F7', '#E4E4E4'],
                },
              ],
            ],
          },
        },
        {
          style: 'defaultTableMargin2',
          layout: 'noBorders',
          table: {
            widths: [120, 200],
            heights: [20, 15, 20, 20, 20, 20, 20],
            body: [
              [
                { text: 'From', style: 'greyText' },
                { text: this.walletName, style: { alignment: 'right' } },
              ],
              [
                '',
                {
                  text: this.selectedTrans.address,
                  style: { alignment: 'right', fontSize: 10, color: '#707070' },
                },
              ],
              [
                { text: 'Receiver', style: 'greyText' },
                {
                  text: this.selectedTrans.receiver,
                  style: { alignment: 'right' },
                },
              ],
              // ['', { text: this.selectedTrans.recevierAddress, style: { alignment: 'right' } }],
              [
                { text: 'Date', style: 'greyText' },
                { text: this.date, style: { alignment: 'right' } },
              ],
              [
                { text: 'Business No', style: 'greyText' },
                { text: this.selectedTrans.ABN, style: { alignment: 'right' } },
              ],
              [
                { text: 'Description', style: 'greyText' },
                {
                  text: `${this.selectedTrans.description}`,
                  style: { alignment: 'right' },
                },
              ],
            ],
          },
          fillColor: '#F7F7F7',
        },
      ],
      defaultStyle: {
        // alignment: 'center',
        background: '#F7F7F7',
      },
      styles: {
        header: {
          fontSize: 38,
          bold: true,
          alignment: 'center',
          color: '#0F4B73',
          margin: [0, 20, 0, 10],
        },

        titleTable: {
          margin: [0, 30, 0, 20],
        },
        defaultTableMargin: {
          margin: [20, 0, 30, 10],
        },
        defaultTableMargin2: {
          margin: [25, 0, 30, 10],
        },

        tableHeader: {
          color: '#0F4B73',
          fontSize: 14,
          bold: true,
          margin: [0, 0, 0, 10],
        },

        greyText: {
          color: '#707070',
          fontSize: 14,
        },
        amountArea: {
          margin: [20, 30, 30, 30],
        },

        amount: {
          fontSize: 20,
          alignment: 'center',
          color: '#F9FAFC',
          margin: 10,
        },
        title: {
          fontSize: 18,
          margin: [0, 20, 0, 10],
          alignment: 'center',
        },
      },
    };

    this.invoicePdf = pdfMake.createPdf(invoiceDoc);
  }

  private openInvoice(data: any) {
    const fileName = 'invoice.pdf'; // any requirement for file name???
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
            if (Capacitor.getPlatform() === 'ios') {
              this.fileOpener
                .open(path, 'application/pdf')
                .then(() => console.log('File is opened'))
                .catch((error) => console.log('Error openening file', error));
            }
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

  async exportInvoice() {
    this.createInvoicePdf();

    if (this.invoicePdf) {
      if (this.plt.is('cordova')) {
        this.invoicePdf.getBase64(async (data) => {
          this.openInvoice(data);
        });
      } else {
        // web download:
        this.invoicePdf.download();
      }
    }
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
