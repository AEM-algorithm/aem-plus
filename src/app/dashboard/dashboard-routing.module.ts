import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,

    children: [
      {
        path: 'wallets',
        children: [
          { path: '', loadChildren: () => import('./wallets/wallets.module').then((m) => m.WalletsPageModule) },
          {
            path: 'bitcoin',
            loadChildren: () => import('./wallets/bitcoin/bitcoin.module').then((m) => m.BitcoinPageModule),
          },
        ],
      },
      {
        path: 'export',
        loadChildren: () => import('./export/export.module').then((m) => m.ExportPageModule),
      },
      {
        path: 'setting',
        loadChildren: () => import('./setting/setting.module').then((m) => m.SettingPageModule),
      },
      {
        path: '',
        redirectTo: '/dashboard/wallets',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/dashboard/wallets',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
