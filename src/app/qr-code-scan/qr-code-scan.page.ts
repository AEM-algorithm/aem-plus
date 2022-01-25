import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {Platform, AlertController, NavController} from '@ionic/angular';
import {OpenNativeSettings} from '@ionic-native/open-native-settings/ngx';
import {Diagnostic} from '@ionic-native/diagnostic/ngx';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import {MemoryProvider, Data} from '@app/services/memory/memory.provider';

import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-qr-code-scan',
  templateUrl: './qr-code-scan.page.html',
  styleUrls: ['./qr-code-scan.page.scss'],
})
export class QrCodeScanPage implements OnInit, OnDestroy{

  private qrScannerStatus: QRScannerStatus;
  private isLightDisable = true;
  private isUseBackCamera = true;

  private qrScanSubscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private platform: Platform,
    private diagnostic: Diagnostic,
    private alertCtrl: AlertController,
    private openNativeSettings: OpenNativeSettings,
    private navController: NavController,
    private qrScanner: QRScanner,
    private memory: MemoryProvider,
  ) {
  }

  ngOnInit() {
  }

  ionViewDidEnter(): void {
    this.platform.ready().then(() => {
      this.qrScanSubscription = this.openQrScanner().subscribe(qrData => {
        let data;
        try {
          data = JSON.parse(qrData);
        } catch (_) {
          data = qrData;
        }
        this.memory.setData(data);
        this.navController.pop();
      }, (error) => {
        console.log(error);
      });
    });
  }

  ionViewWillLeave(): void {
    this.closeQRScanner();
  }

  ngOnDestroy() {
    if (this.qrScanSubscription) {
      this.qrScanSubscription.unsubscribe();
    }
  }

  public openQrScanner(): Observable<string> {
    return new Observable(subscriber => {
      if (!this.platform.is('cordova')) {
        subscriber.error('platform is not cordova');
        return;
      }

      this.qrScanner
        .prepare()
        .then(async (status: QRScannerStatus) => {
          this.qrScannerStatus = status;
          if (status.authorized) {
            const text = await this.qrScanning();
            subscriber.next(text);
          } else if (status.denied) {
            this.openSetting();
          } else {
            subscriber.error('Permission was denied, but not permanently. You can ask for permission again at a later time');
          }
        })
        .catch((e): void => {
          this.checkCameraPermissions();
          subscriber.error(e);
        });
    });
  }

  private async qrScanning(): Promise<string> {
    return new Promise((async (resolve) => {
      await this.qrScanner.resumePreview();
      await this.qrScanner.show();
      this.qrScanner.scan().subscribe((text: string) => {
        resolve(text);
      });
    }));
  }

  /**
   * openSetting()
   * camera permission was permanently denied
   * request permission
   */
  private openSetting() {
    this.qrScanner.openSettings();
  }

  public closeQRScanner() {
    if (!this.platform.is('cordova')) {
      return;
    }
    this.qrScanner.getStatus().then(
      async (status): Promise<void> => {
        if (status.showing) {
          await this.qrScanner.destroy();
        }
      }
    );
  }

  private checkCameraPermissions(): void {
    if (this.platform.is('ios')) {
      this.diagnostic.getCameraAuthorizationStatus().then(async (status) => {
        if (status === 'denied_always') {
          const alert = await this.alertCtrl.create({
            header: 'Cannot access the Camera',
            subHeader: `The App doesn't have permission to access the camera. Please grant the permission so you can use the QR code scanner. <br>Go to 'Settings' => Choose 'App' => Allow access 'Camera'`,
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                  alert.dismiss();
                }
              },
              {
                text: 'Allow access',
                handler: () => {
                  this.openNativeSettings.open('application_details').catch((e): void => {
                    console.log(JSON.stringify(e));
                  });
                }
              }
            ]
          });
          await alert.present();
        }
      });
    }
  }

  public toggleLight(): void {
    if (
      this.qrScannerStatus &&
      this.qrScannerStatus.canEnableLight &&
      this.isUseBackCamera
    ) {
      this.isLightDisable ? this.qrScanner.enableLight() : this.qrScanner.disableLight();
      this.isLightDisable = !this.isLightDisable;
    }
  }

  public toggleCamera(): void {
    if (this.qrScannerStatus && this.qrScannerStatus.canChangeCamera) {
      this.isUseBackCamera ? this.qrScanner.useFrontCamera() : this.qrScanner.useBackCamera();
      this.isUseBackCamera = !this.isUseBackCamera;
      this.isLightDisable = true; // turn off camera when switch front camera
    }
  }
}
