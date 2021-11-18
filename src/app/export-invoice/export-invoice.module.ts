import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExportInvoicePageRoutingModule } from './export-invoice-routing.module';

import { ExportInvoicePage } from './export-invoice.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExportInvoicePageRoutingModule
  ],
  declarations: [ExportInvoicePage]
})
export class ExportInvoicePageModule {}
