import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { ETHERS_NETWORKS } from '@app/constants/constants';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-select-wallet-modal',
  templateUrl: './select-ethers-network-modal.component.html',
  styleUrls: ['./select-ethers-network-modal.component.scss'],
})
export class SelectEthersNetworkModalComponent implements OnInit {
  ethersNetwork: any;
  networks: string[];

  constructor(
    private modalCtrl: ModalController,
  ) {}

  ngOnInit() {
    this.ethersNetwork = ETHERS_NETWORKS;
    this.networks = environment.ETH_NODES;
  }

  async handleCloseOnClick() {
    await this.modalCtrl.dismiss();
  }

  async handleSelectNetworkOnClick(networkSelected) {
    await this.modalCtrl.dismiss(networkSelected);
  }

}
