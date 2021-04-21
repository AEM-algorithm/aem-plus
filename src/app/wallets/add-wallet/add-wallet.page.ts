import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { WalletsService } from 'src/app/services/wallets/wallets.service';

@Component({
  selector: 'app-add-wallet',
  templateUrl: './add-wallet.page.html',
  styleUrls: ['./add-wallet.page.scss'],
})
export class AddWalletPage implements OnInit {
  addWalletForm: FormGroup;

  constructor(private walletsService: WalletsService) {}

  ngOnInit() {
    this.addWalletForm = new FormGroup({
      name: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      // TODO: the validation of the wallet address
      address: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.minLength(35)],
      }),
      type: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      privateKey: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
    });
  }

  onAddWallet() {
    if (!this.addWalletForm.valid) {
      console.log('form is invalid');
      return;
    }

    this.walletsService.addWallet(
      this.addWalletForm.value.name,
      this.addWalletForm.value.address,
      this.addWalletForm.value.type,
      this.addWalletForm.value.privateKey
    );

    this.addWalletForm.reset();
  }
}
