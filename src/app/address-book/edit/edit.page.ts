import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { ContactService } from '@app/services/contact/contact.service';
import { FileProvider } from '@app/services/file/file.provider';

import { ContactWallets, Contact } from '@app/services/models/contact.modal';

import { WALLET_ICON } from '@app/constants/constants';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit, OnDestroy {
  editForm: FormGroup;
  contact: Contact;
  contactWallets: ContactWallets[];

  imageUrl: string;
  contactId: string;
  walletIcon = WALLET_ICON;

  routeSubscribe: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contactService: ContactService,
    private navCtrl: NavController,
    private fileProvider: FileProvider
  ) {}

  ngOnInit() {
    this.routeSubscribe = this.route.params.subscribe(async (params) => {
      this.contactId = params.id;
      await this.getContact(params.id);
      this.initFormData();
    });

    this.editForm = new FormGroup({
      firstName: new FormControl('', {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      lastName: new FormControl('', {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      companyName: new FormControl('', {
        updateOn: 'blur',
      }),
      email: new FormControl('', {
        updateOn: 'blur',
      }),
      phone: new FormControl('', {
        updateOn: 'blur',
      }),
      ABNNumber: new FormControl('', {
        updateOn: 'blur',
      }),
      companyAddress: new FormControl('', {
        updateOn: 'blur',
      }),
    });
  }

  async getContact(id: string) {
    this.contact = await this.contactService.getContactById(id);
  }

  initFormData() {
    if (!this.contact) {
      return;
    }
    this.imageUrl = this.contact.image;
    this.editForm.get('firstName').setValue(this.contact.firstName);
    this.editForm.get('lastName').setValue(this.contact.lastName);
    this.editForm.get('companyName').setValue(this.contact.companyName);
    this.editForm.get('email').setValue(this.contact.email);
    this.editForm.get('phone').setValue(this.contact.phone);
    this.editForm.get('ABNNumber').setValue(this.contact.ABNNumber);
    this.editForm.get('companyAddress').setValue(this.contact.companyAddress);
    this.contactWallets = this.contact.wallets;
  }

  async selectAvatar() {
    const image = await this.fileProvider.imagePicker();
    if (image) {
      this.imageUrl = image;
    }
  }

  walletAddressOnChanged(e, wallet: ContactWallets) {
    const address = e.detail.value;
    const newWallets = this.contact.wallets.map((value) => {
      if (value.id === wallet.id) {
        return { ...value, address };
      }
      return value;
    });
    this.contact.wallets = newWallets;
  }

  walletDescriptionOnChanged(e, wallet: ContactWallets) {
    const description = e.detail.value;
    const newWallets = this.contact.wallets.map((value) => {
      if (value.id === wallet.id) {
        return { ...value, description };
      }
      return value;
    });
    this.contact.wallets = newWallets;
  }

  async onSave() {
    const contact = new Contact(
      this.contact.id,
      this.imageUrl,
      this.editForm.get('firstName').value,
      this.editForm.get('lastName').value,
      this.editForm.get('ABNNumber').value,
      this.editForm.get('email').value,
      this.editForm.get('phone').value,
      this.editForm.get('companyAddress').value,
      this.editForm.get('companyName').value,
      this.contact.wallets
    );
    await this.contactService.updateContactById(contact);
    this.navCtrl.back();
  }

  ngOnDestroy() {
    this.routeSubscribe.unsubscribe();
  }
}
