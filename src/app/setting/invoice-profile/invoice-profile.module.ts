import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { InvoiceProfilePageRoutingModule } from './invoice-profile-routing.module';

import { InvoiceProfilePage } from './invoice-profile.page';
import { SharedComponent } from '../../shared-component/shared-component.modules';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		InvoiceProfilePageRoutingModule,
		ReactiveFormsModule,
		SharedComponent,
		TranslateModule,
	],
  declarations: [InvoiceProfilePage],
})
export class InvoiceProfilePageModule {}
