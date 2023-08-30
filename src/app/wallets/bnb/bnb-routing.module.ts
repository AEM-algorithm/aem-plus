import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BNBPage } from './bnb.page';

const routes: Routes = [
  {
    path: '',
    component: BNBPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BNBPageRoutingModule {}
