(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["edit-edit-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/address-book/edit/edit.page.html":
/*!****************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/address-book/edit/edit.page.html ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-back-button [defaultHref]=\"'/tabnav/address-book/' + addresses.id\" text=\"\"></ion-back-button>\n    </ion-buttons>\n    <ion-buttons slot=\"end\">\n      <ion-button (click)=\"onSave()\"> Save </ion-button>\n    </ion-buttons>\n    <ion-title>Edit Address</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <div class=\"avatar-div\">\n    <ion-avatar>\n      <img src=\"assets/img/contact.png\" />\n    </ion-avatar>\n  </div>\n\n  <form [formGroup]=\"editForm\" (ngSubmit)=\"onSave()\">\n    <div class=\"personal-info-div\">\n      <h5 class=\"title\">Name</h5>\n      <ion-item lines=\"none\">\n        <ion-input formControlName=\"name\"></ion-input>\n      </ion-item>\n\n      <h5 class=\"title\">Email</h5>\n      <ion-item lines=\"none\">\n        <ion-input formControlName=\"email\"></ion-input>\n      </ion-item>\n\n      <h5 class=\"title\">ABN</h5>\n      <ion-item lines=\"none\">\n        <ion-input formControlName=\"ABNNum\"></ion-input>\n      </ion-item>\n\n      <h5 class=\"title\">Company Name</h5>\n      <ion-item lines=\"none\">\n        <ion-input formControlName=\"companyName\"></ion-input>\n      </ion-item>\n\n      <h5 class=\"title\">Company Address</h5>\n      <ion-item lines=\"none\">\n        <ion-textarea formControlName=\"companyAddress\"></ion-textarea>\n      </ion-item>\n    </div>\n\n    <div class=\"addresses-info-div\">\n      <div formArrayName=\"walletsAddresses\" class=\"addresses-info\">\n        <!-- loop throught this contact's addresses -->\n        <div *ngFor=\"let addressCrtl of getAddressControls(); let i = index\" [formGroupName]=\"i\" class=\"address-info\">\n          <ion-item class=\"type-item\" lines=\"none\">\n            <ion-img\n              [src]=\" addressCrtl.value.type === 'BTC'? 'assets/img/bitcoin.png' : 'assets/img/nem-icon.png'\"\n            ></ion-img>\n            <ion-text class=\"wallet-type\">{{addressCrtl.value.type === 'BTC' ? 'BTC' : 'EXM'}}</ion-text>\n          </ion-item>\n\n          <div class=\"info-edit-div address-edit\">\n            <h5 class=\"title description\">Description</h5>\n            <ion-item lines=\"none\" class=\"info-input\">\n              <ion-input formControlName=\"description\"> </ion-input>\n            </ion-item>\n\n            <h5 class=\"title\">Address</h5>\n            <ion-item lines=\"none\" class=\"info-input\">\n              <ion-input formControlName=\"address\"></ion-input>\n            </ion-item>\n          </div>\n        </div>\n      </div>\n\n      <ion-button type=\"submit\" expand=\"block\" class=\"btn-gradient-bg\">Save</ion-button>\n    </div>\n  </form>\n</ion-content>\n");

/***/ }),

/***/ "./src/app/address-book/edit/edit-routing.module.ts":
/*!**********************************************************!*\
  !*** ./src/app/address-book/edit/edit-routing.module.ts ***!
  \**********************************************************/
/*! exports provided: EditPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditPageRoutingModule", function() { return EditPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _edit_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./edit.page */ "./src/app/address-book/edit/edit.page.ts");




const routes = [
    {
        path: '',
        component: _edit_page__WEBPACK_IMPORTED_MODULE_3__["EditPage"]
    }
];
let EditPageRoutingModule = class EditPageRoutingModule {
};
EditPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], EditPageRoutingModule);



/***/ }),

/***/ "./src/app/address-book/edit/edit.module.ts":
/*!**************************************************!*\
  !*** ./src/app/address-book/edit/edit.module.ts ***!
  \**************************************************/
/*! exports provided: EditPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditPageModule", function() { return EditPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var _edit_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./edit-routing.module */ "./src/app/address-book/edit/edit-routing.module.ts");
/* harmony import */ var _edit_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./edit.page */ "./src/app/address-book/edit/edit.page.ts");







let EditPageModule = class EditPageModule {
};
EditPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _edit_routing_module__WEBPACK_IMPORTED_MODULE_5__["EditPageRoutingModule"]],
        declarations: [_edit_page__WEBPACK_IMPORTED_MODULE_6__["EditPage"]],
    })
], EditPageModule);



/***/ }),

/***/ "./src/app/address-book/edit/edit.page.scss":
/*!**************************************************!*\
  !*** ./src/app/address-book/edit/edit.page.scss ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".avatar-div {\n  display: flex;\n  justify-content: center;\n  padding: 20px;\n}\n.avatar-div ion-avatar {\n  width: 100px;\n  height: 100px;\n}\n.title {\n  font-size: 14px;\n  color: #074673;\n  font-weight: bold;\n}\n.personal-info-div {\n  padding: 0 20px 20px 20px;\n}\n.personal-info-div ion-item {\n  box-shadow: 0px 3px 6px #00000029;\n  border-radius: 8px;\n  font-size: 14px;\n}\n.addresses-info-div {\n  background: #f7f7f7;\n  border-radius: 20px 20px 0 0;\n  padding: 20px;\n}\n.addresses-info-div ion-img {\n  height: 25px;\n  width: 25px;\n  padding-right: 5px;\n}\n.addresses-info-div .addresses-info .info-input {\n  --background: #f7f7f7;\n  --border-radius: 4px;\n  font-size: 14px;\n}\n.addresses-info-div .addresses-info .address-info {\n  box-shadow: 0px 3px 6px #00000029;\n  background: #ffffff;\n  border-radius: 20px 20px 20px 20px;\n  margin-bottom: 15px;\n}\n.addresses-info-div .addresses-info .address-info .type-item {\n  border-radius: 20px;\n}\n.addresses-info-div .addresses-info .address-info .address-edit {\n  padding: 0 15px 15px 15px;\n}\n.addresses-info-div .addresses-info .description {\n  margin-top: 5px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRkcmVzcy1ib29rL2VkaXQvZWRpdC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxhQUFBO0FBQ0Y7QUFBRTtFQUNFLFlBQUE7RUFDQSxhQUFBO0FBRUo7QUFFQTtFQUNFLGVBQUE7RUFDQSxjQUFBO0VBQ0EsaUJBQUE7QUFDRjtBQUVBO0VBQ0UseUJBQUE7QUFDRjtBQUFFO0VBQ0UsaUNBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7QUFFSjtBQUVBO0VBQ0UsbUJBQUE7RUFDQSw0QkFBQTtFQUNBLGFBQUE7QUFDRjtBQUNFO0VBQ0UsWUFBQTtFQUNBLFdBQUE7RUFDQSxrQkFBQTtBQUNKO0FBR0k7RUFDRSxxQkFBQTtFQUNBLG9CQUFBO0VBQ0EsZUFBQTtBQUROO0FBSUk7RUFDRSxpQ0FBQTtFQUNBLG1CQUFBO0VBTUEsa0NBQUE7RUFJQSxtQkFBQTtBQVZOO0FBRU07RUFDRSxtQkFBQTtBQUFSO0FBSU07RUFDRSx5QkFBQTtBQUZSO0FBT0k7RUFDRSxlQUFBO0FBTE4iLCJmaWxlIjoic3JjL2FwcC9hZGRyZXNzLWJvb2svZWRpdC9lZGl0LnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5hdmF0YXItZGl2IHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHBhZGRpbmc6IDIwcHg7XG4gIGlvbi1hdmF0YXIge1xuICAgIHdpZHRoOiAxMDBweDtcbiAgICBoZWlnaHQ6IDEwMHB4O1xuICB9XG59XG5cbi50aXRsZSB7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgY29sb3I6ICMwNzQ2NzM7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuXG4ucGVyc29uYWwtaW5mby1kaXYge1xuICBwYWRkaW5nOiAwIDIwcHggMjBweCAyMHB4O1xuICBpb24taXRlbSB7XG4gICAgYm94LXNoYWRvdzogMHB4IDNweCA2cHggIzAwMDAwMDI5O1xuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICBmb250LXNpemU6IDE0cHg7XG4gIH1cbn1cblxuLmFkZHJlc3Nlcy1pbmZvLWRpdiB7XG4gIGJhY2tncm91bmQ6ICNmN2Y3Zjc7XG4gIGJvcmRlci1yYWRpdXM6IDIwcHggMjBweCAwIDA7XG4gIHBhZGRpbmc6IDIwcHg7XG5cbiAgaW9uLWltZyB7XG4gICAgaGVpZ2h0OiAyNXB4O1xuICAgIHdpZHRoOiAyNXB4O1xuICAgIHBhZGRpbmctcmlnaHQ6IDVweDtcbiAgfVxuXG4gIC5hZGRyZXNzZXMtaW5mbyB7XG4gICAgLmluZm8taW5wdXQge1xuICAgICAgLS1iYWNrZ3JvdW5kOiAjZjdmN2Y3O1xuICAgICAgLS1ib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgfVxuXG4gICAgLmFkZHJlc3MtaW5mbyB7XG4gICAgICBib3gtc2hhZG93OiAwcHggM3B4IDZweCAjMDAwMDAwMjk7XG4gICAgICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuXG4gICAgICAudHlwZS1pdGVtIHtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMjBweDtcbiAgICAgIH1cblxuICAgICAgYm9yZGVyLXJhZGl1czogMjBweCAyMHB4IDIwcHggMjBweDtcbiAgICAgIC5hZGRyZXNzLWVkaXQge1xuICAgICAgICBwYWRkaW5nOiAwIDE1cHggMTVweCAxNXB4O1xuICAgICAgfVxuICAgICAgbWFyZ2luLWJvdHRvbTogMTVweDtcbiAgICB9XG5cbiAgICAuZGVzY3JpcHRpb24ge1xuICAgICAgbWFyZ2luLXRvcDogNXB4O1xuICAgIH1cbiAgfVxufVxuIl19 */");

/***/ }),

/***/ "./src/app/address-book/edit/edit.page.ts":
/*!************************************************!*\
  !*** ./src/app/address-book/edit/edit.page.ts ***!
  \************************************************/
/*! exports provided: EditPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditPage", function() { return EditPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var src_app_services_address_book_address_book_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/address-book/address-book.service */ "./src/app/services/address-book/address-book.service.ts");
/* harmony import */ var src_app_services_models_address_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/models/address.modal */ "./src/app/services/models/address.modal.ts");







let EditPage = class EditPage {
    constructor(route, addressBookService, navCtrl) {
        this.route = route;
        this.addressBookService = addressBookService;
        this.navCtrl = navCtrl;
    }
    ngOnInit() {
        this.route.params.subscribe((params) => {
            this.id = params['id'];
            this.addresses = this.addressBookService.getAddress(this.id);
        });
        this.contactChangedSub = this.addressBookService.contactChanged.subscribe((newContact) => {
            this.addresses = newContact;
        });
        let walletsAddresses = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormArray"]([]);
        //   -------  group the wallets' addresses
        for (let address of this.addresses.walletsAddresses) {
            walletsAddresses.push(new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormGroup"]({
                type: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](address.type),
                address: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](address.address, [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]),
                description: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](address.description),
            }));
        }
        this.editForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormGroup"]({
            name: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](this.addresses.name, {
                updateOn: 'blur',
                validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            }),
            ABNNum: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](this.addresses.ABNNum, {
                updateOn: 'blur',
                validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            }),
            email: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](this.addresses.email, {
                updateOn: 'blur',
                validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            }),
            companyAddress: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](this.addresses.companyAddress, {
                updateOn: 'blur',
                validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            }),
            companyName: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](this.addresses.companyName, {
                updateOn: 'blur',
                validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            }),
            walletsAddresses: walletsAddresses,
        });
    }
    getAddressControls() {
        // console.log('get control props:', (<FormArray>this.editForm.get('walletsAddresses')).controls);//value:
        // value: {
        //   address: 'zidiNEMaskdjfksladgjklasdfasdfsdf';
        //   description: 'business';
        //   type: 'NEM';
        // }
        return this.editForm.get('walletsAddresses').controls;
    }
    onSave() {
        const editAddressData = new src_app_services_models_address_modal__WEBPACK_IMPORTED_MODULE_6__["Address"](this.id, this.editForm.value['name'], this.editForm.value['ABNNum'], this.editForm.value['email'], this.editForm.value['companyAddress'], this.editForm.value['companyName'], this.editForm.value['walletsAddresses']);
        this.addressBookService.updateAddress(this.id, editAddressData);
        this.navCtrl.back();
    }
    ngOnDestroy() {
        if (this.contactChangedSub) {
            this.contactChangedSub.unsubscribe();
        }
    }
};
EditPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
    { type: src_app_services_address_book_address_book_service__WEBPACK_IMPORTED_MODULE_5__["AddressBookService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["NavController"] }
];
EditPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-edit',
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./edit.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/address-book/edit/edit.page.html")).default,
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./edit.page.scss */ "./src/app/address-book/edit/edit.page.scss")).default]
    })
], EditPage);



/***/ })

}]);
//# sourceMappingURL=edit-edit-module-es2015.js.map