// modules
import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  ModalController,
  Platform,
} from '@ionic/angular';
import * as pdfMake from 'pdfmake/build/pdfmake';

// services
import {ToastProvider} from '@app/services/toast/toast.provider';
import {FileProvider} from '@app/services/file/file.provider';

@Component({
  selector: 'app-receive-donation-modal',
  templateUrl: './receive-donation-modal.component.html',
  styleUrls: ['./receive-donation-modal.component.scss'],
})
export class ReceiveDonationModalComponent implements OnInit {
  @Input() data: any;
  invoice: {
    amount: number,
    currency: string,
    amountCrypto: number,
    crypto: string,
    date: string,
    invoiceNumber: string,
    receiver: string,
    description: string
  };

  constructor(
    private modalCtrl: ModalController,
    private platform: Platform,
    private toast: ToastProvider,
    private file: FileProvider,
  ) {
    this.invoice = {
      amount: 0,
      amountCrypto: 0,
      crypto: '',
      date: '',
      invoiceNumber: '',
      receiver: 'AEM+',
      currency: '',
      description: '',
    }
  }

  ngOnInit() {
    if (this.data) {
      this.invoice = {
        ...this.invoice,
        ...this.data,
      };
    }
  }

  async handleBackOnClick() {
    await this.modalCtrl.dismiss({back: false});
  }

  async handleGeneratePDFOnClick() {
    await this.onHandleInvoiceGenerator();
  }

  async onHandleInvoiceGenerator() {
    const invoice = {
      pageSize: {
        width: 294,
        height: 426,
      },
      content: [
        {
          layout: 'noBorders',
          table: {
            widths: [200],
            heights: [340],
            body: [
              [
                {
                  fillColor: '#F9FAFC',
                  stack: [
                    {
                      text: `$ ${this.invoice.amount} ${this.invoice.currency}`,
                      style: 'title1',
                    },
                    {
                      text: `${this.invoice.amountCrypto} ${this.invoice.crypto}`,
                      style: 'title2',
                    },
                    {
                      alignment: 'center',
                      columnGap: 0,
                      columns: [
                        {
                          text: 'Date',
                          style: 'text',
                          alignment: 'right',
                          margin: [0, 0, 5, 0]
                        },
                        {
                          text: this.invoice.date,
                          style: 'text',
                          alignment: 'left',
                        },
                      ],
                      style: 'mt',
                    },
                    {
                      alignment: 'center',
                      columnGap: 0,
                      columns: [
                        {
                          text: 'Invoice number',
                          style: 'text',
                          alignment: 'right',
                          margin: [0, 0, 5, 0]
                        },
                        {
                          text: this.invoice.invoiceNumber,
                          style: 'text',
                          alignment: 'left',
                        },
                      ],
                      style: 'mt2',
                    },
                    {
                      alignment: 'center',
                      columnGap: 0,
                      columns: [
                        {
                          text: 'Receiver',
                          style: 'text',
                          alignment: 'right',
                          margin: [0, 0, 5, 0]
                        },
                        {
                          text: this.invoice.receiver,
                          style: 'text',
                          alignment: 'left',
                        },
                      ],
                      style: 'mt2',
                    },
                    {
                      alignment: 'center',
                      columnGap: 0,
                      columns: [
                        {
                          text: 'Description',
                          style: 'text',
                          alignment: 'right',
                          margin: [0, 0, 5, 0]
                        },
                        {
                          text: this.invoice.description,
                          style: 'text',
                          alignment: 'left',
                        },
                      ],
                      style: 'mt2',
                    }
                  ]
                }
              ]
            ]
          },
        },
      ],
      defaultStyle: {
        alignment: 'center',
      },
      styles: {
        title1: {
          fontSize: 20,
          bold: true,
          alignment: 'center',
          color: '#074673',
          marginTop: 32,
        },
        title2: {
          fontSize: 12,
          alignment: 'center',
          color: '#707070',
        },
        mt: {
          marginTop: 32,
        },
        mt2: {
          marginTop: 8,
        },
        text: {
          fontSize: 10,
          color: '#707070',
        }
      }
    };
    try {
      const invoicePDF = pdfMake.createPdf(invoice);
      if (this.platform.is('cordova')) {
        invoicePDF.getBase64(async (data) => {
          const base64Response = await fetch(`data:image/jpeg;base64,${data}`);
          const blob = await base64Response.blob();
          await this.file.exportPDF(blob, new Date().getTime() + '_invoice.pdf');
        });
      } else {
        invoicePDF.download();
      }
    }catch (e) {
      this.toast.showMessageError(e);
    }
  }
}
