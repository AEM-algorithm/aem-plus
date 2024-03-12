import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MrJournalerPageRoutingModule } from './mr-journaler-routing.module';

import { SharedComponent } from '../../shared-component/shared-component.modules';
import { MrJournalerPage } from './mr-journaler.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MrJournalerPageRoutingModule,
    SharedComponent
  ],
  declarations: [MrJournalerPage]
})
export class MrJournalerPageModule { }
