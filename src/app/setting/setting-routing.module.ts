import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingPage } from './setting.page';

const routes: Routes = [
  {
    path: '',
    component: SettingPage,
  },
  {
    path: 'my-profile',
    loadChildren: () =>
      import('./my-profile/my-profile.module').then(
        (m) => m.MyProfilePageModule
      ),
  },
  {
    path: 'invoice-profile',
    loadChildren: () =>
      import('./invoice-profile/invoice-profile.module').then(
        (m) => m.InvoiceProfilePageModule
      ),
  },
  {
    path: 'notification',
    loadChildren: () =>
      import('./notification/notification.module').then(
        (m) => m.NotificationPageModule
      ),
  },
  {
    path: 'transaction-fee',
    loadChildren: () =>
      import('./transaction-fee/transaction-fee.module').then(
        (m) => m.TransactionFeePageModule
      ),
  },
  {
    path: 'security',
    loadChildren: () =>
      import('./security/security.module').then((m) => m.SecurityPageModule),
  },
  {
    path: 'support',
    loadChildren: () =>
      import('./support/support.module').then((m) => m.SupportPageModule),
  },
  {
    path: 'legal',
    loadChildren: () =>
      import('./legal/legal.module').then((m) => m.LegalPageModule),
  },
  {
    path: 'change-currency',
    loadChildren: () =>
      import('./change-currency/change-currency.module').then(
        (m) => m.ChangeCurrencyModule
      ),
  },
  {
    path: 'contact-us',
    loadChildren: () => import('./contact-us/contact-us.module').then( m => m.ContactUsPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingPageRoutingModule {}
