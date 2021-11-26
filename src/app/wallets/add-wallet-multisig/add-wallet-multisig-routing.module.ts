import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddWalletMultisigPage } from './add-wallet-multisig.page';

const routes: Routes = [
  {
    path: '',
    component: AddWalletMultisigPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddWalletMultisigPageRoutingModule {}
