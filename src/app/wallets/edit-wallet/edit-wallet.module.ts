import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditWalletPageRoutingModule } from './edit-wallet-routing.module';

import { EditWalletPage } from './edit-wallet.page';
import { SharedComponent } from '../../shared-component/shared-component.modules';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		IonicModule,
		EditWalletPageRoutingModule,
		SharedComponent,
		TranslateModule,
	],
  declarations: [EditWalletPage],
})
export class EditWalletPageModule {}
