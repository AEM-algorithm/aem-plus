import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChooseAccountPageRoutingModule } from './choose-account-routing.module';

import { ChooseAccountPage } from './choose-account.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChooseAccountPageRoutingModule
  ],
  declarations: [ChooseAccountPage]
})
export class ChooseAccountPageModule {}
