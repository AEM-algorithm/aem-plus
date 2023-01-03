import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddressBookPage } from './address-book.page';

const routes: Routes = [
  {
    path: '',
    component: AddressBookPage,
  },
  {
    path: 'add-contact',
    loadChildren: () =>
      import('./add-contact/add-contact.module').then(
        (m) => m.AddContactPageModule
      ),
  },
  {
    path: ':id',
    loadChildren: () =>
      import('./detail/detail.module').then((m) => m.DetailPageModule),
  },
  {
    path: 'edit/:id',
    loadChildren: () =>
      import('./edit/edit.module').then((m) => m.EditPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddressBookPageRoutingModule {}
