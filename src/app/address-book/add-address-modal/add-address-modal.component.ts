import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

import { WalletProvider } from '@app/services/wallets/wallet.provider';

import { SUPPORTED_COINS } from '@app/constants/constants';
import { Coin } from '@app/enums/enums';

@Component({
  selector: 'app-add-address-modal',
  templateUrl: './add-address-modal.component.html',
  styleUrls: ['./add-address-modal.component.scss'],
})
export class AddAddressModalComponent implements OnInit {
  addAddressForm: FormGroup;

  walletType: Coin;
  isShowWalletType = false;
  validAddress: boolean = false;
  arrayWalletType;

  constructor(
    private modalCtrl: ModalController,
    private wallet: WalletProvider
  ) {}

  async ionViewWillEnter() {
    this.arrayWalletType = SUPPORTED_COINS.map((value) => ({
      walletType: value.id,
      walletTypeName: value.name,
    }));
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
    this.walletType = wallet.walletType;
    this.addAddressForm.get('type').setValue(wallet.walletType);
    this.isShowWalletType = false;
    this.onCheckValidContact();
  }

  onAddAddress() {
    const data = {
      type: this.walletType,
      ...this.addAddressForm.value,
    };
    this.modalCtrl.dismiss(data, 'confirm');
  }

  public onCheckValidContact() {
    this.validAddress = this.wallet.checkValidAddress(
      this.addAddressForm.value.address,
      this.addAddressForm.value.type
    );
  }
}
