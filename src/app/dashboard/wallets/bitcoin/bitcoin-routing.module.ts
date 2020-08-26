import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BitcoinPage } from './bitcoin.page';

// import components:
import { BitcoinChartComponent } from './bitcoin-chart/bitcoin-chart.component';
import { BitcoinTransactionComponent } from './bitcoin-transaction/bitcoin-transaction.component';
const routes: Routes = [
  {
    path: '',
    component: BitcoinPage,
    children: [
      {
        path: '',
        redirectTo: 'bitcoin',
        pathMatch: 'full',
      },
      {
        path: 'transaction',
        component: BitcoinTransactionComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BitcoinPageRoutingModule {}
