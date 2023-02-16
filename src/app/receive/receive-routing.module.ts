import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReceivePage } from './receive.page';

const routes: Routes = [
  {
    path: '',
    component: ReceivePage,
  },
  {
    path: 'receive/:walletId',
    loadChildren: () =>
      import('../wallets/receive/receive.module').then((m) => m.ReceivePageModule),
  },
  {
    path: 'receive/:walletId/token/:tokenName',
    loadChildren: () =>
      import('../wallets/receive/receive.module').then((m) => m.ReceivePageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceivePageRoutingModule {}
