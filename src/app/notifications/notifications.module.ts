import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { NotificationsPageRoutingModule } from "./notifications-routing.module";

import { NotificationsPage } from "./notifications.page";
import { SharedComponent } from "../shared-component/shared-component.modules";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationsPageRoutingModule,
    SharedComponent,
  ],
  declarations: [NotificationsPage],
})
export class NotificationsPageModule {}
