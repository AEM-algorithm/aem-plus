import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmFeePage } from './confirm-fee.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmFeePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmFeePageRoutingModule {}
