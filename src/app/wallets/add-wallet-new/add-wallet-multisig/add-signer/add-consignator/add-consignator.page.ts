import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ModalController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

import { WalletProvider } from '@app/services/wallets/wallet.provider';
import { SymbolProvider } from '@app/services/symbol/symbol.provider';
import { SelectAddressModalComponent } from '@app/wallets/send/select-address-modal/select-address-modal.component';
import { Address } from '@app/services/models/address.modal';
import { ContactService } from '@app/services/contact/contact.service';
import { MemoryProvider } from '@app/services/memory/memory.provider';
import { Coin } from '@app/enums/enums';
import { BitcoinProvider } from '@app/services/bitcoin/bitcoin.provider';

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

  cosignaturePublicKey: string;

  constructor(
    private addressesBookService: ContactService,
    private router: Router,
    private storage: Storage,
    private route: ActivatedRoute,
    private wallet: WalletProvider,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private memory: MemoryProvider,
    private symbol: SymbolProvider,
    private bitcoin: BitcoinProvider
  ) {}

  async ngOnInit() {
    const addressSigner = await this.storage.get('address-signer');
    this.selectedCoin = addressSigner.selectedCoin;
  }

  async onSearchAddress(event: any) {
    this.address = event.target.value;
    this.isSearch = true;
    this.enableBtn = await this.checkValidCosinaturyAccount();
  }

  chooseAddress() {
    this.modalCtrl
      .create({
        component: SelectAddressModalComponent,
        cssClass: 'height-eightyfive-modal',
        componentProps: {
          selectedWallet: { walletType: this.selectedCoin },
        },
      })
      .then((modal) => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then(async (modalData) => {
        if (modalData.role === 'confirm') {
          this.address = modalData.data;
          this.enableBtn = await this.checkValidCosinaturyAccount();
        }
      });
  }

  add() {
    this.memory.setData({
      data: { address: this.address, publicKey: this.cosignaturePublicKey },
    });
    this.navCtrl.back();
  }

  navToDetail(add) {
    this.enableBtn = true;
    this.address = add;
    // this.router.navigate(['/tabnav','wallets', 'add-signer', address], { relativeTo: this.route });
  }

  private async getAccountPublicKey(): Promise<string> {
    let result: string;
    switch (this.selectedCoin) {
      case Coin.NEM:
        const walletData = await this.wallet.checkAccountNetworkData(
          this.address,
          Coin.NEM
        );
        result = !!walletData?.account?.publicKey
          ? walletData.account.publicKey
          : null;
        break;
      case Coin.SYMBOL:
        const accountInfo = await this.symbol.getAccountInfo(this.address);
        if (accountInfo) {
          result = accountInfo.publicKey;
        }
        break;
      case Coin.BITCOIN:
        result = this.bitcoin.isValidPublicKey(this.address);
        break;
      default:
        break;
    }
    return result;
  }

  private async checkValidCosinaturyAccount(): Promise<boolean> {
    if (
      !this.wallet.checkValidAddress(this.address, this.selectedCoin) &&
      this.selectedCoin != Coin.BITCOIN
    )
      return false;
    this.cosignaturePublicKey = await this.getAccountPublicKey();
    if (!this.cosignaturePublicKey) {
      // TODO: Show wallet has not send any tx yet
      return false;
    }
    return true;
  }
}
