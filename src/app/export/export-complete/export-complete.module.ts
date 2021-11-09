import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExportCompletePageRoutingModule } from './export-complete-routing.module';

import { ExportCompletePage } from './export-complete.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExportCompletePageRoutingModule
  ],
  declarations: [ExportCompletePage]
})
export class ExportCompletePageModule {}
