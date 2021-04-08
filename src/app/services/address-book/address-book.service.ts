import { Injectable } from '@angular/core';

import { addressesList } from '../dummyData/address-list.data';
import { Address, walletAddress } from '../models/address.modal';

@Injectable({
  providedIn: 'root',
})
export class AddressBookService {
  addressesList: Address[] = addressesList;

  constructor() {}

  getAddressesList() {
    return this.addressesList;
  }

  getAddress(id: string) {
    return this.addressesList.find((address) => address.id === id);
  }

  filteredAddresses(inputVal: string) {
    return inputVal && inputVal.trim() !== ''
      ? this.addressesList.filter((address) => {
          return address.name.toLowerCase().indexOf(inputVal.toLowerCase()) > -1;
        })
      : this.addressesList;
  }

  updateAddress(id: string, newAddressData: Address) {
    // get the edit address/contact:
    const oldAddress = this.getAddress(id);

    const index = this.addressesList.findIndex((address) => address.id === id);
    // update the new address data to the addresses list:

    this.addressesList[index] = newAddressData;

    console.log('service new list:', this.addressesList);
  }

  //  add an address to a contact by id
  addAnAddress(id: string, address: walletAddress) {
    const contact = this.addressesList.find((contact) => contact.id === id);

    contact.walletsAddresses.push(address);

    // console.log('address serveice contact:', contact);
  }
}
