import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExportHistoryPageRoutingModule } from './export-history-routing.module';

import { ExportHistoryPage } from './export-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExportHistoryPageRoutingModule
  ],
  declarations: [ExportHistoryPage]
})
export class ExportHistoryPageModule {}
