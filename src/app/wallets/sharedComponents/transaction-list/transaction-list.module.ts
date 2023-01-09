import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { TransactionListComponent } from './transaction-list.component';
import { TransactionItemModule } from '@app/wallets/sharedComponents/transaction-item/transaction-item.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [TransactionListComponent],
  exports: [TransactionListComponent],
	imports: [IonicModule, CommonModule, TransactionItemModule, TranslateModule],
})
export class TransactionListModule {}
