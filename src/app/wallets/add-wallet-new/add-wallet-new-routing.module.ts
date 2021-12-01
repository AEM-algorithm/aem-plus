import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddWalletNewPage } from './add-wallet-new.page';

const routes: Routes = [
  {
    path: '',
    component: AddWalletNewPage
  },
  {
    path: 'add-wallet-private',
    loadChildren: () => import('./add-wallet-private/add-wallet-private.module').then(m => m.AddWalletPrivatePageModule)
  },
  {
    path: 'add-wallet-multisig',
    loadChildren: () => import('./add-wallet-multisig/add-wallet-multisig.module').then(m => m.AddWalletMultisigPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddWalletNewPageRoutingModule { }
