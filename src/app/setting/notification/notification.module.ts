import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { NotificationPageRoutingModule } from "./notification-routing.module";

import { NotificationPage } from "./notification.page";
import { SharedComponent } from "../../shared-component/shared-component.modules";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationPageRoutingModule,
    SharedComponent,
  ],
  declarations: [NotificationPage],
})
export class NotificationPageModule {}
