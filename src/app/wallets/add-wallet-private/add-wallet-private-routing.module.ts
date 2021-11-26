import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddWalletPrivatePage } from './add-wallet-private.page';

const routes: Routes = [
  {
    path: '',
    component: AddWalletPrivatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddWalletPrivatePageRoutingModule {}
