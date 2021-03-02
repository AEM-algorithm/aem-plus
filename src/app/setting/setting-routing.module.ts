import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingPage } from './setting.page';

const routes: Routes = [
  {
    path: '',
    component: SettingPage
  },
  {
    path: 'my-profile',
    loadChildren: () => import('./my-profile/my-profile.module').then( m => m.MyProfilePageModule)
  },
  {
    path: 'invoice-profile',
    loadChildren: () => import('./invoice-profile/invoice-profile.module').then( m => m.InvoiceProfilePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingPageRoutingModule {}
