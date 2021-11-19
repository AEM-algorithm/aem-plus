import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Storage } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import {QRScanner} from '@ionic-native/qr-scanner/ngx';
import {Diagnostic} from '@ionic-native/diagnostic/ngx';
import {OpenNativeSettings} from '@ionic-native/open-native-settings/ngx';
import {ImagePicker} from '@ionic-native/image-picker/ngx';
import { TouchID } from '@ionic-native/touch-id/ngx';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PinModalComponent } from './pin-modal/pin-modal.component';

//Custom providers
import { AlertProvider } from './services/alert/alert.provider';
import { ContactProvider } from './services/contact/contact.provider';
import { WalletProvider } from './services/wallets/wallet.provider';
import { NemProvider } from './services/nem/nem.provider';
import { SymbolProvider } from './services/symbol/symbol.provider';
import { BitcoinProvider } from './services/bitcoin/bitcoin.provider';
import { CryptoProvider } from './services/crypto/crypto.provider';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { LanguageProvider } from './services/language/language.provider';

import { Globalization } from '@ionic-native/globalization/ngx';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { HTTP } from '@ionic-native/http/ngx';

//Custom pipes
import { FormsModule } from '@angular/forms';

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
    FormsModule,
  ],
  providers: [
    AlertProvider,
    BitcoinProvider,
    ContactProvider,
    FileOpener,
    NemProvider,
    LanguageProvider,
    StatusBar,
    SplashScreen,
    InAppBrowser,
    File,
    FileTransfer,
    Clipboard,
    Globalization,
    SQLite,
    HTTP,
    Storage,
    SymbolProvider,
    WalletProvider,
    CryptoProvider,
    SocialSharing,
    QRScanner,
    Diagnostic,
    OpenNativeSettings,
    ImagePicker,
    TouchID,
    FingerprintAIO,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
