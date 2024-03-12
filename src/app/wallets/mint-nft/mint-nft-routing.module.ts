import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MintNftPage } from './mint-nft.page';

const routes: Routes = [
  {
    path: '',
    component: MintNftPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MintNftPageRoutingModule {}
