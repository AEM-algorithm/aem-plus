(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["address-book-address-book-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/address-book/address-book.page.html":
/*!*******************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/address-book/address-book.page.html ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-title>Address Book</ion-title>\n  </ion-toolbar>\n  <div class=\"decription ion-text-center\">\n    <span>Store different currencies under same name</span>\n  </div>\n</ion-header>\n\n<ion-content>\n  <ion-toolbar class=\"search-bar ion-margin-top\">\n    <ion-searchbar slot=\"start\" class=\"ion-no-padding\" (ionChange)=\"onSearchAddress($event)\"></ion-searchbar>\n    <ion-buttons slot=\"end\">\n      <ion-button class=\"add-btn btn-gradient-bg\" routerLink=\"/tabnav/address-book/add-contact\">\n        <ion-icon name=\"add-outline\"></ion-icon>\n      </ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n\n  <div *ngIf=\"isLoading\" class=\"ion-text-center\">\n    <p>fetching contacts data</p>\n    <ion-spinner name=\"crescent\"></ion-spinner>\n  </div>\n\n  <div *ngIf=\"!isLoading && (!addressesList || addressesList.length <= 0)\">\n    <p class=\"ion-text-center\">No address found</p>\n  </div>\n\n  <ion-list class=\"list\" lines=\"none\" *ngIf=\"addressesList && addressesList.length > 0\">\n    <ion-virtual-scroll [items]=\"addressesList\" approxItemHeight=\"70px\">\n      <ion-item-sliding *virtualItem=\"let address\" #contactSlidingItem>\n        <ion-item (click)=\"navToDetail(address.id)\">\n          <ion-avatar slot=\"start\">\n            <img src=\"assets/img/contact.png\" />\n          </ion-avatar>\n          <ion-label>{{ address.name }}</ion-label>\n        </ion-item>\n        <ion-item-options side=\"end\">\n          <ion-item-option color=\"danger\" (click)=\"onDeleteContact(address.id, contactSlidingItem)\">\n            <ion-icon slot=\"icon-only\" name=\"trash\"></ion-icon>\n          </ion-item-option>\n        </ion-item-options>\n      </ion-item-sliding>\n    </ion-virtual-scroll>\n  </ion-list>\n</ion-content>\n");

/***/ }),

/***/ "./src/app/address-book/address-book-routing.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/address-book/address-book-routing.module.ts ***!
  \*************************************************************/
/*! exports provided: AddressBookPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddressBookPageRoutingModule", function() { return AddressBookPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _address_book_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./address-book.page */ "./src/app/address-book/address-book.page.ts");




const routes = [
    {
        path: '',
        component: _address_book_page__WEBPACK_IMPORTED_MODULE_3__["AddressBookPage"],
    },
    {
        path: 'add-contact',
        loadChildren: () => Promise.all(/*! import() | add-contact-add-contact-module */[__webpack_require__.e("common"), __webpack_require__.e("add-contact-add-contact-module")]).then(__webpack_require__.bind(null, /*! ./add-contact/add-contact.module */ "./src/app/address-book/add-contact/add-contact.module.ts")).then((m) => m.AddContactPageModule),
    },
    {
        path: ':id',
        loadChildren: () => Promise.all(/*! import() | detail-detail-module */[__webpack_require__.e("default~detail-detail-module~wallets-wallets-module"), __webpack_require__.e("common"), __webpack_require__.e("detail-detail-module")]).then(__webpack_require__.bind(null, /*! ./detail/detail.module */ "./src/app/address-book/detail/detail.module.ts")).then((m) => m.DetailPageModule),
    },
    {
        path: 'edit/:id',
        loadChildren: () => __webpack_require__.e(/*! import() | edit-edit-module */ "edit-edit-module").then(__webpack_require__.bind(null, /*! ./edit/edit.module */ "./src/app/address-book/edit/edit.module.ts")).then((m) => m.EditPageModule),
    },
];
let AddressBookPageRoutingModule = class AddressBookPageRoutingModule {
};
AddressBookPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], AddressBookPageRoutingModule);



/***/ }),

/***/ "./src/app/address-book/address-book.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/address-book/address-book.module.ts ***!
  \*****************************************************/
/*! exports provided: AddressBookPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddressBookPageModule", function() { return AddressBookPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var _address_book_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./address-book-routing.module */ "./src/app/address-book/address-book-routing.module.ts");
/* harmony import */ var _address_book_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./address-book.page */ "./src/app/address-book/address-book.page.ts");







let AddressBookPageModule = class AddressBookPageModule {
};
AddressBookPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _address_book_routing_module__WEBPACK_IMPORTED_MODULE_5__["AddressBookPageRoutingModule"]],
        declarations: [_address_book_page__WEBPACK_IMPORTED_MODULE_6__["AddressBookPage"]],
    })
], AddressBookPageModule);



/***/ }),

/***/ "./src/app/address-book/address-book.page.scss":
/*!*****************************************************!*\
  !*** ./src/app/address-book/address-book.page.scss ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".search-bar {\n  padding: 0 15px;\n}\n\n.list {\n  padding: 0px 20px;\n}\n\n.list ion-item {\n  margin: 5px 0;\n}\n\n.list ion-item ion-label {\n  --color: #00000099;\n}\n\n.list ion-item ion-avatar {\n  box-shadow: 0 0 8px #41a1c8;\n}\n\n.add-btn {\n  padding-left: 5px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRkcmVzcy1ib29rL2FkZHJlc3MtYm9vay5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxlQUFBO0FBQ0Y7O0FBRUE7RUFDRSxpQkFBQTtBQUNGOztBQUNFO0VBQ0UsYUFBQTtBQUNKOztBQUNJO0VBQ0Usa0JBQUE7QUFDTjs7QUFFSTtFQUNFLDJCQUFBO0FBQU47O0FBS0E7RUFDRSxpQkFBQTtBQUZGIiwiZmlsZSI6InNyYy9hcHAvYWRkcmVzcy1ib29rL2FkZHJlc3MtYm9vay5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuc2VhcmNoLWJhciB7XG4gIHBhZGRpbmc6IDAgMTVweDtcbn1cblxuLmxpc3Qge1xuICBwYWRkaW5nOiAwcHggMjBweDtcblxuICBpb24taXRlbSB7XG4gICAgbWFyZ2luOiA1cHggMDtcblxuICAgIGlvbi1sYWJlbCB7XG4gICAgICAtLWNvbG9yOiAjMDAwMDAwOTk7XG4gICAgfVxuXG4gICAgaW9uLWF2YXRhciB7XG4gICAgICBib3gtc2hhZG93OiAwIDAgOHB4ICM0MWExYzg7XG4gICAgfVxuICB9XG59XG5cbi5hZGQtYnRuIHtcbiAgcGFkZGluZy1sZWZ0OiA1cHg7XG59XG4iXX0= */");

/***/ }),

/***/ "./src/app/address-book/address-book.page.ts":
/*!***************************************************!*\
  !*** ./src/app/address-book/address-book.page.ts ***!
  \***************************************************/
/*! exports provided: AddressBookPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddressBookPage", function() { return AddressBookPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var _services_address_book_address_book_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/address-book/address-book.service */ "./src/app/services/address-book/address-book.service.ts");





let AddressBookPage = class AddressBookPage {
    constructor(addressesBookService, router, route, loadingCtrl, alertCtrl) {
        this.addressesBookService = addressesBookService;
        this.router = router;
        this.route = route;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.isLoading = true;
    }
    ngOnInit() {
        // this.loadingCtrl
        //   .create({
        //     message: 'fetching address book data...',
        //     spinner: 'circles',
        //   })
        //   .then((loadingEl) => {
        //     loadingEl.present();
        //     try {
        //       this.addressesList = this.addressesBookService.getAddressesList();
        //       this.isLoading = false;
        //       loadingEl.dismiss();
        //       // throw new Error(); // testing error alert
        //     } catch (err) {
        //       // handle any errors here:
        //       loadingEl.dismiss();
        //       this.loadingDataFailedAlter('Fetching data failed, please try again');
        //     }
        //     this.addressesChangedSub = this.addressesBookService.addressesChanged.subscribe((newAddresses: Address[]) => {
        //       this.addressesList = newAddresses;
        //     });
        //   });
        //  --- Fake http request:
        setTimeout(() => {
            try {
                this.addressesList = this.addressesBookService.getAddressesList();
                this.isLoading = false;
                // throw new Error(); // testing error alert
            }
            catch (err) {
                // handle any errors here:
                this.loadingDataFailedAlter('Fetching data failed, please try again');
            }
        }, 2000);
    }
    // ionViewWillEnter() {
    //   this.addressesList = this.addressesBookService.getAddressesList();
    // }
    onSearchAddress(event) {
        this.addressesList = this.addressesBookService.filteredAddresses(event.target.value);
    }
    navToDetail(id) {
        this.router.navigate(['/tabnav', 'address-book', id], { relativeTo: this.route });
    }
    onDeleteContact(contactId, slidingItem) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            slidingItem.close();
            const alter = yield this.alertCtrl.create({
                message: 'Are you sure you want to delete this contact?',
                buttons: [
                    {
                        text: 'Cancel',
                    },
                    {
                        text: 'Delete',
                        handler: () => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                            const loading = yield this.loadingCtrl.create({
                                message: 'deleting contact...',
                                duration: 2000,
                                spinner: 'circles',
                            });
                            yield loading.present();
                            try {
                                this.addressesBookService.deleteAContact(contactId);
                            }
                            catch (err) {
                                // catch any errors:
                            }
                            this.router.navigateByUrl('/tabnav/address-book');
                        }),
                    },
                ],
            });
            yield alter.present();
        });
    }
    loadingDataFailedAlter(message) {
        this.alertCtrl
            .create({
            header: 'Fetching data failed',
            message: message,
            buttons: ['Okay'],
        })
            .then((alterEl) => {
            alterEl.present();
        });
    }
    ngOnDestroy() {
        if (this.addressesChangedSub) {
            this.addressesChangedSub.unsubscribe();
        }
    }
};
AddressBookPage.ctorParameters = () => [
    { type: _services_address_book_address_book_service__WEBPACK_IMPORTED_MODULE_4__["AddressBookService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["LoadingController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"] }
];
AddressBookPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-address-book',
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./address-book.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/address-book/address-book.page.html")).default,
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./address-book.page.scss */ "./src/app/address-book/address-book.page.scss")).default]
    })
], AddressBookPage);



/***/ })

}]);
//# sourceMappingURL=address-book-address-book-module-es2015.js.map