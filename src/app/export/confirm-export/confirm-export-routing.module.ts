import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmExportPage } from './confirm-export.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmExportPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmExportPageRoutingModule {}
