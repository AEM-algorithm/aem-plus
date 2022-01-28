import { Component, OnInit } from '@angular/core';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';
import { Platform } from '@ionic/angular';

import { ToastProvider } from '@app/services/toast/toast.provider';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
})
export class ContactUsPage implements OnInit {
  selectedFeedback: string;
  contact: string;

  constructor(
    private emailComposer: EmailComposer,
    private toast: ToastProvider,
    private platform: Platform
  ) {
    this.selectedFeedback = '';
    this.contact = 'info@aemalgorithm.io';
  }

  ngOnInit() {}

  async handleSelect(e) {
    if (e.detail.value) {
      this.selectedFeedback = e.detail.value;
    }
    try {
      const hasAccount = await this.emailComposer.hasAccount();
      if (!hasAccount) {
        if (this.platform.is('ios')) {
          this.toast.showMessageError(
            'Please add your email account (Settings -> Mail -> Accounts -> Add Account)',
            5000
          );
        }
      }
      const isRequestPermission = await this.emailComposer.requestPermission();
      console.log('isRequestPermission', isRequestPermission);
    } catch (e) {
      console.log('emailComposer:', e);
    }
  }

  async handleEmailOnClick() {
    try {
      const isOpen = await this.emailComposer.open({
        to: this.contact,
        isHtml: true,
      });
      console.log('isOpen', isOpen);
    } catch (e) {
      this.toast.showCatchError(e);
    }
  }
}
