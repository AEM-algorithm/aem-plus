import { Component, OnInit } from '@angular/core';

import { Address } from '../services/models/address.modal';
import { addressesList } from '../services/dummyData/address-list.data';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss'],
})
export class AddressListComponent implements OnInit {
  addressList: Address[] = addressesList;

  constructor() {}

  ngOnInit() {}
}
