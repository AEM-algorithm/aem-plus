import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddConsignatorPageRoutingModule } from './add-consignator-routing.module';

import { AddConsignatorPage } from './add-consignator.page';
import { SharedComponent } from '../../../../../shared-component/shared-component.modules';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		AddConsignatorPageRoutingModule,
		SharedComponent,
		TranslateModule,
	],
  declarations: [AddConsignatorPage],
})
export class AddConsignatorPageModule {}
