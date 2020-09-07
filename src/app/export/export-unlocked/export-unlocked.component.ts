import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-export-unlocked',
  templateUrl: './export-unlocked.component.html',
  styleUrls: ['./export-unlocked.component.scss'],
})
export class ExportUnlockedComponent implements OnInit {
  exportForm: FormGroup;

  constructor() {}

  ngOnInit() {
    this.exportForm = new FormGroup({
      dateFrom: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      dateTo: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      currenciesSelect: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      currencyPayment: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      // option:
      description: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.maxLength(180)],
      }),
    });
  }
}
