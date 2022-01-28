import { Component, OnInit } from '@angular/core';

import { PinProvider } from '@app/services/pin/pin.provider';
import { BiometryProvider } from '@app/services/biometry/biometry.provider';

@Component({
  selector: 'app-security',
  templateUrl: './security.page.html',
  styleUrls: ['./security.page.scss'],
})
export class SecurityPage implements OnInit {
  biometryType: string;
  enableBiometry: boolean = false;

  constructor(private pin: PinProvider, private biometry: BiometryProvider) {}

  ngOnInit() {
    this.initBiometry();
  }

  async initBiometry() {
    const biometryType = await this.biometry.getBiometryType();
    this.biometryType = `Enable ${biometryType || 'Touch'} ID`;
    this.enableBiometry = await this.biometry.getIsEnableBiometry();
  }

  async onChangePin() {
    await this.pin.changePin();
  }

  async toggleBiometryChange() {
    this.enableBiometry = await this.biometry.checkEnableBiometry(
      this.enableBiometry
    );
    await this.biometry.setIsEnableBiometry(this.enableBiometry);
  }
}
