import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ByMnemonicPageRoutingModule } from './by-mnemonic-routing.module';

import { ByMnemonicPage } from './by-mnemonic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ByMnemonicPageRoutingModule
  ],
  declarations: [ByMnemonicPage]
})
export class ByMnemonicPageModule {}
