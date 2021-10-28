import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';


@Component({
  selector: 'app-export-modal',
  templateUrl: './export-modal.component.html',
  styleUrls: ['./export-modal.component.scss'],
})
export class ExportModalComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() { }
  download() {
    this.modalCtrl.dismiss();
    this.router.navigateByUrl('/tabnav/export/export-complete');
  }
}
