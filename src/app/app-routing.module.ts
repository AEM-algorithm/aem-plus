import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/tabnav/wallets', pathMatch: 'full' },
  // { path: '', redirectTo: '/login', pathMatch: 'full' },

  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then((m) => m.LoginPageModule),
  },

  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then((m) => m.SignupPageModule),
  },
  {
    path: '',
    loadChildren: () => import('./tabnav/tabnav.module').then((m) => m.TabnavPageModule),
  },
  {
    path: 'receive/:walletId',
    loadChildren: () => import('./receive/receive.module').then((m) => m.ReceivePageModule),
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then((m) => m.NotificationsPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
