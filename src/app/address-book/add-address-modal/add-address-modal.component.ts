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
  @Input() selectedContact: Address;

  addAddressForm: FormGroup;

  constructor(private modalCtrl: ModalController, private addressBookService: AddressBookService) {}

  ngOnInit() {
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
    console.log(this.addAddressForm.value);
    this.addressBookService.addAnAddress(this.selectedContact.id, this.addAddressForm.value);

    this.close();
  }
}
