import { Injectable } from '@angular/core';

import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class ToastProvider {

  constructor(
    private toastController: ToastController,
    private translate: TranslateService,
  ) {}

  async showErrorSearchByAmount() {
    this.translate.get(['OK'], {}).subscribe(async res => {
      const toast = await this.toastController.create({
        message: 'Search by amount invalid',
        position: 'top',
        buttons: [{
            text: res['OK'],
            role: 'cancel',
            handler: () => {
            }
          }
        ],
        duration: 3000,
      });
      toast.color = 'danger';
      await toast.present();
    });
  }

  async showErrorPeriod() {
    this.translate.get(['OK'], {}).subscribe(async res => {
      const toast = await this.toastController.create({
        message: 'Search period invalid',
        position: 'top',
        buttons: [{
          text: res['OK'],
          role: 'cancel',
          handler: () => {
          }
        }
        ],
        duration: 3000,
      });
      toast.color = 'danger';
      await toast.present();
    });
  }
}


