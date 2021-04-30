(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["nem-nem-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/wallets/nem/nem.page.html":
/*!*********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/wallets/nem/nem.page.html ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header class=\"ion-no-border\">\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-back-button defaultHref=\"/tabnav/wallets\" text=\"\"></ion-back-button>\n    </ion-buttons>\n    <ion-buttons slot=\"end\">\n      <ion-button color=\"light\" (click)=\"openNodeSelectionModal()\">\n        <ion-icon name=\"ellipse\" size=\"small\"></ion-icon>Node\n      </ion-button>\n    </ion-buttons>\n    <ion-title>{{ isTokenSelected ? selectedNemToken.walletName : nemWallet.walletName }} (NEM)</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <app-balance [wallet]=\"isTokenSelected ? selectedNemToken : nemWallet\"></app-balance>\n\n  <ion-segment scrollable [(ngModel)]=\"segmentModel\">\n    <ion-segment-button value=\"transaction\" layout=\"icon-start\">\n      <ion-icon name=\"list\"></ion-icon>\n      <ion-label>Transaction</ion-label>\n    </ion-segment-button>\n    <ion-segment-button value=\"chart\" layout=\"icon-start\">\n      <ion-icon name=\"trending-up\"></ion-icon>\n      <ion-label>Chart</ion-label>\n    </ion-segment-button>\n  </ion-segment>\n\n  <div *ngIf=\"finalTransactions && finalTransactions.length >=1; else noTransaction\">\n    <app-chart *ngIf=\"segmentModel === 'chart'\" [transactionsData]=\"finalTransactions\"></app-chart>\n\n    <app-transaction-list\n      [transactions]=\"finalTransactions\"\n      *ngIf=\"segmentModel === 'transaction'\"\n    ></app-transaction-list>\n  </div>\n\n  <ng-template #noTransaction>\n    <p class=\"ion-text-center\">No transaction</p>\n  </ng-template>\n</ion-content>\n");

/***/ }),

/***/ "./src/app/wallets/nem/nem-routing.module.ts":
/*!***************************************************!*\
  !*** ./src/app/wallets/nem/nem-routing.module.ts ***!
  \***************************************************/
/*! exports provided: NemPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NemPageRoutingModule", function() { return NemPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _nem_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nem.page */ "./src/app/wallets/nem/nem.page.ts");




const routes = [
    {
        path: '',
        component: _nem_page__WEBPACK_IMPORTED_MODULE_3__["NemPage"]
    }
];
let NemPageRoutingModule = class NemPageRoutingModule {
};
NemPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], NemPageRoutingModule);



/***/ }),

/***/ "./src/app/wallets/nem/nem.module.ts":
/*!*******************************************!*\
  !*** ./src/app/wallets/nem/nem.module.ts ***!
  \*******************************************/
/*! exports provided: NemPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NemPageModule", function() { return NemPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var _nem_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./nem-routing.module */ "./src/app/wallets/nem/nem-routing.module.ts");
/* harmony import */ var _nem_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./nem.page */ "./src/app/wallets/nem/nem.page.ts");
/* harmony import */ var _sharedComponents_balance_balance_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../sharedComponents/balance/balance.component */ "./src/app/wallets/sharedComponents/balance/balance.component.ts");
/* harmony import */ var _sharedComponents_transaction_list_transaction_list_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../sharedComponents/transaction-list/transaction-list.component */ "./src/app/wallets/sharedComponents/transaction-list/transaction-list.component.ts");
/* harmony import */ var _sharedComponents_chart_chart_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../sharedComponents/chart/chart.component */ "./src/app/wallets/sharedComponents/chart/chart.component.ts");
/* harmony import */ var _sharedComponents_transaction_item_transaction_detail_transaction_detail_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../sharedComponents/transaction-item/transaction-detail/transaction-detail.component */ "./src/app/wallets/sharedComponents/transaction-item/transaction-detail/transaction-detail.component.ts");
/* harmony import */ var _sharedComponents_transaction_item_transaction_item_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../sharedComponents/transaction-item/transaction-item.component */ "./src/app/wallets/sharedComponents/transaction-item/transaction-item.component.ts");












let NemPageModule = class NemPageModule {
};
NemPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _nem_routing_module__WEBPACK_IMPORTED_MODULE_5__["NemPageRoutingModule"]],
        declarations: [
            _nem_page__WEBPACK_IMPORTED_MODULE_6__["NemPage"],
            _sharedComponents_balance_balance_component__WEBPACK_IMPORTED_MODULE_7__["BalanceComponent"],
            _sharedComponents_chart_chart_component__WEBPACK_IMPORTED_MODULE_9__["ChartComponent"],
            _sharedComponents_transaction_list_transaction_list_component__WEBPACK_IMPORTED_MODULE_8__["TransactionListComponent"],
            _sharedComponents_transaction_item_transaction_detail_transaction_detail_component__WEBPACK_IMPORTED_MODULE_10__["TransactionDetailComponent"],
            _sharedComponents_transaction_item_transaction_item_component__WEBPACK_IMPORTED_MODULE_11__["TransactionItemComponent"],
        ],
    })
], NemPageModule);



/***/ }),

/***/ "./src/app/wallets/nem/nem.page.scss":
/*!*******************************************!*\
  !*** ./src/app/wallets/nem/nem.page.scss ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("ion-header {\n  --background: linear-gradient(to right, rgba(65, 161, 200), rgb(7, 70, 115));\n}\nion-header ion-icon {\n  color: #2fff3d;\n}\nion-button {\n  color: #0a0a0a;\n  font-size: 13px;\n  font-weight: bold;\n}\nion-segment {\n  height: 40px;\n  margin: 0;\n  border-radius: 0;\n  --background: linear-gradient(to right, rgba(65, 161, 200), rgb(7, 70, 115));\n}\nion-segment ion-segment-button {\n  --color: #074673;\n  --border-radius: 20px 20px 0 0;\n  --background: #f7f7f7;\n  margin: 0;\n  --border-width: 1px;\n  --border-color: #f7f7f7;\n}\nion-segment ion-segment-button ion-icon {\n  --color: #074673;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvd2FsbGV0cy9uZW0vbmVtLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLDRFQUFBO0FBQ0Y7QUFDRTtFQUNFLGNBQUE7QUFDSjtBQUdBO0VBQ0UsY0FBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtBQUFGO0FBR0E7RUFDRSxZQUFBO0VBQ0EsU0FBQTtFQUNBLGdCQUFBO0VBQ0EsNEVBQUE7QUFBRjtBQUNFO0VBQ0UsZ0JBQUE7RUFDQSw4QkFBQTtFQUNBLHFCQUFBO0VBQ0EsU0FBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7QUFDSjtBQUFJO0VBQ0UsZ0JBQUE7QUFFTiIsImZpbGUiOiJzcmMvYXBwL3dhbGxldHMvbmVtL25lbS5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpb24taGVhZGVyIHtcbiAgLS1iYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsIHJnYmEoNjUsIDE2MSwgMjAwKSwgcmdiKDcsIDcwLCAxMTUpKTtcblxuICBpb24taWNvbiB7XG4gICAgY29sb3I6ICMyZmZmM2Q7XG4gIH1cbn1cblxuaW9uLWJ1dHRvbiB7XG4gIGNvbG9yOiAjMGEwYTBhO1xuICBmb250LXNpemU6IDEzcHg7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuXG5pb24tc2VnbWVudCB7XG4gIGhlaWdodDogNDBweDtcbiAgbWFyZ2luOiAwO1xuICBib3JkZXItcmFkaXVzOiAwO1xuICAtLWJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgcmdiYSg2NSwgMTYxLCAyMDApLCByZ2IoNywgNzAsIDExNSkpO1xuICBpb24tc2VnbWVudC1idXR0b24ge1xuICAgIC0tY29sb3I6ICMwNzQ2NzM7XG4gICAgLS1ib3JkZXItcmFkaXVzOiAyMHB4IDIwcHggMCAwO1xuICAgIC0tYmFja2dyb3VuZDogI2Y3ZjdmNztcbiAgICBtYXJnaW46IDA7XG4gICAgLS1ib3JkZXItd2lkdGg6IDFweDtcbiAgICAtLWJvcmRlci1jb2xvcjogI2Y3ZjdmNztcbiAgICBpb24taWNvbiB7XG4gICAgICAtLWNvbG9yOiAjMDc0NjczO1xuICAgIH1cbiAgfVxufVxuIl19 */");

/***/ }),

/***/ "./src/app/wallets/nem/nem.page.ts":
/*!*****************************************!*\
  !*** ./src/app/wallets/nem/nem.page.ts ***!
  \*****************************************/
/*! exports provided: NemPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NemPage", function() { return NemPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var src_app_services_wallets_wallets_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/wallets/wallets.service */ "./src/app/services/wallets/wallets.service.ts");
/* harmony import */ var _node_selection_node_selection_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../node-selection/node-selection.component */ "./src/app/wallets/node-selection/node-selection.component.ts");






let NemPage = class NemPage {
    constructor(modalCtrl, walletsService, route) {
        this.modalCtrl = modalCtrl;
        this.walletsService = walletsService;
        this.route = route;
        this.isShowChart = false;
        this.isTokenSelected = false;
    }
    ngOnInit() {
        this.segmentModel = 'transaction';
        this.route.paramMap.subscribe((params) => {
            const id = params.get('id');
            this.nemWallet = this.walletsService.getWallet(id);
            if (params.has('tokenId')) {
                this.isTokenSelected = true;
                const nemToken = this.walletsService.getToken(this.nemWallet, params.get('tokenId'));
                console.log('nem token page:', nemToken);
                this.selectedNemToken = {
                    walletName: nemToken.name,
                    walletType: this.nemWallet.walletType,
                    walletBalance: nemToken.balance,
                    walletAddress: this.nemWallet.walletAddress,
                };
                this.finalTransactions = this.walletsService.getTokenTransaction(this.nemWallet, nemToken.id);
            }
            else {
                this.isTokenSelected = false;
                this.finalTransactions = this.nemWallet.transactions;
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
NemPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"] },
    { type: src_app_services_wallets_wallets_service__WEBPACK_IMPORTED_MODULE_4__["WalletsService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] }
];
NemPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-nem',
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./nem.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/wallets/nem/nem.page.html")).default,
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./nem.page.scss */ "./src/app/wallets/nem/nem.page.scss")).default]
    })
], NemPage);



/***/ })

}]);
//# sourceMappingURL=nem-nem-module-es2015.js.map