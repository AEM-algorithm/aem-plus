import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupPage } from './signup.page';

const routes: Routes = [
  {
    path: '',
    component: SignupPage,
  },
  {
    path: 'create-account',
    loadChildren: () => import('./create-account/create-account.module').then((m) => m.CreateAccountPageModule),
  },
  {
    path: 'verify-create-account',
    loadChildren: () => import('./verify-create-account/verify-create-account.module').then((m) => m.VerifyCreateAccountModule),
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
export class SignupPageRoutingModule {}
