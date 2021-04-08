import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { walletAddress } from 'src/app/services/models/address.modal';
import { AddAddressModalComponent } from '../add-address-modal/add-address-modal.component';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.page.html',
  styleUrls: ['./add-contact.page.scss'],
})
export class AddContactPage implements OnInit {
  addContactForm: FormGroup;
  isAddAddress: boolean = false;

  walletsAddresses: walletAddress[];

  constructor(private modalCtrl: ModalController) {
    this.walletsAddresses = [];
  }

  ngOnInit() {
    this.addContactForm = new FormGroup({
      name: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      email: new FormControl(null, {
        updateOn: 'blur',
      }),
      ABNNum: new FormControl(null, {
        updateOn: 'blur',
      }),

      companyAddress: new FormControl(null, {
        updateOn: 'blur',
      }),
      companyName: new FormControl(null, {
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
        console.log(modalData); // modalData= {data: {addressdata}, role:'confirm'}
        if (modalData.role === 'confirm') {
          // 1.  add the address data to the contact's walletsAddresses[]
          // 2. also have a state to manage if the address is empty, if not then show the address on the page

          this.isAddAddress = true;
          console.log(modalData.data);

          const walletAddress: walletAddress = {
            type: modalData.data.type,
            address: modalData.data.address,
            description: modalData.data.description,
          };

          this.walletsAddresses.push(walletAddress);
          console.log('after adding an address:', this.walletsAddresses);
        }
      });
  }
}
