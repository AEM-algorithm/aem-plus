import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BitconWalletPageRoutingModule } from './bitcon-wallet-routing.module';

import { BitconWalletPage } from './bitcon-wallet.page';
import { BitcoinChartComponent } from './bitcoin-chart/bitcoin-chart.component';
@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, BitconWalletPageRoutingModule],
  declarations: [BitconWalletPage, BitcoinChartComponent],
})
export class BitconWalletPageModule {}
