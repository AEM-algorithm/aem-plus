import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BitcoinPageRoutingModule } from './bitcoin-routing.module';

import { BitcoinPage } from './bitcoin.page';
// components:
import { BalanceModule } from '@app/wallets/sharedComponents/balance/balance.module';
import { TransactionListModule } from '@app/wallets/sharedComponents/transaction-list/transaction-list.module';
import { ChartModule } from '@app/wallets/sharedComponents/chart/chart.module';
import { TransactionItemModule } from '@app/wallets/sharedComponents/transaction-item/transaction-item.module';
import { TransactionDetailModule } from '@app/wallets/sharedComponents/transaction-item/transaction-detail/transaction-detail.module';

// TODO: NodeSelectionComponent for Bitcoin
// import { NodeSelectionComponent } from '../node-selection/node-selection.component';
import { SharedComponent } from '@app/shared-component/shared-component.modules';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		BitcoinPageRoutingModule,
		BalanceModule,
		SharedComponent,
		TransactionDetailModule,
		TransactionItemModule,
		TransactionListModule,
		ChartModule,
		TranslateModule,
	],
  declarations: [
    BitcoinPage,
    // TODO: NodeSelectionComponent for Bitcoin
    // NodeSelectionComponent,
  ],
})
export class BitcoinPageModule {}
