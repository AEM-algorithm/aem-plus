import { Component, Input, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { Transaction } from 'src/app/services/models/transaction.model';
import { WalletsService } from 'src/app/services/wallets/wallets.service';

import { FileOpener } from '@ionic-native/file-opener/ngx';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Capacitor, Plugins, FilesystemDirectory } from '@capacitor/core';
import { HttpClient } from '@angular/common/http';

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

  constructor(
    private modalCtrl: ModalController,
    private walletsService: WalletsService,
    private plt: Platform,
    private http: HttpClient,
    private fileOpener: FileOpener
  ) {}

  ngOnInit() {
    this.getDate();

    const wallet = this.walletsService.getWalletByAddress(this.selectedTrans.address);
    this.walletName = wallet.walletName;
    this.walletType = wallet.walletType;
  }

  getDate() {
    this.date = new Date(this.selectedTrans.time).toDateString();
  }

  private createInvoicePdf() {
    const invoiceDoc = {
      pageSize: 'A4',
      pageMargins: 20,

      content: [
        //  -------- title & amount info
        // {
        //   text: 'AEM+ Invoice',
        //   style: 'header',
        // },

        // {
        //   text: `${this.selectedTrans.amountAUD} AUD`,
        //   style: { alignment: 'center' },
        // },

        // {
        //   text: `${this.selectedTrans.amount} ${this.walletType}`,
        //   style: { alignment: 'center' },
        // },

        // --------- Transaction detail
        // {
        //   text: 'Transaction detail',
        //   style: {
        //     fontSize: 18,
        //     margin: 20,
        //     alignment: 'center',
        //   },
        // },
        // {
        //   columns: [
        //     {
        //       // layout: 'noBorders',
        //       style: 'leftCols',
        //       table: {
        //         body: [[{ text: 'From' }], [{}], [{ text: 'To' }], [{ text: '' }], [{ text: 'Date' }]],
        //       },
        //     },
        //     {
        //       layout: 'noBorders',
        //       style: 'rightCols',
        //       table: {
        //         body: [
        //           [{ text: this.walletType, style: { alignment: 'right' } }],
        //           [{ text: this.selectedTrans.address, style: { alignment: 'right' } }],
        //           [{ text: this.selectedTrans.receiver, style: { alignment: 'right' } }],
        //           [{ text: this.selectedTrans.recevierAddress, style: { alignment: 'right' } }],
        //           [{ text: this.date, style: { alignment: 'right' } }],
        //         ],
        //       },
        //     },
        //   ],
        // },

        //  ---------- Tax detial:
        // {
        //   text: 'Tax detail',
        //   style: {
        //     fontSize: 18,
        //     margin: 20,
        //     alignment: 'center',
        //   },
        // },
        // {
        //   columns: [
        //     {
        //       // layout: 'noBorders',
        //       style: 'leftCols',
        //       table: {
        //         body: [
        //           [{ text: 'Business No' }],
        //           [{ text: 'Amount' }],
        //           [{ text: '' }],
        //           [{ text: 'Fee' }],
        //           [{ text: '' }],
        //           [{ text: 'Tax' }],
        //         ],
        //       },
        //     },
        //     {
        //       layout: 'noBorders',
        //       style: 'rightCols',
        //       table: {
        //         body: [
        //           [{ text: this.selectedTrans.ABN, style: { alignment: 'right' } }],
        //           [{ text: `$${this.selectedTrans.amountAUD}`, style: { alignment: 'right' } }],
        //           [{ text: `${this.selectedTrans.receiver}${this.walletType}`, style: { alignment: 'right' } }],
        //           [{ text: `${this.selectedTrans.feeAud}`, style: { alignment: 'right' } }],
        //           [{ text: `${this.selectedTrans.feeCrypto}${this.walletType}`, style: { alignment: 'right' } }],
        //           [{ text: `${this.selectedTrans.tax}`, style: { alignment: 'right' } }],
        //         ],
        //       },
        //     },
        //   ],
        // },
        // ================== Table layout of pdf view
        //  --------- title & amount
        {
          text: 'AEM+ Invoice',
          style: 'header',
          fillColor: '#0F4B73',
        },
        {
          text: `${this.selectedTrans.amountAUD} AUD`,
          fillColor: '#0F4B73',
          style: { alignment: 'center' },
        },
        {
          text: `${this.selectedTrans.amount} ${this.walletType}`,
          fillColor: '#0F4B73',
          style: { alignment: 'center' },
        },

        //  ----------- transaction table
        {
          text: 'Transaction detail',
          style: {
            fontSize: 18,
            margin: 20,
            alignment: 'center',
          },
        },
        {
          // layout: 'noBorders',
          table: {
            layout: 'noBorders',

            widths: [100, '*'],
            body: [
              ['From', { text: this.walletType, style: { alignment: 'right' } }],
              ['', { text: this.selectedTrans.address, style: { alignment: 'right' } }],
              ['To', { text: this.selectedTrans.receiver, style: { alignment: 'right' } }],
              ['', { text: this.selectedTrans.recevierAddress, style: { alignment: 'right' } }],
              ['Date', { text: this.date, style: { alignment: 'right' } }],
            ],
          },
          // fillColor: '#0F4B73',
          //   },
          // ],
        },
        //   ----- Tax detial table

        {
          text: 'Tax detail',
          style: {
            fontSize: 18,
            margin: 10,
            alignment: 'center',
          },
        },

        {
          layout: 'noBorders',
          style: 'innerTable',

          table: {
            widths: [100, '*'],

            body: [
              ['Business No', { text: this.selectedTrans.ABN, style: { alignment: 'right' } }],
              ['Amount', { text: `$${this.selectedTrans.amountAUD}`, style: { alignment: 'right' } }],
              ['', { text: `${this.selectedTrans.receiver}${this.walletType}`, style: { alignment: 'right' } }],
              ['Fee', { text: `${this.selectedTrans.feeAud}`, style: { alignment: 'right' } }],
              ['', { text: `${this.selectedTrans.feeCrypto}${this.walletType}`, style: { alignment: 'right' } }],
              ['Tax', { text: `${this.selectedTrans.tax}`, style: { alignment: 'right' } }],
            ],
          },

          // fillColor: '#0F4B73',
        },
      ],
      defaultStyle: {
        // alignment: 'center',
      },
      styles: {
        header: {
          fontSize: 20,
          bold: true,
          alignment: 'center',
          lineHeight: 2,
          // color: '#F9FAFC',
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

  exportInvoice() {
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
