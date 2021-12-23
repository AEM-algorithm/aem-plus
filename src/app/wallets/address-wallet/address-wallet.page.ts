import { Component, OnInit } from '@angular/core';
import { Contact } from '../../services/models/contact.modal';
import { ContactService } from '../../services/contact/contact.service';
import { Subscription } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-address-wallet',
  templateUrl: './address-wallet.page.html',
  styleUrls: ['./address-wallet.page.scss'],
})
export class AddressWalletPage implements OnInit {
  isLoading = true;
  contactList: Contact[];
  private addressesChangedSub: Subscription;
  constructor(
    private addressesBookService: ContactService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    setTimeout(async () => {
      try {
        this.contactList = await this.addressesBookService.getContacts();
        this.isLoading = false;
      } catch (err) {
        console.log(err)
        // Handle any errors here:
        // this.loadingDataFailedAlter('Fetching data failed, please try again');
      }
    }, 500);

    // TODO
    // this.addressesChangedSub = this.addressesBookService.addressesChanged.subscribe((newAddresses: Address[]) => {
    //   this.addressesList = newAddresses;
    // });
  }

  navToDetail(id: string) {
    this.router.navigate(['/tabnav', 'wallets', 'send-request-multisig', id], { relativeTo: this.route });
  }

}
