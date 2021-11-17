import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Router, ActivatedRoute } from '@angular/router';

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
  listShow;
  isShow = false;
  isInclusive = false;
  isCheckIn;
  isCheckEx;
  constructor(
    private storage: Storage,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  async ngOnInit() {
    let check_profile = await this.storage.get('Profile');
    if (!check_profile) {
      await this.storage.set('Profile', [{
        "my_profile": {
          "fname": "",
          "lname": "",
          "email": "",
          "phone": "",
          "add1": "",
          "add2": "",
          "suburd": "",
          "state": "",
          "postcode": "",
        },
        "my_profile_invoice": {
          "business_name": "",
          "business_number": "",
          "company_address": "",
          "phone_number": "",
          "tax": "",
          "inclusive": "",
        }
      }]);
      this.listShow = {
        "my_profile_invoice": {
          "business_name": "",
          "business_number": "",
          "company_address": "",
          "phone_number": "",
          "tax": "",
          "inclusive": "",
        }
      };
    }
    else{
      this.listShow = check_profile[0].my_profile_invoice;
    }
    console.log(check_profile);
    
    this.isShow = true;
    if(this.listShow.inclusive){
      this.isInclusive = true
    }
    else{
      this.isInclusive = false
    }
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
 async onSubmit() {
    let check_profile = await this.storage.get('Profile');
    console.log(this.invoiceForm.value);
    this.invoiceForm.patchValue({
      business_name: this.invoiceForm.value.business_name,
      business_number: this.invoiceForm.value.business_number,
      company_address: this.invoiceForm.value.company_address,
      phone_number: this.invoiceForm.value.phone_number,
      tax: this.invoiceForm.value.tax,
      inclusive: this.isInclusive,
    });
    let json = {
      my_profile_invoice:this.invoiceForm.value,
      my_profile:check_profile[0].my_profile
    }
    console.log(json)
    this.storage.set('Profile',[json]);
    this.router.navigateByUrl('/tabnav/setting');

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

 async onChangeInput($event){

  }
}
