import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ByPrivateKeyPage } from './by-private-key.page';

const routes: Routes = [
  {
    path: '',
    component: ByPrivateKeyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ByPrivateKeyPageRoutingModule {}
