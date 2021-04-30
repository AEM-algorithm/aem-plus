(function () {
  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["edit-wallet-edit-wallet-module"], {
    /***/
    "./node_modules/raw-loader/dist/cjs.js!./src/app/wallets/edit-wallet/edit-wallet.page.html":
    /*!*************************************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/wallets/edit-wallet/edit-wallet.page.html ***!
      \*************************************************************************************************/

    /*! exports provided: default */

    /***/
    function node_modulesRawLoaderDistCjsJsSrcAppWalletsEditWalletEditWalletPageHtml(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-back-button color=\"light\" defaultHref=\"/tabnav/wallets\" text=\"\"></ion-back-button>\n    </ion-buttons>\n\n    <div class=\"wallet-img\">\n      <ion-avatar>\n        <ion-img\n          [src]=\"selectedWallet.walletType === 'BTC' ? 'assets/img/bitcoin.png' : selectedWallet.walletType === 'NEM' ?  'assets/img/nem-icon.png' : 'assets/img/ethereum.png'\"\n        >\n        </ion-img>\n      </ion-avatar>\n    </div>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <div class=\"wallet-name-div ion-text-center ion-padding\">\n    <ion-text class=\"wallet-name ion-margin\"> {{selectedWallet.walletName}} </ion-text>\n  </div>\n\n  <ion-list>\n    <ion-list-header lines=\"none\">\n      <ion-label>Wallet Name</ion-label>\n    </ion-list-header>\n    <!--  ========= non-editing mode -->\n    <ion-item *ngIf=\"!isEditing ; else editMode\">\n      <ion-label *ngIf=\"!isEditing\">\n        <ion-text>{{newWalletName}}</ion-text>\n      </ion-label>\n      <ion-button fill=\"clear\" slot=\"end\" (click)=\"onEdit()\" class=\"edit-btn\">\n        <ion-icon class=\"ion-text-end\" name=\"create-outline\" slot=\"icon-only\"></ion-icon>\n      </ion-button>\n    </ion-item>\n\n    <!--    ======== editing mode -->\n    <ng-template #editMode>\n      <form (ngSubmit)=\"onSave()\" [formGroup]=\"editForm\">\n        <ion-item>\n          <ion-input\n            *ngIf=\"isEditing\"\n            type=\"text\"\n            name=\"walletName\"\n            autofocus\n            formControlName=\"name\"\n            [placeholder]=\"newWalletName\"\n          >\n          </ion-input>\n          <ion-button fill=\"clear\" slot=\"end\" type=\"submit\">\n            <ion-icon slot=\"icon-only\" name=\"checkmark-outline\"></ion-icon>\n          </ion-button>\n          <ion-button fill=\"clear\" slot=\"end\" (click)=\"cancelEidt()\">\n            <ion-icon slot=\"icon-only\" name=\"close-outline\"></ion-icon>\n          </ion-button>\n        </ion-item>\n      </form>\n    </ng-template>\n\n    <ion-list-header lines=\"none\">\n      <ion-label> Private key</ion-label>\n    </ion-list-header>\n    <ion-item>\n      <!--  ====> PK: show  -->\n      <ion-label color=\"primary\">\n        <ion-text *ngIf=\"showPrivateKey; else hidePk\">{{selectedWallet.privateKey}}</ion-text>\n        <ng-template #hidePk>\n          <ion-text>**************</ion-text>\n        </ng-template>\n      </ion-label>\n\n      <!-- two icon button : preform different action -->\n      <ion-button fill=\"clear\" (click)=\"onCopyPk()\">\n        <ion-icon name=\"copy-outline\" slot=\"icon-only\"></ion-icon>\n      </ion-button>\n      <ion-button fill=\"clear\" (click)=\"onShowPk()\">\n        <ion-icon [name]=\"showPrivateKey ? 'eye':'eye-off' \" slot=\"icon-only\"></ion-icon>\n      </ion-button>\n    </ion-item>\n\n    <ion-list-header lines=\"none\">\n      <ion-label> Mnemonic</ion-label>\n    </ion-list-header>\n    <ion-item>\n      <ion-label color=\"primary\" *ngIf=\"showMnemonic; else hideMnemonic\">\n        <ion-text *ngFor=\"let word of selectedWallet.mnemonic\">{{word}} </ion-text>\n      </ion-label>\n\n      <ng-template #hideMnemonic>\n        <ion-label color=\"primary\">\n          <ion-text>**************</ion-text>\n        </ion-label>\n      </ng-template>\n\n      <!-- two icon button : preform different action -->\n      <ion-button fill=\"clear\" (click)=\"onCopyMnemonic()\">\n        <ion-icon name=\"copy-outline\" slot=\"icon-only\"></ion-icon>\n      </ion-button>\n      <ion-button fill=\"clear\" (click)=\"onShowMnemonic()\">\n        <ion-icon [name]=\"showMnemonic ? 'eye':'eye-off'\" slot=\"icon-only\"></ion-icon>\n      </ion-button>\n    </ion-item>\n\n    <ion-list-header lines=\"none\">\n      <ion-label>Paper wallet notes(optional)</ion-label>\n    </ion-list-header>\n    <ion-item>\n      <ion-input (ionChange)=\"onMakeNote($event)\" placeholder=\"Make a note of this wallet\"></ion-input>\n    </ion-item>\n  </ion-list>\n</ion-content>\n\n<ion-footer class=\"ion-no-border\">\n  <div>\n    <ion-button class=\"btn-gradient-bg\" expand=\"block\" (click)=\"downloadWalletPdf()\" [disabled]=\"\"\n      >Download Wallet Paper</ion-button\n    >\n    <ion-button class=\"btn-gradient-bg\" expand=\"block\" (click)=\"onDelete()\">Delete The Wallet</ion-button>\n  </div>\n</ion-footer>\n";
      /***/
    },

    /***/
    "./src/app/wallets/edit-wallet/edit-wallet-routing.module.ts":
    /*!*******************************************************************!*\
      !*** ./src/app/wallets/edit-wallet/edit-wallet-routing.module.ts ***!
      \*******************************************************************/

    /*! exports provided: EditWalletPageRoutingModule */

    /***/
    function srcAppWalletsEditWalletEditWalletRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "EditWalletPageRoutingModule", function () {
        return EditWalletPageRoutingModule;
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


      var _edit_wallet_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./edit-wallet.page */
      "./src/app/wallets/edit-wallet/edit-wallet.page.ts");

      var routes = [{
        path: '',
        component: _edit_wallet_page__WEBPACK_IMPORTED_MODULE_3__["EditWalletPage"]
      }];

      var EditWalletPageRoutingModule = function EditWalletPageRoutingModule() {
        _classCallCheck(this, EditWalletPageRoutingModule);
      };

      EditWalletPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
      })], EditWalletPageRoutingModule);
      /***/
    },

    /***/
    "./src/app/wallets/edit-wallet/edit-wallet.module.ts":
    /*!***********************************************************!*\
      !*** ./src/app/wallets/edit-wallet/edit-wallet.module.ts ***!
      \***********************************************************/

    /*! exports provided: EditWalletPageModule */

    /***/
    function srcAppWalletsEditWalletEditWalletModuleTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "EditWalletPageModule", function () {
        return EditWalletPageModule;
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


      var _edit_wallet_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./edit-wallet-routing.module */
      "./src/app/wallets/edit-wallet/edit-wallet-routing.module.ts");
      /* harmony import */


      var _edit_wallet_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./edit-wallet.page */
      "./src/app/wallets/edit-wallet/edit-wallet.page.ts");

      var EditWalletPageModule = function EditWalletPageModule() {
        _classCallCheck(this, EditWalletPageModule);
      };

      EditWalletPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _edit_wallet_routing_module__WEBPACK_IMPORTED_MODULE_5__["EditWalletPageRoutingModule"]],
        declarations: [_edit_wallet_page__WEBPACK_IMPORTED_MODULE_6__["EditWalletPage"]]
      })], EditWalletPageModule);
      /***/
    },

    /***/
    "./src/app/wallets/edit-wallet/edit-wallet.page.scss":
    /*!***********************************************************!*\
      !*** ./src/app/wallets/edit-wallet/edit-wallet.page.scss ***!
      \***********************************************************/

    /*! exports provided: default */

    /***/
    function srcAppWalletsEditWalletEditWalletPageScss(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "ion-header .wallet-img {\n  display: flex;\n  justify-content: center;\n}\nion-header ion-img {\n  width: 35px;\n  height: 35px;\n  margin-top: 5px;\n}\n.wallet-name-div {\n  background: linear-gradient(to right, #41a1c8, #074673);\n  height: 100px;\n  text-align: center;\n}\n.wallet-name-div .wallet-name {\n  color: #ffffff;\n  font-size: 30px;\n  font-weight: bold;\n}\n.edit-btn {\n  margin-right: 0;\n}\nion-list-header ion-label {\n  font-size: 16px;\n}\nion-item {\n  margin-right: 12px;\n}\nion-item ion-label {\n  font-size: 12px;\n  color: #757575;\n}\nion-icon {\n  font-size: 20px;\n}\n.download-btn {\n  color: #41a1c8;\n  font-size: 14px;\n  margin-right: 15px;\n}\nion-footer div {\n  margin: 0 12px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvd2FsbGV0cy9lZGl0LXdhbGxldC9lZGl0LXdhbGxldC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0U7RUFDRSxhQUFBO0VBQ0EsdUJBQUE7QUFBSjtBQUdFO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0FBREo7QUFLQTtFQUNFLHVEQUFBO0VBQ0EsYUFBQTtFQUNBLGtCQUFBO0FBRkY7QUFHRTtFQUNFLGNBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7QUFESjtBQUtBO0VBQ0UsZUFBQTtBQUZGO0FBTUU7RUFDRSxlQUFBO0FBSEo7QUFPQTtFQUtFLGtCQUFBO0FBUkY7QUFJRTtFQUNFLGVBQUE7RUFDQSxjQUFBO0FBRko7QUFPQTtFQUNFLGVBQUE7QUFKRjtBQU9BO0VBQ0UsY0FBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtBQUpGO0FBUUU7RUFDRSxjQUFBO0FBTEoiLCJmaWxlIjoic3JjL2FwcC93YWxsZXRzL2VkaXQtd2FsbGV0L2VkaXQtd2FsbGV0LnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImlvbi1oZWFkZXIge1xuICAud2FsbGV0LWltZyB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgfVxuXG4gIGlvbi1pbWcge1xuICAgIHdpZHRoOiAzNXB4O1xuICAgIGhlaWdodDogMzVweDtcbiAgICBtYXJnaW4tdG9wOiA1cHg7XG4gIH1cbn1cblxuLndhbGxldC1uYW1lLWRpdiB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgcmdiYSg2NSwgMTYxLCAyMDApLCByZ2IoNywgNzAsIDExNSkpO1xuICBoZWlnaHQ6IDEwMHB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIC53YWxsZXQtbmFtZSB7XG4gICAgY29sb3I6ICNmZmZmZmY7XG4gICAgZm9udC1zaXplOiAzMHB4O1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICB9XG59XG5cbi5lZGl0LWJ0biB7XG4gIG1hcmdpbi1yaWdodDogMDtcbn1cblxuaW9uLWxpc3QtaGVhZGVyIHtcbiAgaW9uLWxhYmVsIHtcbiAgICBmb250LXNpemU6IDE2cHg7XG4gIH1cbn1cblxuaW9uLWl0ZW0ge1xuICBpb24tbGFiZWwge1xuICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICBjb2xvcjogIzc1NzU3NTtcbiAgfVxuICBtYXJnaW4tcmlnaHQ6IDEycHg7XG59XG5cbmlvbi1pY29uIHtcbiAgZm9udC1zaXplOiAyMHB4O1xufVxuXG4uZG93bmxvYWQtYnRuIHtcbiAgY29sb3I6ICM0MWExYzg7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgbWFyZ2luLXJpZ2h0OiAxNXB4O1xufVxuXG5pb24tZm9vdGVyIHtcbiAgZGl2IHtcbiAgICBtYXJnaW46IDAgMTJweDtcbiAgfVxufVxuIl19 */";
      /***/
    },

    /***/
    "./src/app/wallets/edit-wallet/edit-wallet.page.ts":
    /*!*********************************************************!*\
      !*** ./src/app/wallets/edit-wallet/edit-wallet.page.ts ***!
      \*********************************************************/

    /*! exports provided: EditWalletPage */

    /***/
    function srcAppWalletsEditWalletEditWalletPageTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "EditWalletPage", function () {
        return EditWalletPage;
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


      var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/common/http */
      "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
      /* harmony import */


      var _capacitor_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @capacitor/core */
      "./node_modules/@capacitor/core/dist/esm/index.js");
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @ionic/angular */
      "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/forms */
      "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
      /* harmony import */


      var _ionic_native_clipboard_ngx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @ionic-native/clipboard/ngx */
      "./node_modules/@ionic-native/clipboard/__ivy_ngcc__/ngx/index.js");
      /* harmony import */


      var _ionic_native_file_opener_ngx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @ionic-native/file-opener/ngx */
      "./node_modules/@ionic-native/file-opener/__ivy_ngcc__/ngx/index.js");
      /* harmony import */


      var src_app_services_wallets_wallets_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! src/app/services/wallets/wallets.service */
      "./src/app/services/wallets/wallets.service.ts");
      /* harmony import */


      var pdfmake_build_pdfmake__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! pdfmake/build/pdfmake */
      "./node_modules/pdfmake/build/pdfmake.js");
      /* harmony import */


      var pdfmake_build_pdfmake__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(pdfmake_build_pdfmake__WEBPACK_IMPORTED_MODULE_10__);
      /* harmony import */


      var pdfmake_build_vfs_fonts__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! pdfmake/build/vfs_fonts */
      "./node_modules/pdfmake/build/vfs_fonts.js");
      /* harmony import */


      var pdfmake_build_vfs_fonts__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(pdfmake_build_vfs_fonts__WEBPACK_IMPORTED_MODULE_11__);

      pdfmake_build_pdfmake__WEBPACK_IMPORTED_MODULE_10__["vfs"] = pdfmake_build_vfs_fonts__WEBPACK_IMPORTED_MODULE_11__["pdfMake"].vfs;
      var Filesystem = _capacitor_core__WEBPACK_IMPORTED_MODULE_4__["Plugins"].Filesystem;

      var EditWalletPage = /*#__PURE__*/function () {
        // qrcode data:
        // notesImg = null;
        // addressImg = null;
        function EditWalletPage(route, walletsService, clipboard, toastCtrl, alterCtrl, loadingCtrl, router, plt, http, fileOpener) {
          _classCallCheck(this, EditWalletPage);

          this.route = route;
          this.walletsService = walletsService;
          this.clipboard = clipboard;
          this.toastCtrl = toastCtrl;
          this.alterCtrl = alterCtrl;
          this.loadingCtrl = loadingCtrl;
          this.router = router;
          this.plt = plt;
          this.http = http;
          this.fileOpener = fileOpener;
          this.isEditing = false;
          this.showPrivateKey = false;
          this.showMnemonic = false;
          this.walletImgData = null;
          this.walletPaperNote = '';
          this.walletPaperPdf = null;
        }

        _createClass(EditWalletPage, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this = this;

            this.selectedWallet = this.walletsService.getWallet(this.route.snapshot.params['walletId']);
            this.newWalletName = this.selectedWallet.walletName; // console.log(this.route);

            this.route.params.subscribe(function (data) {
              // console.log(data); //walletId: w1
              var id = data['walletId'];
              _this.selectedWallet = _this.walletsService.getWallet(id);
              console.log('subscribe', _this.walletsService.getWallet(id));
            });
            this.initEditForm(); //  get the wallet img for the pdf

            this.loadImageToBase64();
          }
        }, {
          key: "initEditForm",
          value: function initEditForm() {
            this.editForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormGroup"]({
              name: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](this.selectedWallet.walletName)
            });
          }
        }, {
          key: "onShowPk",
          value: function onShowPk() {
            // TODO: show the Pin modal first:
            this.showPrivateKey = !this.showPrivateKey;
          }
        }, {
          key: "onShowMnemonic",
          value: function onShowMnemonic() {
            // TODO: show the Pin modal first:
            this.showMnemonic = !this.showMnemonic;
          }
        }, {
          key: "onCopyPk",
          value: function onCopyPk() {
            this.clipboard.copy(this.selectedWallet.privateKey);
            this.toastCtrl.create({
              message: 'private key copyed!',
              duration: 3000,
              position: 'top',
              buttons: [{
                text: 'Okay',
                role: 'cancel'
              }]
            }).then(function (toaseEl) {
              toaseEl.present();
            });
          }
        }, {
          key: "onCopyMnemonic",
          value: function onCopyMnemonic() {
            var mnemonicStr = this.selectedWallet.mnemonic.toString();
            console.log(mnemonicStr);
            this.clipboard.copy(mnemonicStr); // TODO: put all the toast notification into a service:

            this.toastCtrl.create({
              message: 'Mnemonic copyed!',
              duration: 3000,
              position: 'top',
              buttons: [{
                text: 'Okay',
                role: 'cancel'
              }]
            }).then(function (toaseEl) {
              toaseEl.present();
            });
          }
        }, {
          key: "onDelete",
          value: function onDelete() {
            var _this2 = this;

            this.alterCtrl.create({
              header: 'Alert',
              // subHeader: 'Subtitle',
              message: 'Are you sure you want to delete this wallet?',
              buttons: [{
                text: 'No',
                role: 'cancel',
                cssClass: 'secondary'
              }, {
                text: 'Yes',
                handler: function handler() {
                  // TODO: show the pin modal
                  _this2.loadingCtrl.create({
                    message: 'Deleting....',
                    translucent: true
                  }).then(function (loadingEl) {
                    loadingEl.present();
                    setTimeout(function () {
                      _this2.walletsService.deleteWallet(_this2.selectedWallet.walletId);

                      loadingEl.dismiss();

                      _this2.router.navigateByUrl('/tabnav/wallets');
                    }, 2000);
                  });
                }
              }]
            }).then(function (alterEl) {
              alterEl.present();
            });
          }
        }, {
          key: "onEdit",
          value: function onEdit() {
            this.isEditing = true; // 1.TODO: atuo focus on the input element
            // 2. open keyboard
          }
        }, {
          key: "onSave",
          value: function onSave() {
            this.newWalletName = this.editForm.get('name').value;
            console.log(this.newWalletName);
            this.walletsService.updateWalletName(this.selectedWallet.walletId, this.newWalletName);
            this.isEditing = false; // this.router.navigateByUrl('/tabnav/wallets');
          }
        }, {
          key: "cancelEidt",
          value: function cancelEidt() {
            this.isEditing = false;
          }
        }, {
          key: "loadImageToBase64",
          value: function loadImageToBase64() {
            var _this3 = this;

            var walletImgPath = this.selectedWallet.walletType === 'BTC' ? 'assets/img/Bitcoin_50px.png' : this.selectedWallet.walletType === 'NEM' ? 'assets/img/nem-icon.png' : 'assets/img/ethereum_50px.png';
            this.http.get(walletImgPath, {
              responseType: 'blob'
            }).subscribe(function (res) {
              var reader = new FileReader();

              reader.onloadend = function () {
                _this3.walletImgData = reader.result;
                console.log(_this3.walletImgData);
              };

              reader.readAsDataURL(res);
            });
          }
        }, {
          key: "onMakeNote",
          value: function onMakeNote(e) {
            this.walletPaperNote = e.detail.value;
            console.log('paper note', this.walletPaperNote);
          }
        }, {
          key: "createWalletPaper",
          value: function createWalletPaper() {
            var walletPaperDoc = {
              watermark: {
                text: 'AEM Algorithm',
                color: '#0F4B73',
                opacity: 0.1,
                bold: true
              },
              pageSize: {
                width: 295,
                height: 715
              },
              pageMargins: 0,
              content: [{
                layout: 'noBorders',
                table: {
                  widths: [295],
                  heights: ['*', '*', 150, 230, 230],
                  body: [[{
                    text: 'AEM+ Paper wallet',
                    style: 'header',
                    fillColor: '#0F4B73'
                  }], //  ---------- image & name
                  [{
                    stack: [{
                      image: "".concat(this.walletImgData),
                      width: 20
                    }, {
                      text: this.selectedWallet.walletName,
                      style: 'name'
                    }],
                    fillColor: '#0F4B73'
                  }], [// ------------  balance on Date row
                  {
                    stack: [{
                      text: 'Balance on DATE / Note',
                      style: ['title']
                    }, {
                      text: "".concat(new Date().toLocaleDateString()),
                      style: {
                        margin: [0, 50, 0, 5]
                      }
                    }, {
                      text: [{
                        text: "".concat(this.selectedWallet.walletBalance[0]),
                        style: {
                          fontSize: 14,
                          italics: true
                        }
                      }, {
                        text: ' AUD',
                        style: {
                          fontSize: 9,
                          italics: true
                        }
                      }],
                      style: {
                        margin: [0, 30, 0, 5]
                      }
                    }, {
                      text: [{
                        text: "".concat(this.selectedWallet.walletBalance[1]),
                        style: {
                          fontSize: 14,
                          italics: true
                        }
                      }, {
                        text: " ".concat(this.selectedWallet.walletType),
                        style: {
                          fontSize: 9,
                          italics: true
                        }
                      }]
                    }, {
                      text: "".concat(this.walletPaperNote),
                      style: {
                        italics: true
                      }
                    }],
                    fillColor: '#F7F7F7'
                  }], [// ------------ Private key row
                  {
                    stack: [{
                      text: 'Your Private Key',
                      style: 'title'
                    }, {
                      text: "".concat(this.selectedWallet.privateKey),
                      style: 'info'
                    }, {
                      qr: this.selectedWallet.privateKey,
                      fit: '130',
                      style: 'qrcode'
                    }]
                  }], [// ------------ address row
                  {
                    stack: [{
                      text: 'Your address',
                      margin: [0, 20, 0, 5],
                      style: 'title'
                    }, {
                      text: "".concat(this.selectedWallet.walletAddress),
                      style: 'info',
                      margin: [0, 5, 0, 5]
                    }, {
                      qr: this.selectedWallet.privateKey,
                      fit: '130',
                      style: 'qrcode'
                    }],
                    fillColor: '#F7F7F7'
                  }]]
                }
              }],
              defaultStyle: {
                alignment: 'center'
              },
              styles: {
                header: {
                  fontSize: 20,
                  bold: true,
                  alignment: 'center',
                  color: '#F9FAFC',
                  margin: [0, 10, 0, 10]
                },
                name: {
                  fontSize: 14,
                  lineHeight: 2,
                  margin: [0, 10, 0, 0],
                  color: '#F9FAFC'
                },
                info: {
                  fontSize: 12,
                  margin: [0, 5, 0, 5]
                },
                title: {
                  fontSize: 16,
                  bold: true,
                  margin: [0, 30, 0, 0]
                }
              }
            };
            this.walletPaperPdf = pdfmake_build_pdfmake__WEBPACK_IMPORTED_MODULE_10__["createPdf"](walletPaperDoc);
          } // ------ On mobile device: open pdf then share:

        }, {
          key: "openWalletPaper",
          value: function openWalletPaper(data) {
            var _this4 = this;

            var fileName = 'walletpaper.pdf'; // any requirement for file name???

            try {
              Filesystem.writeFile({
                path: fileName,
                data: data,
                directory: _capacitor_core__WEBPACK_IMPORTED_MODULE_4__["FilesystemDirectory"].Documents
              }).then(function () {
                console.log('File Written successfully!');
                Filesystem.getUri({
                  directory: _capacitor_core__WEBPACK_IMPORTED_MODULE_4__["FilesystemDirectory"].Documents,
                  path: fileName
                }).then(function (getUriResult) {
                  console.log('geting pdf uri');
                  var path = getUriResult.uri;
                  console.log('open, get path uri', path); // if (Capacitor.getPlatform() === 'ios') {

                  _this4.fileOpener.open(path, 'application/pdf').then(function () {
                    return console.log('File is opened');
                  })["catch"](function (error) {
                    return console.log('Error openening file', error);
                  }); // }

                }, function (error) {
                  console.log(error);
                });
              });
            } catch (error) {
              console.error('Unable to write file', error);
            }
          }
        }, {
          key: "downloadWalletPdf",
          value: function downloadWalletPdf() {
            var _this5 = this;

            this.createWalletPaper();
            console.log(this.walletPaperPdf);

            if (this.walletPaperPdf) {
              if (this.plt.is('cordova')) {
                this.walletPaperPdf.getBase64(function (data) {
                  return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this5, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            this.openWalletPaper(data);

                          case 1:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee, this);
                  }));
                });
              } else {
                // web download:
                this.walletPaperPdf.download();
              }
            }
          }
        }, {
          key: "ngOnDestroy",
          value: function ngOnDestroy() {
            this.clipboard.clear();
          }
        }]);

        return EditWalletPage;
      }();

      EditWalletPage.ctorParameters = function () {
        return [{
          type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]
        }, {
          type: src_app_services_wallets_wallets_service__WEBPACK_IMPORTED_MODULE_9__["WalletsService"]
        }, {
          type: _ionic_native_clipboard_ngx__WEBPACK_IMPORTED_MODULE_7__["Clipboard"]
        }, {
          type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["ToastController"]
        }, {
          type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["AlertController"]
        }, {
          type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["LoadingController"]
        }, {
          type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]
        }, {
          type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["Platform"]
        }, {
          type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]
        }, {
          type: _ionic_native_file_opener_ngx__WEBPACK_IMPORTED_MODULE_8__["FileOpener"]
        }];
      };

      EditWalletPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-edit-wallet',
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
        /*! raw-loader!./edit-wallet.page.html */
        "./node_modules/raw-loader/dist/cjs.js!./src/app/wallets/edit-wallet/edit-wallet.page.html"))["default"],
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
        /*! ./edit-wallet.page.scss */
        "./src/app/wallets/edit-wallet/edit-wallet.page.scss"))["default"]]
      })], EditWalletPage);
      /***/
    }
  }]);
})();
//# sourceMappingURL=edit-wallet-edit-wallet-module-es5.js.map