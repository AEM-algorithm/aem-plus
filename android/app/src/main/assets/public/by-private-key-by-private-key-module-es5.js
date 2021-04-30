(function () {
  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["by-private-key-by-private-key-module"], {
    /***/
    "./node_modules/raw-loader/dist/cjs.js!./src/app/login/import-account/by-private-key/by-private-key.page.html":
    /*!********************************************************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/login/import-account/by-private-key/by-private-key.page.html ***!
      \********************************************************************************************************************/

    /*! exports provided: default */

    /***/
    function node_modulesRawLoaderDistCjsJsSrcAppLoginImportAccountByPrivateKeyByPrivateKeyPageHtml(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-back-button defaultHref=\"/import-account\" text=\"\"></ion-back-button>\n    </ion-buttons>\n    <ion-title>Import By Private Key </ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <ion-item lines=\"none\">\n      <ion-avatar slot=\"start\">\n        <ion-img src=\"assets/img/bitcoin.png\"></ion-img>\n      </ion-avatar>\n      <ion-label><h2>Bitcoin Private Key</h2> </ion-label>\n    </ion-item>\n\n    <ion-item lines=\"none\">\n      <ion-input></ion-input>\n    </ion-item>\n\n    <ion-item lines=\"none\">\n      <ion-avatar slot=\"start\">\n        <ion-img src=\"assets/img/nem-icon.png\"></ion-img>\n      </ion-avatar>\n      <ion-label>\n        <h2>NEM Private Key</h2>\n      </ion-label>\n    </ion-item>\n    <ion-item lines=\"none\">\n      <ion-input></ion-input>\n    </ion-item>\n\n    <ion-item lines=\"none\">\n      <ion-avatar slot=\"start\">\n        <ion-img src=\"assets/img/symbol.png\"></ion-img>\n      </ion-avatar>\n      <ion-label>\n        <h2>Symbol Private Key</h2>\n      </ion-label>\n    </ion-item>\n    <ion-item lines=\"none\">\n      <ion-input></ion-input>\n    </ion-item>\n  </ion-list>\n\n  <ion-button class=\"ion-margin\" expand=\"block\" routerLink=\"/tabnav/wallets\"> Import</ion-button>\n</ion-content>\n";
      /***/
    },

    /***/
    "./src/app/login/import-account/by-private-key/by-private-key-routing.module.ts":
    /*!**************************************************************************************!*\
      !*** ./src/app/login/import-account/by-private-key/by-private-key-routing.module.ts ***!
      \**************************************************************************************/

    /*! exports provided: ByPrivateKeyPageRoutingModule */

    /***/
    function srcAppLoginImportAccountByPrivateKeyByPrivateKeyRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ByPrivateKeyPageRoutingModule", function () {
        return ByPrivateKeyPageRoutingModule;
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


      var _by_private_key_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./by-private-key.page */
      "./src/app/login/import-account/by-private-key/by-private-key.page.ts");

      var routes = [{
        path: '',
        component: _by_private_key_page__WEBPACK_IMPORTED_MODULE_3__["ByPrivateKeyPage"]
      }];

      var ByPrivateKeyPageRoutingModule = function ByPrivateKeyPageRoutingModule() {
        _classCallCheck(this, ByPrivateKeyPageRoutingModule);
      };

      ByPrivateKeyPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
      })], ByPrivateKeyPageRoutingModule);
      /***/
    },

    /***/
    "./src/app/login/import-account/by-private-key/by-private-key.module.ts":
    /*!******************************************************************************!*\
      !*** ./src/app/login/import-account/by-private-key/by-private-key.module.ts ***!
      \******************************************************************************/

    /*! exports provided: ByPrivateKeyPageModule */

    /***/
    function srcAppLoginImportAccountByPrivateKeyByPrivateKeyModuleTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ByPrivateKeyPageModule", function () {
        return ByPrivateKeyPageModule;
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


      var _by_private_key_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./by-private-key-routing.module */
      "./src/app/login/import-account/by-private-key/by-private-key-routing.module.ts");
      /* harmony import */


      var _by_private_key_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./by-private-key.page */
      "./src/app/login/import-account/by-private-key/by-private-key.page.ts");

      var ByPrivateKeyPageModule = function ByPrivateKeyPageModule() {
        _classCallCheck(this, ByPrivateKeyPageModule);
      };

      ByPrivateKeyPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _by_private_key_routing_module__WEBPACK_IMPORTED_MODULE_5__["ByPrivateKeyPageRoutingModule"]],
        declarations: [_by_private_key_page__WEBPACK_IMPORTED_MODULE_6__["ByPrivateKeyPage"]]
      })], ByPrivateKeyPageModule);
      /***/
    },

    /***/
    "./src/app/login/import-account/by-private-key/by-private-key.page.scss":
    /*!******************************************************************************!*\
      !*** ./src/app/login/import-account/by-private-key/by-private-key.page.scss ***!
      \******************************************************************************/

    /*! exports provided: default */

    /***/
    function srcAppLoginImportAccountByPrivateKeyByPrivateKeyPageScss(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "ion-list {\n  margin-top: 20px;\n}\n\nion-item {\n  margin-right: 3px;\n  margin-bottom: 10px;\n}\n\nion-avatar {\n  margin-right: 10px;\n  width: 40px;\n  height: 40px;\n}\n\nion-input {\n  border-radius: 8px;\n  --background: #eaebec;\n  padding: 10px;\n}\n\nh2 {\n  color: #074673;\n  font-size: 20px;\n  font-weight: bold;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbG9naW4vaW1wb3J0LWFjY291bnQvYnktcHJpdmF0ZS1rZXkvYnktcHJpdmF0ZS1rZXkucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZ0JBQUE7QUFDRjs7QUFFQTtFQUNFLGlCQUFBO0VBQ0EsbUJBQUE7QUFDRjs7QUFFQTtFQUNFLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7QUFDRjs7QUFHQTtFQUNFLGtCQUFBO0VBQ0EscUJBQUE7RUFDQSxhQUFBO0FBQUY7O0FBR0E7RUFDRSxjQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0FBQUYiLCJmaWxlIjoic3JjL2FwcC9sb2dpbi9pbXBvcnQtYWNjb3VudC9ieS1wcml2YXRlLWtleS9ieS1wcml2YXRlLWtleS5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpb24tbGlzdCB7XG4gIG1hcmdpbi10b3A6IDIwcHg7XG59XG5cbmlvbi1pdGVtIHtcbiAgbWFyZ2luLXJpZ2h0OiAzcHg7XG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XG59XG5cbmlvbi1hdmF0YXIge1xuICBtYXJnaW4tcmlnaHQ6IDEwcHg7XG4gIHdpZHRoOiA0MHB4O1xuICBoZWlnaHQ6IDQwcHg7XG4gIC8vICAgbWFyZ2luOiAxNXB4IDEwcHggMnB4IDJweDtcbn1cblxuaW9uLWlucHV0IHtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xuICAtLWJhY2tncm91bmQ6ICNlYWViZWM7XG4gIHBhZGRpbmc6IDEwcHg7XG59XG5cbmgyIHtcbiAgY29sb3I6ICMwNzQ2NzM7XG4gIGZvbnQtc2l6ZTogMjBweDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG4iXX0= */";
      /***/
    },

    /***/
    "./src/app/login/import-account/by-private-key/by-private-key.page.ts":
    /*!****************************************************************************!*\
      !*** ./src/app/login/import-account/by-private-key/by-private-key.page.ts ***!
      \****************************************************************************/

    /*! exports provided: ByPrivateKeyPage */

    /***/
    function srcAppLoginImportAccountByPrivateKeyByPrivateKeyPageTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ByPrivateKeyPage", function () {
        return ByPrivateKeyPage;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "./node_modules/tslib/tslib.es6.js");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");

      var ByPrivateKeyPage = /*#__PURE__*/function () {
        function ByPrivateKeyPage() {
          _classCallCheck(this, ByPrivateKeyPage);
        }

        _createClass(ByPrivateKeyPage, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }]);

        return ByPrivateKeyPage;
      }();

      ByPrivateKeyPage.ctorParameters = function () {
        return [];
      };

      ByPrivateKeyPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-by-private-key',
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
        /*! raw-loader!./by-private-key.page.html */
        "./node_modules/raw-loader/dist/cjs.js!./src/app/login/import-account/by-private-key/by-private-key.page.html"))["default"],
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
        /*! ./by-private-key.page.scss */
        "./src/app/login/import-account/by-private-key/by-private-key.page.scss"))["default"]]
      })], ByPrivateKeyPage);
      /***/
    }
  }]);
})();
//# sourceMappingURL=by-private-key-by-private-key-module-es5.js.map