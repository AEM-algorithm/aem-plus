import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-add-wallet-multisig',
  templateUrl: './add-wallet-multisig.page.html',
  styleUrls: ['./add-wallet-multisig.page.scss'],
})
export class AddWalletMultisigPage implements OnInit {
  showSelect = false;
  showCoin = false;
  coin: any;
  error = false;
  messageError : any;
  credentials = {
    username: '',
    password: '',

  };
  constructor(
    private router: Router,
    private storage: Storage,) { }

  ngOnInit() {
  }

  selectCoin() {

    if (!this.showSelect) {
      this.showSelect = true;
    }
    else {
      this.showSelect = false;
    }
  }
  chooseCoin(coinSelect) {
    this.showCoin = true;
    switch (coinSelect) {
      case 'btc':
        coinSelect = 'Bitcoin (BTC)';
        break;
      case 'xem':
        coinSelect = 'NEM (XEM)'
        break;
      case 'eth':
        coinSelect = 'Ethereum (ETH)'
        break;

      default:
        break;
    }
    this.coin = coinSelect;
    this.showSelect = false;

  }

  continue() {
    if(this.checkRequired()){
      this.error = true;
    }
    else{
      this.storage.remove('address-signer');
      this.error = false;
      this.router.navigateByUrl('/tabnav/wallets/add-signer/?a');
    }
  }
  checkRequired() {
    if(!this.credentials.username){
      this.messageError = 'Please input customer name';
      return true
    }
    else if(!this.coin){
      this.messageError = 'Please choose currency type';
      return true
    }
    else if(!this.credentials.password){
      this.messageError = 'Please input password';
      return true
    }
    else{
      return false
    }
  }
}
