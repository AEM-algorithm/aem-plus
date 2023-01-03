import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { SelectWalletListingModalComponent } from '@app/wallets/select-wallet-listing-modal/select-wallet-listing-modal.component';

@Component({
  selector: 'app-tabnav',
  templateUrl: './tabnav.page.html',
  styleUrls: ['./tabnav.page.scss'],
})
export class TabnavPage implements OnInit {
  constructor(
    private modalCtrl: ModalController,
  ) {}

  ngOnInit() {}

  async openSelectWalletListingModal() {
    const modal = await this.modalCtrl.create({
      component: SelectWalletListingModalComponent,
      cssClass: 'height-sixty-modal',
    });
    await modal.present();
    // await modal.onDidDismiss();
  }
}
