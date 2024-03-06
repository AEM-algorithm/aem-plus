import { Component, OnInit } from '@angular/core';
import { ClipboardProvider } from '@app/services/clipboard/clipboard.provider';
import { UtilsService } from '@app/services/helper/utils.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
})
export class ContactUsPage implements OnInit {

  constructor(
    private clipboard: ClipboardProvider,
    private utils: UtilsService,
  ) { }

  ngOnInit() {
  }
  async handleCopyOnClick() {
    await this.clipboard.copy('info@aemalgorithm.io');
    await this.utils.showEmailCopy('Email is copied!');
  }

}
