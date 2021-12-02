import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ModalController, Platform } from '@ionic/angular';

import { Wallet } from 'src/app/services/models/wallet.model';
import { Token } from 'src/app/services/models/token.model';
import { Transaction } from 'src/app/services/models/transaction.model';
import { WalletsService } from 'src/app/services/wallets/wallets.service';
import { WalletProvider } from 'src/app/services/wallets/wallet.provider';
import { SymbolProvider } from '@app/services/symbol/symbol.provider';
import { FeesConfig, PrepareTransaction, SymbolTransactionProvider } from '@app/services/symbol/symbol.transaction.provider';
import {LoadingProvider} from '@app/services/loading/loading.provider';
import {ToastProvider} from '@app/services/toast/toast.provider';

import { ConfirmTransactionModalComponent } from './confirm-transaction-modal/confirm-transaction-modal.component';
import { SelectAddressModalComponent } from './select-address-modal/select-address-modal.component';

import { WALLET_ICON } from 'src/app/constants/constants';

import {
  NetworkConfiguration as SymbolNetworkConfiguration,
  TransactionFees as SymbolTransactionFees,
  Address as SymbolAddress,
  SimpleWallet as SymbolSimpleWallet,
  TransferTransaction as SymbolTransferTransaction,
  NetworkCurrencies as SymbolNetworkCurrencies,
  RepositoryFactoryHttp as SymbolRepositoryFactoryHttp,
  IListener as SymbolIListener,
} from 'symbol-sdk';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-send',
  templateUrl: './send.page.html',
  styleUrls: ['./send.page.scss'],
})
export class SendPage implements OnInit {
  isTokenSelected = false; // determine select a walllet or its token
  selectedWallet: Wallet;
  selectedToken: Token;

  cryptoBalance: number;
  currencyBalance: number;
  selectedMosaic: any;

  transformedWalletData: {};

  selectedType;
  //  --- form & form inputs:
  sendForm: FormGroup;
  amountCurrency: number;
  amountCrypto: number;
  amount: number;
  receiverName: string;

  // ---- form error handling:
  isAmountValid = true;
  amountErr: string;

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

    // TODO: DEVELOPER
    this.symbolRepositoryFactory = new SymbolRepositoryFactoryHttp(environment.SYMBOL_NODE_DEFAULT, {
      websocketInjected: WebSocket,
      websocketUrl: 'ws://ngl-dual-601.testnet.symboldev.network:3000/ws'
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(async (params) => {
      const walletId = params.get('walletId');
      const state = this.router.getCurrentNavigation().extras.state;
      this.selectedMosaic = state?.selectMosaic;

      this.selectedWallet = await this.walletProvider.getWalletByWalletId(walletId, false);

      this.cryptoBalance = this.selectedWallet.walletBalance[1];
      this.currencyBalance = this.selectedWallet.walletBalance[0];
      this.transformedWalletData = this.selectedWallet;
      this.selectedType = this.selectedWallet.currency;

      if (params.has('tokenId')) {
        this.isTokenSelected = true;
        this.selectedToken = this.walletsService.getToken(this.selectedWallet, params.get('tokenId'));
        this.cryptoBalance = this.selectedToken.balance[1];
        this.currencyBalance = this.selectedToken.balance[0];
      }

      // TODO: DEVELOPER
      this.listenEvent(this.selectedWallet.walletAddress);
    });

    this.formInit();

    this.initializeSymbol();
  }

  // TODO: DEVELOPER
  listenEvent(rawAddress: string) {
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

  private async initializeSymbol() {
    await this.loading.presentLoading();
    this.symbolNetworkConfig = await this.symbol.getNetworkConfig();
    this.symbolTransactionFees = await this.symbol.getTransactionFees();
    this.symbolNetworkCurrencies = await this.symbol.repositoryFactory.getCurrencies().toPromise();
    this.symbolEpochAdjustment = await this.symbol.repositoryFactory.getEpochAdjustment().toPromise();
    await this.loading.dismissLoading();
  }

  onSelectType(e: any) {
    this.selectedType = e.detail.value;
    this.onEnterAmount({});
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
    const enteredAmount = e?.target?.value || '';
    this.amount = enteredAmount;

    if (this.selectedType === this.selectedWallet.currency) {
      this.checkAmountValidation(this.amount, this.currencyBalance);
      this.amountCurrency = this.amount;
      this.amountCrypto = this.amount / this.selectedWallet.exchangeRate; // mock the calculation
    } else {
      this.checkAmountValidation(this.amount, this.cryptoBalance);
      this.amountCrypto = this.amount;
      this.amountCurrency = this.amount * this.selectedWallet.exchangeRate;
    }

    // TODO: calculate tax.
    this.tax = (this.amountCurrency * 0.1) / (1 + 0.1);

    this.updateFee();
  }

  showAddressList() {
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
    if (!SymbolAddress.isValidRawAddress(receiverAddress)) {
      return false;
    }
    return true;
  }

  async updateFee() {
    if (!this.isFormValid()) {
      return;
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

  prepareTransaction = (fee) => {
    this.selectedMosaic.mosaic.amount = this.amountCrypto * Math.pow(10, this.selectedMosaic.info.divisibility);
    return {
      recipientAddress: this.sendForm.value.receiverAddress,
      mosaics: [this.selectedMosaic.mosaic],
      message: this.sendForm.value.description,
      fee,
    };
  }

  fromEntries(entries) {
    return entries.reduce(
      (acc, [key, value]) => ({ ...acc, [key]: value }),
      {}
    );
  }

  onSend() {
    const tokenId = this.isTokenSelected ? this.selectedToken.id : null;

    // 1. re-structure the form data to a transaction object:
    const transId = Math.random().toFixed(8);
    const newTransaction: Transaction = {
      transId,
      time: new Date().getTime(),
      incoming: false,
      address: this.selectedWallet.walletAddress,
      feeCrypto: this.selectedFeeCrypto,
      feeAud: this.selectedFeeCurrency,
      amount: this.amountCrypto,
      hash: '',
      confirmations: 9, // hard code
      amountAUD: this.amountCurrency,
      businessName: this.businessName,
      receiver: this.receiverName || this.sendForm.value.receiverAddress,
      receiverAddress: this.sendForm.value.receiverAddress,
      description: this.sendForm.value.description,
      ABN: this.ABNNum,
      tax: this.tax,
      tokenId,
    };

    // 2. open the comfirm alter window:
    this.modalCtrl
      .create({
        component: ConfirmTransactionModalComponent,
        componentProps: {
          transactionData: newTransaction,
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

  async onConfirmSend(pin) {
    const simpleWallet = await this.getSimpleWallet();
    const hashPassword = this.walletProvider.getPasswordHashFromPin(pin);
    const isValid = await this.privateKeyWallet(simpleWallet, hashPassword);
    if (isValid) {
      const prepareTransaction: PrepareTransaction = {
        type: 'transfer',
        recipientAddress: this.sendForm.value.receiverAddress,
        messageText: this.sendForm.value.description,
        mosaics: [this.selectedMosaic.mosaic],
        fee: this.rangeMaxFees[this.rangeValue],
      };
      const transferTxs = await this.symbolTransaction.prepareTransferTransaction(
        prepareTransaction,
        this.symbolNetworkCurrencies,
        this.symbolEpochAdjustment
      );
      await this.symbol.confirmTransaction(
        transferTxs as SymbolTransferTransaction,
        simpleWallet,
        hashPassword,
        this.symbolNetworkConfig
      );
    } else {

    }
  }

  async privateKeyWallet(simpleWallet: SymbolSimpleWallet, hashPassword: string): Promise<string | null> {
    try {
      return this.symbol.passwordToPrivateKey(hashPassword, simpleWallet);
    }catch (e) {
      console.log('walletPrivateKey error:', e);
    }
    return null;
  }

  async getSimpleWallet(): Promise<SymbolSimpleWallet> {
    const wallets = await this.walletProvider.getSymbolWallets(true);
    const wallet = wallets.find(wlt => wlt.walletId === this.selectedWallet.walletId);
    return SymbolSimpleWallet.createFromDTO(wallet.simpleWallet);
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
