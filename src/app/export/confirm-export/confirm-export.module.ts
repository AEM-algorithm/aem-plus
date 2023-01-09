import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmExportPageRoutingModule } from './confirm-export-routing.module';

import { ConfirmExportPage } from './confirm-export.page';
import { SharedComponent } from '../../shared-component/shared-component.modules';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ConfirmExportPageRoutingModule,
		SharedComponent,
		TranslateModule,
	],
  declarations: [ConfirmExportPage],
})
export class ConfirmExportPageModule {}
