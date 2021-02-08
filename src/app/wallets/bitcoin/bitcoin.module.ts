import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BitcoinPageRoutingModule } from './bitcoin-routing.module';

import { BitcoinPage } from './bitcoin.page';
// components:
// import { BitcoinBalanceComponent } from './bitcoin-balance/bitcoin-balance.component';
import { BitcoinChartComponent } from './bitcoin-chart/bitcoin-chart.component';
// import { BitcoinTransactionComponent } from './bitcoin-transaction/bitcoin-transaction.component';
import { BalanceComponent } from '../sharedComponents/balance/balance.component';
import { TransactionListComponent } from '../sharedComponents/transaction-list/transaction-list.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, BitcoinPageRoutingModule],
  declarations: [BitcoinPage, BitcoinChartComponent, BalanceComponent, TransactionListComponent],
})
export class BitcoinPageModule {}
