import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ExportPageRoutingModule } from './export-routing.module';

import { ExportPage } from './export.page';
import { SharedComponent } from '../shared-component/shared-component.modules';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    ExportPageRoutingModule,
    SharedComponent,
  ],
  declarations: [ExportPage],
})
export class ExportPageModule {}
