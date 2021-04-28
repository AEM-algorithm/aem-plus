import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(private toastCtrl: ToastController) {}

  showAddressCopyMessage() {
    this.toastCtrl
      .create({
        message: 'Address is copied!',
        duration: 3000,
        position: 'top',
        cssClass: 'address-copied-toast',
      })
      .then((toastEl) => {
        toastEl.present();
      });
  }
}
