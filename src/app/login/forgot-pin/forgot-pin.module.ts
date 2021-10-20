import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgotPinPageRoutingModule } from './forgot-pin-routing.module';

import { ForgotPinPage } from './forgot-pin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgotPinPageRoutingModule
  ],
  declarations: [ForgotPinPage]
})
export class ForgotPinPageModule {}
