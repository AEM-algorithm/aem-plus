import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddWalletMultisigPage } from './add-wallet-multisig.page';

const routes: Routes = [
  {
    path: '',
    component: AddWalletMultisigPage,
  },
  {
    path: 'add-signer',
    loadChildren: () =>
      import('./add-signer/add-signer.module').then(
        (m) => m.AddSignerPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddWalletMultisigPageRoutingModule {}
