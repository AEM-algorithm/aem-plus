import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EthPageRoutingModule } from './eth-routing.module';

import { EthPage } from './eth.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EthPageRoutingModule
  ],
  declarations: [EthPage]
})
export class EthPageModule {}
