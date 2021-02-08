import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BitcoinPageRoutingModule } from './bitcoin-routing.module';

import { BitcoinPage } from './bitcoin.page';
// components:
// import { BitcoinChartComponent } from './bitcoin-chart/bitcoin-chart.component';
import { BalanceComponent } from '../sharedComponents/balance/balance.component';
import { TransactionListComponent } from '../sharedComponents/transaction-list/transaction-list.component';
import { ChartComponent } from '../sharedComponents/chart/chart.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, BitcoinPageRoutingModule],
  declarations: [BitcoinPage, BalanceComponent, TransactionListComponent, ChartComponent],
})
export class BitcoinPageModule {}
