import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SendPageRoutingModule } from './send-routing.module';

import { SendPage } from './send.page';
import { SelectAddressModalComponent } from './select-address-modal/select-address-modal.component';
import { SharedComponent } from '../../shared-component/shared-component.modules';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		IonicModule,
		SendPageRoutingModule,
		SharedComponent,
		TranslateModule,
	],
  declarations: [SendPage, SelectAddressModalComponent],
})
export class SendPageModule {}
