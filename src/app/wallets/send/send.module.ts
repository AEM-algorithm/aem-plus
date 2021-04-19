import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendPageRoutingModule } from './send-routing.module';

import { SendPage } from './send.page';
import { SelectAddressModalComponent } from './select-address-modal/select-address-modal.component';
import { ChooseAddressModalComponent } from './choose-address-modal/choose-address-modal.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, SendPageRoutingModule],
  declarations: [SendPage, SelectAddressModalComponent, ChooseAddressModalComponent],
})
export class SendPageModule {}
