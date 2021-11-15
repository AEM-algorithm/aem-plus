import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { InvoiceProfilePageRoutingModule } from './invoice-profile-routing.module';

import { InvoiceProfilePage } from './invoice-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvoiceProfilePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [InvoiceProfilePage]
})
export class InvoiceProfilePageModule {}
