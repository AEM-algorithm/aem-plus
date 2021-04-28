import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { AddressBookService } from 'src/app/services/address-book/address-book.service';
import { Address } from 'src/app/services/models/address.modal';
import { AlertController, LoadingController } from '@ionic/angular';
import { Button } from 'protractor';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  editForm: FormGroup;
  addresses: Address; // this contact info
  id: string;

  constructor(
    private route: ActivatedRoute,
    private addressBookService: AddressBookService,
    private router: Router,
    private alterCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.addresses = this.addressBookService.getAddress(this.id);
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

  ionViewWillEnter() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.addresses = this.addressBookService.getAddress(this.id);
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

    this.router.navigate(['/tabnav', 'address-book', this.id]);
  }

  async onDeleteAddress(address: string) {
    const deleteAddressAlter = await this.alterCtrl.create({
      message: 'Are you sure you want to delete this address?',
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Delete',
          handler: async () => {
            const loading = await this.loadingCtrl.create({
              message: 'deleting address...',
              duration: 2000,
              spinner: 'circles',
            });
            await loading.present();

            try {
              this.addressBookService.deleteAnAddressFromContact(this.addresses.id, address);
            } catch (err) {
              // Catch any error here
            }
          },
        },
      ],
    });

    await deleteAddressAlter.present();
  }

  async onDeleteContact() {
    // this.addressBookService.deleteAContact();
    const alter = await this.alterCtrl.create({
      // header: 'Delete',
      message: 'Are you sure you want to delete this contact?',
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Delete',
          handler: async () => {
            const loading = await this.loadingCtrl.create({
              message: 'deleting contact...',
              duration: 2000,
              spinner: 'circles',
            });
            await loading.present();

            const { role, data } = await loading.onDidDismiss();
            console.log(role, data);

            try {
              this.addressBookService.deleteAContact(this.addresses.id);
            } catch (err) {
              // catch any errors
            }
            this.router.navigateByUrl('/tabnav/address-book');
          },
        },
      ],
    });

    await alter.present();
  }
}
