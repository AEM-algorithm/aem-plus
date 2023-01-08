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
  constructor(
    private alertCtrl: AlertController,
    private translate: TranslateService
  ) {}

  showWalletNotSelectedAlert() {
    this.translate
      .get(['common.alert_not_wallet_selected', 'common.ok'], {})
      .subscribe(async (res) => {
        const alert = await this.alertCtrl.create({
          header: res['common.alert_not_wallet_selected'],
          buttons: [res['common.ok']],
        });

        await alert.present();
      });
  }

  showNodeDisconnectedAlert() {
    this.translate
      .get(['common.show_node_disconnected', 'common.ok'], {})
      .subscribe(async (res) => {
        const alert = await this.alertCtrl.create({
          header: res['common.show_node_disconnected'],
          buttons: [res['common.ok']],
        });

        await alert.present();
      });
  }

  showInvalidPasswordAlert() {
    this.translate
      .get(['common.alert_provided_password_invalid', 'common.ok'], {})
      .subscribe(async (res) => {
        const alert = await this.alertCtrl.create({
          header: res['common.alert_provided_password_invalid'],
          buttons: [res['common.ok']],
        });

        await alert.present();
      });
  }

  showMnemonicDoNotMatch() {
    this.translate
      .get(['common.alert_mnemonic_do_not_match', 'common.ok'], {})
      .subscribe(async (res) => {
        const alert = await this.alertCtrl.create({
          header: res['common.alert_mnemonic_do_not_match'],
          buttons: [res['common.ok']],
        });

        await alert.present();
      });
  }

  showPasswordDoNotMatch() {
    this.translate
      .get(['common.alert_passwords_do_not_match', 'common.ok'], {})
      .subscribe(async (res) => {
        const alert = await this.alertCtrl.create({
          header: res['common.alert_passwords_do_not_match'],
          buttons: [res['common.ok']],
        });

        await alert.present();
      });
  }

  showWalletNameAlreadyExists() {
    this.translate
      .get(['common.alert_wallet_name_already_exists', 'common.ok'], {})
      .subscribe(async (res) => {
        const alert = await this.alertCtrl.create({
          header: res['common.alert_wallet_name_already_exists'],
          buttons: [res['common.ok']],
        });

        await alert.present();
      });
  }

  showAlertDoesNotBelongToNetwork() {
    this.translate
      .get(['common.alert_wallet_is_not_invalid_for_this_network', 'common.ok'], {})
      .subscribe(async (res) => {
        const alert = await this.alertCtrl.create({
          header: res['common.alert_wallet_is_not_invalid_for_this_network'],
          buttons: [res['common.ok']],
        });

        await alert.present();
      });
  }

  showTransactionConfirmed() {
    this.translate
      .get(['common.alert_transaction_confirmed', 'common.ok'], {})
      .subscribe(async (res) => {
        const alert = await this.alertCtrl.create({
          header: res['common.alert_transaction_confirmed'],
          buttons: [res['common.ok']],
        });

        await alert.present();
      });
  }

  showDoesNotHaveEnoughFunds() {
    this.translate
      .get(['common.alert_account_does_not_have_enough_funds', 'common.ok'], {})
      .subscribe(async (res) => {
        const alert = await this.alertCtrl.create({
          header: res['common.alert_account_does_not_have_enough_funds'],
          buttons: [res['common.ok']],
        });

        await alert.present();
      });
  }

  showMessageTooLarge() {
    this.translate
      .get(['common.alert_show_attached_message_is_too_large', 'common.ok'], {})
      .subscribe(async (res) => {
        const alert = await this.alertCtrl.create({
          header: res['common.alert_show_attached_message_is_too_large'],
          buttons: [res['common.ok']],
        });

        await alert.present();
      });
  }

  showMosaicNotTransferable() {
    this.translate
      .get(['common.alert_mosaic_is_not_transferable', 'common.ok'], {})
      .subscribe(async (res) => {
        const alert = await this.alertCtrl.create({
          header: res['common.alert_mosaic_is_not_transferable'],
          buttons: [res['common.ok']],
        });

        await alert.present();
      });
  }

  showBarCodeScannerRequiresPassword() {
    this.translate
      .get(['common.import_account_qr_warning', 'common.ok'], {})
      .subscribe(async (res) => {
        const alert = await this.alertCtrl.create({
          header: res['common.import_account_qr_warning'],
          buttons: [res['common.ok']],
        });
        await alert.present();
      });
  }

  showInvalidPrivateKey() {
    this.translate
      .get(['common.alert_invalid_private_key', 'common.ok'], {})
      .subscribe(async (res) => {
        const alert = await this.alertCtrl.create({
          header: res['common.alert_invalid_private_key'],
          buttons: [res['common.ok']],
        });

        await alert.present();
      });
  }

  showWeakPassword() {
    this.translate
      .get(['ALERT_WEAK_PASSWORD', 'OK'], {})
      .subscribe(async (res) => {
        let alert = await this.alertCtrl.create({
          header: res['ALERT_WEAK_PASSWORD'],
          buttons: [res['OK']],
        });

        await alert.present();
      });
  }

  showFunctionallityOnlyAvailableInMobileDevices() {
    this.translate
      .get(['common.alert_only_mobile_device', 'common.ok'], {})
      .subscribe(async (res) => {
        const alert = await this.alertCtrl.create({
          header: res['common.alert_only_mobile_device'],
          buttons: [res['common.ok']],
        });

        await alert.present();
      });
  }

  showContactAlreadyExists() {
    this.translate
      .get(['common.alert_contact_already_exists', 'common.ok'], {})
      .subscribe(async (res) => {
        const alert = await this.alertCtrl.create({
          header: res['common.alert_contact_already_exists'],
          buttons: [res['common.ok']],
        });

        await alert.present();
      });
  }

  showOnPhoneDisconnected() {
    this.translate
      .get(
        ['common.alert_phone_disconnected', 'common.alert_subtitle_phone_disconnected', 'common.ok'],
        {}
      )
      .subscribe(async (res) => {
        const alert = await this.alertCtrl.create({
          header: res['common.alert_phone_disconnected'],
          subHeader: res['common.alert_subtitle_phone_disconnected'],
          buttons: [res['common.ok']],
        });
        await alert.present();
      });
  }

  showNoTransactionsFound() {
    this.translate
      .get(['common.alert_no_transactions', 'common.ok'], {})
      .subscribe(async (res) => {
        const alert = await this.alertCtrl.create({
          header: res['common.alert_no_transactions'],
          buttons: [res['common.ok']],
        });
        await alert.present();
      });
  }

  showErrorRetrievingCurrencyPrices() {
    this.translate
      .get(['common.error_retrieving_prices', 'common.ok'], {})
      .subscribe(async (res) => {
        const alert = await this.alertCtrl.create({
          header: res['common.error_retrieving_prices'],
          buttons: [res['common.ok']],
        });
        await alert.present();
      });
  }

  showError(error) {
    this.translate.get('common.ok', {}).subscribe(async (res) => {
      const alert = await this.alertCtrl.create({
        header: error,
        buttons: [res],
      });
      await alert.present();
    });
  }

  showIncorrectPassword() {
    this.translate
      .get(['common.incorrect_password', 'common.ok'], {})
      .subscribe(async (res) => {
        const alert = await this.alertCtrl.create({
          header: res['common.incorrect_password'],
          buttons: [res['common.ok']],
        });
        await alert.present();
      });
  }

  showInvalidNode() {
    this.translate
      .get(['common.show_node_invalid', 'common.ok'], {})
      .subscribe(async (res) => {
        const alert = await this.alertCtrl.create({
          header: res['common.show_node_invalid'],
          buttons: [res['common.ok']],
        });
        await alert.present();
      });
  }
}
