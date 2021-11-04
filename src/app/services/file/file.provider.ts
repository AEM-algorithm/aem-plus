import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';

import { FileHelpers } from 'src/utils/FileHelpers';
import { HelperFunService } from 'src/app/services/helper/helper-fun.service';

@Injectable({ providedIn: 'root' })
export class FileProvider {
  csvData: any[] = [];
  headerRow: any[] = [];

  constructor(
    private http: HttpClient,
    private platform: Platform,
    private file: File,
    private helper: HelperFunService,
  ) {
  }

  public async exportCSV(data) {
    const csv = FileHelpers.convertJSONArrayToCSV(data);
    const fileName = `AEM-Plus-Transactions-${this.helper.momentFormatDate(new Date())}.csv`;
    if (this.platform.is('cordova')) {
      const writeFile = await this.file.writeFile(
        this.file.dataDirectory,
        fileName,
        csv,
        {replace: true}
      );
      return writeFile;
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
}
