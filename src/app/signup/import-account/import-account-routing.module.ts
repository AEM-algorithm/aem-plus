import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImportAccountPage } from './import-account.page';

const routes: Routes = [
  {
    path: '',
    component: ImportAccountPage,
  },
  {
    path: 'by-mnemonic',
    loadChildren: () => import('./by-mnemonic/by-mnemonic.module').then((m) => m.ByMnemonicPageModule),
  },
  {
    path: 'by-private-key',
    loadChildren: () => import('./by-private-key/by-private-key.module').then((m) => m.ByPrivateKeyPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImportAccountPageRoutingModule {}
