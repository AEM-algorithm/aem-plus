import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TransactionDetailComponent } from './transaction-detail.component';
import {TranslateModule} from '@ngx-translate/core';
@NgModule({
  declarations: [TransactionDetailComponent],
  exports: [TransactionDetailComponent],
	imports: [IonicModule, CommonModule, FormsModule, TranslateModule],
})
export class TransactionDetailModule {}
