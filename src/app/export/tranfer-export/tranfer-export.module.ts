import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TranferExportPageRoutingModule } from './tranfer-export-routing.module';

import { TranferExportPage } from './tranfer-export.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranferExportPageRoutingModule
  ],
  declarations: [TranferExportPage]
})
export class TranferExportPageModule {}
