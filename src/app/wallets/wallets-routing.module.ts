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
  // --- testing the token page
  {
    path: 'nem/:id/token/:tokenId',
    loadChildren: () => import('./nem/nem.module').then((m) => m.NemPageModule),
  },
  {
    path: 'eth/:id',
    loadChildren: () => import('./eth/eth.module').then((m) => m.EthPageModule),
  },
  // --- testing the token page
  {
    path: 'eth/:id/token/:tokenId',
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
  // ---- sending page routes:
  //  select wallet
  {
    path: 'send/:walletId',
    loadChildren: () => import('./send/send.module').then((m) => m.SendPageModule),
  },
  // adujust send fee page:
  {
    path: 'send/:walletId/send-fee',
    loadChildren: () => import('./send/send-fee/send-fee.module').then((m) => m.SendFeePageModule),
  },
  //  select token: xem & eth
  {
    path: 'send/:walletId/token/:tokenId',
    loadChildren: () => import('./send/send.module').then((m) => m.SendPageModule),
  },

  // adujust send fee page:
  {
    path: 'send/:walletId/token/:tokenId/send-fee',
    loadChildren: () => import('./send/send-fee/send-fee.module').then((m) => m.SendFeePageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalletsPageRoutingModule {}
