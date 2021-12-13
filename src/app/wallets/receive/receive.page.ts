import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Storage } from '@ionic/storage';

import * as kjua from 'kjua';

import { Wallet } from '@app/services/models/wallet.model';
import { WalletProvider } from 'src/app/services/wallets/wallet.provider';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ExchangeProvider } from '@app/services/exchange/exchange.provider';

import { WALLET_ICON } from 'src/app/constants/constants';

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
  compareWith : any ;
  compareWithdup : any ;
  // dummy user's invoic info:
  user = {
    businessName: '',
    address: '',
    ABN: '',
    email: '',
    // tax:''
  };

  constructor(
    private route: ActivatedRoute,
    private walletProvider: WalletProvider,
    private storage: Storage,
    private router: Router,
    private sharing: SocialSharing,
    private exchange: ExchangeProvider,
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
      [],
    );
  }

  async ngOnInit() {

    try {
      this.selectedType = await this.exchange.getCurrency();
      let check_profile = await this.storage.get('Setting');
      if (check_profile) {
        this.user = {
          businessName: check_profile[0].my_profile_invoice.business_name,
          address: check_profile[0].my_profile_invoice.company_address,
          ABN: check_profile[0].my_profile_invoice.business_number,
          email: check_profile[0].my_profile_invoice.phone_number,
        }
        if(check_profile[0].my_profile_invoice.tax){
          this.arrayTax.push(check_profile[0].my_profile_invoice.tax+' %');
        }
      }
      this.route.params.subscribe(async (params: Params) => {
        const walletId = params['walletId'];
        this.receiveWallet = await this.walletProvider.getWalletByWalletId(walletId);
        const token = params['tokenName'];
        this.walletType = token ? [token, this.selectedType] : [this.receiveWallet.walletType, this.selectedType];
        const price = await this.exchange.getExchangeRate(this.walletType[0]);
        this.isUnknownToken = price === 0;
        this.isLoading = true;

        this.updateQR();
      });
    } catch (error) {
      console.log(error);
    }

  }

  updateQR() {
    if (!this.receiveWallet) {
      return;
    }
    const qrInfo = this.getQRCodeInfo();
    this.encodeQrCode(qrInfo);
  }

  async onChangeTokenData(isChangeAmount: boolean, e: any) {
    if (isChangeAmount) this.enteredAmount = e.target.value;
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
    this.sharing.share('image', null, qrSrc, null).then(() => {
      // TODO:
    }).catch((error) => {
      console.log('onShare error', error);
    });
  }
  onEdit() {
    this.router.navigateByUrl('/tabnav/setting/invoice-profile');
  }
  async shareQRCode() {
    if (!this.receiveWallet) {
      return;
    }
    const qrInfo = this.getQRCodeInfo();
    return this.encodeQr(qrInfo);
  }

  getQRCodeInfo(): string {
    let amountCurrency;
    let amountCrypto;
    if (this.walletType[0] === this.selectedType) {
      amountCurrency = this.checkUndefined(this.amountCrypto);
      amountCrypto = this.checkUndefined(this.amountCurrency);
    } else {
      amountCurrency = this.checkUndefined(this.amountCurrency);
      amountCrypto = this.checkUndefined(this.amountCrypto);
    }

    const qrInfo = {
      data: {
        address: this.receiveWallet.walletAddress,
        amountCurrency,
        amountCrypto,
        selectedTax: this.selectedTax, // default tax is set to 10%
        name: this.recipientName,
        msg: this.message,
        userInfo: this.user,
        type: this.selectedType,
      },
    };
    return JSON.stringify(qrInfo);
  }

  async encodeQr(qrInfo) {
    this.encodeQrCode(qrInfo);
    return this.qrCode.src;
  }

  private encodeQrCode(infoQR) {
    this.qrCode = kjua({
      size: 256,
      text: infoQR,
      fill: '#000',
      quiet: 0,
      ratio: 2,
    });
  }

  checkUndefined(value: any) {
    return value !== undefined ? value : '';
  }
}
