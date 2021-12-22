import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { SecurityPageRoutingModule } from "./security-routing.module";

import { SecurityPage } from "./security.page";
import { SharedComponent } from "../../shared-component/shared-component.modules";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SecurityPageRoutingModule,
    SharedComponent,
  ],
  declarations: [SecurityPage],
})
export class SecurityPageModule {}
