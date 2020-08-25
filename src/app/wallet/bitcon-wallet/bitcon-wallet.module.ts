import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BitconWalletPageRoutingModule } from './bitcon-wallet-routing.module';

import { BitconWalletPage } from './bitcon-wallet.page';
import { BitcoinChartPage } from './bitcoin-chart/bitcoin-chart.page';
@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, BitconWalletPageRoutingModule],
  declarations: [BitconWalletPage, BitcoinChartPage],
})
export class BitconWalletPageModule {}
