import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrCodeScanRoutingModule } from './qr-code-scan-routing.module';

import { QrCodeScanPage } from './qr-code-scan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrCodeScanRoutingModule
  ],
  declarations: [QrCodeScanPage]
})
export class QrCodeScanModule {}
