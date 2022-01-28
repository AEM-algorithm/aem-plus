import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendRequestMultisigPage } from './send-request-multisig.page';

const routes: Routes = [
  {
    path: '',
    component: SendRequestMultisigPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendRequestMultisigPageRoutingModule {}
