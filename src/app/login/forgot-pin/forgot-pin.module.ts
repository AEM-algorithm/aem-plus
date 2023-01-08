import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgotPinPageRoutingModule } from './forgot-pin-routing.module';

import { ForgotPinPage } from './forgot-pin.page';
import { SharedComponent } from '../../shared-component/shared-component.modules';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ForgotPinPageRoutingModule,
		SharedComponent,
		TranslateModule,
	],
  declarations: [ForgotPinPage],
})
export class ForgotPinPageModule {}
