import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-mint-nft-modal',
  templateUrl: './mint-nft-modal.component.html',
  styleUrls: ['./mint-nft-modal.component.scss'],
})
export class MintNftModalComponent implements OnInit {
  @Input() total: string;
  @Input() numberNFT: number;

  segmentValue = "mint";
  isConfirm = false;
  mintFee: string = '0.05';
  totalMint: any;
  constructor(private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    this.totalMint = parseFloat(this.total) + parseFloat(this.mintFee)

  }


  async handleCloseOnClick() {
    await this.modalCtrl.dismiss();
  }
  segmentChanged(e) {
    console.log(e.detail.value)
    this.segmentValue = e.detail.value;
  }

  onConfirm() {
    this.isConfirm = true
  }
  async onClose() {
    await this.modalCtrl.dismiss();
  }
}
