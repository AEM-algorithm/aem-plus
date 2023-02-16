import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReceivePageRoutingModule } from './receive-routing.module';

import { ReceivePage } from './receive.page';
import {SharedComponent} from '@app/shared-component/shared-component.modules';
import {TranslateModule} from '@ngx-translate/core';
import {WalletsPageModule} from '@app/wallets/wallets.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReceivePageRoutingModule,
    SharedComponent,
    TranslateModule,
    WalletsPageModule,
  ],
  declarations: [ReceivePage]
})
export class ReceivePageModule {}
