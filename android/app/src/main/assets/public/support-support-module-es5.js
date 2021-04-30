(function () {
  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["support-support-module"], {
    /***/
    "./node_modules/raw-loader/dist/cjs.js!./src/app/setting/support/support.page.html":
    /*!*****************************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/setting/support/support.page.html ***!
      \*****************************************************************************************/

    /*! exports provided: default */

    /***/
    function node_modulesRawLoaderDistCjsJsSrcAppSettingSupportSupportPageHtml(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<ion-header>\n  <ion-toolbar>\n    <ion-buttons>\n      <ion-back-button defaultHref=\"/tabnav/setting\" text=\"\"></ion-back-button>\n    </ion-buttons>\n    <ion-title>Support</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-list style=\"margin-top: 20px\">\n    <ion-list *ngFor=\"let supportList of supportList\">\n      <ion-item lines=\"none\" routerLink=\"{{supportList.link}}\">\n        <ion-label> {{supportList.label}} </ion-label>\n      </ion-item>\n    </ion-list>\n  </ion-list>\n</ion-content>\n";
      /***/
    },

    /***/
    "./src/app/setting/support/support-routing.module.ts":
    /*!***********************************************************!*\
      !*** ./src/app/setting/support/support-routing.module.ts ***!
      \***********************************************************/

    /*! exports provided: SupportPageRoutingModule */

    /***/
    function srcAppSettingSupportSupportRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "SupportPageRoutingModule", function () {
        return SupportPageRoutingModule;
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


      var _support_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./support.page */
      "./src/app/setting/support/support.page.ts");

      var routes = [{
        path: '',
        component: _support_page__WEBPACK_IMPORTED_MODULE_3__["SupportPage"]
      }];

      var SupportPageRoutingModule = function SupportPageRoutingModule() {
        _classCallCheck(this, SupportPageRoutingModule);
      };

      SupportPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
      })], SupportPageRoutingModule);
      /***/
    },

    /***/
    "./src/app/setting/support/support.module.ts":
    /*!***************************************************!*\
      !*** ./src/app/setting/support/support.module.ts ***!
      \***************************************************/

    /*! exports provided: SupportPageModule */

    /***/
    function srcAppSettingSupportSupportModuleTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "SupportPageModule", function () {
        return SupportPageModule;
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


      var _support_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./support-routing.module */
      "./src/app/setting/support/support-routing.module.ts");
      /* harmony import */


      var _support_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./support.page */
      "./src/app/setting/support/support.page.ts");

      var SupportPageModule = function SupportPageModule() {
        _classCallCheck(this, SupportPageModule);
      };

      SupportPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _support_routing_module__WEBPACK_IMPORTED_MODULE_5__["SupportPageRoutingModule"]],
        declarations: [_support_page__WEBPACK_IMPORTED_MODULE_6__["SupportPage"]]
      })], SupportPageModule);
      /***/
    },

    /***/
    "./src/app/setting/support/support.page.scss":
    /*!***************************************************!*\
      !*** ./src/app/setting/support/support.page.scss ***!
      \***************************************************/

    /*! exports provided: default */

    /***/
    function srcAppSettingSupportSupportPageScss(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "ion-content {\n  --background: #F9FAFC;\n}\nion-content ion-list {\n  box-shadow: 0 3px 6px #00000029;\n}\nion-content ion-list ion-item {\n  padding: 3px;\n  border-bottom: 1px solid #DFE7ED;\n}\nion-content ion-list ion-item ion-label {\n  font-size: 16px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2V0dGluZy9zdXBwb3J0L3N1cHBvcnQucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UscUJBQUE7QUFDRjtBQUNFO0VBQ0UsK0JBQUE7QUFDSjtBQUNJO0VBQ0UsWUFBQTtFQUNBLGdDQUFBO0FBQ047QUFDTTtFQUNFLGVBQUE7QUFDUiIsImZpbGUiOiJzcmMvYXBwL3NldHRpbmcvc3VwcG9ydC9zdXBwb3J0LnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImlvbi1jb250ZW50IHtcbiAgLS1iYWNrZ3JvdW5kOiAjRjlGQUZDO1xuXG4gIGlvbi1saXN0IHtcbiAgICBib3gtc2hhZG93OiAwIDNweCA2cHggIzAwMDAwMDI5O1xuXG4gICAgaW9uLWl0ZW0ge1xuICAgICAgcGFkZGluZzogM3B4O1xuICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNERkU3RUQ7XG5cbiAgICAgIGlvbi1sYWJlbCB7XG4gICAgICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ== */";
      /***/
    },

    /***/
    "./src/app/setting/support/support.page.ts":
    /*!*************************************************!*\
      !*** ./src/app/setting/support/support.page.ts ***!
      \*************************************************/

    /*! exports provided: SupportPage */

    /***/
    function srcAppSettingSupportSupportPageTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "SupportPage", function () {
        return SupportPage;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "./node_modules/tslib/tslib.es6.js");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");

      var SupportPage = /*#__PURE__*/function () {
        function SupportPage() {
          _classCallCheck(this, SupportPage);

          this.supportList = [{
            label: 'FAQ',
            link: ''
          }, {
            label: 'Contact Us',
            link: ''
          }, {
            label: 'Security',
            link: ''
          }, {
            label: 'Fees',
            link: ''
          }, {
            label: 'Legal',
            link: ''
          }];
        }

        _createClass(SupportPage, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }]);

        return SupportPage;
      }();

      SupportPage.ctorParameters = function () {
        return [];
      };

      SupportPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-support',
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
        /*! raw-loader!./support.page.html */
        "./node_modules/raw-loader/dist/cjs.js!./src/app/setting/support/support.page.html"))["default"],
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
        /*! ./support.page.scss */
        "./src/app/setting/support/support.page.scss"))["default"]]
      })], SupportPage);
      /***/
    }
  }]);
})();
//# sourceMappingURL=support-support-module-es5.js.map