import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChooseSendAccountPage } from './choose-send-account.page';

const routes: Routes = [
  {
    path: '',
    component: ChooseSendAccountPage
  },
  {
    path: 'send',
    loadChildren: () => import('../send.module').then((m) => m.SendPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChooseAccountPageRoutingModule {}
