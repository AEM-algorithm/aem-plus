import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Subscription } from 'rxjs';

import { MemoryProvider } from '@app/services/memory/memory.provider';

import { WalletProvider } from 'src/app/services/wallets/wallet.provider';
import { LoadingProvider } from '@app/services/loading/loading.provider';
import { Coin } from '@app/enums/enums';
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

  multisigWalletPrivateKey: string;
  selectedCoin: Coin;
  multisigWalletName: string;

  routeSubscribe: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private storage: Storage,
    private memory: MemoryProvider,
    private wallet: WalletProvider,
    private loading: LoadingProvider,
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
    const encryptedPin = await this.storage.get('pin');
    const addressSigners = await this.storage.get('address-signer');
    this.multisigWalletName = addressSigners?.name;
    this.selectedCoin = addressSigners?.selectedCoin;
    this.multisigWalletPrivateKey = addressSigners?.privateKey;

    if (!this.multisigWalletPrivateKey || !this.multisigWalletName || !this.selectedCoin) throw new Error("Unable to load multisig account data");
    this.multisigWalletPrivateKey = WalletProvider.decrypt(addressSigners?.privateKey, encryptedPin);
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
    this.loading.presentLoading();
    try {
      this.wallet.generateWalletFromPrivateKey(this.multisigWalletPrivateKey, "pin", this.selectedCoin, this.multisigWalletName, true);
      // TODO: announce create multisig account transaction
      const result = this.annountMultisigAccountTransaction();

    } catch (error) {
      console.log(error);
    }
    this.loading.dismissLoading();
    this.router.navigateByUrl('/tabnav/wallets');
  }

  private async annountMultisigAccountTransaction() {
    switch (this.selectedCoin) {
      case Coin.NEM:
        break;
      case Coin.SYMBOL:
        break;
      case Coin.BITCOIN:
        break;
      default:
        break;
    }
  }
}
