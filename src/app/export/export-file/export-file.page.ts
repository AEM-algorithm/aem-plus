import { Component, OnInit } from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';


import { Router, ActivatedRoute } from '@angular/router';
import { ExportModalComponent } from '../export-modal/export-modal.component';
declare var cordova;
@Component({
  selector: 'app-export-file',
  templateUrl: './export-file.page.html',
  styleUrls: ['./export-file.page.scss'],
})
export class ExportFilePage implements OnInit {
  lastImage = {
    name: '',
    url: '',
    data: '',
  };
  authToken = '';
  constructor(
    private transfer: FileTransfer, 
    private file: File,
    private nativeHTTP: HTTP,
    private alterCtrl: AlertController,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
  }
  async download() {
    const pinModal = await this.modalCtrl.create({
      component: ExportModalComponent,
      cssClass: 'height-sixty-modal',
      componentProps: {
        title: ''
      }
    });
    await pinModal.present();
  }

}
