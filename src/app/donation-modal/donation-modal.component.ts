import {
  Component,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-donation-modal',
  templateUrl: './donation-modal.component.html',
  styleUrls: ['./donation-modal.component.scss'],
})
export class DonationModalComponent implements OnInit, AfterViewInit {

  constructor(
    private modalCtrl: ModalController,
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
