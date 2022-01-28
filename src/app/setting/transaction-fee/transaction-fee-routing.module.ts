import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionFeePage } from './transaction-fee.page';

const routes: Routes = [
  {
    path: '',
    component: TransactionFeePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionFeePageRoutingModule {}
