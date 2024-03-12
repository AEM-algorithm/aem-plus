import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MintNftModalComponent } from '../mint-nft-modal/mint-nft-modal.component';

@Component({
  selector: 'app-mint-nft',
  templateUrl: './mint-nft.page.html',
  styleUrls: ['./mint-nft.page.scss'],
})
export class MintNftPage implements OnInit {

  numberNFT = 1;
  isModalOpen = false;
  constructor(
    private modalCtrl: ModalController,

  ) { }
  ngOnInit() {
  }
  downNFT() {
    if (this.numberNFT > 1) {
      this.numberNFT = this.numberNFT - 1;
    }
  }
  upNFT() {
    this.numberNFT = this.numberNFT + 1;
  }
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  mint() {
    this.modalCtrl
      .create({
        component: MintNftModalComponent,
        componentProps: {
          // selectedWallet: wallet, // pass the data of clicked wallet
          // mode: mode, // determine the navigation page: send | receive
        },
        cssClass: 'height-sixty-modal',
      })
      .then((modal) => {
        modal.present();
      });

  }
}
