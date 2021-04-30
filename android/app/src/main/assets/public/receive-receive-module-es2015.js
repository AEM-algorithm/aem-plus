(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["receive-receive-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/receive/receive.page.html":
/*!*********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/receive/receive.page.html ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-buttons>\n      <ion-back-button defaultHref=\"/tabnav/wallets\" text=\"\"> </ion-back-button>\n    </ion-buttons>\n    <ion-title>Receive</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content fullscreen=\"true\">\n  <img [src]=\"screen\" *ngIf=\"state\" />\n\n  <ion-card class=\"ion-text-center\">\n    <ion-card-header>\n      <div class=\"img-name-div\">\n        <ion-img\n          [src]=\"receiveWallet.walletType === 'BTC' ? 'assets/img/bitcoin.png' : receiveWallet.walletType === 'NEM' ?\n            'assets/img/nem-icon.png' : 'assets/img/ethereum.png'\"\n        >\n        </ion-img>\n        <ion-card-title>{{ receiveWallet.walletName }}</ion-card-title>\n      </div>\n\n      <p class=\"address\">{{receiveWallet.walletAddress}}</p>\n    </ion-card-header>\n\n    <ion-card-content>\n      <h5>Scan QR code</h5>\n      <div class=\"qr-div\"><img [src]=\"qrCode.src\" /></div>\n    </ion-card-content>\n  </ion-card>\n\n  <form #f=\"ngForm\" (ngSubmit)=\"onShare(f)\">\n    <ion-row class=\"ion-align-items-center\">\n      <ion-col>\n        <ion-label class=\"title\"> Amount</ion-label>\n      </ion-col>\n\n      <ion-col class=\"ion-text-end\">\n        <ion-note class=\"amount\">\n          {{selectedType === 'AUD' ? amountCrypto : amountAud}} {{selectedType === 'AUD' ? receiveWallet.walletType :\n          'AUD'}}\n        </ion-note>\n      </ion-col>\n    </ion-row>\n\n    <ion-item lines=\"none\" class=\"input-shadow\">\n      <ion-input\n        (ionChange)=\"onEnterAmount($event)\"\n        type=\"number\"\n        [(ngModel)]=\"enteredAmount\"\n        placeholder=\"00.00\"\n        name=\"amount\"\n        required\n        max=\"maxAmount\"\n      ></ion-input>\n\n      <ion-select interface=\"popover\" [ngModel]=\"selectedType\" name=\"amountType\" (ionChange)=\"onSelectType($event)\">\n        <ion-select-option value=\"AUD\"> AUD</ion-select-option>\n        <ion-select-option [value]=\"receiveWallet.walletType\">{{receiveWallet.walletType}} </ion-select-option>\n      </ion-select>\n    </ion-item>\n\n    <ion-row class=\"ion-align-items-center tax-row\">\n      <ion-col class=\"ion-no-padding ion-no-margin\">\n        <ion-label class=\"title\">Tax</ion-label>\n      </ion-col>\n      <ion-col class=\"ion-no-padding ion-no-margin\">\n        <ion-item lines=\"none\" class=\"input-shadow ion-no-margin\">\n          <ion-input\n            [ngModel]=\"selectedTax\"\n            type=\"number\"\n            name=\"selectedTax\"\n            placeholder=\"%\"\n            (ionChange)=\"onSelectTax($event)\"\n            required\n          ></ion-input>\n          <ion-text> %</ion-text>\n        </ion-item>\n      </ion-col>\n    </ion-row>\n\n    <h5 class=\"title\">Receiver</h5>\n    <ion-item lines=\"none\" class=\"input-shadow\">\n      <ion-input\n        [(ngModel)]=\"recipientName\"\n        name=\"recipientName\"\n        (ionChange)=\"updateQR()\"\n        placeholder=\"Reveiver (Business) Name\"\n      ></ion-input>\n    </ion-item>\n\n    <h5 class=\"title\">Invoice description</h5>\n    <ion-item lines=\"none\" class=\"input-shadow\">\n      <ion-input\n        type=\"text\"\n        [(ngModel)]=\"message\"\n        name=\"message\"\n        (ionChange)=\"updateQR()\"\n        placeholder=\"e.g. Rent & bills\"\n      ></ion-input>\n    </ion-item>\n\n    <ion-row class=\"ion-align-items-center\">\n      <ion-col>\n        <h5 class=\"title\">Issuer</h5>\n      </ion-col>\n\n      <ion-col class=\"ion-text-end\">\n        <ion-button fill=\"clear\"> Edit </ion-button>\n      </ion-col>\n    </ion-row>\n\n    <ion-row>\n      <ion-col class=\"user-info\">\n        <p class=\"business-name\">{{user.businessName}}</p>\n        <p class=\"ion-text-wrap\">{{user.address}}</p>\n        <p><b>ABN</b>: {{user.ABN}}</p>\n        <p><b>Email</b>: {{user.email}}</p>\n      </ion-col>\n    </ion-row>\n\n    <div class=\"share-btn\">\n      <ion-button class=\"btn-gradient-bg\" expand=\"block\" type=\"submit\" [disabled]=\"f.invalid\">Share</ion-button>\n    </div>\n  </form>\n</ion-content>\n");

/***/ }),

/***/ "./src/app/receive/receive-routing.module.ts":
/*!***************************************************!*\
  !*** ./src/app/receive/receive-routing.module.ts ***!
  \***************************************************/
/*! exports provided: ReceivePageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReceivePageRoutingModule", function() { return ReceivePageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _receive_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./receive.page */ "./src/app/receive/receive.page.ts");




const routes = [
    {
        path: '',
        component: _receive_page__WEBPACK_IMPORTED_MODULE_3__["ReceivePage"]
    },
];
let ReceivePageRoutingModule = class ReceivePageRoutingModule {
};
ReceivePageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], ReceivePageRoutingModule);



/***/ }),

/***/ "./src/app/receive/receive.module.ts":
/*!*******************************************!*\
  !*** ./src/app/receive/receive.module.ts ***!
  \*******************************************/
/*! exports provided: ReceivePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReceivePageModule", function() { return ReceivePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var _receive_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./receive-routing.module */ "./src/app/receive/receive-routing.module.ts");
/* harmony import */ var _receive_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./receive.page */ "./src/app/receive/receive.page.ts");







let ReceivePageModule = class ReceivePageModule {
};
ReceivePageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _receive_routing_module__WEBPACK_IMPORTED_MODULE_5__["ReceivePageRoutingModule"]],
        declarations: [_receive_page__WEBPACK_IMPORTED_MODULE_6__["ReceivePage"]],
    })
], ReceivePageModule);



/***/ }),

/***/ "./src/app/receive/receive.page.scss":
/*!*******************************************!*\
  !*** ./src/app/receive/receive.page.scss ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("ion-card {\n  box-shadow: 0px 3px 6px #00000029;\n  --background: #f7f7f7;\n  border-radius: 0px 0px 30px 30px;\n  margin: 0 0 30px 0;\n}\nion-card ion-card-header {\n  border-bottom: 0.5px solid #cccbcd;\n}\nion-card ion-card-header .img-name-div {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\nion-card ion-card-header .img-name-div ion-img {\n  width: 25px;\n  margin-right: 10px;\n}\nion-card ion-card-header .img-name-div ion-card-title {\n  font-size: 16px;\n}\nion-card ion-card-header .address {\n  color: #757575;\n  font-size: 9px;\n}\nion-card ion-card-content {\n  padding: 20px;\n}\nion-card ion-card-content h5 {\n  font-size: 16px;\n  color: #000000;\n  font-weight: bold;\n}\nion-card ion-card-content .qr-div {\n  padding: 10px 60px;\n}\nform {\n  padding: 0 20px;\n}\nion-row,\nion-col {\n  padding: 0;\n  margin: 0;\n}\n.tax-row {\n  margin-top: 16px;\n}\n.title {\n  font-size: 16px;\n  font-weight: bold;\n}\n.amount {\n  color: #707070;\n  font-size: 14px;\n}\n.user-info {\n  color: #707070;\n  font-size: 14px;\n}\n.user-info .business-name {\n  color: #000000;\n}\n.user-info p {\n  margin: 0;\n}\n.input-shadow {\n  box-shadow: 0 3px 6px #00000029;\n  border-radius: 8px;\n  margin: 5px 0;\n}\n.share-btn {\n  margin: 10px 0;\n}\nion-select.in-item {\n  max-width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcmVjZWl2ZS9yZWNlaXZlLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGlDQUFBO0VBQ0EscUJBQUE7RUFDQSxnQ0FBQTtFQUNBLGtCQUFBO0FBQ0Y7QUFDRTtFQUNFLGtDQUFBO0FBQ0o7QUFDSTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0FBQ047QUFDTTtFQUNFLFdBQUE7RUFDQSxrQkFBQTtBQUNSO0FBRU07RUFDRSxlQUFBO0FBQVI7QUFJSTtFQUNFLGNBQUE7RUFDQSxjQUFBO0FBRk47QUFNRTtFQUNFLGFBQUE7QUFKSjtBQUtJO0VBQ0UsZUFBQTtFQUNBLGNBQUE7RUFDQSxpQkFBQTtBQUhOO0FBTUk7RUFDRSxrQkFBQTtBQUpOO0FBVUE7RUFDRSxlQUFBO0FBUEY7QUFVQTs7RUFFRSxVQUFBO0VBQ0EsU0FBQTtBQVBGO0FBVUE7RUFDRSxnQkFBQTtBQVBGO0FBVUE7RUFDRSxlQUFBO0VBQ0EsaUJBQUE7QUFQRjtBQVVBO0VBQ0UsY0FBQTtFQUNBLGVBQUE7QUFQRjtBQVVBO0VBQ0UsY0FBQTtFQUNBLGVBQUE7QUFQRjtBQVNFO0VBQ0UsY0FBQTtBQVBKO0FBVUU7RUFDRSxTQUFBO0FBUko7QUFZQTtFQUNFLCtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQUFBO0FBVEY7QUFZQTtFQUNFLGNBQUE7QUFURjtBQVlBO0VBQ0UsZUFBQTtBQVRGIiwiZmlsZSI6InNyYy9hcHAvcmVjZWl2ZS9yZWNlaXZlLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImlvbi1jYXJkIHtcbiAgYm94LXNoYWRvdzogMHB4IDNweCA2cHggIzAwMDAwMDI5O1xuICAtLWJhY2tncm91bmQ6ICNmN2Y3Zjc7XG4gIGJvcmRlci1yYWRpdXM6IDBweCAwcHggMzBweCAzMHB4O1xuICBtYXJnaW46IDAgMCAzMHB4IDA7XG5cbiAgaW9uLWNhcmQtaGVhZGVyIHtcbiAgICBib3JkZXItYm90dG9tOiAwLjVweCBzb2xpZCAjY2NjYmNkO1xuXG4gICAgLmltZy1uYW1lLWRpdiB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXG4gICAgICBpb24taW1nIHtcbiAgICAgICAgd2lkdGg6IDI1cHg7XG4gICAgICAgIG1hcmdpbi1yaWdodDogMTBweDtcbiAgICAgIH1cblxuICAgICAgaW9uLWNhcmQtdGl0bGUge1xuICAgICAgICBmb250LXNpemU6IDE2cHg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLmFkZHJlc3Mge1xuICAgICAgY29sb3I6ICM3NTc1NzU7XG4gICAgICBmb250LXNpemU6IDlweDtcbiAgICB9XG4gIH1cblxuICBpb24tY2FyZC1jb250ZW50IHtcbiAgICBwYWRkaW5nOiAyMHB4O1xuICAgIGg1IHtcbiAgICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICAgIGNvbG9yOiAjMDAwMDAwO1xuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgfVxuXG4gICAgLnFyLWRpdiB7XG4gICAgICBwYWRkaW5nOiAxMHB4IDYwcHg7XG4gICAgfVxuICB9XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0gZm9ybTpcbmZvcm0ge1xuICBwYWRkaW5nOiAwIDIwcHg7XG59XG5cbmlvbi1yb3csXG5pb24tY29sIHtcbiAgcGFkZGluZzogMDtcbiAgbWFyZ2luOiAwO1xufVxuXG4udGF4LXJvdyB7XG4gIG1hcmdpbi10b3A6IDE2cHg7XG59XG5cbi50aXRsZSB7XG4gIGZvbnQtc2l6ZTogMTZweDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbi5hbW91bnQge1xuICBjb2xvcjogIzcwNzA3MDtcbiAgZm9udC1zaXplOiAxNHB4O1xufVxuXG4udXNlci1pbmZvIHtcbiAgY29sb3I6ICM3MDcwNzA7XG4gIGZvbnQtc2l6ZTogMTRweDtcblxuICAuYnVzaW5lc3MtbmFtZSB7XG4gICAgY29sb3I6ICMwMDAwMDA7XG4gIH1cblxuICBwIHtcbiAgICBtYXJnaW46IDA7XG4gIH1cbn1cblxuLmlucHV0LXNoYWRvdyB7XG4gIGJveC1zaGFkb3c6IDAgM3B4IDZweCAjMDAwMDAwMjk7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgbWFyZ2luOiA1cHggMDtcbn1cblxuLnNoYXJlLWJ0biB7XG4gIG1hcmdpbjogMTBweCAwO1xufVxuXG5pb24tc2VsZWN0LmluLWl0ZW0ge1xuICBtYXgtd2lkdGg6IDEwMCU7XG59XG4iXX0= */");

/***/ }),

/***/ "./src/app/receive/receive.page.ts":
/*!*****************************************!*\
  !*** ./src/app/receive/receive.page.ts ***!
  \*****************************************/
/*! exports provided: ReceivePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReceivePage", function() { return ReceivePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _ionic_native_screenshot_ngx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic-native/screenshot/ngx */ "./node_modules/@ionic-native/screenshot/__ivy_ngcc__/ngx/index.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var kjua__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! kjua */ "./node_modules/kjua/dist/kjua.min.js");
/* harmony import */ var kjua__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(kjua__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _services_wallets_wallets_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/wallets/wallets.service */ "./src/app/services/wallets/wallets.service.ts");







let ReceivePage = class ReceivePage {
    constructor(route, walletsService, screenshot, toastCtrl) {
        this.route = route;
        this.walletsService = walletsService;
        this.screenshot = screenshot;
        this.toastCtrl = toastCtrl;
        // --- user input values:
        this.selectedType = 'AUD';
        this.selectedTax = 10;
        // dummy user's invoic info:
        this.user = {
            businessName: 'AEM Algorithm',
            address: '2208/ 5 Sutherland Street, Melbourne VIC 3000 03 0987 9872',
            ABN: '0939399923',
            email: 'test@email.com',
        };
        this.state = false;
        this.qrCode = { src: '' };
        this.recipientName = '';
        this.message = '';
    }
    ngOnInit() {
        this.route.params.subscribe((params) => {
            this.receiveWallet = this.walletsService.getWallet(params['walletId']);
        });
    }
    _encodeQrCode(infoQR) {
        this.qrCode = kjua__WEBPACK_IMPORTED_MODULE_5__({
            size: 256,
            text: infoQR,
            fill: '#000',
            quiet: 0,
            ratio: 2,
        });
    }
    updateQR() {
        if (!this.receiveWallet) {
            return;
        }
        let infoQR = JSON.stringify({
            data: {
                address: this.receiveWallet.walletAddress.toString(),
                amountAud: this.amountAud,
                amountCrypto: this.amountCrypto,
                selectedTax: this.selectedTax,
                name: this.recipientName,
                msg: this.message,
                userInfo: this.user,
            },
        });
        console.log('update:', infoQR);
        this._encodeQrCode(infoQR);
    }
    ionViewWillEnter() {
        this.updateQR();
    }
    onEnterAmount(e) {
        this.enteredAmount = e.target.value;
        if (this.selectedType === 'AUD') {
            this.amountAud = this.enteredAmount;
            this.amountCrypto = this.enteredAmount / 5000; // mock the calculation
        }
        else {
            this.amountCrypto = this.enteredAmount;
            this.amountAud = this.enteredAmount * 5000;
        }
        this.updateQR();
    }
    onSelectType(e) {
        console.log('type select:', e);
        this.selectedType = e.detail.value;
        console.log('type select:', this.selectedType);
    }
    onSelectTax(e) {
        this.selectedTax = e.detail.value;
        this.updateQR();
    }
    reset() {
        var self = this;
        setTimeout(function () {
            self.state = false;
        }, 1000);
    }
    screenShot() {
        this.screenshot.save('jpg', 80, 'myscreenshot.jpg').then((res) => {
            this.screen = res.filePath;
            this.state = true;
            this.reset();
        });
    }
    screenShotURI() {
        this.screenshot.URI(80).then((res) => {
            this.screen = res.URI;
            this.state = true;
            this.reset();
        });
    }
};
ReceivePage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
    { type: _services_wallets_wallets_service__WEBPACK_IMPORTED_MODULE_6__["WalletsService"] },
    { type: _ionic_native_screenshot_ngx__WEBPACK_IMPORTED_MODULE_3__["Screenshot"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ToastController"] }
];
ReceivePage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-receive',
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./receive.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/receive/receive.page.html")).default,
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./receive.page.scss */ "./src/app/receive/receive.page.scss")).default]
    })
], ReceivePage);



/***/ })

}]);
//# sourceMappingURL=receive-receive-module-es2015.js.map