import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { EthPageRoutingModule } from "./eth-routing.module";

import { EthPage } from "./eth.page";
import { BalanceModule } from '@app/wallets/sharedComponents/balance/balance.module';
import { ChartComponent } from "../sharedComponents/chart/chart.component";
import { TransactionListComponent } from "../sharedComponents/transaction-list/transaction-list.component";
import { TransactionItemComponent } from "../sharedComponents/transaction-item/transaction-item.component";
import { TransactionDetailComponent } from "../sharedComponents/transaction-item/transaction-detail/transaction-detail.component";
import { SharedComponent } from "../../shared-component/shared-component.modules";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EthPageRoutingModule,
    SharedComponent,
    BalanceModule,
  ],
  declarations: [
    EthPage,
    ChartComponent,
    TransactionListComponent,
    TransactionItemComponent,
    TransactionDetailComponent,
  ],
})
export class EthPageModule {}
