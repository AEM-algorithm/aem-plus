import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Wallet } from 'src/app/services/models/wallet.model';
import { Token } from '../../services/models/token.model';
import { WalletsService } from 'src/app/services/wallets/wallets.service';
import { SelectAddressModalComponent } from './select-address-modal/select-address-modal.component';
import { FormControl, FormGroup } from '@angular/forms';
import { Transaction } from 'src/app/services/models/transaction.model';

// --- original flow:
import { ChooseAddressModalComponent } from './choose-address-modal/choose-address-modal.component';
import { ConfirmTransactionModalComponent } from './confirm-transaction-modal/confirm-transaction-modal.component';
@Component({
  selector: 'app-send',
  templateUrl: './send.page.html',
  styleUrls: ['./send.page.scss'],
})
export class SendPage implements OnInit {
  // selectedWallet = {
  //   walletType: 'AUD',
  //   walletName: 'WalletName',
  //   walletAddress: 'dfasdfasdfasdfsdfsdfasdfasd',
  //   walletBalance: [100, 0.553],
  // };

  selectedType = 'AUD';
  amount = 0.0;

  selectedWallet: Wallet;
  isTokenSelected = false; // determine select a walllet or token

  selectedToken: Token;

  cryptoBanlance: number;
  audBanlance: number;

  transformedWalletData: {};

  // transaction data:
  //  --- form & form inputs:
  sendForm: FormGroup;
  amountAud: number;
  amountCrypto: number;
  receiverName: string;
  //  --- others:
  tax: number;
  ABNNum: number;
  businessName: string;

  constructor(
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private walletsService: WalletsService,
    private alertCtrl: AlertController
  ) {}

  private formInit() {
    this.sendForm = new FormGroup({
      // from: new FormControl(this.selectedWallet.walletAddress),
      receiverAddress: new FormControl(null),
      amountType: new FormControl(this.selectedType),
      amount: new FormControl(null),
      // amountCrypto: new FormControl(null),
      // amountAud: new FormControl(null),
      description: new FormControl(null), // optional
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.selectedWallet = this.walletsService.getWallet(params.get('walletId'));

      this.cryptoBanlance = this.selectedWallet.walletBalance[1];
      this.audBanlance = this.selectedWallet.walletBalance[0];

      this.transformedWalletData = this.selectedWallet;

      if (params.has('tokenId')) {
        this.isTokenSelected = true;
        // get the selected token:
        this.selectedToken = this.walletsService.getToken(this.selectedWallet, params.get('tokenId'));
        // console.log('send token page:', this.selectedToken);
        this.cryptoBanlance = this.selectedToken.balance[1];
        this.audBanlance = this.selectedToken.balance[0];
      }
    });

    this.formInit();
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  onSelectType(e: any) {
    this.selectedType = e.detail.value;
    // console.log('selected type:', this.selectedType);
  }

  onEnterAmount(e: any) {
    //  according to the seleted amount type to get amount in both crypto & aud value
    // TODO:
    //   1. reduce the selecetd wallet or token amount
    //   2. based on selected amount type, do the calculation for the other type of amount
    //         ---- isTokenSelected?

    //   3. calculate tax based on the amount user entered.
    //   4. calculate/generate the fee----backend ?????

    // --- get the selected type:
    const enteredAmount = e.target.value;
    if (this.selectedType === 'AUD') {
      this.amountAud = enteredAmount;
      this.amountCrypto = enteredAmount / 5000; // mock the calculation
      this.amount = this.amountCrypto; // show crypto amount on view
    } else {
      this.amountCrypto = enteredAmount;
      this.amountAud = enteredAmount * 5000; // mock the calculation
      this.amount = this.amountAud; // show aud amount on the view
    }
    //  --- calculate the tax:
    this.tax = (this.amountAud * 0.1) / (1 + 0.1);
    //  --- update user's wallet / token balance:
  }

  showAddressList() {
    this.modalCtrl
      .create({
        component: SelectAddressModalComponent, // one step to choose an address
        // component: ChooseAddressModalComponent, // original design
        cssClass: 'height-sixty-modal',
        componentProps: {
          selectedWalletType: this.selectedWallet.walletType,
        },
      })
      .then((modal) => {
        modal.present();
        // get back the selected address
        return modal.onDidDismiss();
      })
      .then((modalData) => {
        if (modalData.role === 'confirm') {
          // get the data & add to the form value:
          console.log('the selected address:', modalData.data);

          this.sendForm.get('receiverAddress').setValue(modalData.data.address);
          this.receiverName = modalData.data.holderName;
          this.ABNNum = modalData.data.ABNNum;
          this.businessName = modalData.data.businessName;
        }
      });
  }

  onSend() {
    console.log(this.sendForm.value);
    const tokenId = this.isTokenSelected ? this.selectedToken.id : null;

    // 1. re-structure the form data to a transaction object:
    const newTransaction: Transaction = {
      time: new Date().getTime(),
      incoming: false,
      address: this.selectedWallet.walletAddress,
      feeCrypto: 0.01, //hard code
      feeAud: 5, //hardcode
      amount: this.amountCrypto,
      hash: 'jsdfkljasdfasdfasdfasdfarfdadsfdf', //hard code
      confirmations: 9, //hard code
      amountAUD: this.amountAud,
      businessName: this.businessName,
      receiver: this.receiverName,
      receiverAddress: this.sendForm.value.receiverAddress,
      description: this.sendForm.value.description,
      ABN: this.ABNNum,
      tax: this.tax,
      tokenId: tokenId,
    };

    console.log('new trans:', newTransaction);

    // 2. open the comfirm alter window:
    this.modalCtrl
      .create({
        component: ConfirmTransactionModalComponent,
        componentProps: {
          transactionData: newTransaction,
          walletType: this.selectedWallet.walletType,
          walletId: this.selectedWallet.walletId,
        },
        cssClass: 'center-small-modal',
      })
      .then((modalEl) => {
        modalEl.present();
      });
  }
}
