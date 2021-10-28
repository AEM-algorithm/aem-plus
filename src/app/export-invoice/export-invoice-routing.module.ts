import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExportInvoicePage } from './export-invoice.page';

const routes: Routes = [
  {
    path: '',
    component: ExportInvoicePage
  },
  {
    path: 'confirm-export',
    loadChildren: () => import('../export/confirm-export/confirm-export.module').then(m => m.ConfirmExportPageModule)
  },
  {
      path: 'export-invoice',
      loadChildren: () => import('../export/export.module').then((m) => m.ExportPageModule),
    },
    {
      path: 'tranfer-export',
      loadChildren: () => import('../export/tranfer-export/tranfer-export.module').then( m => m.TranferExportPageModule)
    },
    {
      path: 'export-file',
      loadChildren: () => import('../export/export-file/export-file.module').then( m => m.ExportFilePageModule)
    },
    {
      path: 'export-complete',
      loadChildren: () => import('../export/export-complete/export-complete.module').then( m => m.ExportCompletePageModule)
    },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExportInvoicePageRoutingModule {}
