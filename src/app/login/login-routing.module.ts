import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { LoginPage } from './login.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  },
  {
    path: 'forgot-pin',
    loadChildren: () => import('./forgot-pin/forgot-pin.module').then( m => m.ForgotPinPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    TranslateModule
  ],
  exports: [RouterModule],
})
export class LoginPageRoutingModule { }
