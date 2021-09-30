import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ModalController, NavController } from '@ionic/angular';

import { AlertProvider } from 'src/app/services/alert/alert.provider';
import { PinProvider } from 'src/app/services/pin/pin.provider';

@Component({
  selector: 'app-by-private-key',
  templateUrl: './by-private-key.page.html',
  styleUrls: ['./by-private-key.page.scss'],
})
export class ByPrivateKeyPage implements OnInit {
  @Input()
  public isModal = false;

  credentials: FormGroup;

  chains = {
    BTC: {
      hidden: false,
    },
    NEM: {
      hidden: false,
    },
    CAT: {
      hidden: false,
    }
  };

  // TODO: add WalletProvider, BitcoinProvider, NemProvider, CatapultProvider
  constructor(
    private modalCtrl: ModalController,
    private pin: PinProvider,
    // public wallet: WalletProvider,
    private router: Router,
    private alertProvider: AlertProvider,
    private navCtrl: NavController,
    // public bitcoin: BitcoinProvider,
    // public nem: NemProvider,
    // public catapult: CatapultProvider,
    private formBuilder: FormBuilder,
  )
  { }

  ngOnInit() {
    this.initWallet();
    this.initFormBuilder();
  }

  initWallet() {
    // TODO: wallet.getBitcoinWallet
    // this.wallet.getBitcoinWallet().then(wallet => {
    //   if (!!wallet) {
    //     this.chains.BTC.hidden = true;
    //   }
    // });
    // TODO: wallet.getNemWallet
    // this.wallet.getNemWallet().then(wallet => {
    //   if (!!wallet) {
    //     this.chains.NEM.hidden = true;
    //   }
    // });
    // TODO: wallet.getCatapultWallet
    // this.wallet.getCatapultWallet().then(wallet => {
    //   if (!!wallet) {
    //     this.chains.CAT.hidden = true;
    //   }
    // });
  }

  initFormBuilder() {
    this.credentials = this.formBuilder.group({
      bitcoinPrivateKey: ['', []],
      nemPrivateKey: ['', []],
      symbolPrivateKey: ['', []],
    });
  }

  isValidPrivateKey() {
    // TODO: check bitcoin.isValidPrivateKey
    const bitcoinCondition = this.getBitcoinPrivateKey()
      && !this.getNemPrivateKey()
      && !this.getNemPrivateKey();
      // && bitcoin.isValidPrivateKey(this.getBitcoinPrivateKey())

    // TODO: check nem.isValidPrivateKey
    const nemCondition = this.getNemPrivateKey()
      && !this.getBitcoinPrivateKey()
      && !this.getSymbolPrivateKey();
      // && nem.isValidPrivateKey(this.getNemPrivateKey());

    // TODO: check catapult.isValidPrivateKey
    const catapultCondition = this.getSymbolPrivateKey()
      && !this.getBitcoinPrivateKey()
      && !this.getNemPrivateKey();
      // && catapult.isValidPrivateKey(this.getSymbolPrivateKey());

    if (bitcoinCondition || nemCondition || catapultCondition) {
      return false;
    }
    return true;
  }

  handleImportSubmit() {
    this.importPrivateKeys();
  }

  public backPage() {
    if (this.isModal){
      this.modalCtrl.dismiss();
    } else {
      this.navCtrl.pop();
    }
  }

  /**
   * Import all private keys
   */
  public async importPrivateKeys() {
    let pin;
    if (!this.chains.BTC.hidden && !this.chains.NEM.hidden && !this.chains.CAT.hidden) {
      pin = await this.pin.showDoublePinCheck();
    }
    else {
      pin = await this.pin.showEnterPin();
      // TODO: check isValidPin.
      // const valid = await this.wallet.isValidPin(pin);
      // if (!valid) {
      //   this.alertProvider.showInvalidPasswordAlert();
      //   return false;
      // }
    }

    if (!pin) {
      return;
    }

    if (this.getBitcoinPrivateKey()) {
      // TODO: generateBitcoinWalletFromPrivateKey
      // await this.wallet.generateBitcoinWalletFromPrivateKey(this.getBitcoinPrivateKey(), pin);
    }
    if (this.getNemPrivateKey()) {
      // TODO: generateNemWalletFromPrivateKey
      // await this.wallet.generateNemWalletFromPrivateKey(this.getNemPrivateKey(), pin);
    }
    if (this.getSymbolPrivateKey()) {
      // TODO: generateCatapultWalletFromPrivateKey
      // await this.wallet.generateCatapultWalletFromPrivateKey(this.getSymbolPrivateKey(), pin);
    }

    if (this.isModal) {
      this.modalCtrl.dismiss();
    } else {
      this.navCtrl.navigateRoot('/tabnav/wallets');
    }
  }

  getBitcoinPrivateKey() {
    return this.credentials.value.bitcoinPrivateKey;
  }

  getNemPrivateKey() {
    return this.credentials.value.nemPrivateKey;
  }

  getSymbolPrivateKey() {
    return this.credentials.value.symbolPrivateKey;
  }

}
