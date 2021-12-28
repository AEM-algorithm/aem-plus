import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ModalController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

import { WalletProvider } from '@app/services/wallets/wallet.provider';
import { SelectAddressModalComponent } from '@app/wallets/send/select-address-modal/select-address-modal.component';
import { Address } from '@app/services/models/address.modal';
import { ContactService } from '@app/services/contact/contact.service';
import { MemoryProvider } from '@app/services/memory/memory.provider';

@Component({
  selector: 'app-add-consignator',
  templateUrl: './add-consignator.page.html',
  styleUrls: ['./add-consignator.page.scss'],
})
export class AddConsignatorPage implements OnInit {
  isLoading = true;
  selectedCoin: any;
  addressesList: Address[];
  address: any;
  enableBtn = false;
  isSearch = false;

  constructor(
    private addressesBookService: ContactService,
    private router: Router,
    private storage: Storage,
    private route: ActivatedRoute,
    private wallet: WalletProvider,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private memory: MemoryProvider,
  ) { }

  async ngOnInit() {
    const addressSigner = await this.storage.get('address-signer');
    this.selectedCoin = addressSigner.selectedCoin;
  }

  async onSearchAddress(event: any) {
    this.address = event.target.value;
    this.isSearch = true;
    this.enableBtn = this.wallet.checkValidAddress(this.address, this.selectedCoin);
  }

  chooseAddress() {
    this.modalCtrl
      .create({
        component: SelectAddressModalComponent,
        cssClass: 'height-eightyfive-modal',
        componentProps: {
          selectedWallet: {walletType: this.selectedCoin},
        },
      })
      .then((modal) => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then((modalData) => {
        if (modalData.role === 'confirm') {
          this.address = modalData.data;
          this.enableBtn = this.wallet.checkValidAddress(this.address, this.selectedCoin);
        }
      });
  }

  add() {
    this.memory.setData({data: {address: this.address}});
    this.navCtrl.back();
  }

  navToDetail(add) {
    this.enableBtn = true;
    this.address = add;
    // this.router.navigate(['/tabnav','wallets', 'add-signer', address], { relativeTo: this.route });
  }
}
