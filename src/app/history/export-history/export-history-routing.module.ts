import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExportHistoryPage } from './export-history.page';

const routes: Routes = [
  {
    path: '',
    component: ExportHistoryPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExportHistoryPageRoutingModule {}
