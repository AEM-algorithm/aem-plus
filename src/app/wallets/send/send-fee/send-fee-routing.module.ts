import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendFeePage } from './send-fee.page';

const routes: Routes = [
  {
    path: '',
    component: SendFeePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendFeePageRoutingModule {}
