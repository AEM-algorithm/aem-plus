import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddSignerPageRoutingModule } from './add-signer-routing.module';

import { AddSignerPage } from './add-signer.page';
import { SharedComponent } from '../../../../shared-component/shared-component.modules';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		AddSignerPageRoutingModule,
		SharedComponent,
		TranslateModule,
	],
  declarations: [AddSignerPage],
})
export class AddSignerPageModule {}
