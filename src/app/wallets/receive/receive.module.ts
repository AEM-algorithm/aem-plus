import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ReceivePageRoutingModule } from "./receive-routing.module";

import { ReceivePage } from "./receive.page";
import { SharedComponent } from "../../shared-component/shared-component.modules";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ReceivePageRoutingModule,
    SharedComponent,
  ],
  declarations: [ReceivePage],
})
export class ReceivePageModule {}
