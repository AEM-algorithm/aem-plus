import { Component, OnDestroy, OnInit } from '@angular/core';
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
import {NemProvider} from '@app/services/nem/nem.provider';
import { LoadingProvider } from '@app/services/loading/loading.provider';
import { ToastProvider } from '@app/services/toast/toast.provider';
import {MemoryProvider} from '@app/services/memory/memory.provider';

import { ConfirmTransactionModalComponent } from './confirm-transaction-modal/confirm-transaction-modal.component';
import { SelectAddressModalComponent } from './select-address-modal/select-address-modal.component';

import { SUPPORTED_CURENCIES, WALLET_ICON } from 'src/app/constants/constants';

import {
  IListener as SymbolIListener,
  NetworkConfiguration as SymbolNetworkConfiguration,
  NetworkCurrencies as SymbolNetworkCurrencies,
  SimpleWallet as SymbolSimpleWallet,
  TransactionFees as SymbolTransactionFees,
  TransactionType,
  TransferTransaction as SymbolTransferTransaction,
} from 'symbol-sdk';
import {
  Address as NemAddress,
  MosaicTransferable,
  XEM,
  SimpleWallet as NemSimpleWallet,
} from 'nem-library';
import { Subscription } from 'rxjs';

import { Coin } from '@app/enums/enums';
import { QRCodeData } from '@app/shared/models/sr-qrCode';
import { BitcoinProvider, BitcoinSimpleWallet } from '@app/services/bitcoin/bitcoin.provider';

@Component({
  selector: 'app-send',
  templateUrl: './send.page.html',
  styleUrls: ['./send.page.scss'],
})
export class SendPage implements OnInit, OnDestroy {
  isSelectedToken = false;
  selectedWallet: Wallet;
  selectedToken: Token;
  selectedWalletType: string = '';
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
  symbolListener: SymbolIListener;
  symbolEpochAdjustment: number;

  coin = Coin;

  private routeSubscription: Subscription;

  constructor(
    private bitcoin: BitcoinProvider,
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
    private nem: NemProvider,
    private memory: MemoryProvider,
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

  async ngOnInit() {
    const state = this.router.getCurrentNavigation().extras.state;
    this.routeSubscription = this.route.paramMap.subscribe(async (params) => {
      await this.loading.presentLoading();
      const walletId = params.get('walletId');

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

      if (this.selectedWallet.walletType === Coin.BITCOIN) {
        await this.initializeBitcoin();
      }

      await this.loading.dismissLoading();

      if (!this.observeQRCodeResult() && this.memory.hasData()) {
        this.toast.showMessageError('QR code is invalid');
      }
      this.memory.setResetData();
    });

    this.formInit();
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  private observeQRCodeResult(): boolean {
    const memoryData = this.memory.getData();
    if (!memoryData || memoryData.version != 1 || !memoryData.data) return false;

    let data = memoryData.data as QRCodeData;
    // Check wallet type
    if (data.walletType !== this.selectedWallet.walletType) return false;

    // Check receipient address
    if (!this.walletProvider.checkValidAddress(data.address, data.walletType as Coin)) return false;

    // Check send token ID
    switch (this.selectedWallet.walletType) {
      case Coin.SYMBOL:
        if (data.tokenId !== this.selectedMosaic.mosaic.id.toHex().toString()) return false;
        const isDefaultSymbolToken = this.selectedMosaic.mosaic.id.toHex().toString() === this.symbol.symbolMosaicId;
        if (isDefaultSymbolToken) data.tokenId = Coin.SYMBOL;
        break;
      case Coin.NEM:
        if (JSON.stringify(this.selectedMosaic.mosaicId) !== JSON.stringify(data.tokenId)) return false;
        const isDefaultNemToken = this.selectedMosaic.mosaicId.description() === 'nem:xem';
        if (isDefaultNemToken) data.tokenId = Coin.NEM;
        break;
      case Coin.BITCOIN:
        data.tokenId = Coin.BITCOIN;
        break;
      default:
        break;
    }

    // Set receipient address
    this.sendForm.get('receiverAddress').setValue(data.address);

    // Set send token ID
    this.setCryptoAmount(data.amountCrypto);
    const isSeningInCurrency = SUPPORTED_CURENCIES[data.type.toLowerCase()];
    this.sendForm.get('amountType').setValue(isSeningInCurrency ? data.tokenId : data.type);

    // Set message description
    if (data.msg) {
      this.sendForm.get('description').setValue(data.msg);
    }
    return true;
  }

  private setCryptoAmount(value: number) {
    this.selectedWalletCurrency = this.selectedWallet.walletType;
    this.onEnterAmount({target: { value }});
  }

  async initWallet(walletId: string) {
    this.selectedWallet = await this.walletProvider.getWalletByWalletId(walletId, false);
    this.cryptoBalance = this.selectedWallet.walletBalance[1];
    this.currencyBalance = this.selectedWallet.walletBalance[0];

    this.selectedWalletCurrency = this.selectedWallet.currency;
    this.selectedWalletType =  this.selectedWallet.walletType;
    this.sendForm.get('amountType').setValue(this.selectedWallet.walletType);
  }

  initWalletToken(tokenId: string) {
    this.isSelectedToken = true;
    this.selectedToken = this.walletsService.getToken(this.selectedWallet, tokenId);

    this.cryptoBalance = this.selectedToken.balance[1];
    this.currencyBalance = this.selectedToken.balance[0];

    this.selectedWalletType = this.selectedToken.name;
    this.sendForm.get('amountType').setValue(this.selectedWalletType);
  }

  private formInit() {
    this.sendForm = new FormGroup({
      receiverAddress: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, Validators.required),
      description: new FormControl(null), // optional
      amountType:  new FormControl(null), // optional
    });
  }

  private async initializeNem() {
    // TODO:
    console.log('initializeNem');
  }

  private async initializeSymbol() {
    this.symbolNetworkConfig = await this.symbol.getNetworkConfig();
    this.symbolTransactionFees = await this.symbol.getTransactionFees();
    this.symbolNetworkCurrencies = await this.symbol.repositoryFactory.getCurrencies().toPromise();
    this.symbolEpochAdjustment = await this.symbol.repositoryFactory.getEpochAdjustment().toPromise();
  }

  private async initializeBitcoin() {
    // TODO:
    console.log("init Bitcoin ");
  }

  onSelectType(e: any) {
    this.selectedWalletCurrency = e.detail.value;
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
    this.amount = e.target?.value || '';

    if (this.isSelectedToken) {
      this.amountCurrency = 0;
      this.amountCrypto = this.amount;
    } else if (this.walletProvider.checkValidAddress(this.sendForm.value.receiverAddress, this.selectedWallet.walletType as Coin)) {
      if (this.selectedWalletCurrency === this.selectedWallet.currency) {
        this.checkAmountValidation(this.amount, this.currencyBalance);
        this.amountCurrency = this.amount;
        this.amountCrypto = this.amount / this.selectedWallet.exchangeRate;
      } else {
        this.checkAmountValidation(this.amount, this.cryptoBalance);
        this.amountCrypto = this.amount;
        this.amountCurrency = this.amount * this.selectedWallet.exchangeRate;
      }
    } else {
      if (this.selectedWallet.walletType === Coin.NEM) {
        this.amountCurrency = null;
        this.amountCrypto = null;
      }
    }

    // TODO: calculate tax.
    this.tax = (this.amountCurrency * 0.1) / (1 + 0.1);

    if (this.walletProvider.checkValidAddress(this.sendForm.value.receiverAddress, this.selectedWallet.walletType as Coin)){
      this.updateFee();
    }
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
    if (this.walletProvider.checkValidAddress(this.sendForm.value.receiverAddress, this.selectedWallet.walletType as Coin)) {
      this.updateFee();
    }
  }

  onEditFee() {
    // TODO:
    console.log('editing fee...');
  }

  onDescriptionChange(e) {
    if(this.walletProvider.checkValidAddress(this.sendForm.value.receiverAddress, this.selectedWallet.walletType as Coin)) {
      this.updateFee();
    }
  }

  async updateFee() {
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
    const getRangeFee = {
      1: this.minFeeCurrency,
      2: this.suggestedFeeCurrency,
      3: this.maxFeeCurrency,
    };

    setTimeout(() => {
      this.rangeValue = range ? range : 2;
      this.selectedFeeCrypto = getRangeFee[this.rangeValue];
      this.selectedFeeCurrency = this.selectedFeeCrypto * this.selectedWallet.exchangeRate;
    }, 300);
  }

  async updateMaxFee(): Promise<FeesConfig> {

    // SYMBOL CALCULATE FEE
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

    // NEM CALCULATE FEE
    if (this.selectedWallet.walletType === Coin.NEM) {
      const txs = this.prepareTransaction();
      const range = 2;
      this.rangeMaxFees = {[range]: txs.fee};
      const fee = this.symbolTransaction.resolveAmount(txs.fee, 6);
      return {
        slow: fee,
        normal: fee,
        fast: fee,
      };
    }

    // BITCOIN CALCULATE FEE
    if (this.selectedWallet.walletType === Coin.BITCOIN) {
      const fee = await this.bitcoin.calculateFee();
      this.rangeMaxFees = [fee.hourFee, fee.halfHourFee, fee.fastestFee];
      const showFee = {
        slow: fee.hourFee / Math.pow(10, 8),
        normal: fee.halfHourFee / Math.pow(10, 8),
        fast: fee.fastestFee / Math.pow(10, 8),
      };
      return showFee;
    }
  }

  prepareTransaction(fee?) {
    const recipientAddress = this.sendForm.value.receiverAddress;
    // SYMBOL PREPARE TXS
    if (this.selectedWallet.walletType === Coin.SYMBOL) {
      this.selectedMosaic.mosaic.amount = this.amountCrypto * Math.pow(10, this.selectedMosaic.info.divisibility);
      return {
        recipientAddress,
        mosaics: [this.selectedMosaic.mosaic],
        message: this.sendForm.value.description,
        fee,
      };
    }

    // SYMBOL PREPARE TXS
    if (this.selectedWallet.walletType === Coin.NEM) {
      let transferTransaction;
      if (!XEM.MOSAICID.equals(this.selectedMosaic.mosaicId)) {
        const mosaic = new MosaicTransferable(
          this.selectedMosaic.mosaicId,
          this.selectedMosaic.properties,
          this.amount,
          this.selectedMosaic.levy
        );
        transferTransaction = this.nem.prepareMosaicTransaction(
          new NemAddress(recipientAddress),
          [mosaic],
          this.sendForm.value.description
        );
      } else {
        transferTransaction = this.nem.prepareTransaction(
          new NemAddress(recipientAddress),
          this.amount,
          this.sendForm.value.description || '',
        );
      }

      return transferTransaction;
    }

    // BITCOIN PREPARE TXS
    if (this.selectedWallet.walletType === Coin.BITCOIN) {
      // TODO
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
    if (!this.walletProvider.checkValidAddress(this.sendForm.value.receiverAddress, this.selectedWallet.walletType as Coin)) {
      this.toast.showMessageError('Recipient Address is invalid');
      this.sendForm.get('amount').setValue(null);
      this.sendForm.get('receiverAddress').setValue(null);
      return;
    }
    const txsInfo = {
      txsId: Math.random().toFixed(8), // required
      time: new Date().getTime(),
      incoming: false,
      address: this.selectedWallet.walletAddress,
      feeCrypto: this.selectedFeeCrypto, // required
      feeCurrency: this.selectedFeeCurrency, // required
      amount: this.amountCrypto, // required
      amountCurrency: this.amountCurrency, // required
      currency: this.selectedWallet.currency, // required
      businessName: this.businessName,
      receiver: this.receiverName || this.sendForm.value.receiverAddress, // required
      receiverAddress: this.sendForm.value.receiverAddress,
      description: this.sendForm.value.description, // required
      ABN: this.ABNNum,
      tax: this.tax,
    };
    this.modalCtrl
      .create({
        component: ConfirmTransactionModalComponent,
        componentProps: {
          transactionInfo: txsInfo,
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

      // SYMBOL ANNOUNCE TXS
      if (this.selectedWallet.walletType === Coin.SYMBOL) {
        const simpleWallet = await this.getSymbolSimpleWallet();
        const prepareTransaction: PrepareTransaction = {
          type: TransactionType.TRANSFER,
          recipientAddress: this.sendForm.value.receiverAddress,
          messageText: this.sendForm.value.description,
          mosaics: [this.selectedMosaic.mosaic],
          fee: this.rangeMaxFees[this.rangeValue],
        };

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

      // NEM ANNOUNCE TXS
      if (this.selectedWallet.walletType === Coin.NEM) {
        const simpleWallet = await this.getNemSimpleWallet();
        const transferTxs = this.prepareTransaction();
        setTimeout(async () => {
          const confirmTxs = await this.nem.confirmTransaction(transferTxs, simpleWallet, hashPassword);
          // TODO
          console.log('confirmTxs', confirmTxs);
        }, 2000);
      }

      if (this.selectedWallet.walletType === Coin.BITCOIN) {
        const simpleWallet = await this.getBitcoinSimpleWallet();
        return await this.bitcoin.sendTransaction(
          this.sendForm.value.receiverAddress,
          this.amountCrypto,
          this.rangeMaxFees[this.rangeValue],
          simpleWallet,
          hashPassword
        )
      }
    }
  }

  async getSymbolSimpleWallet(): Promise<SymbolSimpleWallet> {
    const wallets = await this.walletProvider.getSymbolWallets(true);
    const wallet = wallets.find(wlt => wlt.walletId === this.selectedWallet.walletId);
    return SymbolSimpleWallet.createFromDTO(wallet.simpleWallet);
  }

  async getNemSimpleWallet(): Promise<NemSimpleWallet> {
    const wallets = await this.walletProvider.getNemWallets(true);
    const wallet = wallets.find(wlt => wlt.walletId === this.selectedWallet.walletId);
    return NemSimpleWallet.readFromWLT(wallet.simpleWallet);
  }

  async getBitcoinSimpleWallet(): Promise<BitcoinSimpleWallet> {
    const wallets = await this.walletProvider.getBitcoinWallets(true);
    const wallet = wallets.find(wlt => wlt.walletId === this.selectedWallet.walletId);
    return {
      encryptedWIF: wallet.privateKey,
      address: wallet.walletAddress
    } as BitcoinSimpleWallet
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  walletScanOnClick() {
    this.router.navigateByUrl('/qr-code-scan');
  }
}
