(function () {
  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["create-account-create-account-module"], {
    /***/
    "./node_modules/raw-loader/dist/cjs.js!./src/app/login/create-account/create-account.page.html":
    /*!*****************************************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/login/create-account/create-account.page.html ***!
      \*****************************************************************************************************/

    /*! exports provided: default */

    /***/
    function node_modulesRawLoaderDistCjsJsSrcAppLoginCreateAccountCreateAccountPageHtml(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<ion-header class=\"ion-no-border\">\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-back-button defaultHref=\"/login\" text=\"\"></ion-back-button>\n    </ion-buttons>\n    <ion-title>Create Account</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-card class=\"mnemonic-card\">\n    <ion-card-content class=\"ion-padding\">\n      <!-- <ion-note *ngFor=\"let word of mnemonic\">{{word}}</ion-note> -->\n      <p>{{mnemonic}}</p>\n    </ion-card-content>\n    <!-- <ion-button expand=\"full\">Re-generate Mnemonic</ion-button> -->\n    <div button class=\"btn-div\" (click)=\"onGenerateMnemonic()\">\n      <ion-text> Re-generate Mnemonic </ion-text>\n    </div>\n  </ion-card>\n\n  <ion-card class=\"mnemonic-warning\">\n    <ion-card-header>\n      <ion-chip color=\"warning\">\n        <ion-icon name=\"warning-outline\" color=\"warning\"></ion-icon>\n        <ion-label class=\"warning-title\">Warning</ion-label>\n      </ion-chip>\n    </ion-card-header>\n    <ion-card-content>\n      <!-- <ion-text> -->\n      This mnemonic is the only way you can access your AEM+ account. Be sure to\n      <ion-text color=\"danger\">keep</ion-text> it well before continuing! We are not responsible for any loss that cloud\n      be due to the entropy of key generation\n      <!-- </ion-text> -->\n    </ion-card-content>\n  </ion-card>\n\n  <ion-button expand=\"block\" class=\"continue-btn\" (click)=\"onContinue()\">\n    <!-- <ion-button expand=\"block\" class=\"continue-btn\" routerLink=\"/tabnav/wallets\" (click)=\"onEnterPin()\"> -->\n    Continue\n  </ion-button>\n</ion-content>\n";
      /***/
    },

    /***/
    "./src/app/login/create-account/create-account-routing.module.ts":
    /*!***********************************************************************!*\
      !*** ./src/app/login/create-account/create-account-routing.module.ts ***!
      \***********************************************************************/

    /*! exports provided: CreateAccountPageRoutingModule */

    /***/
    function srcAppLoginCreateAccountCreateAccountRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "CreateAccountPageRoutingModule", function () {
        return CreateAccountPageRoutingModule;
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


      var _create_account_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./create-account.page */
      "./src/app/login/create-account/create-account.page.ts");

      var routes = [{
        path: '',
        component: _create_account_page__WEBPACK_IMPORTED_MODULE_3__["CreateAccountPage"]
      }];

      var CreateAccountPageRoutingModule = function CreateAccountPageRoutingModule() {
        _classCallCheck(this, CreateAccountPageRoutingModule);
      };

      CreateAccountPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
      })], CreateAccountPageRoutingModule);
      /***/
    },

    /***/
    "./src/app/login/create-account/create-account.module.ts":
    /*!***************************************************************!*\
      !*** ./src/app/login/create-account/create-account.module.ts ***!
      \***************************************************************/

    /*! exports provided: CreateAccountPageModule */

    /***/
    function srcAppLoginCreateAccountCreateAccountModuleTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "CreateAccountPageModule", function () {
        return CreateAccountPageModule;
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


      var _create_account_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./create-account-routing.module */
      "./src/app/login/create-account/create-account-routing.module.ts");
      /* harmony import */


      var _create_account_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./create-account.page */
      "./src/app/login/create-account/create-account.page.ts");

      var CreateAccountPageModule = function CreateAccountPageModule() {
        _classCallCheck(this, CreateAccountPageModule);
      };

      CreateAccountPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _create_account_routing_module__WEBPACK_IMPORTED_MODULE_5__["CreateAccountPageRoutingModule"]],
        declarations: [_create_account_page__WEBPACK_IMPORTED_MODULE_6__["CreateAccountPage"]]
      })], CreateAccountPageModule);
      /***/
    },

    /***/
    "./src/app/login/create-account/create-account.page.scss":
    /*!***************************************************************!*\
      !*** ./src/app/login/create-account/create-account.page.scss ***!
      \***************************************************************/

    /*! exports provided: default */

    /***/
    function srcAppLoginCreateAccountCreateAccountPageScss(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = ".warning-title {\n  font-size: 20px;\n  font-weight: bold;\n}\n\n.mnemonic-card {\n  height: 118pt;\n  border: 1px solid #074673;\n  border-radius: 8px;\n  margin-bottom: 20px;\n}\n\n.mnemonic-warning {\n  --background: rgb(221, 220, 220);\n}\n\n.continue-btn {\n  --background: rgb(33, 110, 154);\n}\n\n.btn-div {\n  background: #074673;\n  height: 43px;\n  position: fixed;\n  left: 0;\n  bottom: 0px;\n  right: 0;\n  border-radius: 0 0 6px 6px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.btn-div ion-text {\n  color: #f9fafc;\n  font-size: 16px;\n}\n\nion-note {\n  padding-right: 10px;\n  font-size: 16px;\n  white-space: nowrap;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbG9naW4vY3JlYXRlLWFjY291bnQvY3JlYXRlLWFjY291bnQucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZUFBQTtFQUNBLGlCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxhQUFBO0VBQ0EseUJBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0FBQ0Y7O0FBYUE7RUFDRSxnQ0FBQTtBQVZGOztBQWFBO0VBQ0UsK0JBQUE7QUFWRjs7QUFhQTtFQUNFLG1CQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7RUFDQSxPQUFBO0VBQ0EsV0FBQTtFQUNBLFFBQUE7RUFDQSwwQkFBQTtFQUVBLGFBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0FBWEY7O0FBWUU7RUFDRSxjQUFBO0VBQ0EsZUFBQTtBQVZKOztBQWNBO0VBQ0UsbUJBQUE7RUFDQSxlQUFBO0VBRUEsbUJBQUE7QUFaRiIsImZpbGUiOiJzcmMvYXBwL2xvZ2luL2NyZWF0ZS1hY2NvdW50L2NyZWF0ZS1hY2NvdW50LnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi53YXJuaW5nLXRpdGxlIHtcbiAgZm9udC1zaXplOiAyMHB4O1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuLm1uZW1vbmljLWNhcmQge1xuICBoZWlnaHQ6IDExOHB0O1xuICBib3JkZXI6IDFweCBzb2xpZCByZ2IoNywgNzAsIDExNSk7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgLy8gaW9uLWJ1dHRvbiB7XG4gIC8vICAgLS1iYWNrZ3JvdW5kOiByZ2IoNywgNzAsIDExNSk7XG4gIC8vICAgcG9zaXRpb246IGZpeGVkO1xuICAvLyAgIGxlZnQ6IDA7XG4gIC8vICAgYm90dG9tOiAwcHg7XG4gIC8vICAgcmlnaHQ6IDA7XG4gIC8vICAgYm9yZGVyLXJhZGl1czogOHB4O1xuICAvLyAgIDpob3N0IHtcbiAgLy8gICAgIG1hcmdpbi1pbmxpbmUtc3RhcnQ6IDA7XG4gIC8vICAgfVxuICAvLyB9XG59XG5cbi5tbmVtb25pYy13YXJuaW5nIHtcbiAgLS1iYWNrZ3JvdW5kOiByZ2IoMjIxLCAyMjAsIDIyMCk7XG59XG5cbi5jb250aW51ZS1idG4ge1xuICAtLWJhY2tncm91bmQ6IHJnYigzMywgMTEwLCAxNTQpO1xufVxuXG4uYnRuLWRpdiB7XG4gIGJhY2tncm91bmQ6IHJnYig3LCA3MCwgMTE1KTtcbiAgaGVpZ2h0OiA0M3B4O1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIGxlZnQ6IDA7XG4gIGJvdHRvbTogMHB4O1xuICByaWdodDogMDtcbiAgYm9yZGVyLXJhZGl1czogMCAwIDZweCA2cHg7XG5cbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGlvbi10ZXh0IHtcbiAgICBjb2xvcjogI2Y5ZmFmYztcbiAgICBmb250LXNpemU6IDE2cHg7XG4gIH1cbn1cblxuaW9uLW5vdGUge1xuICBwYWRkaW5nLXJpZ2h0OiAxMHB4O1xuICBmb250LXNpemU6IDE2cHg7XG4gIC8vIHdvcmQtd3JhcDogbm9ybWFsO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xufVxuIl19 */";
      /***/
    },

    /***/
    "./src/app/login/create-account/create-account.page.ts":
    /*!*************************************************************!*\
      !*** ./src/app/login/create-account/create-account.page.ts ***!
      \*************************************************************/

    /*! exports provided: CreateAccountPage */

    /***/
    function srcAppLoginCreateAccountCreateAccountPageTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "CreateAccountPage", function () {
        return CreateAccountPage;
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


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @ionic/angular */
      "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
      /* harmony import */


      var src_app_pin_modal_pin_modal_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! src/app/pin-modal/pin-modal.component */
      "./src/app/pin-modal/pin-modal.component.ts");
      /* harmony import */


      var _ionic_storage_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @ionic/storage-angular */
      "./node_modules/@ionic/storage-angular/__ivy_ngcc__/fesm2015/ionic-storage-angular.js");

      var CreateAccountPage = /*#__PURE__*/function () {
        function CreateAccountPage(modalCtrl, navCtrl, storage) {
          _classCallCheck(this, CreateAccountPage);

          this.modalCtrl = modalCtrl;
          this.navCtrl = navCtrl;
          this.storage = storage;
          this.mnemonic = '';
          this.onGenerateMnemonic();
        }

        _createClass(CreateAccountPage, [{
          key: "ngOnInit",
          value: function ngOnInit() {} // TODO: generate mnemonic method

        }, {
          key: "onGenerateMnemonic",
          value: function onGenerateMnemonic() {
            console.log('generating...'); // this.mnemonic = generateMnemonic();

            return this.mnemonic = ['word', 'toe', 'little', 'arrive', 'wave', 'fan', 'any', 'bonus', 'pin', 'need'];
          } // TODO: Show enter pin modal

        }, {
          key: "onEnterPin",
          value: function onEnterPin() {
            console.log('show pin modal');
          }
        }, {
          key: "onContinue",
          value: function onContinue() {
            // 1. open the pin modal
            this.modalCtrl.create({
              component: src_app_pin_modal_pin_modal_component__WEBPACK_IMPORTED_MODULE_3__["PinModalComponent"]
            }).then(function (modalEl) {
              modalEl.present();
            });
          }
        }]);

        return CreateAccountPage;
      }();

      CreateAccountPage.ctorParameters = function () {
        return [{
          type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"]
        }, {
          type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["NavController"]
        }, {
          type: _ionic_storage_angular__WEBPACK_IMPORTED_MODULE_4__["Storage"]
        }];
      };

      CreateAccountPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-create-account',
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
        /*! raw-loader!./create-account.page.html */
        "./node_modules/raw-loader/dist/cjs.js!./src/app/login/create-account/create-account.page.html"))["default"],
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
        /*! ./create-account.page.scss */
        "./src/app/login/create-account/create-account.page.scss"))["default"]]
      })], CreateAccountPage);
      /***/
    }
  }]);
})();
//# sourceMappingURL=create-account-create-account-module-es5.js.map