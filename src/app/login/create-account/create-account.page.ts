import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

import { generateMnemonic } from 'bip39';
import { PinModalComponent } from 'src/app/pin-modal/pin-modal.component';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {
  mnemonic;

  constructor(private modalCtrl: ModalController, private navCtrl: NavController) {}

  ngOnInit() {
    this.mnemonic = '';
    // this.generateMnemonic();
    this.mnemonic = this.onGenerateMnemonic();
  }

  // TODO: generate mnemonic method
  onGenerateMnemonic() {
    console.log('generating...');
    return (this.mnemonic = ['word', 'toe', 'little', 'arrive', 'wave', 'fan', 'any', 'bonus', 'pin', 'need']);
    // this.mnemonic = generateMnemonic();
  }

  // TODO: Show enter pin modal
  onEnterPin() {
    console.log('show pin modal');
  }

  onContinue() {
    // 1. open the pin modal
    this.modalCtrl
      .create({
        component: PinModalComponent,
      })
      .then((modalEl) => {
        modalEl.present();
      });
  }
}
