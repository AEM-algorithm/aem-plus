import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailPageRoutingModule } from './detail-routing.module';

import { DetailPage } from './detail.page';
import { AddAddressModalComponent } from '../add-address-modal/add-address-modal.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, DetailPageRoutingModule],
  declarations: [DetailPage, AddAddressModalComponent],
})
export class DetailPageModule {}
