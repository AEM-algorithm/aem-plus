import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, LoadingController } from '@ionic/angular';

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

      //TO DO if success else fail
      this.complete()
  }

  complete(){
      this.router.navigate(['/send/success']);
  }

}
