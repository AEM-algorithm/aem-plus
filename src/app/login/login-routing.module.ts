import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage,
  },

  {
    path: 'create-account',
    loadChildren: () => import('./create-account/create-account.module').then((m) => m.CreateAccountPageModule),
  },
  {
    path: 'import-account',
    loadChildren: () => import('./import-account/import-account.module').then((m) => m.ImportAccountPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
