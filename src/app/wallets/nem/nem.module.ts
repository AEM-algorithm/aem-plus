import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NemPageRoutingModule } from './nem-routing.module';

import { NemPage } from './nem.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NemPageRoutingModule
  ],
  declarations: [NemPage]
})
export class NemPageModule {}
