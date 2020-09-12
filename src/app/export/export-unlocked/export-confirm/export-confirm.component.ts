import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-export-confirm',
  templateUrl: './export-confirm.component.html',
  styleUrls: ['./export-confirm.component.scss'],
})
export class ExportConfirmComponent implements OnInit {
  constructor(private modalCtrl: ModalController, private lodingCtrl: LoadingController) {}

  ngOnInit() {}

  onExport() {
    this.lodingCtrl.create({ message: 'Export completed.' }).then((loadingEl) => {
      loadingEl.present();
      setTimeout(() => {
        this.modalCtrl.dismiss();
        loadingEl.dismiss();
      }, 1000);
    });

    // TODO:
    // 1. show the in-app sharing window
    //  --- user can share this exported transaction via different tools: email, social media ...
  }
}
