import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExportFilePage } from './export-file.page';

const routes: Routes = [
  {
    path: '',
    component: ExportFilePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExportFilePageRoutingModule {}
