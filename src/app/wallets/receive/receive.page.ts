import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import * as kjua from 'kjua';

import { Wallet } from '@app/services/models/wallet.model';
import { WalletsService } from '../../services/wallets/wallets.service';
import { WalletProvider } from 'src/app/services/wallets/wallet.provider';
import { Storage } from '@ionic/storage';
import { WALLET_ICON } from 'src/app/constants/constants';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ExchangeProvider } from '@app/services/exchange/exchange.provider';

// import { Router, ActivatedRoute } from '@angular/router';

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
    private walletsService: WalletsService,
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
        this.isUnknownToken = price == 0;
        this.isLoading = true;
      });
    } catch (error) {
      console.log(error)
    }

  }

  private _encodeQrCode(infoQR) {
    this.qrCode = kjua({
      size: 256,
      text: infoQR,
      fill: '#000',
      quiet: 0,
      ratio: 2,
    });
  }

  updateQR() {
    if (!this.receiveWallet) {
      return;
    }
    const infoQR = {
      data: {
        address: this.receiveWallet.walletAddress,
        amountCurrency: this.walletType[0] === this.selectedType ? this.checkValue(this.amountCrypto) : this.checkValue(this.amountCurrency),
        amountCrypto: this.walletType[0] === this.selectedType ? this.checkValue(this.amountCurrency) : this.checkValue(this.amountCrypto),
        selectedTax: this.selectedTax, // default tax is set to 10%
        name: this.recipientName,
        msg: this.message,
        userInfo: this.user,
        type: this.selectedType,
      },
    };
    this._encodeQrCode(JSON.stringify(infoQR));
  }

  ionViewWillEnter() {
    this.updateQR();
  }

  async onChangeTokenData(isChangeAmount:boolean, e: any) {
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

  async onShare(f) {
    let a = await this.shareQRcode();
    this.sharing.share('image', null, a, null).then(() => {
      // Success!
    }).catch((error) => {
      // Error!
      console.log(error)
    });
  }
  onEdit() {
    this.router.navigateByUrl('/tabnav/setting/invoice-profile');
  }
  async shareQRcode() {
    if (!this.receiveWallet) {
      return;
    }

    const infoQR = JSON.stringify({
      data: {
        address: this.receiveWallet.walletAddress.toString(),
        amountCurrency: this.walletType[0] === this.selectedType ? this.checkValue(this.amountCrypto) : this.checkValue(this.amountCurrency),
        amountCrypto: this.walletType[0] === this.selectedType ? this.checkValue(this.amountCurrency) : this.checkValue(this.amountCrypto),
        selectedTax: this.selectedTax, // default tax is set to 10%
        name: this.recipientName,
        msg: this.message,
        userInfo: this.user,
        type: this.selectedType,
      },
    });
    return this.encodeQr(infoQR);
  }

  async encodeQr(infoQR) {
    this.qrCode = kjua({
      size: 256,
      text: infoQR,
      fill: '#000',
      quiet: 0,
      ratio: 2,
    });
    return this.qrCode.src;
  }

  checkValue(value: any) {
    return value !== undefined ? value : '';
  }
}
