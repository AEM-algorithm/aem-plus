import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangeCurrencyRoutingModule } from './change-currency-routing.module';

import { ChangeCurrencyPage } from './change-currency.page';
import { SharedComponent } from '../../shared-component/shared-component.modules';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangeCurrencyRoutingModule,
    SharedComponent,
    TranslateModule,
  ],
  declarations: [ChangeCurrencyPage],
})
export class ChangeCurrencyModule {}
