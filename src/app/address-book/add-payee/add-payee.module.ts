import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPayeePageRoutingModule } from './add-payee-routing.module';

import { AddPayeePage } from './add-payee.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPayeePageRoutingModule
  ],
  declarations: [AddPayeePage]
})
export class AddPayeePageModule {}
