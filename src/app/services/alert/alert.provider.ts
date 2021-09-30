import { Injectable } from '@angular/core';

import { AlertController } from '@ionic/angular';

@Injectable({providedIn: 'root'})
export class AlertProvider {

  constructor(private alertCtrl: AlertController) {

  }

  async showInvalidPasswordAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Provided password is invalid',
      buttons: ['OK'],
    });

    await alert.present();
  }


  async showPasswordDoNotMatch() {
    const alert = await this.alertCtrl.create({
      header: 'Introduced Passwords are different',
      buttons: ['OK'],
    });

    await alert.present();
  }

}
