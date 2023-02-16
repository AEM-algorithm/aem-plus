import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabnavPage } from './tabnav.page';

const routes: Routes = [
  {
    path: 'tabnav',
    component: TabnavPage,
    children: [
      {
        path: 'wallets',
        loadChildren: () =>
          import('../wallets/wallets.module').then((m) => m.WalletsPageModule),
      },
      // {
      //   path: 'export-invoice',
      //   loadChildren: () => import('../export/export.module').then((m) => m.ExportPageModule),
      // },
      {
        path: 'export',
        loadChildren: () =>
          import('../export-invoice/export-invoice.module').then(
            (m) => m.ExportInvoicePageModule
          ),
      },
      {
        path: 'swap',
        loadChildren: () =>
          import('../swap/swap.module').then((m) => m.SwapPageModule),
      },
      {
        path: 'receive',
        loadChildren: () =>
          import('../receive/receive.module').then((m) => m.ReceivePageModule),
      },
      {
        path: 'address-book',
        loadChildren: () =>
          import('../address-book/address-book.module').then(
            (m) => m.AddressBookPageModule
          ),
      },
      {
        path: 'setting',
        loadChildren: () =>
          import('../setting/setting.module').then((m) => m.SettingPageModule),
      },
      { path: '', redirectTo: '/tabnav/wallets', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: '/tabnav/wallets', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabnavPageRoutingModule {}
