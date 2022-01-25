import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonItemSliding, LoadingController } from '@ionic/angular';
import _ from 'lodash';

import { Subscription } from 'rxjs';

import { ContactService } from '../services/contact/contact.service';
import { Contact } from '@app/services/models/contact.modal';

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.page.html',
  styleUrls: ['./address-book.page.scss'],
})
export class AddressBookPage implements OnInit, OnDestroy {
  isLoading: boolean;
  contactList: Contact[];

  private addressesChangedSub: Subscription;
  private routeSubscribe: Subscription;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {
    this.setLoading(true);
  }

  ngOnInit() {
   this.routeSubscribe = this.route.queryParams.subscribe(async _ => {
     await this.getContacts();
     this.setLoading(false);
   });
  }

  async getContacts() {
    this.contactList = await this.contactService.getContacts();
  }

  setLoading(isLoading) {
    this.isLoading = isLoading;
  }

  onSearchAddress(event: any) {
    const keyword = event.detail.value;
    if (keyword) {
      this.contactList = this.contactList.filter((value) => value.firstName.toLowerCase() === keyword.toLowerCase() || value.lastName.toLowerCase() === keyword.toLowerCase());
    } else {
      this.getContacts();
    }
  }

  navToDetail(id: string) {
    this.router.navigate(['/tabnav', 'address-book', id], { relativeTo: this.route });
  }

  async onDeleteContact(contactId: number, slidingItem: IonItemSliding) {
    await slidingItem.close();
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
              await this.contactService.deleteContactById(contactId);
              await this.getContacts();
              await loading.dismiss();
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

  private deleteContactFailedAlert(message: string) {
    this.alertCtrl.create({
      header: 'Deletion failed',
      message,
      buttons: ['okay'],
    });
  }

  ngOnDestroy() {
    if (this.addressesChangedSub) {
      this.addressesChangedSub.unsubscribe();
    }
    this.routeSubscribe.unsubscribe();
  }
}
