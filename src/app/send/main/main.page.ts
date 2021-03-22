import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  selectedType = 'AUD';
  amountType = [];

  constructor() { }

  ngOnInit() {

    this.amountType = [
      {
        value: 'AUD',
      },
      {
        value: 'XEM',
      },
    ];

  }

  onSelectType(e: any) {
    this.selectedType = e.detail.value;
  }

}
