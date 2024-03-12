import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MrJournalerPage } from './mr-journaler.page';

const routes: Routes = [
  {
    path: '',
    component: MrJournalerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MrJournalerPageRoutingModule {}
