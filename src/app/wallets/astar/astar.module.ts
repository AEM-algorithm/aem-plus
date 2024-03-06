import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AstarPageRoutingModule } from './astar-routing.module';

import { AstarPage } from './astar.page';

import { BalanceModule } from '@app/wallets/sharedComponents/balance/balance.module';
import { ChartModule } from '@app/wallets/sharedComponents/chart/chart.module';
import { TransactionListModule } from '@app/wallets/sharedComponents/transaction-list/transaction-list.module';
import { TransactionItemModule } from '@app/wallets/sharedComponents/transaction-item/transaction-item.module';
import { TransactionDetailModule } from '@app/wallets/sharedComponents/transaction-item/transaction-detail/transaction-detail.module';
import { SharedComponent } from '@app/shared-component/shared-component.modules';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AstarPageRoutingModule,

    CommonModule,
    FormsModule,
    IonicModule,
    SharedComponent,
    BalanceModule,
    TransactionDetailModule,
    TransactionItemModule,
    TransactionListModule,
    ChartModule,
    TranslateModule,
  ],
  declarations: [AstarPage]
})
export class AstarPageModule { }
