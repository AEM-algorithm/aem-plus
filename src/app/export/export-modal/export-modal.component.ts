import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ModalController } from '@ionic/angular';

import { FileProvider } from 'src/app/services/file/file.provider';
import {TransactionExportModel } from '@app/services/models/transaction-export.model';

@Component({
  selector: 'app-export-modal',
  templateUrl: './export-modal.component.html',
  styleUrls: ['./export-modal.component.scss'],
})
export class ExportModalComponent implements OnInit {
  @Input() transactionExports;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private file: FileProvider,
  ) { }

  ngOnInit() { }

  async download(type: 'csv' | 'excel') {

    const txsExport = this.transactionExports.map((value: TransactionExportModel) => new TransactionExportModel(
      value.date,
      value.walletAddress,
      value.token,
      value.transactionAmount,
      value.convertedAmount,
      value.convertedCurrency,
      value.payer,
      value.message,
    ).format());

    switch (type) {
      case 'excel':
        await this.file.exportXLSX(txsExport);
        break;
      case 'csv':
        await this.file.exportCSV(txsExport);
        break;
    }
    await this.router.navigateByUrl('/tabnav/export/export-complete');
    await this.modalCtrl.dismiss();
  }
}
