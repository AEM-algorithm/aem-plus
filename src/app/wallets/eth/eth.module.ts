import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EthPageRoutingModule } from './eth-routing.module';

import { EthPage } from './eth.page';
import { BalanceComponent } from '../sharedComponents/balance/balance.component';
import { ChartComponent } from '../sharedComponents/chart/chart.component';
import { TransactionListComponent } from '../sharedComponents/transaction-list/transaction-list.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, EthPageRoutingModule],
  declarations: [EthPage, BalanceComponent, ChartComponent, TransactionListComponent],
})
export class EthPageModule {}
