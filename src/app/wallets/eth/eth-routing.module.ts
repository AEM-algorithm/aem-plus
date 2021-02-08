import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EthPage } from './eth.page';

const routes: Routes = [
  {
    path: '',
    component: EthPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EthPageRoutingModule {}
