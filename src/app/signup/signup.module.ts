import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupPageRoutingModule } from './signup-routing.module';

import { SignupPage } from './signup.page';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
	imports: [CommonModule, FormsModule, IonicModule, SignupPageRoutingModule, TranslateModule],
  declarations: [SignupPage],
})
export class SignupPageModule {}
