import { Component, OnInit } from '@angular/core';
import {
  NavController
} from '@ionic/angular';
@Component({
  selector: 'app-mr-journaler',
  templateUrl: './mr-journaler.page.html',
  styleUrls: ['./mr-journaler.page.scss'],
})
export class MrJournalerPage implements OnInit {

  array = [
    {
      "id": 1,
      "title": "Mr. Journaler1",
      "subTitle": "#1220",
      "image": "../../../assets/img/MrJournaler1.png"
    },
    {
      "id": 2,

      "title": "Mr. Journaler2",
      "subTitle": "#1221",
      "image": "../../../assets/img/MrJournaler3.png"
    },
    {
      "id": 3,

      "title": "Mr. Journaler3",
      "subTitle": "#1223",
      "image": "../../../assets/img/MrJournaler1.png"
    },
    {
      "id": 4,

      "title": "Mr. Journaler4",
      "subTitle": "#1224",
      "image": "../../../assets/img/MrJournaler3.png"
    },
    {
      "id": 5,
      "title": "Mr. Journaler3",
      "subTitle": "#1223",
      "image": "../../../assets/img/MrJournaler1.png"
    },
    {
      "id": 6,
      "title": "Mr. Journaler4",
      "subTitle": "#1224",
      "image": "../../../assets/img/MrJournaler3.png"
    },
    {
      "id": 7,

      "title": "Mr. Journaler3",
      "subTitle": "#1223",
      "image": "../../../assets/img/MrJournaler1.png"
    },
    {
      "id": 8,

      "title": "Mr. Journaler4",
      "subTitle": "#1224",
      "image": "../../../assets/img/MrJournaler3.png"
    },
  ];
  isSelected = null;
  constructor(
    private navCtrl: NavController) { }

  ngOnInit() {
  }

  handleBackOnClick() {
    this.navCtrl.back();
  }
  onHandleSelectCard(data) {
    console.log('data', data);
    if (this.isSelected == data.id) {
      this.isSelected = null
    }
    else {
      this.isSelected = data.id
    }
  }

}
