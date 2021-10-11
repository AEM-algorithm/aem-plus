import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddConsignatorPage } from './add-consignator.page';

const routes: Routes = [
  {
    path: '',
    component: AddConsignatorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddConsignatorPageRoutingModule {}
