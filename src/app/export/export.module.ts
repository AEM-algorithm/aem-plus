import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExportPageRoutingModule } from './export-routing.module';

import { ExportPage } from './export.page';
// components:
import { ExportLockedComponent } from './export-locked/export-locked.component';
import { ExportUnlockedComponent } from './export-unlocked/export-unlocked.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ExportPageRoutingModule],
  declarations: [ExportPage, ExportLockedComponent, ExportUnlockedComponent],
})
export class ExportPageModule {}
