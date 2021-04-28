import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AlertController, LoadingController, ModalController, Platform, ToastController } from '@ionic/angular';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { Plugins } from '@capacitor/core';

import { Address } from 'src/app/services/models/address.modal';
import { AddressBookService } from 'src/app/services/address-book/address-book.service';
import { AddAddressModalComponent } from '../add-address-modal/add-address-modal.component';
import { Subscription } from 'rxjs';

const { Share } = Plugins;

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit, OnDestroy {
  address: Address;

  private contactChangedSub: Subscription;
  constructor(
    private route: ActivatedRoute,
    private addressesBookService: AddressBookService,
    private clipboard: Clipboard,
    private toastCtrl: ToastController,
    private plt: Platform,
    private modlaCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.address = this.addressesBookService.getAddress(params['id']);
    });

    this.contactChangedSub = this.addressesBookService.contactChanged.subscribe((newContact: Address) => {
      this.address = newContact;
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
          contact: this.address,
          isNewContact: false,
        },
      })
      .then((modal) => {
        modal.present();
      });
  }

  async onDeleteAddress(address: string) {
    const deleteAddressAlter = await this.alertCtrl.create({
      message: 'Are you sure you want to delete this address?',
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Delete',
          handler: async () => {
            const loading = await this.loadingCtrl.create({
              message: 'deleting address...',
              // duration: 2000,
              spinner: 'circles',
            });
            await loading.present();

            try {
              this.addressesBookService.deleteAnAddressFromContact(this.address.id, address);
              loading.dismiss();
            } catch (err) {
              // Catch any error here
            }
          },
        },
      ],
    });

    await deleteAddressAlter.present();
  }

  ngOnDestroy() {
    if (this.contactChangedSub) {
      this.contactChangedSub.unsubscribe();
    }
  }
}
