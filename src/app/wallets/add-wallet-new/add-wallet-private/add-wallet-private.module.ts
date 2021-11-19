import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddWalletPrivatePageRoutingModule } from './add-wallet-private-routing.module';

import { AddWalletPrivatePage } from './add-wallet-private.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddWalletPrivatePageRoutingModule
  ],
  declarations: [AddWalletPrivatePage]
})
export class AddWalletPrivatePageModule {}
