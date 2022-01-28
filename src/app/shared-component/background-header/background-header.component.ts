import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-background-header',
  templateUrl: './background-header.component.html',
  styleUrls: ['./background-header.component.scss'],
})
export class BackgroundHeaderComponent implements OnInit {
  boxTopLeft: string;
  boxBottomLeft: string;
  boxMidRight: string;
  boxBottomRight: string;
  //
  constructor(platform: Platform) {
    platform.ready().then(() => {
      let demension = platform.height() * 0.2;
      let conmmonStyle =
        'height:' + demension + 'px' + ';' + 'width:' + demension + 'px' + ';';
      //
      this.boxTopLeft = conmmonStyle + 'top:' + (demension * -0.62 + 'px');
      this.boxBottomLeft = conmmonStyle + 'top:' + (demension * -0.125 + 'px');
      this.boxMidRight = conmmonStyle + 'top:' + (demension * 0.2 + 'px');
      this.boxBottomRight =
        conmmonStyle + 'marginTop:' + (demension * 0.57 + 'px');
      // console.log("boxBottomRight", this.boxBottomRight, conmmonStyle);
    });
  }

  ngOnInit() {}
}
