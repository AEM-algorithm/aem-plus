import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

import { AddressBookService } from 'src/app/services/address-book/address-book.service';
import { Address } from 'src/app/services/models/address.modal';

@Component({
  selector: 'app-add-address-modal',
  templateUrl: './add-address-modal.component.html',
  styleUrls: ['./add-address-modal.component.scss'],
})
export class AddAddressModalComponent implements OnInit {
  @Input() contact: Address;

  @Input() isNewContact: boolean;

  addAddressForm: FormGroup;

  constructor(private modalCtrl: ModalController, private addressBookService: AddressBookService) {}

  ngOnInit() {
    console.log(' add address modal:', this.isNewContact);
    this.addAddressForm = new FormGroup({
      type: new FormControl(null, { validators: [Validators.required] }),
      address: new FormControl(null, { validators: [Validators.required] }),
      description: new FormControl(null), // optional
    });
  }

  close() {
    this.modalCtrl.dismiss();
  }

  onAddAddress() {
    if (this.isNewContact) {
      const address = this.addAddressForm.value;
      this.modalCtrl.dismiss(this.addAddressForm.value, 'confirm');
    } else {
      this.addressBookService.addAnAddress(this.contact.id, this.addAddressForm.value);
      this.close();
    }
  }
}
