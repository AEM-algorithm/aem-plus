import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendRequestMultisigPageRoutingModule } from './send-request-multisig-routing.module';

import { SendRequestMultisigPage } from './send-request-multisig.page';
import { SharedComponent } from '../../shared-component/shared-component.modules';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SendRequestMultisigPageRoutingModule,
    SharedComponent,
  ],
  declarations: [SendRequestMultisigPage],
})
export class SendRequestMultisigPageModule {}
