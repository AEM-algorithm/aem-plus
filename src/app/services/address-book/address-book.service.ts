import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { addressesList } from '../dummyData/address-list.data';
import { Address, walletAddress } from '../models/address.modal';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root',
})
export class AddressBookService {
  private addressesList: Address[]= addressesList;

  addressesChanged = new Subject<Address[]>();
  contactChanged = new Subject<Address>();

  constructor(private storage: Storage,) { }

  setAddressesList(newAddressesList: Address[]) {
    this.addressesList = newAddressesList;
    this.addressesChanged.next(newAddressesList.slice());
  }

  async getAddressesList() {
    let address = await this.storage.get('addressesList');
    if(!address){
      await this.storage.set('addressesList',[]);
    }
    return address;
  }

  // Get the contact by id:
  async getAddress(id: number) {
    let arrAdd = await this.getAddressesList();

    return arrAdd.find((address) => address.id == id);
  }

  async filteredAddresses(inputVal: string) {
    this.addressesList = await this.getAddressesList();
    return inputVal && inputVal.trim() !== ''
      ? [
        ...this.addressesList.filter((address) => {
          return address.fname.toLowerCase().indexOf(inputVal.toLowerCase()) > -1;
        }),
      ]
      : [...this.addressesList];
  }

  async updateAddress(id: string, newAddressData: Address) {
    this.addressesList = await this.getAddressesList();
    // const index = this.addressesList.find((address) => address.id === id);
    let new_arr = await this.newAddressList(this.addressesList, [newAddressData]);

    await this.storage.set('addressesList',new_arr);
    // this.addressesList[index] = newAddressData;
    // this.addressesChanged.next(this.addressesList.slice());
  }

  // ------ add an address to a contact by id
  async addAnAddress(id: number, address: walletAddress) {
    this.addressesList = await this.getAddressesList();
    const contact = this.addressesList.find((contact) => contact.id == id);
    contact.walletsAddresses.push(address);
    const newContact = { ...contact };
    // console.log('service add an address: ', newContact);
    let arr2 = [newContact]
    let new_arr = await this.newAddressList(this.addressesList, arr2);
    // console.log(new_arr);
    await this.storage.set('addressesList',new_arr);
    this.contactChanged.next(newContact);
  }

  async newAddressList(arr1, arr2){
    return arr1.map(obj => arr2.find(o => o.id === obj.id) || obj);
  }

  // add a new contact:
  async addNewContact(
    image: string,
    fname: string,
    lname: string,
    ABNNum: number,
    email: string,
    phone: string,
    companyAddress: string,
    companyName: string,
    walletsAddresses: walletAddress[]
  ) {
    //  manually add id here. ----> id: generate by backend?


    let address = await this.storage.get('addressesList');
    let id = address.length;

    const newContact: Address = new Address(
      id+1,
      image,
      fname,
      lname,
      ABNNum,
      email,
      phone,
      companyAddress,
      companyName,
      walletsAddresses
    );
    address.push(newContact)
    this.storage.set('addressesList', address);
    // this.addressesList.push(newContact);
    // this.addressesChanged.next(this.addressesList.slice());
  }

  // --- get all the same type of crypto addresses from the contacts
  //      with the contact's info together: for generating transaction data
  async getAllSameCryptoAddresses(walletType: string) {
    let allSameTypeAddresses = [];
    this.addressesList = await this.getAddressesList();
    this.addressesList.forEach((contact) => {
      return contact.walletsAddresses.filter((addressObj) => {
        if (addressObj.type === walletType) {
          const aNewAddressObj = {
            address: addressObj.address,
            description: addressObj.description && addressObj.description,
            holderName: contact.fname,
            type: addressObj.type,
            businessName: contact.companyName,
            ABNNum: contact.ABNNum,
          };
          allSameTypeAddresses.push(aNewAddressObj);
        }
      });
    });
    return allSameTypeAddresses;
  }

  async  deleteAnAddressFromContact(id: number, selectedAddress: string) {
    this.addressesList = await this.getAddressesList();
    const index = this.addressesList.findIndex((address) => address.id == id);
    const oldContact = await this.getAddress(id);

    const updatedContactWallets = oldContact.walletsAddresses.filter((address) => address.address !== selectedAddress);
    const updatedContact = { ...oldContact, walletsAddresses: updatedContactWallets };

    this.contactChanged.next(updatedContact);

    this.addressesList[index] = updatedContact;
    this.addressesChanged.next(this.addressesList.slice());
  }

  // delete a contact by Id:
  async deleteAContact(id: number) {
    this.addressesList = await this.getAddressesList();
    this.addressesList = this.addressesList.filter((address) => address.id !== id);
    this.addressesChanged.next(this.addressesList.slice());
  }
}
