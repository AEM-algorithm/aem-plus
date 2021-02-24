import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-export',
  templateUrl: './export.page.html',
  styleUrls: ['./export.page.scss'],
})
export class ExportPage implements OnInit {
  exportForm: FormGroup;
  constructor() {}

  ngOnInit() {
    this.exportForm = new FormGroup({
      dateFrom: new FormControl(null),
      dateTo: new FormControl(null),
      walletsExport: new FormControl(null), // can selecet multiple wallet
      paymentWallet: new FormControl(null),
    });
  }

  onSubmit() {
    console.log(this.exportForm);
  }
}
