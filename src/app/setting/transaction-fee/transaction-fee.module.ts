import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionFeePageRoutingModule } from './transaction-fee-routing.module';

import { TransactionFeePage } from './transaction-fee.page';
import { SharedComponent } from '../../shared-component/shared-component.modules';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionFeePageRoutingModule,
    SharedComponent,
  ],
  declarations: [TransactionFeePage],
})
export class TransactionFeePageModule {}
