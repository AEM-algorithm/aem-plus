import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

import { AddressBookService } from 'src/app/services/address-book/address-book.service';
import { walletAddress } from 'src/app/services/models/address.modal';

import { AddAddressModalComponent } from '../add-address-modal/add-address-modal.component';
import { FileProvider } from '@app/services/file/file.provider';

import { WALLET_ICON } from '@app/constants/constants';
@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.page.html',
  styleUrls: ['./add-contact.page.scss'],
})
export class AddContactPage implements OnInit {
  addContactForm: FormGroup;
  isAddAddress: boolean = false;
  walletsAddresses: walletAddress[];
  walletIcon = WALLET_ICON;
  isImage = false;
  imageBase64 = '';

  constructor(
    private modalCtrl: ModalController,
    private addressesBookService: AddressBookService,
    private router: Router,
    private fileProvider: FileProvider,
  ) {
    this.walletsAddresses = [];
  }

  ngOnInit() {
    this.addContactForm = new FormGroup({
      lname: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      fname: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      companyName: new FormControl(null, {
        updateOn: 'blur',
      }),
      email: new FormControl(null, {
        updateOn: 'blur',
      }),
      phone: new FormControl(null, {
        updateOn: 'blur',
      }),
      ABNNum: new FormControl(null, {
        updateOn: 'blur',
      }),

      companyAddress: new FormControl(null, {
        updateOn: 'blur',
      }),

    });
  }

  onOpenAddAddressModal() {
    this.modalCtrl
      .create({
        component: AddAddressModalComponent,
        cssClass: 'height-sixty-modal',
        componentProps: {
          contact: this.addContactForm.value,
          isNewContact: true,
        },
      })
      .then((modal) => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then((modalData) => {
        if (modalData.role === 'confirm') {
          this.isAddAddress = true;

          const walletAddress: walletAddress = {
            type: modalData.data.walletType,
            address: modalData.data.address,
            description: modalData.data.description,
          };
          this.walletsAddresses.push(walletAddress);
        }
      });
  }

  async onSelectImage(){
    let image = await this.fileProvider.imagePicker();
    this.isImage = true;
    this.imageBase64 = image;
  }
  onSaveNewContact() {
    this.addressesBookService.addNewContact(
      this.imageBase64,
      this.addContactForm.value['fname'],
      this.addContactForm.value['lname'],
      this.addContactForm.value['ABNNum'],
      this.addContactForm.value['email'],
      this.addContactForm.value['phone'],
      this.addContactForm.value['companyAddress'],
      this.addContactForm.value['companyName'],
      this.walletsAddresses
    );
    this.router.navigateByUrl('/tabnav/address-book');
  }
  onScan(){
    this.router.navigateByUrl('/qr-code-scan');
  }
}
