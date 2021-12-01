import { Injectable } from '@angular/core';

import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

/*
 Generated class for the Alert provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular DI.
 */

@Injectable({ providedIn: 'root' })
export class AlertProvider {

  constructor(private alertCtrl: AlertController, private translate: TranslateService) {

  }

  showWalletNotSelectedAlert() {
    this.translate.get(['ALERT_NOT_WALLET_SELECTED', 'OK'], {}).subscribe(async (res) => {
      let alert = await this.alertCtrl.create({
        header: res['ALERT_NOT_WALLET_SELECTED'],
        buttons: [res['OK']]
      });

      await alert.present();
    });
  }

  showNodeDisconnectedAlert() {
    this.translate.get(['SHOW_NODE_DISCONNECTED', 'OK'], {}).subscribe(async (res) => {
      let alert = await this.alertCtrl.create({
        header: res['SHOW_NODE_DISCONNECTED'],
        buttons: [res['OK']]
      });

      await alert.present();
    });
  }

  showInvalidPasswordAlert() {

    this.translate.get(['ALERT_PROVIDED_PASSWORD_INVALID', 'OK'], {}).subscribe(async (res) => {
      let alert = await this.alertCtrl.create({
        header: res['ALERT_PROVIDED_PASSWORD_INVALID'],
        buttons: [res['OK']]
      });

      await alert.present();
    });
  }


  showMnemonicDoNotMatch() {
    this.translate.get(['ALERT_MNEMONIC_DO_NOT_MATCH', 'OK'], {}).subscribe(async (res) => {
      let alert = await this.alertCtrl.create({
        header: res['ALERT_MNEMONIC_DO_NOT_MATCH'],
        buttons: [res['OK']]
      });

      await alert.present();
    });
  }

  showPasswordDoNotMatch() {
    this.translate.get(['ALERT_PASSWORDS_DO_NOT_MATCH', 'OK'], {}).subscribe(async (res) => {
      let alert = await this.alertCtrl.create({
        header: res['ALERT_PASSWORDS_DO_NOT_MATCH'],
        buttons: [res['OK']]
      });

      await alert.present();
    });
  }

  showWalletNameAlreadyExists() {
    this.translate.get(['ALERT_WALLET_NAME_ALREADY_EXISTS', 'OK'], {}).subscribe(async (res) => {
      let alert = await this.alertCtrl.create({
        header: res['ALERT_WALLET_NAME_ALREADY_EXISTS'],
        buttons: [res['OK']]
      });

      await alert.present();
    });
  }

  showAlertDoesNotBelongToNetwork() {

    this.translate.get(['ALERT_WALLET_IS_NOT_INVALID_FOR_THIS_NETWORK', 'OK'], {}).subscribe(async (res) => {
      let alert = await this.alertCtrl.create({
        header: res['ALERT_WALLET_IS_NOT_INVALID_FOR_THIS_NETWORK'],
        buttons: [res['OK']]
      });

      await alert.present();
    });
  }

  showTransactionConfirmed() {

    this.translate.get(['ALERT_TRANSACTION_CONFIRMED', 'OK'], {}).subscribe(async (res) => {
      let alert = await this.alertCtrl.create({
        header: res['ALERT_TRANSACTION_CONFIRMED'],
        buttons: [res['OK']]
      });

      await alert.present();
    });

  }

  showDoesNotHaveEnoughFunds() {

    this.translate.get(['ALERT_ACCOUNT_DOES_NOT_HAVE_ENOUGH_FUNDS', 'OK'], {}).subscribe(async (res) => {
      let alert = await this.alertCtrl.create({
        header: res['ALERT_ACCOUNT_DOES_NOT_HAVE_ENOUGH_FUNDS'],
        buttons: [res['OK']]
      });

      await alert.present();
    });

  }

  showMessageTooLarge() {
    this.translate.get(['ALERT_SHOW_ATTACHED_MESSAGE_IS_TOO_LARGE', 'OK'], {}).subscribe(async (res) => {
      let alert = await this.alertCtrl.create({
        header: res['ALERT_SHOW_ATTACHED_MESSAGE_IS_TOO_LARGE'],
        buttons: [res['OK']]
      });

      await alert.present();
    });
  }

  showMosaicNotTransferable() {
    this.translate.get(['ALERT_MOSAIC_IS_NOT_TRANSFERABLE', 'OK'], {}).subscribe(async (res) => {
      let alert = await this.alertCtrl.create({
        header: res['ALERT_MOSAIC_IS_NOT_TRANSFERABLE'],
        buttons: [res['OK']]
      });

      await alert.present();
    });
  }

  showBarCodeScannerRequiresPassword() {
    this.translate.get(['IMPORT_ACCOUNT_QR_WARNING', 'OK'], {}).subscribe(async (res) => {

      let alert = await this.alertCtrl.create({
        header: res['IMPORT_ACCOUNT_QR_WARNING'],
        buttons: [res['OK']]
      });
      await alert.present();
    });

  }


  showInvalidPrivateKey() {
    this.translate.get(['ALERT_INVALID_PRIVATE_KEY', 'OK'], {}).subscribe(async (res) => {
      let alert = await this.alertCtrl.create({
        header: res['ALERT_INVALID_PRIVATE_KEY'],
        buttons: [res['OK']]
      });

      await alert.present();
    });
  }

  showWeakPassword() {
    this.translate.get(['ALERT_WEAK_PASSWORD', 'OK'], {}).subscribe(async (res) => {
      let alert = await this.alertCtrl.create({
        header: res['ALERT_WEAK_PASSWORD'],
        buttons: [res['OK']]
      });

      await alert.present();
    });
  }

  showFunctionallityOnlyAvailableInMobileDevices() {
    this.translate.get(['ALERT_ONLY_MOBILE_DEVICE', 'OK'], {}).subscribe(async (res) => {
      let alert = await this.alertCtrl.create({
        header: res['ALERT_ONLY_MOBILE_DEVICE'],
        buttons: [res['OK']]
      });

      await alert.present();
    });
  }

  showContactAlreadyExists() {
    this.translate.get(['ALERT_CONTACT_ALREADY_EXISTS', 'OK'], {}).subscribe(async (res) => {
      let alert = await this.alertCtrl.create({
        header: res['ALERT_CONTACT_ALREADY_EXISTS'],
        buttons: [res['OK']]
      });

      await alert.present();
    });
  }


  showOnPhoneDisconnected() {
    this.translate.get(['ALERT_PHONE_DISCONNECTED', 'ALERT_SUBTITLE_PHONE_DISCONNECTED', 'OK'], {}).subscribe(async (res) => {
      let alert = await this.alertCtrl.create({
        header: res['ALERT_PHONE_DISCONNECTED'],
        subHeader: res['ALERT_SUBTITLE_PHONE_DISCONNECTED'],
        buttons: [res['OK']]
      });
      await alert.present();
    });
  }

  showNoTransactionsFound() {
    this.translate.get(['ALERT_NO_TRANSACTIONS', 'OK'], {}).subscribe(async res => {
      let alert = await this.alertCtrl.create({
        header: res['ALERT_NO_TRANSACTIONS'],
        buttons: [res['OK']]
      });
      await alert.present();
    });
  }

  showErrorRetrievingCurrencyPrices() {
    this.translate.get(['ERROR_RETRIEVING_PRICES', 'OK'], {}).subscribe(async res => {
      let alert = await this.alertCtrl.create({
        header: res['ERROR_RETRIEVING_PRICES'],
        buttons: [res['OK']]
      });
      await alert.present();
    });
  }

  showError(error) {
    this.translate.get('OK', {}).subscribe(async (res) => {
      let alert = await this.alertCtrl.create({
        header: error,
        buttons: [res]
      });
      await alert.present();
    });

  }

  showIncorrectPassword() {
    this.translate.get(['INCORRECT_PASSWORD', 'OK'], {}).subscribe(async res => {
      const alert = await this.alertCtrl.create({
        header: res['INCORRECT_PASSWORD'],
        buttons: [res['OK']]
      });
      await alert.present();
    });
  }

  showInvalidNode() {
    this.translate.get(['SHOW_NODE_INVALID', 'OK'], {}).subscribe(async res => {
      const alert = await this.alertCtrl.create({
        header: res['SHOW_NODE_INVALID'],
        buttons: [res['OK']]
      });
      await alert.present();
    });
  }
}
