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

  // Get the contact by id:
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
    // const oldAddress = this.getAddress(id);

    const index = this.addressesList.findIndex((address) => address.id === id);
    // update the new address data to the addresses list:

    this.addressesList[index] = newAddressData;

    // console.log('service new list:', this.addressesList);
  }

  // ------ add an address to a contact by id
  addAnAddress(id: string, address: walletAddress) {
    const contact = this.addressesList.find((contact) => contact.id === id);

    contact.walletsAddresses.push(address);
  }

  // add a new contact:
  addNewContact(
    name: string,
    ABNNum: number,
    email: string,
    companyAddress: string,
    companyName: string,
    walletsAddresses: walletAddress[]
  ) {
    //  manually add id here. ----> id: generate by backend?
    const newContact: Address = new Address(
      Math.random().toString(),
      name,
      ABNNum,
      email,
      companyAddress,
      companyName,
      walletsAddresses
    );

    this.addressesList.push(newContact);
    console.log('service-- after add new contact:', this.addressesList);
  }

  // --- get all the same type of crypto addresses from the contacts
  //      with the contact's info together: for generating transaction data
  getAllSameCryptoAddresses(walletType: string) {
    let allSameTypeAddresses = [];

    this.addressesList.forEach((contact) => {
      return contact.walletsAddresses.filter((addressObj) => {
        if (addressObj.type === walletType) {
          const aNewAddressObj = {
            address: addressObj.address,
            description: addressObj.description && addressObj.description,
            holderName: contact.name,
            type: addressObj.type,
            businessName: contact.companyName,
            ABNNum: contact.ABNNum,
          };
          allSameTypeAddresses.push(aNewAddressObj);
        }
        // console.log('sevice all sametype of address obj:', allSameTypeAddresses);
      });
    });
    return allSameTypeAddresses;
  }

  deleteAnAddressFromContact(id: string, selectedAddress: string) {
    const index = this.addressesList.findIndex((address) => address.id === id);

    const updatedContact = this.addressesList[index].walletsAddresses.filter(
      (address) => address.address !== selectedAddress
    );
  }

  // delete a contact by Id:
  deleteAContact(id: string) {
    const newContactsList = this.addressesList.filter((address) => address.id !== id);
    this.addressesList = [...newContactsList];
  }
}
