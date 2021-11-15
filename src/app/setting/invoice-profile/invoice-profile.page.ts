import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-invoice-profile',
  templateUrl: './invoice-profile.page.html',
  styleUrls: ['./invoice-profile.page.scss'],
})
export class InvoiceProfilePage implements OnInit {
  invoiceForm: FormGroup;
  invoiceFormData: {
    business_name: String;
    business_number: number;
    company_address: String;
    phone_number: number;
    tax: String;
    inclusive: String
  };
  
  isInclusive = false;
  isCheckIn;
  isCheckEx;
  constructor(
    private storage: Storage,
  ) { }

  async ngOnInit() {
    let a = await this.storage.get('Profile');
    console.log(a)
    this.isCheckIn = true;
    this.isCheckEx = false;
    this.invoiceForm = new FormGroup({
      business_name: new FormControl('', Validators.required),
      business_number: new FormControl('', Validators.required),
      company_address: new FormControl(''),
      phone_number: new FormControl(''),
      tax: new FormControl(''),
      inclusive: new FormControl(''),
    });
  }
  onSubmit() {
    this.isInclusive
    this.invoiceForm.patchValue({
      business_name: this.invoiceForm.value.business_name,
      business_number: this.invoiceForm.value.business_number,
      company_address: this.invoiceForm.value.company_address,
      phone_number: this.invoiceForm.value.phone_number,
      tax: this.invoiceForm.value.tax,
      inclusive: this.isInclusive,
    });
  }
  _onCheckBox(e) {
    if (e == 'ex') {
      this.isCheckIn = false;
      this.isCheckEx = true;
    }
    else {
      this.isCheckIn = true;
      this.isCheckEx = false;
    }
  }
  onCheckBox(e) {
    if (e) {
      this.isInclusive = false;
    }
    else {
      this.isInclusive = true;
    }
    // if(e === 'ex'){
    //   this.isCheckIn = false;
    //   this.isCheckEx = true;
    // }
    // else{
    //   this.isCheckIn = true;
    //   this.isCheckEx = false;
    // }
  }
}
