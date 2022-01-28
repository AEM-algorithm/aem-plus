import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { BalanceComponent } from './balance.component';

@NgModule({
  declarations: [BalanceComponent],
  exports: [BalanceComponent],
  imports: [IonicModule, CommonModule],
})
export class BalanceModule {}
