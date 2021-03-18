import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendPage } from './send.page';

const routes: Routes = [
  {
    path: '',
    component: SendPage
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then( m => m.MainPageModule)
  },
  {
    path: 'confirm-fee',
    loadChildren: () => import('./confirm-fee/confirm-fee.module').then( m => m.ConfirmFeePageModule)
  },
  {
    path: 'complete',
    loadChildren: () => import('./complete/complete.module').then( m => m.CompletePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendPageRoutingModule {}
