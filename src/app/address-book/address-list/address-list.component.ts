import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Address } from 'src/app/services/models/address.modal';
import { AddressBookService } from 'src/app/services/address-book/address-book.service';
import { IonItemSliding, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss'],
})
export class AddressListComponent implements OnInit {
  @Input() filteredAddresses: Address[];

  constructor(
    private addressesListService: AddressBookService,
    private router: Router,
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

  onSearchAddress(event: any) {
    this.filteredAddresses = this.addressesListService.filteredAddresses(event.target.value);
  }

  navToDetail(id: string) {
    this.router.navigate(['/tabnav', 'address-book', id], { relativeTo: this.route });
  }

  onDelecteContact(contactId: string, slidingItem: IonItemSliding) {
    slidingItem.close();

    this.loadingCtrl
      .create({
        message: 'deleting the contact...',
        duration: 2000,
      })
      .then((loadingEl) => {
        loadingEl.present();
        this.addressesListService.deleteAContact(contactId);
      });
  }
}
