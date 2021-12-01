import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddConsignatorPageRoutingModule } from './add-consignator-routing.module';

import { AddConsignatorPage } from './add-consignator.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddConsignatorPageRoutingModule
  ],
  declarations: [AddConsignatorPage]
})
export class AddConsignatorPageModule {}
