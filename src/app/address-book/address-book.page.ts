import { Component, OnInit } from '@angular/core';
import { AddressBookService } from '../services/address-book/address-book.service';
import { Address } from '../services/models/address.modal';

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.page.html',
  styleUrls: ['./address-book.page.scss'],
})
export class AddressBookPage implements OnInit {
  addressesList: Address[];

  constructor(private addressesBookService: AddressBookService) {}

  ngOnInit() {
    this.addressesList = this.addressesBookService.getAddressesList();
  }
}
