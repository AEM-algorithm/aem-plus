import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Wallet } from 'src/app/services/models/wallet.model';
import { Token } from '../../services/models/token.model';
import { WalletsService } from 'src/app/services/wallets/wallets.service';
import { SelectAddressModalComponent } from './select-address-modal/select-address-modal.component';
import { ChooseAddressModalComponent } from './choose-address-modal/choose-address-modal.component';
import { FormControl, FormGroup } from '@angular/forms';
import { Transaction } from 'src/app/services/models/transaction.model';

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

  // form & form inputs:
  sendForm: FormGroup;
  amountAud: number;
  amountCrypto: number;
  receiverName: string;

  constructor(
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private walletsService: WalletsService
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
  onEnterAmount(e: any) {
    //  according to the seleted amount type to get amount in both crypto & aud value
  }

  onSelectType(e: any) {
    this.selectedType = e.detail.value;
    console.log('selected type:', this.selectedType);
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
        }
      });
  }

  onSend() {
    console.log(this.sendForm.value);
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
      businessName: '', // TODO: need to extract this info from contact
      receiver: this.receiverName,
      recevierAddress: this.sendForm.value.reveiverAddress,
      description: this.sendForm.value.description,
      ABN: '', // TODO: need to extract this info from contact
      tax: 22, //TODO: calculate after enter the amount
      tokenId: '', // TODO: check if select token or wallet
    };
    // 2. add the new trans to this wallet
  }
}
