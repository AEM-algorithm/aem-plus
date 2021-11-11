import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { walletAddress } from 'src/app/services/models/address.modal';
import { Plugins } from '@capacitor/core';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { AlertController, LoadingController, ModalController, Platform } from '@ionic/angular';

import { Address } from 'src/app/services/models/address.modal';
import { AddressBookService } from 'src/app/services/address-book/address-book.service';
import { AddAddressModalComponent } from '../add-address-modal/add-address-modal.component';
import { UtilsService } from 'src/app/services/helper/utils.service';

import { LoadingProvider } from '@app/services/loading/loading.provider';
const { Share } = Plugins;

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit, OnDestroy {
  address: Address;
  isLoading = false;
  walletsAddresses: walletAddress[];
  private contactChangedSub: Subscription;
  constructor(
    private route: ActivatedRoute,
    private addressesBookService: AddressBookService,
    private clipboard: Clipboard,
    private plt: Platform,
    private modlaCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private ultisService: UtilsService,
    private loading: LoadingProvider,
  ) { }

  async ionViewWillEnter() {
    let id;
    await this.route.params.subscribe(async (params) => {
      id = params['id'];

    });
    this.address = await this.addressesBookService.getAddress(id);
    this.contactChangedSub = this.addressesBookService.contactChanged.subscribe((newContact: Address) => {
      this.address = newContact;
    });
    this.isLoading = true;
  }


  async ngOnInit() {

  }

  onCopyAddress(address: string) {
    this.clipboard.copy(address);
    this.ultisService.showAddressCopyMessage();
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
        return modal.onDidDismiss();
      })
      .then((modalData) => {
        if (modalData.role === 'confirm') {
          // this.isAddAddress = true;

          const walletAddress: walletAddress = {
            type: modalData.data.walletType,
            address: modalData.data.address,
            description: modalData.data.description,
          };
          this.walletsAddresses.push(walletAddress);
          console.log(this.walletsAddresses)
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
    console.log('1')
    if (this.contactChangedSub) {
      this.contactChangedSub.unsubscribe();
    }
  }
}
