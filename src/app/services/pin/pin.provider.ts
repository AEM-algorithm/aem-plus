import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

import { PinModalComponent } from 'src/app/pin-modal/pin-modal.component';
import { AlertProvider } from 'src/app/services/alert/alert.provider';

@Injectable({ providedIn: 'root' })
export class PinProvider {

  constructor(
    private modalCtrl: ModalController,
    private alertProvider: AlertProvider,
    private translate: TranslateService,
  ) {
  }

  public async showEnterPin(options?: { title: string }): Promise<string | null> {
    const res = await this.translate.get(['ENTER_SECURITY'], {}).toPromise();
    const pinModal = await this.modalCtrl.create({
      component: PinModalComponent,
      componentProps: {
        title: options ? options.title : res['ENTER_SECURITY']
      }
    });

    await pinModal.present();

    const data = await pinModal.onDidDismiss();
    return data.data ? data.data['pin'] : null;
  }

  public async showDoublePinCheck(options?: { title1: string, title2: string }): Promise<string | null> {
    const res = await this.translate.get(['ENTER_NEW_SECURITY', 'CONFIRM_NEW_SECURITY'], {}).toPromise();
    const pin1Modal = await this.modalCtrl.create({
      component: PinModalComponent,
      componentProps: {
        title: options ? options.title1 : res['ENTER_NEW_SECURITY']
      }
    });

    pin1Modal.present();

    const data1 = await pin1Modal.onDidDismiss();

    if (!data1.data || !data1.data['pin']) {
      return null;
    }

    const pin2Modal = await this.modalCtrl.create({
      component: PinModalComponent,
      componentProps: {
        title: options ? options.title2 : res['CONFIRM_NEW_SECURITY']
      }
    });

    pin2Modal.present();

    const data2 = await pin2Modal.onDidDismiss();
    if (!data2.data || !data2.data['pin']) {
      return null;
    }
    if (data1.data['pin'] !== data2.data['pin']) {
      this.alertProvider.showPasswordDoNotMatch();
      return null;
    }
    return data1.data['pin'];
  }

}
