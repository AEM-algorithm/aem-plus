import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ModalController, NavController } from '@ionic/angular';

import { AlertProvider } from 'src/app/services/alert/alert.provider';
import { PinProvider } from 'src/app/services/pin/pin.provider';
import { WalletProvider } from 'src/app/services/wallets/wallet.provider';
import { BitcoinProvider } from 'src/app/services/bitcoin/bitcoin.provider';
import { NemProvider } from 'src/app/services/nem/nem.provider';
import { SymbolProvider } from 'src/app/services/symbol/symbol.provider';

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
    SYMBOL: {
      hidden: false,
    }
  };

  constructor(
    private modalCtrl: ModalController,
    private pin: PinProvider,
    public wallet: WalletProvider,
    private router: Router,
    private alertProvider: AlertProvider,
    private navCtrl: NavController,
    public bitcoin: BitcoinProvider,
    public nem: NemProvider,
    public symbol: SymbolProvider,
    private formBuilder: FormBuilder,
  )
  { }

  ngOnInit() {
    this.initWallet();
    this.initFormBuilder();
  }

  initWallet() {
    this.wallet.getBitcoinWallet().then(wallet => {
      if (!!wallet) {
        this.chains.BTC.hidden = true;
      }
    });
    this.wallet.getNemWallet().then(wallet => {
      if (!!wallet) {
        this.chains.NEM.hidden = true;
      }
    });
    this.wallet.getSymbolWallet().then(wallet => {
      if (!!wallet) {
        this.chains.SYMBOL.hidden = true;
      }
    });
  }

  initFormBuilder() {
    this.credentials = this.formBuilder.group({
      bitcoinPrivateKey: ['', []],
      nemPrivateKey: ['', []],
      symbolPrivateKey: ['', []],
    });
  }

  isValidPrivateKey() {
    const bitcoinCondition = this.getBitcoinPrivateKey()
      && !this.getNemPrivateKey()
      && !this.getNemPrivateKey()
      && this.bitcoin.isValidPrivateKey(this.getBitcoinPrivateKey());

    const nemCondition = this.getNemPrivateKey()
      && !this.getBitcoinPrivateKey()
      && !this.getSymbolPrivateKey()
      && this.nem.isValidPrivateKey(this.getNemPrivateKey());

    const symbolCondition = this.getSymbolPrivateKey()
      && !this.getBitcoinPrivateKey()
      && !this.getNemPrivateKey()
      && this.symbol.isValidPrivateKey(this.getSymbolPrivateKey());

    if (bitcoinCondition || nemCondition || symbolCondition) {
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
    if (!this.chains.BTC.hidden && !this.chains.NEM.hidden && !this.chains.SYMBOL.hidden) {
      pin = await this.pin.showDoublePinCheck();
    }
    else {
      pin = await this.pin.showEnterPin();
      const valid = await this.wallet.isValidPin(pin);
      if (!valid) {
        this.alertProvider.showInvalidPasswordAlert();
        return false;
      }
    }

    if (!pin) {
      return;
    }

    if (this.getBitcoinPrivateKey()) {
      await this.wallet.generateBitcoinWalletFromPrivateKey(this.getBitcoinPrivateKey(), pin);
    }
    if (this.getNemPrivateKey()) {
      await this.wallet.generateNemWalletFromPrivateKey(this.getNemPrivateKey(), pin);
    }
    if (this.getSymbolPrivateKey()) {
      await this.wallet.generateSymbolWalletFromPrivateKey(this.getSymbolPrivateKey(), pin);
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
