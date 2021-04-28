import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';
import { NavController } from '@ionic/angular';

import { AddressBookService } from 'src/app/services/address-book/address-book.service';
import { Address } from 'src/app/services/models/address.modal';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit, OnDestroy {
  editForm: FormGroup;
  addresses: Address; // this contact info
  id: string;

  private contactChangedSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private addressBookService: AddressBookService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.addresses = this.addressBookService.getAddress(this.id);
    });

    this.contactChangedSub = this.addressBookService.contactChanged.subscribe((newContact: Address) => {
      this.addresses = newContact;
    });

    let walletsAddresses = new FormArray([]);
    //   -------  group the wallets' addresses
    for (let address of this.addresses.walletsAddresses) {
      walletsAddresses.push(
        new FormGroup({
          type: new FormControl(address.type),
          address: new FormControl(address.address, [Validators.required]),
          description: new FormControl(address.description),
        })
      );
    }

    this.editForm = new FormGroup({
      name: new FormControl(this.addresses.name, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      ABNNum: new FormControl(this.addresses.ABNNum, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      email: new FormControl(this.addresses.email, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),

      companyAddress: new FormControl(this.addresses.companyAddress, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      companyName: new FormControl(this.addresses.companyName, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      walletsAddresses: walletsAddresses,
    });
  }

  getAddressControls() {
    // console.log('get control props:', (<FormArray>this.editForm.get('walletsAddresses')).controls);//value:
    // value: {
    //   address: 'zidiNEMaskdjfksladgjklasdfasdfsdf';
    //   description: 'business';
    //   type: 'NEM';
    // }
    return (<FormArray>this.editForm.get('walletsAddresses')).controls;
  }

  onSave() {
    const editAddressData = new Address(
      this.id,
      this.editForm.value['name'],
      this.editForm.value['ABNNum'],
      this.editForm.value['email'],
      this.editForm.value['companyAddress'],
      this.editForm.value['companyName'],
      this.editForm.value['walletsAddresses']
    );

    this.addressBookService.updateAddress(this.id, editAddressData);

    this.navCtrl.back();
  }

  ngOnDestroy() {
    if (this.contactChangedSub) {
      this.contactChangedSub.unsubscribe();
    }
  }
}
