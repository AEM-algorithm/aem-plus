import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ModalController, NavController } from '@ionic/angular';

import { AlertProvider } from 'src/app/services/alert/alert.provider';
import { PinProvider } from 'src/app/services/pin/pin.provider';
import { WalletProvider } from 'src/app/services/wallets/wallet.provider';
import { BitcoinProvider } from 'src/app/services/bitcoin/bitcoin.provider';
import { NemProvider } from 'src/app/services/nem/nem.provider';
import { SymbolProvider } from 'src/app/services/symbol/symbol.provider';
import { WALLET_ICON } from '@app/constants/constants';
import { Coin } from 'src/app/enums/enums';
import { EthersProvider } from '@app/services/ethers/ethers.provider';

@Component({
  selector: 'app-by-private-key',
  templateUrl: './by-private-key.page.html',
  styleUrls: ['./by-private-key.page.scss'],
})
export class ByPrivateKeyPage implements OnInit {
  public walletIcon = WALLET_ICON;
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
    },
    ETH: {
      hidden: false,
    },
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
    public ethers: EthersProvider,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.initWallet();
    this.initFormBuilder();
  }

  initWallet() {
    this.wallet.getNemWallets(true).then((wallet) => {
      if (wallet.length > 0) {
        this.chains.NEM.hidden = true;
      }
    });
    this.wallet.getSymbolWallets(true).then((wallet) => {
      if (wallet.length > 0) {
        this.chains.SYMBOL.hidden = true;
      }
    });
    this.wallet.getBitcoinWallets(true).then((wallet) => {
      if (wallet.length > 0) {
        this.chains.BTC.hidden = true;
      }
    });
    this.wallet.getETHWallets(true).then((wallet) => {
      if (wallet.length > 0) {
        this.chains.ETH.hidden = true;
      }
    });
  }

  initFormBuilder() {
    this.credentials = this.formBuilder.group({
      bitcoinPrivateKey: ['', []],
      nemPrivateKey: ['', []],
      symbolPrivateKey: ['', []],
      ethPrivateKey: ['', []],
    });
  }

  isValidPrivateKey() {
    const bitcoinCondition =
      this.getBitcoinPrivateKey() &&
      !this.getNemPrivateKey() &&
      !this.getSymbolPrivateKey() &&
      !this.getETHPrivateKey() &&
      this.bitcoin.isValidPrivateKey(this.getBitcoinPrivateKey());

    const nemCondition =
      this.getNemPrivateKey() &&
      !this.getBitcoinPrivateKey() &&
      !this.getSymbolPrivateKey() &&
      !this.getETHPrivateKey() &&
      this.nem.isValidPrivateKey(this.getNemPrivateKey());

    const symbolCondition =
      this.getSymbolPrivateKey() &&
      !this.getBitcoinPrivateKey() &&
      !this.getNemPrivateKey() &&
      !this.getETHPrivateKey() &&
      this.symbol.isValidPrivateKey(this.getSymbolPrivateKey());

    const ethCondition =
      this.getETHPrivateKey() &&
      !this.getSymbolPrivateKey() &&
      !this.getBitcoinPrivateKey() &&
      !this.getNemPrivateKey() &&
      this.ethers.isValidPrivateKey(this.getETHPrivateKey());

    if (bitcoinCondition || nemCondition || symbolCondition || ethCondition) {
      return false;
    }
    return true;
  }

  handleImportSubmit() {
    this.importPrivateKeys();
  }

  public backPage() {
    if (this.isModal) {
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
    if (
      !this.chains.BTC.hidden &&
      !this.chains.NEM.hidden &&
      !this.chains.SYMBOL.hidden &&
      !this.chains.ETH.hidden
  ) {
      pin = await this.pin.showDoublePinCheck(false);
    } else {
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

    if (this.getNemPrivateKey()) {
      await this.wallet.generateWalletFromPrivateKey(
        this.getNemPrivateKey(),
        pin,
        Coin.NEM
      );
    }
    if (this.getSymbolPrivateKey()) {
      await this.wallet.generateWalletFromPrivateKey(
        this.getSymbolPrivateKey(),
        pin,
        Coin.SYMBOL
      );
    }
    if (this.getBitcoinPrivateKey()) {
      await this.wallet.generateWalletFromPrivateKey(
        this.getBitcoinPrivateKey(),
        pin,
        Coin.BITCOIN
      );
    }

    if (this.getETHPrivateKey()) {
      await this.wallet.generateWalletFromPrivateKey(
        this.getETHPrivateKey(),
        pin,
        Coin.ETH,
      );
    }

    if (this.isModal) {
      this.modalCtrl.dismiss();
    } else {
      this.navCtrl.navigateRoot('/login');
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

  getETHPrivateKey() {
    return this.credentials.value.ethPrivateKey;
  }
}
