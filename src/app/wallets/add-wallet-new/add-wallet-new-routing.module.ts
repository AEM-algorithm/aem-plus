import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddWalletNewPage } from './add-wallet-new.page';

const routes: Routes = [
  {
    path: '',
    component: AddWalletNewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddWalletNewPageRoutingModule {}
