import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WalletManagerPage } from './wallet-manager.page';

const routes: Routes = [
  {
    path: '',
    component: WalletManagerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalletManagerPageRoutingModule {}
