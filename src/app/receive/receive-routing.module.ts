import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReceivePage } from './receive.page';

const routes: Routes = [
  {
    path: '',
    component: ReceivePage
  },
  {
    path: 'choose-receive-account',
    loadChildren: () => import('./choose-receive-account/choose-receive-account.module').then( m => m.ChooseReceiveAccountPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceivePageRoutingModule {}
