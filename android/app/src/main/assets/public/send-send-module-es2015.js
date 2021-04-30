(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["send-send-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/wallets/send/confirm-transaction-modal/confirm-transaction-modal.component.html":
/*!***************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/wallets/send/confirm-transaction-modal/confirm-transaction-modal.component.html ***!
  \***************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content>\n  <h4 class=\"ion-text-center\">Confirm Transaction</h4>\n  <h2 class=\"ion-text-center\">\n    <strong>$ {{ transactionData.amountAUD }} AUD</strong>\n  </h2>\n  <p class=\"amount-crypto ion-text-center\">{{ transactionData.amount }} {{ walletType }}</p>\n\n  <ion-grid>\n    <ion-row>\n      <ion-col class=\"ion-text-end\">\n        <p class=\"label\">Invoice Number</p>\n      </ion-col>\n      <ion-col>\n        <p class=\"content\">{{ transactionData.transId }}</p></ion-col\n      >\n    </ion-row>\n    <ion-row>\n      <ion-col class=\"ion-text-end\">\n        <p class=\"label\">Date</p>\n      </ion-col>\n      <ion-col>\n        <p class=\"content\">{{ date }}</p>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col class=\"ion-text-end\">\n        <p class=\"label\">Receiver</p>\n      </ion-col>\n      <ion-col>\n        <p class=\"content\">{{ transactionData.receiver }}</p>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col class=\"ion-text-end\">\n        <p class=\"label\">Description</p>\n      </ion-col>\n      <ion-col>\n        <p class=\"content\">{{ transactionData.description ? transactionData.description : '' }}</p>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col class=\"ion-text-end\">\n        <p class=\"label\">Fee</p>\n      </ion-col>\n      <ion-col>\n        <p class=\"content\">${{ transactionData.feeAud }}</p>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col> </ion-col>\n      <ion-col>\n        <p>\n          <ion-note>({{ transactionData.feeCrypto }} {{ walletType }}) </ion-note>\n        </p>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <section class=\"btn-div\">\n    <ion-button (click)=\"close()\">Cancel</ion-button>\n    <ion-button (click)=\"confirm()\">Confirm</ion-button>\n  </section>\n</ion-content>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/wallets/send/select-address-modal/select-address-modal.component.html":
/*!*****************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/wallets/send/select-address-modal/select-address-modal.component.html ***!
  \*****************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content class=\"list-wrapper\">\n  <ion-item lines=\"none\" class=\"header\">\n    <ion-avatar slot=\"start\">\n      <ion-img\n        [src]=\"\n          selectedWalletType === 'BTC'\n            ? 'assets/img/bitcoin.png'\n            : selectedWalletType === 'NEM'\n            ? 'assets/img/nem-icon.png'\n            : 'assets/img/ethereum.png'\n        \"\n      ></ion-img\n    ></ion-avatar>\n    <ion-label class=\"title\"> Select a {{ selectedWalletType }} address </ion-label>\n    <ion-button fill=\"clear\" (click)=\"close()\">\n      <ion-icon name=\"close\" slot=\"icon-only\"> </ion-icon>\n    </ion-button>\n  </ion-item>\n\n  <ion-toolbar class=\"search-bar\">\n    <ion-searchbar slot=\"start\" class=\"ion-no-padding\" (ionChange)=\"onSearchAddress($event)\"></ion-searchbar>\n  </ion-toolbar>\n\n  <ion-list lines=\"none\">\n    <ion-item *ngFor=\"let address of filteredAddresses; let i = index\" (click)=\"onSelectAddress(address)\">\n      <ion-avatar slot=\"start\">\n        <img src=\"assets/img/contact.png\" />\n      </ion-avatar>\n      <ion-label class=\"ion-text-wrap\">\n        <ion-text>\n          <h3 class=\"name\">\n            {{ address.holderName }}\n            <ion-note class=\"description\">{{ address.description && address.description }}</ion-note>\n          </h3>\n        </ion-text>\n\n        <ion-text>\n          <p class=\"address\">{{ address.address }}</p>\n        </ion-text>\n      </ion-label>\n    </ion-item>\n  </ion-list>\n</ion-content>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/wallets/send/send.page.html":
/*!***********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/wallets/send/send.page.html ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-back-button defaultHref=\"/tabnav/wallets\" text=\"\"></ion-back-button>\n    </ion-buttons>\n    <ion-title>Send</ion-title>\n    <ion-buttons slot=\"end\">\n      <ion-button slot=\"icon-only\"> <ion-icon slot=\"end\" name=\"scan\"></ion-icon></ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-list-header>\n    <ion-label class=\"title padding-16\">From</ion-label>\n  </ion-list-header>\n\n  <!--   ------------ the selected wallet info card   -->\n  <ion-card>\n    <ion-item lines=\"none\" style=\"border-bottom: 1px solid #dfe7ed\">\n      <ion-avatar slot=\"start\">\n        <ion-img\n          [src]=\"selectedWallet.walletType === 'BTC' ? 'assets/img/bitcoin.png' : selectedWallet.walletType === 'NEM'?  'assets/img/nem-icon.png' : 'assets/img/ethereum.png'\"\n        ></ion-img>\n      </ion-avatar>\n      <ion-label>\n        <h5 class=\"wallet-name\">{{ isTokenSelected ? selectedToken.name : selectedWallet.walletName }}</h5>\n\n        <p class=\"wallet-address\">{{ selectedWallet.walletAddress }}</p>\n      </ion-label>\n    </ion-item>\n    <ion-item lines=\"none\">\n      <ion-label style=\"padding-left: 55px\">\n        <p class=\"wallet-balance\">{{cryptoBanlance}} {{selectedWallet.walletType}}</p>\n        <p class=\"wallet-balance\">{{ audBanlance}} AUD</p>\n      </ion-label>\n    </ion-item>\n  </ion-card>\n  <!--    ----------- the send transaction form:  -->\n  <form [formGroup]=\"sendForm\" (ngSubmit)=\"onSend()\">\n    <ion-list-header>\n      <ion-label class=\"title\">To</ion-label>\n      <ion-button class=\"select-btn\" (click)=\"showAddressList()\">Add from address book</ion-button>\n    </ion-list-header>\n\n    <ion-item lines=\"none\" class=\"input-shadow\">\n      <ion-input formControlName=\"receiverAddress\" (ionChange)=\"onEnterAddress($event)\"></ion-input>\n    </ion-item>\n\n    <ion-list-header style=\"padding-right: 10px\">\n      <ion-label class=\"title\">Amount</ion-label>\n      <ion-note class=\"amount\">\n        {{ selectedType === 'AUD' ? amountCrypto : amountAud}} {{ selectedType === 'AUD' ? selectedWallet.walletType :\n        'AUD' }}\n      </ion-note>\n    </ion-list-header>\n\n    <ion-item lines=\"none\" class=\"input-shadow\">\n      <ion-input\n        type=\"number\"\n        placeholder=\"00.00\"\n        formControlName=\"amount\"\n        (ionChange)=\"onEnterAmount($event)\"\n      ></ion-input>\n      <ion-select\n        formControlName=\"amountType\"\n        interface=\"popover\"\n        name=\"amountType\"\n        value=\"AUD\"\n        (ionChange)=\"onSelectType($event)\"\n      >\n        <ion-select-option value=\"AUD\"> AUD </ion-select-option>\n        <ion-select-option [value]=\"selectedWallet.walletType\"> {{ selectedWallet.walletType }} </ion-select-option>\n      </ion-select>\n    </ion-item>\n\n    <!--  show the error message: if entered amount > balance -->\n    <span *ngIf=\"!isAmountValid\" class=\"ion-text-center error-message\"> {{amountErr}} </span>\n\n    <ion-list-header>\n      <ion-label class=\"title\">Description</ion-label>\n    </ion-list-header>\n\n    <ion-item lines=\"none\" class=\"input-shadow\">\n      <ion-input formControlName=\"description\"></ion-input>\n    </ion-item>\n\n    <!-- show the fee adjustment div only after user entered the amount & the entered amount is valid: -->\n    <div class=\"fee-adjustment\" *ngIf=\"isAmountValid && (amountCrypto || amountAud) \">\n      <ion-list-header>\n        <ion-label class=\"title\">Fees</ion-label>\n        <ion-button class=\"select-btn\" (click)=\"onEditFee()\">Edit transaction fee setting</ion-button>\n      </ion-list-header>\n\n      <!-- Warning section:  -->\n      <div class=\"warning\" *ngIf=\"isTooLow\">\n        <div class=\"icon\">\n          <ion-icon name=\"warning-outline\"></ion-icon>\n        </div>\n        <strong>Lower fee will result in longer transaction time</strong>\n      </div>\n      <div class=\"warning\" *ngIf=\"isTooHigh\">\n        <div class=\"icon\">\n          <ion-icon name=\"warning-outline\"></ion-icon>\n        </div>\n        <strong>Fee is too high</strong>\n      </div>\n\n      <ion-range\n        (ionChange)=\"onSelectFee($event)\"\n        [min]=\"this.minFeeAud\"\n        [max]=\"this.maxFeeAud\"\n        formControlName=\"fee\"\n        pin=\"true\"\n        [value]=\"suggestedFeeAud\"\n      >\n      </ion-range>\n      <ion-item lines=\"none\" class=\"fee-note\">\n        <ion-label class=\"ion-text-start\">\n          <p>Low</p>\n        </ion-label>\n        <ion-label class=\"ion-text-center\">\n          <p>Medium</p>\n          <p style=\"color: #074673\">Suggested</p>\n        </ion-label>\n        <ion-label class=\"ion-text-end\">\n          <p>High</p>\n        </ion-label>\n      </ion-item>\n\n      <div class=\"fee-value\">\n        <ion-text> Fee: $ {{selectedFeeAud ? selectedFeeAud :suggestedFeeAud}} AUD </ion-text>\n        <ion-note> = {{selectedFeeCrypto}} {{selectedWallet.walletType}} </ion-note>\n      </div>\n    </div>\n\n    <ion-button expand=\"block\" [disabled]=\"sendForm.invalid\" type=\"submit\" class=\"send-btn btn-gradient-bg\"\n      >Send</ion-button\n    >\n  </form>\n</ion-content>\n");

/***/ }),

/***/ "./src/app/wallets/send/confirm-transaction-modal/confirm-transaction-modal.component.scss":
/*!*************************************************************************************************!*\
  !*** ./src/app/wallets/send/confirm-transaction-modal/confirm-transaction-modal.component.scss ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("h4 {\n  margin: 15px;\n  font-size: 20px;\n  color: #074673;\n}\n\nh2 {\n  font-size: 30px;\n  color: #074673;\n}\n\n.amount-crypto {\n  color: #707070;\n  font-size: 14px;\n}\n\nion-grid {\n  margin: 20px 0;\n}\n\nion-grid p {\n  font-size: 12px;\n  margin: 0;\n}\n\nion-grid .label {\n  color: #707070;\n  align-self: flex-end;\n}\n\nion-grid .content {\n  color: #000000;\n}\n\n.btn-div {\n  margin-top: 20px;\n  display: flex;\n  justify-content: space-around;\n}\n\n.btn-div ion-button {\n  --background: linear-gradient(to bottom, #41a1c8, #074673);\n  color: white;\n  width: 130px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvd2FsbGV0cy9zZW5kL2NvbmZpcm0tdHJhbnNhY3Rpb24tbW9kYWwvY29uZmlybS10cmFuc2FjdGlvbi1tb2RhbC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFlBQUE7RUFDQSxlQUFBO0VBQ0EsY0FBQTtBQUNGOztBQUVBO0VBQ0UsZUFBQTtFQUNBLGNBQUE7QUFDRjs7QUFFQTtFQUNFLGNBQUE7RUFDQSxlQUFBO0FBQ0Y7O0FBRUE7RUFDRSxjQUFBO0FBQ0Y7O0FBQUU7RUFDRSxlQUFBO0VBQ0EsU0FBQTtBQUVKOztBQUFFO0VBQ0UsY0FBQTtFQUNBLG9CQUFBO0FBRUo7O0FBQUU7RUFDRSxjQUFBO0FBRUo7O0FBRUE7RUFDRSxnQkFBQTtFQUNBLGFBQUE7RUFDQSw2QkFBQTtBQUNGOztBQUNFO0VBQ0UsMERBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtBQUNKIiwiZmlsZSI6InNyYy9hcHAvd2FsbGV0cy9zZW5kL2NvbmZpcm0tdHJhbnNhY3Rpb24tbW9kYWwvY29uZmlybS10cmFuc2FjdGlvbi1tb2RhbC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImg0IHtcbiAgbWFyZ2luOiAxNXB4O1xuICBmb250LXNpemU6IDIwcHg7XG4gIGNvbG9yOiAjMDc0NjczO1xufVxuXG5oMiB7XG4gIGZvbnQtc2l6ZTogMzBweDtcbiAgY29sb3I6ICMwNzQ2NzM7XG59XG5cbi5hbW91bnQtY3J5cHRvIHtcbiAgY29sb3I6ICM3MDcwNzA7XG4gIGZvbnQtc2l6ZTogMTRweDtcbn1cblxuaW9uLWdyaWQge1xuICBtYXJnaW46IDIwcHggMDtcbiAgcCB7XG4gICAgZm9udC1zaXplOiAxMnB4O1xuICAgIG1hcmdpbjogMDtcbiAgfVxuICAubGFiZWwge1xuICAgIGNvbG9yOiAjNzA3MDcwO1xuICAgIGFsaWduLXNlbGY6IGZsZXgtZW5kO1xuICB9XG4gIC5jb250ZW50IHtcbiAgICBjb2xvcjogIzAwMDAwMDtcbiAgfVxufVxuXG4uYnRuLWRpdiB7XG4gIG1hcmdpbi10b3A6IDIwcHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xuXG4gIGlvbi1idXR0b24ge1xuICAgIC0tYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSwgIzQxYTFjOCwgIzA3NDY3Myk7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIHdpZHRoOiAxMzBweDtcbiAgfVxufVxuIl19 */");

/***/ }),

/***/ "./src/app/wallets/send/confirm-transaction-modal/confirm-transaction-modal.component.ts":
/*!***********************************************************************************************!*\
  !*** ./src/app/wallets/send/confirm-transaction-modal/confirm-transaction-modal.component.ts ***!
  \***********************************************************************************************/
/*! exports provided: ConfirmTransactionModalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfirmTransactionModalComponent", function() { return ConfirmTransactionModalComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var src_app_services_wallets_wallets_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/wallets/wallets.service */ "./src/app/services/wallets/wallets.service.ts");





let ConfirmTransactionModalComponent = class ConfirmTransactionModalComponent {
    constructor(modalCtrl, walletsService, loadingCtrl, router) {
        this.modalCtrl = modalCtrl;
        this.walletsService = walletsService;
        this.loadingCtrl = loadingCtrl;
        this.router = router;
    }
    ngOnInit() {
        this.date = new Date(this.transactionData.time).toDateString();
    }
    close() {
        this.modalCtrl.dismiss();
    }
    confirm() {
        this.loadingCtrl
            .create({
            message: 'transaction is processing',
            duration: 200,
            spinner: 'circles',
        })
            .then((loadingEl) => {
            loadingEl.present();
            try {
                this.walletsService.sendTransaction(this.transactionData, this.walletId);
            }
            catch (err) {
                // catch any error from backend
                console.log(err);
            }
        });
        this.close();
        this.router.navigateByUrl('/tabnav/wallets');
    }
};
ConfirmTransactionModalComponent.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"] },
    { type: src_app_services_wallets_wallets_service__WEBPACK_IMPORTED_MODULE_4__["WalletsService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["LoadingController"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }
];
ConfirmTransactionModalComponent.propDecorators = {
    transactionData: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
    walletType: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
    walletId: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }]
};
ConfirmTransactionModalComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-confirm-transaction-modal',
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./confirm-transaction-modal.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/wallets/send/confirm-transaction-modal/confirm-transaction-modal.component.html")).default,
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./confirm-transaction-modal.component.scss */ "./src/app/wallets/send/confirm-transaction-modal/confirm-transaction-modal.component.scss")).default]
    })
], ConfirmTransactionModalComponent);



/***/ }),

/***/ "./src/app/wallets/send/select-address-modal/select-address-modal.component.scss":
/*!***************************************************************************************!*\
  !*** ./src/app/wallets/send/select-address-modal/select-address-modal.component.scss ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".header {\n  --padding-end: 5px;\n  --padding-top: 10px;\n  --padding-bottom: 5px;\n  --inner-padding-end: 0;\n}\n.header .title {\n  font-size: 16px;\n  font-weight: bold;\n}\n.header ion-avatar {\n  width: 25px;\n  height: 25px;\n}\n.header ion-icon {\n  color: #707070;\n}\n.list-wrapper {\n  --padding-start: 20px;\n  --padding-end: 20px;\n}\n.list-wrapper ion-item {\n  --padding-start: 10px;\n}\n.list-wrapper ion-searchbar {\n  --icon-color: #0000005c;\n}\nion-list ion-item {\n  border-bottom: 1px solid #ebebeb;\n  margin-top: 5px;\n}\nion-list ion-avatar {\n  width: 40px;\n  height: 40px;\n  box-shadow: 0 0 8px #41a1c8;\n}\nion-list .name {\n  font-size: 16px;\n}\nion-list .description {\n  color: #9f9f9f;\n  font-size: 14px;\n  margin-left: 5px;\n}\nion-list .address {\n  color: #757575;\n  font-size: 9px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvd2FsbGV0cy9zZW5kL3NlbGVjdC1hZGRyZXNzLW1vZGFsL3NlbGVjdC1hZGRyZXNzLW1vZGFsLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usa0JBQUE7RUFDQSxtQkFBQTtFQUNBLHFCQUFBO0VBQ0Esc0JBQUE7QUFDRjtBQUFFO0VBQ0UsZUFBQTtFQUNBLGlCQUFBO0FBRUo7QUFDRTtFQUNFLFdBQUE7RUFDQSxZQUFBO0FBQ0o7QUFFRTtFQUNFLGNBQUE7QUFBSjtBQUlBO0VBQ0UscUJBQUE7RUFDQSxtQkFBQTtBQURGO0FBR0U7RUFDRSxxQkFBQTtBQURKO0FBSUU7RUFDRSx1QkFBQTtBQUZKO0FBT0U7RUFDRSxnQ0FBQTtFQUNBLGVBQUE7QUFKSjtBQU9FO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSwyQkFBQTtBQUxKO0FBUUU7RUFDRSxlQUFBO0FBTko7QUFTRTtFQUNFLGNBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7QUFQSjtBQVVFO0VBQ0UsY0FBQTtFQUNBLGNBQUE7QUFSSiIsImZpbGUiOiJzcmMvYXBwL3dhbGxldHMvc2VuZC9zZWxlY3QtYWRkcmVzcy1tb2RhbC9zZWxlY3QtYWRkcmVzcy1tb2RhbC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5oZWFkZXIge1xuICAtLXBhZGRpbmctZW5kOiA1cHg7XG4gIC0tcGFkZGluZy10b3A6IDEwcHg7XG4gIC0tcGFkZGluZy1ib3R0b206IDVweDtcbiAgLS1pbm5lci1wYWRkaW5nLWVuZDogMDtcbiAgLnRpdGxlIHtcbiAgICBmb250LXNpemU6IDE2cHg7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIH1cblxuICBpb24tYXZhdGFyIHtcbiAgICB3aWR0aDogMjVweDtcbiAgICBoZWlnaHQ6IDI1cHg7XG4gIH1cblxuICBpb24taWNvbiB7XG4gICAgY29sb3I6ICM3MDcwNzA7XG4gIH1cbn1cblxuLmxpc3Qtd3JhcHBlciB7XG4gIC0tcGFkZGluZy1zdGFydDogMjBweDtcbiAgLS1wYWRkaW5nLWVuZDogMjBweDtcblxuICBpb24taXRlbSB7XG4gICAgLS1wYWRkaW5nLXN0YXJ0OiAxMHB4O1xuICB9XG5cbiAgaW9uLXNlYXJjaGJhciB7XG4gICAgLS1pY29uLWNvbG9yOiAjMDAwMDAwNWM7XG4gIH1cbn1cblxuaW9uLWxpc3Qge1xuICBpb24taXRlbSB7XG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlYmViZWI7XG4gICAgbWFyZ2luLXRvcDogNXB4O1xuICB9XG5cbiAgaW9uLWF2YXRhciB7XG4gICAgd2lkdGg6IDQwcHg7XG4gICAgaGVpZ2h0OiA0MHB4O1xuICAgIGJveC1zaGFkb3c6IDAgMCA4cHggIzQxYTFjODtcbiAgfVxuXG4gIC5uYW1lIHtcbiAgICBmb250LXNpemU6IDE2cHg7XG4gIH1cblxuICAuZGVzY3JpcHRpb24ge1xuICAgIGNvbG9yOiAjOWY5ZjlmO1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICBtYXJnaW4tbGVmdDogNXB4O1xuICB9XG5cbiAgLmFkZHJlc3Mge1xuICAgIGNvbG9yOiAjNzU3NTc1O1xuICAgIGZvbnQtc2l6ZTogOXB4O1xuICB9XG59XG4iXX0= */");

/***/ }),

/***/ "./src/app/wallets/send/select-address-modal/select-address-modal.component.ts":
/*!*************************************************************************************!*\
  !*** ./src/app/wallets/send/select-address-modal/select-address-modal.component.ts ***!
  \*************************************************************************************/
/*! exports provided: SelectAddressModalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectAddressModalComponent", function() { return SelectAddressModalComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var src_app_services_address_book_address_book_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/address-book/address-book.service */ "./src/app/services/address-book/address-book.service.ts");




let SelectAddressModalComponent = class SelectAddressModalComponent {
    constructor(addressBookService, modalCtrl) {
        this.addressBookService = addressBookService;
        this.modalCtrl = modalCtrl;
    }
    ngOnInit() {
        this.addressesList = this.addressBookService.getAllSameCryptoAddresses(this.selectedWalletType);
        this.filteredAddresses = this.addressesList;
        console.log('select adddress modal: getAllSameCryptoAddresses', this.addressesList);
    }
    close() {
        this.modalCtrl.dismiss();
    }
    onSearchAddress(e) {
        const inputVal = e.detail.value.toLowerCase();
        if (inputVal && inputVal.trim() !== '') {
            this.filteredAddresses = this.addressesList.filter((address) => {
                return (address.address.toLowerCase().indexOf(inputVal) > -1 ||
                    address.holderName.toLowerCase().indexOf(inputVal) > -1 ||
                    (address.description && address.description.toLowerCase().indexOf(inputVal) > -1));
            });
        }
        else {
            this.filteredAddresses = this.addressesList;
        }
    }
    onSelectAddress(address) {
        // get back the whole address object: might use later for transction data
        this.modalCtrl.dismiss(address, 'confirm');
    }
};
SelectAddressModalComponent.ctorParameters = () => [
    { type: src_app_services_address_book_address_book_service__WEBPACK_IMPORTED_MODULE_3__["AddressBookService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] }
];
SelectAddressModalComponent.propDecorators = {
    selectedWalletType: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }]
};
SelectAddressModalComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-select-address-modal',
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./select-address-modal.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/wallets/send/select-address-modal/select-address-modal.component.html")).default,
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./select-address-modal.component.scss */ "./src/app/wallets/send/select-address-modal/select-address-modal.component.scss")).default]
    })
], SelectAddressModalComponent);



/***/ }),

/***/ "./src/app/wallets/send/send-routing.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/wallets/send/send-routing.module.ts ***!
  \*****************************************************/
/*! exports provided: SendPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SendPageRoutingModule", function() { return SendPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _send_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./send.page */ "./src/app/wallets/send/send.page.ts");




const routes = [
    {
        path: '',
        component: _send_page__WEBPACK_IMPORTED_MODULE_3__["SendPage"],
    },
];
let SendPageRoutingModule = class SendPageRoutingModule {
};
SendPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], SendPageRoutingModule);



/***/ }),

/***/ "./src/app/wallets/send/send.module.ts":
/*!*********************************************!*\
  !*** ./src/app/wallets/send/send.module.ts ***!
  \*********************************************/
/*! exports provided: SendPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SendPageModule", function() { return SendPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var _send_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./send-routing.module */ "./src/app/wallets/send/send-routing.module.ts");
/* harmony import */ var _send_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./send.page */ "./src/app/wallets/send/send.page.ts");
/* harmony import */ var _select_address_modal_select_address_modal_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./select-address-modal/select-address-modal.component */ "./src/app/wallets/send/select-address-modal/select-address-modal.component.ts");








let SendPageModule = class SendPageModule {
};
SendPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _send_routing_module__WEBPACK_IMPORTED_MODULE_5__["SendPageRoutingModule"]],
        declarations: [_send_page__WEBPACK_IMPORTED_MODULE_6__["SendPage"], _select_address_modal_select_address_modal_component__WEBPACK_IMPORTED_MODULE_7__["SelectAddressModalComponent"]],
    })
], SendPageModule);



/***/ }),

/***/ "./src/app/wallets/send/send.page.scss":
/*!*********************************************!*\
  !*** ./src/app/wallets/send/send.page.scss ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".padding-16 {\n  padding-left: 16px;\n}\n\nion-list-header {\n  padding: 0 0px 5px 0;\n}\n\nion-list-header .title {\n  font-size: 16px;\n}\n\nion-list-header ion-label {\n  margin-top: 0;\n}\n\nion-card {\n  margin: 5px 16px;\n  box-shadow: 0px 3px 6px #07467329;\n}\n\nion-card .wallet-name {\n  font-size: 14px;\n  color: #074673;\n}\n\nion-card .wallet-address {\n  color: #757575;\n  font-size: 9px;\n}\n\nion-card .wallet-balance {\n  font-size: 12px;\n  color: #0a0a0a;\n}\n\n.select-btn {\n  color: #074673;\n  font-size: 12px;\n  font-weight: bold;\n}\n\nform {\n  padding: 16px;\n  padding-top: 0;\n}\n\nform .input-shadow {\n  box-shadow: 0px 3px 6px #07467329;\n  border-radius: 8px;\n}\n\nform .amount {\n  font-size: 14px;\n  color: #707070;\n  font-weight: normal;\n}\n\nform .error-message {\n  color: red;\n  font-size: 9px;\n}\n\nform .fee-adjustment .warning {\n  background-color: #074673;\n  color: white;\n  border-radius: 8px;\n  height: 40px;\n  text-align: center;\n  margin: 10px 15px 0;\n  padding: 8px 0;\n}\n\nform .fee-adjustment .warning .icon {\n  display: inline;\n  padding-right: 8px;\n  vertical-align: middle;\n}\n\nform .fee-adjustment .warning .icon ion-icon {\n  height: 25px;\n  width: 25px;\n}\n\nform .fee-adjustment .warning strong {\n  display: inline;\n  font-size: 12px;\n}\n\nform ion-range {\n  --bar-height: 8px;\n  --bar-background: #e6e7e8;\n  --knob-size: 20px;\n  --knob-background: #074673;\n  --bar-background-active: #41a1c8;\n  --knob-box-shadow: 0px 3px 6px #00000029;\n  color: #074673;\n  --bar-border-radius: 5px;\n  padding-top: 0;\n  padding-bottom: 0;\n}\n\nform .fee-note {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-around;\n  --padding-top: 0;\n}\n\nform .fee-note ion-label {\n  margin-top: 0;\n}\n\nform .fee-note p {\n  font-size: 12px;\n}\n\nform .fee-value {\n  color: #41a1c8;\n  font-size: 12px;\n}\n\nform .send-btn {\n  margin-top: 15px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvd2FsbGV0cy9zZW5kL3NlbmQucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usa0JBQUE7QUFDRjs7QUFFQTtFQUNFLG9CQUFBO0FBQ0Y7O0FBQ0U7RUFDRSxlQUFBO0FBQ0o7O0FBQ0U7RUFDRSxhQUFBO0FBQ0o7O0FBR0E7RUFDRSxnQkFBQTtFQUNBLGlDQUFBO0FBQUY7O0FBRUU7RUFDRSxlQUFBO0VBQ0EsY0FBQTtBQUFKOztBQUVFO0VBQ0UsY0FBQTtFQUNBLGNBQUE7QUFBSjs7QUFFRTtFQUNFLGVBQUE7RUFDQSxjQUFBO0FBQUo7O0FBSUE7RUFDRSxjQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0FBREY7O0FBSUE7RUFDRSxhQUFBO0VBQ0EsY0FBQTtBQURGOztBQUdFO0VBQ0UsaUNBQUE7RUFDQSxrQkFBQTtBQURKOztBQUlFO0VBQ0UsZUFBQTtFQUNBLGNBQUE7RUFDQSxtQkFBQTtBQUZKOztBQUtFO0VBQ0UsVUFBQTtFQUNBLGNBQUE7QUFISjs7QUFPSTtFQUNFLHlCQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxjQUFBO0FBTE47O0FBT007RUFDRSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSxzQkFBQTtBQUxSOztBQU9RO0VBQ0UsWUFBQTtFQUNBLFdBQUE7QUFMVjs7QUFTTTtFQUNFLGVBQUE7RUFDQSxlQUFBO0FBUFI7O0FBWUU7RUFDRSxpQkFBQTtFQUNBLHlCQUFBO0VBQ0EsaUJBQUE7RUFDQSwwQkFBQTtFQUNBLGdDQUFBO0VBQ0Esd0NBQUE7RUFDQSxjQUFBO0VBQ0Esd0JBQUE7RUFDQSxjQUFBO0VBQ0EsaUJBQUE7QUFWSjs7QUFhRTtFQUNFLGFBQUE7RUFDQSx1QkFBQTtFQUNBLDZCQUFBO0VBQ0EsZ0JBQUE7QUFYSjs7QUFZSTtFQUNFLGFBQUE7QUFWTjs7QUFhSTtFQUNFLGVBQUE7QUFYTjs7QUFlRTtFQUNFLGNBQUE7RUFDQSxlQUFBO0FBYko7O0FBZ0JFO0VBQ0UsZ0JBQUE7QUFkSiIsImZpbGUiOiJzcmMvYXBwL3dhbGxldHMvc2VuZC9zZW5kLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5wYWRkaW5nLTE2IHtcbiAgcGFkZGluZy1sZWZ0OiAxNnB4O1xufVxuXG5pb24tbGlzdC1oZWFkZXIge1xuICBwYWRkaW5nOiAwIDBweCA1cHggMDtcblxuICAudGl0bGUge1xuICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgfVxuICBpb24tbGFiZWwge1xuICAgIG1hcmdpbi10b3A6IDA7XG4gIH1cbn1cblxuaW9uLWNhcmQge1xuICBtYXJnaW46IDVweCAxNnB4O1xuICBib3gtc2hhZG93OiAwcHggM3B4IDZweCAjMDc0NjczMjk7XG5cbiAgLndhbGxldC1uYW1lIHtcbiAgICBmb250LXNpemU6IDE0cHg7XG4gICAgY29sb3I6ICMwNzQ2NzM7XG4gIH1cbiAgLndhbGxldC1hZGRyZXNzIHtcbiAgICBjb2xvcjogIzc1NzU3NTtcbiAgICBmb250LXNpemU6IDlweDtcbiAgfVxuICAud2FsbGV0LWJhbGFuY2Uge1xuICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICBjb2xvcjogIzBhMGEwYTtcbiAgfVxufVxuXG4uc2VsZWN0LWJ0biB7XG4gIGNvbG9yOiAjMDc0NjczO1xuICBmb250LXNpemU6IDEycHg7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuXG5mb3JtIHtcbiAgcGFkZGluZzogMTZweDtcbiAgcGFkZGluZy10b3A6IDA7XG5cbiAgLmlucHV0LXNoYWRvdyB7XG4gICAgYm94LXNoYWRvdzogMHB4IDNweCA2cHggIzA3NDY3MzI5O1xuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgfVxuXG4gIC5hbW91bnQge1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICBjb2xvcjogIzcwNzA3MDtcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xuICB9XG5cbiAgLmVycm9yLW1lc3NhZ2Uge1xuICAgIGNvbG9yOiByZWQ7XG4gICAgZm9udC1zaXplOiA5cHg7XG4gIH1cblxuICAuZmVlLWFkanVzdG1lbnQge1xuICAgIC53YXJuaW5nIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICMwNzQ2NzM7XG4gICAgICBjb2xvcjogd2hpdGU7XG4gICAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgICBoZWlnaHQ6IDQwcHg7XG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICBtYXJnaW46IDEwcHggMTVweCAwO1xuICAgICAgcGFkZGluZzogOHB4IDA7XG5cbiAgICAgIC5pY29uIHtcbiAgICAgICAgZGlzcGxheTogaW5saW5lO1xuICAgICAgICBwYWRkaW5nLXJpZ2h0OiA4cHg7XG4gICAgICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG5cbiAgICAgICAgaW9uLWljb24ge1xuICAgICAgICAgIGhlaWdodDogMjVweDtcbiAgICAgICAgICB3aWR0aDogMjVweDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBzdHJvbmcge1xuICAgICAgICBkaXNwbGF5OiBpbmxpbmU7XG4gICAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpb24tcmFuZ2Uge1xuICAgIC0tYmFyLWhlaWdodDogOHB4O1xuICAgIC0tYmFyLWJhY2tncm91bmQ6ICNlNmU3ZTg7XG4gICAgLS1rbm9iLXNpemU6IDIwcHg7XG4gICAgLS1rbm9iLWJhY2tncm91bmQ6ICMwNzQ2NzM7XG4gICAgLS1iYXItYmFja2dyb3VuZC1hY3RpdmU6ICM0MWExYzg7XG4gICAgLS1rbm9iLWJveC1zaGFkb3c6IDBweCAzcHggNnB4ICMwMDAwMDAyOTtcbiAgICBjb2xvcjogIzA3NDY3MztcbiAgICAtLWJhci1ib3JkZXItcmFkaXVzOiA1cHg7XG4gICAgcGFkZGluZy10b3A6IDA7XG4gICAgcGFkZGluZy1ib3R0b206IDA7XG4gIH1cblxuICAuZmVlLW5vdGUge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XG4gICAgLS1wYWRkaW5nLXRvcDogMDtcbiAgICBpb24tbGFiZWwge1xuICAgICAgbWFyZ2luLXRvcDogMDtcbiAgICB9XG5cbiAgICBwIHtcbiAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICB9XG4gIH1cblxuICAuZmVlLXZhbHVlIHtcbiAgICBjb2xvcjogIzQxYTFjODtcbiAgICBmb250LXNpemU6IDEycHg7XG4gIH1cblxuICAuc2VuZC1idG4ge1xuICAgIG1hcmdpbi10b3A6IDE1cHg7XG4gIH1cbn1cbiJdfQ== */");

/***/ }),

/***/ "./src/app/wallets/send/send.page.ts":
/*!*******************************************!*\
  !*** ./src/app/wallets/send/send.page.ts ***!
  \*******************************************/
/*! exports provided: SendPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SendPage", function() { return SendPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var src_app_services_wallets_wallets_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/wallets/wallets.service */ "./src/app/services/wallets/wallets.service.ts");
/* harmony import */ var _confirm_transaction_modal_confirm_transaction_modal_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./confirm-transaction-modal/confirm-transaction-modal.component */ "./src/app/wallets/send/confirm-transaction-modal/confirm-transaction-modal.component.ts");
/* harmony import */ var _select_address_modal_select_address_modal_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./select-address-modal/select-address-modal.component */ "./src/app/wallets/send/select-address-modal/select-address-modal.component.ts");








let SendPage = class SendPage {
    constructor(modalCtrl, route, walletsService) {
        this.modalCtrl = modalCtrl;
        this.route = route;
        this.walletsService = walletsService;
        this.isTokenSelected = false; // determine select a walllet or its token
        this.selectedType = 'AUD';
        // ---- form error handling:
        this.isAmountValid = true;
        // --- fee adjustment:
        this.suggestedFeeAud = 0.0;
        this.isTooLow = false;
        this.isTooHigh = false;
    }
    formInit() {
        this.sendForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
            receiverAddress: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
            amountType: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](this.selectedType, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
            amount: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
            fee: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](this.suggestedFeeAud, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
            description: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null),
        });
    }
    ngOnInit() {
        this.route.paramMap.subscribe((params) => {
            this.selectedWallet = this.walletsService.getWallet(params.get('walletId'));
            console.log('selected wallet:', this.selectedWallet);
            this.cryptoBanlance = this.selectedWallet.walletBalance[1];
            this.audBanlance = this.selectedWallet.walletBalance[0];
            this.transformedWalletData = this.selectedWallet;
            if (params.has('tokenId')) {
                this.isTokenSelected = true;
                this.selectedToken = this.walletsService.getToken(this.selectedWallet, params.get('tokenId'));
                this.cryptoBanlance = this.selectedToken.balance[1];
                this.audBanlance = this.selectedToken.balance[0];
            }
        });
        this.formInit();
    }
    closeModal() {
        this.modalCtrl.dismiss();
    }
    onSelectType(e) {
        this.selectedType = e.detail.value;
    }
    checkAmountValidation(enteredAmount, maxAmount) {
        if (enteredAmount > maxAmount) {
            this.isAmountValid = false;
            this.amountErr = `Avalibal balance is not larger than ${maxAmount}`;
            return;
        }
        this.isAmountValid = true;
    }
    onEnterAmount(e) {
        // --- get the amount based on selected type:
        const enteredAmount = e.target.value;
        if (this.selectedType === 'AUD') {
            // if (enteredAmount > this.audBanlance) {
            //   this.isAmountValid = false;
            //   this.amountErr = `Avalibal balance is not larger than ${this.audBanlance}`;
            //   return;
            // }
            this.checkAmountValidation(enteredAmount, this.audBanlance);
            this.amountAud = enteredAmount;
            this.amountCrypto = enteredAmount / 5000; // mock the calculation
        }
        else {
            // if (enteredAmount > this.cryptoBanlance) {
            //   this.isAmountValid = false;
            //   this.amountErr = `Avalibal balance is not larger than ${this.cryptoBanlance}`;
            //   return;
            // }
            this.checkAmountValidation(enteredAmount, this.cryptoBanlance);
            // this.isAmountValid = true;
            this.amountCrypto = enteredAmount;
            this.amountAud = enteredAmount * 5000; // mock the calculation
        }
        //  --- mock the tax calculation:
        this.tax = (this.amountAud * 0.1) / (1 + 0.1);
        // ----- mock calculate the fee & set the fee selection range:
        this.suggestedFeeAud = +(this.amountAud * 0.05).toFixed(2);
        this.maxFeeAud = +(this.suggestedFeeAud * 2).toFixed(2);
        this.minFeeAud = +(this.suggestedFeeAud * 0.01).toFixed(2);
    }
    onSelectFee(e) {
        console.log('fee:', e.target.value);
        const selectedVal = e.target.value;
        this.selectedFeeAud = e.target.value;
        // show the warning when reach a certain point
        if (selectedVal < this.suggestedFeeAud * 0.02) {
            this.isTooLow = true;
        }
        else if (selectedVal > this.suggestedFeeAud * 1.7) {
            this.isTooHigh = true;
        }
        else {
            this.isTooLow = false;
            this.isTooHigh = false;
        }
        this.selectedFeeAud = e.target.value;
        this.selectedFeeCrypto = +(this.selectedFeeAud * 0.02).toFixed(8); // mock the convertion
    }
    showAddressList() {
        this.modalCtrl
            .create({
            component: _select_address_modal_select_address_modal_component__WEBPACK_IMPORTED_MODULE_7__["SelectAddressModalComponent"],
            cssClass: 'height-eightyfive-modal',
            componentProps: {
                selectedWalletType: this.selectedWallet.walletType,
            },
        })
            .then((modal) => {
            modal.present();
            return modal.onDidDismiss();
        })
            .then((modalData) => {
            if (modalData.role === 'confirm') {
                // get the data from the "select address modal"
                this.sendForm.get('receiverAddress').setValue(modalData.data.address);
                this.receiverName = modalData.data.holderName;
                this.ABNNum = modalData.data.ABNNum;
                this.businessName = modalData.data.businessName;
            }
        });
    }
    onEnterAddress(e) {
        // Validate the entered address
        const enteredAddress = e.target.value;
        if (enteredAddress.length > 12) {
        }
    }
    onEditFee() {
        console.log('editing fee...');
    }
    onSend() {
        const tokenId = this.isTokenSelected ? this.selectedToken.id : null;
        // 1. re-structure the form data to a transaction object:
        const transId = Math.random().toFixed(8);
        const newTransaction = {
            transId: transId,
            time: new Date().getTime(),
            incoming: false,
            address: this.selectedWallet.walletAddress,
            feeCrypto: this.selectedFeeCrypto,
            feeAud: this.selectedFeeAud,
            amount: this.amountCrypto,
            hash: 'jsdfkljasdfasdfasdfasdfarfdadsfdf',
            confirmations: 9,
            amountAUD: this.amountAud,
            businessName: this.businessName,
            receiver: this.receiverName,
            receiverAddress: this.sendForm.value.receiverAddress,
            description: this.sendForm.value.description,
            ABN: this.ABNNum,
            tax: this.tax,
            tokenId: tokenId,
        };
        // 2. open the comfirm alter window:
        this.modalCtrl
            .create({
            component: _confirm_transaction_modal_confirm_transaction_modal_component__WEBPACK_IMPORTED_MODULE_6__["ConfirmTransactionModalComponent"],
            componentProps: {
                transactionData: newTransaction,
                walletType: this.selectedWallet.walletType,
                walletId: this.selectedWallet.walletId,
            },
            cssClass: 'send-confirm-modal ',
        })
            .then((modalEl) => {
            modalEl.present();
        });
    }
};
SendPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ModalController"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
    { type: src_app_services_wallets_wallets_service__WEBPACK_IMPORTED_MODULE_5__["WalletsService"] }
];
SendPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-send',
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./send.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/wallets/send/send.page.html")).default,
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./send.page.scss */ "./src/app/wallets/send/send.page.scss")).default]
    })
], SendPage);



/***/ })

}]);
//# sourceMappingURL=send-send-module-es2015.js.map