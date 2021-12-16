import { Component, OnInit } from '@angular/core';
import { Address } from '../../../../../services/models/address.modal';
import { ContactService } from '../../../../../services/contact/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-add-consignator',
  templateUrl: './add-consignator.page.html',
  styleUrls: ['./add-consignator.page.scss'],
})
export class AddConsignatorPage implements OnInit {
  isLoading = true;
  addressesList: Address[];
  address: any;
  showList = false;
  enableBtn = false;
  isSearch = false;
  constructor(
    private addressesBookService: ContactService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {

  }
  async onSearchAddress(event: any) {
    this.isSearch = true;
    // this.addressesList = await this.addressesBookService.filteredAddresses(event.target.value);
  }

  chooseAddress() {
    this.router.navigate(['/tabnav', 'wallets', 'address-wallet'], {});
    return;
  }
  add() {
    this.router.navigate(['/tabnav', 'wallets', 'add-signer', this.address], { relativeTo: this.route });
    return;
  }
  navToDetail(add) {
    this.enableBtn = true;
    this.address = add;
    // this.router.navigate(['/tabnav','wallets', 'add-signer', address], { relativeTo: this.route });
  }
}
