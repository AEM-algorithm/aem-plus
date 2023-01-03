import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import _ from 'lodash';

import { ContactService } from '@app/services/contact/contact.service';
import { WALLET_ICON } from '@app/constants/constants';

@Component({
  selector: 'app-select-address-modal',
  templateUrl: './select-address-modal.component.html',
  styleUrls: ['./select-address-modal.component.scss'],
})
export class SelectAddressModalComponent implements OnInit {
  @Input() selectedWallet: any;
  contacts;
  localContacts;

  walletIcon = WALLET_ICON;

  constructor(
    private contactService: ContactService,
    private modalCtrl: ModalController
  ) {}

  async ngOnInit() {
    const contacts = [];
    let localContacts = await this.contactService.getContacts();
    if (localContacts) {
      localContacts = localContacts.filter((value) => !_.isEmpty(value.wallets));
      localContacts.forEach((contact) => {
        contact.wallets.forEach((contactWallet) => {
          if (_.isEqual(contactWallet.type, this.selectedWallet.walletType)) {
            contacts.push({
              image: contact.image,
              firstName: contact.firstName,
              lastName: contact.lastName,
              address: contactWallet.address,
              description: contactWallet.description,
            });
          }
        });
      });
    }
    this.contacts = contacts;
    this.localContacts = contacts;
  }

  close() {
    this.modalCtrl.dismiss();
  }

  onSearchAddress(e: any) {
    const inputVal = e.detail.value.toLowerCase();

    if (inputVal && inputVal.trim() !== '') {
      this.contacts = this.contacts.filter((address) => {
        return (
          address.address.toLowerCase().indexOf(inputVal) > -1 ||
          address.firstName.toLowerCase().indexOf(inputVal) > -1 ||
          address.lastName.toLowerCase().indexOf(inputVal) > -1 ||
          (address.description &&
            address.description.toLowerCase().indexOf(inputVal) > -1)
        );
      });
    } else {
      this.contacts = this.localContacts;
    }
  }

  onSelectAddress(contact) {
    this.modalCtrl.dismiss(contact.address, 'confirm');
  }
}
