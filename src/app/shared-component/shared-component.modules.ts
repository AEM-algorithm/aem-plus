import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { BackgroundHeaderComponent } from './background-header/background-header.component';

@NgModule({
  declarations: [BackgroundHeaderComponent],
  exports: [BackgroundHeaderComponent],
  imports: [IonicModule, CommonModule],
})
export class SharedComponent {}
