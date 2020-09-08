import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WalletsPage } from './wallets.page';

const routes: Routes = [
  {
    path: '',
    component: WalletsPage,
  },
  {
    path: 'bitcoin',
    loadChildren: () => import('./bitcoin/bitcoin.module').then((m) => m.BitcoinPageModule),
  },
  {
    path: 'nem',
    loadChildren: () => import('./nem/nem.module').then((m) => m.NemPageModule),
  },
  {
    path: 'symbol',
    loadChildren: () => import('./symbol/symbol.module').then((m) => m.SymbolPageModule),
  },
  {
    path: 'choose-send-account',
    loadChildren: () => import('../send/choose-send-account/choose-send-account.module').then((m) => m.ChooseSendAccountPageModule),
  },
  {
    path: 'choose-receive-account',
    loadChildren: () => import('../receive/choose-receive-account/choose-receive-account.module')
      .then( m => m.ChooseReceiveAccountPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalletsPageRoutingModule {}
