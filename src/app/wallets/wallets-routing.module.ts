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
    path: 'nem/:id/token/:tokenId',
    loadChildren: () => import('./nem/nem.module').then((m) => m.NemPageModule),
  },
  {
    path: 'eth/:id',
    loadChildren: () => import('./eth/eth.module').then((m) => m.EthPageModule),
  },
  {
    path: 'eth/:id/token/:tokenId',
    loadChildren: () => import('./eth/eth.module').then((m) => m.EthPageModule),
  },
  {
    path: 'symbol/:id',
    loadChildren: () => import('./symbol/symbol.module').then((m) => m.SymbolPageModule),
  },
  {
    path: 'symbol/:id/token/:tokenId',
    loadChildren: () => import('./symbol/symbol.module').then((m) => m.SymbolPageModule),
  },
  {
    path: 'add-wallet',
    loadChildren: () => import('./add-wallet/add-wallet.module').then((m) => m.AddWalletPageModule),
  },
  {
    path: 'edit-wallet/:walletId',
    loadChildren: () => import('./edit-wallet/edit-wallet.module').then((m) => m.EditWalletPageModule),
  },
  {
    path: 'send/:walletId',
    loadChildren: () => import('./send/send.module').then((m) => m.SendPageModule),
  },
  {
    path: 'send/:walletId/token/:tokenId',
    loadChildren: () => import('./send/send.module').then((m) => m.SendPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalletsPageRoutingModule {}
