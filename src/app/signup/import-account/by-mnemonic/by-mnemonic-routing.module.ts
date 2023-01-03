import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ByMnemonicPage } from './by-mnemonic.page';

const routes: Routes = [
  {
    path: '',
    component: ByMnemonicPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ByMnemonicPageRoutingModule {}
