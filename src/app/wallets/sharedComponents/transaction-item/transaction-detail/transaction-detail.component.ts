// modules
import { Component, Input, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

// services
import { Transaction } from 'src/app/services/models/transaction.model';
import { FileProvider } from '@app/services/file/file.provider';
import { WalletProvider } from '@app/services/wallets/wallet.provider';
import {ClipboardProvider} from '@app/services/clipboard/clipboard.provider';
import {UtilsService} from '@app/services/helper/utils.service';

// pdf
import * as pdfMake from 'pdfmake/build/pdfmake';
import '@utils/pdfMake.font';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss'],
})
export class TransactionDetailComponent implements OnInit {
  @Input() selectedTrans: Transaction;
  @Input() selectedWallet: any;

  date: string;
  walletName: string;
  description: string;

  fromAddress: string;
  receiver: string;
  currency: string;

  invoicePdf = null;

  logoImgData = null;

  constructor(
    private modalCtrl: ModalController,
    private wallet: WalletProvider,
    private plt: Platform,
    private http: HttpClient,
    private file: FileProvider,
    private clipboard: ClipboardProvider,
    private utils: UtilsService,
  ) {}

  loadImageToBase64() {
    const logoImgPath = 'assets/logos/logo.png';

    this.http.get(logoImgPath, { responseType: 'blob' }).subscribe((res) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.logoImgData = reader.result;
        console.log(this.logoImgData);
      };
      reader.readAsDataURL(res);
    });
  }

  async ngOnInit() {
    this.getDate();
    this.currency = this.selectedWallet?.currency;
    this.walletName = '';
    this.description = this.selectedTrans.description;

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
                  text:
                    this.selectedTrans.amountCurrency > -1
                      ? `$ ${this.selectedTrans.amountCurrency}`
                      : '',
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
                  text: `${this.selectedTrans.amount} ${this.selectedTrans.type}`,
                  style: ['greyText', { alignment: 'right' }],
                  border: [false, false, false, false],
                },
              ],
              // [
              //   {
              //     text: 'Tax',
              //     style: ['greyText', { margin: [0, 0, 0, 20] }],
              //     border: [false, false, false, true],
              //     borderColor: ['#F7F7F7', '#F7F7F7', '#F7F7F7', '#E4E4E4'],
              //   },
              //   {
              //     text: `${this.selectedTrans.tax}`,
              //     style: [
              //       'greyText',
              //       { alignment: 'right', margin: [0, 0, 0, 20] },
              //     ],
              //     border: [false, false, false, true],
              //     borderColor: ['#F7F7F7', '#F7F7F7', '#F7F7F7', '#E4E4E4'],
              //   },
              // ],
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
                      text:
                        this.selectedTrans.amountCurrency > -1
                          ? `$ ${this.selectedTrans.amountCurrency} ${this.currency}`
                          : '',
                      style: {
                        color: '#074673',
                        bold: true,
                        fontSize: 30,
                        alignment: 'center',
                      },
                    },
                    {
                      text: `${this.selectedTrans.amount} ${this.selectedTrans.type}`,
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
                  text: new Date().getTime(),
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
              // [
              //   { text: 'Business No', style: 'greyText' },
              //   { text: this.selectedTrans.ABN, style: { alignment: 'right' } },
              // ],
              [
                { text: 'Message', style: 'greyText' },
                {
                  text: `${this.selectedTrans.description}`,
                  style: { alignment: 'right', font: 'jp' },
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

  private async openInvoice(data: any) {
    const base64Response = await fetch(`data:image/jpeg;base64,${data}`);
    const blob = await base64Response.blob();
    await this.file.exportPDF(blob, new Date().getTime() + '_invoice.pdf');
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

  async handleCopyOnClick(text: string) {
    await this.clipboard.copy(text);
    await this.utils.showAddressCopyMessage();
  }
}
