import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddSignerPageRoutingModule } from './add-signer-routing.module';

import { AddSignerPage } from './add-signer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddSignerPageRoutingModule
  ],
  declarations: [AddSignerPage]
})
export class AddSignerPageModule {}
