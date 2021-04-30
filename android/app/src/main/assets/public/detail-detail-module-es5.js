(function () {
  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["detail-detail-module"], {
    /***/
    "./node_modules/raw-loader/dist/cjs.js!./src/app/address-book/detail/detail.page.html":
    /*!********************************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/address-book/detail/detail.page.html ***!
      \********************************************************************************************/

    /*! exports provided: default */

    /***/
    function node_modulesRawLoaderDistCjsJsSrcAppAddressBookDetailDetailPageHtml(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-back-button defaultHref=\"/tabnav/address-book\" text=\"\"></ion-back-button>\n    </ion-buttons>\n    <ion-buttons slot=\"end\">\n      <ion-button class=\"edit-btn\" [routerLink]=\"['/tabnav','address-book','edit', address.id]\"> Edit </ion-button>\n    </ion-buttons>\n\n    <ion-title>Address Book</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <div class=\"white-bg\">\n    <!--   ============  Name & img & Company Name      -->\n    <div class=\"contact-name\">\n      <ion-item lines=\"none\">\n        <ion-avatar slot=\"start\">\n          <img src=\"assets/img/contact.png\" />\n        </ion-avatar>\n        <ion-label>\n          <h2>{{address.name}}</h2>\n          <p>{{address.companyName ? address.companyName : ''}}</p>\n        </ion-label>\n      </ion-item>\n    </div>\n\n    <!--   ============   contact personal info: abn, company address/name, email     -->\n    <ion-list lines=\"none\" class=\"contact-info\">\n      <ion-item *ngIf=\"address.ABNNum\">\n        <img slot=\"start\" src=\"assets/addressbook/Icon_business.png\" />\n        <ion-label>{{address.ABNNum}} </ion-label>\n      </ion-item>\n\n      <ion-item *ngIf=\"address.companyAddress\">\n        <ion-icon slot=\"start\" name=\"location\" size=\"small\"></ion-icon>\n        <ion-label> {{address.companyAddress}} </ion-label>\n      </ion-item>\n\n      <ion-item *ngIf=\"address.email\">\n        <ion-icon slot=\"start\" name=\"mail\" size=\"small\"></ion-icon>\n        <ion-label> {{address.email}} </ion-label>\n      </ion-item>\n\n      <ion-item class=\"no-personinfo-ion-item\" *ngIf=\"!address.ABNNum || !address.companyAddress || !address.email\">\n        <ion-label>Add more details by clicking on edit</ion-label>\n      </ion-item>\n    </ion-list>\n  </div>\n\n  <!--     ============   contact's wallets addresses list =============== -->\n  <div class=\"addresses-div\">\n    <div class=\"addbtn-div\">\n      <ion-button class=\"btn-gradient-bg\" (click)=\"onOpenAddAddressModal()\">\n        <ion-icon slot=\"icon-only\" name=\"add-outline\"></ion-icon>\n      </ion-button>\n    </div>\n\n    <div *ngIf=\"!address.walletsAddresses || address.walletsAddresses.length <=0\">\n      <p class=\"ion-text-center ion-margin\">Add an address by clicking the add button. (proper wording & styles?)</p>\n    </div>\n\n    <div class=\"addresses\" *ngFor=\"let walletAddress of address.walletsAddresses\">\n      <ion-card>\n        <ion-item lines=\"none\" class=\"border-bottom\">\n          <ion-img\n            [src]=\" walletAddress.type === 'BTC'? 'assets/img/bitcoin.png' : walletAddress.type === 'NEM'? 'assets/img/nem-icon.png' : 'assets/img/ethereum.png'\"\n          ></ion-img>\n          <ion-text class=\"wallet-name\">{{ walletAddress.type === 'BTC' ? 'BTC' : 'NEM'}} </ion-text>\n          <ion-note>{{walletAddress.description && walletAddress.description}}</ion-note>\n\n          <ion-button fill=\"clear\" slot=\"end\" (click)=\"onShareAddress(walletAddress.address)\">\n            <ion-icon name=\"share-social\" slot=\"icon-only\"></ion-icon>\n          </ion-button>\n          <ion-button fill=\"clear\" slot=\"end\" (click)=\"onDeleteAddress(walletAddress.address)\">\n            <ion-icon name=\"trash\" slot=\"icon-only\"></ion-icon>\n          </ion-button>\n        </ion-item>\n        <ion-card-content (click)=\"onCopyAddress(walletAddress.address)\"> {{walletAddress.address}} </ion-card-content>\n      </ion-card>\n    </div>\n  </div>\n</ion-content>\n";
      /***/
    },

    /***/
    "./src/app/address-book/detail/detail-routing.module.ts":
    /*!**************************************************************!*\
      !*** ./src/app/address-book/detail/detail-routing.module.ts ***!
      \**************************************************************/

    /*! exports provided: DetailPageRoutingModule */

    /***/
    function srcAppAddressBookDetailDetailRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "DetailPageRoutingModule", function () {
        return DetailPageRoutingModule;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "./node_modules/tslib/tslib.es6.js");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/router */
      "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
      /* harmony import */


      var _detail_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./detail.page */
      "./src/app/address-book/detail/detail.page.ts");

      var routes = [{
        path: '',
        component: _detail_page__WEBPACK_IMPORTED_MODULE_3__["DetailPage"]
      }];

      var DetailPageRoutingModule = function DetailPageRoutingModule() {
        _classCallCheck(this, DetailPageRoutingModule);
      };

      DetailPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
      })], DetailPageRoutingModule);
      /***/
    },

    /***/
    "./src/app/address-book/detail/detail.module.ts":
    /*!******************************************************!*\
      !*** ./src/app/address-book/detail/detail.module.ts ***!
      \******************************************************/

    /*! exports provided: DetailPageModule */

    /***/
    function srcAppAddressBookDetailDetailModuleTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "DetailPageModule", function () {
        return DetailPageModule;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "./node_modules/tslib/tslib.es6.js");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/common */
      "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/forms */
      "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @ionic/angular */
      "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
      /* harmony import */


      var _detail_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./detail-routing.module */
      "./src/app/address-book/detail/detail-routing.module.ts");
      /* harmony import */


      var _detail_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./detail.page */
      "./src/app/address-book/detail/detail.page.ts");
      /* harmony import */


      var _add_address_modal_add_address_modal_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ../add-address-modal/add-address-modal.component */
      "./src/app/address-book/add-address-modal/add-address-modal.component.ts");

      var DetailPageModule = function DetailPageModule() {
        _classCallCheck(this, DetailPageModule);
      };

      DetailPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _detail_routing_module__WEBPACK_IMPORTED_MODULE_5__["DetailPageRoutingModule"]],
        declarations: [_detail_page__WEBPACK_IMPORTED_MODULE_6__["DetailPage"], _add_address_modal_add_address_modal_component__WEBPACK_IMPORTED_MODULE_7__["AddAddressModalComponent"]]
      })], DetailPageModule);
      /***/
    },

    /***/
    "./src/app/address-book/detail/detail.page.scss":
    /*!******************************************************!*\
      !*** ./src/app/address-book/detail/detail.page.scss ***!
      \******************************************************/

    /*! exports provided: default */

    /***/
    function srcAppAddressBookDetailDetailPageScss(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "ion-content {\n  --background: #f7f7f7;\n}\n\n.edit-btn {\n  padding-left: 5px;\n  --color: #ffffff;\n}\n\n.white-bg {\n  background: #ffffff;\n  margin-bottom: -20px;\n  padding-bottom: 20px;\n}\n\n.contact-name {\n  display: flex;\n  justify-content: center;\n  padding: 20px;\n}\n\n.contact-name ion-avatar {\n  width: 76px;\n  height: 76px;\n}\n\n.contact-name h2 {\n  font-size: 18px;\n  font-weight: bold;\n}\n\n.contact-name p {\n  font-size: 14px;\n  color: #000000;\n}\n\n.contact-info {\n  margin-bottom: 20px;\n}\n\n.contact-info ion-item {\n  --min-height: 12px;\n}\n\n.contact-info ion-icon {\n  size: 12px;\n  color: #707070;\n}\n\n.contact-info ion-label {\n  font-size: 12px;\n  --color: #707070;\n}\n\n.contact-info img {\n  width: 15px;\n}\n\n.no-personinfo-div {\n  margin-bottom: 20px;\n}\n\n.addresses-div {\n  border-radius: 20px 20px 0px 0px;\n}\n\n.addresses-div .addbtn-div {\n  background: #f7f7f7;\n  border-radius: 20px 20px 0px 0px;\n  margin-bottom: 10px;\n  text-align: center;\n}\n\n.addresses-div .addbtn-div ion-button {\n  margin-top: -20px;\n  width: 40px;\n  height: 40px;\n  --padding-start: 0;\n  --padding-end: 0;\n  --padding-bottom: 0;\n  --padding-top: 0;\n}\n\nion-card {\n  border-radius: 15px;\n  margin: 0 20px 20px 20px;\n  box-shadow: 0px 3px 6px #00000029;\n}\n\nion-card .border-bottom {\n  --border-width: 0 0 2px 0;\n  --border-color: #f7f7f7;\n}\n\nion-card ion-icon {\n  color: #707070;\n}\n\nion-card ion-note {\n  font-size: 14px;\n  --color: #9f9f9f;\n}\n\nion-card .wallet-name {\n  font-size: 14px;\n  font-weight: bold;\n  color: #000000;\n  margin-right: 10px;\n}\n\nion-card ion-img {\n  height: 25px;\n  width: 25px;\n  padding-right: 5px;\n}\n\nion-card ion-card-content {\n  font-size: 12px;\n  padding: 15px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRkcmVzcy1ib29rL2RldGFpbC9kZXRhaWwucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UscUJBQUE7QUFDRjs7QUFFQTtFQUNFLGlCQUFBO0VBQ0EsZ0JBQUE7QUFDRjs7QUFFQTtFQUNFLG1CQUFBO0VBQ0Esb0JBQUE7RUFDQSxvQkFBQTtBQUNGOztBQUVBO0VBQ0UsYUFBQTtFQUNBLHVCQUFBO0VBQ0EsYUFBQTtBQUNGOztBQUNFO0VBQ0UsV0FBQTtFQUNBLFlBQUE7QUFDSjs7QUFFRTtFQUNFLGVBQUE7RUFDQSxpQkFBQTtBQUFKOztBQUdFO0VBQ0UsZUFBQTtFQUNBLGNBQUE7QUFESjs7QUFLQTtFQUNFLG1CQUFBO0FBRkY7O0FBR0U7RUFDRSxrQkFBQTtBQURKOztBQUdFO0VBQ0UsVUFBQTtFQUNBLGNBQUE7QUFESjs7QUFHRTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtBQURKOztBQUdFO0VBQ0UsV0FBQTtBQURKOztBQUtBO0VBQ0UsbUJBQUE7QUFGRjs7QUFLQTtFQUNFLGdDQUFBO0FBRkY7O0FBSUU7RUFDRSxtQkFBQTtFQUNBLGdDQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtBQUZKOztBQUlJO0VBQ0UsaUJBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0FBRk47O0FBT0E7RUFDRSxtQkFBQTtFQUNBLHdCQUFBO0VBQ0EsaUNBQUE7QUFKRjs7QUFNRTtFQUNFLHlCQUFBO0VBQ0EsdUJBQUE7QUFKSjs7QUFPRTtFQUNFLGNBQUE7QUFMSjs7QUFRRTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtBQU5KOztBQVNFO0VBQ0UsZUFBQTtFQUNBLGlCQUFBO0VBQ0EsY0FBQTtFQUNBLGtCQUFBO0FBUEo7O0FBVUU7RUFDRSxZQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0FBUko7O0FBV0U7RUFDRSxlQUFBO0VBQ0EsYUFBQTtBQVRKIiwiZmlsZSI6InNyYy9hcHAvYWRkcmVzcy1ib29rL2RldGFpbC9kZXRhaWwucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaW9uLWNvbnRlbnQge1xuICAtLWJhY2tncm91bmQ6ICNmN2Y3Zjc7XG59XG5cbi5lZGl0LWJ0biB7XG4gIHBhZGRpbmctbGVmdDogNXB4O1xuICAtLWNvbG9yOiAjZmZmZmZmO1xufVxuXG4ud2hpdGUtYmcge1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICBtYXJnaW4tYm90dG9tOiAtMjBweDtcbiAgcGFkZGluZy1ib3R0b206IDIwcHg7XG59XG5cbi5jb250YWN0LW5hbWUge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgcGFkZGluZzogMjBweDtcblxuICBpb24tYXZhdGFyIHtcbiAgICB3aWR0aDogNzZweDtcbiAgICBoZWlnaHQ6IDc2cHg7XG4gIH1cblxuICBoMiB7XG4gICAgZm9udC1zaXplOiAxOHB4O1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICB9XG5cbiAgcCB7XG4gICAgZm9udC1zaXplOiAxNHB4O1xuICAgIGNvbG9yOiAjMDAwMDAwO1xuICB9XG59XG5cbi5jb250YWN0LWluZm8ge1xuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xuICBpb24taXRlbSB7XG4gICAgLS1taW4taGVpZ2h0OiAxMnB4O1xuICB9XG4gIGlvbi1pY29uIHtcbiAgICBzaXplOiAxMnB4O1xuICAgIGNvbG9yOiAjNzA3MDcwO1xuICB9XG4gIGlvbi1sYWJlbCB7XG4gICAgZm9udC1zaXplOiAxMnB4O1xuICAgIC0tY29sb3I6ICM3MDcwNzA7XG4gIH1cbiAgaW1nIHtcbiAgICB3aWR0aDogMTVweDtcbiAgfVxufVxuXG4ubm8tcGVyc29uaW5mby1kaXYge1xuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xufVxuXG4uYWRkcmVzc2VzLWRpdiB7XG4gIGJvcmRlci1yYWRpdXM6IDIwcHggMjBweCAwcHggMHB4O1xuXG4gIC5hZGRidG4tZGl2IHtcbiAgICBiYWNrZ3JvdW5kOiAjZjdmN2Y3O1xuICAgIGJvcmRlci1yYWRpdXM6IDIwcHggMjBweCAwcHggMHB4O1xuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuXG4gICAgaW9uLWJ1dHRvbiB7XG4gICAgICBtYXJnaW4tdG9wOiAtMjBweDtcbiAgICAgIHdpZHRoOiA0MHB4O1xuICAgICAgaGVpZ2h0OiA0MHB4O1xuICAgICAgLS1wYWRkaW5nLXN0YXJ0OiAwO1xuICAgICAgLS1wYWRkaW5nLWVuZDogMDtcbiAgICAgIC0tcGFkZGluZy1ib3R0b206IDA7XG4gICAgICAtLXBhZGRpbmctdG9wOiAwO1xuICAgIH1cbiAgfVxufVxuXG5pb24tY2FyZCB7XG4gIGJvcmRlci1yYWRpdXM6IDE1cHg7XG4gIG1hcmdpbjogMCAyMHB4IDIwcHggMjBweDtcbiAgYm94LXNoYWRvdzogMHB4IDNweCA2cHggIzAwMDAwMDI5O1xuXG4gIC5ib3JkZXItYm90dG9tIHtcbiAgICAtLWJvcmRlci13aWR0aDogMCAwIDJweCAwO1xuICAgIC0tYm9yZGVyLWNvbG9yOiAjZjdmN2Y3O1xuICB9XG5cbiAgaW9uLWljb24ge1xuICAgIGNvbG9yOiAjNzA3MDcwO1xuICB9XG5cbiAgaW9uLW5vdGUge1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICAtLWNvbG9yOiAjOWY5ZjlmO1xuICB9XG5cbiAgLndhbGxldC1uYW1lIHtcbiAgICBmb250LXNpemU6IDE0cHg7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgY29sb3I6ICMwMDAwMDA7XG4gICAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xuICB9XG5cbiAgaW9uLWltZyB7XG4gICAgaGVpZ2h0OiAyNXB4O1xuICAgIHdpZHRoOiAyNXB4O1xuICAgIHBhZGRpbmctcmlnaHQ6IDVweDtcbiAgfVxuXG4gIGlvbi1jYXJkLWNvbnRlbnQge1xuICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICBwYWRkaW5nOiAxNXB4O1xuICB9XG59XG4iXX0= */";
      /***/
    },

    /***/
    "./src/app/address-book/detail/detail.page.ts":
    /*!****************************************************!*\
      !*** ./src/app/address-book/detail/detail.page.ts ***!
      \****************************************************/

    /*! exports provided: DetailPage */

    /***/
    function srcAppAddressBookDetailDetailPageTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "DetailPage", function () {
        return DetailPage;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "./node_modules/tslib/tslib.es6.js");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/router */
      "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
      /* harmony import */


      var _capacitor_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @capacitor/core */
      "./node_modules/@capacitor/core/dist/esm/index.js");
      /* harmony import */


      var _ionic_native_clipboard_ngx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @ionic-native/clipboard/ngx */
      "./node_modules/@ionic-native/clipboard/__ivy_ngcc__/ngx/index.js");
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @ionic/angular */
      "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
      /* harmony import */


      var src_app_services_address_book_address_book_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! src/app/services/address-book/address-book.service */
      "./src/app/services/address-book/address-book.service.ts");
      /* harmony import */


      var _add_address_modal_add_address_modal_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ../add-address-modal/add-address-modal.component */
      "./src/app/address-book/add-address-modal/add-address-modal.component.ts");
      /* harmony import */


      var src_app_services_helper_utils_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! src/app/services/helper/utils.service */
      "./src/app/services/helper/utils.service.ts");

      var Share = _capacitor_core__WEBPACK_IMPORTED_MODULE_3__["Plugins"].Share;

      var DetailPage = /*#__PURE__*/function () {
        function DetailPage(route, addressesBookService, clipboard, plt, modlaCtrl, loadingCtrl, alertCtrl, ultisService) {
          _classCallCheck(this, DetailPage);

          this.route = route;
          this.addressesBookService = addressesBookService;
          this.clipboard = clipboard;
          this.plt = plt;
          this.modlaCtrl = modlaCtrl;
          this.loadingCtrl = loadingCtrl;
          this.alertCtrl = alertCtrl;
          this.ultisService = ultisService;
        }

        _createClass(DetailPage, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this = this;

            this.route.params.subscribe(function (params) {
              _this.address = _this.addressesBookService.getAddress(params['id']);
            });
            this.contactChangedSub = this.addressesBookService.contactChanged.subscribe(function (newContact) {
              _this.address = newContact;
            });
          }
        }, {
          key: "onCopyAddress",
          value: function onCopyAddress(address) {
            this.clipboard.copy(address);
            this.ultisService.showAddressCopyMessage();
          }
        }, {
          key: "onShareAddress",
          value: function onShareAddress(address) {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      if (this.plt.is('cordova')) {
                        _context.next = 3;
                        break;
                      }

                      console.log('Share funciton is not available on web');
                      return _context.abrupt("return");

                    case 3:
                      _context.next = 5;
                      return Share.share({
                        title: 'Share Address',
                        text: address
                      });

                    case 5:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, this);
            }));
          }
        }, {
          key: "onOpenAddAddressModal",
          value: function onOpenAddAddressModal() {
            this.modlaCtrl.create({
              component: _add_address_modal_add_address_modal_component__WEBPACK_IMPORTED_MODULE_7__["AddAddressModalComponent"],
              cssClass: 'height-sixty-modal',
              componentProps: {
                contact: this.address,
                isNewContact: false
              }
            }).then(function (modal) {
              modal.present();
            });
          }
        }, {
          key: "onDeleteAddress",
          value: function onDeleteAddress(address) {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
              var _this2 = this;

              var deleteAddressAlter;
              return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      _context3.next = 2;
                      return this.alertCtrl.create({
                        message: 'Are you sure you want to delete this address?',
                        buttons: [{
                          text: 'Cancel'
                        }, {
                          text: 'Delete',
                          handler: function handler() {
                            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this2, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                              var loading;
                              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                while (1) {
                                  switch (_context2.prev = _context2.next) {
                                    case 0:
                                      _context2.next = 2;
                                      return this.loadingCtrl.create({
                                        message: 'deleting address...',
                                        spinner: 'circles'
                                      });

                                    case 2:
                                      loading = _context2.sent;
                                      _context2.next = 5;
                                      return loading.present();

                                    case 5:
                                      try {
                                        this.addressesBookService.deleteAnAddressFromContact(this.address.id, address);
                                        loading.dismiss();
                                      } catch (err) {// Catch any error here
                                      }

                                    case 6:
                                    case "end":
                                      return _context2.stop();
                                  }
                                }
                              }, _callee2, this);
                            }));
                          }
                        }]
                      });

                    case 2:
                      deleteAddressAlter = _context3.sent;
                      _context3.next = 5;
                      return deleteAddressAlter.present();

                    case 5:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, _callee3, this);
            }));
          }
        }, {
          key: "ngOnDestroy",
          value: function ngOnDestroy() {
            if (this.contactChangedSub) {
              this.contactChangedSub.unsubscribe();
            }
          }
        }]);

        return DetailPage;
      }();

      DetailPage.ctorParameters = function () {
        return [{
          type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]
        }, {
          type: src_app_services_address_book_address_book_service__WEBPACK_IMPORTED_MODULE_6__["AddressBookService"]
        }, {
          type: _ionic_native_clipboard_ngx__WEBPACK_IMPORTED_MODULE_4__["Clipboard"]
        }, {
          type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["Platform"]
        }, {
          type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["ModalController"]
        }, {
          type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["LoadingController"]
        }, {
          type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["AlertController"]
        }, {
          type: src_app_services_helper_utils_service__WEBPACK_IMPORTED_MODULE_8__["UtilsService"]
        }];
      };

      DetailPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-detail',
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
        /*! raw-loader!./detail.page.html */
        "./node_modules/raw-loader/dist/cjs.js!./src/app/address-book/detail/detail.page.html"))["default"],
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
        /*! ./detail.page.scss */
        "./src/app/address-book/detail/detail.page.scss"))["default"]]
      })], DetailPage);
      /***/
    }
  }]);
})();
//# sourceMappingURL=detail-detail-module-es5.js.map