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
    loadChildren: () =>
      import('./bitcoin/bitcoin.module').then((m) => m.BitcoinPageModule),
  },
  {
    path: 'bitcoin/:id/token/:tokenId',
    loadChildren: () =>
      import('./bitcoin/bitcoin.module').then((m) => m.BitcoinPageModule),
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
    loadChildren: () =>
      import('./symbol/symbol.module').then((m) => m.SymbolPageModule),
  },
  {
    path: 'symbol/:id/token/:tokenId',
    loadChildren: () =>
      import('./symbol/symbol.module').then((m) => m.SymbolPageModule),
  },
  {
    path: 'add-wallet',
    loadChildren: () =>
      import('./add-wallet/add-wallet.module').then(
        (m) => m.AddWalletPageModule
      ),
  },
  {
    path: 'edit-wallet/:walletId',
    loadChildren: () =>
      import('./edit-wallet/edit-wallet.module').then(
        (m) => m.EditWalletPageModule
      ),
  },
  {
    path: 'send/:walletId',
    loadChildren: () =>
      import('./send/send.module').then((m) => m.SendPageModule),
  },
  {
    path: 'send/:walletId/token/:tokenId',
    loadChildren: () =>
      import('./send/send.module').then((m) => m.SendPageModule),
  },
  {
    path: 'receive/:walletId',
    loadChildren: () =>
      import('./receive/receive.module').then((m) => m.ReceivePageModule),
  },
  {
    path: 'receive/:walletId/token/:tokenName',
    loadChildren: () =>
      import('./receive/receive.module').then((m) => m.ReceivePageModule),
  },
  {
    path: 'add-wallet-new',
    loadChildren: () =>
      import('./add-wallet-new/add-wallet-new.module').then(
        (m) => m.AddWalletNewPageModule
      ),
  },
  {
    path: 'add-signer/:id',
    loadChildren: () =>
      import(
        './add-wallet-new/add-wallet-multisig/add-signer/add-signer.module'
      ).then((m) => m.AddSignerPageModule),
  },
  {
    path: 'add-consignator',
    loadChildren: () =>
      import(
        './add-wallet-new/add-wallet-multisig/add-signer/add-consignator/add-consignator.module'
      ).then((m) => m.AddConsignatorPageModule),
  },
  {
    path: 'address-wallet',
    loadChildren: () =>
      import('./address-wallet/address-wallet.module').then(
        (m) => m.AddressWalletPageModule
      ),
  },
  {
    path: 'send-request-multisig/:id',
    loadChildren: () =>
      import('./send-request-multisig/send-request-multisig.module').then(
        (m) => m.SendRequestMultisigPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalletsPageRoutingModule {}
