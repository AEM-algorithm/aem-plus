import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SymbolPageRoutingModule } from './symbol-routing.module';

import { SymbolPage } from './symbol.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SymbolPageRoutingModule
  ],
  declarations: [SymbolPage]
})
export class SymbolPageModule {}
