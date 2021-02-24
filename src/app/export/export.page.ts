import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-export',
  templateUrl: './export.page.html',
  styleUrls: ['./export.page.scss'],
})
export class ExportPage implements OnInit {
  exportForm: FormGroup;
  constructor() {}

  ngOnInit() {}

  onContinue() {}
}
