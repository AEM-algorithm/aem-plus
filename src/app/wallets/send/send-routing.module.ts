import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendPage } from './send.page';

const routes: Routes = [
  {
    path: '',
    component: SendPage,
  },
  // {
  //   path: 'send-fee/:walletId',
  //   loadChildren: () => import('./send-fee/send-fee.module').then((m) => m.SendFeePageModule),
  // },
  // {
  //   path: 'send-fee/:walletId/token/',
  //   loadChildren: () => import('./send-fee/send-fee.module').then( m => m.SendFeePageModule)
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendPageRoutingModule {}
