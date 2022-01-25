import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';


import { TransactionListComponent } from './transaction-list.component';
import { TransactionItemModule } from '@app/wallets/sharedComponents/transaction-item/transaction-item.module';

@NgModule({
  declarations: [TransactionListComponent],
  exports: [TransactionListComponent],
  imports: [
    IonicModule,
    CommonModule,
    TransactionItemModule,
  ]
})
export class TransactionListModule {}
