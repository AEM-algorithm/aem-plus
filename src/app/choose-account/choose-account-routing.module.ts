import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChooseAccountPage } from './choose-account.page';

const routes: Routes = [
  {
    path: '',
    component: ChooseAccountPage
  },
  {
    path: 'send',
    loadChildren: () => import('../send/send.module').then((m) => m.SendPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChooseAccountPageRoutingModule {}
