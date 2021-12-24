import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";
import { IonicSelectableModule } from "ionic-selectable";

import { SettingPageRoutingModule } from "./setting-routing.module";

import { SettingPage } from "./setting.page";
import { SharedComponent } from "../shared-component/shared-component.modules";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicSelectableModule,
    SettingPageRoutingModule,
    SharedComponent,
  ],
  declarations: [SettingPage],
})
export class SettingPageModule {}
