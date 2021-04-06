import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddressBookService } from 'src/app/services/address-book/address-book.service';
import { Address } from 'src/app/services/models/address.modal';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  address: Address;
  id: string;

  constructor(private route: ActivatedRoute, private addressBookService: AddressBookService) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];

      this.address = this.addressBookService.getAddress(this.id);
    });
  }
}
