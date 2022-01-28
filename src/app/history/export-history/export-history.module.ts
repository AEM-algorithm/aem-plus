import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExportHistoryPageRoutingModule } from './export-history-routing.module';

import { ExportHistoryPage } from './export-history.page';
import { SharedComponent } from '../../shared-component/shared-component.modules';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExportHistoryPageRoutingModule,
    SharedComponent,
  ],
  declarations: [ExportHistoryPage],
})
export class ExportHistoryPageModule {}
