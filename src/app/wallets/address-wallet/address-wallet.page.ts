import { Component, OnInit } from '@angular/core';
import { Address } from '../../services/models/address.modal';
import { AddressBookService } from '../../services/address-book/address-book.service';
import { Subscription } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-address-wallet',
  templateUrl: './address-wallet.page.html',
  styleUrls: ['./address-wallet.page.scss'],
})
export class AddressWalletPage implements OnInit {
  isLoading = true;
  addressesList: Address[];
  private addressesChangedSub: Subscription;
  constructor(
    private addressesBookService: AddressBookService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    setTimeout(async () => {
      try {
        this.addressesList = await this.addressesBookService.getAddressesList();
        this.isLoading = false;
      } catch (err) {
        // Handle any errors here:
        // this.loadingDataFailedAlter('Fetching data failed, please try again');
      }
    }, 500);

    this.addressesChangedSub = this.addressesBookService.addressesChanged.subscribe((newAddresses: Address[]) => {
      this.addressesList = newAddresses;
    });
  }

  navToDetail(id: string) {
    this.router.navigate(['/tabnav', 'wallets', 'send-request-multisig', id], { relativeTo: this.route });
  }

}
