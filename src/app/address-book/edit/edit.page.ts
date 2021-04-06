import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AddressBookService } from 'src/app/services/address-book/address-book.service';
import { Address } from 'src/app/services/models/address.modal';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  editForm: FormGroup;

  addresses: Address;
  id: string;

  constructor(private route: ActivatedRoute, private addressBookService: AddressBookService) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];

      this.addresses = this.addressBookService.getAddress(this.id);

      let walletsAddresses = new FormArray([]);

      //---- edit form creation:
      //  1. group the wallets' addresses
      for (let address of this.addresses.walletsList) {
        walletsAddresses.push(
          new FormGroup({
            type: new FormControl(address.type),
            address: new FormControl(address.address, [Validators.required]),
            note: new FormControl(address.note),
          })
        );
      }

      this.editForm = new FormGroup({
        name: new FormControl(this.addresses.name, {
          updateOn: 'blur',
          validators: [Validators.required],
        }),
        email: new FormControl(this.addresses.companyName, {
          updateOn: 'blur',
          validators: [Validators.required],
        }),
        ABNNum: new FormControl(this.addresses.ABNNum, {
          updateOn: 'blur',
          validators: [Validators.required],
        }),
        companyName: new FormControl(this.addresses.companyName, {
          updateOn: 'blur',
          validators: [Validators.required],
        }),
        companyAddress: new FormControl(this.addresses.companyAddress, {
          updateOn: 'blur',
          validators: [Validators.required],
        }),
        walletsAddresses: walletsAddresses,
      });
    });
  }

  getAddressControls() {
    // console.log(<FormArray>this.editForm.get('walletsAddresses'));
    return (<FormArray>this.editForm.get('walletsAddresses')).controls;
  }
}
