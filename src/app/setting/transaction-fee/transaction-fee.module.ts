import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionFeePageRoutingModule } from './transaction-fee-routing.module';

import { TransactionFeePage } from './transaction-fee.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionFeePageRoutingModule
  ],
  declarations: [TransactionFeePage]
})
export class TransactionFeePageModule {}
