(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["eth-eth-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/wallets/eth/eth.page.html":
/*!*********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/wallets/eth/eth.page.html ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header class=\"ion-no-border\">\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-back-button color=\"light\" defaultHref=\"/tabnav/wallets\" text=\"\"></ion-back-button>\n    </ion-buttons>\n    <ion-buttons slot=\"end\">\n      <ion-button color=\"light\" (click)=\"openNodeSelectionModal()\">\n        <ion-icon name=\"ellipse\" size=\"small\"></ion-icon>Node\n      </ion-button>\n    </ion-buttons>\n\n    <ion-title> {{ethWallet.walletName}} (BTC) </ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <app-balance [wallet]=\"ethWallet\"></app-balance>\n\n  <ion-segment scrollable [(ngModel)]=\"segmentModel\">\n    <ion-segment-button value=\"transaction\" layout=\"icon-start\">\n      <ion-icon name=\"list\"></ion-icon>\n      <ion-label>Transaction</ion-label>\n    </ion-segment-button>\n    <ion-segment-button value=\"chart\" layout=\"icon-start\">\n      <!-- <ion-icon name=\"stats-chart\"></ion-icon> -->\n      <ion-icon name=\"trending-up\"></ion-icon>\n      <ion-label>Chart</ion-label>\n    </ion-segment-button>\n  </ion-segment>\n\n  <div *ngIf=\"finalTrans && finalTrans.length >=1; else noTransaction\">\n    <app-chart *ngIf=\"segmentModel === 'chart'\" [transactionsData]=\"finalTrans\"></app-chart>\n\n    <app-transaction-list [transactions]=\"finalTrans\" *ngIf=\"segmentModel === 'transaction'\"></app-transaction-list>\n  </div>\n\n  <ng-template #noTransaction>\n    <p class=\"ion-text-center\">No transaction</p>\n  </ng-template>\n</ion-content>\n");

/***/ }),

/***/ "./src/app/wallets/eth/eth-routing.module.ts":
/*!***************************************************!*\
  !*** ./src/app/wallets/eth/eth-routing.module.ts ***!
  \***************************************************/
/*! exports provided: EthPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EthPageRoutingModule", function() { return EthPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _eth_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./eth.page */ "./src/app/wallets/eth/eth.page.ts");




const routes = [
    {
        path: '',
        component: _eth_page__WEBPACK_IMPORTED_MODULE_3__["EthPage"]
    }
];
let EthPageRoutingModule = class EthPageRoutingModule {
};
EthPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], EthPageRoutingModule);



/***/ }),

/***/ "./src/app/wallets/eth/eth.module.ts":
/*!*******************************************!*\
  !*** ./src/app/wallets/eth/eth.module.ts ***!
  \*******************************************/
/*! exports provided: EthPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EthPageModule", function() { return EthPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var _eth_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./eth-routing.module */ "./src/app/wallets/eth/eth-routing.module.ts");
/* harmony import */ var _eth_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./eth.page */ "./src/app/wallets/eth/eth.page.ts");
/* harmony import */ var _sharedComponents_balance_balance_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../sharedComponents/balance/balance.component */ "./src/app/wallets/sharedComponents/balance/balance.component.ts");
/* harmony import */ var _sharedComponents_chart_chart_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../sharedComponents/chart/chart.component */ "./src/app/wallets/sharedComponents/chart/chart.component.ts");
/* harmony import */ var _sharedComponents_transaction_list_transaction_list_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../sharedComponents/transaction-list/transaction-list.component */ "./src/app/wallets/sharedComponents/transaction-list/transaction-list.component.ts");
/* harmony import */ var _sharedComponents_transaction_item_transaction_item_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../sharedComponents/transaction-item/transaction-item.component */ "./src/app/wallets/sharedComponents/transaction-item/transaction-item.component.ts");
/* harmony import */ var _sharedComponents_transaction_item_transaction_detail_transaction_detail_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../sharedComponents/transaction-item/transaction-detail/transaction-detail.component */ "./src/app/wallets/sharedComponents/transaction-item/transaction-detail/transaction-detail.component.ts");












let EthPageModule = class EthPageModule {
};
EthPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _eth_routing_module__WEBPACK_IMPORTED_MODULE_5__["EthPageRoutingModule"]],
        declarations: [
            _eth_page__WEBPACK_IMPORTED_MODULE_6__["EthPage"],
            _sharedComponents_balance_balance_component__WEBPACK_IMPORTED_MODULE_7__["BalanceComponent"],
            _sharedComponents_chart_chart_component__WEBPACK_IMPORTED_MODULE_8__["ChartComponent"],
            _sharedComponents_transaction_list_transaction_list_component__WEBPACK_IMPORTED_MODULE_9__["TransactionListComponent"],
            _sharedComponents_transaction_item_transaction_item_component__WEBPACK_IMPORTED_MODULE_10__["TransactionItemComponent"],
            _sharedComponents_transaction_item_transaction_detail_transaction_detail_component__WEBPACK_IMPORTED_MODULE_11__["TransactionDetailComponent"],
        ],
    })
], EthPageModule);



/***/ }),

/***/ "./src/app/wallets/eth/eth.page.scss":
/*!*******************************************!*\
  !*** ./src/app/wallets/eth/eth.page.scss ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("ion-header {\n  --background: linear-gradient(to right, rgba(65, 161, 200), rgb(7, 70, 115));\n}\nion-header ion-icon {\n  color: #2fff3d;\n}\n.space {\n  height: 15px;\n}\nion-button {\n  color: #0a0a0a;\n  font-size: 13px;\n  font-weight: bold;\n}\nion-segment {\n  height: 40px;\n  margin: 0;\n  border-radius: 0;\n  --background: linear-gradient(to right, rgba(65, 161, 200), rgb(7, 70, 115));\n}\nion-segment ion-segment-button {\n  --color: #074673;\n  --border-radius: 20px 20px 0 0;\n  --background: #f7f7f7;\n  margin: 0;\n  --border-width: 1px;\n  --border-color: #f7f7f7;\n}\nion-segment ion-segment-button ion-icon {\n  --color: #074673;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvd2FsbGV0cy9ldGgvZXRoLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLDRFQUFBO0FBQ0Y7QUFDRTtFQUNFLGNBQUE7QUFDSjtBQUdBO0VBQ0UsWUFBQTtBQUFGO0FBR0E7RUFDRSxjQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0FBQUY7QUFHQTtFQUNFLFlBQUE7RUFDQSxTQUFBO0VBQ0EsZ0JBQUE7RUFDQSw0RUFBQTtBQUFGO0FBQ0U7RUFDRSxnQkFBQTtFQUNBLDhCQUFBO0VBQ0EscUJBQUE7RUFDQSxTQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtBQUNKO0FBQUk7RUFDRSxnQkFBQTtBQUVOIiwiZmlsZSI6InNyYy9hcHAvd2FsbGV0cy9ldGgvZXRoLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImlvbi1oZWFkZXIge1xuICAtLWJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgcmdiYSg2NSwgMTYxLCAyMDApLCByZ2IoNywgNzAsIDExNSkpO1xuXG4gIGlvbi1pY29uIHtcbiAgICBjb2xvcjogIzJmZmYzZDtcbiAgfVxufVxuXG4uc3BhY2Uge1xuICBoZWlnaHQ6IDE1cHg7XG59XG5cbmlvbi1idXR0b24ge1xuICBjb2xvcjogIzBhMGEwYTtcbiAgZm9udC1zaXplOiAxM3B4O1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuaW9uLXNlZ21lbnQge1xuICBoZWlnaHQ6IDQwcHg7XG4gIG1hcmdpbjogMDtcbiAgYm9yZGVyLXJhZGl1czogMDtcbiAgLS1iYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsIHJnYmEoNjUsIDE2MSwgMjAwKSwgcmdiKDcsIDcwLCAxMTUpKTtcbiAgaW9uLXNlZ21lbnQtYnV0dG9uIHtcbiAgICAtLWNvbG9yOiAjMDc0NjczO1xuICAgIC0tYm9yZGVyLXJhZGl1czogMjBweCAyMHB4IDAgMDtcbiAgICAtLWJhY2tncm91bmQ6ICNmN2Y3Zjc7XG4gICAgbWFyZ2luOiAwO1xuICAgIC0tYm9yZGVyLXdpZHRoOiAxcHg7XG4gICAgLS1ib3JkZXItY29sb3I6ICNmN2Y3Zjc7XG4gICAgaW9uLWljb24ge1xuICAgICAgLS1jb2xvcjogIzA3NDY3MztcbiAgICB9XG4gIH1cbn1cbiJdfQ== */");

/***/ }),

/***/ "./src/app/wallets/eth/eth.page.ts":
/*!*****************************************!*\
  !*** ./src/app/wallets/eth/eth.page.ts ***!
  \*****************************************/
/*! exports provided: EthPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EthPage", function() { return EthPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var src_app_services_wallets_wallets_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/wallets/wallets.service */ "./src/app/services/wallets/wallets.service.ts");
/* harmony import */ var _node_selection_node_selection_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../node-selection/node-selection.component */ "./src/app/wallets/node-selection/node-selection.component.ts");






let EthPage = class EthPage {
    constructor(modalCtrl, route, walletsService) {
        this.modalCtrl = modalCtrl;
        this.route = route;
        this.walletsService = walletsService;
        this.isTokenSelected = false;
    }
    ngOnInit() {
        this.segmentModel = 'transaction';
        this.route.paramMap.subscribe((params) => {
            this.ethWallet = this.walletsService.getWallet(params.get('id'));
            if (params.has('tokenId')) {
                this.isTokenSelected = true;
                const ethToken = this.walletsService.getToken(this.ethWallet, params.get('tokenId'));
                this.selectedEthToken = {
                    walletName: ethToken.name,
                    walletType: this.ethWallet.walletType,
                    walletBalance: ethToken.balance,
                    walletAddress: this.ethWallet.walletAddress,
                };
                //  no mock data for this view:
                this.finalTrans = this.walletsService.getTokenTransaction(this.ethWallet, ethToken.id);
            }
            else {
                this.isTokenSelected = false;
                this.finalTrans = this.ethWallet.transactions;
            }
        });
    }
    openNodeSelectionModal() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const modal = yield this.modalCtrl.create({
                component: _node_selection_node_selection_component__WEBPACK_IMPORTED_MODULE_5__["NodeSelectionComponent"],
            });
            return yield modal.present();
        });
    }
};
EthPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
    { type: src_app_services_wallets_wallets_service__WEBPACK_IMPORTED_MODULE_4__["WalletsService"] }
];
EthPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-eth',
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./eth.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/wallets/eth/eth.page.html")).default,
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./eth.page.scss */ "./src/app/wallets/eth/eth.page.scss")).default]
    })
], EthPage);



/***/ })

}]);
//# sourceMappingURL=eth-eth-module-es2015.js.map