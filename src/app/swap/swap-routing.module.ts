import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SwapPage } from './swap.page';

const routes: Routes = [
  {
    path: '',
    component: null,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SwapPageRoutingModule {}
