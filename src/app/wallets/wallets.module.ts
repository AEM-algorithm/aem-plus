import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WalletsPageRoutingModule } from './wallets-routing.module';

import { WalletsPage } from './wallets.page';
import { ListComponent } from './list/list.component';
import { TotalTransactionComponent } from './total-transaction/total-transaction.component';
import { SelectWalletModalComponent } from './select-wallet-modal/select-wallet-modal.component';

import { FilteredTransactionModalComponent } from './transaction-filter-modal/filtered-transaction-modal/filtered-transaction-modal.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, WalletsPageRoutingModule],
  declarations: [
    WalletsPage,
    ListComponent,
    TotalTransactionComponent,
    SelectWalletModalComponent,
    FilteredTransactionModalComponent,
  ],
})
export class WalletsPageModule {}
