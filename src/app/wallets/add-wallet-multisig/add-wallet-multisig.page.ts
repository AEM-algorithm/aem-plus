import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-wallet-multisig',
  templateUrl: './add-wallet-multisig.page.html',
  styleUrls: ['./add-wallet-multisig.page.scss'],
})
export class AddWalletMultisigPage implements OnInit {
  showSelect = false;
  constructor() { }

  ngOnInit() {
  }

  selectCoin(){
    
    if(!this.showSelect){
      this.showSelect = true;
    }
    else{
      this.showSelect = false;
    }
  }
}
