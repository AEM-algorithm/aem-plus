import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { AddWalletPrivatePageRoutingModule } from "./add-wallet-private-routing.module";

import { AddWalletPrivatePage } from "./add-wallet-private.page";
import { SharedComponent } from "../../../shared-component/shared-component.modules";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddWalletPrivatePageRoutingModule,
    SharedComponent,
  ],
  declarations: [AddWalletPrivatePage],
})
export class AddWalletPrivatePageModule {}
