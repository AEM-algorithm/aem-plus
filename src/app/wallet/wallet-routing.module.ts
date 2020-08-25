import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WalletPage } from './wallet.page';

const routes: Routes = [
  {
    path: '',
    component: WalletPage,
  },
  {
    path: 'bitcon-wallet',
    loadChildren: () => import('./bitcon-wallet/bitcon-wallet.module').then((m) => m.BitconWalletPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalletPageRoutingModule {}
