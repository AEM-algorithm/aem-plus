import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupportPage } from './support.page';

const routes: Routes = [
  {
    path: '',
    component: SupportPage
  },
  {
    path: 'contact-us',
    loadChildren: () => import('./contact-us/contact-us.module').then( m => m.ContactUsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupportPageRoutingModule {}
