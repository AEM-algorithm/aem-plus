import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(public navCtrl: NavController, public translate: TranslateService) { }

  ngOnInit() {
  }
}
