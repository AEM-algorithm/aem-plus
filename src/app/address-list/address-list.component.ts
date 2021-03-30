import { Component, OnInit } from '@angular/core';

import { addressList } from '../services/dummyData/address-list.data'
import { AddressList} from '../services/models/address-list.modal'

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss'],
})
export class AddressListComponent implements OnInit {

  addressList: AddressList[] = addressList;

  constructor() { }

  ngOnInit() {}

}
