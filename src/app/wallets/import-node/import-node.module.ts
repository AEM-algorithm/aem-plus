import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImportNodePageRoutingModule } from './import-node-routing.module';

import { ImportNodePage } from './import-node.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImportNodePageRoutingModule
  ],
  declarations: [ImportNodePage]
})
export class ImportNodePageModule {}
