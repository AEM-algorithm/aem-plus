import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

import { SUPPORTED_COINS } from '@app/constants/constants';

@Component({
  selector: 'app-add-address-modal',
  templateUrl: './add-address-modal.component.html',
  styleUrls: ['./add-address-modal.component.scss'],
})
export class AddAddressModalComponent implements OnInit {
  addAddressForm: FormGroup;

  cryptoType;
  isShowWalletType = false;
  arrayWalletType;

  constructor(
    private modalCtrl: ModalController,
  ) { }


  async ionViewWillEnter() {
    this.arrayWalletType = SUPPORTED_COINS.map(value => ({ walletType: value.id, walletTypeName: value.name }));
  }

  ngOnInit() {
    this.addAddressForm = new FormGroup({
      type: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      description: new FormControl(null), // optional
    });
  }

  close() {
    this.modalCtrl.dismiss();
  }

  onWalletType() {
    this.isShowWalletType = !this.isShowWalletType;
  }

  chooseCoin(wallet) {
    this.cryptoType = wallet.walletType;
    this.addAddressForm.get('type').setValue(wallet.walletType);
    this.isShowWalletType = false;
  }

  onAddAddress() {
    const data = {
      type: this.cryptoType,
      ...this.addAddressForm.value
    };
    this.modalCtrl.dismiss(data, 'confirm');
  }
}
