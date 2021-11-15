import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExportPage } from './export.page';

const routes: Routes = [
  {
    path: '',
    component: ExportPage
  },
  {
    path: 'confirm-export',
    loadChildren: () => import('./confirm-export/confirm-export.module').then(m => m.ConfirmExportPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExportPageRoutingModule {}
