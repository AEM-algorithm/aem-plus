import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NemPage } from './nem.page';

const routes: Routes = [
  {
    path: '',
    component: NemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NemPageRoutingModule {}
