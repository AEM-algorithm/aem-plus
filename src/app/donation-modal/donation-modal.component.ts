import {
  Component,
  Input,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { IonInput, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-donation-modal',
  templateUrl: './donation-modal.component.html',
  styleUrls: ['./donation-modal.component.scss'],
})
export class DonationModalComponent implements OnInit, AfterViewInit {

  constructor(
    private modalCtrl: ModalController,
    private router: Router,
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
  }

  async handleSkipOnClick() {
    this.modalCtrl.dismiss({});
  }

  handleContinueOnClick() {
    this.modalCtrl.dismiss({continue: true});
  }
}
