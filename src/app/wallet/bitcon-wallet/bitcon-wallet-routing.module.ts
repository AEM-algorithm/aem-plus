import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BitconWalletPage } from './bitcon-wallet.page';

const routes: Routes = [
  {
    path: '',
    component: BitconWalletPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BitconWalletPageRoutingModule {}
