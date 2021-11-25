import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddressWalletPageRoutingModule } from './address-wallet-routing.module';

import { AddressWalletPage } from './address-wallet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddressWalletPageRoutingModule
  ],
  declarations: [AddressWalletPage]
})
export class AddressWalletPageModule {}
