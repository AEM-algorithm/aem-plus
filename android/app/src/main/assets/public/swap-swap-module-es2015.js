(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["swap-swap-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/swap/swap.page.html":
/*!***************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/swap/swap.page.html ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-title>Swap Currencies</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n\n  <p class=\"label\"><b>From</b></p>\n  <ion-item lines=\"none\" class=\"chooseWallet\">\n    <ion-label>Choose Wallet</ion-label>\n    <ion-select interface=\"popover\">\n      <ion-select-option value=\"wallet1\">My Wallet 1 (BTC)</ion-select-option>\n      <ion-select-option value=\"wallet2\">My Wallet 2 (NEM)</ion-select-option>\n      <ion-select-option value=\"wallet3\">My Wallet 3 (ETH)</ion-select-option>\n    </ion-select>\n  </ion-item>\n\n  <ion-icon name=\"swap-vertical-outline\" style=\"padding: 30px 170px 0\"></ion-icon>\n\n  <p class=\"label\"><b>To</b></p>\n  <ion-item lines=\"none\" class=\"chooseWallet\">\n    <ion-label>Choose Wallet</ion-label>\n    <ion-select interface=\"popover\">\n      <ion-select-option value=\"wallet1\">My Wallet 1 (BTC)</ion-select-option>\n      <ion-select-option value=\"wallet2\">My Wallet 2 (NEM)</ion-select-option>\n      <ion-select-option value=\"wallet3\">My Wallet 3 (ETH)</ion-select-option>\n    </ion-select>\n  </ion-item>\n\n  <p class=\"label\"><b>Amount</b></p>\n  <ion-grid style=\"margin: 0 15px\">\n    <ion-row>\n      <ion-col size=\"5\">\n        <ion-item class=\"amount\" lines=\"none\" style=\"border-bottom: 1px solid lightgray\">\n          <ion-input type=\"number\"></ion-input>\n        </ion-item>\n        <ion-item class=\"amount\" lines=\"none\">\n          <ion-input type=\"number\"></ion-input>\n        </ion-item>\n      </ion-col>\n      <ion-col size=\"2\" class=\"ion-align-self-center\">\n        <ion-icon name=\"arrow-forward-outline\" style=\"width: 50px\"></ion-icon>\n      </ion-col>\n      <ion-col size=\"5\">\n        <ion-item class=\"amount\" lines=\"none\">\n          <ion-input type=\"number\"></ion-input>\n        </ion-item>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <ion-button expand=\"block\" style=\"margin: 20px 25px\">Swap</ion-button>\n\n</ion-content>\n");

/***/ }),

/***/ "./src/app/swap/swap-routing.module.ts":
/*!*********************************************!*\
  !*** ./src/app/swap/swap-routing.module.ts ***!
  \*********************************************/
/*! exports provided: SwapPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SwapPageRoutingModule", function() { return SwapPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _swap_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./swap.page */ "./src/app/swap/swap.page.ts");




const routes = [
    {
        path: '',
        component: _swap_page__WEBPACK_IMPORTED_MODULE_3__["SwapPage"]
    }
];
let SwapPageRoutingModule = class SwapPageRoutingModule {
};
SwapPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], SwapPageRoutingModule);



/***/ }),

/***/ "./src/app/swap/swap.module.ts":
/*!*************************************!*\
  !*** ./src/app/swap/swap.module.ts ***!
  \*************************************/
/*! exports provided: SwapPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SwapPageModule", function() { return SwapPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var _swap_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./swap-routing.module */ "./src/app/swap/swap-routing.module.ts");
/* harmony import */ var _swap_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./swap.page */ "./src/app/swap/swap.page.ts");







let SwapPageModule = class SwapPageModule {
};
SwapPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _swap_routing_module__WEBPACK_IMPORTED_MODULE_5__["SwapPageRoutingModule"]],
        declarations: [_swap_page__WEBPACK_IMPORTED_MODULE_6__["SwapPage"]],
    })
], SwapPageModule);



/***/ }),

/***/ "./src/app/swap/swap.page.scss":
/*!*************************************!*\
  !*** ./src/app/swap/swap.page.scss ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".label {\n  padding-left: 25px;\n}\n\n.chooseWallet {\n  margin: 0 25px;\n  box-shadow: 0px 3px 6px lightgray;\n}\n\n.amount {\n  box-shadow: 0px 3px 6px lightgray;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc3dhcC9zd2FwLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGtCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxjQUFBO0VBQ0EsaUNBQUE7QUFDRjs7QUFFQTtFQUNFLGlDQUFBO0FBQ0YiLCJmaWxlIjoic3JjL2FwcC9zd2FwL3N3YXAucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmxhYmVsIHtcbiAgcGFkZGluZy1sZWZ0OiAyNXB4O1xufVxuXG4uY2hvb3NlV2FsbGV0IHtcbiAgbWFyZ2luOiAwIDI1cHg7XG4gIGJveC1zaGFkb3c6IDBweCAzcHggNnB4IGxpZ2h0Z3JheTtcbn1cblxuLmFtb3VudCB7XG4gIGJveC1zaGFkb3c6IDBweCAzcHggNnB4IGxpZ2h0Z3JheTtcbn1cblxuXG4iXX0= */");

/***/ }),

/***/ "./src/app/swap/swap.page.ts":
/*!***********************************!*\
  !*** ./src/app/swap/swap.page.ts ***!
  \***********************************/
/*! exports provided: SwapPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SwapPage", function() { return SwapPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");


let SwapPage = class SwapPage {
    constructor() { }
    ngOnInit() {
    }
};
SwapPage.ctorParameters = () => [];
SwapPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-swap',
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./swap.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/swap/swap.page.html")).default,
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./swap.page.scss */ "./src/app/swap/swap.page.scss")).default]
    })
], SwapPage);



/***/ })

}]);
//# sourceMappingURL=swap-swap-module-es2015.js.map