import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChooseReceiveAccountPageRoutingModule } from './choose-receive-account-routing.module';

import { ChooseReceiveAccountPage } from './choose-receive-account.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChooseReceiveAccountPageRoutingModule
  ],
  declarations: [ChooseReceiveAccountPage]
})
export class ChooseReceiveAccountPageModule {}
