import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AddressBookService } from 'src/app/services/address-book/address-book.service';

@Component({
  selector: 'app-choose-address-modal',
  templateUrl: './choose-address-modal.component.html',
  styleUrls: ['./choose-address-modal.component.scss'],
})
export class ChooseAddressModalComponent implements OnInit {
  @Input() selectedWalletType: string;
  addressesList;
  filteredAddresses;

  constructor(
    private modalCtrl: ModalController,
    private addressBookService: AddressBookService,
    private router: Router
  ) {}

  ngOnInit() {
    this.addressesList = this.addressBookService.getAddressesList();
  }

  close() {
    this.modalCtrl.dismiss();
  }
  onSearchAddress(e: any) {
    // search contact
    console.log('searching....');
  }

  onChooseAddress(id: string) {
    this.router.navigateByUrl(`/tabnav/address-book/${id}`);
    this.close();
  }
}
