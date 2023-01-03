import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LegalPageRoutingModule } from './legal-routing.module';

import { LegalPage } from './legal.page';
import { SharedComponent } from '../../shared-component/shared-component.modules';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LegalPageRoutingModule,
    SharedComponent,
  ],
  declarations: [LegalPage],
})
export class LegalPageModule {}
