import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContributeDonationPage } from './contribute-donation.page';

const routes: Routes = [
  {
    path: '',
    component: ContributeDonationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContributeDonationPageRoutingModule {}
