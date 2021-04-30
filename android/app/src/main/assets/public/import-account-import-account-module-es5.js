(function () {
  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["import-account-import-account-module"], {
    /***/
    "./node_modules/raw-loader/dist/cjs.js!./src/app/login/import-account/import-account.page.html":
    /*!*****************************************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/login/import-account/import-account.page.html ***!
      \*****************************************************************************************************/

    /*! exports provided: default */

    /***/
    function node_modulesRawLoaderDistCjsJsSrcAppLoginImportAccountImportAccountPageHtml(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-back-button defaultHref=\"/login\" text=\"\"></ion-back-button>\n    </ion-buttons>\n    <ion-title>Import Account</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-button class=\"ion-margin\" expand=\"block\" routerLink=\"by-mnemonic\">Import By Mnemonic </ion-button>\n  <ion-button class=\"ion-margin\" expand=\"block\" routerLink=\"by-private-key\">Import By Private Key </ion-button>\n\n  <!-- the type of import -->\n</ion-content>\n";
      /***/
    },

    /***/
    "./src/app/login/import-account/import-account-routing.module.ts":
    /*!***********************************************************************!*\
      !*** ./src/app/login/import-account/import-account-routing.module.ts ***!
      \***********************************************************************/

    /*! exports provided: ImportAccountPageRoutingModule */

    /***/
    function srcAppLoginImportAccountImportAccountRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ImportAccountPageRoutingModule", function () {
        return ImportAccountPageRoutingModule;
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


      var _import_account_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./import-account.page */
      "./src/app/login/import-account/import-account.page.ts");

      var routes = [{
        path: '',
        component: _import_account_page__WEBPACK_IMPORTED_MODULE_3__["ImportAccountPage"]
      }, {
        path: 'by-mnemonic',
        loadChildren: function loadChildren() {
          return __webpack_require__.e(
          /*! import() | by-mnemonic-by-mnemonic-module */
          "by-mnemonic-by-mnemonic-module").then(__webpack_require__.bind(null,
          /*! ./by-mnemonic/by-mnemonic.module */
          "./src/app/login/import-account/by-mnemonic/by-mnemonic.module.ts")).then(function (m) {
            return m.ByMnemonicPageModule;
          });
        }
      }, {
        path: 'by-private-key',
        loadChildren: function loadChildren() {
          return __webpack_require__.e(
          /*! import() | by-private-key-by-private-key-module */
          "by-private-key-by-private-key-module").then(__webpack_require__.bind(null,
          /*! ./by-private-key/by-private-key.module */
          "./src/app/login/import-account/by-private-key/by-private-key.module.ts")).then(function (m) {
            return m.ByPrivateKeyPageModule;
          });
        }
      }];

      var ImportAccountPageRoutingModule = function ImportAccountPageRoutingModule() {
        _classCallCheck(this, ImportAccountPageRoutingModule);
      };

      ImportAccountPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
      })], ImportAccountPageRoutingModule);
      /***/
    },

    /***/
    "./src/app/login/import-account/import-account.module.ts":
    /*!***************************************************************!*\
      !*** ./src/app/login/import-account/import-account.module.ts ***!
      \***************************************************************/

    /*! exports provided: ImportAccountPageModule */

    /***/
    function srcAppLoginImportAccountImportAccountModuleTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ImportAccountPageModule", function () {
        return ImportAccountPageModule;
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


      var _import_account_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./import-account-routing.module */
      "./src/app/login/import-account/import-account-routing.module.ts");
      /* harmony import */


      var _import_account_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./import-account.page */
      "./src/app/login/import-account/import-account.page.ts");

      var ImportAccountPageModule = function ImportAccountPageModule() {
        _classCallCheck(this, ImportAccountPageModule);
      };

      ImportAccountPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _import_account_routing_module__WEBPACK_IMPORTED_MODULE_5__["ImportAccountPageRoutingModule"]],
        declarations: [_import_account_page__WEBPACK_IMPORTED_MODULE_6__["ImportAccountPage"]]
      })], ImportAccountPageModule);
      /***/
    },

    /***/
    "./src/app/login/import-account/import-account.page.scss":
    /*!***************************************************************!*\
      !*** ./src/app/login/import-account/import-account.page.scss ***!
      \***************************************************************/

    /*! exports provided: default */

    /***/
    function srcAppLoginImportAccountImportAccountPageScss(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "ion-button {\n  margin: 20px 10px 0 10px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbG9naW4vaW1wb3J0LWFjY291bnQvaW1wb3J0LWFjY291bnQucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usd0JBQUE7QUFDRiIsImZpbGUiOiJzcmMvYXBwL2xvZ2luL2ltcG9ydC1hY2NvdW50L2ltcG9ydC1hY2NvdW50LnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImlvbi1idXR0b24ge1xuICBtYXJnaW46IDIwcHggMTBweCAwIDEwcHg7XG4gIC8vIC0tYm94LXNoYWRvdzogMHB4IDIwcHggMTBweCAjZmZmZmZmMjk7XG59XG4iXX0= */";
      /***/
    },

    /***/
    "./src/app/login/import-account/import-account.page.ts":
    /*!*************************************************************!*\
      !*** ./src/app/login/import-account/import-account.page.ts ***!
      \*************************************************************/

    /*! exports provided: ImportAccountPage */

    /***/
    function srcAppLoginImportAccountImportAccountPageTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ImportAccountPage", function () {
        return ImportAccountPage;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "./node_modules/tslib/tslib.es6.js");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");

      var ImportAccountPage = /*#__PURE__*/function () {
        function ImportAccountPage() {
          _classCallCheck(this, ImportAccountPage);
        }

        _createClass(ImportAccountPage, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }, {
          key: "importByMnemonic",
          value: function importByMnemonic() {}
        }]);

        return ImportAccountPage;
      }();

      ImportAccountPage.ctorParameters = function () {
        return [];
      };

      ImportAccountPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-import-account',
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
        /*! raw-loader!./import-account.page.html */
        "./node_modules/raw-loader/dist/cjs.js!./src/app/login/import-account/import-account.page.html"))["default"],
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
        /*! ./import-account.page.scss */
        "./src/app/login/import-account/import-account.page.scss"))["default"]]
      })], ImportAccountPage);
      /***/
    }
  }]);
})();
//# sourceMappingURL=import-account-import-account-module-es5.js.map