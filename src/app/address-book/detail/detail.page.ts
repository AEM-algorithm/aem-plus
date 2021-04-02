import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddressBookService } from 'src/app/services/address-book/address-book.service';
import { Address } from 'src/app/services/models/address.modal';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  address: Address;

  constructor(private route: ActivatedRoute, private addressesBookService: AddressBookService) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.address = this.addressesBookService.getAddress(params['id']);
      console.log(this.address);
    });
  }
}
