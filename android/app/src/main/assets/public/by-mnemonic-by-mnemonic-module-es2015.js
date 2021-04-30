(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["by-mnemonic-by-mnemonic-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/login/import-account/by-mnemonic/by-mnemonic.page.html":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/login/import-account/by-mnemonic/by-mnemonic.page.html ***!
  \**************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-back-button defaultHref=\"/import-account\" text=\"\"></ion-back-button>\n    </ion-buttons>\n    <ion-title>Import By Mnemonic</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <ion-list-header class=\"ion-margin-top\"> Import By Mnemonic </ion-list-header>\n    <ion-item lines=\"none\">\n      <ion-textarea rows=\"6\" cols=\"20\" placeholder=\"Enter/Paste mnemonic here...\"></ion-textarea>\n    </ion-item>\n  </ion-list>\n\n  <ion-button class=\"ion-margin\" expand=\"block\" routerLink=\"/tabnav/wallets\"> Import</ion-button>\n</ion-content>\n");

/***/ }),

/***/ "./src/app/login/import-account/by-mnemonic/by-mnemonic-routing.module.ts":
/*!********************************************************************************!*\
  !*** ./src/app/login/import-account/by-mnemonic/by-mnemonic-routing.module.ts ***!
  \********************************************************************************/
/*! exports provided: ByMnemonicPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ByMnemonicPageRoutingModule", function() { return ByMnemonicPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _by_mnemonic_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./by-mnemonic.page */ "./src/app/login/import-account/by-mnemonic/by-mnemonic.page.ts");




const routes = [
    {
        path: '',
        component: _by_mnemonic_page__WEBPACK_IMPORTED_MODULE_3__["ByMnemonicPage"]
    }
];
let ByMnemonicPageRoutingModule = class ByMnemonicPageRoutingModule {
};
ByMnemonicPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], ByMnemonicPageRoutingModule);



/***/ }),

/***/ "./src/app/login/import-account/by-mnemonic/by-mnemonic.module.ts":
/*!************************************************************************!*\
  !*** ./src/app/login/import-account/by-mnemonic/by-mnemonic.module.ts ***!
  \************************************************************************/
/*! exports provided: ByMnemonicPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ByMnemonicPageModule", function() { return ByMnemonicPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var _by_mnemonic_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./by-mnemonic-routing.module */ "./src/app/login/import-account/by-mnemonic/by-mnemonic-routing.module.ts");
/* harmony import */ var _by_mnemonic_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./by-mnemonic.page */ "./src/app/login/import-account/by-mnemonic/by-mnemonic.page.ts");







let ByMnemonicPageModule = class ByMnemonicPageModule {
};
ByMnemonicPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _by_mnemonic_routing_module__WEBPACK_IMPORTED_MODULE_5__["ByMnemonicPageRoutingModule"]
        ],
        declarations: [_by_mnemonic_page__WEBPACK_IMPORTED_MODULE_6__["ByMnemonicPage"]]
    })
], ByMnemonicPageModule);



/***/ }),

/***/ "./src/app/login/import-account/by-mnemonic/by-mnemonic.page.scss":
/*!************************************************************************!*\
  !*** ./src/app/login/import-account/by-mnemonic/by-mnemonic.page.scss ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("ion-textarea {\n  --background: #e6e7e8;\n  border-radius: 8px;\n  padding: 10px;\n  --placeholder-color: #757575;\n  box-shadow: 0px 3px 6px #5a58581a;\n  margin-bottom: 20px;\n  margin-right: 3px;\n}\n\nion-list-header {\n  margin-bottom: 10px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbG9naW4vaW1wb3J0LWFjY291bnQvYnktbW5lbW9uaWMvYnktbW5lbW9uaWMucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBRUUscUJBQUE7RUFDQSxrQkFBQTtFQUNBLGFBQUE7RUFDQSw0QkFBQTtFQUNBLGlDQUFBO0VBQ0EsbUJBQUE7RUFDQSxpQkFBQTtBQUFGOztBQUdBO0VBQ0UsbUJBQUE7QUFBRiIsImZpbGUiOiJzcmMvYXBwL2xvZ2luL2ltcG9ydC1hY2NvdW50L2J5LW1uZW1vbmljL2J5LW1uZW1vbmljLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImlvbi10ZXh0YXJlYSB7XG4gIC8vIGJvcmRlcjogJ25vbmUnO1xuICAtLWJhY2tncm91bmQ6ICNlNmU3ZTg7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgcGFkZGluZzogMTBweDtcbiAgLS1wbGFjZWhvbGRlci1jb2xvcjogIzc1NzU3NTtcbiAgYm94LXNoYWRvdzogMHB4IDNweCA2cHggIzVhNTg1ODFhO1xuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xuICBtYXJnaW4tcmlnaHQ6IDNweDtcbn1cblxuaW9uLWxpc3QtaGVhZGVyIHtcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcbn1cbiJdfQ== */");

/***/ }),

/***/ "./src/app/login/import-account/by-mnemonic/by-mnemonic.page.ts":
/*!**********************************************************************!*\
  !*** ./src/app/login/import-account/by-mnemonic/by-mnemonic.page.ts ***!
  \**********************************************************************/
/*! exports provided: ByMnemonicPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ByMnemonicPage", function() { return ByMnemonicPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");


let ByMnemonicPage = class ByMnemonicPage {
    constructor() { }
    ngOnInit() {
    }
};
ByMnemonicPage.ctorParameters = () => [];
ByMnemonicPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-by-mnemonic',
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./by-mnemonic.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/login/import-account/by-mnemonic/by-mnemonic.page.html")).default,
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./by-mnemonic.page.scss */ "./src/app/login/import-account/by-mnemonic/by-mnemonic.page.scss")).default]
    })
], ByMnemonicPage);



/***/ })

}]);
//# sourceMappingURL=by-mnemonic-by-mnemonic-module-es2015.js.map