import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pin-modal',
  templateUrl: './pin-modal.component.html',
  styleUrls: ['./pin-modal.component.scss'],
})
export class PinModalComponent implements OnInit {
  // TODO: Show pin enter window twice
  @Input() title: string;

  pin = '';

  constructor(private modalCtrl: ModalController, private router: Router) {
  }

  ngOnInit() {
  }

  submit() {
    this.modalCtrl.dismiss({pin: this.pin});
  }

  dismiss() {
    this.modalCtrl.dismiss({pin: null});
  }

  public enterNumber(inputNumber: number) {
    this.pin = this.pin + inputNumber;
    if (this.pin.length === 4) {
      this.submit();
    }
  }

  deleteNum() {
    if (this.pin.length > 0) {
      this.pin = this.pin.substring(0, this.pin.length - 1);
    }
  }
}
