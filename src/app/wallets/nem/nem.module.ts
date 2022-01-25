import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { NemPageRoutingModule } from "./nem-routing.module";

import { NemPage } from "./nem.page";
import { BalanceModule } from '@app/wallets/sharedComponents/balance/balance.module';
import { TransactionListComponent } from "../sharedComponents/transaction-list/transaction-list.component";
import { ChartComponent } from "../sharedComponents/chart/chart.component";
import { TransactionDetailComponent } from "../sharedComponents/transaction-item/transaction-detail/transaction-detail.component";
import { TransactionItemComponent } from "../sharedComponents/transaction-item/transaction-item.component";
import { NemNodeSelectionComponent } from "../node-selection/nem-node-selection/nem-node-selection.component";
import { SharedComponent } from "../../shared-component/shared-component.modules";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NemPageRoutingModule,
    SharedComponent,
    BalanceModule,
  ],
  declarations: [
    NemPage,
    ChartComponent,
    TransactionListComponent,
    TransactionDetailComponent,
    TransactionItemComponent,
    NemNodeSelectionComponent,
  ],
})
export class NemPageModule {}
