import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmExportPageRoutingModule } from './confirm-export-routing.module';

import { ConfirmExportPage } from './confirm-export.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmExportPageRoutingModule
  ],
  declarations: [ConfirmExportPage]
})
export class ConfirmExportPageModule {}
