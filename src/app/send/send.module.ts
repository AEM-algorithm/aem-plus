import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendPageRoutingModule } from './send-routing.module';

import { SendPage } from './send.page';
import {AddressBookPageModule} from '../address-book/address-book.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SendPageRoutingModule,
    AddressBookPageModule
  ],
  declarations: [SendPage]
})
export class SendPageModule {}
