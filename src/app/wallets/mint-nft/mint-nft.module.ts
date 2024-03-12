import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MintNftPageRoutingModule } from './mint-nft-routing.module';

import { MintNftPage } from './mint-nft.page';
import { SharedComponent } from '../../shared-component/shared-component.modules';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MintNftPageRoutingModule,
    SharedComponent
  ],
  declarations: [MintNftPage]
})
export class MintNftPageModule { }
