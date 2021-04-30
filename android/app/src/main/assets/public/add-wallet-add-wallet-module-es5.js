(function () {
  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["add-wallet-add-wallet-module"], {
    /***/
    "./node_modules/raw-loader/dist/cjs.js!./src/app/wallets/add-wallet/add-wallet.page.html":
    /*!***********************************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/wallets/add-wallet/add-wallet.page.html ***!
      \***********************************************************************************************/

    /*! exports provided: default */

    /***/
    function node_modulesRawLoaderDistCjsJsSrcAppWalletsAddWalletAddWalletPageHtml(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<ion-header>\n  <ion-toolbar>\n    <ion-buttons>\n      <ion-back-button text=\"\" defaultHref=\"/tabnav/wallets\"></ion-back-button>\n    </ion-buttons>\n    <ion-title>Add New Wallet</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class=\"ion-padding\">\n  <form [formGroup]=\"addWalletForm\" (ngSubmit)=\"onAddWallet()\">\n    <h5 class=\"title\">Mnemonic</h5>\n    <ion-item lines=\"none\" class=\"input-shadow\">\n      <ion-input formControlName=\"mnemonic\"></ion-input>\n    </ion-item>\n\n    <h5 class=\"title\">Private Key</h5>\n    <ion-item lines=\"none\" class=\"input-shadow\">\n      <ion-input formControlName=\"privateKey\"></ion-input>\n    </ion-item>\n\n    <h5 class=\"title\">Wallet Address</h5>\n    <ion-item lines=\"none\" class=\"input-shadow\">\n      <ion-input formControlName=\"address\"></ion-input>\n    </ion-item>\n\n    <ion-row class=\"ion-align-items-center tax-row\">\n      <ion-col class=\"ion-no-padding ion-no-margin\">\n        <ion-label class=\"title\"> Wallet Types</ion-label>\n      </ion-col>\n      <ion-col class=\"ion-no-padding ion-no-margin\">\n        <ion-item lines=\"none\" class=\"input-shadow ion-no-margin\">\n          <ion-select slot=\"end\" interface=\"popover\" formControlName=\"type\">\n            <ion-select-option value=\"BTC\">BTC</ion-select-option>\n            <ion-select-option value=\"NEM\">NEM</ion-select-option>\n            <ion-select-option value=\"ETH\">ETH</ion-select-option>\n          </ion-select>\n        </ion-item>\n      </ion-col>\n    </ion-row>\n\n    <h5 class=\"title\">Wallet Name</h5>\n    <ion-item lines=\"none\" class=\"input-shadow\">\n      <ion-input formControlName=\"name\"></ion-input>\n    </ion-item>\n\n    <ion-button class=\"ion-margin-top btn-gradient-bg\" expand=\"block\" type=\"submit\" [disabled]=\"addWalletForm.invalid\">\n      Add\n    </ion-button>\n  </form>\n</ion-content>\n";
      /***/
    },

    /***/
    "./src/app/wallets/add-wallet/add-wallet-routing.module.ts":
    /*!*****************************************************************!*\
      !*** ./src/app/wallets/add-wallet/add-wallet-routing.module.ts ***!
      \*****************************************************************/

    /*! exports provided: AddWalletPageRoutingModule */

    /***/
    function srcAppWalletsAddWalletAddWalletRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AddWalletPageRoutingModule", function () {
        return AddWalletPageRoutingModule;
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


      var _add_wallet_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./add-wallet.page */
      "./src/app/wallets/add-wallet/add-wallet.page.ts");

      var routes = [{
        path: '',
        component: _add_wallet_page__WEBPACK_IMPORTED_MODULE_3__["AddWalletPage"]
      }];

      var AddWalletPageRoutingModule = function AddWalletPageRoutingModule() {
        _classCallCheck(this, AddWalletPageRoutingModule);
      };

      AddWalletPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
      })], AddWalletPageRoutingModule);
      /***/
    },

    /***/
    "./src/app/wallets/add-wallet/add-wallet.module.ts":
    /*!*********************************************************!*\
      !*** ./src/app/wallets/add-wallet/add-wallet.module.ts ***!
      \*********************************************************/

    /*! exports provided: AddWalletPageModule */

    /***/
    function srcAppWalletsAddWalletAddWalletModuleTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AddWalletPageModule", function () {
        return AddWalletPageModule;
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


      var _add_wallet_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./add-wallet-routing.module */
      "./src/app/wallets/add-wallet/add-wallet-routing.module.ts");
      /* harmony import */


      var _add_wallet_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./add-wallet.page */
      "./src/app/wallets/add-wallet/add-wallet.page.ts");

      var AddWalletPageModule = function AddWalletPageModule() {
        _classCallCheck(this, AddWalletPageModule);
      };

      AddWalletPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _add_wallet_routing_module__WEBPACK_IMPORTED_MODULE_5__["AddWalletPageRoutingModule"]],
        declarations: [_add_wallet_page__WEBPACK_IMPORTED_MODULE_6__["AddWalletPage"]]
      })], AddWalletPageModule);
      /***/
    },

    /***/
    "./src/app/wallets/add-wallet/add-wallet.page.scss":
    /*!*********************************************************!*\
      !*** ./src/app/wallets/add-wallet/add-wallet.page.scss ***!
      \*********************************************************/

    /*! exports provided: default */

    /***/
    function srcAppWalletsAddWalletAddWalletPageScss(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = ".title {\n  color: #074673;\n  font-size: 16px;\n  font-weight: bold;\n}\n\nion-item {\n  box-shadow: 0 3px 6px #00000029;\n  border-radius: 8px;\n  margin: 10px 0;\n}\n\nion-input {\n  --placeholder-color: #000000de;\n  --placeholder-font-style: 12px;\n}\n\nion-select.in-item {\n  max-width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvd2FsbGV0cy9hZGQtd2FsbGV0L2FkZC13YWxsZXQucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsY0FBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtBQUNGOztBQUVBO0VBQ0UsK0JBQUE7RUFDQSxrQkFBQTtFQUNBLGNBQUE7QUFDRjs7QUFFQTtFQUNFLDhCQUFBO0VBQ0EsOEJBQUE7QUFDRjs7QUFFQTtFQUNFLGVBQUE7QUFDRiIsImZpbGUiOiJzcmMvYXBwL3dhbGxldHMvYWRkLXdhbGxldC9hZGQtd2FsbGV0LnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi50aXRsZSB7XG4gIGNvbG9yOiAjMDc0NjczO1xuICBmb250LXNpemU6IDE2cHg7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuXG5pb24taXRlbSB7XG4gIGJveC1zaGFkb3c6IDAgM3B4IDZweCAjMDAwMDAwMjk7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgbWFyZ2luOiAxMHB4IDA7XG59XG5cbmlvbi1pbnB1dCB7XG4gIC0tcGxhY2Vob2xkZXItY29sb3I6ICMwMDAwMDBkZTtcbiAgLS1wbGFjZWhvbGRlci1mb250LXN0eWxlOiAxMnB4O1xufVxuXG5pb24tc2VsZWN0LmluLWl0ZW0ge1xuICBtYXgtd2lkdGg6IDEwMCU7XG59XG4iXX0= */";
      /***/
    },

    /***/
    "./src/app/wallets/add-wallet/add-wallet.page.ts":
    /*!*******************************************************!*\
      !*** ./src/app/wallets/add-wallet/add-wallet.page.ts ***!
      \*******************************************************/

    /*! exports provided: AddWalletPage */

    /***/
    function srcAppWalletsAddWalletAddWalletPageTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AddWalletPage", function () {
        return AddWalletPage;
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


      var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/forms */
      "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
      /* harmony import */


      var src_app_services_wallets_wallets_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! src/app/services/wallets/wallets.service */
      "./src/app/services/wallets/wallets.service.ts");

      var AddWalletPage = /*#__PURE__*/function () {
        function AddWalletPage(walletsService) {
          _classCallCheck(this, AddWalletPage);

          this.walletsService = walletsService;
        }

        _createClass(AddWalletPage, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            this.addWalletForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
              name: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null, {
                updateOn: 'blur',
                validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]
              }),
              address: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null, {
                updateOn: 'blur',
                validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]
              }),
              type: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null, {
                updateOn: 'blur',
                validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]
              }),
              mnemonic: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]([], {
                updateOn: 'blur',
                validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]
              }),
              privateKey: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null, {
                updateOn: 'change',
                validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]
              })
            });
          }
        }, {
          key: "onAddWallet",
          value: function onAddWallet() {
            if (!this.addWalletForm.valid) {
              console.log('form is invmnemonicalid');
              return;
            }

            var mnemonic = this.addWalletForm.value.mnemonic.split(' '); // console.log(this.addWalletForm.value, mnemonic);

            this.walletsService.addWallet(this.addWalletForm.value.name, this.addWalletForm.value.address, this.addWalletForm.value.type, mnemonic);
            this.addWalletForm.reset();
          }
        }]);

        return AddWalletPage;
      }();

      AddWalletPage.ctorParameters = function () {
        return [{
          type: src_app_services_wallets_wallets_service__WEBPACK_IMPORTED_MODULE_3__["WalletsService"]
        }];
      };

      AddWalletPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-add-wallet',
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
        /*! raw-loader!./add-wallet.page.html */
        "./node_modules/raw-loader/dist/cjs.js!./src/app/wallets/add-wallet/add-wallet.page.html"))["default"],
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
        /*! ./add-wallet.page.scss */
        "./src/app/wallets/add-wallet/add-wallet.page.scss"))["default"]]
      })], AddWalletPage);
      /***/
    }
  }]);
})();
//# sourceMappingURL=add-wallet-add-wallet-module-es5.js.map