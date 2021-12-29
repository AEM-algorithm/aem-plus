import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ModalController } from '@ionic/angular';

import { FileProvider } from 'src/app/services/file/file.provider';
import { ExportTransactionModel } from '@app/services/models/export-transaction.model';

@Component({
  selector: 'app-export-modal',
  templateUrl: './export-modal.component.html',
  styleUrls: ['./export-modal.component.scss'],
})
export class ExportModalComponent implements OnInit {
  @Input() exportTransactions: ExportTransactionModel[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private file: FileProvider,
  ) { }

  ngOnInit() {}

  async download(type: 'csv' | 'excel') {

    const exportTxs = this.exportTransactions.map((value: ExportTransactionModel) => new ExportTransactionModel(
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
        await this.file.exportXLSX(exportTxs);
        break;
      case 'csv':
        await this.file.exportCSV(exportTxs);
        break;
    }
    await this.router.navigateByUrl('/tabnav/export/export-complete');
    await this.modalCtrl.dismiss();
  }
}
