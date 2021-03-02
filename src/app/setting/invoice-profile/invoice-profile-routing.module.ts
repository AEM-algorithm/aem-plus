import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvoiceProfilePage } from './invoice-profile.page';

const routes: Routes = [
  {
    path: '',
    component: InvoiceProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoiceProfilePageRoutingModule {}
