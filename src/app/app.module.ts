import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Storage } from '@ionic/storage';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PinModalComponent } from './pin-modal/pin-modal.component';

//Custom providers
import {AlertProvider} from './services/alert/alert.provider';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import {SQLite} from '@ionic-native/sqlite/ngx';

import { FileOpener } from '@ionic-native/file-opener/ngx';
import { CommonModule } from '@angular/common';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, PinModalComponent],
  entryComponents: [],
  imports: [
    CommonModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),
    IonicStorageModule.forRoot(),
  ],
  providers: [
    FileOpener,
    StatusBar,
    SplashScreen,
    InAppBrowser,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Clipboard,
    SQLite,
    Storage,
    FormBuilder,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
