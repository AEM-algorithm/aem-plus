import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChooseReceiveAccountPage } from './choose-receive-account.page';

const routes: Routes = [
  {
    path: '',
    component: ChooseReceiveAccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChooseReceiveAccountPageRoutingModule {}
