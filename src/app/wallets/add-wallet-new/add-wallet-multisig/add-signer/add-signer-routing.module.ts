import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddSignerPage } from './add-signer.page';

const routes: Routes = [
  {
    path: '',
    component: AddSignerPage
  },
  {
    path: 'add-consignator',
    loadChildren: () => import('./add-consignator/add-consignator.module').then(m => m.AddConsignatorPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddSignerPageRoutingModule {}
