import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

import { ContactService } from '@app/services/contact/contact.service';
import { ContactWallets, Contact } from '@app/services/models/contact.modal';

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
  contactWallets: ContactWallets[];
  walletIcon = WALLET_ICON;
  isImage = false;
  imageUrl;

  constructor(
    private contactService: ContactService,
    private modalCtrl: ModalController,
    private router: Router,
    private fileProvider: FileProvider,
  ) {
    this.contactWallets = [];
  }

  ngOnInit() {
    this.addContactForm = new FormGroup({
      firstName: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      lastName: new FormControl(null, {
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
        componentProps: {},
      })
      .then((modal) => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then((modalData) => {
        if (modalData.role === 'confirm') {
          this.isAddAddress = true;

          const wallet: ContactWallets = {
            id: new Date().getTime(),
            type: modalData.data.walletType,
            address: modalData.data.address,
            description: modalData.data.description,
          };
          this.contactWallets.push(wallet);
        }
      });
  }

  async onSelectImage(){
    const image = await this.fileProvider.imagePicker();
    this.imageUrl = image;
  }
  async onSaveNewContact() {
    const newContact = new Contact(
      new Date().getTime(),
        this.imageUrl,
        this.addContactForm.value.firstName,
        this.addContactForm.value.lastName,
        this.addContactForm.value.ABNNum,
        this.addContactForm.value.email,
        this.addContactForm.value.phone,
        this.addContactForm.value.companyAddress,
        this.addContactForm.value.companyName,
        this.contactWallets,
    );
    await this.contactService.addNewContact(newContact);
    await this.router.navigateByUrl('/tabnav/address-book');
  }
  onScan(){
    this.router.navigateByUrl('/qr-code-scan');
  }
}
