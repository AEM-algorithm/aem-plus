import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ModalController, Platform } from '@ionic/angular';

import { Wallet } from 'src/app/services/models/wallet.model';
import { Token } from 'src/app/services/models/token.model';
import { WalletsService } from 'src/app/services/wallets/wallets.service';
import { WalletProvider } from 'src/app/services/wallets/wallet.provider';
import { SymbolProvider } from '@app/services/symbol/symbol.provider';
import {
  FeesConfig,
  PrepareTransaction,
  SymbolTransactionProvider
} from '@app/services/symbol/symbol.transaction.provider';
import { LoadingProvider } from '@app/services/loading/loading.provider';
import { ToastProvider } from '@app/services/toast/toast.provider';

import { ConfirmTransactionModalComponent } from './confirm-transaction-modal/confirm-transaction-modal.component';
import { SelectAddressModalComponent } from './select-address-modal/select-address-modal.component';

import { WALLET_ICON } from 'src/app/constants/constants';

import {
  Address as SymbolAddress,
  IListener as SymbolIListener,
  NetworkConfiguration as SymbolNetworkConfiguration,
  NetworkCurrencies as SymbolNetworkCurrencies,
  RepositoryFactoryHttp as SymbolRepositoryFactoryHttp,
  SimpleWallet as SymbolSimpleWallet,
  TransactionFees as SymbolTransactionFees,
  TransactionType,
  TransferTransaction as SymbolTransferTransaction,
} from 'symbol-sdk';
import { environment } from '@environments/environment';
import { Coin } from '@app/enums/enums';

@Component({
  selector: 'app-send',
  templateUrl: './send.page.html',
  styleUrls: ['./send.page.scss'],
})
export class SendPage implements OnInit {
  isSelectedToken = false;
  selectedWallet: Wallet;
  selectedToken: Token;
  selectedWalletType: string;
  selectedWalletCurrency;

  cryptoBalance: number = 0;
  currencyBalance: number = 0;
  selectedMosaic: any;

  //  --- form & form inputs:
  sendForm: FormGroup;
  amountCurrency: number;
  amountCrypto: number;
  amount: number;
  receiverName: string;

  // ---- form error handling:
  isAmountValid = true;
  amountErr: string;
  isAddressValid = true;

  //  --- others:
  tax: number;
  ABNNum: number;
  businessName: string;

  // --- fee adjustment:
  suggestedFeeCurrency: number = 0.0;
  maxFeeCurrency: number;
  minFeeCurrency: number;
  isTooLow = false;
  isTooHigh = false;
  selectedFeeCurrency: number;
  selectedFeeCrypto: number;
  rangeValue: number;
  rangeMaxFees: {};

  walletIcon = WALLET_ICON;

  symbolNetworkConfig: SymbolNetworkConfiguration;
  symbolTransactionFees: SymbolTransactionFees;
  symbolNetworkCurrencies: SymbolNetworkCurrencies;
  symbolRepositoryFactory: SymbolRepositoryFactoryHttp;
  symbolListener: SymbolIListener;
  symbolEpochAdjustment: number;

  constructor(
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private walletsService: WalletsService,
    private walletProvider: WalletProvider,
    private platform: Platform,
    private symbol: SymbolProvider,
    private router: Router,
    private symbolTransaction: SymbolTransactionProvider,
    private loading: LoadingProvider,
    private toast: ToastProvider,
  ) {
    this.selectedWallet = new Wallet(
      '',
      '',
      '',
      null,
      '',
      [],
      null,
      [],
      '',
      '',
      [],
    );
  }

  ngOnInit() {
    this.route.paramMap.subscribe(async (params) => {
      await this.loading.presentLoading();
      const walletId = params.get('walletId');

      const state = this.router.getCurrentNavigation()?.extras?.state;
      this.selectedMosaic = state?.selectMosaic;

      await this.initWallet(walletId);

      if (params.has('tokenId')) {
        const tokenId = params.get('tokenId');
        this.initWalletToken(tokenId);
      }

      if (this.selectedWallet.walletType === Coin.NEM) {
        await this.initializeNem();
      }

      if (this.selectedWallet.walletType === Coin.SYMBOL) {
        await this.initializeSymbol();
      }
      await this.loading.dismissLoading();
    });

    this.formInit();
  }

  ionViewWillEnter() {
    // TODO
    const qrCodeData = undefined;
    const data = qrCodeData?.data;
    if (data) {
      const address = data.address;
      const amountCurrency = data.amountCurrency;
      const amountCrypto = data.amountCrypto;
      const selectedTax = data.selectedTax;
      const name = data.name;
      const msg = data.msg;
      const userInfo = data.userInfo;
    }
  }

  async initWallet(walletId: string) {
    this.selectedWallet = await this.walletProvider.getWalletByWalletId(walletId, false);
    this.cryptoBalance = this.selectedWallet.walletBalance[1];
    this.currencyBalance = this.selectedWallet.walletBalance[0];

    this.selectedWalletCurrency = this.selectedWallet.currency;
    this.selectedWalletType =  this.selectedWallet.walletType;
  }

  initWalletToken(tokenId: string) {
    this.isSelectedToken = true;
    this.selectedToken = this.walletsService.getToken(this.selectedWallet, tokenId);

    this.cryptoBalance = this.selectedToken.balance[1];
    this.currencyBalance = this.selectedToken.balance[0];

    this.selectedWalletType = this.selectedToken.name;
  }

  // TODO: DEVELOPER
  listenSymbolBlockEvent(rawAddress: string) {
    this.symbolRepositoryFactory = new SymbolRepositoryFactoryHttp(environment.SYMBOL_NODE_DEFAULT, {
      websocketInjected: WebSocket,
      websocketUrl: 'ws://ngl-dual-601.testnet.symboldev.network:3000/ws'
    });

    if (this.symbolListener) {
      this.symbolListener.close();
    }
    this.symbolListener = this.symbolRepositoryFactory.createListener();
    const symbolAddress = SymbolAddress.createFromRawAddress(rawAddress);
    this.symbolListener = this.symbolRepositoryFactory.createListener();
    this.symbolListener.open((event) => {
      console.log('event', event);
    }).then(() => {
      this.symbolListener.status(symbolAddress).subscribe((error) => {
        console.log('listenEvent status error', error);
      });
      this.symbolListener.newBlock().subscribe((block) => {
        console.log('listenEvent newBlock', block);
      });
      this.symbolListener.unconfirmedAdded(symbolAddress, undefined, false).subscribe((res) => {
        console.log('listenEvent unconfirmedAdded', res);
      });
      this.symbolListener.confirmed(symbolAddress, undefined, false).subscribe((res) => {
        console.log('listenEvent confirmed', res);
      });
      this.symbolListener.unconfirmedRemoved(symbolAddress).subscribe(res => {
        console.log('listenEvent unconfirmedRemoved', res);
      });
    });
  }

  private formInit() {
    this.sendForm = new FormGroup({
      receiverAddress: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required),
      description: new FormControl(null), // optional
    });
  }

  private async initializeNem() {
    console.log('initializeNem');
  }

  private async initializeSymbol() {
    this.symbolNetworkConfig = await this.symbol.getNetworkConfig();
    this.symbolTransactionFees = await this.symbol.getTransactionFees();
    this.symbolNetworkCurrencies = await this.symbol.repositoryFactory.getCurrencies().toPromise();
    this.symbolEpochAdjustment = await this.symbol.repositoryFactory.getEpochAdjustment().toPromise();
  }

  onSelectType(e: any) {
    this.selectedWalletCurrency = e.detail.value;
    if (this.isFormValid()) {
      this.onEnterAmount({});
    }
  }

  private checkAmountValidation(enteredAmount: number, maxAmount: number) {
    if (enteredAmount > maxAmount) {
      this.isAmountValid = false;
      this.amountErr = `Available balance is not larger than ${maxAmount}`;
      return;
    }
    this.isAmountValid = true;
  }

  onEnterAmount(e: any) {
    if (this.isFormValid() === false) {
      this.isAddressValid = false;
      return;
    }
    this.isAddressValid = true;

    const enteredAmount = e?.target?.value || '';
    this.amount = enteredAmount;

    if (this.isSelectedToken) {
      this.amountCurrency = 0;
      this.amountCrypto = this.amount;
    } else {
      if (this.selectedWalletCurrency === this.selectedWallet.currency) {
        this.checkAmountValidation(this.amount, this.currencyBalance);
        this.amountCurrency = this.amount;
        this.amountCrypto = this.amount / this.selectedWallet.exchangeRate;
      } else {
        this.checkAmountValidation(this.amount, this.cryptoBalance);
        this.amountCrypto = this.amount;
        this.amountCurrency = this.amount * this.selectedWallet.exchangeRate;
      }
    }

    // TODO: calculate tax.
    this.tax = (this.amountCurrency * 0.1) / (1 + 0.1);

    this.updateFee();
  }

  showAddressList() {
    // TODO showAddressList
    this.modalCtrl
      .create({
        component: SelectAddressModalComponent,
        cssClass: 'height-eightyfive-modal',
        componentProps: {
          selectedWalletType: this.selectedWallet.walletType,
        },
      })
      .then((modal) => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then((modalData) => {
        if (modalData.role === 'confirm') {
          // get the data from the "select address modal"
          this.sendForm.get('receiverAddress').setValue(modalData.data.address);
          this.receiverName = modalData.data.holderName;
          this.ABNNum = modalData.data.ABNNum;
          this.businessName = modalData.data.businessName;
        }
      });
  }

  onEnterAddress(e: any) {
    this.updateFee();
  }

  onEditFee() {
    console.log('editing fee...');
  }

  onDescriptionChange(e) {
    this.updateFee();
  }

  isFormValid() {
    const receiverAddress = this.sendForm.value.receiverAddress;
    if (!receiverAddress) {
      return false;
    }
    if (this.selectedWallet.walletType === Coin.SYMBOL) {
      return SymbolAddress.isValidRawAddress(receiverAddress);
    }
    return true;
  }

  async updateFee() {
    if (!this.isFormValid()) {
      return;
    }
    if (this.isAddressValid === false) {
      this.amount = null;
    }

    const fees = await this.updateMaxFee();
    console.log(fees); // TODO remove log.

    this.suggestedFeeCurrency = fees.normal;
    this.maxFeeCurrency = fees.fast;
    this.minFeeCurrency = fees.slow;

    this.updateSelectFee(this.rangeValue);
  }

  onSelectFee(e: any) {
    this.updateSelectFee(e.target.value);
  }

  updateSelectFee(range) {
    setTimeout(() => {
      this.rangeValue = range ? range : 2;
      this.selectedFeeCrypto = this.getRangeFee(range);
      this.selectedFeeCurrency = this.getRangeFee(range) * this.selectedWallet.exchangeRate;
    }, 300);
  }

  getRangeFee(range) {
    return {
      1: this.minFeeCurrency,
      2: this.suggestedFeeCurrency,
      3: this.maxFeeCurrency,
    }[range];
  }

  async updateMaxFee(): Promise<FeesConfig> {
    if (this.selectedWallet.walletType === Coin.SYMBOL) {
      const rangeMaxFees = {};
      const maxFees = await Promise.all(
        Object.keys(this.symbolTransaction.defaultFeesConfig).map(async (key, index) => {
          const txs = this.prepareTransaction(this.symbolTransaction.defaultFeesConfig[key]);
          const amount = this.symbolTransaction.getMaxFee(
            txs,
            this.symbolNetworkConfig,
            this.symbolTransactionFees,
            this.symbolNetworkCurrencies,
            this.symbolEpochAdjustment
          );
          rangeMaxFees[index + 1] = amount;

          return [key, this.symbolTransaction.resolveAmount(amount, 6)];
        })
      );
      this.rangeMaxFees = rangeMaxFees;
      return this.fromEntries(maxFees);
    }

    if (this.selectedWallet.walletType === Coin.NEM) {
      // TODO
      return {
        slow: 0,
        normal: 1,
        fast: 2,
      };
    }

    if (this.selectedWallet.walletType === Coin.BITCOIN) {
      // TODO
      return {
        slow: 0,
        normal: 1,
        fast: 2,
      };
    }
  }

  prepareTransaction = (fee) => {
    if (this.selectedWallet.walletType === Coin.SYMBOL) {
      this.selectedMosaic.mosaic.amount = this.amountCrypto * Math.pow(10, this.selectedMosaic.info.divisibility);
      return {
        recipientAddress: this.sendForm.value.receiverAddress,
        mosaics: [this.selectedMosaic.mosaic],
        message: this.sendForm.value.description,
        fee,
      };
    }

    if (this.selectedWallet.walletType === Coin.NEM) {
      console.log('prepareTransaction', 'NEM');
      return {};
    }

    if (this.selectedWallet.walletType === Coin.BITCOIN) {
      console.log('prepareTransaction', 'BITCOIN');
      return {};
    }
  }

  fromEntries(entries) {
    return entries.reduce(
      (acc, [key, value]) => ({ ...acc, [key]: value }),
      {}
    );
  }

  onSend() {
    this.modalCtrl
      .create({
        component: ConfirmTransactionModalComponent,
        componentProps: {
          walletType: this.selectedWallet.walletType,
          walletId: this.selectedWallet.walletId,
        },
        cssClass: 'send-confirm-modal ',
      })
      .then(async (modalEl) => {
        await modalEl.present();
        const response = await modalEl.onDidDismiss();
        if (response.data?.pin) {
          await this.onConfirmSend(response.data.pin);
        }
      });
  }

  async onConfirmSend(pin: string) {
    if (!await this.walletProvider.isValidPin(pin)) return null;
    const hashPassword = this.walletProvider.getPasswordHashFromPin(pin);
    const isValidPin = await this.walletProvider.isValidPin(pin);
    if (isValidPin) {
      const prepareTransaction: PrepareTransaction = {
        type: TransactionType.TRANSFER,
        recipientAddress: this.sendForm.value.receiverAddress,
        messageText: this.sendForm.value.description,
        mosaics: [this.selectedMosaic.mosaic],
        fee: this.rangeMaxFees[this.rangeValue],
      };

      if (this.selectedWallet.walletType === Coin.SYMBOL) {
        const simpleWallet = await this.getSymbolSimpleWallet();

        const transferTxs = this.symbolTransaction.prepareTransferTransaction(
          prepareTransaction,
          this.symbolNetworkCurrencies,
          this.symbolEpochAdjustment
        );
        return await this.symbol.confirmTransaction(
          transferTxs as SymbolTransferTransaction,
          simpleWallet,
          hashPassword,
          this.symbolNetworkConfig
        );
      }

      if (this.selectedWallet.walletType === Coin.NEM) {
        // TODO
        console.log('onConfirmSend', 'NEM');
      }

      if (this.selectedWallet.walletType === Coin.BITCOIN) {
        // TODO
        console.log('onConfirmSend', 'BITCOIN');
      }
    }
  }

  async getSymbolSimpleWallet(): Promise<SymbolSimpleWallet> {
    const wallets = await this.walletProvider.getSymbolWallets(true);
    const wallet = wallets.find(wlt => wlt.walletId === this.selectedWallet.walletId);
    return SymbolSimpleWallet.createFromDTO(wallet.simpleWallet);
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  walletScanOnClick() {
    this.router.navigateByUrl('/qr-code-scan');
  }
}
