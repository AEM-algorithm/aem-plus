(function () {
  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["notifications-notifications-module"], {
    /***/
    "./node_modules/raw-loader/dist/cjs.js!./src/app/notifications/notifications.page.html":
    /*!*********************************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/notifications/notifications.page.html ***!
      \*********************************************************************************************/

    /*! exports provided: default */

    /***/
    function node_modulesRawLoaderDistCjsJsSrcAppNotificationsNotificationsPageHtml(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-back-button color=\"light\" defaultHref=\"/tabnav/wallets\" text=\"\"></ion-back-button>\n    </ion-buttons>\n    <ion-title>Notifications</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <div class=\"ion-padding-top\" *ngIf=\"notifications && notifications.length >=1; else noNotification\">\n    <div *ngFor=\"let notification of notifications\" class=\"notification-div\">\n      <ion-card>\n        <!-- <ion-grid> -->\n        <!-- <ion-row> -->\n        <div class=\"blue-div\">\n          <!--  this is a 12px blue width div  -->\n        </div>\n\n        <div class=\"notification-info\">\n          <!-- <ion-col class=\"notification-info\"> -->\n          <!-- <ion-item lines=\"none\">\n            <ion-icon slot=\"start\" [name]=\"notification.type === 'system' ? 'mail-outline' : 'document-text-outline'\">\n            </ion-icon>\n            <ion-label>\n              <h3>{{notification.title}}</h3>\n              <p class=\"ion-text-wrap\">{{notification.message}}</p>\n              <ion-note>{{getDate( notification.date)}}</ion-note>\n            </ion-label>\n          </ion-item> -->\n\n          <ion-item lines=\"none\">\n            <!-- <ion-thumbnail slot=\"start\"> -->\n            <ion-img src=\"assets/img/transaction-notification.svg\" slot=\"start\"></ion-img>\n            <!-- </ion-thumbnail> -->\n            <ion-label>\n              <h2>{{notification.title}}</h2>\n            </ion-label>\n            <ion-note slot=\"end\">{{getDate( notification.date)}}</ion-note>\n          </ion-item>\n          <ion-item lines=\"none\">\n            <ion-label class=\"message\">\n              <p class=\"ion-text-wrap\">{{notification.message}}</p>\n            </ion-label>\n          </ion-item>\n          <!-- </ion-col> -->\n        </div>\n        <!-- </ion-row> -->\n        <!-- </ion-grid> -->\n      </ion-card>\n    </div>\n  </div>\n\n  <ng-template #noNotification>\n    <div class=\"no-notification-div\">\n      <p class=\"ion-text-center\">No Notifications Yet!</p>\n    </div>\n  </ng-template>\n</ion-content>\n";
      /***/
    },

    /***/
    "./src/app/notifications/notifications-routing.module.ts":
    /*!***************************************************************!*\
      !*** ./src/app/notifications/notifications-routing.module.ts ***!
      \***************************************************************/

    /*! exports provided: NotificationsPageRoutingModule */

    /***/
    function srcAppNotificationsNotificationsRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "NotificationsPageRoutingModule", function () {
        return NotificationsPageRoutingModule;
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


      var _notifications_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./notifications.page */
      "./src/app/notifications/notifications.page.ts");

      var routes = [{
        path: '',
        component: _notifications_page__WEBPACK_IMPORTED_MODULE_3__["NotificationsPage"]
      }];

      var NotificationsPageRoutingModule = function NotificationsPageRoutingModule() {
        _classCallCheck(this, NotificationsPageRoutingModule);
      };

      NotificationsPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
      })], NotificationsPageRoutingModule);
      /***/
    },

    /***/
    "./src/app/notifications/notifications.module.ts":
    /*!*******************************************************!*\
      !*** ./src/app/notifications/notifications.module.ts ***!
      \*******************************************************/

    /*! exports provided: NotificationsPageModule */

    /***/
    function srcAppNotificationsNotificationsModuleTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "NotificationsPageModule", function () {
        return NotificationsPageModule;
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


      var _notifications_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./notifications-routing.module */
      "./src/app/notifications/notifications-routing.module.ts");
      /* harmony import */


      var _notifications_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./notifications.page */
      "./src/app/notifications/notifications.page.ts");

      var NotificationsPageModule = function NotificationsPageModule() {
        _classCallCheck(this, NotificationsPageModule);
      };

      NotificationsPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _notifications_routing_module__WEBPACK_IMPORTED_MODULE_5__["NotificationsPageRoutingModule"]],
        declarations: [_notifications_page__WEBPACK_IMPORTED_MODULE_6__["NotificationsPage"]]
      })], NotificationsPageModule);
      /***/
    },

    /***/
    "./src/app/notifications/notifications.page.scss":
    /*!*******************************************************!*\
      !*** ./src/app/notifications/notifications.page.scss ***!
      \*******************************************************/

    /*! exports provided: default */

    /***/
    function srcAppNotificationsNotificationsPageScss(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = ".notification-div .blue-div {\n  width: 12px;\n  background: #074673;\n}\n.notification-div .message {\n  margin-top: 0;\n}\n.notification-div ion-card {\n  display: flex;\n  flex-direction: row;\n  box-shadow: 0px 3px 6px #00000029;\n  margin: 10px 20px;\n}\n.notification-div ion-img .img {\n  width: 21;\n  height: 15;\n}\n.notification-div ion-note {\n  color: #707070;\n  font-size: 12px;\n}\n.no-notification-div p {\n  font-size: 20px;\n  color: #074673;\n  font-weight: bold;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbm90aWZpY2F0aW9ucy9ub3RpZmljYXRpb25zLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFLRTtFQUNFLFdBQUE7RUFDQSxtQkFBQTtBQUpKO0FBT0U7RUFDRSxhQUFBO0FBTEo7QUFRRTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLGlDQUFBO0VBQ0EsaUJBQUE7QUFOSjtBQVVJO0VBQ0UsU0FBQTtFQUNBLFVBQUE7QUFSTjtBQVlFO0VBQ0UsY0FBQTtFQUNBLGVBQUE7QUFWSjtBQWVFO0VBQ0UsZUFBQTtFQUNBLGNBQUE7RUFDQSxpQkFBQTtBQVpKIiwiZmlsZSI6InNyYy9hcHAvbm90aWZpY2F0aW9ucy9ub3RpZmljYXRpb25zLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5ub3RpZmljYXRpb24tZGl2IHtcbiAgLy8gaW9uLWdyaWQge1xuICAvLyAgIHBhZGRpbmc6IDA7XG4gIC8vIH1cblxuICAuYmx1ZS1kaXYge1xuICAgIHdpZHRoOiAxMnB4O1xuICAgIGJhY2tncm91bmQ6ICMwNzQ2NzM7XG4gIH1cblxuICAubWVzc2FnZSB7XG4gICAgbWFyZ2luLXRvcDogMDtcbiAgfVxuXG4gIGlvbi1jYXJkIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgYm94LXNoYWRvdzogMHB4IDNweCA2cHggIzAwMDAwMDI5O1xuICAgIG1hcmdpbjogMTBweCAyMHB4O1xuICB9XG5cbiAgaW9uLWltZyB7XG4gICAgLmltZyB7XG4gICAgICB3aWR0aDogMjE7XG4gICAgICBoZWlnaHQ6IDE1O1xuICAgIH1cbiAgfVxuXG4gIGlvbi1ub3RlIHtcbiAgICBjb2xvcjogIzcwNzA3MDtcbiAgICBmb250LXNpemU6IDEycHg7XG4gIH1cbn1cblxuLm5vLW5vdGlmaWNhdGlvbi1kaXYge1xuICBwIHtcbiAgICBmb250LXNpemU6IDIwcHg7XG4gICAgY29sb3I6ICMwNzQ2NzM7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIH1cbn1cbiJdfQ== */";
      /***/
    },

    /***/
    "./src/app/notifications/notifications.page.ts":
    /*!*****************************************************!*\
      !*** ./src/app/notifications/notifications.page.ts ***!
      \*****************************************************/

    /*! exports provided: NotificationsPage */

    /***/
    function srcAppNotificationsNotificationsPageTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "NotificationsPage", function () {
        return NotificationsPage;
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


      var _services_wallets_wallets_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../services/wallets/wallets.service */
      "./src/app/services/wallets/wallets.service.ts");
      /* harmony import */


      var _services_notifications_notifications_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../services/notifications/notifications.service */
      "./src/app/services/notifications/notifications.service.ts");

      var NotificationsPage = /*#__PURE__*/function () {
        function NotificationsPage(route, notificationService, waletsService) {
          _classCallCheck(this, NotificationsPage);

          this.route = route;
          this.notificationService = notificationService;
          this.waletsService = waletsService;
        }

        _createClass(NotificationsPage, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this = this;

            // determine all nitification page || a wallet's notifiction page
            this.route.paramMap.subscribe(function (paramMap) {
              if (paramMap.has('walletId')) {
                var id = paramMap.get('walletId');

                var selectedWallet = _this.waletsService.getWallet(id);

                _this.notifications = _this.notificationService.getWalletNotifications(selectedWallet.walletAddress);
                console.log('wallet notification: ', _this.notifications);
                return;
              }

              _this.notifications = _this.notificationService.getAllNotifictions();
              console.log('all notifications:', _this.notifications);
            });
          }
        }, {
          key: "getDate",
          value: function getDate(time) {
            return new Date(time).toDateString();
          }
        }]);

        return NotificationsPage;
      }();

      NotificationsPage.ctorParameters = function () {
        return [{
          type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]
        }, {
          type: _services_notifications_notifications_service__WEBPACK_IMPORTED_MODULE_4__["NotificationsService"]
        }, {
          type: _services_wallets_wallets_service__WEBPACK_IMPORTED_MODULE_3__["WalletsService"]
        }];
      };

      NotificationsPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-notifications',
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
        /*! raw-loader!./notifications.page.html */
        "./node_modules/raw-loader/dist/cjs.js!./src/app/notifications/notifications.page.html"))["default"],
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
        /*! ./notifications.page.scss */
        "./src/app/notifications/notifications.page.scss"))["default"]]
      })], NotificationsPage);
      /***/
    }
  }]);
})();
//# sourceMappingURL=notifications-notifications-module-es5.js.map