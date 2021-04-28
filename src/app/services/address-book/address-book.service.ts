import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { addressesList } from '../dummyData/address-list.data';
import { Address, walletAddress } from '../models/address.modal';

@Injectable({
  providedIn: 'root',
})
export class AddressBookService {
  private addressesList: Address[] = addressesList;

  addressesChanged = new Subject<Address[]>();

  contactChanged = new Subject<Address>();

  constructor() {}

  setAddressesList(newAddressesList: Address[]) {
    this.addressesList = newAddressesList;
    this.addressesChanged.next(newAddressesList.slice());
  }

  // setContactAddresses(contact: Address, newContact: Address) {
  //   contact = newContact;
  //   // contact.walletsAddresses = newAddresses;
  //   this.contactChanged.next(contact);
  // }

  getAddressesList() {
    return [...this.addressesList];
  }

  // Get the contact by id:
  getAddress(id: string) {
    return this.addressesList.find((address) => address.id === id);
  }

  filteredAddresses(inputVal: string) {
    return inputVal && inputVal.trim() !== ''
      ? [
          ...this.addressesList.filter((address) => {
            return address.name.toLowerCase().indexOf(inputVal.toLowerCase()) > -1;
          }),
        ]
      : [...this.addressesList];
  }

  updateAddress(id: string, newAddressData: Address) {
    // get the edit address/contact:
    // const oldAddress = this.getAddress(id);
    const index = this.addressesList.findIndex((address) => address.id === id);
    this.addressesList[index] = newAddressData;
    this.addressesChanged.next(this.addressesList.slice());
    // console.log('service new list:', this.addressesList);
  }

  // ------ add an address to a contact by id
  addAnAddress(id: string, address: walletAddress) {
    const contact = this.addressesList.find((contact) => contact.id === id);
    contact.walletsAddresses.push(address);
    const newContact = { ...contact };
    // console.log('service add an address: ', newContact);
    this.contactChanged.next(newContact);
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
    // const index = this.addressesList.findIndex((address) => address.id === id);
    const oldContact = this.getAddress(id);

    console.log('delete service- original wallets list ', oldContact);

    const updatedContactWallets = oldContact.walletsAddresses.filter((address) => address.address !== selectedAddress);
    console.log('delete service- updated wallets list ', updatedContactWallets);

    // this.addressesList[index].walletsAddresses = updatedContactWallets;
    // console.log('delete address- service:', updatedContactWallets);

    const updatedContact = { ...oldContact, walletsAddresses: updatedContactWallets };
    // this.contactChanged.next(this.addressesList[index]); // update the contact
    console.log('delete service- updated contact ', updatedContact);

    // this.setContactAddresses(contact, updatedContact);
    this.contactChanged.next(updatedContact);
    // this.addressesList[index] = updatedContact;
    this.addressesList = this.addressesList.map((contact) => {
      if (contact.id === oldContact.id) {
        contact = updatedContact;
      }
      return contact;
    });
    console.log('delete service- updated addresses list ', this.addressesList);

    this.addressesChanged.next(this.addressesList.slice());
  }

  // delete a contact by Id:
  deleteAContact(id: string) {
    this.addressesList = this.addressesList.filter((address) => address.id !== id);
    this.addressesChanged.next(this.addressesList.slice());
  }
}
