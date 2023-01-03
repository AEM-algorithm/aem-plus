import {
  Component,
  Input,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { IonInput, ModalController, NavController } from '@ionic/angular';

import { ForgotPinPage } from '@app/login/forgot-pin/forgot-pin.page';

@Component({
  selector: 'app-password-modal',
  templateUrl: './password-modal.component.html',
  styleUrls: ['./password-modal.component.scss'],
})
export class PasswordModalComponent implements OnInit, AfterViewInit {
  @Input() title: string;
  @ViewChild('pinInput') inputElement: IonInput;

  pin = '';
  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    private navCtrl: NavController
  ) {}

  ngOnInit() {}
  ngAfterViewInit() {
    setTimeout(() => {
      this.setInputFocus();
    }, 1000);
  }

  setInputFocus() {
    if (this.inputElement.autofocus === false) {
      this.inputElement.setFocus().then(() => {});
    }
  }

  submit() {
    this.modalCtrl.dismiss({ pin: this.pin });
  }

  dismiss() {
    this.modalCtrl.dismiss({ pin: null });
  }

  handleIonChange(event) {
    this.pin = event.target.value;
    if (this.pin.length > 4) {
      this.pin = this.pin.substring(0, 4);
    }
    if (this.pin.length === 4) {
      this.submit();
    }
  }

  async handleForgotPinClick() {
    const modal = await this.modalCtrl.create({
      component: ForgotPinPage,
      cssClass: 'pinModal',
      componentProps: {},
    });
    await modal.present();
  }
}
