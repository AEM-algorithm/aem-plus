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

  async showErrorEnterNodeInvalid() {
    this.translate.get(['OK'], {}).subscribe(async res => {
      const toast = await this.toastController.create({
        message: 'Add custom node invalid',
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

  showErrorSelectWalletType() {
    this.translate.get(['OK'], {}).subscribe(async res => {
      const toast = await this.toastController.create({
        message: 'Please select wallet type',
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

  showErrorSelectPeriodTransaction() {
    this.translate.get(['OK'], {}).subscribe(async res => {
      const toast = await this.toastController.create({
        message: 'There is no transaction in this period',
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

  showErrorExportTransaction(error) {
    this.translate.get(['OK'], {}).subscribe(async res => {
      const toast = await this.toastController.create({
        message: 'Export transactions Error: ' + JSON.stringify(error),
        position: 'top',
        buttons: [{
          text: res['OK'],
          role: 'cancel',
          handler: () => {
          }
        }
        ],
        duration: 2000,
      });
      toast.color = 'danger';
      await toast.present();
    });
  }
}


