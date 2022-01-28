import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditWalletPage } from './edit-wallet.page';

const routes: Routes = [
  {
    path: '',
    component: EditWalletPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditWalletPageRoutingModule {}
