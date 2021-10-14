import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WalletManagerPageRoutingModule } from './wallet-manager-routing.module';

import { WalletManagerPage } from './wallet-manager.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WalletManagerPageRoutingModule
  ],
  declarations: [WalletManagerPage]
})
export class WalletManagerPageModule {}
