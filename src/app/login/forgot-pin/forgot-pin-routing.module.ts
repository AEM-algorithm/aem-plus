import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgotPinPage } from './forgot-pin.page';

const routes: Routes = [
  {
    path: '',
    component: ForgotPinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgotPinPageRoutingModule {}
