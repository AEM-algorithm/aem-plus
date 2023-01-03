import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { TransactionItemComponent } from './transaction-item.component';
@NgModule({
  declarations: [TransactionItemComponent],
  exports: [TransactionItemComponent],
  imports: [IonicModule, CommonModule],
})
export class TransactionItemModule {}
