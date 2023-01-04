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

// NEM
import {
  SimpleWallet as NemSimpleWallet,
  Address as NemAddress,
} from 'nem-library';

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

const DONATION_NEM_ADDRESS = 'TCYTU4AFJHR47SIFA2JW27IIF4DXEUKHRRZ5YOET';
const DONATION_XYM_ADDRESS = '';
const DONATION_BTC_ADDRESS = '';
const DONATION_ETH_ADDRESS = '';

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
    console.log(allWallets);
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
      item.simpleWallet,
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
    this.onHandleSubmitTransaction(pin);
  }

  onHandleSubmitTransaction(pin: string) {
    const hashPwd = this.walletProvider.getPasswordHashFromPin(pin);
    const onSubmitTransaction = {
      [Coin.BITCOIN]: () => {
        console.log('TODO BITCOIN');
      },
      [Coin.NEM]: () => {
        this.onHandleAnnounceNEMTxn(hashPwd);
      },
      [Coin.SYMBOL]: () => {
        console.log('TODO SYMBOL');
      },
      [Coin.ETH]: () => {
        console.log('TODO ETH');
      },
    };
    if (this.selectedWallet.type && onSubmitTransaction[this.selectedWallet.type]) {
      onSubmitTransaction[this.selectedWallet.type]();
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
      await this.navController.pop();
    }catch (e) {
      this.toast.showCatchError(e);
    }
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
