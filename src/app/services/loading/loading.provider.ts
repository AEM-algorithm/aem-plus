import { Injectable } from '@angular/core';
import { LoadingController, LoadingOptions } from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class LoadingProvider {
  loading;

  constructor(
    public loadingController: LoadingController
  ) {}

  async presentLoading() {
    this.loading = await this.loadingController.create();
    this.loading.present();
  }

  async presentLoadingWithOptions(loadingOptions: LoadingOptions) {
    this.loading = await this.loadingController.create(loadingOptions);
    this.loading.present();
  }

  async dismissLoading() {
    if (this.loading) {
      this.loading.dismiss();
    }
  }
}
