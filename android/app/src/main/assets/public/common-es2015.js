(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

/***/ "./node_modules/@ionic/core/dist/esm/button-active-0d5784f9.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/button-active-0d5784f9.js ***!
  \*********************************************************************/
/*! exports provided: c */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return createButtonActiveGesture; });
/* harmony import */ var _index_44bf8136_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-44bf8136.js */ "./node_modules/@ionic/core/dist/esm/index-44bf8136.js");
/* harmony import */ var _index_eea61379_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index-eea61379.js */ "./node_modules/@ionic/core/dist/esm/index-eea61379.js");
/* harmony import */ var _haptic_7b8ba70a_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./haptic-7b8ba70a.js */ "./node_modules/@ionic/core/dist/esm/haptic-7b8ba70a.js");




const createButtonActiveGesture = (el, isButton) => {
    let currentTouchedButton;
    let initialTouchedButton;
    const activateButtonAtPoint = (x, y, hapticFeedbackFn) => {
        if (typeof document === 'undefined') {
            return;
        }
        const target = document.elementFromPoint(x, y);
        if (!target || !isButton(target)) {
            clearActiveButton();
            return;
        }
        if (target !== currentTouchedButton) {
            clearActiveButton();
            setActiveButton(target, hapticFeedbackFn);
        }
    };
    const setActiveButton = (button, hapticFeedbackFn) => {
        currentTouchedButton = button;
        if (!initialTouchedButton) {
            initialTouchedButton = currentTouchedButton;
        }
        const buttonToModify = currentTouchedButton;
        Object(_index_44bf8136_js__WEBPACK_IMPORTED_MODULE_0__["c"])(() => buttonToModify.classList.add('ion-activated'));
        hapticFeedbackFn();
    };
    const clearActiveButton = (dispatchClick = false) => {
        if (!currentTouchedButton) {
            return;
        }
        const buttonToModify = currentTouchedButton;
        Object(_index_44bf8136_js__WEBPACK_IMPORTED_MODULE_0__["c"])(() => buttonToModify.classList.remove('ion-activated'));
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
        el,
        gestureName: 'buttonActiveDrag',
        threshold: 0,
        onStart: ev => activateButtonAtPoint(ev.currentX, ev.currentY, _haptic_7b8ba70a_js__WEBPACK_IMPORTED_MODULE_2__["a"]),
        onMove: ev => activateButtonAtPoint(ev.currentX, ev.currentY, _haptic_7b8ba70a_js__WEBPACK_IMPORTED_MODULE_2__["b"]),
        onEnd: () => {
            clearActiveButton(true);
            Object(_haptic_7b8ba70a_js__WEBPACK_IMPORTED_MODULE_2__["h"])();
            initialTouchedButton = undefined;
        }
    });
};




/***/ }),

/***/ "./node_modules/@ionic/core/dist/esm/framework-delegate-d1eb6504.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/framework-delegate-d1eb6504.js ***!
  \**************************************************************************/
/*! exports provided: a, d */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return attachComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return detachComponent; });
const attachComponent = async (delegate, container, component, cssClasses, componentProps) => {
    if (delegate) {
        return delegate.attachViewToDom(container, component, componentProps, cssClasses);
    }
    if (typeof component !== 'string' && !(component instanceof HTMLElement)) {
        throw new Error('framework delegate is missing');
    }
    const el = (typeof component === 'string')
        ? container.ownerDocument && container.ownerDocument.createElement(component)
        : component;
    if (cssClasses) {
        cssClasses.forEach(c => el.classList.add(c));
    }
    if (componentProps) {
        Object.assign(el, componentProps);
    }
    container.appendChild(el);
    if (el.componentOnReady) {
        await el.componentOnReady();
    }
    return el;
};
const detachComponent = (delegate, element) => {
    if (element) {
        if (delegate) {
            const container = element.parentElement;
            return delegate.removeViewFromDom(container, element);
        }
        element.remove();
    }
    return Promise.resolve();
};




/***/ }),

/***/ "./node_modules/@ionic/core/dist/esm/haptic-7b8ba70a.js":
/*!**************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/haptic-7b8ba70a.js ***!
  \**************************************************************/
/*! exports provided: a, b, c, d, h */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return hapticSelectionStart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return hapticSelectionChanged; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return hapticSelection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return hapticImpact; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return hapticSelectionEnd; });
const HapticEngine = {
    getEngine() {
        const win = window;
        return (win.TapticEngine) || (win.Capacitor && win.Capacitor.isPluginAvailable('Haptics') && win.Capacitor.Plugins.Haptics);
    },
    available() {
        return !!this.getEngine();
    },
    isCordova() {
        return !!window.TapticEngine;
    },
    isCapacitor() {
        const win = window;
        return !!win.Capacitor;
    },
    impact(options) {
        const engine = this.getEngine();
        if (!engine) {
            return;
        }
        const style = this.isCapacitor() ? options.style.toUpperCase() : options.style;
        engine.impact({ style });
    },
    notification(options) {
        const engine = this.getEngine();
        if (!engine) {
            return;
        }
        const style = this.isCapacitor() ? options.style.toUpperCase() : options.style;
        engine.notification({ style });
    },
    selection() {
        this.impact({ style: 'light' });
    },
    selectionStart() {
        const engine = this.getEngine();
        if (!engine) {
            return;
        }
        if (this.isCapacitor()) {
            engine.selectionStart();
        }
        else {
            engine.gestureSelectionStart();
        }
    },
    selectionChanged() {
        const engine = this.getEngine();
        if (!engine) {
            return;
        }
        if (this.isCapacitor()) {
            engine.selectionChanged();
        }
        else {
            engine.gestureSelectionChanged();
        }
    },
    selectionEnd() {
        const engine = this.getEngine();
        if (!engine) {
            return;
        }
        if (this.isCapacitor()) {
            engine.selectionEnd();
        }
        else {
            engine.gestureSelectionEnd();
        }
    }
};
/**
 * Trigger a selection changed haptic event. Good for one-time events
 * (not for gestures)
 */
const hapticSelection = () => {
    HapticEngine.selection();
};
/**
 * Tell the haptic engine that a gesture for a selection change is starting.
 */
const hapticSelectionStart = () => {
    HapticEngine.selectionStart();
};
/**
 * Tell the haptic engine that a selection changed during a gesture.
 */
const hapticSelectionChanged = () => {
    HapticEngine.selectionChanged();
};
/**
 * Tell the haptic engine we are done with a gesture. This needs to be
 * called lest resources are not properly recycled.
 */
const hapticSelectionEnd = () => {
    HapticEngine.selectionEnd();
};
/**
 * Use this to indicate success/failure/warning to the user.
 * options should be of the type `{ style: 'light' }` (or `medium`/`heavy`)
 */
const hapticImpact = (options) => {
    HapticEngine.impact(options);
};




/***/ }),

/***/ "./node_modules/@ionic/core/dist/esm/spinner-configs-c78e170e.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/spinner-configs-c78e170e.js ***!
  \***********************************************************************/
/*! exports provided: S */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "S", function() { return SPINNERS; });
const spinners = {
    'bubbles': {
        dur: 1000,
        circles: 9,
        fn: (dur, index, total) => {
            const animationDelay = `${(dur * index / total) - dur}ms`;
            const angle = 2 * Math.PI * index / total;
            return {
                r: 5,
                style: {
                    'top': `${9 * Math.sin(angle)}px`,
                    'left': `${9 * Math.cos(angle)}px`,
                    'animation-delay': animationDelay,
                }
            };
        }
    },
    'circles': {
        dur: 1000,
        circles: 8,
        fn: (dur, index, total) => {
            const step = index / total;
            const animationDelay = `${(dur * step) - dur}ms`;
            const angle = 2 * Math.PI * step;
            return {
                r: 5,
                style: {
                    'top': `${9 * Math.sin(angle)}px`,
                    'left': `${9 * Math.cos(angle)}px`,
                    'animation-delay': animationDelay,
                }
            };
        }
    },
    'circular': {
        dur: 1400,
        elmDuration: true,
        circles: 1,
        fn: () => {
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
        fn: () => {
            return {
                r: 26,
                style: {}
            };
        }
    },
    'dots': {
        dur: 750,
        circles: 3,
        fn: (_, index) => {
            const animationDelay = -(110 * index) + 'ms';
            return {
                r: 6,
                style: {
                    'left': `${9 - (9 * index)}px`,
                    'animation-delay': animationDelay,
                }
            };
        }
    },
    'lines': {
        dur: 1000,
        lines: 12,
        fn: (dur, index, total) => {
            const transform = `rotate(${30 * index + (index < 6 ? 180 : -180)}deg)`;
            const animationDelay = `${(dur * index / total) - dur}ms`;
            return {
                y1: 17,
                y2: 29,
                style: {
                    'transform': transform,
                    'animation-delay': animationDelay,
                }
            };
        }
    },
    'lines-small': {
        dur: 1000,
        lines: 12,
        fn: (dur, index, total) => {
            const transform = `rotate(${30 * index + (index < 6 ? 180 : -180)}deg)`;
            const animationDelay = `${(dur * index / total) - dur}ms`;
            return {
                y1: 12,
                y2: 20,
                style: {
                    'transform': transform,
                    'animation-delay': animationDelay,
                }
            };
        }
    }
};
const SPINNERS = spinners;




/***/ }),

/***/ "./node_modules/@ionic/core/dist/esm/theme-3f0b0c04.js":
/*!*************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/theme-3f0b0c04.js ***!
  \*************************************************************/
/*! exports provided: c, g, h, o */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return createColorClasses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return getClassMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return hostContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return openURL; });
const hostContext = (selector, el) => {
    return el.closest(selector) !== null;
};
/**
 * Create the mode and color classes for the component based on the classes passed in
 */
const createColorClasses = (color) => {
    return (typeof color === 'string' && color.length > 0) ? {
        'ion-color': true,
        [`ion-color-${color}`]: true
    } : undefined;
};
const getClassList = (classes) => {
    if (classes !== undefined) {
        const array = Array.isArray(classes) ? classes : classes.split(' ');
        return array
            .filter(c => c != null)
            .map(c => c.trim())
            .filter(c => c !== '');
    }
    return [];
};
const getClassMap = (classes) => {
    const map = {};
    getClassList(classes).forEach(c => map[c] = true);
    return map;
};
const SCHEME = /^[a-z][a-z0-9+\-.]*:/;
const openURL = async (url, ev, direction, animation) => {
    if (url != null && url[0] !== '#' && !SCHEME.test(url)) {
        const router = document.querySelector('ion-router');
        if (router) {
            if (ev != null) {
                ev.preventDefault();
            }
            return router.push(url, direction, animation);
        }
    }
    return false;
};




/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/address-book/add-address-modal/add-address-modal.component.html":
/*!***********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/address-book/add-address-modal/add-address-modal.component.html ***!
  \***********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content>\n  <ion-item lines=\"none\" class=\"header\">\n    <ion-label class=\"title\"> Add a new wallet </ion-label>\n    <ion-button fill=\"clear\" (click)=\"close()\">\n      <ion-icon name=\"close\" slot=\"icon-only\"> </ion-icon>\n    </ion-button>\n  </ion-item>\n\n  <form [formGroup]=\"addAddressForm\" (ngSubmit)=\"onAddAddress()\">\n    <h5 class=\"label\">Wallet Type</h5>\n    <ion-item lines=\"none\">\n      <ion-select formControlName=\"type\" slot=\"end\" interface=\"popover\">\n        <ion-select-option value=\"BTC\">BTC</ion-select-option>\n        <ion-select-option value=\"NEM\">XEM</ion-select-option>\n        <ion-select-option value=\"ETH\">ETH</ion-select-option>\n      </ion-select>\n    </ion-item>\n\n    <h5 class=\"label\">Wallet Address</h5>\n    <ion-item lines=\"none\"> <ion-input formControlName=\"address\"></ion-input> </ion-item>\n\n    <h5 class=\"label\">Description</h5>\n    <ion-item lines=\"none\"> <ion-input formControlName=\"description\"></ion-input> </ion-item>\n\n    <ion-button type=\"submit\" expand=\"block\" class=\"ion-margin-top btn-gradient-bg\" [disabled]=\"addAddressForm.invalid\"\n      >Add</ion-button\n    >\n  </form>\n</ion-content>\n");

/***/ }),

/***/ "./src/app/address-book/add-address-modal/add-address-modal.component.scss":
/*!*********************************************************************************!*\
  !*** ./src/app/address-book/add-address-modal/add-address-modal.component.scss ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".header {\n  padding-top: 10px;\n}\n.header .title {\n  font-size: 20px;\n  margin: 0;\n  font-weight: bold;\n}\nform {\n  padding: 20px;\n}\nform ion-item {\n  box-shadow: 0px 3px 6px #00000029;\n  border-radius: 8px;\n  margin-bottom: 5px;\n}\nform .label {\n  font-size: 14px;\n  color: #074673;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRkcmVzcy1ib29rL2FkZC1hZGRyZXNzLW1vZGFsL2FkZC1hZGRyZXNzLW1vZGFsLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsaUJBQUE7QUFDRjtBQUFFO0VBQ0UsZUFBQTtFQUNBLFNBQUE7RUFDQSxpQkFBQTtBQUVKO0FBRUE7RUFDRSxhQUFBO0FBQ0Y7QUFDRTtFQUNFLGlDQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQkFBQTtBQUNKO0FBRUU7RUFDRSxlQUFBO0VBQ0EsY0FBQTtBQUFKIiwiZmlsZSI6InNyYy9hcHAvYWRkcmVzcy1ib29rL2FkZC1hZGRyZXNzLW1vZGFsL2FkZC1hZGRyZXNzLW1vZGFsLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmhlYWRlciB7XG4gIHBhZGRpbmctdG9wOiAxMHB4O1xuICAudGl0bGUge1xuICAgIGZvbnQtc2l6ZTogMjBweDtcbiAgICBtYXJnaW46IDA7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIH1cbn1cblxuZm9ybSB7XG4gIHBhZGRpbmc6IDIwcHg7XG5cbiAgaW9uLWl0ZW0ge1xuICAgIGJveC1zaGFkb3c6IDBweCAzcHggNnB4ICMwMDAwMDAyOTtcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgbWFyZ2luLWJvdHRvbTogNXB4O1xuICB9XG5cbiAgLmxhYmVsIHtcbiAgICBmb250LXNpemU6IDE0cHg7XG4gICAgY29sb3I6ICMwNzQ2NzM7XG4gIH1cbn1cbiJdfQ== */");

/***/ }),

/***/ "./src/app/address-book/add-address-modal/add-address-modal.component.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/address-book/add-address-modal/add-address-modal.component.ts ***!
  \*******************************************************************************/
/*! exports provided: AddAddressModalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddAddressModalComponent", function() { return AddAddressModalComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var src_app_services_address_book_address_book_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/address-book/address-book.service */ "./src/app/services/address-book/address-book.service.ts");





let AddAddressModalComponent = class AddAddressModalComponent {
    constructor(modalCtrl, addressBookService) {
        this.modalCtrl = modalCtrl;
        this.addressBookService = addressBookService;
    }
    ngOnInit() {
        console.log(' add address modal:', this.isNewContact);
        this.addAddressForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
            type: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null, { validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required] }),
            address: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null, { validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required] }),
            description: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null),
        });
    }
    close() {
        this.modalCtrl.dismiss();
    }
    onAddAddress() {
        if (this.isNewContact) {
            const address = this.addAddressForm.value;
            this.modalCtrl.dismiss(this.addAddressForm.value, 'confirm');
        }
        else {
            this.addressBookService.addAnAddress(this.contact.id, this.addAddressForm.value);
            this.close();
        }
    }
};
AddAddressModalComponent.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"] },
    { type: src_app_services_address_book_address_book_service__WEBPACK_IMPORTED_MODULE_4__["AddressBookService"] }
];
AddAddressModalComponent.propDecorators = {
    contact: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
    isNewContact: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }]
};
AddAddressModalComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-add-address-modal',
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./add-address-modal.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/address-book/add-address-modal/add-address-modal.component.html")).default,
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./add-address-modal.component.scss */ "./src/app/address-book/add-address-modal/add-address-modal.component.scss")).default]
    })
], AddAddressModalComponent);



/***/ }),

/***/ "./src/app/services/address-book/address-book.service.ts":
/*!***************************************************************!*\
  !*** ./src/app/services/address-book/address-book.service.ts ***!
  \***************************************************************/
/*! exports provided: AddressBookService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddressBookService", function() { return AddressBookService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var _dummyData_address_list_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dummyData/address-list.data */ "./src/app/services/dummyData/address-list.data.ts");
/* harmony import */ var _models_address_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../models/address.modal */ "./src/app/services/models/address.modal.ts");





let AddressBookService = class AddressBookService {
    constructor() {
        this.addressesList = _dummyData_address_list_data__WEBPACK_IMPORTED_MODULE_3__["addressesList"];
        this.addressesChanged = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.contactChanged = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
    }
    setAddressesList(newAddressesList) {
        this.addressesList = newAddressesList;
        this.addressesChanged.next(newAddressesList.slice());
    }
    getAddressesList() {
        return [...this.addressesList];
    }
    // Get the contact by id:
    getAddress(id) {
        return this.addressesList.find((address) => address.id === id);
    }
    filteredAddresses(inputVal) {
        return inputVal && inputVal.trim() !== ''
            ? [
                ...this.addressesList.filter((address) => {
                    return address.name.toLowerCase().indexOf(inputVal.toLowerCase()) > -1;
                }),
            ]
            : [...this.addressesList];
    }
    updateAddress(id, newAddressData) {
        const index = this.addressesList.findIndex((address) => address.id === id);
        this.addressesList[index] = newAddressData;
        this.addressesChanged.next(this.addressesList.slice());
    }
    // ------ add an address to a contact by id
    addAnAddress(id, address) {
        const contact = this.addressesList.find((contact) => contact.id === id);
        contact.walletsAddresses.push(address);
        const newContact = Object.assign({}, contact);
        // console.log('service add an address: ', newContact);
        this.contactChanged.next(newContact);
    }
    // add a new contact:
    addNewContact(name, ABNNum, email, companyAddress, companyName, walletsAddresses) {
        //  manually add id here. ----> id: generate by backend?
        const newContact = new _models_address_modal__WEBPACK_IMPORTED_MODULE_4__["Address"](Math.random().toString(), name, ABNNum, email, companyAddress, companyName, walletsAddresses);
        this.addressesList.push(newContact);
        this.addressesChanged.next(this.addressesList.slice());
    }
    // --- get all the same type of crypto addresses from the contacts
    //      with the contact's info together: for generating transaction data
    getAllSameCryptoAddresses(walletType) {
        let allSameTypeAddresses = [];
        this.addressesList.forEach((contact) => {
            return contact.walletsAddresses.filter((addressObj) => {
                if (addressObj.type === walletType) {
                    const aNewAddressObj = {
                        address: addressObj.address,
                        description: addressObj.description && addressObj.description,
                        holderName: contact.name,
                        type: addressObj.type,
                        businessName: contact.companyName,
                        ABNNum: contact.ABNNum,
                    };
                    allSameTypeAddresses.push(aNewAddressObj);
                }
            });
        });
        return allSameTypeAddresses;
    }
    deleteAnAddressFromContact(id, selectedAddress) {
        const index = this.addressesList.findIndex((address) => address.id === id);
        const oldContact = this.getAddress(id);
        const updatedContactWallets = oldContact.walletsAddresses.filter((address) => address.address !== selectedAddress);
        const updatedContact = Object.assign(Object.assign({}, oldContact), { walletsAddresses: updatedContactWallets });
        this.contactChanged.next(updatedContact);
        this.addressesList[index] = updatedContact;
        this.addressesChanged.next(this.addressesList.slice());
    }
    // delete a contact by Id:
    deleteAContact(id) {
        this.addressesList = this.addressesList.filter((address) => address.id !== id);
        this.addressesChanged.next(this.addressesList.slice());
    }
};
AddressBookService.ctorParameters = () => [];
AddressBookService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root',
    })
], AddressBookService);



/***/ }),

/***/ "./src/app/services/dummyData/address-list.data.ts":
/*!*********************************************************!*\
  !*** ./src/app/services/dummyData/address-list.data.ts ***!
  \*********************************************************/
/*! exports provided: addressesList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addressesList", function() { return addressesList; });
const addressesList = [
    {
        id: 'a1',
        name: 'Chaofan Wu',
        ABNNum: 1009298353232323,
        email: 'chaofan@email.com',
        companyAddress: 'RMIT Melbourne, Victoria',
        companyName: 'AME Algoritem',
        walletsAddresses: [
            {
                type: 'BTC',
                address: 'chaofanbtcjahsrgfasdfsdfasdfgdsd',
                description: 'business',
            },
            {
                type: 'NEM',
                address: 'chaofanaskdjfksladgjklasdfasdfsdf',
            },
            {
                type: 'BTC',
                address: 'chaofanalksfjdasdgsdgrfasdfasdfa',
                description: 'personal',
            },
        ],
    },
    {
        id: 'a2',
        name: 'Zidi Hu',
        ABNNum: 1009298353232323,
        email: 'zidi@email.com',
        companyAddress: 'RMIT Melbourne, Victoria',
        companyName: 'AME Algoritem',
        walletsAddresses: [
            {
                type: 'NEM',
                address: 'zidiNEMaskdjfksladgjklasdfasdfsdf',
                description: 'business',
            },
            {
                type: 'BTC',
                address: 'zidibtcjahsrgfasdfsdfasdfgdsd',
            },
        ],
    },
    {
        id: 'a3',
        name: 'Athum',
        ABNNum: 30076839298353232323,
        email: 'athum@email.com',
        walletsAddresses: [
            {
                type: 'NEM',
                address: 'skdfaklsdjfasdfasdfasdfasdasd',
            },
            {
                type: 'BTC',
                address: 'klkjdfncksdnfladfgadsfdsfdsgfh',
            },
        ],
    },
    {
        id: 'a4',
        name: 'Mark Twain',
        ABNNum: 40076839298353232323,
        email: 'mark@email.com',
        walletsAddresses: [
            {
                type: 'BTC',
                address: 'jhlkdjfkasjdfklasdcnslkdfsdf',
            },
        ],
    },
    {
        id: 'a5',
        name: 'Isaac Newton',
        ABNNum: 50076839298353232323,
        email: 'isaac@email.com',
        walletsAddresses: [
            {
                type: 'BTC',
                address: 'sadkljfgasdcasdghgfdsasdfasdf',
            },
        ],
    },
    {
        id: 'a6',
        name: 'Thomas Alva Edison',
        ABNNum: 60076839298353232323,
        email: 'thomas@email.com',
        walletsAddresses: [
            {
                type: 'NEM',
                address: 'alkjfgfdghhjghjhfvvdfgdfsgd',
            },
        ],
    },
    {
        id: 'a7',
        name: 'Albert Einstein',
        ABNNum: 70076839298353232323,
        email: 'albert@email.com',
        walletsAddresses: [
            {
                type: 'BTC',
                address: 'bdfgsdffafhgtsadfasdfdsfv',
            },
            {
                type: 'NEM',
                address: 'dghsdsdasdfgdfhdfgbdcvdfgfdhfggadf',
            },
            {
                type: 'ETH',
                address: 'dgethdgsdafasdfrgfadsfasdfasdfasdfa',
            },
        ],
    },
    {
        id: 'a8',
        name: 'George Walker Bush',
        ABNNum: 80076839298353232323,
        email: 'george@email.com',
        walletsAddresses: [
            {
                type: 'NEM',
                address: 'ghdcasdfgdghfgasdfasdfdfdsfhg',
            },
        ],
    },
    {
        id: 'a9',
        name: 'Napoleon Bonaparte',
        ABNNum: 90076839298353232323,
        email: 'napoleon@email.com',
        walletsAddresses: [
            {
                type: 'BTC',
                address: 'cghfgfdasfdtythyuvsdvsasdf',
            },
            {
                type: 'ETH',
                address: 'sdgfsfglkdjcairtjioqwesdasfg',
                description: 'napoleon eth wallet',
            },
        ],
    },
    {
        id: 'a10',
        name: 'Harper ',
        ABNNum: 100898986775657883,
        email: 'Evelyn@email.com',
        walletsAddresses: [
            {
                type: 'BTC',
                address: 'cghfgfdasfdtythyuvsdvsasdf',
            },
        ],
    },
    {
        id: 'a11',
        name: 'Mason ',
        ABNNum: 110898986775657883,
        email: 'Mason@email.com',
        walletsAddresses: [
            {
                type: 'NEM',
                address: 'sdfgsfhdhjykdfdcasdasdfads',
            },
        ],
    },
    {
        id: 'a12',
        name: 'Evelyn ',
        ABNNum: 120898986775657883,
        email: 'Evelyn@email.com',
        walletsAddresses: [
            {
                type: 'NEM',
                address: 'xfgfutyudsxvdfhfghsdadsfgfg',
            },
            {
                type: 'BTC',
                address: 'sfgfhtfdasfdsdfhgdyuytrgasd',
            },
        ],
    },
    {
        id: 'a13',
        name: 'William Shakespeare',
        ABNNum: 1309298353232323,
        email: 'willian@email.com',
        walletsAddresses: [
            {
                type: 'BTC',
                address: 'skdfaklsdjfasdfasdfasdfasdasd',
            },
        ],
    },
    {
        id: 'a14',
        name: 'Will Smith',
        ABNNum: 1406839298353232323,
        email: 'willSmith@email.com',
        walletsAddresses: [
            {
                type: 'NEM',
                address: 'sdgfadsfasdfasdfasdfasdfdfhyh',
            },
        ],
    },
];


/***/ }),

/***/ "./src/app/services/dummyData/notifications.data.ts":
/*!**********************************************************!*\
  !*** ./src/app/services/dummyData/notifications.data.ts ***!
  \**********************************************************/
/*! exports provided: notifications */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "notifications", function() { return notifications; });
const notifications = [
    // Systen notifications:
    {
        id: 'n1',
        type: 'system',
        title: 'System update',
        message: 'New version of AEM+ 2.0 will release this year',
        date: 1549756800000,
        isRead: false,
    },
    {
        id: 'n2',
        type: 'system',
        title: 'System update',
        message: 'AEM+ will perform a scheduled system update',
        date: new Date().getTime(),
        isRead: false,
    },
    // Transactions notifications of different wallets
    //      ---> myBTCwallet1 wallet
    {
        id: 'n3',
        type: 'transaction',
        title: 'Transactions',
        message: 'you have received 100 aud from someone at 2021-03-25',
        walletAddress: 'sjdfasfl45asdfass454dfasdfsd',
        date: 1580475600000,
        isRead: false,
    },
    {
        id: 'n4',
        type: 'transaction',
        title: 'Transactions',
        message: 'new transacion from someone at a certain date',
        walletAddress: 'sjdfasfl45asdfass454dfasdfsd',
        date: 1580475688900,
        isRead: false,
    },
    {
        id: 'n5',
        type: 'transaction',
        title: 'Transactions',
        message: 'new transacion from someone at a certain date',
        walletAddress: 'sjdfasfl45asdfass454dfasdfsd',
        date: new Date().getTime(),
        isRead: false,
    },
    //      ---> myXEMwallet1 wallet
    {
        id: 'n6',
        type: 'transaction',
        title: 'Transactions',
        message: 'new transacion from someone at a certain date',
        walletAddress: 'jknlkasdfjaskdnfaksldfwieeesdf',
        date: new Date().getTime(),
        isRead: false,
    },
];


/***/ }),

/***/ "./src/app/services/helper/helper-fun.service.ts":
/*!*******************************************************!*\
  !*** ./src/app/services/helper/helper-fun.service.ts ***!
  \*******************************************************/
/*! exports provided: HelperFunService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HelperFunService", function() { return HelperFunService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");


let HelperFunService = class HelperFunService {
    constructor() { }
    getDate(date) {
        // Thu,10 Feb 2020
        console.log(date);
    }
    dateFormat(date) {
        let months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
        // DD MMM YY
        return (date.getDate() + '/' + months[date.getMonth()].substring(0, 3) + '/' + date.getFullYear().toString().substr(-2));
    }
    isSameDay(d1, d2) {
        return d1.getFullYear() === d2.getFullYear() && d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth();
    }
    isThisWeek(date) {
        const todayObj = new Date();
        const todayDate = todayObj.getDate();
        const todayDay = todayObj.getDay();
        const firstDayOfWeek = new Date(todayObj.setDate(todayDate - todayDay));
        const lastDayOfWeek = new Date(firstDayOfWeek);
        lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);
        return date >= firstDayOfWeek && date <= lastDayOfWeek;
    }
    isThisMonth(d1, d2) {
        return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth();
    }
    isThisYear(d1, d2) {
        return d1.getFullYear() === d2.getFullYear();
    }
    isInDateRange(date, start, end) {
        return date >= start && date <= end;
    }
    isInAmountRange(amount, maxAmount, minAmount) {
        return amount >= minAmount && amount <= maxAmount;
    }
    //  fixed period fitered transaction:
    onDayFilter(transactions) {
        return transactions.filter((trans) => this.isSameDay(new Date(trans.time), new Date()));
    }
    onWeekFilter(transactions) {
        return transactions.filter((trans) => this.isThisWeek(new Date(trans.time)));
    }
    onMonthFilter(transactions) {
        return transactions.filter((trans) => this.isThisMonth(new Date(trans.time), new Date()));
    }
    onYearFilter(transactions) {
        return transactions.filter((trans) => this.isThisYear(new Date(trans.time), new Date()));
    }
    // range filtered transaction:
    dateRangeFilter(transactions, startDate, endDate) {
        return transactions.filter((trans) => this.isInDateRange(new Date(trans.time), startDate, endDate));
    }
    amountRangeFilter(transactions, maxAmount, minAmount) {
        return transactions.filter((trans) => this.isInAmountRange(trans.amountAUD, maxAmount, minAmount));
    }
    amountRangeWithTypeFilter(transactions, maxAmount, minAmount, type) {
        if (type === 'AUD') {
            return transactions.filter((trans) => this.isInAmountRange(trans.amountAUD, maxAmount, minAmount));
        }
        else {
            // crypto currecy amount
            return transactions.filter((trans) => this.isInAmountRange(trans.amount, maxAmount, minAmount));
        }
    }
};
HelperFunService.ctorParameters = () => [];
HelperFunService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root',
    })
], HelperFunService);



/***/ }),

/***/ "./src/app/services/models/address.modal.ts":
/*!**************************************************!*\
  !*** ./src/app/services/models/address.modal.ts ***!
  \**************************************************/
/*! exports provided: walletAddress, Address */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "walletAddress", function() { return walletAddress; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Address", function() { return Address; });
class walletAddress {
}
class Address {
    constructor(id, name, ABNNum, email, companyAddress, companyName, walletsAddresses) {
        this.id = id;
        this.name = name;
        this.ABNNum = ABNNum;
        this.email = email;
        this.companyAddress = companyAddress;
        this.companyName = companyName;
        this.walletsAddresses = walletsAddresses;
    }
}


/***/ }),

/***/ "./src/app/services/notifications/notifications.service.ts":
/*!*****************************************************************!*\
  !*** ./src/app/services/notifications/notifications.service.ts ***!
  \*****************************************************************/
/*! exports provided: NotificationsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationsService", function() { return NotificationsService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _dummyData_notifications_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dummyData/notifications.data */ "./src/app/services/dummyData/notifications.data.ts");



let NotificationsService = class NotificationsService {
    constructor() {
        this.notifications = _dummyData_notifications_data__WEBPACK_IMPORTED_MODULE_2__["notifications"];
    }
    getAllNotifictions() {
        return this.notifications;
    }
    getAllNotificationCounts() {
        return this.notifications.length;
    }
    getWalletNotificationNums(walletAddress) {
        let counts = 0;
        this.notifications.forEach((notification) => {
            if (notification.walletAddress && notification.walletAddress == walletAddress) {
                // console.log('inside of notification service:', notification.walletAddress, walletAddress);
                counts += 1;
            }
        });
        // console.log('inside of notification service:', counts);
        return counts;
    }
    getWalletNotifications(address) {
        return this.notifications.filter((notifiction) => notifiction.walletAddress === address);
    }
};
NotificationsService.ctorParameters = () => [];
NotificationsService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root',
    })
], NotificationsService);



/***/ })

}]);
//# sourceMappingURL=common-es2015.js.map