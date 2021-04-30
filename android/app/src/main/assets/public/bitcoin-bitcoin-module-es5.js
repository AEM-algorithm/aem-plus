(function () {
  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["bitcoin-bitcoin-module"], {
    /***/
    "./node_modules/raw-loader/dist/cjs.js!./src/app/wallets/bitcoin/bitcoin.page.html":
    /*!*****************************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/wallets/bitcoin/bitcoin.page.html ***!
      \*****************************************************************************************/

    /*! exports provided: default */

    /***/
    function node_modulesRawLoaderDistCjsJsSrcAppWalletsBitcoinBitcoinPageHtml(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<ion-header class=\"ion-no-border\">\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-back-button color=\"light\" defaultHref=\"/tabnav/wallets\" text=\"\"></ion-back-button>\n    </ion-buttons>\n    <ion-buttons slot=\"end\">\n      <ion-button color=\"light\" (click)=\"openNodeSelectionModal()\">\n        <ion-icon name=\"ellipse\" size=\"small\"></ion-icon>Node\n      </ion-button>\n    </ion-buttons>\n\n    <ion-title> {{btcWallet.walletName}} </ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <app-balance [wallet]=\"btcWallet\"></app-balance>\n\n  <ion-segment scrollable [(ngModel)]=\"segmentModel\">\n    <ion-segment-button value=\"transaction\" layout=\"icon-start\">\n      <ion-icon name=\"list\"></ion-icon>\n      <ion-label>Transaction</ion-label>\n    </ion-segment-button>\n    <ion-segment-button value=\"chart\" layout=\"icon-start\">\n      <ion-icon name=\"trending-up\"></ion-icon>\n      <ion-label>Chart</ion-label>\n    </ion-segment-button>\n  </ion-segment>\n\n  <div *ngIf=\"btcWallet.transactions && btcWallet.transactions.length >=1; else noTransaction\">\n    <app-chart *ngIf=\"segmentModel === 'chart'\" [transactionsData]=\"btcWallet.transactions\"></app-chart>\n\n    <app-transaction-list\n      [transactions]=\"btcWallet.transactions\"\n      *ngIf=\"segmentModel === 'transaction'\"\n    ></app-transaction-list>\n  </div>\n\n  <ng-template #noTransaction>\n    <p class=\"ion-text-center\">No transactions</p>\n  </ng-template>\n</ion-content>\n";
      /***/
    },

    /***/
    "./src/app/wallets/bitcoin/bitcoin-routing.module.ts":
    /*!***********************************************************!*\
      !*** ./src/app/wallets/bitcoin/bitcoin-routing.module.ts ***!
      \***********************************************************/

    /*! exports provided: BitcoinPageRoutingModule */

    /***/
    function srcAppWalletsBitcoinBitcoinRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "BitcoinPageRoutingModule", function () {
        return BitcoinPageRoutingModule;
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


      var _bitcoin_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./bitcoin.page */
      "./src/app/wallets/bitcoin/bitcoin.page.ts");

      var routes = [{
        path: '',
        component: _bitcoin_page__WEBPACK_IMPORTED_MODULE_3__["BitcoinPage"]
      }];

      var BitcoinPageRoutingModule = function BitcoinPageRoutingModule() {
        _classCallCheck(this, BitcoinPageRoutingModule);
      };

      BitcoinPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
      })], BitcoinPageRoutingModule);
      /***/
    },

    /***/
    "./src/app/wallets/bitcoin/bitcoin.module.ts":
    /*!***************************************************!*\
      !*** ./src/app/wallets/bitcoin/bitcoin.module.ts ***!
      \***************************************************/

    /*! exports provided: BitcoinPageModule */

    /***/
    function srcAppWalletsBitcoinBitcoinModuleTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "BitcoinPageModule", function () {
        return BitcoinPageModule;
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


      var _bitcoin_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./bitcoin-routing.module */
      "./src/app/wallets/bitcoin/bitcoin-routing.module.ts");
      /* harmony import */


      var _bitcoin_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./bitcoin.page */
      "./src/app/wallets/bitcoin/bitcoin.page.ts");
      /* harmony import */


      var _sharedComponents_balance_balance_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ../sharedComponents/balance/balance.component */
      "./src/app/wallets/sharedComponents/balance/balance.component.ts");
      /* harmony import */


      var _sharedComponents_transaction_list_transaction_list_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! ../sharedComponents/transaction-list/transaction-list.component */
      "./src/app/wallets/sharedComponents/transaction-list/transaction-list.component.ts");
      /* harmony import */


      var _sharedComponents_chart_chart_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! ../sharedComponents/chart/chart.component */
      "./src/app/wallets/sharedComponents/chart/chart.component.ts");
      /* harmony import */


      var _sharedComponents_transaction_item_transaction_item_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! ../sharedComponents/transaction-item/transaction-item.component */
      "./src/app/wallets/sharedComponents/transaction-item/transaction-item.component.ts");
      /* harmony import */


      var _sharedComponents_transaction_item_transaction_detail_transaction_detail_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! ../sharedComponents/transaction-item/transaction-detail/transaction-detail.component */
      "./src/app/wallets/sharedComponents/transaction-item/transaction-detail/transaction-detail.component.ts");
      /* harmony import */


      var _node_selection_node_selection_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! ../node-selection/node-selection.component */
      "./src/app/wallets/node-selection/node-selection.component.ts"); // components:


      var BitcoinPageModule = function BitcoinPageModule() {
        _classCallCheck(this, BitcoinPageModule);
      };

      BitcoinPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _bitcoin_routing_module__WEBPACK_IMPORTED_MODULE_5__["BitcoinPageRoutingModule"]],
        declarations: [_bitcoin_page__WEBPACK_IMPORTED_MODULE_6__["BitcoinPage"], _sharedComponents_balance_balance_component__WEBPACK_IMPORTED_MODULE_7__["BalanceComponent"], _sharedComponents_chart_chart_component__WEBPACK_IMPORTED_MODULE_9__["ChartComponent"], _sharedComponents_transaction_list_transaction_list_component__WEBPACK_IMPORTED_MODULE_8__["TransactionListComponent"], _sharedComponents_transaction_item_transaction_item_component__WEBPACK_IMPORTED_MODULE_10__["TransactionItemComponent"], _sharedComponents_transaction_item_transaction_detail_transaction_detail_component__WEBPACK_IMPORTED_MODULE_11__["TransactionDetailComponent"], _node_selection_node_selection_component__WEBPACK_IMPORTED_MODULE_12__["NodeSelectionComponent"]]
      })], BitcoinPageModule);
      /***/
    },

    /***/
    "./src/app/wallets/bitcoin/bitcoin.page.scss":
    /*!***************************************************!*\
      !*** ./src/app/wallets/bitcoin/bitcoin.page.scss ***!
      \***************************************************/

    /*! exports provided: default */

    /***/
    function srcAppWalletsBitcoinBitcoinPageScss(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "ion-header ion-icon {\n  color: #2fff3d;\n}\n\n.space {\n  height: 15px;\n}\n\nion-button {\n  color: #0a0a0a;\n  font-size: 13px;\n  font-weight: bold;\n}\n\nion-segment {\n  height: 40px;\n  margin: 0;\n  border-radius: 0;\n  --background: linear-gradient(to right, rgba(65, 161, 200), rgb(7, 70, 115));\n}\n\nion-segment ion-segment-button {\n  --color: #074673;\n  --border-radius: 20px 20px 0 0;\n  --background: #f7f7f7;\n  margin: 0;\n  --border-width: 1px;\n  --border-color: #f7f7f7;\n}\n\nion-segment ion-segment-button ion-icon {\n  --color: #074673;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvd2FsbGV0cy9iaXRjb2luL2JpdGNvaW4ucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVFO0VBQ0UsY0FBQTtBQURKOztBQUtBO0VBQ0UsWUFBQTtBQUZGOztBQUtBO0VBQ0UsY0FBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtBQUZGOztBQUtBO0VBQ0UsWUFBQTtFQUNBLFNBQUE7RUFDQSxnQkFBQTtFQUNBLDRFQUFBO0FBRkY7O0FBR0U7RUFDRSxnQkFBQTtFQUNBLDhCQUFBO0VBQ0EscUJBQUE7RUFDQSxTQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtBQURKOztBQUVJO0VBQ0UsZ0JBQUE7QUFBTiIsImZpbGUiOiJzcmMvYXBwL3dhbGxldHMvYml0Y29pbi9iaXRjb2luLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImlvbi1oZWFkZXIge1xuICAvLyAtLWJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgcmdiYSg2NSwgMTYxLCAyMDApLCByZ2IoNywgNzAsIDExNSkpO1xuICBpb24taWNvbiB7XG4gICAgY29sb3I6ICMyZmZmM2Q7XG4gIH1cbn1cblxuLnNwYWNlIHtcbiAgaGVpZ2h0OiAxNXB4O1xufVxuXG5pb24tYnV0dG9uIHtcbiAgY29sb3I6ICMwYTBhMGE7XG4gIGZvbnQtc2l6ZTogMTNweDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbmlvbi1zZWdtZW50IHtcbiAgaGVpZ2h0OiA0MHB4O1xuICBtYXJnaW46IDA7XG4gIGJvcmRlci1yYWRpdXM6IDA7XG4gIC0tYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCByZ2JhKDY1LCAxNjEsIDIwMCksIHJnYig3LCA3MCwgMTE1KSk7XG4gIGlvbi1zZWdtZW50LWJ1dHRvbiB7XG4gICAgLS1jb2xvcjogIzA3NDY3MztcbiAgICAtLWJvcmRlci1yYWRpdXM6IDIwcHggMjBweCAwIDA7XG4gICAgLS1iYWNrZ3JvdW5kOiAjZjdmN2Y3O1xuICAgIG1hcmdpbjogMDtcbiAgICAtLWJvcmRlci13aWR0aDogMXB4O1xuICAgIC0tYm9yZGVyLWNvbG9yOiAjZjdmN2Y3O1xuICAgIGlvbi1pY29uIHtcbiAgICAgIC0tY29sb3I6ICMwNzQ2NzM7XG4gICAgfVxuICB9XG59XG5cbi8vIC0tLTogdGhlIHNhbWUgYXMgdGhlIHRvb2xiYXIncyBwYWRkaW5nIG9uIHRoZSB0b3Bcbi8vIGlvbi10aXRsZSB7XG4vLyAgIHBhZGRpbmctdG9wOiAyMHB4O1xuLy8gfVxuIl19 */";
      /***/
    },

    /***/
    "./src/app/wallets/bitcoin/bitcoin.page.ts":
    /*!*************************************************!*\
      !*** ./src/app/wallets/bitcoin/bitcoin.page.ts ***!
      \*************************************************/

    /*! exports provided: BitcoinPage */

    /***/
    function srcAppWalletsBitcoinBitcoinPageTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "BitcoinPage", function () {
        return BitcoinPage;
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


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @ionic/angular */
      "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
      /* harmony import */


      var src_app_services_wallets_wallets_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! src/app/services/wallets/wallets.service */
      "./src/app/services/wallets/wallets.service.ts");
      /* harmony import */


      var _node_selection_node_selection_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ../node-selection/node-selection.component */
      "./src/app/wallets/node-selection/node-selection.component.ts");

      var BitcoinPage = /*#__PURE__*/function () {
        function BitcoinPage(modalCtrl, route, walletsService) {
          _classCallCheck(this, BitcoinPage);

          this.modalCtrl = modalCtrl;
          this.route = route;
          this.walletsService = walletsService;
        }

        _createClass(BitcoinPage, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this = this;

            this.segmentModel = 'transaction'; // -----  get the wallet info:

            this.route.params.subscribe(function (params) {
              var id = params['id'];
              _this.btcWallet = _this.walletsService.getWallet(id);
            });
          }
        }, {
          key: "openNodeSelectionModal",
          value: function openNodeSelectionModal() {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              var modal;
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return this.modalCtrl.create({
                        component: _node_selection_node_selection_component__WEBPACK_IMPORTED_MODULE_5__["NodeSelectionComponent"]
                      });

                    case 2:
                      modal = _context.sent;
                      _context.next = 5;
                      return modal.present();

                    case 5:
                      return _context.abrupt("return", _context.sent);

                    case 6:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, this);
            }));
          }
        }]);

        return BitcoinPage;
      }();

      BitcoinPage.ctorParameters = function () {
        return [{
          type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"]
        }, {
          type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]
        }, {
          type: src_app_services_wallets_wallets_service__WEBPACK_IMPORTED_MODULE_4__["WalletsService"]
        }];
      };

      BitcoinPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-bitcoin',
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
        /*! raw-loader!./bitcoin.page.html */
        "./node_modules/raw-loader/dist/cjs.js!./src/app/wallets/bitcoin/bitcoin.page.html"))["default"],
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
        /*! ./bitcoin.page.scss */
        "./src/app/wallets/bitcoin/bitcoin.page.scss"))["default"]]
      })], BitcoinPage);
      /***/
    }
  }]);
})();
//# sourceMappingURL=bitcoin-bitcoin-module-es5.js.map