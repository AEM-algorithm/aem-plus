import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { AddressWalletPageRoutingModule } from "./address-wallet-routing.module";

import { AddressWalletPage } from "./address-wallet.page";
import { SharedComponent } from "../../shared-component/shared-component.modules";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddressWalletPageRoutingModule,
    SharedComponent,
  ],
  declarations: [AddressWalletPage],
})
export class AddressWalletPageModule {}
