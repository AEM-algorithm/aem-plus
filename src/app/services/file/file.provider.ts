import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import { FileHelpers } from 'src/utils/FileHelpers';
import { HelperFunService } from 'src/app/services/helper/helper-fun.service';
import { ToastProvider } from 'src/app/services/toast/toast.provider';

@Injectable({ providedIn: 'root' })
export class FileProvider {

  constructor(
    private http: HttpClient,
    private platform: Platform,
    private file: File,
    private helper: HelperFunService,
    private toast: ToastProvider,
    private sharing: SocialSharing,
  ) {
  }

  public async exportCSV(data) {
    const csv = FileHelpers.convertJSONArrayToCSV(data);
    const fileName = `aem_transactions_${new Date().getTime()}.csv`;
    if (this.platform.is('cordova')) {
      let directory;
      if (this.platform.is('android')) {
        directory = this.file.externalApplicationStorageDirectory;
      }
      if (this.platform.is('ios')) {
        directory = this.file.dataDirectory;
      }
      if (directory) {
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
      // DEBUG:
      // alert(JSON.stringify('createDir' + JSON.stringify(res)));
      // console.log('createDir', res);
      this.file.writeFile(directory + 'Transactions', fileName, file, { replace: true })
        .then((res) => {
          if (this.platform.is('cordova')) {
            this.sharing.share(null, null, res.nativeURL).then(value => {
              // DEBUG:
              // console.log('sharing', value);
            });
          }
          // DEBUG:
          // alert(JSON.stringify('writeFile' + JSON.stringify(res)));
        })
        .catch((error) => {
          // DEBUG:
          // alert('writeFile' + JSON.stringify(error));
          this.toast.showErrorExportTransaction(error);
        });
    })).catch((error) => {
      // DEBUG:
      // alert('createDir' + JSON.stringify(error));
      this.toast.showErrorExportTransaction(error);
    });
  }
}
