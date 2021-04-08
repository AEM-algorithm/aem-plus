import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.page.html',
  styleUrls: ['./add-contact.page.scss'],
})
export class AddContactPage implements OnInit {
  addContactForm: FormGroup;

  constructor() {}

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
}
