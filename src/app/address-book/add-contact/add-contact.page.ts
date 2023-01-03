import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ContactService } from '@app/services/contact/contact.service';
import { ContactWallets, Contact } from '@app/services/models/contact.modal';
import { MemoryProvider } from '@app/services/memory/memory.provider';
import { WalletProvider } from '@app/services/wallets/wallet.provider';
import { ToastProvider } from '@app/services/toast/toast.provider';

import { AddAddressModalComponent } from '../add-address-modal/add-address-modal.component';
import { FileProvider } from '@app/services/file/file.provider';

import { WALLET_ICON } from '@app/constants/constants';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.page.html',
  styleUrls: ['./add-contact.page.scss'],
})
export class AddContactPage implements OnInit, OnDestroy {
  @ViewChild('content') private content: any;

  addContactForm: FormGroup;
  isAddAddress: boolean = false;
  contactWallets: ContactWallets[];
  walletIcon = WALLET_ICON;
  isImage = false;
  imageUrl;

  private routeSubscription: Subscription;

  constructor(
    private contactService: ContactService,
    private modalCtrl: ModalController,
    private router: Router,
    private fileProvider: FileProvider,
    private route: ActivatedRoute,
    private memory: MemoryProvider,
    private wallet: WalletProvider,
    private toast: ToastProvider
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

    this.routeSubscription = this.route.paramMap.subscribe((params) => {
      if (this.memory.hasData()) {
        this.observeQRCodeResult();
      }
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  private async observeQRCodeResult() {
    const rawAddress = this.memory.getData().toString();
    const walletType = this.wallet.getWalletTypeByRawAddress(rawAddress);
    if (walletType) {
      const wallet: ContactWallets = {
        id: new Date().getTime(),
        type: walletType,
        address: rawAddress,
        description: '',
      };
      this.addContactWallet(wallet);
    } else {
      this.toast.showMessageError('QRCode is not valid');
    }
    this.memory.setResetData();
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
          this.addContactWallet(modalData.data);
        }
      });
  }

  private addContactWallet(data: ContactWallets) {
    this.isAddAddress = true;

    const wallet: ContactWallets = {
      id: new Date().getTime(),
      type: data.type,
      address: data.address,
      description: data.description,
    };
    this.contactWallets.push(wallet);
    setTimeout(() => {
      this.content.scrollToBottom(300);
    }, 500);
  }

  async onSelectImage() {
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
      this.contactWallets
    );
    await this.contactService.addNewContact(newContact);
    await this.router.navigateByUrl('/tabnav/address-book');
  }
  onScan() {
    this.router.navigateByUrl('/qr-code-scan');
  }
}
