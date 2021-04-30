(function () {
  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["transaction-fee-transaction-fee-module"], {
    /***/
    "./node_modules/raw-loader/dist/cjs.js!./src/app/setting/transaction-fee/transaction-fee.page.html":
    /*!*********************************************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/setting/transaction-fee/transaction-fee.page.html ***!
      \*********************************************************************************************************/

    /*! exports provided: default */

    /***/
    function node_modulesRawLoaderDistCjsJsSrcAppSettingTransactionFeeTransactionFeePageHtml(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<ion-header>\n  <ion-toolbar>\n    <ion-buttons>\n      <ion-back-button defaultHref=\"/tabnav/setting\" text=\"\"></ion-back-button>\n    </ion-buttons>\n    <ion-title>Transaction Fees</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-item class=\"warning\" lines=\"none\">\n    <ion-icon name=\"warning-outline\"></ion-icon>\n    <p><strong> higher fee is your own risk</strong></p>\n  </ion-item>\n\n  <ion-item class=\"warning\" lines=\"none\">\n    <ion-icon name=\"warning-outline\"></ion-icon>\n    <p style=\"padding-right: 5px\"><strong>Maximum setting is </strong></p>\n    <p style=\"color: lightgrey\"><strong>200% of suggested fee </strong></p>\n  </ion-item>\n\n  <p style=\"padding: 20px 10px 0\">Maximum fee</p>\n  <ion-item class=\"fee\" lines=\"none\">\n    <!-- <strong style=\"margin: auto;\">$ 15.00</strong> -->\n    <ion-label class=\"transaction-fee\" position=\"fixed\">$</ion-label>\n    <ion-input type=\"number\" value=\"20\"></ion-input>\n  </ion-item>\n\n  <p style=\"padding: 20px 10px 0\">Minimum fee</p>\n  <ion-item class=\"fee\" lines=\"none\">\n    <ion-label class=\"transaction-fee\" position=\"fixed\">$</ion-label>\n    <ion-input type=\"number\" value=\"1\"></ion-input>\n  </ion-item>\n</ion-content>\n";
      /***/
    },

    /***/
    "./src/app/setting/transaction-fee/transaction-fee-routing.module.ts":
    /*!***************************************************************************!*\
      !*** ./src/app/setting/transaction-fee/transaction-fee-routing.module.ts ***!
      \***************************************************************************/

    /*! exports provided: TransactionFeePageRoutingModule */

    /***/
    function srcAppSettingTransactionFeeTransactionFeeRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "TransactionFeePageRoutingModule", function () {
        return TransactionFeePageRoutingModule;
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


      var _transaction_fee_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./transaction-fee.page */
      "./src/app/setting/transaction-fee/transaction-fee.page.ts");

      var routes = [{
        path: '',
        component: _transaction_fee_page__WEBPACK_IMPORTED_MODULE_3__["TransactionFeePage"]
      }];

      var TransactionFeePageRoutingModule = function TransactionFeePageRoutingModule() {
        _classCallCheck(this, TransactionFeePageRoutingModule);
      };

      TransactionFeePageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
      })], TransactionFeePageRoutingModule);
      /***/
    },

    /***/
    "./src/app/setting/transaction-fee/transaction-fee.module.ts":
    /*!*******************************************************************!*\
      !*** ./src/app/setting/transaction-fee/transaction-fee.module.ts ***!
      \*******************************************************************/

    /*! exports provided: TransactionFeePageModule */

    /***/
    function srcAppSettingTransactionFeeTransactionFeeModuleTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "TransactionFeePageModule", function () {
        return TransactionFeePageModule;
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


      var _transaction_fee_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./transaction-fee-routing.module */
      "./src/app/setting/transaction-fee/transaction-fee-routing.module.ts");
      /* harmony import */


      var _transaction_fee_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./transaction-fee.page */
      "./src/app/setting/transaction-fee/transaction-fee.page.ts");

      var TransactionFeePageModule = function TransactionFeePageModule() {
        _classCallCheck(this, TransactionFeePageModule);
      };

      TransactionFeePageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _transaction_fee_routing_module__WEBPACK_IMPORTED_MODULE_5__["TransactionFeePageRoutingModule"]],
        declarations: [_transaction_fee_page__WEBPACK_IMPORTED_MODULE_6__["TransactionFeePage"]]
      })], TransactionFeePageModule);
      /***/
    },

    /***/
    "./src/app/setting/transaction-fee/transaction-fee.page.scss":
    /*!*******************************************************************!*\
      !*** ./src/app/setting/transaction-fee/transaction-fee.page.scss ***!
      \*******************************************************************/

    /*! exports provided: default */

    /***/
    function srcAppSettingTransactionFeeTransactionFeePageScss(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = ".warning {\n  border-radius: 8px;\n  --background: #074673;\n  margin: 10px;\n  color: white;\n}\n\np {\n  font-size: 12px;\n}\n\nion-icon {\n  padding-right: 10px;\n}\n\n.fee {\n  box-shadow: 0 3px 6px #00000029;\n  border-radius: 8px;\n  margin: 0px 10px;\n  color: #9F9F9F;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2V0dGluZy90cmFuc2FjdGlvbi1mZWUvdHJhbnNhY3Rpb24tZmVlLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGtCQUFBO0VBQ0EscUJBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtBQUNGOztBQUVBO0VBQ0UsZUFBQTtBQUNGOztBQUVBO0VBQ0UsbUJBQUE7QUFDRjs7QUFFQTtFQUNFLCtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7QUFDRiIsImZpbGUiOiJzcmMvYXBwL3NldHRpbmcvdHJhbnNhY3Rpb24tZmVlL3RyYW5zYWN0aW9uLWZlZS5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIud2FybmluZyB7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgLS1iYWNrZ3JvdW5kOiAjMDc0NjczO1xuICBtYXJnaW46IDEwcHg7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxucCB7XG4gIGZvbnQtc2l6ZTogMTJweDtcbn1cblxuaW9uLWljb24ge1xuICBwYWRkaW5nLXJpZ2h0OiAxMHB4O1xufVxuXG4uZmVlIHtcbiAgYm94LXNoYWRvdzogMCAzcHggNnB4ICMwMDAwMDAyOTtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xuICBtYXJnaW46IDBweCAxMHB4O1xuICBjb2xvcjojOUY5RjlGO1xufSJdfQ== */";
      /***/
    },

    /***/
    "./src/app/setting/transaction-fee/transaction-fee.page.ts":
    /*!*****************************************************************!*\
      !*** ./src/app/setting/transaction-fee/transaction-fee.page.ts ***!
      \*****************************************************************/

    /*! exports provided: TransactionFeePage */

    /***/
    function srcAppSettingTransactionFeeTransactionFeePageTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "TransactionFeePage", function () {
        return TransactionFeePage;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "./node_modules/tslib/tslib.es6.js");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");

      var TransactionFeePage = /*#__PURE__*/function () {
        function TransactionFeePage() {
          _classCallCheck(this, TransactionFeePage);
        }

        _createClass(TransactionFeePage, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }]);

        return TransactionFeePage;
      }();

      TransactionFeePage.ctorParameters = function () {
        return [];
      };

      TransactionFeePage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-transaction-fee',
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
        /*! raw-loader!./transaction-fee.page.html */
        "./node_modules/raw-loader/dist/cjs.js!./src/app/setting/transaction-fee/transaction-fee.page.html"))["default"],
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
        /*! ./transaction-fee.page.scss */
        "./src/app/setting/transaction-fee/transaction-fee.page.scss"))["default"]]
      })], TransactionFeePage);
      /***/
    }
  }]);
})();
//# sourceMappingURL=transaction-fee-transaction-fee-module-es5.js.map