import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';

import * as XLSX from 'xlsx';

import { HelperFunService } from 'src/app/services/helper/helper-fun.service';
import { ToastProvider } from 'src/app/services/toast/toast.provider';
import { FileHelpers } from 'src/utils/FileHelpers';

@Injectable({ providedIn: 'root' })
export class FileProvider {

  constructor(
    private http: HttpClient,
    private platform: Platform,
    private file: File,
    private helper: HelperFunService,
    private toast: ToastProvider,
    private sharing: SocialSharing,
    private imgPicker: ImagePicker,
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
        this.exportFile(directory, 'Transactions', csv, fileName);
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

  public async exportPDF(data: any, fileName: string) {
    if (this.platform.is('cordova')) {
      let directory;
      if (this.platform.is('android')) {
        directory = this.file.externalApplicationStorageDirectory;
      }
      if (this.platform.is('ios')) {
        directory = this.file.dataDirectory;
      }
      if (directory) {
        this.exportFile(directory, "Wallet", data, fileName);
      }
    }
  }

  public async exportXLSX(data) {
    const xlsx = this.convertJSONArrayToXLSX(data);
    const fileName = `aem_transactions_${new Date().getTime()}.xlsx`;
    if (this.platform.is('cordova')) {
      let directory;
      if (this.platform.is('android')) {
        directory = this.file.externalApplicationStorageDirectory;
      }
      if (this.platform.is('ios')) {
        directory = this.file.dataDirectory;
      }
      if (directory) {
        this.exportFile(directory, "Transactions", xlsx, fileName);
      }
    } else {
      const blob = new Blob([xlsx]);
      const element = window.document.createElement('a');
      element.href = window.URL.createObjectURL(blob);
      element.download = fileName;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      return true;
    }
  }

  private exportFile(directory, folderName, file, fileName) {
    this.file.createDir(directory, folderName, true).then((res => {
      this.file.writeFile(directory + folderName, fileName, file, { replace: true })
        .then((res) => {
          if (this.platform.is('cordova')) {
            this.sharing.share(null, null, res.nativeURL).then(value => {
            });
          }
        })
        .catch((error) => {
          this.toast.showErrorExportTransaction(error);
        });
    })).catch((error) => {
      this.toast.showErrorExportTransaction(error);
    });
  }

  private convertJSONArrayToXLSX(data) {
    const sheet = XLSX.utils.json_to_sheet(data);
    const ws = {
      SheetNames: ['export'],
      Sheets: {
        export: sheet,
      }
    };

    const wb = XLSX.write(ws, {
      bookType: 'xlsx',
      bookSST: false,
      type: 'binary'
    });

    return new Blob(
      [this.s2ab(wb)],
      { type: 'application/octet-stream' }
    );
  }

  s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) {
      view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf;
  }

  public async imagePicker(options?: ImagePickerOptions): Promise<any> {
    let imgPickerResult;
    try {
      const checkPermission = await this.imgPicker.hasReadPermission();
      const permission = await this.imgPicker.requestReadPermission();
      options = options ? options : {
        width: 320,
        quality: 30,
        outputType: 1,
        maximumImagesCount: 1,
      };

      imgPickerResult = await this.imgPicker.getPictures(options);
      if (imgPickerResult === 'OK') {
        // Request permission
      } else {
        return 'data:image/jpeg;base64,' + imgPickerResult;
      }
    } catch (error) {
      this.toast.showCatchError(error);
    }
    return null;
  }
}
