import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { PinModalComponent } from 'src/app/pin-modal/pin-modal.component';
import { AlertProvider } from 'src/app/services/alert/alert.provider';

@Injectable({providedIn: 'root'})
export class PinProvider {

  constructor(
    private modalCtrl: ModalController,
    private alertProvider: AlertProvider,
  ) {
  }

  public async showEnterPin(options?: { title: string }): Promise<string | null> {
    const pinModal = await this.modalCtrl.create({
      component: PinModalComponent,
      componentProps: {
        title: options ? options.title : 'Enter Security Code'
      }
    });

    await pinModal.present();

    const data = await pinModal.onDidDismiss();

    return data.data ? data.data.pin : null;
  }

  public async showDoublePinCheck(options?: { title1: string, title2: string }): Promise<string | null> {
    const pin1Modal = await this.modalCtrl.create({
      component: PinModalComponent,
      componentProps: {
        title: options ? options.title1 : 'Enter new Security Code'
      }
    });

    await pin1Modal.present();

    const data1 = await pin1Modal.onDidDismiss();

    if (!data1.data || !data1.data.pin) {
      return null;
    }

    const pin2Modal = await this.modalCtrl.create({
      component: PinModalComponent,
      componentProps: {
        title: options ? options.title2 : 'Confirm new Security Code'
      }
    });

    await pin2Modal.present();

    const data2 = await pin2Modal.onDidDismiss();
    if (!data2.data || !data2.data.pin) {
      return null;
    }
    if (data1.data.pin !== data2.data.pin) {
      this.alertProvider.showPasswordDoNotMatch();
      return null;
    }
    return data1.data.pin;
  }

}
