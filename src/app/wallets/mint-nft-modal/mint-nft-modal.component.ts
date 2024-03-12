import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-mint-nft-modal',
  templateUrl: './mint-nft-modal.component.html',
  styleUrls: ['./mint-nft-modal.component.scss'],
})
export class MintNftModalComponent implements OnInit {

  segmentValue = "mint"
  constructor(private modalCtrl: ModalController,
  ) { }

  ngOnInit(


  ) { }


  async handleCloseOnClick() {
    await this.modalCtrl.dismiss();
  }
  segmentChanged(e) {
    console.log(e.detail.value)
    this.segmentValue = e.detail.value;
  }
}
