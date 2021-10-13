import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from '../../services/models/address.modal';
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
   await this.storage.get("address-signer").then((data) => {
     if(data){
        this.addressesList = data;
        this.showList = true;
        this.enableBtn = true;
     }
    });
    await this.route.paramMap.subscribe((params) => {
      let paramAddress = params.get('id');
      if (paramAddress) {
        this.addressesList.push(paramAddress);
        this.storage.set("address-signer", this.addressesList);
        this.showList = true;
        this.enableBtn = true;
      }
    })



  }
  addSigner() {
    this.router.navigateByUrl('/tabnav/wallets/add-consignator');
  }

  save() {
    this.router.navigateByUrl('/tabnav/wallets')
  }
}
