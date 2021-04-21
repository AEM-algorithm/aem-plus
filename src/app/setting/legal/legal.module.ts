import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LegalPageRoutingModule } from './legal-routing.module';

import { LegalPage } from './legal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LegalPageRoutingModule
  ],
  declarations: [LegalPage]
})
export class LegalPageModule {}
