import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NemPageRoutingModule } from './nem-routing.module';

import { NemPage } from './nem.page';
import { BalanceComponent } from '../sharedComponents/balance/balance.component';
import { TransactionListComponent } from '../sharedComponents/transaction-list/transaction-list.component';
import { ChartComponent } from '../sharedComponents/chart/chart.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, NemPageRoutingModule],
  declarations: [NemPage, BalanceComponent, TransactionListComponent, ChartComponent],
})
export class NemPageModule {}
