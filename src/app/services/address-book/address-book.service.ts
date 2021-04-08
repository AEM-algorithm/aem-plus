import { Injectable } from '@angular/core';

import { addressesList } from '../dummyData/address-list.data';
import { Address } from '../models/address.modal';

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

  addAnAddress(wall) {}
}
