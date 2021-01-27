import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pin-modal',
  templateUrl: './pin-modal.component.html',
  styleUrls: ['./pin-modal.component.scss'],
})
export class PinModalComponent implements OnInit {
  pin: string = '';
  // TODO: Show pin enter window twice
  @Input() title: string;

  constructor(private modalCtrl: ModalController, private router: Router) {}
  ngOnInit() {}

  submit() {
    this.modalCtrl.dismiss({ pin: this.pin });
  }

  dismiss() {
    this.modalCtrl.dismiss({ pin: null });
  }

  public enterNumber(number) {
    let num = parseInt(number);
    this.pin = this.pin + num;
    if (this.pin.length === 4) {
      this.submit();
      this.router.navigateByUrl('/tabnav/wallets');
    }
  }
  // TODO: detele the previous entered pin
  deleteNum() {}
}