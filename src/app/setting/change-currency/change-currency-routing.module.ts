import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangeCurrencyPage } from './change-currency.page';

const routes: Routes = [
  {
    path: '',
    component: ChangeCurrencyPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangeCurrencyRoutingModule {}
