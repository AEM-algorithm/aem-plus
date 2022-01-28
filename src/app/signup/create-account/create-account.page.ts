import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { generateMnemonic } from 'bip39';

import { AlertProvider } from 'src/app/services/alert/alert.provider';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {
  mnemonic;

  constructor(
    public alertProvider: AlertProvider,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.onGenerateMnemonic();
    // this.mnemonic = 'alpha pull service immense leisure item orbit target museum wink quantum angle';
  }

  ngOnInit() {}

  onGenerateMnemonic() {
    this.mnemonic = generateMnemonic();
  }

  onContinue() {
    this.router.navigate(['/signup/verify-create-account/'], {
      queryParams: {
        mnemonic: this.mnemonic,
      },
    });
  }
}
