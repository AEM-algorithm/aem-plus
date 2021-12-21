import { Component, OnInit } from '@angular/core';
import { Storage } from "@ionic/storage";
import { Address } from '../../../../../services/models/address.modal';
import { ContactService } from '../../../../../services/contact/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WalletProvider } from '@app/services/wallets/wallet.provider';
import { Coin } from '@app/enums/enums';
@Component({
  selector: 'app-add-consignator',
  templateUrl: './add-consignator.page.html',
  styleUrls: ['./add-consignator.page.scss'],
})
export class AddConsignatorPage implements OnInit {
  isLoading = true;
  selectedCoin: any;
  addressesList: Address[];
  address: any;
  showList = false;
  enableBtn = false;
  isSearch = false;
  constructor(
    private addressesBookService: ContactService,
    private router: Router,
    private storage: Storage,
    private route: ActivatedRoute,
    private wallet: WalletProvider,
  ) { }

  async ngOnInit() {
    const addressSigner = await this.storage.get("address-signer");
    this.selectedCoin = addressSigner.selectCoin;
  }

  async onSearchAddress(event: any) {
    this.address = event.target.value;
    this.isSearch = true;
    this.enableBtn = this.wallet.checkValidAddress(this.address, this.selectedCoin);
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
