import { Injectable } from '@angular/core';
import Web3 from 'web3';

@Injectable({ providedIn: 'root' })
export class BnbProvider {
  web3: any;
  constructor() {
    this.web3 = new Web3(Web3.givenProvider);
  }

  public isValidPrivateKey(privateKey: string) {
    let isValid = false;
    const addressInfo = this.web3.eth.accounts.privateKeyToAccount(privateKey);
    console.log(addressInfo, 'addressInfo');
    if (addressInfo.address) {
      isValid = true;
    } else {
      isValid = false;
    }
    return isValid;
  }
}
