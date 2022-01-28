import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImportAccountPageRoutingModule } from './import-account-routing.module';

import { ImportAccountPage } from './import-account.page';
import { SharedComponent } from '../../shared-component/shared-component.modules';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImportAccountPageRoutingModule,
    SharedComponent,
  ],
  declarations: [ImportAccountPage],
})
export class ImportAccountPageModule {}
