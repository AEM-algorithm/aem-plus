import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { VerifyCreateAccountRoutingModule } from './verify-create-account-routing.module';

import { VerifyCreateAccountPage } from './verify-create-account.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, VerifyCreateAccountRoutingModule, TranslateModule],
  declarations: [VerifyCreateAccountPage],
})
export class VerifyCreateAccountModule {}
