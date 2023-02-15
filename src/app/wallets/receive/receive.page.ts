// modules
import {
  Component,
  OnInit,
} from '@angular/core';
import {
  ActivatedRoute,
  Params,
  Router,
} from '@angular/router';
import {Storage} from '@ionic/storage';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import {NavController} from '@ionic/angular';

import * as kjua from 'kjua';

// symbol
import {
  Address as SymbolAddress,
  NamespaceId as SymbolNamespaceId,
  NetworkConfiguration as SymbolNetworkConfiguration,
} from 'symbol-sdk';

// services
import {Wallet} from '@app/services/models/wallet.model';
import {WalletProvider} from 'src/app/services/wallets/wallet.provider';
import {ExchangeProvider} from '@app/services/exchange/exchange.provider';
import {SymbolTransactionProvider} from '@app/services/symbol/symbol.transaction.provider';
import {SymbolProvider} from '@app/services/symbol/symbol.provider';

// constants
import {WALLET_ICON} from 'src/app/constants/constants';

// environments
import {environment} from '@environments/environment';

// shared
import {SendReceiveQrCode} from '@app/shared/models/sr-qrCode';

// enums
import {Coin} from '@app/enums/enums';

// models
import {NemQrcodeModel} from '@app/services/models/nem-qrcode.model';

@Component({
  selector: 'app-receive',
  templateUrl: './receive.page.html',
  styleUrls: ['./receive.page.scss'],
})
export class ReceivePage implements OnInit {
  receiveWallet: Wallet;
  maxAmount: number;
  qrCode: any;
  isLoading = false;
  isUnknownToken = false;
  selectedToken: string;
  // --- user input values:
  selectedType: string;
  enteredAmount: number;
  selectedTax = 0;
  recipientName: string;
  message: string;
  arrayTax = ['0 %'];
  amountCrypto: number;
  amountCurrency: number;
  walletIcon = WALLET_ICON;
  walletType = [];
  compareWith: any;
  compareWithdup: any;
  // dummy user's invoic info:
  user = {
    businessName: '',
    address: '',
    ABN: '',
    email: '',
    // tax:''
  };

  divisibility: number;

  symbolNetworkConfig: SymbolNetworkConfiguration;

  constructor(
    private route: ActivatedRoute,
    private walletProvider: WalletProvider,
    private storage: Storage,
    private router: Router,
    private sharing: SocialSharing,
    private exchange: ExchangeProvider,
    private symbolTransaction: SymbolTransactionProvider,
    private symbol: SymbolProvider,
    private navCtrl: NavController,
  ) {
    this.qrCode = { src: '' };
    this.recipientName = '';
    this.message = '';
    this.receiveWallet = new Wallet(
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
      []
    );
  }

  async ngOnInit() {
    const state = this.router.getCurrentNavigation().extras.state;
    try {
      const currency = await this.exchange.getCurrency();
      this.route.params.subscribe(async (params: Params) => {
        const walletId = params['walletId'];
        this.receiveWallet = await this.walletProvider.getWalletByWalletId(
          walletId
        );
        const token = params['tokenName'];
        this.walletType = token
          ? [token, currency]
          : [this.receiveWallet.walletType, currency];
        this.selectedType = this.walletType[0];
        const price = await this.exchange.getExchangeRate(this.walletType[0]);
        this.isUnknownToken = price === 0;
        this.isLoading = true;
        if (!this.selectedToken) {
          switch (this.receiveWallet.walletType) {
            case Coin.NEM:
              this.selectedToken = state.selectMosaic.mosaicId;
              this.divisibility = state.selectMosaic.properties.divisibility;
              break;
            case Coin.SYMBOL:
              this.selectedToken = state.selectMosaic.mosaic.id.toHex();
              this.divisibility = state.selectMosaic.info.divisibility;
              this.symbolNetworkConfig = await this.symbol.getNetworkConfig();
              break;
            default:
              break;
          }
        }

        this.updateQR();
      });
    } catch (e) {}

    this.onCheckProfile();
  }

  async onCheckProfile() {
    try {
      const checkProfile = await this.storage.get('Setting');
      if (checkProfile) {
        this.user = {
          businessName: checkProfile[0].my_profile_invoice.business_name,
          address: checkProfile[0].my_profile_invoice.company_address,
          ABN: checkProfile[0].my_profile_invoice.business_number,
          email: checkProfile[0].my_profile_invoice.phone_number,
        };
        if (checkProfile[0].my_profile_invoice.tax) {
          this.arrayTax.push(checkProfile[0].my_profile_invoice.tax + ' %');
        }
      }
    } catch (e) {
      console.log('onCheckProfile', 'error', e);
    }
  }

  async updateQR() {
    if (!this.receiveWallet) {
      return;
    }

    if (this.receiveWallet.walletType === Coin.SYMBOL) {
      const symbolQRCodeData = await this.generateSymbolQRCode();
      if (symbolQRCodeData) {
        this.qrCode = {src: symbolQRCodeData};
        return;
      }
    }

    const qrInfo = this.getQRCodeInfo();
    this.qrCode = this.encodeQrCode(qrInfo);
  }

  async onChangeTokenData(isChangeAmount: boolean, e: any) {
    if (isChangeAmount) this.enteredAmount = parseFloat(e.target.value);
    else this.selectedType = e.detail.value;
    const price = await this.exchange.getExchangeRate(this.walletType[0]);
    if (!this.isUnknownToken) {
      if (this.selectedType === this.walletType[0]) {
        this.amountCurrency = this.enteredAmount;
        this.amountCrypto = this.enteredAmount * price;
      } else {
        this.amountCurrency = this.enteredAmount;
        this.amountCrypto = this.enteredAmount / price;
      }
    } else {
      this.amountCurrency = this.enteredAmount;
    }
    this.updateQR();
  }

  onSelectTax(e: any) {
    this.selectedTax = e.detail.value;
    this.updateQR();
  }

  async onShare() {
    const qrSrc = await this.shareQRCode();
    this.sharing
      .share('image', null, qrSrc, null)
      .then(() => {
        // TODO:
      })
      .catch((error) => {
        console.log('onShare error', error);
      });
  }
  onEdit() {
    this.router.navigateByUrl('/tabnav/setting/invoice-profile');
  }
  async shareQRCode() {
   try {
     if (!this.receiveWallet) {
       return;
     }

     if (this.receiveWallet.walletType === Coin.SYMBOL) {
       const symbolQRCodeData = await this.generateSymbolQRCode();
       return symbolQRCodeData;
     }

     const qrInfo = this.getQRCodeInfo();
     this.qrCode = this.encodeQrCode(qrInfo);
     return this.qrCode.src;
   }catch (e) {
     console.log('shareQRCode', 'e', e);
   }
  }

  getQRCodeInfo(): string {
    let amountCurrency;
    let amountCrypto;
    if (this.walletType[0] === this.selectedType) {
      amountCurrency = this.amountCrypto || 0;
      amountCrypto = this.amountCurrency || 0;
    } else {
      amountCurrency = this.amountCurrency || 0;
      amountCrypto = this.amountCrypto || 0;
    }

    /** Check generate QRCode for NEM Wallet. */
    if (this.walletType[0] === Coin.NEM) {
      const amount = this.selectedType === this.walletType[0] ? this.amountCurrency || 0 : this.amountCrypto || 0;
      const nemQRCode = this.generateNEMQRCode(
        this.receiveWallet.walletAddress,
        amount,
        this.message,
        this.divisibility,
      );
      return JSON.stringify(nemQRCode);
    }

    const data = {
      address: this.receiveWallet.walletAddress,
      walletType: this.receiveWallet.walletType,
      amountCurrency,
      amountCrypto,
      type: this.selectedType,
      tokenId: this.selectedToken,
      selectedTax: this.selectedTax, // default tax is set to 10%
      name: this.recipientName,
      msg: this.message,
      userInfo: this.user,
    };
    const qrInfo = new SendReceiveQrCode(environment.QR_CODE_VERSION, data);
    return JSON.stringify(qrInfo);
  }

  private encodeQrCode(infoQR) {
    return kjua({
      size: 256,
      text: infoQR,
      fill: '#000',
      quiet: 0,
      ratio: 2,
    });
  }

  async generateSymbolQRCode() {
    let amount = 0;
    if (this.selectedType === this.walletType[0]) {
      amount = this.amountCurrency;
    } else {
      amount = this.amountCrypto;
    }
    let symbolQRCodeData = null;
    try {
      symbolQRCodeData = this.symbolTransaction.generateQRCodeFromTransferTransaction({
        message: this.message,
        networkType: this.symbol.SYMBOL_NETWORK_TYPE,
        amount: amount * Math.pow(10, this.divisibility),
        recipientAddress: SymbolAddress.createFromRawAddress(this.receiveWallet.walletAddress),
        namespaceId: new SymbolNamespaceId('symbol.xym'),
        epochAdjustment: parseInt(this.symbolNetworkConfig.network.epochAdjustment, 0),
        generationHash: this.symbolNetworkConfig.network.generationHashSeed,
      });
    }catch (e) {
      console.log('generateSymbolQRCode', 'e', e);
    }
    return symbolQRCodeData;
  }

  generateNEMQRCode(address: string, amount: number, message: string, divisibility: number): NemQrcodeModel {
    return new NemQrcodeModel(
      2,
      2,
      {
        addr: address,
        amount: amount * Math.pow(10, divisibility),
        msg: message,
        name: 'wallet',
      }
    );
  }

  handleBackOnClick() {
    // this.navCtrl.back();
  }
}
