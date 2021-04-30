(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["legal-legal-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/setting/legal/legal.page.html":
/*!*************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/setting/legal/legal.page.html ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-buttons>\n      <ion-back-button defaultHref=\"/tabnav/setting\" text=\"\"></ion-back-button>\n    </ion-buttons>\n    <ion-title>Legal</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <ion-item button>\n      <ion-label>Privacy Policy</ion-label>\n    </ion-item>\n    <ion-item button>\n      <ion-label>Terms and Conditions</ion-label>\n    </ion-item>\n  </ion-list>\n</ion-content>\n");

/***/ }),

/***/ "./src/app/setting/legal/legal-routing.module.ts":
/*!*******************************************************!*\
  !*** ./src/app/setting/legal/legal-routing.module.ts ***!
  \*******************************************************/
/*! exports provided: LegalPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LegalPageRoutingModule", function() { return LegalPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _legal_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./legal.page */ "./src/app/setting/legal/legal.page.ts");




const routes = [
    {
        path: '',
        component: _legal_page__WEBPACK_IMPORTED_MODULE_3__["LegalPage"]
    }
];
let LegalPageRoutingModule = class LegalPageRoutingModule {
};
LegalPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], LegalPageRoutingModule);



/***/ }),

/***/ "./src/app/setting/legal/legal.module.ts":
/*!***********************************************!*\
  !*** ./src/app/setting/legal/legal.module.ts ***!
  \***********************************************/
/*! exports provided: LegalPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LegalPageModule", function() { return LegalPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var _legal_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./legal-routing.module */ "./src/app/setting/legal/legal-routing.module.ts");
/* harmony import */ var _legal_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./legal.page */ "./src/app/setting/legal/legal.page.ts");







let LegalPageModule = class LegalPageModule {
};
LegalPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _legal_routing_module__WEBPACK_IMPORTED_MODULE_5__["LegalPageRoutingModule"]
        ],
        declarations: [_legal_page__WEBPACK_IMPORTED_MODULE_6__["LegalPage"]]
    })
], LegalPageModule);



/***/ }),

/***/ "./src/app/setting/legal/legal.page.scss":
/*!***********************************************!*\
  !*** ./src/app/setting/legal/legal.page.scss ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NldHRpbmcvbGVnYWwvbGVnYWwucGFnZS5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/setting/legal/legal.page.ts":
/*!*********************************************!*\
  !*** ./src/app/setting/legal/legal.page.ts ***!
  \*********************************************/
/*! exports provided: LegalPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LegalPage", function() { return LegalPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");


let LegalPage = class LegalPage {
    constructor() { }
    ngOnInit() {
    }
};
LegalPage.ctorParameters = () => [];
LegalPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-legal',
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./legal.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/setting/legal/legal.page.html")).default,
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./legal.page.scss */ "./src/app/setting/legal/legal.page.scss")).default]
    })
], LegalPage);



/***/ })

}]);
//# sourceMappingURL=legal-legal-module-es2015.js.map