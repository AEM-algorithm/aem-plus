(function () {
  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tabnav-tabnav-module"], {
    /***/
    "./node_modules/raw-loader/dist/cjs.js!./src/app/tabnav/tabnav.page.html":
    /*!*******************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/tabnav/tabnav.page.html ***!
      \*******************************************************************************/

    /*! exports provided: default */

    /***/
    function node_modulesRawLoaderDistCjsJsSrcAppTabnavTabnavPageHtml(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<ion-content>\n  <!-- tabs navigation  -->\n\n  <ion-tabs>\n    <ion-tab-bar slot=\"bottom\">\n      <ion-tab-button tab=\"wallets\">\n        <ion-label>Wallets</ion-label>\n        <ion-icon name=\"wallet-outline\"></ion-icon>\n      </ion-tab-button>\n\n      <ion-tab-button tab=\"swap\">\n        <ion-label>Swap</ion-label>\n        <ion-icon name=\"swap-horizontal\"></ion-icon>\n      </ion-tab-button>\n\n      <ion-tab-button tab=\"export\">\n        <ion-label>Export</ion-label>\n        <ion-icon name=\"download-outline\"></ion-icon>\n      </ion-tab-button>\n\n      <ion-tab-button tab=\"address-book\">\n        <ion-label>Address</ion-label>\n        <ion-icon name=\"person-add-outline\"></ion-icon>\n      </ion-tab-button>\n\n      <ion-tab-button tab=\"setting\">\n        <ion-label>Setting</ion-label>\n        <ion-icon name=\"settings-outline\"></ion-icon>\n      </ion-tab-button>\n    </ion-tab-bar>\n  </ion-tabs>\n</ion-content>\n";
      /***/
    },

    /***/
    "./src/app/tabnav/tabnav-routing.module.ts":
    /*!*************************************************!*\
      !*** ./src/app/tabnav/tabnav-routing.module.ts ***!
      \*************************************************/

    /*! exports provided: TabnavPageRoutingModule */

    /***/
    function srcAppTabnavTabnavRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "TabnavPageRoutingModule", function () {
        return TabnavPageRoutingModule;
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


      var _tabnav_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./tabnav.page */
      "./src/app/tabnav/tabnav.page.ts");

      var routes = [{
        path: 'tabnav',
        component: _tabnav_page__WEBPACK_IMPORTED_MODULE_3__["TabnavPage"],
        children: [{
          path: 'wallets',
          loadChildren: function loadChildren() {
            return Promise.all(
            /*! import() | wallets-wallets-module */
            [__webpack_require__.e("default~export-export-module~notifications-notifications-module~receive-receive-module~wallets-wallets-module"), __webpack_require__.e("default~detail-detail-module~wallets-wallets-module"), __webpack_require__.e("common"), __webpack_require__.e("wallets-wallets-module")]).then(__webpack_require__.bind(null,
            /*! ../wallets/wallets.module */
            "./src/app/wallets/wallets.module.ts")).then(function (m) {
              return m.WalletsPageModule;
            });
          }
        }, {
          path: 'export',
          loadChildren: function loadChildren() {
            return Promise.all(
            /*! import() | export-export-module */
            [__webpack_require__.e("default~export-export-module~notifications-notifications-module~receive-receive-module~wallets-wallets-module"), __webpack_require__.e("common"), __webpack_require__.e("export-export-module")]).then(__webpack_require__.bind(null,
            /*! ../export/export.module */
            "./src/app/export/export.module.ts")).then(function (m) {
              return m.ExportPageModule;
            });
          }
        }, {
          path: 'swap',
          loadChildren: function loadChildren() {
            return __webpack_require__.e(
            /*! import() | swap-swap-module */
            "swap-swap-module").then(__webpack_require__.bind(null,
            /*! ../swap/swap.module */
            "./src/app/swap/swap.module.ts")).then(function (m) {
              return m.SwapPageModule;
            });
          }
        }, {
          path: 'address-book',
          loadChildren: function loadChildren() {
            return Promise.all(
            /*! import() | address-book-address-book-module */
            [__webpack_require__.e("common"), __webpack_require__.e("address-book-address-book-module")]).then(__webpack_require__.bind(null,
            /*! ../address-book/address-book.module */
            "./src/app/address-book/address-book.module.ts")).then(function (m) {
              return m.AddressBookPageModule;
            });
          }
        }, {
          path: 'setting',
          loadChildren: function loadChildren() {
            return __webpack_require__.e(
            /*! import() | setting-setting-module */
            "setting-setting-module").then(__webpack_require__.bind(null,
            /*! ../setting/setting.module */
            "./src/app/setting/setting.module.ts")).then(function (m) {
              return m.SettingPageModule;
            });
          }
        }, {
          path: '',
          redirectTo: '/tabnav/wallets',
          pathMatch: 'full'
        }]
      }, {
        path: '',
        redirectTo: '/tabnav/wallets',
        pathMatch: 'full'
      }];

      var TabnavPageRoutingModule = function TabnavPageRoutingModule() {
        _classCallCheck(this, TabnavPageRoutingModule);
      };

      TabnavPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
      })], TabnavPageRoutingModule);
      /***/
    },

    /***/
    "./src/app/tabnav/tabnav.module.ts":
    /*!*****************************************!*\
      !*** ./src/app/tabnav/tabnav.module.ts ***!
      \*****************************************/

    /*! exports provided: TabnavPageModule */

    /***/
    function srcAppTabnavTabnavModuleTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "TabnavPageModule", function () {
        return TabnavPageModule;
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


      var _tabnav_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./tabnav-routing.module */
      "./src/app/tabnav/tabnav-routing.module.ts");
      /* harmony import */


      var _tabnav_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./tabnav.page */
      "./src/app/tabnav/tabnav.page.ts");

      var TabnavPageModule = function TabnavPageModule() {
        _classCallCheck(this, TabnavPageModule);
      };

      TabnavPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _tabnav_routing_module__WEBPACK_IMPORTED_MODULE_5__["TabnavPageRoutingModule"]],
        declarations: [_tabnav_page__WEBPACK_IMPORTED_MODULE_6__["TabnavPage"]]
      })], TabnavPageModule);
      /***/
    },

    /***/
    "./src/app/tabnav/tabnav.page.scss":
    /*!*****************************************!*\
      !*** ./src/app/tabnav/tabnav.page.scss ***!
      \*****************************************/

    /*! exports provided: default */

    /***/
    function srcAppTabnavTabnavPageScss(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "ion-tab-bar {\n  border-radius: 10px 10px 0 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdGFibmF2L3RhYm5hdi5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSw0QkFBQTtBQUNGIiwiZmlsZSI6InNyYy9hcHAvdGFibmF2L3RhYm5hdi5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpb24tdGFiLWJhciB7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHggMTBweCAwIDA7XG59XG4iXX0= */";
      /***/
    },

    /***/
    "./src/app/tabnav/tabnav.page.ts":
    /*!***************************************!*\
      !*** ./src/app/tabnav/tabnav.page.ts ***!
      \***************************************/

    /*! exports provided: TabnavPage */

    /***/
    function srcAppTabnavTabnavPageTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "TabnavPage", function () {
        return TabnavPage;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "./node_modules/tslib/tslib.es6.js");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");

      var TabnavPage = /*#__PURE__*/function () {
        function TabnavPage() {
          _classCallCheck(this, TabnavPage);
        }

        _createClass(TabnavPage, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }]);

        return TabnavPage;
      }();

      TabnavPage.ctorParameters = function () {
        return [];
      };

      TabnavPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-tabnav',
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
        /*! raw-loader!./tabnav.page.html */
        "./node_modules/raw-loader/dist/cjs.js!./src/app/tabnav/tabnav.page.html"))["default"],
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
        /*! ./tabnav.page.scss */
        "./src/app/tabnav/tabnav.page.scss"))["default"]]
      })], TabnavPage);
      /***/
    }
  }]);
})();
//# sourceMappingURL=tabnav-tabnav-module-es5.js.map