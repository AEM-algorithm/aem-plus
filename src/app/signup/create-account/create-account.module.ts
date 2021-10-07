import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { CreateAccountPageRoutingModule } from './create-account-routing.module';

import { CreateAccountPage } from './create-account.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, CreateAccountPageRoutingModule, TranslateModule],
  declarations: [CreateAccountPage],
})
export class CreateAccountPageModule {}
