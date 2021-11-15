import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
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
  isShow = false;
  constructor(
    private storage: Storage,
  ) { }

  async ngOnInit() {
    let check_profile = await this.storage.get('Profile');
    console.log(check_profile)
    if(!check_profile){
      await this.storage.set('Profile',[]);
    }
   
    this.isShow = true;
   
    this.profileForm = new FormGroup({
      fname: new FormControl('',Validators.required ),
      lname: new FormControl('',Validators.required),
      email: new FormControl('',Validators.email),
      phone: new FormControl('',Validators.required),
      add1: new FormControl(''),
      add2: new FormControl(''),
      suburd: new FormControl(''),
      state: new FormControl(''),
      postcode: new FormControl('')
    });
  }
  onSubmit(){
    console.log('clcik')
    console.log(this.profileForm.value)
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
    console.log(this.profileForm.value)
  }
}
