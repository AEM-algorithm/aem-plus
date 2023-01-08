import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NemPageRoutingModule } from './nem-routing.module';

import { NemPage } from './nem.page';
import { BalanceModule } from '@app/wallets/sharedComponents/balance/balance.module';
import { TransactionListModule } from '@app/wallets/sharedComponents/transaction-list/transaction-list.module';
import { ChartModule } from '@app/wallets/sharedComponents/chart/chart.module';
import { TransactionDetailModule } from '@app/wallets/sharedComponents/transaction-item/transaction-detail/transaction-detail.module';
import { TransactionItemModule } from '@app/wallets/sharedComponents/transaction-item/transaction-item.module';
import { NemNodeSelectionComponent } from '../node-selection/nem-node-selection/nem-node-selection.component';
import { SharedComponent } from '@app/shared-component/shared-component.modules';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		NemPageRoutingModule,
		SharedComponent,
		BalanceModule,
		TransactionDetailModule,
		TransactionItemModule,
		TransactionListModule,
		ChartModule,
		TranslateModule,
	],
  declarations: [NemPage, NemNodeSelectionComponent],
})
export class NemPageModule {}
