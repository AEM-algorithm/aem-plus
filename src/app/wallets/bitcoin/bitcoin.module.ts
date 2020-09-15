import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BitcoinPageRoutingModule } from './bitcoin-routing.module';

import { BitcoinPage } from './bitcoin.page';
// components:
import { BitcoinBalanceComponent } from './bitcoin-balance/bitcoin-balance.component';
import { BitcoinChartComponent } from './bitcoin-chart/bitcoin-chart.component';
import { BitcoinAddressComponent } from './bitcoin-address/bitcoin-address.component';
import { BitcoinTransactionComponent } from './bitcoin-transaction/bitcoin-transaction.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, BitcoinPageRoutingModule],
  declarations: [
    BitcoinPage,
    BitcoinBalanceComponent,
    BitcoinChartComponent,
    BitcoinAddressComponent,
    BitcoinTransactionComponent,
  ],
})
export class BitcoinPageModule {}
