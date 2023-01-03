import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SymbolPage } from './symbol.page';

const routes: Routes = [
  {
    path: '',
    component: SymbolPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SymbolPageRoutingModule {}
