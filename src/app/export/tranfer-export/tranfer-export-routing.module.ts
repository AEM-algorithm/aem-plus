import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TranferExportPage } from './tranfer-export.page';

const routes: Routes = [
  {
    path: '',
    component: TranferExportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TranferExportPageRoutingModule {}
