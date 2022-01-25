import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { EditPageRoutingModule } from "./edit-routing.module";

import { EditPage } from "./edit.page";
import { SharedComponent } from "../../shared-component/shared-component.modules";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    EditPageRoutingModule,
    SharedComponent,
  ],
  declarations: [EditPage],
})
export class EditPageModule {}
