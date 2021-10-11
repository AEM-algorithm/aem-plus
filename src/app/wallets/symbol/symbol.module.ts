import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SymbolPageRoutingModule } from './symbol-routing.module';

import { SymbolPage } from './symbol.page';
import { BalanceComponent } from '../sharedComponents/balance/balance.component';
import { ChartComponent } from '../sharedComponents/chart/chart.component';
import { TransactionListComponent } from '../sharedComponents/transaction-list/transaction-list.component';
import { TransactionItemComponent } from '../sharedComponents/transaction-item/transaction-item.component';
import { TransactionDetailComponent } from '../sharedComponents/transaction-item/transaction-detail/transaction-detail.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SymbolPageRoutingModule],
  declarations: [
    SymbolPage,
    BalanceComponent,
    ChartComponent,
    TransactionListComponent,
    TransactionItemComponent,
    TransactionDetailComponent,
  ],
})
export class SymbolPageModule {}
