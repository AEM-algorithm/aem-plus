(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["notification-notification-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/setting/notification/notification.page.html":
/*!***************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/setting/notification/notification.page.html ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-buttons>\n      <ion-back-button defaultHref=\"/tabnav/setting\" text=\"\"></ion-back-button>\n    </ion-buttons>\n    <ion-title>Notification</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-list style=\"margin-top: 30px\">\n    <ion-item lines=\"none\">\n      <ion-label>Allow all notifications</ion-label>\n      <ion-toggle slot=\"end\" name=\"allowAllNotifications\"></ion-toggle>\n    </ion-item>\n    <ion-item lines=\"none\">\n      <ion-label>Received Currencies</ion-label>\n      <ion-toggle slot=\"end\" name=\"receivedCurrencies\"></ion-toggle>\n    </ion-item>\n    <ion-item lines=\"none\">\n      <ion-label>Account Updates</ion-label>\n      <ion-toggle slot=\"end\" name=\"accountUpdates\"></ion-toggle>\n    </ion-item>\n  </ion-list>\n</ion-content>\n");

/***/ }),

/***/ "./src/app/setting/notification/notification-routing.module.ts":
/*!*********************************************************************!*\
  !*** ./src/app/setting/notification/notification-routing.module.ts ***!
  \*********************************************************************/
/*! exports provided: NotificationPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationPageRoutingModule", function() { return NotificationPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _notification_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./notification.page */ "./src/app/setting/notification/notification.page.ts");




const routes = [
    {
        path: '',
        component: _notification_page__WEBPACK_IMPORTED_MODULE_3__["NotificationPage"]
    }
];
let NotificationPageRoutingModule = class NotificationPageRoutingModule {
};
NotificationPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], NotificationPageRoutingModule);



/***/ }),

/***/ "./src/app/setting/notification/notification.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/setting/notification/notification.module.ts ***!
  \*************************************************************/
/*! exports provided: NotificationPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationPageModule", function() { return NotificationPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var _notification_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./notification-routing.module */ "./src/app/setting/notification/notification-routing.module.ts");
/* harmony import */ var _notification_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./notification.page */ "./src/app/setting/notification/notification.page.ts");







let NotificationPageModule = class NotificationPageModule {
};
NotificationPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _notification_routing_module__WEBPACK_IMPORTED_MODULE_5__["NotificationPageRoutingModule"]
        ],
        declarations: [_notification_page__WEBPACK_IMPORTED_MODULE_6__["NotificationPage"]]
    })
], NotificationPageModule);



/***/ }),

/***/ "./src/app/setting/notification/notification.page.scss":
/*!*************************************************************!*\
  !*** ./src/app/setting/notification/notification.page.scss ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("ion-content {\n  --background: #F9FAFC;\n}\nion-content ion-list {\n  box-shadow: 0 3px 6px #00000029;\n}\nion-content ion-list ion-item {\n  padding: 3px;\n  border-bottom: 1px solid #DFE7ED;\n}\nion-content ion-list ion-item ion-label {\n  font-size: 16px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2V0dGluZy9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLHFCQUFBO0FBQ0Y7QUFDRTtFQUNFLCtCQUFBO0FBQ0o7QUFDSTtFQUNFLFlBQUE7RUFDQSxnQ0FBQTtBQUNOO0FBQ007RUFDRSxlQUFBO0FBQ1IiLCJmaWxlIjoic3JjL2FwcC9zZXR0aW5nL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24ucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaW9uLWNvbnRlbnQge1xuICAtLWJhY2tncm91bmQ6ICNGOUZBRkM7XG5cbiAgaW9uLWxpc3Qge1xuICAgIGJveC1zaGFkb3c6IDAgM3B4IDZweCAjMDAwMDAwMjk7XG5cbiAgICBpb24taXRlbSB7XG4gICAgICBwYWRkaW5nOiAzcHg7XG4gICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI0RGRTdFRDtcblxuICAgICAgaW9uLWxhYmVsIHtcbiAgICAgICAgZm9udC1zaXplOiAxNnB4O1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19 */");

/***/ }),

/***/ "./src/app/setting/notification/notification.page.ts":
/*!***********************************************************!*\
  !*** ./src/app/setting/notification/notification.page.ts ***!
  \***********************************************************/
/*! exports provided: NotificationPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationPage", function() { return NotificationPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");


let NotificationPage = class NotificationPage {
    constructor() { }
    ngOnInit() {
    }
};
NotificationPage.ctorParameters = () => [];
NotificationPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-notification',
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./notification.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/setting/notification/notification.page.html")).default,
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./notification.page.scss */ "./src/app/setting/notification/notification.page.scss")).default]
    })
], NotificationPage);



/***/ })

}]);
//# sourceMappingURL=notification-notification-module-es2015.js.map