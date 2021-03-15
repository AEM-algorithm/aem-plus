import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WalletsPage } from './wallets.page';

const routes: Routes = [
  {
    path: '',
    component: WalletsPage,
  },
  {
    path: 'bitcoin/:id',
    loadChildren: () => import('./bitcoin/bitcoin.module').then((m) => m.BitcoinPageModule),
  },
  {
    path: 'nem/:id',
    loadChildren: () => import('./nem/nem.module').then((m) => m.NemPageModule),
  },

  {
    path: 'eth/:id',
    loadChildren: () => import('./eth/eth.module').then((m) => m.EthPageModule),
  },
  {
    path: 'add-wallet',
    loadChildren: () => import('./add-wallet/add-wallet.module').then((m) => m.AddWalletPageModule),
  },
  {
    path: 'edit-wallet/:walletId',
    loadChildren: () => import('./edit-wallet/edit-wallet.module').then((m) => m.EditWalletPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalletsPageRoutingModule {}
