import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { AlertController, IonItemSliding, LoadingController } from '@ionic/angular';

import { Address } from '../services/models/address.modal';
import { AddressBookService } from '../services/address-book/address-book.service';

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.page.html',
  styleUrls: ['./address-book.page.scss'],
})
export class AddressBookPage implements OnInit, OnDestroy {
  isLoading = true;
  addressesList: Address[];

  private addressesChangedSub: Subscription;

  constructor(
    private addressesBookService: AddressBookService,
    private router: Router,
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.loadingCtrl
      .create({
        message: 'fetching address book data...',
        spinner: 'circles',
      })
      .then((loadingEl) => {
        loadingEl.present();
        try {
          this.addressesList = this.addressesBookService.getAddressesList();
          this.isLoading = false;
          loadingEl.dismiss();
          // throw new Error(); // testing error alert
        } catch (err) {
          // handle any errors here:
          loadingEl.dismiss();
          this.loadingDataFailedAlter('Fetching data failed, please try again');
        }

        this.addressesChangedSub = this.addressesBookService.addressesChanged.subscribe((newAddresses: Address[]) => {
          this.addressesList = newAddresses;
        });
      });
  }

  ionViewWillEnter() {
    this.addressesList = this.addressesBookService.getAddressesList();
  }

  onSearchAddress(event: any) {
    this.addressesList = this.addressesBookService.filteredAddresses(event.target.value);
  }

  navToDetail(id: string) {
    this.router.navigate(['/tabnav', 'address-book', id], { relativeTo: this.route });
  }
  async onDeleteContact(contactId: string, slidingItem: IonItemSliding) {
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
              duration: 2000,
              spinner: 'circles',
            });
            await loading.present();

            try {
              this.addressesBookService.deleteAContact(contactId);
            } catch (err) {
              // catch any errors:
            }
            this.router.navigateByUrl('/tabnav/address-book');
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

  ngOnDestroy() {
    if (this.addressesChangedSub) {
      this.addressesChangedSub.unsubscribe();
    }
  }
}
