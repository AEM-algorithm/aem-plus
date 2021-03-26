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
      // TODO: create the invoice pdf
      content: [
        {
          text: 'AEM+ Invoice',
        },
      ],
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
