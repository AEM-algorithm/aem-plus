import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExportFilePageRoutingModule } from './export-file-routing.module';

import { ExportFilePage } from './export-file.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExportFilePageRoutingModule
  ],
  declarations: [ExportFilePage]
})
export class ExportFilePageModule {}
