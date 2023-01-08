import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExportHistoryPageRoutingModule } from './export-history-routing.module';

import { ExportHistoryPage } from './export-history.page';
import { SharedComponent } from '../../shared-component/shared-component.modules';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ExportHistoryPageRoutingModule,
		SharedComponent,
		TranslateModule,
	],
  declarations: [ExportHistoryPage],
})
export class ExportHistoryPageModule {}
