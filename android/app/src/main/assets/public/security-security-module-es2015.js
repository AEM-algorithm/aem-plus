(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["security-security-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/setting/security/security.page.html":
/*!*******************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/setting/security/security.page.html ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-buttons>\n      <ion-back-button defaultHref=\"/tabnav/setting\" text=\"\"></ion-back-button>\n    </ion-buttons>\n    <ion-title>Security</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-list style=\"margin-top: 30px\">\n    <ion-item lines=\"none\" (click)=\"onEnterPin()\">\n      <ion-icon name=\"chevron-forward-outline\" slot=\"end\" style=\"color: lightgray\"></ion-icon>\n      <ion-label>Change PIN</ion-label>\n    </ion-item>\n    <ion-item lines=\"none\">\n      <ion-label>Use Touch ID</ion-label>\n      <ion-toggle slot=\"end\" name=\"useTouchId\"></ion-toggle>\n    </ion-item>\n  </ion-list>\n</ion-content>\n");

/***/ }),

/***/ "./src/app/setting/security/security-routing.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/setting/security/security-routing.module.ts ***!
  \*************************************************************/
/*! exports provided: SecurityPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SecurityPageRoutingModule", function() { return SecurityPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _security_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./security.page */ "./src/app/setting/security/security.page.ts");




const routes = [
    {
        path: '',
        component: _security_page__WEBPACK_IMPORTED_MODULE_3__["SecurityPage"]
    }
];
let SecurityPageRoutingModule = class SecurityPageRoutingModule {
};
SecurityPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], SecurityPageRoutingModule);



/***/ }),

/***/ "./src/app/setting/security/security.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/setting/security/security.module.ts ***!
  \*****************************************************/
/*! exports provided: SecurityPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SecurityPageModule", function() { return SecurityPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var _security_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./security-routing.module */ "./src/app/setting/security/security-routing.module.ts");
/* harmony import */ var _security_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./security.page */ "./src/app/setting/security/security.page.ts");







let SecurityPageModule = class SecurityPageModule {
};
SecurityPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _security_routing_module__WEBPACK_IMPORTED_MODULE_5__["SecurityPageRoutingModule"]
        ],
        declarations: [_security_page__WEBPACK_IMPORTED_MODULE_6__["SecurityPage"]]
    })
], SecurityPageModule);



/***/ }),

/***/ "./src/app/setting/security/security.page.scss":
/*!*****************************************************!*\
  !*** ./src/app/setting/security/security.page.scss ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("ion-content {\n  --background: #F9FAFC;\n}\nion-content ion-list {\n  box-shadow: 0 3px 6px #00000029;\n}\nion-content ion-list ion-item {\n  padding: 3px;\n  border-bottom: 1px solid #DFE7ED;\n}\nion-content ion-list ion-item ion-label {\n  font-size: 16px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2V0dGluZy9zZWN1cml0eS9zZWN1cml0eS5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxxQkFBQTtBQUNGO0FBQ0U7RUFDRSwrQkFBQTtBQUNKO0FBQ0k7RUFDRSxZQUFBO0VBQ0EsZ0NBQUE7QUFDTjtBQUNNO0VBQ0UsZUFBQTtBQUNSIiwiZmlsZSI6InNyYy9hcHAvc2V0dGluZy9zZWN1cml0eS9zZWN1cml0eS5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpb24tY29udGVudCB7XG4gIC0tYmFja2dyb3VuZDogI0Y5RkFGQztcblxuICBpb24tbGlzdCB7XG4gICAgYm94LXNoYWRvdzogMCAzcHggNnB4ICMwMDAwMDAyOTtcblxuICAgIGlvbi1pdGVtIHtcbiAgICAgIHBhZGRpbmc6IDNweDtcbiAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjREZFN0VEO1xuXG4gICAgICBpb24tbGFiZWwge1xuICAgICAgICBmb250LXNpemU6IDE2cHg7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0= */");

/***/ }),

/***/ "./src/app/setting/security/security.page.ts":
/*!***************************************************!*\
  !*** ./src/app/setting/security/security.page.ts ***!
  \***************************************************/
/*! exports provided: SecurityPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SecurityPage", function() { return SecurityPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var src_app_pin_modal_pin_modal_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/pin-modal/pin-modal.component */ "./src/app/pin-modal/pin-modal.component.ts");




let SecurityPage = class SecurityPage {
    constructor(modalCtrl) {
        this.modalCtrl = modalCtrl;
    }
    ngOnInit() {
    }
    onEnterPin() {
        this.modalCtrl
            .create({
            component: src_app_pin_modal_pin_modal_component__WEBPACK_IMPORTED_MODULE_3__["PinModalComponent"],
        })
            .then((modalEl) => {
            modalEl.present();
        });
    }
};
SecurityPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] }
];
SecurityPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-security',
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./security.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/setting/security/security.page.html")).default,
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./security.page.scss */ "./src/app/setting/security/security.page.scss")).default]
    })
], SecurityPage);



/***/ })

}]);
//# sourceMappingURL=security-security-module-es2015.js.map