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
    this.loadingController
      .create({
        message: 'Please wait for transfer complete',
        spinner: 'circular',
        cssClass: 'transfer-loading',
        duration: 2000,
      })
      .then((loadElement) => {
        loadElement.present();
        setTimeout(() => {
          loadElement.dismiss();
        }, 2000);
      });
      // this.complete()
  }

  // complete(){
  //   setTimeout(() => (2000));
  //   this.router.navigate(['/send/complete']);
  // }

}
