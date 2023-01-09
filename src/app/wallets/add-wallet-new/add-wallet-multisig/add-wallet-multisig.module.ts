import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddWalletMultisigPageRoutingModule } from './add-wallet-multisig-routing.module';

import { AddWalletMultisigPage } from './add-wallet-multisig.page';
import { SharedComponent } from '../../../shared-component/shared-component.modules';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		AddWalletMultisigPageRoutingModule,
		SharedComponent,
		TranslateModule,
	],
  declarations: [AddWalletMultisigPage],
})
export class AddWalletMultisigPageModule {}
