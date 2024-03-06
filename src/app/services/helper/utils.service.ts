import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(
    private toastCtrl: ToastController,
    private translate: TranslateService,
  ) { }

  async showAddressCopyMessage() {
    const t = await this.translate.get(['alerts.address_is_copied']).toPromise();
    this.toastCtrl
      .create({
        message: t['alerts.address_is_copied'],
        duration: 3000,
        position: 'top',
        cssClass: 'address-copied-toast',
      })
      .then((toastEl) => {
        toastEl.present();
      });
  }
  async showEmailCopy(msg: string) {
    const t = await this.translate.get(['alerts.address_is_copied']).toPromise();
    this.toastCtrl
      .create({
        message: msg,
        duration: 3000,
        position: 'top',
        cssClass: 'address-copied-toast',
      })
      .then((toastEl) => {
        toastEl.present();
      });
  }

  /**
   * Validates an URL
   * @static
   * @param {*} rawUrl
   * @return {boolean}
   */
  private validateUrl(rawUrl: string): boolean {
    const regStr =
      '^' + // position at start
      '(https?:\\/\\/)?' + //protocol
      '((([a-zA-Z\\d]{1,}([-\\.]{1}[a-zA-Z\\d]{1,})*\\.[a-zA-Z]+)' + // domain name
      '|((\\d{1,3}\\.){3}\\d{1,3}))' + // ip(v4) address
      '(\\:\\d+)?)' + // port
      '|localhost\\:\\d+'; // localhost:7890
    const pattern = new RegExp(regStr, 'i');
    return pattern.test(rawUrl);
  }

  /**
   * Get full node url and add missing pieces
   * @param {string} fromUrl
   * @return {string}
   */
  public getNodeUrl(fromUrl: string): string {
    let fixedUrl =
      -1 === fromUrl.indexOf('://') ? 'http://' + fromUrl : fromUrl;

    fixedUrl = !fixedUrl.match(/https?:\/\/[^:]+:([0-9]+)\/?$/)
      ? fixedUrl + ':7890' // default port :7890
      : fixedUrl;

    if (!this.validateUrl(fixedUrl)) return null;
    const url = new URL(fixedUrl);
    return url.hostname;
  }
}
