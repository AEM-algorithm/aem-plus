import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { AlertController, IonItemSliding, LoadingController } from '@ionic/angular';

import { Address } from '../services/models/address.modal';
import { AddressBookService } from '../services/address-book/address-book.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.page.html',
  styleUrls: ['./address-book.page.scss'],
})
export class AddressBookPage implements OnInit, OnDestroy {
  isLoading = true;
  addressesList;

  private addressesChangedSub: Subscription;

  constructor(
    private addressesBookService: AddressBookService,
    private router: Router,
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  async ionViewWillEnter() {
    try {
      this.addressesList = await this.addressesBookService.getAddressesList();
      this.isLoading = false;
    } catch (err) {
      // Handle any errors here:
      this.loadingDataFailedAlter('Fetching data failed, please try again');
    }

  this.addressesChangedSub = this.addressesBookService.addressesChanged.subscribe((newAddresses: Address[]) => {
    this.addressesList = newAddresses;
  });
  }

 async ngOnInit() {
    //  --- Fake http request:

  }

  onSearchAddress(event: any) {
    this.addressesList = this.addressesBookService.filteredAddresses(event.target.value);
  }

  navToDetail(id: string) {
    this.router.navigate(['/tabnav', 'address-book', id], { relativeTo: this.route });
  }
  async onDeleteContact(contactId: number, slidingItem: IonItemSliding) {
    slidingItem.close();

    const alter = await this.alertCtrl.create({
      message: 'Are you sure you want to delete this contact?',
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Delete',
          handler: async () => {
            const loading = await this.loadingCtrl.create({
              message: 'deleting contact...',
              spinner: 'circles',
            });
            await loading.present();

            try {
              this.addressesBookService.deleteAContact(contactId);
              loading.dismiss();
            } catch (err) {
              // catch any errors:
              this.deleteContactFailedAlert('Deletion failed, please try again');
            }
          },
        },
      ],
    });

    await alter.present();
  }

  private loadingDataFailedAlter(message: string) {
    this.alertCtrl
      .create({
        header: 'Fetching data failed',
        message: message,
        buttons: ['Okay'],
      })
      .then((alterEl) => {
        alterEl.present();
      });
  }

  private deleteContactFailedAlert(message: string) {
    this.alertCtrl.create({
      header: 'Deletion failed',
      message: message,
      buttons: ['okay'],
    });
  }

  ngOnDestroy() {
    if (this.addressesChangedSub) {
      this.addressesChangedSub.unsubscribe();
    }
  }
}
