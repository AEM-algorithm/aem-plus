import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonInput, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pin-modal',
  templateUrl: './pin-modal.component.html',
  styleUrls: ['./pin-modal.component.scss'],
})
export class PinModalComponent implements OnInit, AfterViewInit {
  @Input() title: string;
  @ViewChild('pinInput') inputElement: IonInput;

  pin = '';

  constructor(private modalCtrl: ModalController, private router: Router) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.setInputFocus();
    }, 500);
  }

  setInputFocus() {
    if (this.inputElement.autofocus === false) {
      this.inputElement.setFocus().then(() => {});
    }
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

  handleForgotPinClick() {
    console.log('handleForgotPinClick');
  }
}
