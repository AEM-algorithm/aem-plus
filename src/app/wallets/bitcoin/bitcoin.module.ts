import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BitcoinPageRoutingModule } from './bitcoin-routing.module';

import { BitcoinPage } from './bitcoin.page';
// components:
import { BalanceComponent } from '../sharedComponents/balance/balance.component';
import { TransactionListComponent } from '../sharedComponents/transaction-list/transaction-list.component';
import { ChartComponent } from '../sharedComponents/chart/chart.component';
import { TransactionItemComponent } from '../sharedComponents/transaction-item/transaction-item.component';
import { TransactionDetailComponent } from '../sharedComponents/transaction-item/transaction-detail/transaction-detail.component';

// TODO: NodeSelectionComponent for Bitcoin
// import { NodeSelectionComponent } from '../node-selection/node-selection.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, BitcoinPageRoutingModule],
  declarations: [
    BitcoinPage,
    BalanceComponent,
    ChartComponent,
    TransactionListComponent,
    TransactionItemComponent,
    TransactionDetailComponent,
    // TODO: NodeSelectionComponent for Bitcoin
    // NodeSelectionComponent,
  ],
})
export class BitcoinPageModule {}
