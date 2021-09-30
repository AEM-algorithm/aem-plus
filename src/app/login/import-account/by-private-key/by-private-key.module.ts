import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ByPrivateKeyPageRoutingModule } from './by-private-key-routing.module';

import { ByPrivateKeyPage } from './by-private-key.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ByPrivateKeyPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ByPrivateKeyPage]
})
export class ByPrivateKeyPageModule {}
