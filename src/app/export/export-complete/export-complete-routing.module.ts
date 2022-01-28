import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExportCompletePage } from './export-complete.page';

const routes: Routes = [
  {
    path: '',
    component: ExportCompletePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExportCompletePageRoutingModule {}
