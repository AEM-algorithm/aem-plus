import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent implements OnInit {

  constructor(
    private confirmModalController: ModalController,
    private loadingController: LoadingController,
    private router: Router,
    public alertController: AlertController
  ) { }

  ngOnInit() {}

  close() {
    this.confirmModalController.dismiss();
  }

  confirm() {
    this.close();
    this.showLoading();
  }

  async showLoading() {
    const loading = await this.loadingController
      .create({
        message: 'Please wait for transfer complete',
        spinner: 'circular',
        cssClass: 'transfer-loading',
        duration: 2000,
      })

      await loading.present()
      const { role, data } = await loading.onDidDismiss();

      // transaction success
      // this.complete()

      //transaction unsuccess
      this.unsuccess()
  }

  complete(){
      this.router.navigate(['/send/success']);
  }

  unsuccess(){
    this.alertController.create({
      // cssClass: 'my-custom-class',
      header: 'Transaction Failed',
      // subHeader: 'Subtitle',
      message: 'Please try again.',
      buttons: ['OK']
    })
    .then((alterElement) => {
      alterElement.present();
    });
  }

}
