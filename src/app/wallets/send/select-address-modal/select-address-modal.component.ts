import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddressBookService } from 'src/app/services/address-book/address-book.service';

@Component({
  selector: 'app-select-address-modal',
  templateUrl: './select-address-modal.component.html',
  styleUrls: ['./select-address-modal.component.scss'],
})
export class SelectAddressModalComponent implements OnInit {
  @Input() selectedWalletType: string;
  addressesList;
  filteredAddresses;

  constructor(private addressBookService: AddressBookService, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.addressesList = this.addressBookService.getAllSameCryptoAddresses(this.selectedWalletType);
    this.filteredAddresses = this.addressesList;
    console.log('select adddress modal: getAllSameCryptoAddresses', this.addressesList);
  }

  close() {
    this.modalCtrl.dismiss();
  }

  onSearchAddress(e: any) {
    const inputVal = e.detail.value.toLowerCase();

    if (inputVal && inputVal.trim() !== '') {
      this.filteredAddresses = this.addressesList.filter((address) => {
        return (
          address.address.toLowerCase().indexOf(inputVal) > -1 ||
          address.holderName.toLowerCase().indexOf(inputVal) > -1 ||
          (address.description && address.description.toLowerCase().indexOf(inputVal) > -1)
        );
      });
    } else {
      this.filteredAddresses = this.addressesList;
    }
  }

  onSelectAddress(address) {
    // get back the whole address object: might use later for transction data
    this.modalCtrl.dismiss(address, 'confirm');
  }
}
