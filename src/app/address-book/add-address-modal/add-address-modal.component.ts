import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

import { AddressBookService } from 'src/app/services/address-book/address-book.service';
import { Address } from 'src/app/services/models/address.modal';
import { WalletProvider } from '@app/services/wallets/wallet.provider';
import { LoadingProvider } from '@app/services/loading/loading.provider';

@Component({
  selector: 'app-add-address-modal',
  templateUrl: './add-address-modal.component.html',
  styleUrls: ['./add-address-modal.component.scss'],
})
export class AddAddressModalComponent implements OnInit {
  @Input() contact: Address;
  coinValue;
  isShowWalletType = false;
  @Input() isNewContact: boolean;
  arrayWalletType;
  addAddressForm: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private addressBookService: AddressBookService,
    private walletProvider: WalletProvider,
    private loading: LoadingProvider,
  ) { }


  async ionViewWillEnter() {
    await this.loading.presentLoading();
    const allWallet = await this.walletProvider.getAllWallets();


    this.arrayWalletType = allWallet.map((value, index) => {
      return {
        walletType: value.walletType
      };
    });

    // console.log(' add address modal:', this.isNewContact);
    await this.loading.dismissLoading();
    this.addAddressForm = new FormGroup({
      type: new FormControl(null),
      address: new FormControl(null),
      description: new FormControl(null), // optional
    });
  }
  async ngOnInit() {
    this.addAddressForm = new FormGroup({
      type: new FormControl(null),
      address: new FormControl(null),
      description: new FormControl(null), // optional
    });
    // await this.loading.presentLoading();

  }

  close() {
    this.modalCtrl.dismiss();
  }
  onWalletType(){
    this.isShowWalletType = true;
  }
  chooseCoin(wallet){

    this.coinValue = wallet.walletType;
    this.isShowWalletType = false;
  }
  onAddAddress() {
  
    let json = {
      'walletType':this.coinValue,
      ...this.addAddressForm.value
    }

    if (this.isNewContact) {

      const address = this.addAddressForm.value;
      this.modalCtrl.dismiss(json, 'confirm');
    } else {

      let a ={
        'type':this.coinValue,
        'address':this.addAddressForm.value.address,
        'description':this.addAddressForm.value.description,
      }
      // this.addressBookService.addAnAddress(this.contact.id, this.addAddressForm.value);
      this.addressBookService.addAnAddress(this.contact.id, a);
      this.close();
    }
  }
}
