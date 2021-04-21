import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddressBookPageRoutingModule } from './address-book-routing.module';

import { AddressBookPage } from './address-book.page';
import { AddressListComponent } from '../address-book/address-list/address-list.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, AddressBookPageRoutingModule],

  declarations: [AddressBookPage, AddressListComponent],
})
export class AddressBookPageModule {}
