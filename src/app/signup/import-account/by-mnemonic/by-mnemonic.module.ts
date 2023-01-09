import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ByMnemonicPageRoutingModule } from './by-mnemonic-routing.module';

import { ByMnemonicPage } from './by-mnemonic.page';
import { SharedComponent } from '../../../shared-component/shared-component.modules';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ByMnemonicPageRoutingModule,
		SharedComponent,
		TranslateModule,
	],
  declarations: [ByMnemonicPage],
})
export class ByMnemonicPageModule {}
