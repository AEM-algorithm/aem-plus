import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrCodeScanPage } from './qr-code-scan.page';

const routes: Routes = [
  {
    path: '',
    component: QrCodeScanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrCodeScanRoutingModule {}
