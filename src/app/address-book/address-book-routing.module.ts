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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddressBookPageRoutingModule {}
