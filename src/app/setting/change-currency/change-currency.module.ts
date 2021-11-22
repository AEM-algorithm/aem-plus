import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangeCurrencyRoutingModule } from './change-currency-routing.module';

import { ChangeCurrencyPage } from './change-currency.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangeCurrencyRoutingModule
  ],
  declarations: [ChangeCurrencyPage]
})
export class ChangeCurrencyModule {}
