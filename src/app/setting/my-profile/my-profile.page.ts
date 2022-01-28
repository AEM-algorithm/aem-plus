import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {
  profileForm: FormGroup;
  profileFormData: {
    fname: String;
    lname: String;
    email: String;
    phone: number;
    add1: String;
    add2: String;
    suburd: String;
    state: number;
    postcode: String;
  };
  listShowProfile;
  isShow = false;
  constructor(
    private storage: Storage,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    let check_profile = await this.storage.get('Setting');
    if (!check_profile) {
      await this.storage.set('Setting', [
        {
          my_profile: {
            fname: '',
            lname: '',
            email: '',
            phone: '',
            add1: '',
            add2: '',
            suburd: '',
            state: '',
            postcode: '',
            avatar: '',
          },
          my_profile_invoice: {
            business_name: '',
            business_number: '',
            company_address: '',
            phone_number: '',
            tax: '',
            inclusive: '',
          },
          currency: '',
          country: '',
        },
      ]);
      this.listShowProfile = {
        my_profile: {
          fname: '',
          lname: '',
          email: '',
          phone: '',
          add1: '',
          add2: '',
          suburd: '',
          state: '',
          postcode: '',
        },
      };
    } else {
      this.listShowProfile = check_profile[0].my_profile;
    }

    this.isShow = true;

    this.profileForm = new FormGroup({
      fname: new FormControl('', Validators.required),
      lname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
      phone: new FormControl('', Validators.minLength(9)),
      add1: new FormControl(''),
      add2: new FormControl(''),
      suburd: new FormControl(''),
      state: new FormControl(''),
      postcode: new FormControl(''),
    });
    this.profileForm.patchValue({});
  }
  async onSubmit() {
    try {
      let check_profile = await this.storage.get('Setting');
      this.profileForm.patchValue({
        fname: this.profileForm.value.fname,
        lname: this.profileForm.value.lname,
        email: this.profileForm.value.email,
        phone: this.profileForm.value.phone,
        add1: this.profileForm.value.add1,
        add2: this.profileForm.value.add2,
        suburd: this.profileForm.value.suburd,
        state: this.profileForm.value.state,
        postcode: this.profileForm.value.postcode,
      });
      let profile_json = {
        ...this.profileForm.value,
        avatar: check_profile[0].my_profile.avatar,
      };
      let json = {
        my_profile_invoice: check_profile[0].my_profile_invoice,
        my_profile: profile_json,
        currency: check_profile[0].currency,
        country: check_profile[0].country,
      };
      console.log(json);
      this.storage.set('Setting', [json]);
      this.router.navigateByUrl('/tabnav/setting');
    } catch (error) {
      console.log(console.log(error));
    }
  }

  onChangeInput(e) {}
}
