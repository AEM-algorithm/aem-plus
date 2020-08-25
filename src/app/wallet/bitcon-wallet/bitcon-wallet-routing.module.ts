import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BitconWalletPage } from './bitcon-wallet.page';

const routes: Routes = [
  {
    path: '',
    component: BitconWalletPage
  },
  {
    path: 'bitcoin-chart',
    loadChildren: () => import('./bitcoin-chart/bitcoin-chart.module').then( m => m.BitcoinChartPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BitconWalletPageRoutingModule {}
