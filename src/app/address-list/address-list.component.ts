import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Address } from '../services/models/address.modal';
import { AddressBookService } from '../services/address-book/address-book.service';

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
    private route: ActivatedRoute
  ) {}

  ngOnInit() {}

  onSearchAddress(event: any) {
    this.filteredAddresses = this.addressesListService.filteredAddresses(event.target.value);
  }

  navToDetail(id: string) {
    this.router.navigate(['/tabnav', 'address-book', id], { relativeTo: this.route });
  }
}
