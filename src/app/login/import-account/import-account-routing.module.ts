import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImportAccountPage } from './import-account.page';

const routes: Routes = [
  {
    path: '',
    component: ImportAccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImportAccountPageRoutingModule {}
