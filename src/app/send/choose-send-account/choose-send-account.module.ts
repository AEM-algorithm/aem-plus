import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChooseAccountPageRoutingModule } from './choose-send-account-routing.module';

import { ChooseSendAccountPage } from './choose-send-account.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChooseAccountPageRoutingModule
  ],
  declarations: [ChooseSendAccountPage]
})
export class ChooseSendAccountPageModule {}
