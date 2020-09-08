import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPayeePage } from './add-payee.page';

const routes: Routes = [
  {
    path: '',
    component: AddPayeePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddPayeePageRoutingModule {}
