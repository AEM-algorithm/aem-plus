import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExportCompletePageRoutingModule } from './export-complete-routing.module';

import { ExportCompletePage } from './export-complete.page';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ExportCompletePageRoutingModule,
		TranslateModule,
	],
  declarations: [ExportCompletePage],
})
export class ExportCompletePageModule {}
