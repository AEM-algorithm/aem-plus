import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ExportInvoicePageRoutingModule } from "./export-invoice-routing.module";

import { ExportInvoicePage } from "./export-invoice.page";
import { SharedComponent } from "../shared-component/shared-component.modules";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExportInvoicePageRoutingModule,
    SharedComponent,
  ],
  declarations: [ExportInvoicePage],
})
export class ExportInvoicePageModule {}
