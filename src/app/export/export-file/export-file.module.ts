import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExportFilePageRoutingModule } from './export-file-routing.module';

import { ExportFilePage } from './export-file.page';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ExportFilePageRoutingModule,
		TranslateModule,
	],
  declarations: [ExportFilePage],
})
export class ExportFilePageModule {}
