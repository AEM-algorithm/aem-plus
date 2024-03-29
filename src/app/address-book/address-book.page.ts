// modules
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AlertController,
  IonItemSliding,
  LoadingController,
  PopoverController,
} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import { Subscription } from 'rxjs';

// services
import { ContactService } from '../services/contact/contact.service';
import { Contact } from '@app/services/models/contact.modal';

// components
import {DeleteHintPopoverComponent} from '@app/address-book/delete-hint-popover/delete-hint-popover.component';

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
    private alertCtrl: AlertController,
    private translate: TranslateService,
    private popoverController: PopoverController
  ) {
    this.setLoading(true);
  }

  ngOnInit() {
    this.routeSubscribe = this.route.queryParams.subscribe(async (_) => {
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
      this.contactList = this.contactList.filter(
        (value) =>
          value.firstName.toLowerCase() === keyword.toLowerCase() ||
          value.lastName.toLowerCase() === keyword.toLowerCase()
      );
    } else {
      this.getContacts();
    }
  }

  navToDetail(id: string) {
    this.router.navigate(['/tabnav', 'address-book', id], {
      relativeTo: this.route,
    });
  }

  async onDeleteContact(contactId: number, slidingItem: IonItemSliding) {
    const t = await this.translate.get([
      'address_book.confirm_delete_address',
      'address_book.delete',
      'address_book.cancel',
      'address_book.deleting_contact',
      'address_book.delete_failed_message',
    ]).toPromise();
    await slidingItem.close();
    const alter = await this.alertCtrl.create({
      message: t['address_book.confirm_delete_address'],
      buttons: [
        {
          text: t['address_book.cancel'],
        },
        {
          text: t['address_book.delete'],
          handler: async () => {
            const loading = await this.loadingCtrl.create({
              message: t['address_book.deleting_contact'],
              spinner: 'circles',
            });
            await loading.present();

            try {
              await this.contactService.deleteContactById(contactId);
              await this.getContacts();
              await loading.dismiss();
            } catch (err) {
              // catch any errors:
              this.deleteContactFailedAlert(t['address_book.delete_failed_message']);
            }
          },
        },
      ],
    });

    await alter.present();
  }

  private async deleteContactFailedAlert(message: string) {
    const t = await this.translate.get(['address_book.delete_failed_header', 'common.ok']).toPromise();
    await this.alertCtrl.create({
      header: t['address_book.delete_failed_header'],
      message,
      buttons: [t['common.ok']],
    });
  }

  ngOnDestroy() {
    if (this.addressesChangedSub) {
      this.addressesChangedSub.unsubscribe();
    }
    this.routeSubscribe.unsubscribe();
  }

  async handlePresentDeleteHintPopoverOnClick(ev: any) {
    const popover = await this.popoverController.create({
      component: DeleteHintPopoverComponent,
      // cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
    });
    await popover.present();
    const { role } = await popover.onDidDismiss();
  }
}
