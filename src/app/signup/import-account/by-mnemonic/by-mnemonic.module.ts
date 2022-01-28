import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ByMnemonicPageRoutingModule } from './by-mnemonic-routing.module';

import { ByMnemonicPage } from './by-mnemonic.page';
import { SharedComponent } from '../../../shared-component/shared-component.modules';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ByMnemonicPageRoutingModule,
    SharedComponent,
  ],
  declarations: [ByMnemonicPage],
})
export class ByMnemonicPageModule {}
