import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ModalController } from '@ionic/angular';

import { FileProvider } from 'src/app/services/file/file.provider';

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
    switch (type) {
      case 'excel':
        // TODO
        break;
      case 'csv':
        await this.file.exportCSV(this.transactionExports);
        break;
    }
    await this.router.navigateByUrl('/tabnav/export/export-complete');
    await this.modalCtrl.dismiss();
  }
}
