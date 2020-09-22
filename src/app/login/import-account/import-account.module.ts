import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImportAccountPageRoutingModule } from './import-account-routing.module';

import { ImportAccountPage } from './import-account.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImportAccountPageRoutingModule
  ],
  declarations: [ImportAccountPage]
})
export class ImportAccountPageModule {}
