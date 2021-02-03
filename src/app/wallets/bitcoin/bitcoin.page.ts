import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { NodeSelectionComponent } from '../node-selection/node-selection.component';
import { ViewchangeService } from '../viewchange.service';
@Component({
  selector: 'app-bitcoin',
  templateUrl: './bitcoin.page.html',
  styleUrls: ['./bitcoin.page.scss'],
})
export class BitcoinPage implements OnInit {
  // isShowChart = false;
  isShowChart = true;

  constructor(private modalCtrl: ModalController, private viewChangeServive: ViewchangeService) {}

  ngOnInit() {
    this.viewChangeServive.showChart.subscribe((data) => {
      this.isShowChart = data;
    });
  }

  ionViewWillEnter() {
    //  subscribe to the chart view change event
    // this.viewChangeServive.hideChart.subscribe((data) => {
    //   this.showChart = data;
    // });

    this.viewChangeServive.showChart.subscribe((data) => {
      this.isShowChart = data;
    });
  }

  ionViewDidEnter() {
    this.viewChangeServive.showChart.subscribe((data) => {
      this.isShowChart = data;
    });
  }

  async openNodeSelectionModal() {
    const modal = await this.modalCtrl.create({
      component: NodeSelectionComponent,
    });
    return await modal.present();
  }

  onHideChart(eventData: boolean) {
    this.isShowChart = eventData;
    console.log(this.isShowChart);
  }
}
