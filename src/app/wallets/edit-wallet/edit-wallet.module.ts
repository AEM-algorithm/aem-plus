import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditWalletPageRoutingModule } from './edit-wallet-routing.module';

import { EditWalletPage } from './edit-wallet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditWalletPageRoutingModule
  ],
  declarations: [EditWalletPage]
})
export class EditWalletPageModule {}
