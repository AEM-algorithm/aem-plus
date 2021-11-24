import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReceivePageRoutingModule } from './receive-routing.module';

import { ReceivePage } from './receive.page';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, ReceivePageRoutingModule],
  declarations: [ReceivePage],
})
export class ReceivePageModule {}
