import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddressBookPage } from './address-book.page';

const routes: Routes = [
  {
    path: '',
    component: AddressBookPage
  },
  {
    path: 'add-payee',
    loadChildren: () => import('./add-payee/add-payee.module').then( m => m.AddPayeePageModule)
  },
  {
    path: 'detail',
    loadChildren: () => import('./detail/detail.module').then( m => m.DetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddressBookPageRoutingModule {}
