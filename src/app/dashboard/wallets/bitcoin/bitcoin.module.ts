import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BitcoinPageRoutingModule } from './bitcoin-routing.module';

import { BitcoinPage } from './bitcoin.page';

// conponents:
import { BitcoinChartComponent } from './bitcoin-chart/bitcoin-chart.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, BitcoinPageRoutingModule],
  declarations: [BitcoinPage, BitcoinChartComponent],
})
export class BitcoinPageModule {}
