import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChartComponent } from './chart.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [ChartComponent],
  exports: [ChartComponent],
	imports: [IonicModule, CommonModule, FormsModule, TranslateModule],
})
export class ChartModule {}
