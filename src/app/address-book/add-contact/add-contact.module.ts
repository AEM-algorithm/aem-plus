import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { AddContactPageRoutingModule } from "./add-contact-routing.module";

import { AddContactPage } from "./add-contact.page";
import { SharedComponent } from "../../shared-component/shared-component.modules";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddContactPageRoutingModule,
    SharedComponent,
  ],
  declarations: [AddContactPage],
})
export class AddContactPageModule {}
