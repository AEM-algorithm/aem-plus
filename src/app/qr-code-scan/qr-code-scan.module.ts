import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { QrCodeScanRoutingModule } from "./qr-code-scan-routing.module";

import { QrCodeScanPage } from "./qr-code-scan.page";
import { SharedComponent } from "../shared-component/shared-component.modules";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrCodeScanRoutingModule,
    SharedComponent,
  ],
  declarations: [QrCodeScanPage],
})
export class QrCodeScanModule {}
