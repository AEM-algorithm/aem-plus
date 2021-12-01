import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendRequestMultisigPageRoutingModule } from './send-request-multisig-routing.module';

import { SendRequestMultisigPage } from './send-request-multisig.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SendRequestMultisigPageRoutingModule
  ],
  declarations: [SendRequestMultisigPage]
})
export class SendRequestMultisigPageModule {}
