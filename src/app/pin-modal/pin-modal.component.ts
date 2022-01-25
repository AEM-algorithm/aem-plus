import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonInput, ModalController } from '@ionic/angular';
import { ForgotPinPage } from '@app/login/forgot-pin/forgot-pin.page';

import {BiometryProvider} from '@app/services/biometry/biometry.provider';

import { BIOMETRY_VERIFIED } from '@app/constants/constants';

@Component({
  selector: 'app-pin-modal',
  templateUrl: './pin-modal.component.html',
  styleUrls: ['./pin-modal.component.scss'],
})
export class PinModalComponent implements OnInit, AfterViewInit {
  @Input() title: string;
  @Input() isVerifyBiometry: boolean;
  @Input() isShowForgotPin: boolean;
  @ViewChild('pinInput') inputElement: IonInput;

  pin = '';
  isEnableBiometry: boolean = false;

  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    private biometry: BiometryProvider,
  ) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.isVerifyBiometry) {
      this.initCheckVerifyBiometry();
    } else {
      this.setInputFocus();
    }
  }

  async initCheckVerifyBiometry() {
    this.isEnableBiometry = await this.biometry.getIsEnableBiometry();
    if (this.isEnableBiometry) {
      this.checkVerifyBiometry();
    } else {
      this.setInputFocus();
    }
  }

  async checkVerifyBiometry() {
    const isVerifyFingerprint = await this.biometry.verifyFingerprint();
    if (isVerifyFingerprint) {
      this.modalCtrl.dismiss({pin: BIOMETRY_VERIFIED});
    }
  }

  setInputFocus() {
    setTimeout(() => {
      if (this.inputElement.autofocus === false) {
        this.inputElement.setFocus().then(() => {});
      }
    }, 1000);
  }

  submit() {
    this.modalCtrl.dismiss({pin: this.pin});
  }

  dismiss() {
    this.modalCtrl.dismiss({pin: null});
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
    this.dismiss();
    const modal = await this.modalCtrl.create({
      component: ForgotPinPage,
      cssClass: 'pinModal',
      componentProps: {
      }
    });
    await modal.present();
  }
}
