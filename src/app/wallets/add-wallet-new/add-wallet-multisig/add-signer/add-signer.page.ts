import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from '../../../../services/models/address.modal';
import { Storage } from "@ionic/storage";
import { async } from '@angular/core/testing';
import { WalletProvider } from 'src/app/services/wallets/wallet.provider';
@Component({
  selector: 'app-add-signer',
  templateUrl: './add-signer.page.html',
  styleUrls: ['./add-signer.page.scss'],
})
export class AddSignerPage implements OnInit {
  isLoading = true;
  addressesList = [];
  showList = false;
  enableBtn = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private storage: Storage,
  ) { }

  async ngOnInit() {
    const addressSigners = await this.storage.get("address-signer");
    if (addressSigners && addressSigners.signer) {
      this.addressesList = addressSigners.signer;
      this.showList = true;
      this.enableBtn = true;
    }
    this.route.paramMap.subscribe((params) => {
      let paramAddress = params.get('id');
      if (paramAddress) {
        this.addressesList.push(paramAddress);
        addressSigners['address-signer'] = this.addressesList
        this.storage.set("address-signer", addressSigners);
        this.showList = true;
        this.enableBtn = true;
      }
    })



  }
  addSigner() {
    // this.router.navigateByUrl('/tabnav/wallets/add-consignator');
    this.router.navigateByUrl('/tabnav/wallets/add-wallet-new/add-wallet-multisig/add-signer/add-consignator');
  }

  save() {
    this.router.navigateByUrl('/tabnav/wallets')
  }
}
