import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerifyCreateAccountPage } from './verify-create-account.page';

const routes: Routes = [
  {
    path: '',
    component: VerifyCreateAccountPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerifyCreateAccountRoutingModule {}
