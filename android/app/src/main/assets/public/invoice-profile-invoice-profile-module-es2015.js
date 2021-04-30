(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["invoice-profile-invoice-profile-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/setting/invoice-profile/invoice-profile.page.html":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/setting/invoice-profile/invoice-profile.page.html ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-buttons>\n      <ion-back-button defaultHref=\"/tabnav/setting\" text=\"\"></ion-back-button>\n    </ion-buttons>\n    <ion-title>Invoice Profile</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-item lines=\"none\">\n    <ion-input placeholder=\"Business Name\"></ion-input>\n  </ion-item>\n\n  <ion-item lines=\"none\">\n    <ion-input placeholder=\"Business Number\"></ion-input>\n  </ion-item>\n\n  <ion-item lines=\"none\">\n    <ion-input placeholder=\"Company Address\"></ion-input>\n  </ion-item>\n\n  <ion-item lines=\"none\">\n    <ion-input placeholder=\"Phone Number\"></ion-input>\n  </ion-item>\n\n  <p style=\"margin: 0 15px\">Tax</p>\n  <ion-item lines=\"none\">\n    <ion-input placeholder=\"GST/Tax\"></ion-input>\n  </ion-item>\n\n  <!-- <ion-radio-group value=\"inclusive\">\n    <ion-item>\n      <ion-label>Inclusive</ion-label>\n      <ion-radio slot=\"start\" color=\"success\" value=\"inclusive\"></ion-radio>\n    </ion-item>\n\n    <ion-item>\n      <ion-label>Exclusive</ion-label>\n      <ion-radio slot=\"start\" color=\"tertiary\" value=\"exclusive\"></ion-radio>\n    </ion-item>\n\n  </ion-radio-group> -->\n\n  <div style=\"text-align: center\">\n    <ion-button class=\"saveBtn\">Save</ion-button>\n  </div>\n</ion-content>\n");

/***/ }),

/***/ "./src/app/setting/invoice-profile/invoice-profile-routing.module.ts":
/*!***************************************************************************!*\
  !*** ./src/app/setting/invoice-profile/invoice-profile-routing.module.ts ***!
  \***************************************************************************/
/*! exports provided: InvoiceProfilePageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InvoiceProfilePageRoutingModule", function() { return InvoiceProfilePageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _invoice_profile_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./invoice-profile.page */ "./src/app/setting/invoice-profile/invoice-profile.page.ts");




const routes = [
    {
        path: '',
        component: _invoice_profile_page__WEBPACK_IMPORTED_MODULE_3__["InvoiceProfilePage"]
    }
];
let InvoiceProfilePageRoutingModule = class InvoiceProfilePageRoutingModule {
};
InvoiceProfilePageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], InvoiceProfilePageRoutingModule);



/***/ }),

/***/ "./src/app/setting/invoice-profile/invoice-profile.module.ts":
/*!*******************************************************************!*\
  !*** ./src/app/setting/invoice-profile/invoice-profile.module.ts ***!
  \*******************************************************************/
/*! exports provided: InvoiceProfilePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InvoiceProfilePageModule", function() { return InvoiceProfilePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var _invoice_profile_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./invoice-profile-routing.module */ "./src/app/setting/invoice-profile/invoice-profile-routing.module.ts");
/* harmony import */ var _invoice_profile_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./invoice-profile.page */ "./src/app/setting/invoice-profile/invoice-profile.page.ts");







let InvoiceProfilePageModule = class InvoiceProfilePageModule {
};
InvoiceProfilePageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _invoice_profile_routing_module__WEBPACK_IMPORTED_MODULE_5__["InvoiceProfilePageRoutingModule"]
        ],
        declarations: [_invoice_profile_page__WEBPACK_IMPORTED_MODULE_6__["InvoiceProfilePage"]]
    })
], InvoiceProfilePageModule);



/***/ }),

/***/ "./src/app/setting/invoice-profile/invoice-profile.page.scss":
/*!*******************************************************************!*\
  !*** ./src/app/setting/invoice-profile/invoice-profile.page.scss ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("ion-content {\n  --background: #F9FAFC;\n}\n\nion-item {\n  box-shadow: 0 3px 6px #00000029;\n  border-radius: 8px;\n  padding: 3px 0;\n  margin: 20px 15px;\n}\n\n.saveBtn {\n  margin-bottom: 10px;\n  width: 90%;\n  --background: linear-gradient(to bottom, #41a1c8, #074673);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2V0dGluZy9pbnZvaWNlLXByb2ZpbGUvaW52b2ljZS1wcm9maWxlLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLHFCQUFBO0FBQ0Y7O0FBRUE7RUFDRSwrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsY0FBQTtFQUNBLGlCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxtQkFBQTtFQUNBLFVBQUE7RUFDQSwwREFBQTtBQUNGIiwiZmlsZSI6InNyYy9hcHAvc2V0dGluZy9pbnZvaWNlLXByb2ZpbGUvaW52b2ljZS1wcm9maWxlLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImlvbi1jb250ZW50IHtcbiAgLS1iYWNrZ3JvdW5kOiAjRjlGQUZDO1xufVxuXG5pb24taXRlbSB7XG4gIGJveC1zaGFkb3c6IDAgM3B4IDZweCAjMDAwMDAwMjk7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgcGFkZGluZzogM3B4IDA7XG4gIG1hcmdpbjogMjBweCAxNXB4O1xufVxuXG4uc2F2ZUJ0biB7XG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XG4gIHdpZHRoOiA5MCU7XG4gIC0tYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSwgIzQxYTFjOCwgIzA3NDY3Myk7XG59XG4iXX0= */");

/***/ }),

/***/ "./src/app/setting/invoice-profile/invoice-profile.page.ts":
/*!*****************************************************************!*\
  !*** ./src/app/setting/invoice-profile/invoice-profile.page.ts ***!
  \*****************************************************************/
/*! exports provided: InvoiceProfilePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InvoiceProfilePage", function() { return InvoiceProfilePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");


let InvoiceProfilePage = class InvoiceProfilePage {
    constructor() { }
    ngOnInit() {
    }
};
InvoiceProfilePage.ctorParameters = () => [];
InvoiceProfilePage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-invoice-profile',
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./invoice-profile.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/setting/invoice-profile/invoice-profile.page.html")).default,
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./invoice-profile.page.scss */ "./src/app/setting/invoice-profile/invoice-profile.page.scss")).default]
    })
], InvoiceProfilePage);



/***/ })

}]);
//# sourceMappingURL=invoice-profile-invoice-profile-module-es2015.js.map