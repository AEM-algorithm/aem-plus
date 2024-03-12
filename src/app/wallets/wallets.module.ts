import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WalletsPageRoutingModule } from './wallets-routing.module';

import { WalletsPage } from './wallets.page';
import { ListComponent } from './list/list.component';
import { SelectWalletModalComponent } from './select-wallet-modal/select-wallet-modal.component';
import { SelectWalletListingModalComponent } from '@app/wallets/select-wallet-listing-modal/select-wallet-listing-modal.component';
import { SelectEthersNetworkModalComponent } from '@app/wallets/select-ethers-network-modal/select-ethers-network-modal.component';

import { FilteredTransactionModalComponent } from './transaction-filter-modal/filtered-transaction-modal/filtered-transaction-modal.component';
import { SharedComponent } from '../shared-component/shared-component.modules';
import { TranslateModule } from '@ngx-translate/core';
import { MintNftModalComponent } from './mint-nft-modal/mint-nft-modal.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		WalletsPageRoutingModule,
		SharedComponent,
		TranslateModule,
	],
	declarations: [
		WalletsPage,
		ListComponent,
		SelectWalletModalComponent,
		SelectWalletListingModalComponent,
		FilteredTransactionModalComponent,
		SelectEthersNetworkModalComponent,
		MintNftModalComponent
	],
	exports: [
		SelectWalletListingModalComponent,
	],
})
export class WalletsPageModule { }
