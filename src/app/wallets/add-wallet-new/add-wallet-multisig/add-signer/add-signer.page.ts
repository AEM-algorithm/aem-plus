import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Subscription } from 'rxjs';

import { MemoryProvider } from '@app/services/memory/memory.provider';

@Component({
  selector: 'app-add-signer',
  templateUrl: './add-signer.page.html',
  styleUrls: ['./add-signer.page.scss'],
})
export class AddSignerPage implements OnInit, OnDestroy {
  isLoading = true;
  addressesList = [];
  showList = false;
  enableBtn = false;

  routeSubscribe: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private storage: Storage,
    private memory: MemoryProvider,
  ) { }

  async ngOnInit() {
    this.routeSubscribe = this.route.paramMap.subscribe( async (_) => {
      await this.observeConsignorData();
    });
  }

  async observeConsignorData() {
    if (!this.memory.hasData()) {
      return;
    }
    const addressSigners = await this.storage.get('address-signer');
    this.addressesList = addressSigners?.['address-signer'] ? addressSigners['address-signer'] : this.addressesList;

    const data = this.memory.getData();
    if (data.data?.address) {
      this.addressesList.push(data.data.address);
      addressSigners['address-signer'] = this.addressesList;
      await this.storage.set('address-signer', addressSigners);
    }
    if (this.addressesList.length > 0) {
      this.showList = true;
      this.enableBtn = true;
    }
    this.memory.setResetData();
  }

  ngOnDestroy() {
    this.routeSubscribe.unsubscribe();
  }

  addSigner() {
    this.router.navigateByUrl('/tabnav/wallets/add-wallet-new/add-wallet-multisig/add-signer/add-consignator');
  }

  save() {
    this.router.navigateByUrl('/tabnav/wallets');
  }
}
