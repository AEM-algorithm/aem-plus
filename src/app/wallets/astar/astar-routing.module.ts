import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AstarPage } from './astar.page';

const routes: Routes = [
  {
    path: '',
    component: AstarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AstarPageRoutingModule {}
