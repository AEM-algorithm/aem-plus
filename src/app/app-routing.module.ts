import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path: '', redirectTo: '/tabnav/wallets', pathMatch: 'full' },
  { path: '', redirectTo: '/signup', pathMatch: 'full' },

  {
    path: 'signup',
    loadChildren: () =>
      import('./signup/signup.module').then((m) => m.SignupPageModule),
  },

  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./tabnav/tabnav.module').then((m) => m.TabnavPageModule),
  },
  // {
  //   path: 'notifications',
  //   loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsPageModule)
  // },
  // {
  //   path: 'notifications/:walletId',
  //   loadChildren: () =>
  //     import('./notifications/notifications.module').then(
  //       (m) => m.NotificationsPageModule
  //     ),
  // },
  {
    path: 'export-invoice',
    loadChildren: () =>
      import('./export-invoice/export-invoice.module').then(
        (m) => m.ExportInvoicePageModule
      ),
  },
  {
    path: 'qr-code-scan',
    loadChildren: () =>
      import('./qr-code-scan/qr-code-scan.module').then(
        (m) => m.QrCodeScanModule
      ),
  },
  {
    path: 'receive',
    loadChildren: () => import('./receive/receive.module').then(m => m.ReceivePageModule)
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
