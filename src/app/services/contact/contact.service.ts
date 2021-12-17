import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Contact, ContactWallets } from '@app/services/models/contact.modal';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private readonly KEY_STORE = 'contacts';

  constructor(private storage: Storage)
  {
  }

  async getContacts(): Promise<Contact[]> {
    const contacts = await this.storage.get(this.KEY_STORE);
    if (!contacts){
      await this.storage.set(this.KEY_STORE, []);
    }
    return contacts;
  }

  async getContactById(id: string): Promise<Contact> {
    const contacts = await this.storage.get(this.KEY_STORE);
    const contact = contacts.find(value => value.id.toString() === id);
    return contact;
  }

  async addNewContact(newContact: Contact): Promise<void> {
    const contacts = await this.getContacts();
    const newContacts = [newContact, ...contacts];
    await this.storage.set(this.KEY_STORE, newContacts);
  }

  async addNewWalletByContactId(wallet: ContactWallets, contactId: string): Promise<void> {
    const contacts = await this.getContacts();
    const contact = await this.getContactById(contactId);
    contact.wallets = [...contact.wallets, wallet];
    const newContacts = contacts.map(value => {
      if (value.id === contact.id) {
        return {...value, ...contact};
      }
      return value;
    });
    await this.storage.set(this.KEY_STORE, newContacts);
  }

  async updateContactById(contact: Contact) {
    const contacts = await this.getContacts();
    const newContacts = contacts.map(value => {
      if (value.id === contact.id) {
        return contact;
      }
      return value;
    });
    await this.storage.set(this.KEY_STORE, newContacts);
  }

  async deleteContactById(id: number): Promise<void> {
    const contacts = await this.getContacts();
    const newContacts = contacts.filter(value => value.id !== id);
    await this.storage.set(this.KEY_STORE, newContacts);
  }

  async getAllSameCryptoAddresses(walletType: string) {
    // TODO;
   return [];
  }
}
