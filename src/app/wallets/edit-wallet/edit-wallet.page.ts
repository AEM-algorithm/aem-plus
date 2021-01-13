import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-wallet',
  templateUrl: './edit-wallet.page.html',
  styleUrls: ['./edit-wallet.page.scss'],
})
export class EditWalletPage implements OnInit {
  // Dummy data for dev
  selectedWallet = {
    type: 'BTC',
    // type: 'NEM',
    // type: 'ETH',
    name: 'MyBTC wallet',
    privateKey: 'sdfnskldfsakldfds',
    mnemonic: ['word', 'any', 'fine', 'okay', 'good', 'bad', 'worse', 'page', 'in', 'it', 'image'],
  };

  constructor() {}

  ngOnInit() {}
}
