import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NemPageRoutingModule } from './nem-routing.module';

import { NemPage } from './nem.page';
import { BalanceComponent } from '../sharedComponents/balance/balance.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, NemPageRoutingModule],
  declarations: [NemPage, BalanceComponent],
})
export class NemPageModule {}
