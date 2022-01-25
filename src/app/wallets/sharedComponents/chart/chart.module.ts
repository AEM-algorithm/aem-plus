import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { ChartComponent } from './chart.component';

@NgModule({
  declarations: [ChartComponent],
  exports: [ChartComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
  ]
})
export class ChartModule {}
