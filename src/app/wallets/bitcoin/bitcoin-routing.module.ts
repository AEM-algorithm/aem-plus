import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BitcoinPage } from './bitcoin.page';

const routes: Routes = [
  {
    path: '',
    component: BitcoinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BitcoinPageRoutingModule {}
