import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { SettingProvider } from '@app/services/setting/setting.provider';

@Component({
  selector: 'app-transaction-fee',
  templateUrl: './transaction-fee.page.html',
  styleUrls: ['./transaction-fee.page.scss'],
})
export class TransactionFeePage implements OnInit {
  minimumFee: number;
  maximumFee: number;
  disabled: boolean;

  constructor(
    private setting: SettingProvider,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.initValue();
  }

  private async initValue() {
    const fees = await this.setting.getFees({ minFee: null, maxFee: null });
    this.minimumFee = fees.minFee;
    this.maximumFee = fees.maxFee;
    this.disabled = true;
  }

  minimumChange(e) {
    if (e.detail.value > this.maximumFee) {
      this.disabled = true;
      return;
    }
    this.minimumFee = e.detail.value;
    this.disabled = this.minimumFee?.toString().length < 1;
  }

  maximumChange(e) {
    if (e.detail.value < this.minimumFee) {
      this.disabled = true;
      return;
    }
    this.maximumFee = e.detail.value;
    this.disabled = this.maximumFee?.toString().length < 1;
  }

  saveTransactionFeesConfig() {
    this.setting.setFees({
      minFee: this.minimumFee,
      maxFee: this.maximumFee,
    });
    this.navCtrl.back();
  }
}
