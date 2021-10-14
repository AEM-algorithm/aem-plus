import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImportNodePage } from './import-node.page';

const routes: Routes = [
  {
    path: '',
    component: ImportNodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImportNodePageRoutingModule {}
