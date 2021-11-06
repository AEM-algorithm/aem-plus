import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';

import { FileHelpers } from 'src/utils/FileHelpers';
import { HelperFunService } from 'src/app/services/helper/helper-fun.service';
import { ToastProvider } from 'src/app/services/toast/toast.provider';

@Injectable({ providedIn: 'root' })
export class FileProvider {
  csvData: any[] = [];
  headerRow: any[] = [];

  constructor(
    private http: HttpClient,
    private platform: Platform,
    private file: File,
    private helper: HelperFunService,
    private toast: ToastProvider,
  ) {
  }

  public async exportCSV(data) {
    const csv = FileHelpers.convertJSONArrayToCSV(data);
    const fileName = `aem_transaction_${new Date().getTime()}.csv`;
    if (this.platform.is('cordova')) {
      if (this.platform.is('android')) {
        const directory = this.file.externalDataDirectory;
        this.exportFile(directory, csv, fileName);
      }
    } else {
      const blob = new Blob([csv]);
      const element = window.document.createElement('a');
      element.href = window.URL.createObjectURL(blob);
      element.download = fileName;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      return true;
    }
  }

  exportFile(directory, file, fileName) {
    this.file.createDir(directory, 'Transactions', true).then((res => {
      // DEBUG: alert(JSON.stringify('createDir' + JSON.stringify(val)));
      this.file.writeFile(directory + 'Transactions', fileName, file, { replace: true })
        .then((res) => {
          // DEBUG: alert(JSON.stringify('writeFile' + JSON.stringify(en)));
        })
        .catch((error) => {
          // DEBUG: alert('writeFile' + JSON.stringify(error));
          this.toast.showErrorExportTransaction(error);
        });
    })).catch((error) => {
      // DEBUG: alert('createDir' + JSON.stringify(error));
      this.toast.showErrorExportTransaction(error);
    });
  }
}
