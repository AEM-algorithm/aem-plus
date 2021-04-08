import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ModalController, Platform, ToastController } from '@ionic/angular';

import { Clipboard } from '@ionic-native/clipboard/ngx';
import { Plugins } from '@capacitor/core';

import { AddressBookService } from 'src/app/services/address-book/address-book.service';
import { Address } from 'src/app/services/models/address.modal';
import { AddAddressModalComponent } from '../add-address-modal/add-address-modal.component';

const { Share } = Plugins;

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  address: Address;

  constructor(
    private route: ActivatedRoute,
    private addressesBookService: AddressBookService,
    private clipboard: Clipboard,
    private toastCtrl: ToastController,
    private plt: Platform,
    private modlaCtrl: ModalController
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.address = this.addressesBookService.getAddress(params['id']);
      console.log('detail page loaded addree:', this.address);
    });
  }

  onCopyAddress(address: string) {
    this.clipboard.copy(address);
    this.toastCtrl
      .create({
        message: 'Address is copied!',
        duration: 3000,
        position: 'top',
      })
      .then((toastEl) => {
        toastEl.present();
      });
  }

  async onShareAddress(address: string) {
    if (!this.plt.is('cordova')) {
      console.log('Share funciton is not available on web');
      return;
    }

    await Share.share({
      title: 'Share Address',
      text: address,
    });
  }

  onOpenAddAddressModal() {
    this.modlaCtrl
      .create({
        component: AddAddressModalComponent,
        cssClass: 'height-sixty-modal',
        componentProps: {
          selectedContact: this.address,
        },
      })
      .then((modal) => {
        modal.present();
      });
  }
}
