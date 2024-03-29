import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddWalletNewPageRoutingModule } from './add-wallet-new-routing.module';

import { AddWalletNewPage } from './add-wallet-new.page';
import { SharedComponent } from '../../shared-component/shared-component.modules';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		AddWalletNewPageRoutingModule,
		SharedComponent,
		TranslateModule,
	],
  declarations: [AddWalletNewPage],
})
export class AddWalletNewPageModule {}
