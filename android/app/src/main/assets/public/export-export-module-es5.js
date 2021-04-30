(function () {
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["export-export-module"], {
    /***/
    "./node_modules/raw-loader/dist/cjs.js!./src/app/export/confirm-modal/confirm-modal.component.html":
    /*!*********************************************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/export/confirm-modal/confirm-modal.component.html ***!
      \*********************************************************************************************************/

    /*! exports provided: default */

    /***/
    function node_modulesRawLoaderDistCjsJsSrcAppExportConfirmModalConfirmModalComponentHtml(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<ion-content>\n  <!-- <h6>Confirm transaction</h5> -->\n\n  <ion-list lines=\"none\">\n    <ion-list-header>\n      <ion-label>Confirm transaction</ion-label>\n    </ion-list-header>\n    <ion-item>\n      <ion-label>\n        <h6>From</h6>\n        <ion-text>{{ fromDate }}</ion-text>\n      </ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label>\n        <h6>To</h6>\n        <ion-text>{{ toDate }}</ion-text>\n      </ion-label>\n    </ion-item>\n  </ion-list>\n  <p>Needs redefine???? or remove</p>\n  <p>this is for confirming the export info not for purchasing the export function</p>\n</ion-content>\n<ion-footer>\n  <ion-toolbar>\n    <ion-buttons slot=\"end\">\n      <ion-button class=\"ion-margin-right\" (click)=\"close()\">Cancel</ion-button>\n      <ion-button (click)=\"confirm()\">Confirm</ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-footer>\n";
      /***/
    },

    /***/
    "./node_modules/raw-loader/dist/cjs.js!./src/app/export/export.page.html":
    /*!*******************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/export/export.page.html ***!
      \*******************************************************************************/

    /*! exports provided: default */

    /***/
    function node_modulesRawLoaderDistCjsJsSrcAppExportExportPageHtml(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<ion-header>\n  <ion-toolbar>\n    <ion-title>Export</ion-title>\n  </ion-toolbar>\n  <div class=\"decription ion-text-center\">\n    <span>\n      ???some basic info for user (how much to cost for unlocking the export, what user can do once unlock the export)\n    </span>\n  </div>\n</ion-header>\n\n<ion-content class=\"ion-padding-top\">\n  <form [formGroup]=\"exportForm\" (ngSubmit)=\"onSubmit()\">\n    <h5 class=\"title\">From</h5>\n    <ion-item lines=\"none\">\n      <ion-datetime\n        slot=\"end\"\n        max=\"2022-12-31\"\n        value=\"2019-10-01T15:43:40.394Z\"\n        displayFormat=\"D/MM/YYYY\"\n        formControlName=\"dateFrom\"\n      ></ion-datetime>\n    </ion-item>\n\n    <h5 class=\"title\">To</h5>\n    <ion-item lines=\"none\" class=\"input-shadow\">\n      <ion-datetime\n        slot=\"end\"\n        max=\"2022-12-31\"\n        value=\"2019-10-01T15:43:40.394Z\"\n        displayFormat=\"D/MM/YYYY\"\n        formControlName=\"dateTo\"\n      ></ion-datetime>\n    </ion-item>\n\n    <h5 class=\"title\">Cryptocurrency type</h5>\n    <ion-item lines=\"none\" class=\"input-shadow\">\n      <ion-select slot=\"end\" formControlName=\"walletType\" (ionChange)=\"onSelectType($event)\">\n        <ion-select-option value=\"BTC\">BTC</ion-select-option>\n        <ion-select-option value=\"NEM\">XEM</ion-select-option>\n        <ion-select-option value=\"ETH\">ETH</ion-select-option>\n      </ion-select>\n    </ion-item>\n\n    <h5 class=\"title\">Wallets</h5>\n    <ion-item lines=\"none\" class=\"input-shadow\">\n      <ion-select\n        slot=\"end\"\n        multiple=\"true\"\n        formControlName=\"walletsExport\"\n        (ionChange)=\"onSelectExportWallets($event)\"\n      >\n        <ion-select-option *ngFor=\"let wallet of wallets\" [value]=\"wallet.walletId\">\n          {{wallet.walletName}}\n        </ion-select-option>\n      </ion-select>\n    </ion-item>\n\n    <div class=\"btn-div\">\n      <!--   if user's export function unlocked:  make purchase-->\n      <ion-button\n        *ngIf=\"!isExportUnlocked; else exportTrans\"\n        class=\"btn-gradient-bg\"\n        type=\"submit\"\n        expand=\"block\"\n        type=\"submit\"\n      >\n        Unlock Export\n      </ion-button>\n      <!--    if user's export function locked:  select transactions export file formate-->\n      <ng-template #exportTrans>\n        <ion-button\n          class=\"btn-gradient-bg\"\n          [disabled]=\"exportForm.invalid\"\n          type=\"button\"\n          expand=\"block\"\n          (click)=\"exportCSV()\"\n        >\n          Export as CSV\n        </ion-button>\n\n        <ion-button\n          class=\"btn-gradient-bg\"\n          [disabled]=\"exportForm.invalid\"\n          type=\"button\"\n          expand=\"block\"\n          (click)=\"exportExcel()\"\n        >\n          Export as Excel\n        </ion-button>\n      </ng-template>\n    </div>\n  </form>\n</ion-content>\n";
      /***/
    },

    /***/
    "./src/app/export/confirm-modal/confirm-modal.component.scss":
    /*!*******************************************************************!*\
      !*** ./src/app/export/confirm-modal/confirm-modal.component.scss ***!
      \*******************************************************************/

    /*! exports provided: default */

    /***/
    function srcAppExportConfirmModalConfirmModalComponentScss(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "ion-list-header ion-label {\n  margin-top: 20px;\n  --color: #074673;\n  font-size: 20px;\n}\n\nion-item h6 {\n  color: #216e9a;\n  font-size: 12px;\n  font-weight: bold;\n  font-family: Roboto;\n}\n\nion-item p {\n  color: #000000de;\n  font-size: 16px;\n  font-family: Roboto;\n}\n\nion-footer ion-button {\n  color: #074673;\n  font-size: 14px;\n}\n\nion-note {\n  --color: #9f9f9f;\n  font-size: 11px;\n  font-family: Roboto;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZXhwb3J0L2NvbmZpcm0tbW9kYWwvY29uZmlybS1tb2RhbC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDRTtFQUNFLGdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0FBQUo7O0FBS0U7RUFDRSxjQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0VBQ0EsbUJBQUE7QUFGSjs7QUFJRTtFQUNFLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLG1CQUFBO0FBRko7O0FBT0U7RUFDRSxjQUFBO0VBQ0EsZUFBQTtBQUpKOztBQVFBO0VBQ0UsZ0JBQUE7RUFDQSxlQUFBO0VBQ0EsbUJBQUE7QUFMRiIsImZpbGUiOiJzcmMvYXBwL2V4cG9ydC9jb25maXJtLW1vZGFsL2NvbmZpcm0tbW9kYWwuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpb24tbGlzdC1oZWFkZXIge1xuICBpb24tbGFiZWwge1xuICAgIG1hcmdpbi10b3A6IDIwcHg7XG4gICAgLS1jb2xvcjogIzA3NDY3MztcbiAgICBmb250LXNpemU6IDIwcHg7XG4gIH1cbn1cblxuaW9uLWl0ZW0ge1xuICBoNiB7XG4gICAgY29sb3I6ICMyMTZlOWE7XG4gICAgZm9udC1zaXplOiAxMnB4O1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIGZvbnQtZmFtaWx5OiBSb2JvdG87XG4gIH1cbiAgcCB7XG4gICAgY29sb3I6ICMwMDAwMDBkZTtcbiAgICBmb250LXNpemU6IDE2cHg7XG4gICAgZm9udC1mYW1pbHk6IFJvYm90bztcbiAgfVxufVxuXG5pb24tZm9vdGVyIHtcbiAgaW9uLWJ1dHRvbiB7XG4gICAgY29sb3I6ICMwNzQ2NzM7XG4gICAgZm9udC1zaXplOiAxNHB4O1xuICB9XG59XG5cbmlvbi1ub3RlIHtcbiAgLS1jb2xvcjogIzlmOWY5ZjtcbiAgZm9udC1zaXplOiAxMXB4O1xuICBmb250LWZhbWlseTogUm9ib3RvO1xufVxuIl19 */";
      /***/
    },

    /***/
    "./src/app/export/confirm-modal/confirm-modal.component.ts":
    /*!*****************************************************************!*\
      !*** ./src/app/export/confirm-modal/confirm-modal.component.ts ***!
      \*****************************************************************/

    /*! exports provided: ConfirmModalComponent */

    /***/
    function srcAppExportConfirmModalConfirmModalComponentTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ConfirmModalComponent", function () {
        return ConfirmModalComponent;
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


      var src_app_services_helper_helper_fun_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! src/app/services/helper/helper-fun.service */
      "./src/app/services/helper/helper-fun.service.ts");

      var ConfirmModalComponent = /*#__PURE__*/function () {
        function ConfirmModalComponent(modalCtrl, loadingCtrl, helperService) {
          _classCallCheck(this, ConfirmModalComponent);

          this.modalCtrl = modalCtrl;
          this.loadingCtrl = loadingCtrl;
          this.helperService = helperService;
          this.exportSuccess = false;
        }

        _createClass(ConfirmModalComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            // console.log(this.submitData);
            this.fromDate = this.helperService.dateFormat(this.submitData.dateFrom);
            this.toDate = this.helperService.dateFormat(this.submitData.dateTo); // this.walletToPayType = this.submitData.paymentWallet.walletType;
            //=====TODO: convert the cryptocurrency value to aud value. backend??

            this.audAmount = 2.22;
          }
        }, {
          key: "close",
          value: function close() {
            this.modalCtrl.dismiss();
          }
        }, {
          key: "showLoading",
          value: function showLoading() {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      this.loadingCtrl.create({
                        message: 'Please wait for transfer complete',
                        spinner: 'circular',
                        cssClass: 'transfer-loading'
                      }).then(function (loadEl) {
                        loadEl.present(); // fake the request:

                        setTimeout(function () {
                          loadEl.dismiss(); // TODO: the different format files:
                          //       then the social sharing
                        }, 2000);
                      });

                    case 1:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, this);
            }));
          }
        }, {
          key: "confirm",
          value: function confirm() {
            // console.log('confirm....');
            this.close();
            this.showLoading();
          }
        }]);

        return ConfirmModalComponent;
      }();

      ConfirmModalComponent.ctorParameters = function () {
        return [{
          type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"]
        }, {
          type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"]
        }, {
          type: src_app_services_helper_helper_fun_service__WEBPACK_IMPORTED_MODULE_3__["HelperFunService"]
        }];
      };

      ConfirmModalComponent.propDecorators = {
        submitData: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }]
      };
      ConfirmModalComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-confirm-modal',
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
        /*! raw-loader!./confirm-modal.component.html */
        "./node_modules/raw-loader/dist/cjs.js!./src/app/export/confirm-modal/confirm-modal.component.html"))["default"],
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
        /*! ./confirm-modal.component.scss */
        "./src/app/export/confirm-modal/confirm-modal.component.scss"))["default"]]
      })], ConfirmModalComponent);
      /***/
    },

    /***/
    "./src/app/export/export-routing.module.ts":
    /*!*************************************************!*\
      !*** ./src/app/export/export-routing.module.ts ***!
      \*************************************************/

    /*! exports provided: ExportPageRoutingModule */

    /***/
    function srcAppExportExportRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ExportPageRoutingModule", function () {
        return ExportPageRoutingModule;
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


      var _export_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./export.page */
      "./src/app/export/export.page.ts");

      var routes = [{
        path: '',
        component: _export_page__WEBPACK_IMPORTED_MODULE_3__["ExportPage"]
      }];

      var ExportPageRoutingModule = function ExportPageRoutingModule() {
        _classCallCheck(this, ExportPageRoutingModule);
      };

      ExportPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
      })], ExportPageRoutingModule);
      /***/
    },

    /***/
    "./src/app/export/export.module.ts":
    /*!*****************************************!*\
      !*** ./src/app/export/export.module.ts ***!
      \*****************************************/

    /*! exports provided: ExportPageModule */

    /***/
    function srcAppExportExportModuleTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ExportPageModule", function () {
        return ExportPageModule;
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


      var _export_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./export-routing.module */
      "./src/app/export/export-routing.module.ts");
      /* harmony import */


      var _export_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./export.page */
      "./src/app/export/export.page.ts");

      var ExportPageModule = function ExportPageModule() {
        _classCallCheck(this, ExportPageModule);
      };

      ExportPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _export_routing_module__WEBPACK_IMPORTED_MODULE_5__["ExportPageRoutingModule"]],
        declarations: [_export_page__WEBPACK_IMPORTED_MODULE_6__["ExportPage"]]
      })], ExportPageModule);
      /***/
    },

    /***/
    "./src/app/export/export.page.scss":
    /*!*****************************************!*\
      !*** ./src/app/export/export.page.scss ***!
      \*****************************************/

    /*! exports provided: default */

    /***/
    function srcAppExportExportPageScss(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "form {\n  padding: 0 20px;\n}\n\n.title {\n  font-size: 14px;\n  color: #074673;\n  font-weight: bold;\n}\n\nion-item {\n  box-shadow: 0px 3px 6px #00000029;\n  border-radius: 8px;\n}\n\nion-item ion-datetime,\nion-item ion-select {\n  --placeholder-color: #000000de;\n  font-size: 14px;\n  font-family: Roboto;\n}\n\n.fee-info {\n  color: #41a1c8;\n  font-size: 12px;\n}\n\nion-select.in-item {\n  max-width: 100%;\n}\n\n.btn-div {\n  margin: 20px 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZXhwb3J0L2V4cG9ydC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxlQUFBO0FBQ0Y7O0FBRUE7RUFDRSxlQUFBO0VBQ0EsY0FBQTtFQUNBLGlCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxpQ0FBQTtFQUNBLGtCQUFBO0FBQ0Y7O0FBQ0U7O0VBRUUsOEJBQUE7RUFDQSxlQUFBO0VBQ0EsbUJBQUE7QUFDSjs7QUFHQTtFQUNFLGNBQUE7RUFDQSxlQUFBO0FBQUY7O0FBR0E7RUFDRSxlQUFBO0FBQUY7O0FBR0E7RUFDRSxjQUFBO0FBQUYiLCJmaWxlIjoic3JjL2FwcC9leHBvcnQvZXhwb3J0LnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImZvcm0ge1xuICBwYWRkaW5nOiAwIDIwcHg7XG59XG5cbi50aXRsZSB7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgY29sb3I6ICMwNzQ2NzM7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuXG5pb24taXRlbSB7XG4gIGJveC1zaGFkb3c6IDBweCAzcHggNnB4ICMwMDAwMDAyOTtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xuXG4gIGlvbi1kYXRldGltZSxcbiAgaW9uLXNlbGVjdCB7XG4gICAgLS1wbGFjZWhvbGRlci1jb2xvcjogIzAwMDAwMGRlO1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICBmb250LWZhbWlseTogUm9ib3RvO1xuICB9XG59XG5cbi5mZWUtaW5mbyB7XG4gIGNvbG9yOiAjNDFhMWM4O1xuICBmb250LXNpemU6IDEycHg7XG59XG5cbmlvbi1zZWxlY3QuaW4taXRlbSB7XG4gIG1heC13aWR0aDogMTAwJTtcbn1cblxuLmJ0bi1kaXYge1xuICBtYXJnaW46IDIwcHggMDtcbn1cbiJdfQ== */";
      /***/
    },

    /***/
    "./src/app/export/export.page.ts":
    /*!***************************************!*\
      !*** ./src/app/export/export.page.ts ***!
      \***************************************/

    /*! exports provided: ExportPage */

    /***/
    function srcAppExportExportPageTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ExportPage", function () {
        return ExportPage;
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


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @ionic/angular */
      "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
      /* harmony import */


      var _services_wallets_wallets_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../services/wallets/wallets.service */
      "./src/app/services/wallets/wallets.service.ts");
      /* harmony import */


      var _confirm_modal_confirm_modal_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./confirm-modal/confirm-modal.component */
      "./src/app/export/confirm-modal/confirm-modal.component.ts");

      var ExportPage = /*#__PURE__*/function () {
        // isExportUnlocked = true; // testing
        function ExportPage(alterCtrl, modalCtrl, walletsService, loadingCtrl) {
          _classCallCheck(this, ExportPage);

          this.alterCtrl = alterCtrl;
          this.modalCtrl = modalCtrl;
          this.walletsService = walletsService;
          this.loadingCtrl = loadingCtrl;
          this.purchaseFee = 12; // unlock export fee: hardcode now

          this.walletsToExportSelected = false; // TODO: after add in app purchase
          //       set it to true, if user unlock the export function
          //       change the confirm modal info without the purchase fee

          this.isExportUnlocked = false; // -------  needs to store server-side under this user.
        }

        _createClass(ExportPage, [{
          key: "ionViewWillEnter",
          value: function ionViewWillEnter() {}
        }, {
          key: "ngOnInit",
          value: function ngOnInit() {
            this.wallets = this.walletsService.getSameTypeWallets('BTC');
            this.exportForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
              dateFrom: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]),
              dateTo: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]),
              walletType: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('BTC', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]),
              walletsExport: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required])
            });
          }
        }, {
          key: "onSelectType",
          value: function onSelectType(e) {
            var type = e.detail.value; //  ---- get the selected type wallets of this users possessed

            this.wallets = this.walletsService.getSameTypeWallets(type); //  ---- empty the walletExport every time user select the type

            this.exportForm.get('walletsExport').setValue(null);
          }
        }, {
          key: "onSelectExportWallets",
          value: function onSelectExportWallets(e) {
            this.walletsToExport = e.detail.value;
            this.walletsToExportSelected = true;
          }
        }, {
          key: "onSubmit",
          value: function onSubmit() {
            var _this = this;

            var type = this.exportForm.get('walletType').value;
            this.exportFormData = {
              dateFrom: new Date(this.exportForm.get('dateFrom').value),
              dateTo: new Date(this.exportForm.get('dateTo').value),
              walletType: type,
              walletsExport: this.walletsToExport,
              exportFee: this.purchaseFee
            }; // ---- if the user didn't unlock export function show this alter window

            if (!this.isExportUnlocked) {
              this.alterCtrl.create({
                header: 'Confirm your In-App purchase',
                message: "info about the export fee??????",
                cssClass: 'purchase-alter',
                buttons: [{
                  text: 'Cancel',
                  role: 'cancel'
                }, {
                  text: 'Buy',
                  role: 'confirm',
                  handler: function handler() {
                    // console.log('confirm the purchase of wallet export function');
                    // -------  TODO: show the in-app purchase first (3rd package) instead of this loading
                    _this.loadingCtrl.create({
                      message: 'purchasing, unlock the export',
                      spinner: 'circles',
                      duration: 2000
                    }).then(function (loadingEl) {
                      loadingEl.present();
                      _this.isExportUnlocked = true;
                    });
                  }
                }]
              }).then(function (alterEl) {
                alterEl.present();
              });
            } else {
              //  ----- if the user purchased the export producte:
              //          show the export info confirm modal
              this.modalCtrl.create({
                component: _confirm_modal_confirm_modal_component__WEBPACK_IMPORTED_MODULE_5__["ConfirmModalComponent"],
                componentProps: {
                  submitData: this.exportFormData
                },
                cssClass: 'center-small-modal'
              }).then(function (modalEl) {
                modalEl.present();
              });
            } // console.log('after submit:', this.exportForm.value);
            // this.exportForm.reset(); // after the export transaction made then reset the form???

          }
        }, {
          key: "exportExcel",
          value: function exportExcel() {
            console.log('export as pdf.....'); // this.exportForm.reset();
          }
        }, {
          key: "exportCSV",
          value: function exportCSV() {
            console.log('export as csv.....'); // this.exportForm.reset();
          }
        }]);

        return ExportPage;
      }();

      ExportPage.ctorParameters = function () {
        return [{
          type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"]
        }, {
          type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"]
        }, {
          type: _services_wallets_wallets_service__WEBPACK_IMPORTED_MODULE_4__["WalletsService"]
        }, {
          type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["LoadingController"]
        }];
      };

      ExportPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-export',
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
        /*! raw-loader!./export.page.html */
        "./node_modules/raw-loader/dist/cjs.js!./src/app/export/export.page.html"))["default"],
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
        /*! ./export.page.scss */
        "./src/app/export/export.page.scss"))["default"]]
      })], ExportPage);
      /***/
    }
  }]);
})();
//# sourceMappingURL=export-export-module-es5.js.map