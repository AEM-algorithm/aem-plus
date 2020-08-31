import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path: '', redirectTo: 'signin', pathMatch: 'full' },
  // set the
  { path: '', redirectTo: '/tabnav/wallets', pathMatch: 'full' },

  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then((m) => m.LoginPageModule),
  },
  // {
  //   path: 'dashboard',
  //   loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardPageModule),
  // },

  // {
  //   path: 'wallets',
  //   loadChildren: () => import('./wallets/wallets.module').then((m) => m.WalletsPageModule),
  // },
  // {
  //   path: 'export',
  //   loadChildren: () => import('./export/export.module').then((m) => m.ExportPageModule),
  // },
  // {
  //   path: 'setting',
  //   loadChildren: () => import('./setting/setting.module').then((m) => m.SettingPageModule),
  // },
  // {
  //   path: 'address-book',
  //   loadChildren: () => import('./address-book/address-book.module').then((m) => m.AddressBookPageModule),
  // },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then((m) => m.SignupPageModule),
  },
  {
    path: '',
    loadChildren: () => import('./tabnav/tabnav.module').then((m) => m.TabnavPageModule),
  },
  {
    path: 'choose-account',
    loadChildren: () => import('./choose-account/choose-account.module').then( m => m.ChooseAccountPageModule)
  },
  {
    path: 'send',
    loadChildren: () => import('./send/send.module').then( m => m.SendPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
