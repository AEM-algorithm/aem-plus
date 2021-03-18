import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmFeePageRoutingModule } from './confirm-fee-routing.module';

import { ConfirmFeePage } from './confirm-fee.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmFeePageRoutingModule
  ],
  declarations: [ConfirmFeePage]
})
export class ConfirmFeePageModule {}
