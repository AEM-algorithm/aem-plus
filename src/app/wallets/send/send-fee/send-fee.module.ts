import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendFeePageRoutingModule } from './send-fee-routing.module';

import { SendFeePage } from './send-fee.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SendFeePageRoutingModule
  ],
  declarations: [SendFeePage]
})
export class SendFeePageModule {}
