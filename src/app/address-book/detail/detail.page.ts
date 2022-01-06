import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, ModalController, Platform } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { Subscription } from 'rxjs';

import { AddAddressModalComponent } from '../add-address-modal/add-address-modal.component';

import { Contact, ContactWallets } from '@app/services/models/contact.modal';
import { ContactService } from '@app/services/contact/contact.service';
import { LoadingProvider } from '@app/services/loading/loading.provider';

import { UtilsService } from 'src/app/services/helper/utils.service';
import { WALLET_ICON } from '@app/constants/constants';

const { Share } = Plugins;

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit, OnDestroy {
  contact: Contact;
  contactId: string;
  isLoading: boolean;

  walletIcon = WALLET_ICON;

  // walletsAddresses: walletAddress[];

  private routeSubscribe: Subscription;

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private clipboard: Clipboard,
    private plt: Platform,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private utilService: UtilsService,
    private loading: LoadingProvider,
  ) {
    this.setLoading(true);
    this.contact = new Contact(null, '', '', '', null, '', '', '', '', []);
  }

  ngOnInit() {
    this.routeSubscribe = this.route.params.subscribe(async (params) => {
      this.contactId = params.id;
      await this.getContact();
      this.setLoading(false);
    });
  }

  async getContact() {
    this.contact = await this.contactService.getContactById(this.contactId);
  }

  setLoading(isLoading) {
    this.isLoading = isLoading;
  }

  onCopyAddress(address: string) {
    this.clipboard.copy(address);
    this.utilService.showAddressCopyMessage();
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
    this.modalCtrl
      .create({
        component: AddAddressModalComponent,
        cssClass: 'height-sixty-modal',
        componentProps: {},
      })
      .then((modal) => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then(async (modalData) => {
        if (modalData.role === 'confirm') {
          const wallet: ContactWallets = {
            id: new Date().getTime(),
            type: modalData.data.type,
            address: modalData.data.address,
            description: modalData.data.description,
          };
          await this.contactService.addNewWalletByContactId(wallet, this.contactId);
          await this.getContact();
        }
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
              spinner: 'circles',
            });
            await loading.present();

            try {
              // this.contactServicce.deleteAnAddressFromContact(this.address.id, address);
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
    this.routeSubscribe.unsubscribe();
  }
}
