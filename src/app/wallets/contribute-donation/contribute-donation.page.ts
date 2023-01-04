// modules
import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {Subscription} from 'rxjs';
import {NavController} from '@ionic/angular';

// nem
import {
  Address as NemAddress,
  SimpleWallet as NemSimpleWallet,
} from 'nem-library';

// symbol
import {
  Address as SymbolAddress,
  Mosaic as SymbolMosaic,
  MosaicInfo as SymbolMosaicInfo,
  MosaicNames as SymbolMosaicNames,
  SimpleWallet as SymbolSimpleWallet,
  TransactionType as SymbolTransactionType,
  TransferTransaction as SymbolTransferTransaction,
} from 'symbol-sdk';

// services
import {DonationWalletModal} from '@app/services/models/donation-wallet.modal';
import {BitcoinProvider} from '@app/services/bitcoin/bitcoin.provider';
import {WalletsService} from '@app/services/wallets/wallets.service';
import {WalletProvider} from '@app/services/wallets/wallet.provider';
import {SymbolProvider} from '@app/services/symbol/symbol.provider';
import {SymbolTransactionProvider} from '@app/services/symbol/symbol.transaction.provider';
import {NemProvider} from '@app/services/nem/nem.provider';
import {EthersProvider} from '@app/services/ethers/ethers.provider';
import {EthersListenerProvider} from '@app/services/ethers/ethers.listener.provider';
import {ToastProvider} from '@app/services/toast/toast.provider';
import {PinProvider} from '@app/services/pin/pin.provider';
import {AlertProvider} from '@app/services/alert/alert.provider';

// utils
import {MapCryptoAssets} from '@utils/MapCryptoAssets';
import {wait} from '@utils/Wait';

// enums
import {Coin} from '@app/enums/enums';
import {ETHWallet} from '@app/services/models/wallet.model';

const DONATION_NEM_ADDRESS = 'TCYTU4AFJHR47SIFA2JW27IIF4DXEUKHRRZ5YOET';
const DONATION_XYM_ADDRESS = 'TBRQ37PV2XWOM3MBV2EKH24KBYGE5OJFW4JCJ6Q';
const DONATION_BTC_ADDRESS = 'tb1q0zg5pdyrgq26vjuth0mjsmf05xsf334fqcslr2';
const DONATION_ETH_ADDRESS = '0x95AE376221D9ad5e6818C7aD0787Cd2b50Dd2FDc';

@Component({
  selector: 'app-contribute-donation',
  templateUrl: './contribute-donation.page.html',
  styleUrls: ['./contribute-donation.page.scss'],
})
export class ContributeDonationPage implements OnInit, OnDestroy {
  selectedWallet: DonationWalletModal;
  wallets: DonationWalletModal[];
  donations = [5, 10, 15, 20];

  sendForm: FormGroup;

  swapAmount: { amount: number; type: string };

  amountSubscribe: Subscription;
  amountTypeSubscribe: Subscription;

  isSendTxsLoading: boolean;

  constructor(
    private bitcoin: BitcoinProvider,
    private walletsService: WalletsService,
    private walletProvider: WalletProvider,
    private symbol: SymbolProvider,
    private symbolTransaction: SymbolTransactionProvider,
    private nem: NemProvider,
    private ethersProvider: EthersProvider,
    private ethersListenerProvider: EthersListenerProvider,
    private toast: ToastProvider,
    private pin: PinProvider,
    private alertProvider: AlertProvider,
    private navController: NavController,
  ) {
    this.selectedWallet = new DonationWalletModal(
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      0,
      null,
    );
    this.wallets = [];
    this.sendForm = new FormGroup({
      amount: new FormControl(null, Validators.required),
      amountType: new FormControl(null, Validators.required),
      description: new FormControl(null),
    });
    this.swapAmount = {amount: null, type: null};
    this.isSendTxsLoading = false;
  }

  ngOnInit() {
    this.onHandleGetAllWallet();
    this.onHandleSubscribe();
  }

  ngOnDestroy() {
    this.onHandleUnSubscribe();
  }

  onHandleSubscribe() {
    this.amountSubscribe = this.sendForm.get('amountType').valueChanges.subscribe(amountType => {
      this.onHandleAmountChange({
        amount: this.sendForm.get('amount').value,
        amountType,
      });
    });
    this.amountTypeSubscribe = this.sendForm.get('amount').valueChanges.subscribe(amount => {
      this.onHandleAmountChange({
        amount,
        amountType: this.sendForm.get('amountType').value,
      });
    });
  }

  onHandleUnSubscribe() {
    this.amountSubscribe.unsubscribe();
    this.amountTypeSubscribe.unsubscribe();
  }

  async onHandleGetAllWallet() {
    const allWallets = await this.walletProvider.getAllWallets();
    this.wallets = allWallets.map(item => new DonationWalletModal(
      item.walletId,
      MapCryptoAssets[item.walletType],
      item.walletType,
      item.walletAddress,
      item.walletBalance[1],
      item.walletType,
      item.walletBalance[0],
      item.currency,
      item.exchangeRate,
      {[Coin.ETH]: {privateKey: item.privateKey}}[item.walletType] || item.simpleWallet,
    ));
    this.selectedWallet = this.wallets[0];
    this.sendForm.get('amountType').setValue(this.selectedWallet.convertedCurrency);
  }

  handleSubmit() {
    const total = this.onHandleGetTotal();
    // validate Insufficient balance
    if (total > this.selectedWallet.balance) {
      return this.toast.showCatchError('Insufficient Balance');
    }

    this.onHandleEnterPinModal();
  }

  async onHandleEnterPinModal() {
    const pin = await this.pin.showEnterPin();
    if (!pin) {
      return null;
    }
    const isValidPin = await this.walletProvider.isValidPin(pin);
    if (!isValidPin) {
      this.alertProvider.showInvalidPasswordAlert();
      return null;
    }
    await this.onHandleSubmitTransaction(pin);
  }

  async onHandleSubmitTransaction(pin: string) {
    const hashPwd = this.walletProvider.getPasswordHashFromPin(pin);
    const onSubmitTransaction = {
      [Coin.NEM]: async () => this.onHandleAnnounceNEMTxn(hashPwd),
      [Coin.SYMBOL]: async () => this.onHandleAnnounceSYMBOLTxn(hashPwd),
      [Coin.BITCOIN]: async () => this.onHandleAnnounceBTCTxn(hashPwd),
      [Coin.ETH]: async () => this.onHandleAnnounceETHTxn(hashPwd),
    };
    if (this.selectedWallet.type && onSubmitTransaction[this.selectedWallet.type]) {
      this.isSendTxsLoading = true;
      await onSubmitTransaction[this.selectedWallet.type]();
      this.isSendTxsLoading = false;
    }
  }

  async onHandleAnnounceNEMTxn(hash: string) {
    try {
      const amount = this.onHandleGetTotal();
      const message = this.onHandleGetDescription();
      const transferTxs = this.nem.prepareTransaction(
        new NemAddress(DONATION_NEM_ADDRESS),
        amount,
        message,
      );
      const simpleWallet = NemSimpleWallet.readFromWLT(this.selectedWallet.simpleWallet);
      await wait(2000);
      await this.nem.confirmTransaction(
        transferTxs,
        simpleWallet,
        hash
      );
    }catch (e) {
      this.toast.showCatchError(e);
    }
  }

  async onHandleAnnounceSYMBOLTxn(hash: string) {
    try {
      const total = this.onHandleGetTotal();
      const message = this.onHandleGetDescription();

      const address = SymbolAddress.createFromRawAddress(this.selectedWallet.address);
      const tokens = await this.symbol.getSymbolTokens(address) as Array<{ mosaic: SymbolMosaic; info: SymbolMosaicInfo; namespaceNames: SymbolMosaicNames }>;
      const mosaic: any = tokens[0].mosaic;
      mosaic.amount = total * Math.pow(10, tokens[0].info.divisibility);
      const networkConfig = await this.symbol.getNetworkConfig();
      const transactionFees = await this.symbol.getTransactionFees();
      const epochAdjustment = await this.symbol.repositoryFactory.getEpochAdjustment().toPromise();
      const fee = this.symbolTransaction.getMaxFee(
        {
          recipientAddress: DONATION_XYM_ADDRESS,
          mosaics: [mosaic],
          fee: this.symbolTransaction.defaultFeesConfig.normal,
          message,
        },
        networkConfig,
        transactionFees,
        epochAdjustment,
      );
      const transferTxs = this.symbolTransaction.prepareTransferTransaction(
        {
          fee,
          type: SymbolTransactionType.TRANSFER,
          recipientAddress: DONATION_XYM_ADDRESS,
          messageText: message,
          mosaics: [tokens[0].mosaic],
        },
        epochAdjustment,
      ) as SymbolTransferTransaction;
      const wallet = SymbolSimpleWallet.createFromDTO(this.selectedWallet.simpleWallet);

      await this.symbol.confirmTransaction(
        transferTxs,
        wallet,
        hash,
        networkConfig,
      );
    }catch (e) {
      this.toast.showCatchError(e);
    }
  }

  async onHandleAnnounceETHTxn(hash: string) {
    try {
      const total = this.onHandleGetTotal();

      const ethTxCount = await this.ethersProvider.getTransactionCount(this.selectedWallet.address);
      const passwordToPk = this.ethersProvider.passwordToPrivateKey(hash, this.selectedWallet.simpleWallet as ETHWallet);
      const wallet = this.ethersProvider.createPrivateKeyWallet(passwordToPk);

      const gasPrice = await this.ethersProvider.gasPrice();
      const gasLimit = await this.ethersProvider.estimateGas(DONATION_ETH_ADDRESS, total.toString());

      const transferTransaction = this.ethersProvider.prepareTransferTransaction(
        this.selectedWallet.address,
        DONATION_ETH_ADDRESS,
        total,
        ethTxCount,
        gasLimit.toNumber(),
        gasPrice,
      );

      const sendTxs = await this.ethersProvider.sendTransaction(wallet, transferTransaction);
      this.toast.showMessageWarning('Pending to: ' + sendTxs.to);
      this.ethersListenerProvider.waitForTransaction(sendTxs);
    }catch (e) {
      this.toast.showCatchError(e);
    }
  }

  async onHandleAnnounceBTCTxn(hash: string) {
    const total = this.onHandleGetTotal();

    const fee = await this.bitcoin.calculateFee();
    await this.bitcoin.sendTransaction(
      DONATION_BTC_ADDRESS,
      total,
      fee.halfHourFee,
      this.selectedWallet.simpleWallet,
      hash,
    );
    this.toast.showMessageWarning('Pending to: ' + DONATION_BTC_ADDRESS);
  }

  handleDonationHintOnClick(item) {
    this.sendForm.get('amount').setValue(item);
  }

  handleSelectWalletOnClick(wallet) {
    this.selectedWallet = wallet;
    if (this.selectedWallet.convertedCurrency === this.sendForm.get('amountType').value) {
      this.sendForm.get('amountType').setValue(this.selectedWallet.convertedCurrency);
    } else {
      this.sendForm.get('amountType').setValue(this.selectedWallet.currency);
    }
  }

  onHandleAmountChange({amount , amountType}: {amount: number, amountType: string}) {
    this.swapAmount = {
      amount: amountType === this.selectedWallet.convertedCurrency
        ? (amount / this.selectedWallet.exchangeRate)
        : (amount * this.selectedWallet.exchangeRate),
      type: amountType === this.selectedWallet.convertedCurrency
        ? this.selectedWallet.currency
        : this.selectedWallet.convertedCurrency,
    };
  }

  onHandleGetTotal(): number {
    const {amount, amountType} = this.sendForm.value;
    return amountType === this.selectedWallet.convertedCurrency
      ? amount / this.selectedWallet.exchangeRate
      : amount;
  }

  onHandleGetDescription(): string {
    return this.sendForm.value.description;
  }
}
