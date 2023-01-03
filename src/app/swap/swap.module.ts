import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SwapPageRoutingModule } from './swap-routing.module';

import { SwapPage } from './swap.page';
import { SharedComponent } from '../shared-component/shared-component.modules';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SwapPageRoutingModule,
    SharedComponent,
  ],
  declarations: [SwapPage],
})
export class SwapPageModule {}
