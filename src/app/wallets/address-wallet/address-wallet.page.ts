import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import _ from 'lodash';

import { Storage } from '@ionic/storage';

import { Contact } from '../../services/models/contact.modal';
import { ContactService } from '../../services/contact/contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-address-wallet',
  templateUrl: './address-wallet.page.html',
  styleUrls: ['./address-wallet.page.scss'],
})
export class AddressWalletPage implements OnInit {
  isLoading = true;
  contactList: Contact[];
  availableAddress: any[]
  private addressesChangedSub: Subscription;
  constructor(
    private storage: Storage,
    private addressesBookService: ContactService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    setTimeout(async () => {
      try {
        const addresses = [];
        const addressSigners = await this.storage.get("address-signer");
        const selectedCoin = addressSigners.selectedCoin;
        let savedContacts = await this.addressesBookService.getContacts();
        this.isLoading = false;
        if (!savedContacts || savedContacts.length == 0) throw new Error("Not found any contact");
        let localContacts = savedContacts.filter(value => !_.isEmpty(value.wallets));
        localContacts.forEach(contact => {
          contact.wallets.forEach(contactWallet => {
            if (_.isEqual(contactWallet.type, selectedCoin)) {
              addresses.push({
                image: contact.image,
                firstName: contact.firstName,
                lastName: contact.lastName,
                address: contactWallet.address,
                description: contactWallet.description,
              });
            }
          });
        });
        this.availableAddress = addresses;
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
