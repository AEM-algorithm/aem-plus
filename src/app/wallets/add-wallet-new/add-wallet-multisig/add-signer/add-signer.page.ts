import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Subscription } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

import { MemoryProvider } from '@app/services/memory/memory.provider';
import { WalletProvider } from 'src/app/services/wallets/wallet.provider';
import { LoadingProvider } from '@app/services/loading/loading.provider';
import { ToastProvider } from '@app/services/toast/toast.provider';
import { SymbolProvider } from '@app/services/symbol/symbol.provider';
import { SymbolTransactionProvider } from '@app/services/symbol/symbol.transaction.provider';
import { Address as SymbolAddress } from 'symbol-sdk';

import { PinModalComponent } from 'src/app/pin-modal/pin-modal.component';

import { Coin } from '@app/enums/enums';
import { NemProvider } from '@app/services/nem/nem.provider';
import {
  SimpleWallet as NemSimpleWallet,
  Password as NemPassword,
} from 'nem-library';
import { BitcoinProvider } from '@app/services/bitcoin/bitcoin.provider';

@Component({
  selector: 'app-add-signer',
  templateUrl: './add-signer.page.html',
  styleUrls: ['./add-signer.page.scss'],
})
export class AddSignerPage implements OnInit, OnDestroy {
  isLoading = true;
  addressesList = [];
  cosignatureAccounts = [];
  showList = false;
  enableBtn = false;

  selectedCoin: Coin;
  multisigWalletName: string;

  routeSubscribe: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private storage: Storage,
    private memory: MemoryProvider,
    private wallet: WalletProvider,
    private nem: NemProvider,
    private loading: LoadingProvider,
    private modal: ModalController,
    private translate: TranslateService,
    private toast: ToastProvider,
    private symbol: SymbolProvider,
    private symbolTxs: SymbolTransactionProvider,
    private bitcoin: BitcoinProvider
  ) {}

  async ngOnInit() {
    this.routeSubscribe = this.route.paramMap.subscribe(async (_) => {
      await this.observeConsignorData();
    });
  }

  async observeConsignorData() {
    const encryptedPin = await this.storage.get('pin');
    const addressSigners = await this.storage.get('address-signer');
    this.multisigWalletName = addressSigners?.name;
    this.selectedCoin = addressSigners?.selectedCoin;

    if (!this.multisigWalletName || !this.selectedCoin)
      throw new Error('Unable to load multisig account data');
    this.cosignatureAccounts = addressSigners?.['address-signer']
      ? addressSigners['address-signer']
      : this.cosignatureAccounts;

    const data = this.memory.getData();
    if (data.data?.address && data.data?.publicKey) {
      this.cosignatureAccounts.push({
        address: data.data.address,
        publicKey: data.data.publicKey,
      });
      addressSigners['address-signer'] = this.cosignatureAccounts;
      await this.storage.set('address-signer', addressSigners);
    }
    if (this.cosignatureAccounts.length > 0) {
      this.addressesList = this.cosignatureAccounts.map(
        (account) => account.address
      );
      this.showList = true;
      this.enableBtn = true;
    }
    this.memory.setResetData();
  }

  ngOnDestroy() {
    this.routeSubscribe.unsubscribe();
  }

  addSigner() {
    this.router.navigateByUrl(
      '/tabnav/wallets/add-wallet-new/add-wallet-multisig/add-signer/add-consignator'
    );
  }

  async save() {
    const pin = await this.verifyPinCode();
    if (!pin) {
      return;
    }
    // await this.loading.presentLoading();
    try {
      const multisigWalletPrivateKey = await this.getPrivateKeyTemp();
      const passwordHash = this.wallet.getPasswordHashFromPin(pin);
      // TODO: announce create multisig account transaction
      const result = await this.annountMultisigAccountTransaction(
        passwordHash,
        multisigWalletPrivateKey
      );
      console.log('annountMultisigAccountTransaction', result);
      const cosignaturePublicKeys = this.cosignatureAccounts.map(
        (cosignaturePublicKey) => cosignaturePublicKey.publicKey
      );
      await this.wallet.generateWalletFromPrivateKey(
        multisigWalletPrivateKey,
        pin,
        this.selectedCoin,
        this.multisigWalletName,
        true,
        cosignaturePublicKeys
      );
    } catch (error) {
      console.log(error);
    }
    // await this.loading.dismissLoading();
    // this.router.navigateByUrl('/tabnav/wallets');
  }

  private async annountMultisigAccountTransaction(
    password: string,
    multisigWalletPrivateKey: string
  ) {
    switch (this.selectedCoin) {
      case Coin.NEM:
        const cosignaturePublicKeys = this.cosignatureAccounts.map(
          (cosignaturePublicKey) => cosignaturePublicKey.publicKey
        );
        const prepareMultisigTx = this.nem.prepareMultisigTransaction(
          cosignaturePublicKeys
        );
        const nemSimpleWallet = NemSimpleWallet.createWithPrivateKey(
          'nem',
          new NemPassword(password),
          multisigWalletPrivateKey
        );
        setTimeout(async () => {
          try {
            const confirmTxs = await this.nem.confirmTransaction(
              prepareMultisigTx,
              nemSimpleWallet,
              password
            );
            console.log('confirmTxs', confirmTxs);
          } catch (e) {
            this.errorHandler(e);
          }
          // TODO
        }, 2000);
        break;
      case Coin.SYMBOL:
        const symbolTransactionFees = await this.symbol.getTransactionFees();
        const networkConfig = await this.symbol.getNetworkConfig();
        const networkType = this.symbol.getNetworkType();
        const cosignatoryAddresses = this.cosignatureAccounts.map((value) =>
          SymbolAddress.createFromRawAddress(value.address)
        );

        const {
          signedHashLockTransaction,
          signedTransaction,
        } = this.symbolTxs.prepareMultisigTransaction(
          cosignatoryAddresses,
          multisigWalletPrivateKey,
          symbolTransactionFees,
          networkConfig,
          networkType
        );

        try {
          await this.symbolTxs.announceHashLockAggregateBonded(
            signedHashLockTransaction,
            signedTransaction
          );
        } catch (e) {
          this.errorHandler(e);
        }
        break;
      case Coin.BITCOIN:
        break;
      default:
        break;
    }
  }

  private async errorHandler(error: any) {
    const errorCode = error.message;
    switch (errorCode) {
      case 'FAILURE_INSUFFICIENT_BALANCE': // For NEM
      case 'Error: Failure_Core_Insufficient_Balance': // For Symbol
        const translate = await this.translate
          .get(['ALERT_INSUFFICIENT_BALANCE'], {})
          .toPromise();
        this.toast.showMessageError(translate.ALERT_INSUFFICIENT_BALANCE, 5000);
        break;
      default:
        this.toast.showCatchError(error, 5000);
        break;
    }
  }

  private async verifyPinCode(): Promise<string> {
    const res = await this.translate
      .get(['CONFIRM_SECURITY', 'ALERT_PROVIDED_PIN_INVALID'], {})
      .toPromise();
    const pinModal = await this.modal.create({
      component: PinModalComponent,
      cssClass: 'pinModal',
      componentProps: {
        title: res['CONFIRM_SECURITY'],
      },
    });
    await pinModal.present();
    const pinData = await pinModal.onDidDismiss();
    if (pinData.data.pin) {
      const isValidPin = await this.wallet.isValidPin(pinData.data.pin);
      if (isValidPin) {
        return pinData.data.pin;
      } else {
        this.toast.showMessageError(res['ALERT_PROVIDED_PIN_INVALID']);
      }
    }
    return null;
  }

  private async getPrivateKeyTemp(): Promise<string> {
    const encryptedPin = await this.storage.get('pin');
    const addressSigners = await this.storage.get('address-signer');
    return WalletProvider.decrypt(addressSigners?.privateKey, encryptedPin);
  }
}
