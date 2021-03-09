import { Component, OnInit } from '@angular/core';
import { ModalController} from '@ionic/angular';
import { PinModalComponent } from 'src/app/pin-modal/pin-modal.component';

@Component({
  selector: 'app-security',
  templateUrl: './security.page.html',
  styleUrls: ['./security.page.scss'],
})
export class SecurityPage implements OnInit {

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
  }

  onEnterPin() {
    this.modalCtrl
      .create({
        component: PinModalComponent,
      })
      .then((modalEl) => {
        modalEl.present();
      });
  }

}
