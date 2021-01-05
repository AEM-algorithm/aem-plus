import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {
  constructor() {}

  ngOnInit() {}

  // TODO: generate mnemonic method
  onGenerateMnemonic() {
    console.log('generating...');
  }

  // TODO: Show enter pin modal
  onEnterPin() {
    console.log('show pin modal');
  }
}
