import { Component, Input, OnInit } from '@angular/core';

import { Address } from '../services/models/address.modal';
import { addressesList } from '../services/dummyData/address-list.data';
import { AddressBookService } from '../services/address-book/address-book.service';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss'],
})
export class AddressListComponent implements OnInit {
  @Input() filteredAddresses: Address[];
  // addressList: Address[] = addressesList;
  // addressList: Address[];

  constructor(private addressesListService: AddressBookService) {}

  ngOnInit() {
    // this.addressList = this.addressesListService.getAddressesList();
  }

  onSearchAddress(event: any) {
    this.filteredAddresses = this.addressesListService.filteredAddresses(event.target.value);
  }
}
