(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["add-contact-add-contact-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/address-book/add-contact/add-contact.page.html":
/*!******************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/address-book/add-contact/add-contact.page.html ***!
  \******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-back-button defaultHref=\"/tabnav/address-book\" text=\"\"></ion-back-button>\n    </ion-buttons>\n    <ion-title>Add New Contact</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content [class]=\"isAddAddress ? 'grey-bg': ''\">\n  <div class=\"white-bg\">\n    <div class=\"add-image-div\">\n      <img src=\"assets/img/contact.png\" />\n    </div>\n\n    <ion-grid>\n      <ion-row>\n        <ion-col class=\"text-center\">\n          <h3>Image Picker</h3>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col>\n          <ion-button (click)=\"getImages()\">Choose Images</ion-button>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col>\n          <!-- More Pinterest floating gallery style -->\n          <div class=\"images\">\n            <div class=\"one-image\" *ngFor=\"let img of imageResponse\">\n              <img src=\"{{img}}\" alt=\"\" srcset=\"\" />\n            </div>\n          </div>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n\n    <form [formGroup]=\"addContactForm\">\n      <h5 class=\"label\">Name <span class=\"required-asterisk\">*</span></h5>\n      <ion-item lines=\"none\">\n        <ion-input formControlName=\"name\"></ion-input>\n      </ion-item>\n\n      <h5 class=\"label\">Email</h5>\n      <ion-item lines=\"none\">\n        <ion-input formControlName=\"email\"></ion-input>\n      </ion-item>\n\n      <h5 class=\"label\">ABN Number</h5>\n      <ion-item lines=\"none\">\n        <ion-input formControlName=\"ABNNum\"></ion-input>\n      </ion-item>\n\n      <h5 class=\"label\">Company Name</h5>\n      <ion-item lines=\"none\">\n        <ion-input formControlName=\"companyName\"></ion-input>\n      </ion-item>\n\n      <h5 class=\"label\">Company Address</h5>\n      <ion-item lines=\"none\">\n        <ion-textarea formControlName=\"companyAddress\"></ion-textarea>\n      </ion-item>\n    </form>\n  </div>\n\n  <div [class]=\"isAddAddress ? 'addresses-div add-bg-border': 'addresses-div'\">\n    <div class=\"add-btn-div\">\n      <ion-button fill=\"clear\" class=\"add-btn ion-text-center btn-gradient-bg\" (click)=\"onOpenAddAddressModal()\">\n        <ion-icon slot=\"start\" name=\"add-outline\"></ion-icon>\n        Add an address\n      </ion-button>\n    </div>\n\n    <!-- show the added addresses div if isAddAddress = true -->\n    <div class=\"addresses\" *ngIf=\"isAddAddress\">\n      <div class=\"address\" *ngFor=\"let walletAddress of walletsAddresses\">\n        <ion-card>\n          <ion-item lines=\"none\" class=\"border-bottom\">\n            <ion-img\n              [src]=\" walletAddress.type === 'BTC'? 'assets/img/bitcoin.png' : walletAddress.type === 'NEM'? 'assets/img/nem-icon.png' : 'assets/img/ethereum.png'\"\n            ></ion-img>\n            <ion-text class=\"wallet-type\">{{ walletAddress.type === 'BTC' ? 'BTC' : 'XEM'}} </ion-text>\n            <ion-note>{{walletAddress.description && walletAddress.description}}</ion-note>\n          </ion-item>\n          <ion-card-content> {{walletAddress.address}} </ion-card-content>\n        </ion-card>\n      </div>\n    </div>\n  </div>\n</ion-content>\n\n<ion-footer>\n  <ion-button\n    type=\"submit\"\n    expand=\"block\"\n    class=\"save-btn btn-gradient-bg\"\n    (click)=\"onSaveNewContact()\"\n    [disabled]=\"addContactForm.invalid\"\n    >Save</ion-button\n  >\n</ion-footer>\n");

/***/ }),

/***/ "./src/app/address-book/add-contact/add-contact-routing.module.ts":
/*!************************************************************************!*\
  !*** ./src/app/address-book/add-contact/add-contact-routing.module.ts ***!
  \************************************************************************/
/*! exports provided: AddContactPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddContactPageRoutingModule", function() { return AddContactPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _add_contact_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./add-contact.page */ "./src/app/address-book/add-contact/add-contact.page.ts");




const routes = [
    {
        path: '',
        component: _add_contact_page__WEBPACK_IMPORTED_MODULE_3__["AddContactPage"]
    }
];
let AddContactPageRoutingModule = class AddContactPageRoutingModule {
};
AddContactPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], AddContactPageRoutingModule);



/***/ }),

/***/ "./src/app/address-book/add-contact/add-contact.module.ts":
/*!****************************************************************!*\
  !*** ./src/app/address-book/add-contact/add-contact.module.ts ***!
  \****************************************************************/
/*! exports provided: AddContactPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddContactPageModule", function() { return AddContactPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var _add_contact_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./add-contact-routing.module */ "./src/app/address-book/add-contact/add-contact-routing.module.ts");
/* harmony import */ var _add_contact_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./add-contact.page */ "./src/app/address-book/add-contact/add-contact.page.ts");







let AddContactPageModule = class AddContactPageModule {
};
AddContactPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _add_contact_routing_module__WEBPACK_IMPORTED_MODULE_5__["AddContactPageRoutingModule"]],
        declarations: [_add_contact_page__WEBPACK_IMPORTED_MODULE_6__["AddContactPage"]],
    })
], AddContactPageModule);



/***/ }),

/***/ "./src/app/address-book/add-contact/add-contact.page.scss":
/*!****************************************************************!*\
  !*** ./src/app/address-book/add-contact/add-contact.page.scss ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".grey-bg {\n  --background: #f7f7f7;\n}\n\n.white-bg {\n  background: #ffffff;\n  margin-bottom: -20px;\n  padding-bottom: 20px;\n}\n\n.add-image-div {\n  text-align: center;\n  padding: 20px 0 10px 0;\n}\n\n.add-image-div img {\n  width: 100px;\n  height: 100px;\n}\n\nform {\n  padding: 0 20px;\n  margin-bottom: 40px;\n}\n\nform .label {\n  font-size: 14px;\n  color: #074673;\n}\n\nform ion-item {\n  box-shadow: 0px 3px 6px #00000029;\n  border-radius: 8px;\n  font-size: 14px;\n}\n\n.add-bg-border {\n  border-radius: 20px 20px 0px 0px;\n  background: #f7f7f7;\n}\n\n.addresses-div .add-btn-div {\n  text-align: center;\n  margin-bottom: 10px;\n}\n\n.addresses-div .add-btn-div .add-btn {\n  width: 50%;\n  border-radius: 20px;\n  box-shadow: 0px 3px 6px #00000029;\n  font-size: 14px;\n  height: 44px;\n  margin-top: -22px;\n}\n\n.addresses-div .add-btn-div .add-btn ion-icon {\n  font-size: x-large;\n  --ionicon-stroke-width: 36px;\n}\n\n.addresses-div ion-card {\n  border-radius: 15px;\n  margin: 0 20px 20px 20px;\n  box-shadow: 0px 3px 6px #00000029;\n}\n\n.addresses-div ion-card .border-bottom {\n  --border-width: 0 0 2px 0;\n  --border-color: #f7f7f7;\n}\n\n.addresses-div ion-card ion-note {\n  font-size: 14px;\n  --color: #9f9f9f;\n}\n\n.addresses-div ion-card .wallet-type {\n  font-size: 14px;\n  font-weight: bold;\n  color: #000000;\n  margin-right: 10px;\n}\n\n.addresses-div ion-card ion-img {\n  height: 25px;\n  width: 25px;\n  padding-right: 5px;\n}\n\n.addresses-div ion-card ion-card-content {\n  font-size: 12px;\n  padding: 15px;\n}\n\n.save-btn {\n  padding: 0 10px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRkcmVzcy1ib29rL2FkZC1jb250YWN0L2FkZC1jb250YWN0LnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLHFCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxtQkFBQTtFQUNBLG9CQUFBO0VBQ0Esb0JBQUE7QUFDRjs7QUFFQTtFQUNFLGtCQUFBO0VBQ0Esc0JBQUE7QUFDRjs7QUFBRTtFQUNFLFlBQUE7RUFDQSxhQUFBO0FBRUo7O0FBRUE7RUFDRSxlQUFBO0VBQ0EsbUJBQUE7QUFDRjs7QUFDRTtFQUNFLGVBQUE7RUFDQSxjQUFBO0FBQ0o7O0FBQ0U7RUFDRSxpQ0FBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtBQUNKOztBQUtBO0VBQ0UsZ0NBQUE7RUFDQSxtQkFBQTtBQUZGOztBQU1FO0VBQ0Usa0JBQUE7RUFDQSxtQkFBQTtBQUhKOztBQUtJO0VBQ0UsVUFBQTtFQUNBLG1CQUFBO0VBQ0EsaUNBQUE7RUFDQSxlQUFBO0VBQ0EsWUFBQTtFQUNBLGlCQUFBO0FBSE47O0FBS007RUFDRSxrQkFBQTtFQUNBLDRCQUFBO0FBSFI7O0FBUUU7RUFDRSxtQkFBQTtFQUNBLHdCQUFBO0VBQ0EsaUNBQUE7QUFOSjs7QUFRSTtFQUNFLHlCQUFBO0VBQ0EsdUJBQUE7QUFOTjs7QUFTSTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtBQVBOOztBQVVJO0VBQ0UsZUFBQTtFQUNBLGlCQUFBO0VBQ0EsY0FBQTtFQUNBLGtCQUFBO0FBUk47O0FBV0k7RUFDRSxZQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0FBVE47O0FBWUk7RUFDRSxlQUFBO0VBQ0EsYUFBQTtBQVZOOztBQWVBO0VBQ0UsZUFBQTtBQVpGIiwiZmlsZSI6InNyYy9hcHAvYWRkcmVzcy1ib29rL2FkZC1jb250YWN0L2FkZC1jb250YWN0LnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5ncmV5LWJnIHtcbiAgLS1iYWNrZ3JvdW5kOiAjZjdmN2Y3O1xufVxuXG4ud2hpdGUtYmcge1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICBtYXJnaW4tYm90dG9tOiAtMjBweDtcbiAgcGFkZGluZy1ib3R0b206IDIwcHg7XG59XG5cbi5hZGQtaW1hZ2UtZGl2IHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBwYWRkaW5nOiAyMHB4IDAgMTBweCAwO1xuICBpbWcge1xuICAgIHdpZHRoOiAxMDBweDtcbiAgICBoZWlnaHQ6IDEwMHB4O1xuICB9XG59XG5cbmZvcm0ge1xuICBwYWRkaW5nOiAwIDIwcHg7XG4gIG1hcmdpbi1ib3R0b206IDQwcHg7XG5cbiAgLmxhYmVsIHtcbiAgICBmb250LXNpemU6IDE0cHg7XG4gICAgY29sb3I6ICMwNzQ2NzM7XG4gIH1cbiAgaW9uLWl0ZW0ge1xuICAgIGJveC1zaGFkb3c6IDBweCAzcHggNnB4ICMwMDAwMDAyOTtcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgZm9udC1zaXplOiAxNHB4O1xuICB9XG59XG5cbi8vIC0tLS0tLS0tLS0gICBhZGRkcmVzcyBkaXY6XG4vLyB3aGVuIGFuIGFkZHJlc3MgYWRkZWQgYWRkIHRoZSBib3JkZXIgJiBiZyB0byB0aGUgYWRkcmVzc2VzIGRpdlxuLmFkZC1iZy1ib3JkZXIge1xuICBib3JkZXItcmFkaXVzOiAyMHB4IDIwcHggMHB4IDBweDtcbiAgYmFja2dyb3VuZDogI2Y3ZjdmNztcbn1cblxuLmFkZHJlc3Nlcy1kaXYge1xuICAuYWRkLWJ0bi1kaXYge1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xuXG4gICAgLmFkZC1idG4ge1xuICAgICAgd2lkdGg6IDUwJTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDIwcHg7XG4gICAgICBib3gtc2hhZG93OiAwcHggM3B4IDZweCAjMDAwMDAwMjk7XG4gICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICBoZWlnaHQ6IDQ0cHg7XG4gICAgICBtYXJnaW4tdG9wOiAtMjJweDtcblxuICAgICAgaW9uLWljb24ge1xuICAgICAgICBmb250LXNpemU6IHgtbGFyZ2U7XG4gICAgICAgIC0taW9uaWNvbi1zdHJva2Utd2lkdGg6IDM2cHg7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaW9uLWNhcmQge1xuICAgIGJvcmRlci1yYWRpdXM6IDE1cHg7XG4gICAgbWFyZ2luOiAwIDIwcHggMjBweCAyMHB4O1xuICAgIGJveC1zaGFkb3c6IDBweCAzcHggNnB4ICMwMDAwMDAyOTtcblxuICAgIC5ib3JkZXItYm90dG9tIHtcbiAgICAgIC0tYm9yZGVyLXdpZHRoOiAwIDAgMnB4IDA7XG4gICAgICAtLWJvcmRlci1jb2xvcjogI2Y3ZjdmNztcbiAgICB9XG5cbiAgICBpb24tbm90ZSB7XG4gICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICAtLWNvbG9yOiAjOWY5ZjlmO1xuICAgIH1cblxuICAgIC53YWxsZXQtdHlwZSB7XG4gICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICAgIGNvbG9yOiAjMDAwMDAwO1xuICAgICAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xuICAgIH1cblxuICAgIGlvbi1pbWcge1xuICAgICAgaGVpZ2h0OiAyNXB4O1xuICAgICAgd2lkdGg6IDI1cHg7XG4gICAgICBwYWRkaW5nLXJpZ2h0OiA1cHg7XG4gICAgfVxuXG4gICAgaW9uLWNhcmQtY29udGVudCB7XG4gICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICBwYWRkaW5nOiAxNXB4O1xuICAgIH1cbiAgfVxufVxuXG4uc2F2ZS1idG4ge1xuICBwYWRkaW5nOiAwIDEwcHg7XG59XG4iXX0= */");

/***/ }),

/***/ "./src/app/address-book/add-contact/add-contact.page.ts":
/*!**************************************************************!*\
  !*** ./src/app/address-book/add-contact/add-contact.page.ts ***!
  \**************************************************************/
/*! exports provided: AddContactPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddContactPage", function() { return AddContactPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var src_app_services_address_book_address_book_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/address-book/address-book.service */ "./src/app/services/address-book/address-book.service.ts");
/* harmony import */ var _add_address_modal_add_address_modal_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../add-address-modal/add-address-modal.component */ "./src/app/address-book/add-address-modal/add-address-modal.component.ts");
/* harmony import */ var _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic-native/camera/ngx */ "./node_modules/@ionic-native/camera/__ivy_ngcc__/ngx/index.js");









let AddContactPage = class AddContactPage {
    constructor(modalCtrl, addressesBookService, router, 
    // private imagePicker: ImagePicker,
    // private imagePicker: ImagePicker,
    camera, 
    // private file: File,
    actionSheetController) {
        this.modalCtrl = modalCtrl;
        this.addressesBookService = addressesBookService;
        this.router = router;
        this.camera = camera;
        this.actionSheetController = actionSheetController;
        this.isAddAddress = false;
        this.croppedImagepath = '';
        this.isLoading = false;
        this.imagePickerOptions = {
            maximumImagesCount: 1,
            quality: 50,
        };
        this.walletsAddresses = [];
    }
    ngOnInit() {
        this.addContactForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
            name: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null, {
                updateOn: 'blur',
                validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            }),
            email: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null, {
                updateOn: 'blur',
            }),
            ABNNum: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null, {
                updateOn: 'blur',
            }),
            companyAddress: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null, {
                updateOn: 'blur',
            }),
            companyName: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null, {
                updateOn: 'blur',
            }),
        });
    }
    onOpenAddAddressModal() {
        this.modalCtrl
            .create({
            component: _add_address_modal_add_address_modal_component__WEBPACK_IMPORTED_MODULE_6__["AddAddressModalComponent"],
            cssClass: 'height-sixty-modal',
            componentProps: {
                contact: this.addContactForm.value,
                isNewContact: true,
            },
        })
            .then((modal) => {
            modal.present();
            return modal.onDidDismiss();
        })
            .then((modalData) => {
            if (modalData.role === 'confirm') {
                this.isAddAddress = true;
                const walletAddress = {
                    type: modalData.data.type,
                    address: modalData.data.address,
                    description: modalData.data.description,
                };
                this.walletsAddresses.push(walletAddress);
            }
        });
    }
    onSaveNewContact() {
        this.addressesBookService.addNewContact(this.addContactForm.value['name'], this.addContactForm.value['ABNNum'], this.addContactForm.value['email'], this.addContactForm.value['companyAddress'], this.addContactForm.value['companyName'], this.walletsAddresses);
        this.router.navigateByUrl('/tabnav/address-book');
    }
    // --------------
    pickImage(sourceType) {
        const options = {
            quality: 100,
            sourceType: sourceType,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
        };
        this.camera.getPicture(options).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            this.croppedImagepath = 'data:image/jpeg;base64,' + imageData;
        }, (err) => {
            // Handle error
        });
    }
    getImages() {
        this.options = {
            // Android only. Max images to be selected, defaults to 15. If this is set to 1, upon
            // selection of a single image, the plugin will return it.
            //maximumImagesCount: 3,
            // max width and height to allow the images to be.  Will keep aspect
            // ratio no matter what.  So if both are 800, the returned image
            // will be at most 800 pixels wide and 800 pixels tall.  If the width is
            // 800 and height 0 the image will be 800 pixels wide if the source
            // is at least that wide.
            width: 200,
            //height: 200,
            // quality of resized image, defaults to 100
            quality: 25,
            // output type, defaults to FILE_URIs.
            // available options are
            // window.imagePicker.OutputType.FILE_URI (0) or
            // window.imagePicker.OutputType.BASE64_STRING (1)
            outputType: 1,
        };
        this.imageResponse = [];
        // this.imagePicker.getPictures(this.options).then(
        //   (results) => {
        //     for (var i = 0; i < results.length; i++) {
        //       this.imageResponse.push('data:image/jpeg;base64,' + results[i]);
        //     }
        //   },
        //   (err) => {
        //     alert(err);
        //   }
        // );
    }
    selectImage() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const actionSheet = yield this.actionSheetController.create({
                header: 'Select Image source',
                buttons: [
                    {
                        text: 'Load from Library',
                        handler: () => {
                            this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
                        },
                    },
                    {
                        text: 'Use Camera',
                        handler: () => {
                            this.pickImage(this.camera.PictureSourceType.CAMERA);
                        },
                    },
                    {
                        text: 'Cancel',
                        role: 'cancel',
                    },
                ],
            });
            yield actionSheet.present();
        });
    }
};
AddContactPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"] },
    { type: src_app_services_address_book_address_book_service__WEBPACK_IMPORTED_MODULE_5__["AddressBookService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
    { type: _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_7__["Camera"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ActionSheetController"] }
];
AddContactPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-add-contact',
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./add-contact.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/address-book/add-contact/add-contact.page.html")).default,
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./add-contact.page.scss */ "./src/app/address-book/add-contact/add-contact.page.scss")).default]
    })
], AddContactPage);



/***/ })

}]);
//# sourceMappingURL=add-contact-add-contact-module-es2015.js.map