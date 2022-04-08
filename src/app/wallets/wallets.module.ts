import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WalletsPageRoutingModule } from './wallets-routing.module';

import { WalletsPage } from './wallets.page';
import { ListComponent } from './list/list.component';
import { SelectWalletModalComponent } from './select-wallet-modal/select-wallet-modal.component';
import {SelectWalletListingModalComponent} from '@app/wallets/select-wallet-listing-modal/select-wallet-listing-modal.component';

import { FilteredTransactionModalComponent } from './transaction-filter-modal/filtered-transaction-modal/filtered-transaction-modal.component';
import { SharedComponent } from '../shared-component/shared-component.modules';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WalletsPageRoutingModule,
    SharedComponent,
  ],
  declarations: [
    WalletsPage,
    ListComponent,
    SelectWalletModalComponent,
    SelectWalletListingModalComponent,
    FilteredTransactionModalComponent,
    SelectEthersNetworkModalComponent,
  ],
})
export class WalletsPageModule {}
