(function () {
  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["my-profile-my-profile-module"], {
    /***/
    "./node_modules/raw-loader/dist/cjs.js!./src/app/setting/my-profile/my-profile.page.html":
    /*!***********************************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/setting/my-profile/my-profile.page.html ***!
      \***********************************************************************************************/

    /*! exports provided: default */

    /***/
    function node_modulesRawLoaderDistCjsJsSrcAppSettingMyProfileMyProfilePageHtml(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<ion-header>\n  <ion-toolbar>\n    <ion-buttons>\n      <ion-back-button defaultHref=\"/tabnav/setting\" text=\"\"></ion-back-button>\n    </ion-buttons>\n    <ion-title>My Profile</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-item lines=\"none\">\n    <ion-input placeholder=\"First name\"></ion-input>\n  </ion-item>\n\n  <ion-item lines=\"none\">\n    <ion-input placeholder=\"Last name\"></ion-input>\n  </ion-item>\n\n  <ion-item lines=\"none\">\n    <ion-input placeholder=\"Email Address\"></ion-input>\n  </ion-item>\n\n  <ion-item lines=\"none\">\n    <ion-input placeholder=\"Phone Number\"></ion-input>\n  </ion-item>\n\n  <ion-item lines=\"none\">\n    <ion-input placeholder=\"Address1\"></ion-input>\n  </ion-item>\n\n  <ion-item lines=\"none\">\n    <ion-input placeholder=\"Address2\"></ion-input>\n  </ion-item>\n\n  <ion-item lines=\"none\">\n    <ion-input placeholder=\"Suburd\"></ion-input>\n  </ion-item>\n\n  <ion-item lines=\"none\">\n    <ion-input placeholder=\"State\"></ion-input>\n  </ion-item>\n\n  <ion-item lines=\"none\">\n    <ion-input placeholder=\"Postcode\"></ion-input>\n  </ion-item>\n\n  <div style=\"text-align: center\">\n    <ion-button class=\"saveBtn\">Save</ion-button>\n  </div>\n</ion-content>\n";
      /***/
    },

    /***/
    "./src/app/setting/my-profile/my-profile-routing.module.ts":
    /*!*****************************************************************!*\
      !*** ./src/app/setting/my-profile/my-profile-routing.module.ts ***!
      \*****************************************************************/

    /*! exports provided: MyProfilePageRoutingModule */

    /***/
    function srcAppSettingMyProfileMyProfileRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "MyProfilePageRoutingModule", function () {
        return MyProfilePageRoutingModule;
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


      var _my_profile_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./my-profile.page */
      "./src/app/setting/my-profile/my-profile.page.ts");

      var routes = [{
        path: '',
        component: _my_profile_page__WEBPACK_IMPORTED_MODULE_3__["MyProfilePage"]
      }];

      var MyProfilePageRoutingModule = function MyProfilePageRoutingModule() {
        _classCallCheck(this, MyProfilePageRoutingModule);
      };

      MyProfilePageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
      })], MyProfilePageRoutingModule);
      /***/
    },

    /***/
    "./src/app/setting/my-profile/my-profile.module.ts":
    /*!*********************************************************!*\
      !*** ./src/app/setting/my-profile/my-profile.module.ts ***!
      \*********************************************************/

    /*! exports provided: MyProfilePageModule */

    /***/
    function srcAppSettingMyProfileMyProfileModuleTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "MyProfilePageModule", function () {
        return MyProfilePageModule;
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


      var _my_profile_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./my-profile-routing.module */
      "./src/app/setting/my-profile/my-profile-routing.module.ts");
      /* harmony import */


      var _my_profile_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./my-profile.page */
      "./src/app/setting/my-profile/my-profile.page.ts");

      var MyProfilePageModule = function MyProfilePageModule() {
        _classCallCheck(this, MyProfilePageModule);
      };

      MyProfilePageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _my_profile_routing_module__WEBPACK_IMPORTED_MODULE_5__["MyProfilePageRoutingModule"]],
        declarations: [_my_profile_page__WEBPACK_IMPORTED_MODULE_6__["MyProfilePage"]]
      })], MyProfilePageModule);
      /***/
    },

    /***/
    "./src/app/setting/my-profile/my-profile.page.scss":
    /*!*********************************************************!*\
      !*** ./src/app/setting/my-profile/my-profile.page.scss ***!
      \*********************************************************/

    /*! exports provided: default */

    /***/
    function srcAppSettingMyProfileMyProfilePageScss(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "ion-content {\n  --background: #F9FAFC;\n}\n\nion-item {\n  box-shadow: 0 3px 6px #00000029;\n  border-radius: 8px;\n  padding: 3px 0;\n  margin: 20px 15px;\n}\n\n.saveBtn {\n  margin-bottom: 10px;\n  width: 90%;\n  --background: linear-gradient(to bottom, #41a1c8, #074673);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2V0dGluZy9teS1wcm9maWxlL215LXByb2ZpbGUucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UscUJBQUE7QUFDRjs7QUFFQTtFQUNFLCtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxjQUFBO0VBQ0EsaUJBQUE7QUFDRjs7QUFFQTtFQUNFLG1CQUFBO0VBQ0EsVUFBQTtFQUNBLDBEQUFBO0FBQ0YiLCJmaWxlIjoic3JjL2FwcC9zZXR0aW5nL215LXByb2ZpbGUvbXktcHJvZmlsZS5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpb24tY29udGVudCB7XG4gIC0tYmFja2dyb3VuZDogI0Y5RkFGQztcbn1cblxuaW9uLWl0ZW0ge1xuICBib3gtc2hhZG93OiAwIDNweCA2cHggIzAwMDAwMDI5O1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIHBhZGRpbmc6IDNweCAwO1xuICBtYXJnaW46IDIwcHggMTVweDtcbn1cblxuLnNhdmVCdG4ge1xuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xuICB3aWR0aDogOTAlO1xuICAtLWJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0byBib3R0b20sICM0MWExYzgsICMwNzQ2NzMpO1xufVxuIl19 */";
      /***/
    },

    /***/
    "./src/app/setting/my-profile/my-profile.page.ts":
    /*!*******************************************************!*\
      !*** ./src/app/setting/my-profile/my-profile.page.ts ***!
      \*******************************************************/

    /*! exports provided: MyProfilePage */

    /***/
    function srcAppSettingMyProfileMyProfilePageTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "MyProfilePage", function () {
        return MyProfilePage;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "./node_modules/tslib/tslib.es6.js");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");

      var MyProfilePage = /*#__PURE__*/function () {
        function MyProfilePage() {
          _classCallCheck(this, MyProfilePage);
        }

        _createClass(MyProfilePage, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }]);

        return MyProfilePage;
      }();

      MyProfilePage.ctorParameters = function () {
        return [];
      };

      MyProfilePage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-my-profile',
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
        /*! raw-loader!./my-profile.page.html */
        "./node_modules/raw-loader/dist/cjs.js!./src/app/setting/my-profile/my-profile.page.html"))["default"],
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
        /*! ./my-profile.page.scss */
        "./src/app/setting/my-profile/my-profile.page.scss"))["default"]]
      })], MyProfilePage);
      /***/
    }
  }]);
})();
//# sourceMappingURL=my-profile-my-profile-module-es5.js.map