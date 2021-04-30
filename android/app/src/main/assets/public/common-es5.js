(function () {
  function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

  function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

  function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"], {
    /***/
    "./node_modules/@ionic/core/dist/esm/button-active-0d5784f9.js":
    /*!*********************************************************************!*\
      !*** ./node_modules/@ionic/core/dist/esm/button-active-0d5784f9.js ***!
      \*********************************************************************/

    /*! exports provided: c */

    /***/
    function node_modulesIonicCoreDistEsmButtonActive0d5784f9Js(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "c", function () {
        return createButtonActiveGesture;
      });
      /* harmony import */


      var _index_44bf8136_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./index-44bf8136.js */
      "./node_modules/@ionic/core/dist/esm/index-44bf8136.js");
      /* harmony import */


      var _index_eea61379_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./index-eea61379.js */
      "./node_modules/@ionic/core/dist/esm/index-eea61379.js");
      /* harmony import */


      var _haptic_7b8ba70a_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./haptic-7b8ba70a.js */
      "./node_modules/@ionic/core/dist/esm/haptic-7b8ba70a.js");

      var createButtonActiveGesture = function createButtonActiveGesture(el, isButton) {
        var currentTouchedButton;
        var initialTouchedButton;

        var activateButtonAtPoint = function activateButtonAtPoint(x, y, hapticFeedbackFn) {
          if (typeof document === 'undefined') {
            return;
          }

          var target = document.elementFromPoint(x, y);

          if (!target || !isButton(target)) {
            clearActiveButton();
            return;
          }

          if (target !== currentTouchedButton) {
            clearActiveButton();
            setActiveButton(target, hapticFeedbackFn);
          }
        };

        var setActiveButton = function setActiveButton(button, hapticFeedbackFn) {
          currentTouchedButton = button;

          if (!initialTouchedButton) {
            initialTouchedButton = currentTouchedButton;
          }

          var buttonToModify = currentTouchedButton;
          Object(_index_44bf8136_js__WEBPACK_IMPORTED_MODULE_0__["c"])(function () {
            return buttonToModify.classList.add('ion-activated');
          });
          hapticFeedbackFn();
        };

        var clearActiveButton = function clearActiveButton() {
          var dispatchClick = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

          if (!currentTouchedButton) {
            return;
          }

          var buttonToModify = currentTouchedButton;
          Object(_index_44bf8136_js__WEBPACK_IMPORTED_MODULE_0__["c"])(function () {
            return buttonToModify.classList.remove('ion-activated');
          });
          /**
           * Clicking on one button, but releasing on another button
           * does not dispatch a click event in browsers, so we
           * need to do it manually here. Some browsers will
           * dispatch a click if clicking on one button, dragging over
           * another button, and releasing on the original button. In that
           * case, we need to make sure we do not cause a double click there.
           */

          if (dispatchClick && initialTouchedButton !== currentTouchedButton) {
            currentTouchedButton.click();
          }

          currentTouchedButton = undefined;
        };

        return Object(_index_eea61379_js__WEBPACK_IMPORTED_MODULE_1__["createGesture"])({
          el: el,
          gestureName: 'buttonActiveDrag',
          threshold: 0,
          onStart: function onStart(ev) {
            return activateButtonAtPoint(ev.currentX, ev.currentY, _haptic_7b8ba70a_js__WEBPACK_IMPORTED_MODULE_2__["a"]);
          },
          onMove: function onMove(ev) {
            return activateButtonAtPoint(ev.currentX, ev.currentY, _haptic_7b8ba70a_js__WEBPACK_IMPORTED_MODULE_2__["b"]);
          },
          onEnd: function onEnd() {
            clearActiveButton(true);
            Object(_haptic_7b8ba70a_js__WEBPACK_IMPORTED_MODULE_2__["h"])();
            initialTouchedButton = undefined;
          }
        });
      };
      /***/

    },

    /***/
    "./node_modules/@ionic/core/dist/esm/framework-delegate-d1eb6504.js":
    /*!**************************************************************************!*\
      !*** ./node_modules/@ionic/core/dist/esm/framework-delegate-d1eb6504.js ***!
      \**************************************************************************/

    /*! exports provided: a, d */

    /***/
    function node_modulesIonicCoreDistEsmFrameworkDelegateD1eb6504Js(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "a", function () {
        return attachComponent;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "d", function () {
        return detachComponent;
      });

      var attachComponent = /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(delegate, container, component, cssClasses, componentProps) {
          var el;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!delegate) {
                    _context.next = 2;
                    break;
                  }

                  return _context.abrupt("return", delegate.attachViewToDom(container, component, componentProps, cssClasses));

                case 2:
                  if (!(typeof component !== 'string' && !(component instanceof HTMLElement))) {
                    _context.next = 4;
                    break;
                  }

                  throw new Error('framework delegate is missing');

                case 4:
                  el = typeof component === 'string' ? container.ownerDocument && container.ownerDocument.createElement(component) : component;

                  if (cssClasses) {
                    cssClasses.forEach(function (c) {
                      return el.classList.add(c);
                    });
                  }

                  if (componentProps) {
                    Object.assign(el, componentProps);
                  }

                  container.appendChild(el);

                  if (!el.componentOnReady) {
                    _context.next = 11;
                    break;
                  }

                  _context.next = 11;
                  return el.componentOnReady();

                case 11:
                  return _context.abrupt("return", el);

                case 12:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function attachComponent(_x, _x2, _x3, _x4, _x5) {
          return _ref.apply(this, arguments);
        };
      }();

      var detachComponent = function detachComponent(delegate, element) {
        if (element) {
          if (delegate) {
            var container = element.parentElement;
            return delegate.removeViewFromDom(container, element);
          }

          element.remove();
        }

        return Promise.resolve();
      };
      /***/

    },

    /***/
    "./node_modules/@ionic/core/dist/esm/haptic-7b8ba70a.js":
    /*!**************************************************************!*\
      !*** ./node_modules/@ionic/core/dist/esm/haptic-7b8ba70a.js ***!
      \**************************************************************/

    /*! exports provided: a, b, c, d, h */

    /***/
    function node_modulesIonicCoreDistEsmHaptic7b8ba70aJs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "a", function () {
        return hapticSelectionStart;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "b", function () {
        return hapticSelectionChanged;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "c", function () {
        return hapticSelection;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "d", function () {
        return hapticImpact;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "h", function () {
        return hapticSelectionEnd;
      });

      var HapticEngine = {
        getEngine: function getEngine() {
          var win = window;
          return win.TapticEngine || win.Capacitor && win.Capacitor.isPluginAvailable('Haptics') && win.Capacitor.Plugins.Haptics;
        },
        available: function available() {
          return !!this.getEngine();
        },
        isCordova: function isCordova() {
          return !!window.TapticEngine;
        },
        isCapacitor: function isCapacitor() {
          var win = window;
          return !!win.Capacitor;
        },
        impact: function impact(options) {
          var engine = this.getEngine();

          if (!engine) {
            return;
          }

          var style = this.isCapacitor() ? options.style.toUpperCase() : options.style;
          engine.impact({
            style: style
          });
        },
        notification: function notification(options) {
          var engine = this.getEngine();

          if (!engine) {
            return;
          }

          var style = this.isCapacitor() ? options.style.toUpperCase() : options.style;
          engine.notification({
            style: style
          });
        },
        selection: function selection() {
          this.impact({
            style: 'light'
          });
        },
        selectionStart: function selectionStart() {
          var engine = this.getEngine();

          if (!engine) {
            return;
          }

          if (this.isCapacitor()) {
            engine.selectionStart();
          } else {
            engine.gestureSelectionStart();
          }
        },
        selectionChanged: function selectionChanged() {
          var engine = this.getEngine();

          if (!engine) {
            return;
          }

          if (this.isCapacitor()) {
            engine.selectionChanged();
          } else {
            engine.gestureSelectionChanged();
          }
        },
        selectionEnd: function selectionEnd() {
          var engine = this.getEngine();

          if (!engine) {
            return;
          }

          if (this.isCapacitor()) {
            engine.selectionEnd();
          } else {
            engine.gestureSelectionEnd();
          }
        }
      };
      /**
       * Trigger a selection changed haptic event. Good for one-time events
       * (not for gestures)
       */

      var hapticSelection = function hapticSelection() {
        HapticEngine.selection();
      };
      /**
       * Tell the haptic engine that a gesture for a selection change is starting.
       */


      var hapticSelectionStart = function hapticSelectionStart() {
        HapticEngine.selectionStart();
      };
      /**
       * Tell the haptic engine that a selection changed during a gesture.
       */


      var hapticSelectionChanged = function hapticSelectionChanged() {
        HapticEngine.selectionChanged();
      };
      /**
       * Tell the haptic engine we are done with a gesture. This needs to be
       * called lest resources are not properly recycled.
       */


      var hapticSelectionEnd = function hapticSelectionEnd() {
        HapticEngine.selectionEnd();
      };
      /**
       * Use this to indicate success/failure/warning to the user.
       * options should be of the type `{ style: 'light' }` (or `medium`/`heavy`)
       */


      var hapticImpact = function hapticImpact(options) {
        HapticEngine.impact(options);
      };
      /***/

    },

    /***/
    "./node_modules/@ionic/core/dist/esm/spinner-configs-c78e170e.js":
    /*!***********************************************************************!*\
      !*** ./node_modules/@ionic/core/dist/esm/spinner-configs-c78e170e.js ***!
      \***********************************************************************/

    /*! exports provided: S */

    /***/
    function node_modulesIonicCoreDistEsmSpinnerConfigsC78e170eJs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "S", function () {
        return SPINNERS;
      });

      var spinners = {
        'bubbles': {
          dur: 1000,
          circles: 9,
          fn: function fn(dur, index, total) {
            var animationDelay = "".concat(dur * index / total - dur, "ms");
            var angle = 2 * Math.PI * index / total;
            return {
              r: 5,
              style: {
                'top': "".concat(9 * Math.sin(angle), "px"),
                'left': "".concat(9 * Math.cos(angle), "px"),
                'animation-delay': animationDelay
              }
            };
          }
        },
        'circles': {
          dur: 1000,
          circles: 8,
          fn: function fn(dur, index, total) {
            var step = index / total;
            var animationDelay = "".concat(dur * step - dur, "ms");
            var angle = 2 * Math.PI * step;
            return {
              r: 5,
              style: {
                'top': "".concat(9 * Math.sin(angle), "px"),
                'left': "".concat(9 * Math.cos(angle), "px"),
                'animation-delay': animationDelay
              }
            };
          }
        },
        'circular': {
          dur: 1400,
          elmDuration: true,
          circles: 1,
          fn: function fn() {
            return {
              r: 20,
              cx: 48,
              cy: 48,
              fill: 'none',
              viewBox: '24 24 48 48',
              transform: 'translate(0,0)',
              style: {}
            };
          }
        },
        'crescent': {
          dur: 750,
          circles: 1,
          fn: function fn() {
            return {
              r: 26,
              style: {}
            };
          }
        },
        'dots': {
          dur: 750,
          circles: 3,
          fn: function fn(_, index) {
            var animationDelay = -(110 * index) + 'ms';
            return {
              r: 6,
              style: {
                'left': "".concat(9 - 9 * index, "px"),
                'animation-delay': animationDelay
              }
            };
          }
        },
        'lines': {
          dur: 1000,
          lines: 12,
          fn: function fn(dur, index, total) {
            var transform = "rotate(".concat(30 * index + (index < 6 ? 180 : -180), "deg)");
            var animationDelay = "".concat(dur * index / total - dur, "ms");
            return {
              y1: 17,
              y2: 29,
              style: {
                'transform': transform,
                'animation-delay': animationDelay
              }
            };
          }
        },
        'lines-small': {
          dur: 1000,
          lines: 12,
          fn: function fn(dur, index, total) {
            var transform = "rotate(".concat(30 * index + (index < 6 ? 180 : -180), "deg)");
            var animationDelay = "".concat(dur * index / total - dur, "ms");
            return {
              y1: 12,
              y2: 20,
              style: {
                'transform': transform,
                'animation-delay': animationDelay
              }
            };
          }
        }
      };
      var SPINNERS = spinners;
      /***/
    },

    /***/
    "./node_modules/@ionic/core/dist/esm/theme-3f0b0c04.js":
    /*!*************************************************************!*\
      !*** ./node_modules/@ionic/core/dist/esm/theme-3f0b0c04.js ***!
      \*************************************************************/

    /*! exports provided: c, g, h, o */

    /***/
    function node_modulesIonicCoreDistEsmTheme3f0b0c04Js(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "c", function () {
        return createColorClasses;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "g", function () {
        return getClassMap;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "h", function () {
        return hostContext;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "o", function () {
        return openURL;
      });

      var hostContext = function hostContext(selector, el) {
        return el.closest(selector) !== null;
      };
      /**
       * Create the mode and color classes for the component based on the classes passed in
       */


      var createColorClasses = function createColorClasses(color) {
        return typeof color === 'string' && color.length > 0 ? _defineProperty({
          'ion-color': true
        }, "ion-color-".concat(color), true) : undefined;
      };

      var getClassList = function getClassList(classes) {
        if (classes !== undefined) {
          var array = Array.isArray(classes) ? classes : classes.split(' ');
          return array.filter(function (c) {
            return c != null;
          }).map(function (c) {
            return c.trim();
          }).filter(function (c) {
            return c !== '';
          });
        }

        return [];
      };

      var getClassMap = function getClassMap(classes) {
        var map = {};
        getClassList(classes).forEach(function (c) {
          return map[c] = true;
        });
        return map;
      };

      var SCHEME = /^[a-z][a-z0-9+\-.]*:/;

      var openURL = /*#__PURE__*/function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(url, ev, direction, animation) {
          var router;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (!(url != null && url[0] !== '#' && !SCHEME.test(url))) {
                    _context2.next = 5;
                    break;
                  }

                  router = document.querySelector('ion-router');

                  if (!router) {
                    _context2.next = 5;
                    break;
                  }

                  if (ev != null) {
                    ev.preventDefault();
                  }

                  return _context2.abrupt("return", router.push(url, direction, animation));

                case 5:
                  return _context2.abrupt("return", false);

                case 6:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function openURL(_x6, _x7, _x8, _x9) {
          return _ref3.apply(this, arguments);
        };
      }();
      /***/

    },

    /***/
    "./node_modules/raw-loader/dist/cjs.js!./src/app/address-book/add-address-modal/add-address-modal.component.html":
    /*!***********************************************************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/address-book/add-address-modal/add-address-modal.component.html ***!
      \***********************************************************************************************************************/

    /*! exports provided: default */

    /***/
    function node_modulesRawLoaderDistCjsJsSrcAppAddressBookAddAddressModalAddAddressModalComponentHtml(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<ion-content>\n  <ion-item lines=\"none\" class=\"header\">\n    <ion-label class=\"title\"> Add a new wallet </ion-label>\n    <ion-button fill=\"clear\" (click)=\"close()\">\n      <ion-icon name=\"close\" slot=\"icon-only\"> </ion-icon>\n    </ion-button>\n  </ion-item>\n\n  <form [formGroup]=\"addAddressForm\" (ngSubmit)=\"onAddAddress()\">\n    <h5 class=\"label\">Wallet Type</h5>\n    <ion-item lines=\"none\">\n      <ion-select formControlName=\"type\" slot=\"end\" interface=\"popover\">\n        <ion-select-option value=\"BTC\">BTC</ion-select-option>\n        <ion-select-option value=\"NEM\">XEM</ion-select-option>\n        <ion-select-option value=\"ETH\">ETH</ion-select-option>\n      </ion-select>\n    </ion-item>\n\n    <h5 class=\"label\">Wallet Address</h5>\n    <ion-item lines=\"none\"> <ion-input formControlName=\"address\"></ion-input> </ion-item>\n\n    <h5 class=\"label\">Description</h5>\n    <ion-item lines=\"none\"> <ion-input formControlName=\"description\"></ion-input> </ion-item>\n\n    <ion-button type=\"submit\" expand=\"block\" class=\"ion-margin-top btn-gradient-bg\" [disabled]=\"addAddressForm.invalid\"\n      >Add</ion-button\n    >\n  </form>\n</ion-content>\n";
      /***/
    },

    /***/
    "./src/app/address-book/add-address-modal/add-address-modal.component.scss":
    /*!*********************************************************************************!*\
      !*** ./src/app/address-book/add-address-modal/add-address-modal.component.scss ***!
      \*********************************************************************************/

    /*! exports provided: default */

    /***/
    function srcAppAddressBookAddAddressModalAddAddressModalComponentScss(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = ".header {\n  padding-top: 10px;\n}\n.header .title {\n  font-size: 20px;\n  margin: 0;\n  font-weight: bold;\n}\nform {\n  padding: 20px;\n}\nform ion-item {\n  box-shadow: 0px 3px 6px #00000029;\n  border-radius: 8px;\n  margin-bottom: 5px;\n}\nform .label {\n  font-size: 14px;\n  color: #074673;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRkcmVzcy1ib29rL2FkZC1hZGRyZXNzLW1vZGFsL2FkZC1hZGRyZXNzLW1vZGFsLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsaUJBQUE7QUFDRjtBQUFFO0VBQ0UsZUFBQTtFQUNBLFNBQUE7RUFDQSxpQkFBQTtBQUVKO0FBRUE7RUFDRSxhQUFBO0FBQ0Y7QUFDRTtFQUNFLGlDQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQkFBQTtBQUNKO0FBRUU7RUFDRSxlQUFBO0VBQ0EsY0FBQTtBQUFKIiwiZmlsZSI6InNyYy9hcHAvYWRkcmVzcy1ib29rL2FkZC1hZGRyZXNzLW1vZGFsL2FkZC1hZGRyZXNzLW1vZGFsLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmhlYWRlciB7XG4gIHBhZGRpbmctdG9wOiAxMHB4O1xuICAudGl0bGUge1xuICAgIGZvbnQtc2l6ZTogMjBweDtcbiAgICBtYXJnaW46IDA7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIH1cbn1cblxuZm9ybSB7XG4gIHBhZGRpbmc6IDIwcHg7XG5cbiAgaW9uLWl0ZW0ge1xuICAgIGJveC1zaGFkb3c6IDBweCAzcHggNnB4ICMwMDAwMDAyOTtcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgbWFyZ2luLWJvdHRvbTogNXB4O1xuICB9XG5cbiAgLmxhYmVsIHtcbiAgICBmb250LXNpemU6IDE0cHg7XG4gICAgY29sb3I6ICMwNzQ2NzM7XG4gIH1cbn1cbiJdfQ== */";
      /***/
    },

    /***/
    "./src/app/address-book/add-address-modal/add-address-modal.component.ts":
    /*!*******************************************************************************!*\
      !*** ./src/app/address-book/add-address-modal/add-address-modal.component.ts ***!
      \*******************************************************************************/

    /*! exports provided: AddAddressModalComponent */

    /***/
    function srcAppAddressBookAddAddressModalAddAddressModalComponentTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AddAddressModalComponent", function () {
        return AddAddressModalComponent;
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


      var src_app_services_address_book_address_book_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! src/app/services/address-book/address-book.service */
      "./src/app/services/address-book/address-book.service.ts");

      var AddAddressModalComponent = /*#__PURE__*/function () {
        function AddAddressModalComponent(modalCtrl, addressBookService) {
          _classCallCheck(this, AddAddressModalComponent);

          this.modalCtrl = modalCtrl;
          this.addressBookService = addressBookService;
        }

        _createClass(AddAddressModalComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            console.log(' add address modal:', this.isNewContact);
            this.addAddressForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
              type: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null, {
                validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]
              }),
              address: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null, {
                validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]
              }),
              description: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null)
            });
          }
        }, {
          key: "close",
          value: function close() {
            this.modalCtrl.dismiss();
          }
        }, {
          key: "onAddAddress",
          value: function onAddAddress() {
            if (this.isNewContact) {
              var address = this.addAddressForm.value;
              this.modalCtrl.dismiss(this.addAddressForm.value, 'confirm');
            } else {
              this.addressBookService.addAnAddress(this.contact.id, this.addAddressForm.value);
              this.close();
            }
          }
        }]);

        return AddAddressModalComponent;
      }();

      AddAddressModalComponent.ctorParameters = function () {
        return [{
          type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"]
        }, {
          type: src_app_services_address_book_address_book_service__WEBPACK_IMPORTED_MODULE_4__["AddressBookService"]
        }];
      };

      AddAddressModalComponent.propDecorators = {
        contact: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }],
        isNewContact: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }]
      };
      AddAddressModalComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-add-address-modal',
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
        /*! raw-loader!./add-address-modal.component.html */
        "./node_modules/raw-loader/dist/cjs.js!./src/app/address-book/add-address-modal/add-address-modal.component.html"))["default"],
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
        /*! ./add-address-modal.component.scss */
        "./src/app/address-book/add-address-modal/add-address-modal.component.scss"))["default"]]
      })], AddAddressModalComponent);
      /***/
    },

    /***/
    "./src/app/services/address-book/address-book.service.ts":
    /*!***************************************************************!*\
      !*** ./src/app/services/address-book/address-book.service.ts ***!
      \***************************************************************/

    /*! exports provided: AddressBookService */

    /***/
    function srcAppServicesAddressBookAddressBookServiceTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AddressBookService", function () {
        return AddressBookService;
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


      var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! rxjs */
      "./node_modules/rxjs/_esm2015/index.js");
      /* harmony import */


      var _dummyData_address_list_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../dummyData/address-list.data */
      "./src/app/services/dummyData/address-list.data.ts");
      /* harmony import */


      var _models_address_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../models/address.modal */
      "./src/app/services/models/address.modal.ts");

      var AddressBookService = /*#__PURE__*/function () {
        function AddressBookService() {
          _classCallCheck(this, AddressBookService);

          this.addressesList = _dummyData_address_list_data__WEBPACK_IMPORTED_MODULE_3__["addressesList"];
          this.addressesChanged = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
          this.contactChanged = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        }

        _createClass(AddressBookService, [{
          key: "setAddressesList",
          value: function setAddressesList(newAddressesList) {
            this.addressesList = newAddressesList;
            this.addressesChanged.next(newAddressesList.slice());
          }
        }, {
          key: "getAddressesList",
          value: function getAddressesList() {
            return _toConsumableArray(this.addressesList);
          } // Get the contact by id:

        }, {
          key: "getAddress",
          value: function getAddress(id) {
            return this.addressesList.find(function (address) {
              return address.id === id;
            });
          }
        }, {
          key: "filteredAddresses",
          value: function filteredAddresses(inputVal) {
            return inputVal && inputVal.trim() !== '' ? _toConsumableArray(this.addressesList.filter(function (address) {
              return address.name.toLowerCase().indexOf(inputVal.toLowerCase()) > -1;
            })) : _toConsumableArray(this.addressesList);
          }
        }, {
          key: "updateAddress",
          value: function updateAddress(id, newAddressData) {
            var index = this.addressesList.findIndex(function (address) {
              return address.id === id;
            });
            this.addressesList[index] = newAddressData;
            this.addressesChanged.next(this.addressesList.slice());
          } // ------ add an address to a contact by id

        }, {
          key: "addAnAddress",
          value: function addAnAddress(id, address) {
            var contact = this.addressesList.find(function (contact) {
              return contact.id === id;
            });
            contact.walletsAddresses.push(address);
            var newContact = Object.assign({}, contact); // console.log('service add an address: ', newContact);

            this.contactChanged.next(newContact);
          } // add a new contact:

        }, {
          key: "addNewContact",
          value: function addNewContact(name, ABNNum, email, companyAddress, companyName, walletsAddresses) {
            //  manually add id here. ----> id: generate by backend?
            var newContact = new _models_address_modal__WEBPACK_IMPORTED_MODULE_4__["Address"](Math.random().toString(), name, ABNNum, email, companyAddress, companyName, walletsAddresses);
            this.addressesList.push(newContact);
            this.addressesChanged.next(this.addressesList.slice());
          } // --- get all the same type of crypto addresses from the contacts
          //      with the contact's info together: for generating transaction data

        }, {
          key: "getAllSameCryptoAddresses",
          value: function getAllSameCryptoAddresses(walletType) {
            var allSameTypeAddresses = [];
            this.addressesList.forEach(function (contact) {
              return contact.walletsAddresses.filter(function (addressObj) {
                if (addressObj.type === walletType) {
                  var aNewAddressObj = {
                    address: addressObj.address,
                    description: addressObj.description && addressObj.description,
                    holderName: contact.name,
                    type: addressObj.type,
                    businessName: contact.companyName,
                    ABNNum: contact.ABNNum
                  };
                  allSameTypeAddresses.push(aNewAddressObj);
                }
              });
            });
            return allSameTypeAddresses;
          }
        }, {
          key: "deleteAnAddressFromContact",
          value: function deleteAnAddressFromContact(id, selectedAddress) {
            var index = this.addressesList.findIndex(function (address) {
              return address.id === id;
            });
            var oldContact = this.getAddress(id);
            var updatedContactWallets = oldContact.walletsAddresses.filter(function (address) {
              return address.address !== selectedAddress;
            });
            var updatedContact = Object.assign(Object.assign({}, oldContact), {
              walletsAddresses: updatedContactWallets
            });
            this.contactChanged.next(updatedContact);
            this.addressesList[index] = updatedContact;
            this.addressesChanged.next(this.addressesList.slice());
          } // delete a contact by Id:

        }, {
          key: "deleteAContact",
          value: function deleteAContact(id) {
            this.addressesList = this.addressesList.filter(function (address) {
              return address.id !== id;
            });
            this.addressesChanged.next(this.addressesList.slice());
          }
        }]);

        return AddressBookService;
      }();

      AddressBookService.ctorParameters = function () {
        return [];
      };

      AddressBookService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
      })], AddressBookService);
      /***/
    },

    /***/
    "./src/app/services/dummyData/address-list.data.ts":
    /*!*********************************************************!*\
      !*** ./src/app/services/dummyData/address-list.data.ts ***!
      \*********************************************************/

    /*! exports provided: addressesList */

    /***/
    function srcAppServicesDummyDataAddressListDataTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "addressesList", function () {
        return addressesList;
      });

      var addressesList = [{
        id: 'a1',
        name: 'Chaofan Wu',
        ABNNum: 1009298353232323,
        email: 'chaofan@email.com',
        companyAddress: 'RMIT Melbourne, Victoria',
        companyName: 'AME Algoritem',
        walletsAddresses: [{
          type: 'BTC',
          address: 'chaofanbtcjahsrgfasdfsdfasdfgdsd',
          description: 'business'
        }, {
          type: 'NEM',
          address: 'chaofanaskdjfksladgjklasdfasdfsdf'
        }, {
          type: 'BTC',
          address: 'chaofanalksfjdasdgsdgrfasdfasdfa',
          description: 'personal'
        }]
      }, {
        id: 'a2',
        name: 'Zidi Hu',
        ABNNum: 1009298353232323,
        email: 'zidi@email.com',
        companyAddress: 'RMIT Melbourne, Victoria',
        companyName: 'AME Algoritem',
        walletsAddresses: [{
          type: 'NEM',
          address: 'zidiNEMaskdjfksladgjklasdfasdfsdf',
          description: 'business'
        }, {
          type: 'BTC',
          address: 'zidibtcjahsrgfasdfsdfasdfgdsd'
        }]
      }, {
        id: 'a3',
        name: 'Athum',
        ABNNum: 30076839298353232323,
        email: 'athum@email.com',
        walletsAddresses: [{
          type: 'NEM',
          address: 'skdfaklsdjfasdfasdfasdfasdasd'
        }, {
          type: 'BTC',
          address: 'klkjdfncksdnfladfgadsfdsfdsgfh'
        }]
      }, {
        id: 'a4',
        name: 'Mark Twain',
        ABNNum: 40076839298353232323,
        email: 'mark@email.com',
        walletsAddresses: [{
          type: 'BTC',
          address: 'jhlkdjfkasjdfklasdcnslkdfsdf'
        }]
      }, {
        id: 'a5',
        name: 'Isaac Newton',
        ABNNum: 50076839298353232323,
        email: 'isaac@email.com',
        walletsAddresses: [{
          type: 'BTC',
          address: 'sadkljfgasdcasdghgfdsasdfasdf'
        }]
      }, {
        id: 'a6',
        name: 'Thomas Alva Edison',
        ABNNum: 60076839298353232323,
        email: 'thomas@email.com',
        walletsAddresses: [{
          type: 'NEM',
          address: 'alkjfgfdghhjghjhfvvdfgdfsgd'
        }]
      }, {
        id: 'a7',
        name: 'Albert Einstein',
        ABNNum: 70076839298353232323,
        email: 'albert@email.com',
        walletsAddresses: [{
          type: 'BTC',
          address: 'bdfgsdffafhgtsadfasdfdsfv'
        }, {
          type: 'NEM',
          address: 'dghsdsdasdfgdfhdfgbdcvdfgfdhfggadf'
        }, {
          type: 'ETH',
          address: 'dgethdgsdafasdfrgfadsfasdfasdfasdfa'
        }]
      }, {
        id: 'a8',
        name: 'George Walker Bush',
        ABNNum: 80076839298353232323,
        email: 'george@email.com',
        walletsAddresses: [{
          type: 'NEM',
          address: 'ghdcasdfgdghfgasdfasdfdfdsfhg'
        }]
      }, {
        id: 'a9',
        name: 'Napoleon Bonaparte',
        ABNNum: 90076839298353232323,
        email: 'napoleon@email.com',
        walletsAddresses: [{
          type: 'BTC',
          address: 'cghfgfdasfdtythyuvsdvsasdf'
        }, {
          type: 'ETH',
          address: 'sdgfsfglkdjcairtjioqwesdasfg',
          description: 'napoleon eth wallet'
        }]
      }, {
        id: 'a10',
        name: 'Harper ',
        ABNNum: 100898986775657883,
        email: 'Evelyn@email.com',
        walletsAddresses: [{
          type: 'BTC',
          address: 'cghfgfdasfdtythyuvsdvsasdf'
        }]
      }, {
        id: 'a11',
        name: 'Mason ',
        ABNNum: 110898986775657883,
        email: 'Mason@email.com',
        walletsAddresses: [{
          type: 'NEM',
          address: 'sdfgsfhdhjykdfdcasdasdfads'
        }]
      }, {
        id: 'a12',
        name: 'Evelyn ',
        ABNNum: 120898986775657883,
        email: 'Evelyn@email.com',
        walletsAddresses: [{
          type: 'NEM',
          address: 'xfgfutyudsxvdfhfghsdadsfgfg'
        }, {
          type: 'BTC',
          address: 'sfgfhtfdasfdsdfhgdyuytrgasd'
        }]
      }, {
        id: 'a13',
        name: 'William Shakespeare',
        ABNNum: 1309298353232323,
        email: 'willian@email.com',
        walletsAddresses: [{
          type: 'BTC',
          address: 'skdfaklsdjfasdfasdfasdfasdasd'
        }]
      }, {
        id: 'a14',
        name: 'Will Smith',
        ABNNum: 1406839298353232323,
        email: 'willSmith@email.com',
        walletsAddresses: [{
          type: 'NEM',
          address: 'sdgfadsfasdfasdfasdfasdfdfhyh'
        }]
      }];
      /***/
    },

    /***/
    "./src/app/services/dummyData/notifications.data.ts":
    /*!**********************************************************!*\
      !*** ./src/app/services/dummyData/notifications.data.ts ***!
      \**********************************************************/

    /*! exports provided: notifications */

    /***/
    function srcAppServicesDummyDataNotificationsDataTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "notifications", function () {
        return notifications;
      });

      var notifications = [// Systen notifications:
      {
        id: 'n1',
        type: 'system',
        title: 'System update',
        message: 'New version of AEM+ 2.0 will release this year',
        date: 1549756800000,
        isRead: false
      }, {
        id: 'n2',
        type: 'system',
        title: 'System update',
        message: 'AEM+ will perform a scheduled system update',
        date: new Date().getTime(),
        isRead: false
      }, // Transactions notifications of different wallets
      //      ---> myBTCwallet1 wallet
      {
        id: 'n3',
        type: 'transaction',
        title: 'Transactions',
        message: 'you have received 100 aud from someone at 2021-03-25',
        walletAddress: 'sjdfasfl45asdfass454dfasdfsd',
        date: 1580475600000,
        isRead: false
      }, {
        id: 'n4',
        type: 'transaction',
        title: 'Transactions',
        message: 'new transacion from someone at a certain date',
        walletAddress: 'sjdfasfl45asdfass454dfasdfsd',
        date: 1580475688900,
        isRead: false
      }, {
        id: 'n5',
        type: 'transaction',
        title: 'Transactions',
        message: 'new transacion from someone at a certain date',
        walletAddress: 'sjdfasfl45asdfass454dfasdfsd',
        date: new Date().getTime(),
        isRead: false
      }, //      ---> myXEMwallet1 wallet
      {
        id: 'n6',
        type: 'transaction',
        title: 'Transactions',
        message: 'new transacion from someone at a certain date',
        walletAddress: 'jknlkasdfjaskdnfaksldfwieeesdf',
        date: new Date().getTime(),
        isRead: false
      }];
      /***/
    },

    /***/
    "./src/app/services/helper/helper-fun.service.ts":
    /*!*******************************************************!*\
      !*** ./src/app/services/helper/helper-fun.service.ts ***!
      \*******************************************************/

    /*! exports provided: HelperFunService */

    /***/
    function srcAppServicesHelperHelperFunServiceTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "HelperFunService", function () {
        return HelperFunService;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "./node_modules/tslib/tslib.es6.js");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");

      var HelperFunService = /*#__PURE__*/function () {
        function HelperFunService() {
          _classCallCheck(this, HelperFunService);
        }

        _createClass(HelperFunService, [{
          key: "getDate",
          value: function getDate(date) {
            // Thu,10 Feb 2020
            console.log(date);
          }
        }, {
          key: "dateFormat",
          value: function dateFormat(date) {
            var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']; // DD MMM YY

            return date.getDate() + '/' + months[date.getMonth()].substring(0, 3) + '/' + date.getFullYear().toString().substr(-2);
          }
        }, {
          key: "isSameDay",
          value: function isSameDay(d1, d2) {
            return d1.getFullYear() === d2.getFullYear() && d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth();
          }
        }, {
          key: "isThisWeek",
          value: function isThisWeek(date) {
            var todayObj = new Date();
            var todayDate = todayObj.getDate();
            var todayDay = todayObj.getDay();
            var firstDayOfWeek = new Date(todayObj.setDate(todayDate - todayDay));
            var lastDayOfWeek = new Date(firstDayOfWeek);
            lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);
            return date >= firstDayOfWeek && date <= lastDayOfWeek;
          }
        }, {
          key: "isThisMonth",
          value: function isThisMonth(d1, d2) {
            return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth();
          }
        }, {
          key: "isThisYear",
          value: function isThisYear(d1, d2) {
            return d1.getFullYear() === d2.getFullYear();
          }
        }, {
          key: "isInDateRange",
          value: function isInDateRange(date, start, end) {
            return date >= start && date <= end;
          }
        }, {
          key: "isInAmountRange",
          value: function isInAmountRange(amount, maxAmount, minAmount) {
            return amount >= minAmount && amount <= maxAmount;
          } //  fixed period fitered transaction:

        }, {
          key: "onDayFilter",
          value: function onDayFilter(transactions) {
            var _this = this;

            return transactions.filter(function (trans) {
              return _this.isSameDay(new Date(trans.time), new Date());
            });
          }
        }, {
          key: "onWeekFilter",
          value: function onWeekFilter(transactions) {
            var _this2 = this;

            return transactions.filter(function (trans) {
              return _this2.isThisWeek(new Date(trans.time));
            });
          }
        }, {
          key: "onMonthFilter",
          value: function onMonthFilter(transactions) {
            var _this3 = this;

            return transactions.filter(function (trans) {
              return _this3.isThisMonth(new Date(trans.time), new Date());
            });
          }
        }, {
          key: "onYearFilter",
          value: function onYearFilter(transactions) {
            var _this4 = this;

            return transactions.filter(function (trans) {
              return _this4.isThisYear(new Date(trans.time), new Date());
            });
          } // range filtered transaction:

        }, {
          key: "dateRangeFilter",
          value: function dateRangeFilter(transactions, startDate, endDate) {
            var _this5 = this;

            return transactions.filter(function (trans) {
              return _this5.isInDateRange(new Date(trans.time), startDate, endDate);
            });
          }
        }, {
          key: "amountRangeFilter",
          value: function amountRangeFilter(transactions, maxAmount, minAmount) {
            var _this6 = this;

            return transactions.filter(function (trans) {
              return _this6.isInAmountRange(trans.amountAUD, maxAmount, minAmount);
            });
          }
        }, {
          key: "amountRangeWithTypeFilter",
          value: function amountRangeWithTypeFilter(transactions, maxAmount, minAmount, type) {
            var _this7 = this;

            if (type === 'AUD') {
              return transactions.filter(function (trans) {
                return _this7.isInAmountRange(trans.amountAUD, maxAmount, minAmount);
              });
            } else {
              // crypto currecy amount
              return transactions.filter(function (trans) {
                return _this7.isInAmountRange(trans.amount, maxAmount, minAmount);
              });
            }
          }
        }]);

        return HelperFunService;
      }();

      HelperFunService.ctorParameters = function () {
        return [];
      };

      HelperFunService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
      })], HelperFunService);
      /***/
    },

    /***/
    "./src/app/services/models/address.modal.ts":
    /*!**************************************************!*\
      !*** ./src/app/services/models/address.modal.ts ***!
      \**************************************************/

    /*! exports provided: walletAddress, Address */

    /***/
    function srcAppServicesModelsAddressModalTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "walletAddress", function () {
        return walletAddress;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "Address", function () {
        return Address;
      });

      var walletAddress = function walletAddress() {
        _classCallCheck(this, walletAddress);
      };

      var Address = function Address(id, name, ABNNum, email, companyAddress, companyName, walletsAddresses) {
        _classCallCheck(this, Address);

        this.id = id;
        this.name = name;
        this.ABNNum = ABNNum;
        this.email = email;
        this.companyAddress = companyAddress;
        this.companyName = companyName;
        this.walletsAddresses = walletsAddresses;
      };
      /***/

    },

    /***/
    "./src/app/services/notifications/notifications.service.ts":
    /*!*****************************************************************!*\
      !*** ./src/app/services/notifications/notifications.service.ts ***!
      \*****************************************************************/

    /*! exports provided: NotificationsService */

    /***/
    function srcAppServicesNotificationsNotificationsServiceTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "NotificationsService", function () {
        return NotificationsService;
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


      var _dummyData_notifications_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../dummyData/notifications.data */
      "./src/app/services/dummyData/notifications.data.ts");

      var NotificationsService = /*#__PURE__*/function () {
        function NotificationsService() {
          _classCallCheck(this, NotificationsService);

          this.notifications = _dummyData_notifications_data__WEBPACK_IMPORTED_MODULE_2__["notifications"];
        }

        _createClass(NotificationsService, [{
          key: "getAllNotifictions",
          value: function getAllNotifictions() {
            return this.notifications;
          }
        }, {
          key: "getAllNotificationCounts",
          value: function getAllNotificationCounts() {
            return this.notifications.length;
          }
        }, {
          key: "getWalletNotificationNums",
          value: function getWalletNotificationNums(walletAddress) {
            var counts = 0;
            this.notifications.forEach(function (notification) {
              if (notification.walletAddress && notification.walletAddress == walletAddress) {
                // console.log('inside of notification service:', notification.walletAddress, walletAddress);
                counts += 1;
              }
            }); // console.log('inside of notification service:', counts);

            return counts;
          }
        }, {
          key: "getWalletNotifications",
          value: function getWalletNotifications(address) {
            return this.notifications.filter(function (notifiction) {
              return notifiction.walletAddress === address;
            });
          }
        }]);

        return NotificationsService;
      }();

      NotificationsService.ctorParameters = function () {
        return [];
      };

      NotificationsService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
      })], NotificationsService);
      /***/
    }
  }]);
})();
//# sourceMappingURL=common-es5.js.map