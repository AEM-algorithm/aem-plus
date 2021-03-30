import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainPageRoutingModule } from './main-routing.module';

import { MainPage } from './main.page';
import { AddressListComponent } from '../../address-list/address-list.component';
import { AddressListModalComponent } from '../address-list-modal/address-list-modal.component';
import { AddressDetailModalComponent } from '../address-detail-modal/address-detail-modal.component';


@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, MainPageRoutingModule],
  declarations: [MainPage, AddressListModalComponent, AddressListComponent,
  AddressDetailModalComponent],
})
export class MainPageModule {}
