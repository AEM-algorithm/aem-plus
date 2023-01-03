import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContributeDonationPageRoutingModule } from './contribute-donation-routing.module';

import { ContributeDonationPage } from './contribute-donation.page';
import {SharedComponent} from '@app/shared-component/shared-component.modules';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContributeDonationPageRoutingModule,
    SharedComponent,
  ],
  declarations: [ContributeDonationPage]
})
export class ContributeDonationPageModule {}
