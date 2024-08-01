var vg;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./app/js/VGFormPlugins.js":
/*!*********************************!*\
  !*** ./app/js/VGFormPlugins.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _plugins_showPass_showPass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./plugins/showPass/showPass */ "./app/js/plugins/showPass/showPass.js");

class VGFormPlugins {
  constructor(formsender) {
    this.plugins = formsender.settings.plugins;
    this.formsender = formsender;
  }
  init() {
    const _this = this;
    if (_this.plugins.length) {
      for (const plugin of _this.plugins) {
        let nameModule = Object.keys(plugin)[0];
        if (plugin[nameModule].enabled) {
          switch (nameModule) {
            case "showPass":
              if (typeof _plugins_showPass_showPass__WEBPACK_IMPORTED_MODULE_0__["default"] !== "undefined") {
                let module = new _plugins_showPass_showPass__WEBPACK_IMPORTED_MODULE_0__["default"](_this.formsender.form, plugin[nameModule].params);
                module.init();
              }
              break;
          }
        }
      }
    }
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (VGFormPlugins);

/***/ }),

/***/ "./app/js/VGFormSender.js":
/*!********************************!*\
  !*** ./app/js/VGFormSender.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _VGSender__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VGSender */ "./app/js/VGSender.js");
/* harmony import */ var _util_functions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/functions */ "./app/js/util/functions.js");
/* harmony import */ var _util_animation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util/animation */ "./app/js/util/animation.js");



const svg = {
  error: '<svg viewbox="0 0 500 500" class="am_Error_Icon"><path class="am_SVG_circle" d="m444.34693,114.07007a236.95276,236.95276 0 0 1 44.1553,137.73747c0,129.97005 -106.94772,236.96443 -236.91777,236.96443s-236.91777,-106.94772 -236.91777,-236.91777s106.94772,-236.96443 236.91777,-236.96443a236.99941,236.99941 0 0 1 168.72548,70.59483"></path><line class="am_SVG_error1" y2="390" x2="390" y1="110" x1="110"></line><line class="am_SVG_error2" y2="390" x2="110" y1="110" x1="390"></line></svg>',
  success: '<svg viewbox="0 0 500 500" class="am_Success_Icon"><path class="am_SVG_circle" d="m443.0136,114.07007a236.95276,236.95276 0 0 1 44.1553,137.73747c0,129.97005 -106.94772,236.96443 -236.91777,236.96443s-236.91777,-106.94772 -236.91777,-236.91777s106.94772,-236.96443 236.91777,-236.96443a236.99941,236.99941 0 0 1 168.72548,70.59483"></path><polyline class="am_SVG_check" points="104.4892349243164,309.2001647949219 195.57406616210938,402.9600524902344 418.9292297363281,85.03718566894531 "></polyline></svg>',
  cross: '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 224.512 224.512" style="enable-background:new 0 0 224.512 224.512;" xml:space="preserve"><g><polygon style="fill:#010002;" points="224.507,6.997 217.521,0 112.256,105.258 6.998,0 0.005,6.997 105.263,112.254 0.005,217.512 6.998,224.512 112.256,119.24 217.521,224.512 224.507,217.512 119.249,112.254 "/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>'
};
class VGFormSender extends _VGSender__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(form, arg = {}) {
    super(form, arg);
    return this;
  }
  submit(callback) {}
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (VGFormSender);

/***/ }),

/***/ "./app/js/VGSender.js":
/*!****************************!*\
  !*** ./app/js/VGSender.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util_functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/functions */ "./app/js/util/functions.js");
/* harmony import */ var _VGFormPlugins__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VGFormPlugins */ "./app/js/VGFormPlugins.js");


const EVENT_KEY_SUCCESS = 'vg.fs.success';
const EVENT_KEY_ERROR = 'vg.fs.error';
const EVENT_KEY_BEFORE = 'vg.fs.before';
const setParams = function (form, params, arg) {
  let mParams = (0,_util_functions__WEBPACK_IMPORTED_MODULE_0__.mergeDeepObject)(params, arg);
  let data = [].filter.call(form.attributes, function (at) {
    return /^data-/.test(at.name);
  });
  for (let val of data) {
    if (val.name === 'data-alert-type' && val.value) mParams.alert.params.type = val.value;
    if (val.name === 'data-alert') mParams.alert = val.value !== 'false';
    if (val.name === 'data-validate') mParams.validate = val.value !== 'false';
    if (val.name === 'data-json-parse') mParams.jsonParse = val.value !== 'false';
    if (val.name === 'data-redirect' && val.value) mParams.redirect = val.value;
    if (val.name === 'data-plugins' && val.value) mParams.plugins = dataPlugins(JSON.parse(val.value));
  }
  function dataPlugins(value) {
    let p = {};
    for (const plugin of params.plugins) {
      let namePlugin = Object.keys(plugin)[0],
        nameModule = Object.keys(value)[0];
      if (namePlugin === nameModule) {
        p = (0,_util_functions__WEBPACK_IMPORTED_MODULE_0__.mergeDeepObject)(plugin, value);
      }
    }
    return p;
  }
  mParams.action = form.getAttribute('action') || mParams.action;
  mParams.method = form.getAttribute('method') || mParams.method;
  return mParams;
};
class VGSender {
  constructor(form, arg = {}) {
    this.extElement = {};
    this.settings = {};
    this.form = null;
    const defaultParams = {
      action: location.href,
      method: 'post',
      fields: [],
      jsonParse: true,
      redirect: null,
      validate: false,
      alert: {
        enabled: true,
        params: {
          type: 'modal'
        }
      },
      plugins: [{
        showPass: {
          enabled: true,
          params: {}
        }
      }]
    };
    if (!form) {
      console.error('Первый параметр не должен быть пустым');
      return false;
    } else {
      if (typeof form === 'string') {
        let $form = document.querySelector(form);
        if ($form) {
          this.form = form;
        }
      } else {
        this.form = form;
      }
      if (this.form) {
        this.settings = setParams(form, defaultParams, arg);
        this.classes = {
          general: 'vg-form-sender'
        };
        if (this.settings.fields && typeof this.settings.fields == 'function') {
          this.settings.fields = this.settings.fields();
        }
        this.init();
      }
    }
  }
  init() {
    const _this = this;
    _this.form.classList.add(_this.classes.general);
    if (_this.settings.validate) {
      _this.form.setAttribute('novalidate', '');
      _this.form.classList.add('needs-validation');
    }
    let btnSubmit = _this.form.querySelector('[type="submit"]');
    if (!btnSubmit) btnSubmit = document.querySelector('[form="' + _this.form.id + '"]');
    _this.extElement.button = btnSubmit;
    if ('plugins' in _this.settings) {
      new _VGFormPlugins__WEBPACK_IMPORTED_MODULE_1__["default"](_this).init();
    }
    _this.isInit = true;
  }
  submit(callback) {
    if (!this.isInit) return false;
    const _this = this;
    _this.form.onsubmit = function (event) {
      let data = new FormData(_this.form);
      if (typeof _this.settings.fields === 'object') {
        _this.data = (0,_util_functions__WEBPACK_IMPORTED_MODULE_0__.collectData)(data, _this.settings.fields);
      }
      if (_this.settings.validate) {
        if (!_this.form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
          _this.form.classList.add('was-validated');
          return false;
        }
      }
      return _this.request(callback, event);
    };
  }
  request(callback, event) {
    if (!this.isInit) return false;
    const _this = this;
    let method = _this.settings.method.toLowerCase(),
      url = _this.settings.action,
      data = _this.data;
    if (callback && 'beforeSend' in callback) {
      if (typeof callback.beforeSend === 'function') callback.beforeSend(event, _this);
    }
    _util_functions__WEBPACK_IMPORTED_MODULE_0__.eventHandler.on(_this.form, EVENT_KEY_BEFORE);
    if (method === 'post') {
      _util_functions__WEBPACK_IMPORTED_MODULE_0__.ajax.post(url, data, function (status, data) {
        answer(status, data);
      });
    }
    if (method === 'get') {
      _util_functions__WEBPACK_IMPORTED_MODULE_0__.ajax.get(url, data, function (status, data) {
        answer(status, data);
      });
    }
    function answer(status, data) {
      _this.form.classList.remove('was-validated');
      if (typeof status === 'string' && status === 'error') {
        if (callback && 'error' in callback) {
          if (typeof callback.error === 'function') callback.error(event, _this, data);
        }
        _util_functions__WEBPACK_IMPORTED_MODULE_0__.eventHandler.on(_this.form, EVENT_KEY_ERROR);
      } else {
        if (callback && 'success' in callback) {
          if (typeof callback.success === 'function') callback.success(event, _this, data);
        }
        _util_functions__WEBPACK_IMPORTED_MODULE_0__.eventHandler.on(_this.form, EVENT_KEY_SUCCESS);
      }
      redirect();
    }
    function redirect() {
      if (_this.settings.redirect) {
        window.location.href = _this.settings.redirect;
      }
    }
    return false;
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (VGSender);

/***/ }),

/***/ "./app/js/app.js":
/*!***********************!*\
  !*** ./app/js/app.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VGFormSender: () => (/* reexport safe */ _VGFormSender__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _VGFormSender__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VGFormSender */ "./app/js/VGFormSender.js");
/**
 * --------------------------------------------------------------------------
 * Export Public Api
 * Автор: Vegas Studio
 * Лицензия: смотри LICENSE
 * --------------------------------------------------------------------------
 */




/***/ }),

/***/ "./app/js/plugins/showPass/showPass.js":
/*!*********************************************!*\
  !*** ./app/js/plugins/showPass/showPass.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class showPass {
  constructor(form = null, arg = {}) {
    this.form = form;
    this.params = arg;
    this.eyeOpen = '<svg width="24px" id="svgEyeOpen" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n' + '<path fill-rule="evenodd" clip-rule="evenodd" d="M12 8.25C9.92893 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25ZM9.75 12C9.75 10.7574 10.7574 9.75 12 9.75C13.2426 9.75 14.25 10.7574 14.25 12C14.25 13.2426 13.2426 14.25 12 14.25C10.7574 14.25 9.75 13.2426 9.75 12Z" fill="#495057"/>\n' + '<path fill-rule="evenodd" clip-rule="evenodd" d="M12 3.25C7.48587 3.25 4.44529 5.9542 2.68057 8.24686L2.64874 8.2882C2.24964 8.80653 1.88206 9.28392 1.63269 9.8484C1.36564 10.4529 1.25 11.1117 1.25 12C1.25 12.8883 1.36564 13.5471 1.63269 14.1516C1.88206 14.7161 2.24964 15.1935 2.64875 15.7118L2.68057 15.7531C4.44529 18.0458 7.48587 20.75 12 20.75C16.5141 20.75 19.5547 18.0458 21.3194 15.7531L21.3512 15.7118C21.7504 15.1935 22.1179 14.7161 22.3673 14.1516C22.6344 13.5471 22.75 12.8883 22.75 12C22.75 11.1117 22.6344 10.4529 22.3673 9.8484C22.1179 9.28391 21.7504 8.80652 21.3512 8.28818L21.3194 8.24686C19.5547 5.9542 16.5141 3.25 12 3.25ZM3.86922 9.1618C5.49864 7.04492 8.15036 4.75 12 4.75C15.8496 4.75 18.5014 7.04492 20.1308 9.1618C20.5694 9.73159 20.8263 10.0721 20.9952 10.4545C21.1532 10.812 21.25 11.2489 21.25 12C21.25 12.7511 21.1532 13.188 20.9952 13.5455C20.8263 13.9279 20.5694 14.2684 20.1308 14.8382C18.5014 16.9551 15.8496 19.25 12 19.25C8.15036 19.25 5.49864 16.9551 3.86922 14.8382C3.43064 14.2684 3.17374 13.9279 3.00476 13.5455C2.84684 13.188 2.75 12.7511 2.75 12C2.75 11.2489 2.84684 10.812 3.00476 10.4545C3.17374 10.0721 3.43063 9.73159 3.86922 9.1618Z" fill="#495057"/>\n' + '</svg>';
    this.eyeClose = '<svg width="24px" id="svgEyeClose" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n' + '<path d="M2.68936 6.70456C2.52619 6.32384 2.08528 6.14747 1.70456 6.31064C1.32384 6.47381 1.14747 6.91472 1.31064 7.29544L2.68936 6.70456ZM15.5872 13.3287L15.3125 12.6308L15.5872 13.3287ZM9.04145 13.7377C9.26736 13.3906 9.16904 12.926 8.82185 12.7001C8.47466 12.4742 8.01008 12.5725 7.78417 12.9197L9.04145 13.7377ZM6.37136 15.091C6.14545 15.4381 6.24377 15.9027 6.59096 16.1286C6.93815 16.3545 7.40273 16.2562 7.62864 15.909L6.37136 15.091ZM22.6894 7.29544C22.8525 6.91472 22.6762 6.47381 22.2954 6.31064C21.9147 6.14747 21.4738 6.32384 21.3106 6.70456L22.6894 7.29544ZM19 11.1288L18.4867 10.582V10.582L19 11.1288ZM19.9697 13.1592C20.2626 13.4521 20.7374 13.4521 21.0303 13.1592C21.3232 12.8663 21.3232 12.3914 21.0303 12.0985L19.9697 13.1592ZM11.25 16.5C11.25 16.9142 11.5858 17.25 12 17.25C12.4142 17.25 12.75 16.9142 12.75 16.5H11.25ZM16.3714 15.909C16.5973 16.2562 17.0619 16.3545 17.409 16.1286C17.7562 15.9027 17.8545 15.4381 17.6286 15.091L16.3714 15.909ZM5.53033 11.6592C5.82322 11.3663 5.82322 10.8914 5.53033 10.5985C5.23744 10.3056 4.76256 10.3056 4.46967 10.5985L5.53033 11.6592ZM2.96967 12.0985C2.67678 12.3914 2.67678 12.8663 2.96967 13.1592C3.26256 13.4521 3.73744 13.4521 4.03033 13.1592L2.96967 12.0985ZM12 13.25C8.77611 13.25 6.46133 11.6446 4.9246 9.98966C4.15645 9.16243 3.59325 8.33284 3.22259 7.71014C3.03769 7.3995 2.90187 7.14232 2.8134 6.96537C2.76919 6.87696 2.73689 6.80875 2.71627 6.76411C2.70597 6.7418 2.69859 6.7254 2.69411 6.71533C2.69187 6.7103 2.69036 6.70684 2.68957 6.70503C2.68917 6.70413 2.68896 6.70363 2.68892 6.70355C2.68891 6.70351 2.68893 6.70357 2.68901 6.70374C2.68904 6.70382 2.68913 6.70403 2.68915 6.70407C2.68925 6.7043 2.68936 6.70456 2 7C1.31064 7.29544 1.31077 7.29575 1.31092 7.29609C1.31098 7.29624 1.31114 7.2966 1.31127 7.2969C1.31152 7.29749 1.31183 7.2982 1.31218 7.299C1.31287 7.30062 1.31376 7.30266 1.31483 7.30512C1.31698 7.31003 1.31988 7.31662 1.32353 7.32483C1.33083 7.34125 1.34115 7.36415 1.35453 7.39311C1.38127 7.45102 1.42026 7.5332 1.47176 7.63619C1.57469 7.84206 1.72794 8.13175 1.93366 8.47736C2.34425 9.16716 2.96855 10.0876 3.8254 11.0103C5.53867 12.8554 8.22389 14.75 12 14.75V13.25ZM15.3125 12.6308C14.3421 13.0128 13.2417 13.25 12 13.25V14.75C13.4382 14.75 14.7246 14.4742 15.8619 14.0266L15.3125 12.6308ZM7.78417 12.9197L6.37136 15.091L7.62864 15.909L9.04145 13.7377L7.78417 12.9197ZM22 7C21.3106 6.70456 21.3107 6.70441 21.3108 6.70427C21.3108 6.70423 21.3108 6.7041 21.3109 6.70402C21.3109 6.70388 21.311 6.70376 21.311 6.70368C21.3111 6.70352 21.3111 6.70349 21.3111 6.7036C21.311 6.7038 21.3107 6.70452 21.3101 6.70576C21.309 6.70823 21.307 6.71275 21.3041 6.71924C21.2983 6.73223 21.2889 6.75309 21.2758 6.78125C21.2495 6.83757 21.2086 6.92295 21.1526 7.03267C21.0406 7.25227 20.869 7.56831 20.6354 7.9432C20.1669 8.69516 19.4563 9.67197 18.4867 10.582L19.5133 11.6757C20.6023 10.6535 21.3917 9.56587 21.9085 8.73646C22.1676 8.32068 22.36 7.9668 22.4889 7.71415C22.5533 7.58775 22.602 7.48643 22.6353 7.41507C22.6519 7.37939 22.6647 7.35118 22.6737 7.33104C22.6782 7.32097 22.6818 7.31292 22.6844 7.30696C22.6857 7.30398 22.6867 7.30153 22.6876 7.2996C22.688 7.29864 22.6883 7.29781 22.6886 7.29712C22.6888 7.29677 22.6889 7.29646 22.689 7.29618C22.6891 7.29604 22.6892 7.29585 22.6892 7.29578C22.6893 7.29561 22.6894 7.29544 22 7ZM18.4867 10.582C17.6277 11.3882 16.5739 12.1343 15.3125 12.6308L15.8619 14.0266C17.3355 13.4466 18.5466 12.583 19.5133 11.6757L18.4867 10.582ZM18.4697 11.6592L19.9697 13.1592L21.0303 12.0985L19.5303 10.5985L18.4697 11.6592ZM11.25 14V16.5H12.75V14H11.25ZM14.9586 13.7377L16.3714 15.909L17.6286 15.091L16.2158 12.9197L14.9586 13.7377ZM4.46967 10.5985L2.96967 12.0985L4.03033 13.1592L5.53033 11.6592L4.46967 10.5985Z" fill="#495057"/>\n' + '</svg>';
  }
  init() {
    const _this = this;
    let inputPasswords = _this.form.querySelectorAll('[type="password"]');
    if (inputPasswords.length) {
      inputPasswords.forEach(function (elm) {
        let parent = elm.parentNode;
        if (parent) {
          parent.style.position = 'relative';
          let switcher = parent.querySelector('[data-vg-toggle="show-pass"]');
          if (!switcher) {
            switcher = document.createElement('span');
            switcher.setAttribute('data-vg-toggle', 'show-pass');
            switcher.setAttribute('title', 'Показать');
            switcher.setAttribute('aria-expanded', 'false');
            switcher.style.position = 'absolute';
            switcher.style.cursor = 'pointer';
            switcher.style.width = '24px';
            switcher.style.height = '24px';
            switcher.style.top = '50%';
            switcher.style.transform = 'translateY(-50%)';
            switcher.style.right = '12px';
            switcher.innerHTML = _this.eyeOpen;
            parent.append(switcher);
          }
          _this.toggle(switcher, elm);
        }
      });
    }
  }
  toggle(switcher, element) {
    const _this = this;
    switcher.onclick = function () {
      let _self = this,
        iconClose = switcher.dataset.iconClose,
        iconOpen = switcher.dataset.iconOpen;
      if (switcher.getAttribute('aria-expanded') === 'true') {
        if (iconOpen) {
          let icon = switcher.querySelector('i');
          if (icon) {
            if (icon.classList.contains(iconClose)) {
              icon.classList.remove(iconClose);
              icon.classList.add(iconOpen);
            }
          }
        } else {
          switcher.innerHTML = _this.eyeOpen;
        }
        element.setAttribute('type', 'password');
        _self.setAttribute('aria-expanded', 'false');
      } else {
        if (iconClose) {
          let icon = switcher.querySelector('i');
          if (icon) {
            if (icon.classList.contains(iconOpen)) {
              icon.classList.remove(iconOpen);
              icon.classList.add(iconClose);
            }
          }
        } else {
          switcher.innerHTML = _this.eyeClose;
        }
        element.setAttribute('type', 'text');
        _self.setAttribute('aria-expanded', 'true');
      }
    };
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (showPass);

/***/ }),

/***/ "./app/js/util/animation.js":
/*!**********************************!*\
  !*** ./app/js/util/animation.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   toggleSlide: () => (/* binding */ toggleSlide)
/* harmony export */ });
/**
 * getHeight - for elements with display:none
 * @param el
 * @returns {number}
 */
function getHeight(el) {
  let el_style = window.getComputedStyle(el),
    el_display = el_style.display,
    el_position = el_style.position,
    el_visibility = el_style.visibility,
    el_max_height = el_style.maxHeight.replace('px', '').replace('%', ''),
    wanted_height = 0;

  // if it's not hidden we just return normal height
  if (el_display !== 'none' && el_max_height !== '0') {
    return el.offsetHeight;
  }

  // the element is hidden so:
  // making the el block, so we can measure its height but still be hidden
  el.style.position = 'absolute';
  el.style.visibility = 'hidden';
  el.style.display = 'block';
  wanted_height = el.offsetHeight;

  // reverting to the original values
  el.style.display = el_display;
  el.style.position = el_position;
  el.style.visibility = el_visibility;
  return wanted_height;
}

/**
 * toggleSlide mimics the jQuery version of slideDown and slideUp
 * all in one function comparing the max-height to 0
 * @param el
 */
function toggleSlide(el) {
  if (el.getAttribute('data-max-height')) {
    // we've already used this before, so everything is set up
    if (el.style.maxHeight.replace('px', '').replace('%', '') === '0') {
      el.style.maxHeight = el.getAttribute('data-max-height');
    } else {
      el.style.maxHeight = '0';
    }
  } else {
    let el_max_height = getHeight(el) + 'px' || 0;
    el.style['transition'] = 'max-height 0.5s ease-in-out';
    el.style.overflowY = 'hidden';
    el.style.maxHeight = '0';
    el.setAttribute('data-max-height', el_max_height);
    el.style.display = 'block';

    // we use setTimeout to modify maxHeight later than display (to we have the transition effect)
    setTimeout(function () {
      el.style.maxHeight = el_max_height;
    }, 10);
  }
}


/***/ }),

/***/ "./app/js/util/functions.js":
/*!**********************************!*\
  !*** ./app/js/util/functions.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ajax: () => (/* binding */ ajax),
/* harmony export */   collectData: () => (/* binding */ collectData),
/* harmony export */   eventHandler: () => (/* binding */ eventHandler),
/* harmony export */   mergeDeepObject: () => (/* binding */ mergeDeepObject)
/* harmony export */ });
/**
 * Глубокое объединение объектов
 * @param objects
 * @returns {*}
 */
const mergeDeepObject = function (...objects) {
  const isObject = obj => obj && typeof obj === 'object';
  return objects.reduce((prev, obj) => {
    Object.keys(obj).forEach(key => {
      const pVal = prev[key];
      const oVal = obj[key];
      if (Array.isArray(pVal) && Array.isArray(oVal)) {
        prev[key] = pVal.concat(...oVal);
      } else if (isObject(pVal) && isObject(oVal)) {
        prev[key] = mergeDeepObject(pVal, oVal);
      } else {
        prev[key] = oVal;
      }
    });
    return prev;
  }, {});
};

/**
 * Collect Data
 * @param data
 * @param fields
 */
const collectData = function (data, fields) {
  for (let name in fields) {
    if (typeof fields[name] === 'object') {
      for (let key in fields[name]) {
        let arr = Object.keys(fields[name][key]).map(function (i) {
          return fields[name][key][i];
        });
        data.append(name, arr);
      }
    } else {
      data.append(name, fields[name]);
    }
  }
  return data;
};

/**
 * AJAX REQUEST
 * @type {{post: ajax.post, get: ajax.get, x: ((function(): (XMLHttpRequest))|*), send: ajax.send}}
 */
const ajax = {
  x: function () {
    if (typeof XMLHttpRequest !== 'undefined') {
      return new XMLHttpRequest();
    }
    let versions = ["MSXML2.XmlHttp.6.0", "MSXML2.XmlHttp.5.0", "MSXML2.XmlHttp.4.0", "MSXML2.XmlHttp.3.0", "MSXML2.XmlHttp.2.0", "Microsoft.XmlHttp"];
    let xhr;
    for (let i = 0; i < versions.length; i++) {
      try {
        xhr = new ActiveXObject(versions[i]);
        break;
      } catch (e) {}
    }
    return xhr;
  },
  send: function (url, callback, method, data, async) {
    if (async === undefined) {
      async = true;
    }
    let x = ajax.x();
    x.open(method, url, async);
    x.onreadystatechange = function () {
      if (x.readyState === 4) {
        switch (x.status) {
          case 200:
            callback('success', x.responseText);
            break;
          default:
            callback('error', x.responseText);
            break;
        }
      }
    };
    if (method === 'POST') {
      //x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    }
    x.send(data);
  },
  get: function (url, data, callback, async) {
    let query = [];
    for (let key of data) {
      query.push(encodeURIComponent(key[0]) + '=' + encodeURIComponent(key[1]));
    }
    ajax.send(url + (query.length ? '?' + query.join('&') : ''), callback, 'GET', null, async);
  },
  post: function (url, data, callback, async) {
    ajax.send(url, callback, 'POST', data, async);
  }
};

/**
 * EVENTS
 * @type {{on: eventHandler.on}}
 */
const eventHandler = {
  on: function (element, event) {
    const eventSuccess = new CustomEvent(event, {
      bubbles: true
    });
    element.dispatchEvent(eventSuccess);
  }
};


/***/ }),

/***/ "./app/scss/app.scss":
/*!***************************!*\
  !*** ./app/scss/app.scss ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!******************!*\
  !*** ./index.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VGFormSender: () => (/* reexport safe */ _app_js_app__WEBPACK_IMPORTED_MODULE_1__.VGFormSender)
/* harmony export */ });
/* harmony import */ var _app_scss_app_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/scss/app.scss */ "./app/scss/app.scss");
/* harmony import */ var _app_js_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app/js/app */ "./app/js/app.js");



vg = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmdmb3Jtc2VuZGVyLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7OztBQzlCQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBR0E7QUFFQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3RCQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7Ozs7Ozs7O0FDMU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBSUE7QUFHQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FDMUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDL0hBOzs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3ZnLy4vYXBwL2pzL1ZHRm9ybVBsdWdpbnMuanMiLCJ3ZWJwYWNrOi8vdmcvLi9hcHAvanMvVkdGb3JtU2VuZGVyLmpzIiwid2VicGFjazovL3ZnLy4vYXBwL2pzL1ZHU2VuZGVyLmpzIiwid2VicGFjazovL3ZnLy4vYXBwL2pzL2FwcC5qcyIsIndlYnBhY2s6Ly92Zy8uL2FwcC9qcy9wbHVnaW5zL3Nob3dQYXNzL3Nob3dQYXNzLmpzIiwid2VicGFjazovL3ZnLy4vYXBwL2pzL3V0aWwvYW5pbWF0aW9uLmpzIiwid2VicGFjazovL3ZnLy4vYXBwL2pzL3V0aWwvZnVuY3Rpb25zLmpzIiwid2VicGFjazovL3ZnLy4vYXBwL3Njc3MvYXBwLnNjc3MiLCJ3ZWJwYWNrOi8vdmcvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdmcvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3ZnL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdmcvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly92Zy8uL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzaG93UGFzcyBmcm9tIFwiLi9wbHVnaW5zL3Nob3dQYXNzL3Nob3dQYXNzXCI7XG5cbmNsYXNzIFZHRm9ybVBsdWdpbnMge1xuXHRjb25zdHJ1Y3Rvcihmb3Jtc2VuZGVyKSB7XG5cdFx0dGhpcy5wbHVnaW5zID0gZm9ybXNlbmRlci5zZXR0aW5ncy5wbHVnaW5zO1xuXHRcdHRoaXMuZm9ybXNlbmRlciA9IGZvcm1zZW5kZXI7XG5cdH1cblxuXHRpbml0KCkge1xuXHRcdGNvbnN0IF90aGlzID0gdGhpcztcblxuXHRcdGlmIChfdGhpcy5wbHVnaW5zLmxlbmd0aCkge1xuXHRcdFx0Zm9yIChjb25zdCBwbHVnaW4gb2YgX3RoaXMucGx1Z2lucykge1xuXHRcdFx0XHRsZXQgbmFtZU1vZHVsZSA9IE9iamVjdC5rZXlzKHBsdWdpbilbMF07XG5cblx0XHRcdFx0aWYgKHBsdWdpbltuYW1lTW9kdWxlXS5lbmFibGVkKSB7XG5cdFx0XHRcdFx0c3dpdGNoIChuYW1lTW9kdWxlKSB7XG5cdFx0XHRcdFx0XHRjYXNlIFwic2hvd1Bhc3NcIjpcblx0XHRcdFx0XHRcdFx0aWYgKHR5cGVvZiBzaG93UGFzcyAhPT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0XHRcdFx0XHRcdGxldCBtb2R1bGUgPSBuZXcgc2hvd1Bhc3MoX3RoaXMuZm9ybXNlbmRlci5mb3JtLCBwbHVnaW5bbmFtZU1vZHVsZV0ucGFyYW1zKTtcblx0XHRcdFx0XHRcdFx0XHRtb2R1bGUuaW5pdCgpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVkdGb3JtUGx1Z2lucztcbiIsImltcG9ydCBWR1NlbmRlciBmcm9tIFwiLi9WR1NlbmRlclwiO1xyXG5pbXBvcnQge21lcmdlRGVlcE9iamVjdH0gZnJvbSBcIi4vdXRpbC9mdW5jdGlvbnNcIjtcclxuaW1wb3J0IHt0b2dnbGVTbGlkZX0gZnJvbSBcIi4vdXRpbC9hbmltYXRpb25cIjtcclxuXHJcbmNvbnN0IHN2ZyA9ICB7XHJcblx0ZXJyb3I6ICc8c3ZnIHZpZXdib3g9XCIwIDAgNTAwIDUwMFwiIGNsYXNzPVwiYW1fRXJyb3JfSWNvblwiPjxwYXRoIGNsYXNzPVwiYW1fU1ZHX2NpcmNsZVwiIGQ9XCJtNDQ0LjM0NjkzLDExNC4wNzAwN2EyMzYuOTUyNzYsMjM2Ljk1Mjc2IDAgMCAxIDQ0LjE1NTMsMTM3LjczNzQ3YzAsMTI5Ljk3MDA1IC0xMDYuOTQ3NzIsMjM2Ljk2NDQzIC0yMzYuOTE3NzcsMjM2Ljk2NDQzcy0yMzYuOTE3NzcsLTEwNi45NDc3MiAtMjM2LjkxNzc3LC0yMzYuOTE3NzdzMTA2Ljk0NzcyLC0yMzYuOTY0NDMgMjM2LjkxNzc3LC0yMzYuOTY0NDNhMjM2Ljk5OTQxLDIzNi45OTk0MSAwIDAgMSAxNjguNzI1NDgsNzAuNTk0ODNcIj48L3BhdGg+PGxpbmUgY2xhc3M9XCJhbV9TVkdfZXJyb3IxXCIgeTI9XCIzOTBcIiB4Mj1cIjM5MFwiIHkxPVwiMTEwXCIgeDE9XCIxMTBcIj48L2xpbmU+PGxpbmUgY2xhc3M9XCJhbV9TVkdfZXJyb3IyXCIgeTI9XCIzOTBcIiB4Mj1cIjExMFwiIHkxPVwiMTEwXCIgeDE9XCIzOTBcIj48L2xpbmU+PC9zdmc+JyxcclxuXHRzdWNjZXNzOiAnPHN2ZyB2aWV3Ym94PVwiMCAwIDUwMCA1MDBcIiBjbGFzcz1cImFtX1N1Y2Nlc3NfSWNvblwiPjxwYXRoIGNsYXNzPVwiYW1fU1ZHX2NpcmNsZVwiIGQ9XCJtNDQzLjAxMzYsMTE0LjA3MDA3YTIzNi45NTI3NiwyMzYuOTUyNzYgMCAwIDEgNDQuMTU1MywxMzcuNzM3NDdjMCwxMjkuOTcwMDUgLTEwNi45NDc3MiwyMzYuOTY0NDMgLTIzNi45MTc3NywyMzYuOTY0NDNzLTIzNi45MTc3NywtMTA2Ljk0NzcyIC0yMzYuOTE3NzcsLTIzNi45MTc3N3MxMDYuOTQ3NzIsLTIzNi45NjQ0MyAyMzYuOTE3NzcsLTIzNi45NjQ0M2EyMzYuOTk5NDEsMjM2Ljk5OTQxIDAgMCAxIDE2OC43MjU0OCw3MC41OTQ4M1wiPjwvcGF0aD48cG9seWxpbmUgY2xhc3M9XCJhbV9TVkdfY2hlY2tcIiBwb2ludHM9XCIxMDQuNDg5MjM0OTI0MzE2NCwzMDkuMjAwMTY0Nzk0OTIxOSAxOTUuNTc0MDY2MTYyMTA5MzgsNDAyLjk2MDA1MjQ5MDIzNDQgNDE4LjkyOTIyOTczNjMyODEsODUuMDM3MTg1NjY4OTQ1MzEgXCI+PC9wb2x5bGluZT48L3N2Zz4nLFxyXG5cdGNyb3NzOiAnPHN2ZyB2ZXJzaW9uPVwiMS4xXCIgaWQ9XCJDYXBhXzFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgeD1cIjBweFwiIHk9XCIwcHhcIiB2aWV3Qm94PVwiMCAwIDIyNC41MTIgMjI0LjUxMlwiIHN0eWxlPVwiZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyMjQuNTEyIDIyNC41MTI7XCIgeG1sOnNwYWNlPVwicHJlc2VydmVcIj48Zz48cG9seWdvbiBzdHlsZT1cImZpbGw6IzAxMDAwMjtcIiBwb2ludHM9XCIyMjQuNTA3LDYuOTk3IDIxNy41MjEsMCAxMTIuMjU2LDEwNS4yNTggNi45OTgsMCAwLjAwNSw2Ljk5NyAxMDUuMjYzLDExMi4yNTQgMC4wMDUsMjE3LjUxMiA2Ljk5OCwyMjQuNTEyIDExMi4yNTYsMTE5LjI0IDIxNy41MjEsMjI0LjUxMiAyMjQuNTA3LDIxNy41MTIgMTE5LjI0OSwxMTIuMjU0IFwiLz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PC9zdmc+J1xyXG59O1xyXG5cclxuY2xhc3MgVkdGb3JtU2VuZGVyIGV4dGVuZHMgVkdTZW5kZXIge1xyXG5cdGNvbnN0cnVjdG9yKGZvcm0sIGFyZyA9e30pIHtcclxuXHRcdHN1cGVyKGZvcm0sIGFyZyk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fVxyXG5cclxuXHRzdWJtaXQoY2FsbGJhY2spIHtcclxuXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBWR0Zvcm1TZW5kZXJcclxuIiwiaW1wb3J0IHthamF4LCBldmVudEhhbmRsZXIsIGNvbGxlY3REYXRhLCBtZXJnZURlZXBPYmplY3R9IGZyb20gXCIuL3V0aWwvZnVuY3Rpb25zXCI7XHJcbmltcG9ydCBWR0Zvcm1QbHVnaW5zIGZyb20gXCIuL1ZHRm9ybVBsdWdpbnNcIjtcclxuXHJcbmNvbnN0IEVWRU5UX0tFWV9TVUNDRVNTID0gJ3ZnLmZzLnN1Y2Nlc3MnO1xyXG5jb25zdCBFVkVOVF9LRVlfRVJST1IgICA9ICd2Zy5mcy5lcnJvcic7XHJcbmNvbnN0IEVWRU5UX0tFWV9CRUZPUkUgID0gJ3ZnLmZzLmJlZm9yZSc7XHJcblxyXG5jb25zdCBzZXRQYXJhbXMgPSBmdW5jdGlvbiAoZm9ybSwgcGFyYW1zLCBhcmcpIHtcclxuXHRsZXQgbVBhcmFtcyA9IG1lcmdlRGVlcE9iamVjdChwYXJhbXMsIGFyZyk7XHJcblx0bGV0IGRhdGEgPSBbXS5maWx0ZXIuY2FsbChmb3JtLmF0dHJpYnV0ZXMsIGZ1bmN0aW9uKGF0KSB7IHJldHVybiAvXmRhdGEtLy50ZXN0KGF0Lm5hbWUpOyB9KTtcclxuXHJcblx0Zm9yIChsZXQgdmFsIG9mIGRhdGEpIHtcclxuXHRcdGlmICh2YWwubmFtZSA9PT0gJ2RhdGEtYWxlcnQtdHlwZScgJiYgdmFsLnZhbHVlKSBtUGFyYW1zLmFsZXJ0LnBhcmFtcy50eXBlID0gdmFsLnZhbHVlO1xyXG5cdFx0aWYgKHZhbC5uYW1lID09PSAnZGF0YS1hbGVydCcpIG1QYXJhbXMuYWxlcnQgPSB2YWwudmFsdWUgIT09ICdmYWxzZSc7XHJcblx0XHRpZiAodmFsLm5hbWUgPT09ICdkYXRhLXZhbGlkYXRlJykgbVBhcmFtcy52YWxpZGF0ZSA9IHZhbC52YWx1ZSAhPT0gJ2ZhbHNlJztcclxuXHRcdGlmICh2YWwubmFtZSA9PT0gJ2RhdGEtanNvbi1wYXJzZScpIG1QYXJhbXMuanNvblBhcnNlID0gdmFsLnZhbHVlICE9PSAnZmFsc2UnO1xyXG5cdFx0aWYgKHZhbC5uYW1lID09PSAnZGF0YS1yZWRpcmVjdCcgJiYgdmFsLnZhbHVlKSBtUGFyYW1zLnJlZGlyZWN0ID0gdmFsLnZhbHVlO1xyXG5cdFx0aWYgKHZhbC5uYW1lID09PSAnZGF0YS1wbHVnaW5zJyAmJiB2YWwudmFsdWUpIG1QYXJhbXMucGx1Z2lucyA9IGRhdGFQbHVnaW5zKEpTT04ucGFyc2UodmFsLnZhbHVlKSk7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBkYXRhUGx1Z2lucyh2YWx1ZSkge1xyXG5cdFx0bGV0IHAgPSB7fVxyXG5cclxuXHRcdGZvciAoY29uc3QgcGx1Z2luIG9mIHBhcmFtcy5wbHVnaW5zKSB7XHJcblx0XHRcdGxldCBuYW1lUGx1Z2luID0gT2JqZWN0LmtleXMocGx1Z2luKVswXSxcclxuXHRcdFx0XHRuYW1lTW9kdWxlID0gT2JqZWN0LmtleXModmFsdWUpWzBdO1xyXG5cclxuXHRcdFx0aWYgKG5hbWVQbHVnaW4gPT09IG5hbWVNb2R1bGUpIHtcclxuXHRcdFx0XHRwID0gbWVyZ2VEZWVwT2JqZWN0KHBsdWdpbiwgdmFsdWUpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHA7XHJcblx0fVxyXG5cclxuXHRtUGFyYW1zLmFjdGlvbiA9IGZvcm0uZ2V0QXR0cmlidXRlKCdhY3Rpb24nKSB8fCBtUGFyYW1zLmFjdGlvbjtcclxuXHRtUGFyYW1zLm1ldGhvZCA9IGZvcm0uZ2V0QXR0cmlidXRlKCdtZXRob2QnKSB8fCBtUGFyYW1zLm1ldGhvZDtcclxuXHJcblx0cmV0dXJuIG1QYXJhbXNcclxufVxyXG5cclxuY2xhc3MgVkdTZW5kZXIge1xyXG5cdGNvbnN0cnVjdG9yKGZvcm0sIGFyZyA9IHt9KSB7XHJcblx0XHR0aGlzLmV4dEVsZW1lbnQgPSB7fTtcclxuXHRcdHRoaXMuc2V0dGluZ3MgPSB7fTtcclxuXHRcdHRoaXMuZm9ybSA9IG51bGw7XHJcblxyXG5cdFx0Y29uc3QgZGVmYXVsdFBhcmFtcyA9IHtcclxuXHRcdFx0YWN0aW9uOiBsb2NhdGlvbi5ocmVmLFxyXG5cdFx0XHRtZXRob2Q6ICdwb3N0JyxcclxuXHRcdFx0ZmllbGRzOiBbXSxcclxuXHRcdFx0anNvblBhcnNlOiB0cnVlLFxyXG5cdFx0XHRyZWRpcmVjdDogbnVsbCxcclxuXHRcdFx0dmFsaWRhdGU6IGZhbHNlLFxyXG5cdFx0XHRhbGVydDoge1xyXG5cdFx0XHRcdGVuYWJsZWQ6IHRydWUsXHJcblx0XHRcdFx0cGFyYW1zOiB7XHJcblx0XHRcdFx0XHR0eXBlOiAnbW9kYWwnXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fSxcclxuXHRcdFx0cGx1Z2luczogW1xyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdHNob3dQYXNzOiB7XHJcblx0XHRcdFx0XHRcdGVuYWJsZWQ6IHRydWUsXHJcblx0XHRcdFx0XHRcdHBhcmFtczoge31cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdF1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIWZvcm0pIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcign0J/QtdGA0LLRi9C5INC/0LDRgNCw0LzQtdGC0YAg0L3QtSDQtNC+0LvQttC10L0g0LHRi9GC0Ywg0L/Rg9GB0YLRi9C8Jyk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGlmICh0eXBlb2YgZm9ybSA9PT0gJ3N0cmluZycpIHtcclxuXHRcdFx0XHRsZXQgJGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGZvcm0pO1xyXG5cdFx0XHRcdGlmICgkZm9ybSkge1xyXG5cdFx0XHRcdFx0dGhpcy5mb3JtID0gZm9ybTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5mb3JtID0gZm9ybTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHRoaXMuZm9ybSkge1xyXG5cdFx0XHRcdHRoaXMuc2V0dGluZ3MgPSBzZXRQYXJhbXMoZm9ybSwgZGVmYXVsdFBhcmFtcywgYXJnKTtcclxuXHJcblx0XHRcdFx0dGhpcy5jbGFzc2VzID0ge1xyXG5cdFx0XHRcdFx0Z2VuZXJhbDogJ3ZnLWZvcm0tc2VuZGVyJ1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKHRoaXMuc2V0dGluZ3MuZmllbGRzICYmIHR5cGVvZiB0aGlzLnNldHRpbmdzLmZpZWxkcyA9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0XHR0aGlzLnNldHRpbmdzLmZpZWxkcyA9IHRoaXMuc2V0dGluZ3MuZmllbGRzKCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR0aGlzLmluaXQoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0aW5pdCgpIHtcclxuXHRcdGNvbnN0IF90aGlzID0gdGhpcztcclxuXHJcblx0XHRfdGhpcy5mb3JtLmNsYXNzTGlzdC5hZGQoX3RoaXMuY2xhc3Nlcy5nZW5lcmFsKTtcclxuXHJcblx0XHRpZiAoX3RoaXMuc2V0dGluZ3MudmFsaWRhdGUpIHtcclxuXHRcdFx0X3RoaXMuZm9ybS5zZXRBdHRyaWJ1dGUoJ25vdmFsaWRhdGUnLCAnJyk7XHJcblx0XHRcdF90aGlzLmZvcm0uY2xhc3NMaXN0LmFkZCgnbmVlZHMtdmFsaWRhdGlvbicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBidG5TdWJtaXQgPSBfdGhpcy5mb3JtLnF1ZXJ5U2VsZWN0b3IoJ1t0eXBlPVwic3VibWl0XCJdJyk7XHJcblx0XHRpZiAoIWJ0blN1Ym1pdCkgYnRuU3VibWl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2Zvcm09XCInICsgX3RoaXMuZm9ybS5pZCArICdcIl0nKTtcclxuXHRcdF90aGlzLmV4dEVsZW1lbnQuYnV0dG9uID0gYnRuU3VibWl0O1xyXG5cclxuXHRcdGlmICgncGx1Z2lucycgaW4gX3RoaXMuc2V0dGluZ3MpIHtcclxuXHRcdFx0bmV3IFZHRm9ybVBsdWdpbnMoX3RoaXMpLmluaXQoKTtcclxuXHRcdH1cclxuXHJcblx0XHRfdGhpcy5pc0luaXQgPSB0cnVlO1xyXG5cdH1cclxuXHJcblx0c3VibWl0KGNhbGxiYWNrKSB7XHJcblx0XHRpZiAoIXRoaXMuaXNJbml0KSByZXR1cm4gZmFsc2U7XHJcblx0XHRjb25zdCBfdGhpcyA9IHRoaXM7XHJcblxyXG5cdFx0X3RoaXMuZm9ybS5vbnN1Ym1pdCA9IGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRsZXQgZGF0YSA9IG5ldyBGb3JtRGF0YShfdGhpcy5mb3JtKTtcclxuXHJcblx0XHRcdGlmICh0eXBlb2YgX3RoaXMuc2V0dGluZ3MuZmllbGRzID09PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRcdF90aGlzLmRhdGEgPSBjb2xsZWN0RGF0YShkYXRhLCBfdGhpcy5zZXR0aW5ncy5maWVsZHMpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoX3RoaXMuc2V0dGluZ3MudmFsaWRhdGUpIHtcclxuXHRcdFx0XHRpZiAoIV90aGlzLmZvcm0uY2hlY2tWYWxpZGl0eSgpKSB7XHJcblx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG5cdFx0XHRcdFx0X3RoaXMuZm9ybS5jbGFzc0xpc3QuYWRkKCd3YXMtdmFsaWRhdGVkJyk7XHJcblxyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIF90aGlzLnJlcXVlc3QoY2FsbGJhY2ssIGV2ZW50KTtcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRyZXF1ZXN0KGNhbGxiYWNrLCBldmVudCkge1xyXG5cdFx0aWYgKCF0aGlzLmlzSW5pdCkgcmV0dXJuIGZhbHNlO1xyXG5cdFx0Y29uc3QgX3RoaXMgPSB0aGlzO1xyXG5cclxuXHRcdGxldCBtZXRob2QgPSBfdGhpcy5zZXR0aW5ncy5tZXRob2QudG9Mb3dlckNhc2UoKSxcclxuXHRcdFx0dXJsID0gX3RoaXMuc2V0dGluZ3MuYWN0aW9uLFxyXG5cdFx0XHRkYXRhID0gX3RoaXMuZGF0YTtcclxuXHJcblx0XHRpZiAoY2FsbGJhY2sgJiYgJ2JlZm9yZVNlbmQnIGluIGNhbGxiYWNrKSB7XHJcblx0XHRcdGlmICh0eXBlb2YgY2FsbGJhY2suYmVmb3JlU2VuZCA9PT0gJ2Z1bmN0aW9uJykgY2FsbGJhY2suYmVmb3JlU2VuZChldmVudCwgX3RoaXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGV2ZW50SGFuZGxlci5vbihfdGhpcy5mb3JtLCBFVkVOVF9LRVlfQkVGT1JFKTtcclxuXHJcblx0XHRpZiAobWV0aG9kID09PSAncG9zdCcpIHtcclxuXHRcdFx0YWpheC5wb3N0KHVybCwgZGF0YSwgZnVuY3Rpb24oc3RhdHVzLCBkYXRhKSB7XHJcblx0XHRcdFx0YW5zd2VyKHN0YXR1cywgZGF0YSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChtZXRob2QgPT09ICdnZXQnKSB7XHJcblx0XHRcdGFqYXguZ2V0KHVybCwgZGF0YSwgZnVuY3Rpb24oc3RhdHVzLCBkYXRhKSB7XHJcblx0XHRcdFx0YW5zd2VyKHN0YXR1cywgZGF0YSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIGFuc3dlcihzdGF0dXMsIGRhdGEpIHtcclxuXHRcdFx0X3RoaXMuZm9ybS5jbGFzc0xpc3QucmVtb3ZlKCd3YXMtdmFsaWRhdGVkJyk7XHJcblxyXG5cdFx0XHRpZiAodHlwZW9mIHN0YXR1cyA9PT0gJ3N0cmluZycgJiYgc3RhdHVzID09PSAnZXJyb3InKSB7XHJcblx0XHRcdFx0aWYgKGNhbGxiYWNrICYmICdlcnJvcicgaW4gY2FsbGJhY2spIHtcclxuXHRcdFx0XHRcdGlmICh0eXBlb2YgY2FsbGJhY2suZXJyb3IgPT09ICdmdW5jdGlvbicpIGNhbGxiYWNrLmVycm9yKGV2ZW50LCBfdGhpcywgZGF0YSk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRldmVudEhhbmRsZXIub24oX3RoaXMuZm9ybSwgRVZFTlRfS0VZX0VSUk9SKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRpZiAoY2FsbGJhY2sgJiYgJ3N1Y2Nlc3MnIGluIGNhbGxiYWNrKSB7XHJcblx0XHRcdFx0XHRpZiAodHlwZW9mIGNhbGxiYWNrLnN1Y2Nlc3MgPT09ICdmdW5jdGlvbicpIGNhbGxiYWNrLnN1Y2Nlc3MoZXZlbnQsIF90aGlzLCBkYXRhKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGV2ZW50SGFuZGxlci5vbihfdGhpcy5mb3JtLCBFVkVOVF9LRVlfU1VDQ0VTUyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJlZGlyZWN0KCk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gcmVkaXJlY3QoKSB7XHJcblx0XHRcdGlmIChfdGhpcy5zZXR0aW5ncy5yZWRpcmVjdCkge1xyXG5cdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gX3RoaXMuc2V0dGluZ3MucmVkaXJlY3Q7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBWR1NlbmRlcjtcclxuIiwiLyoqXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIEV4cG9ydCBQdWJsaWMgQXBpXHJcbiAqINCQ0LLRgtC+0YA6IFZlZ2FzIFN0dWRpb1xyXG4gKiDQm9C40YbQtdC90LfQuNGPOiDRgdC80L7RgtGA0LggTElDRU5TRVxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKi9cclxuXHJcbmltcG9ydCBWR0Zvcm1TZW5kZXIgZnJvbSBcIi4vVkdGb3JtU2VuZGVyXCI7XHJcblxyXG5leHBvcnQge1xyXG5cdFZHRm9ybVNlbmRlclxyXG59O1xyXG4iLCJjbGFzcyBzaG93UGFzcyB7XG5cdGNvbnN0cnVjdG9yKGZvcm0gPSBudWxsLCBhcmcgPSB7fSkge1xuXHRcdHRoaXMuZm9ybSA9IGZvcm07XG5cdFx0dGhpcy5wYXJhbXMgPSBhcmc7XG5cblx0XHR0aGlzLmV5ZU9wZW4gPSAnPHN2ZyB3aWR0aD1cIjI0cHhcIiBpZD1cInN2Z0V5ZU9wZW5cIiBoZWlnaHQ9XCIyNHB4XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxcbicgK1xuXHRcdFx0JzxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCIgZD1cIk0xMiA4LjI1QzkuOTI4OTMgOC4yNSA4LjI1IDkuOTI4OTMgOC4yNSAxMkM4LjI1IDE0LjA3MTEgOS45Mjg5MyAxNS43NSAxMiAxNS43NUMxNC4wNzExIDE1Ljc1IDE1Ljc1IDE0LjA3MTEgMTUuNzUgMTJDMTUuNzUgOS45Mjg5MyAxNC4wNzExIDguMjUgMTIgOC4yNVpNOS43NSAxMkM5Ljc1IDEwLjc1NzQgMTAuNzU3NCA5Ljc1IDEyIDkuNzVDMTMuMjQyNiA5Ljc1IDE0LjI1IDEwLjc1NzQgMTQuMjUgMTJDMTQuMjUgMTMuMjQyNiAxMy4yNDI2IDE0LjI1IDEyIDE0LjI1QzEwLjc1NzQgMTQuMjUgOS43NSAxMy4yNDI2IDkuNzUgMTJaXCIgZmlsbD1cIiM0OTUwNTdcIi8+XFxuJyArXG5cdFx0XHQnPHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTEyIDMuMjVDNy40ODU4NyAzLjI1IDQuNDQ1MjkgNS45NTQyIDIuNjgwNTcgOC4yNDY4NkwyLjY0ODc0IDguMjg4MkMyLjI0OTY0IDguODA2NTMgMS44ODIwNiA5LjI4MzkyIDEuNjMyNjkgOS44NDg0QzEuMzY1NjQgMTAuNDUyOSAxLjI1IDExLjExMTcgMS4yNSAxMkMxLjI1IDEyLjg4ODMgMS4zNjU2NCAxMy41NDcxIDEuNjMyNjkgMTQuMTUxNkMxLjg4MjA2IDE0LjcxNjEgMi4yNDk2NCAxNS4xOTM1IDIuNjQ4NzUgMTUuNzExOEwyLjY4MDU3IDE1Ljc1MzFDNC40NDUyOSAxOC4wNDU4IDcuNDg1ODcgMjAuNzUgMTIgMjAuNzVDMTYuNTE0MSAyMC43NSAxOS41NTQ3IDE4LjA0NTggMjEuMzE5NCAxNS43NTMxTDIxLjM1MTIgMTUuNzExOEMyMS43NTA0IDE1LjE5MzUgMjIuMTE3OSAxNC43MTYxIDIyLjM2NzMgMTQuMTUxNkMyMi42MzQ0IDEzLjU0NzEgMjIuNzUgMTIuODg4MyAyMi43NSAxMkMyMi43NSAxMS4xMTE3IDIyLjYzNDQgMTAuNDUyOSAyMi4zNjczIDkuODQ4NEMyMi4xMTc5IDkuMjgzOTEgMjEuNzUwNCA4LjgwNjUyIDIxLjM1MTIgOC4yODgxOEwyMS4zMTk0IDguMjQ2ODZDMTkuNTU0NyA1Ljk1NDIgMTYuNTE0MSAzLjI1IDEyIDMuMjVaTTMuODY5MjIgOS4xNjE4QzUuNDk4NjQgNy4wNDQ5MiA4LjE1MDM2IDQuNzUgMTIgNC43NUMxNS44NDk2IDQuNzUgMTguNTAxNCA3LjA0NDkyIDIwLjEzMDggOS4xNjE4QzIwLjU2OTQgOS43MzE1OSAyMC44MjYzIDEwLjA3MjEgMjAuOTk1MiAxMC40NTQ1QzIxLjE1MzIgMTAuODEyIDIxLjI1IDExLjI0ODkgMjEuMjUgMTJDMjEuMjUgMTIuNzUxMSAyMS4xNTMyIDEzLjE4OCAyMC45OTUyIDEzLjU0NTVDMjAuODI2MyAxMy45Mjc5IDIwLjU2OTQgMTQuMjY4NCAyMC4xMzA4IDE0LjgzODJDMTguNTAxNCAxNi45NTUxIDE1Ljg0OTYgMTkuMjUgMTIgMTkuMjVDOC4xNTAzNiAxOS4yNSA1LjQ5ODY0IDE2Ljk1NTEgMy44NjkyMiAxNC44MzgyQzMuNDMwNjQgMTQuMjY4NCAzLjE3Mzc0IDEzLjkyNzkgMy4wMDQ3NiAxMy41NDU1QzIuODQ2ODQgMTMuMTg4IDIuNzUgMTIuNzUxMSAyLjc1IDEyQzIuNzUgMTEuMjQ4OSAyLjg0Njg0IDEwLjgxMiAzLjAwNDc2IDEwLjQ1NDVDMy4xNzM3NCAxMC4wNzIxIDMuNDMwNjMgOS43MzE1OSAzLjg2OTIyIDkuMTYxOFpcIiBmaWxsPVwiIzQ5NTA1N1wiLz5cXG4nICtcblx0XHRcdCc8L3N2Zz4nO1xuXHRcdHRoaXMuZXllQ2xvc2UgPSAnPHN2ZyB3aWR0aD1cIjI0cHhcIiBpZD1cInN2Z0V5ZUNsb3NlXCIgaGVpZ2h0PVwiMjRweFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cXG4nICtcblx0XHRcdCc8cGF0aCBkPVwiTTIuNjg5MzYgNi43MDQ1NkMyLjUyNjE5IDYuMzIzODQgMi4wODUyOCA2LjE0NzQ3IDEuNzA0NTYgNi4zMTA2NEMxLjMyMzg0IDYuNDczODEgMS4xNDc0NyA2LjkxNDcyIDEuMzEwNjQgNy4yOTU0NEwyLjY4OTM2IDYuNzA0NTZaTTE1LjU4NzIgMTMuMzI4N0wxNS4zMTI1IDEyLjYzMDhMMTUuNTg3MiAxMy4zMjg3Wk05LjA0MTQ1IDEzLjczNzdDOS4yNjczNiAxMy4zOTA2IDkuMTY5MDQgMTIuOTI2IDguODIxODUgMTIuNzAwMUM4LjQ3NDY2IDEyLjQ3NDIgOC4wMTAwOCAxMi41NzI1IDcuNzg0MTcgMTIuOTE5N0w5LjA0MTQ1IDEzLjczNzdaTTYuMzcxMzYgMTUuMDkxQzYuMTQ1NDUgMTUuNDM4MSA2LjI0Mzc3IDE1LjkwMjcgNi41OTA5NiAxNi4xMjg2QzYuOTM4MTUgMTYuMzU0NSA3LjQwMjczIDE2LjI1NjIgNy42Mjg2NCAxNS45MDlMNi4zNzEzNiAxNS4wOTFaTTIyLjY4OTQgNy4yOTU0NEMyMi44NTI1IDYuOTE0NzIgMjIuNjc2MiA2LjQ3MzgxIDIyLjI5NTQgNi4zMTA2NEMyMS45MTQ3IDYuMTQ3NDcgMjEuNDczOCA2LjMyMzg0IDIxLjMxMDYgNi43MDQ1NkwyMi42ODk0IDcuMjk1NDRaTTE5IDExLjEyODhMMTguNDg2NyAxMC41ODJWMTAuNTgyTDE5IDExLjEyODhaTTE5Ljk2OTcgMTMuMTU5MkMyMC4yNjI2IDEzLjQ1MjEgMjAuNzM3NCAxMy40NTIxIDIxLjAzMDMgMTMuMTU5MkMyMS4zMjMyIDEyLjg2NjMgMjEuMzIzMiAxMi4zOTE0IDIxLjAzMDMgMTIuMDk4NUwxOS45Njk3IDEzLjE1OTJaTTExLjI1IDE2LjVDMTEuMjUgMTYuOTE0MiAxMS41ODU4IDE3LjI1IDEyIDE3LjI1QzEyLjQxNDIgMTcuMjUgMTIuNzUgMTYuOTE0MiAxMi43NSAxNi41SDExLjI1Wk0xNi4zNzE0IDE1LjkwOUMxNi41OTczIDE2LjI1NjIgMTcuMDYxOSAxNi4zNTQ1IDE3LjQwOSAxNi4xMjg2QzE3Ljc1NjIgMTUuOTAyNyAxNy44NTQ1IDE1LjQzODEgMTcuNjI4NiAxNS4wOTFMMTYuMzcxNCAxNS45MDlaTTUuNTMwMzMgMTEuNjU5MkM1LjgyMzIyIDExLjM2NjMgNS44MjMyMiAxMC44OTE0IDUuNTMwMzMgMTAuNTk4NUM1LjIzNzQ0IDEwLjMwNTYgNC43NjI1NiAxMC4zMDU2IDQuNDY5NjcgMTAuNTk4NUw1LjUzMDMzIDExLjY1OTJaTTIuOTY5NjcgMTIuMDk4NUMyLjY3Njc4IDEyLjM5MTQgMi42NzY3OCAxMi44NjYzIDIuOTY5NjcgMTMuMTU5MkMzLjI2MjU2IDEzLjQ1MjEgMy43Mzc0NCAxMy40NTIxIDQuMDMwMzMgMTMuMTU5MkwyLjk2OTY3IDEyLjA5ODVaTTEyIDEzLjI1QzguNzc2MTEgMTMuMjUgNi40NjEzMyAxMS42NDQ2IDQuOTI0NiA5Ljk4OTY2QzQuMTU2NDUgOS4xNjI0MyAzLjU5MzI1IDguMzMyODQgMy4yMjI1OSA3LjcxMDE0QzMuMDM3NjkgNy4zOTk1IDIuOTAxODcgNy4xNDIzMiAyLjgxMzQgNi45NjUzN0MyLjc2OTE5IDYuODc2OTYgMi43MzY4OSA2LjgwODc1IDIuNzE2MjcgNi43NjQxMUMyLjcwNTk3IDYuNzQxOCAyLjY5ODU5IDYuNzI1NCAyLjY5NDExIDYuNzE1MzNDMi42OTE4NyA2LjcxMDMgMi42OTAzNiA2LjcwNjg0IDIuNjg5NTcgNi43MDUwM0MyLjY4OTE3IDYuNzA0MTMgMi42ODg5NiA2LjcwMzYzIDIuNjg4OTIgNi43MDM1NUMyLjY4ODkxIDYuNzAzNTEgMi42ODg5MyA2LjcwMzU3IDIuNjg5MDEgNi43MDM3NEMyLjY4OTA0IDYuNzAzODIgMi42ODkxMyA2LjcwNDAzIDIuNjg5MTUgNi43MDQwN0MyLjY4OTI1IDYuNzA0MyAyLjY4OTM2IDYuNzA0NTYgMiA3QzEuMzEwNjQgNy4yOTU0NCAxLjMxMDc3IDcuMjk1NzUgMS4zMTA5MiA3LjI5NjA5QzEuMzEwOTggNy4yOTYyNCAxLjMxMTE0IDcuMjk2NiAxLjMxMTI3IDcuMjk2OUMxLjMxMTUyIDcuMjk3NDkgMS4zMTE4MyA3LjI5ODIgMS4zMTIxOCA3LjI5OUMxLjMxMjg3IDcuMzAwNjIgMS4zMTM3NiA3LjMwMjY2IDEuMzE0ODMgNy4zMDUxMkMxLjMxNjk4IDcuMzEwMDMgMS4zMTk4OCA3LjMxNjYyIDEuMzIzNTMgNy4zMjQ4M0MxLjMzMDgzIDcuMzQxMjUgMS4zNDExNSA3LjM2NDE1IDEuMzU0NTMgNy4zOTMxMUMxLjM4MTI3IDcuNDUxMDIgMS40MjAyNiA3LjUzMzIgMS40NzE3NiA3LjYzNjE5QzEuNTc0NjkgNy44NDIwNiAxLjcyNzk0IDguMTMxNzUgMS45MzM2NiA4LjQ3NzM2QzIuMzQ0MjUgOS4xNjcxNiAyLjk2ODU1IDEwLjA4NzYgMy44MjU0IDExLjAxMDNDNS41Mzg2NyAxMi44NTU0IDguMjIzODkgMTQuNzUgMTIgMTQuNzVWMTMuMjVaTTE1LjMxMjUgMTIuNjMwOEMxNC4zNDIxIDEzLjAxMjggMTMuMjQxNyAxMy4yNSAxMiAxMy4yNVYxNC43NUMxMy40MzgyIDE0Ljc1IDE0LjcyNDYgMTQuNDc0MiAxNS44NjE5IDE0LjAyNjZMMTUuMzEyNSAxMi42MzA4Wk03Ljc4NDE3IDEyLjkxOTdMNi4zNzEzNiAxNS4wOTFMNy42Mjg2NCAxNS45MDlMOS4wNDE0NSAxMy43Mzc3TDcuNzg0MTcgMTIuOTE5N1pNMjIgN0MyMS4zMTA2IDYuNzA0NTYgMjEuMzEwNyA2LjcwNDQxIDIxLjMxMDggNi43MDQyN0MyMS4zMTA4IDYuNzA0MjMgMjEuMzEwOCA2LjcwNDEgMjEuMzEwOSA2LjcwNDAyQzIxLjMxMDkgNi43MDM4OCAyMS4zMTEgNi43MDM3NiAyMS4zMTEgNi43MDM2OEMyMS4zMTExIDYuNzAzNTIgMjEuMzExMSA2LjcwMzQ5IDIxLjMxMTEgNi43MDM2QzIxLjMxMSA2LjcwMzggMjEuMzEwNyA2LjcwNDUyIDIxLjMxMDEgNi43MDU3NkMyMS4zMDkgNi43MDgyMyAyMS4zMDcgNi43MTI3NSAyMS4zMDQxIDYuNzE5MjRDMjEuMjk4MyA2LjczMjIzIDIxLjI4ODkgNi43NTMwOSAyMS4yNzU4IDYuNzgxMjVDMjEuMjQ5NSA2LjgzNzU3IDIxLjIwODYgNi45MjI5NSAyMS4xNTI2IDcuMDMyNjdDMjEuMDQwNiA3LjI1MjI3IDIwLjg2OSA3LjU2ODMxIDIwLjYzNTQgNy45NDMyQzIwLjE2NjkgOC42OTUxNiAxOS40NTYzIDkuNjcxOTcgMTguNDg2NyAxMC41ODJMMTkuNTEzMyAxMS42NzU3QzIwLjYwMjMgMTAuNjUzNSAyMS4zOTE3IDkuNTY1ODcgMjEuOTA4NSA4LjczNjQ2QzIyLjE2NzYgOC4zMjA2OCAyMi4zNiA3Ljk2NjggMjIuNDg4OSA3LjcxNDE1QzIyLjU1MzMgNy41ODc3NSAyMi42MDIgNy40ODY0MyAyMi42MzUzIDcuNDE1MDdDMjIuNjUxOSA3LjM3OTM5IDIyLjY2NDcgNy4zNTExOCAyMi42NzM3IDcuMzMxMDRDMjIuNjc4MiA3LjMyMDk3IDIyLjY4MTggNy4zMTI5MiAyMi42ODQ0IDcuMzA2OTZDMjIuNjg1NyA3LjMwMzk4IDIyLjY4NjcgNy4zMDE1MyAyMi42ODc2IDcuMjk5NkMyMi42ODggNy4yOTg2NCAyMi42ODgzIDcuMjk3ODEgMjIuNjg4NiA3LjI5NzEyQzIyLjY4ODggNy4yOTY3NyAyMi42ODg5IDcuMjk2NDYgMjIuNjg5IDcuMjk2MThDMjIuNjg5MSA3LjI5NjA0IDIyLjY4OTIgNy4yOTU4NSAyMi42ODkyIDcuMjk1NzhDMjIuNjg5MyA3LjI5NTYxIDIyLjY4OTQgNy4yOTU0NCAyMiA3Wk0xOC40ODY3IDEwLjU4MkMxNy42Mjc3IDExLjM4ODIgMTYuNTczOSAxMi4xMzQzIDE1LjMxMjUgMTIuNjMwOEwxNS44NjE5IDE0LjAyNjZDMTcuMzM1NSAxMy40NDY2IDE4LjU0NjYgMTIuNTgzIDE5LjUxMzMgMTEuNjc1N0wxOC40ODY3IDEwLjU4MlpNMTguNDY5NyAxMS42NTkyTDE5Ljk2OTcgMTMuMTU5MkwyMS4wMzAzIDEyLjA5ODVMMTkuNTMwMyAxMC41OTg1TDE4LjQ2OTcgMTEuNjU5MlpNMTEuMjUgMTRWMTYuNUgxMi43NVYxNEgxMS4yNVpNMTQuOTU4NiAxMy43Mzc3TDE2LjM3MTQgMTUuOTA5TDE3LjYyODYgMTUuMDkxTDE2LjIxNTggMTIuOTE5N0wxNC45NTg2IDEzLjczNzdaTTQuNDY5NjcgMTAuNTk4NUwyLjk2OTY3IDEyLjA5ODVMNC4wMzAzMyAxMy4xNTkyTDUuNTMwMzMgMTEuNjU5Mkw0LjQ2OTY3IDEwLjU5ODVaXCIgZmlsbD1cIiM0OTUwNTdcIi8+XFxuJyArXG5cdFx0XHQnPC9zdmc+Jztcblx0fVxuXG5cdGluaXQoKSB7XG5cdFx0Y29uc3QgX3RoaXMgPSB0aGlzO1xuXG5cdFx0bGV0IGlucHV0UGFzc3dvcmRzID0gX3RoaXMuZm9ybS5xdWVyeVNlbGVjdG9yQWxsKCdbdHlwZT1cInBhc3N3b3JkXCJdJyk7XG5cdFx0aWYgKGlucHV0UGFzc3dvcmRzLmxlbmd0aCkge1xuXHRcdFx0aW5wdXRQYXNzd29yZHMuZm9yRWFjaChmdW5jdGlvbiAoZWxtKSB7XG5cdFx0XHRcdGxldCBwYXJlbnQgPSBlbG0ucGFyZW50Tm9kZTtcblx0XHRcdFx0aWYgKHBhcmVudCkge1xuXHRcdFx0XHRcdHBhcmVudC5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XG5cblx0XHRcdFx0XHRsZXQgc3dpdGNoZXIgPSBwYXJlbnQucXVlcnlTZWxlY3RvcignW2RhdGEtdmctdG9nZ2xlPVwic2hvdy1wYXNzXCJdJyk7XG5cdFx0XHRcdFx0aWYgKCFzd2l0Y2hlcikge1xuXHRcdFx0XHRcdFx0c3dpdGNoZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cdFx0XHRcdFx0XHRzd2l0Y2hlci5zZXRBdHRyaWJ1dGUoJ2RhdGEtdmctdG9nZ2xlJywgJ3Nob3ctcGFzcycpO1xuXHRcdFx0XHRcdFx0c3dpdGNoZXIuc2V0QXR0cmlidXRlKCd0aXRsZScsICfQn9C+0LrQsNC30LDRgtGMJyk7XG5cdFx0XHRcdFx0XHRzd2l0Y2hlci5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKTtcblx0XHRcdFx0XHRcdHN3aXRjaGVyLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcblx0XHRcdFx0XHRcdHN3aXRjaGVyLnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcblx0XHRcdFx0XHRcdHN3aXRjaGVyLnN0eWxlLndpZHRoID0gJzI0cHgnO1xuXHRcdFx0XHRcdFx0c3dpdGNoZXIuc3R5bGUuaGVpZ2h0ID0gJzI0cHgnO1xuXHRcdFx0XHRcdFx0c3dpdGNoZXIuc3R5bGUudG9wID0gJzUwJSc7XG5cdFx0XHRcdFx0XHRzd2l0Y2hlci5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWSgtNTAlKSc7XG5cdFx0XHRcdFx0XHRzd2l0Y2hlci5zdHlsZS5yaWdodCA9ICcxMnB4Jztcblx0XHRcdFx0XHRcdHN3aXRjaGVyLmlubmVySFRNTCA9IF90aGlzLmV5ZU9wZW47XG5cblx0XHRcdFx0XHRcdHBhcmVudC5hcHBlbmQoc3dpdGNoZXIpXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0X3RoaXMudG9nZ2xlKHN3aXRjaGVyLCBlbG0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHR0b2dnbGUoc3dpdGNoZXIsIGVsZW1lbnQpIHtcblx0XHRjb25zdCBfdGhpcyA9IHRoaXM7XG5cblx0XHRzd2l0Y2hlci5vbmNsaWNrID0gKGZ1bmN0aW9uICgpIHtcblx0XHRcdGxldCBfc2VsZiA9IHRoaXMsXG5cdFx0XHRcdGljb25DbG9zZSA9IHN3aXRjaGVyLmRhdGFzZXQuaWNvbkNsb3NlLFxuXHRcdFx0XHRpY29uT3BlbiA9IHN3aXRjaGVyLmRhdGFzZXQuaWNvbk9wZW47XG5cblx0XHRcdGlmIChzd2l0Y2hlci5nZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnKSA9PT0gJ3RydWUnKSB7XG5cdFx0XHRcdGlmIChpY29uT3Blbikge1xuXHRcdFx0XHRcdGxldCBpY29uID0gc3dpdGNoZXIucXVlcnlTZWxlY3RvcignaScpO1xuXHRcdFx0XHRcdGlmIChpY29uKSB7XG5cdFx0XHRcdFx0XHRpZiAoaWNvbi5jbGFzc0xpc3QuY29udGFpbnMoaWNvbkNsb3NlKSkge1xuXHRcdFx0XHRcdFx0XHRpY29uLmNsYXNzTGlzdC5yZW1vdmUoaWNvbkNsb3NlKTtcblx0XHRcdFx0XHRcdFx0aWNvbi5jbGFzc0xpc3QuYWRkKGljb25PcGVuKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0c3dpdGNoZXIuaW5uZXJIVE1MID0gX3RoaXMuZXllT3BlblxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsZW1lbnQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3Bhc3N3b3JkJyk7XG5cdFx0XHRcdF9zZWxmLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICdmYWxzZScpXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoaWNvbkNsb3NlKSB7XG5cdFx0XHRcdFx0bGV0IGljb24gPSBzd2l0Y2hlci5xdWVyeVNlbGVjdG9yKCdpJyk7XG5cdFx0XHRcdFx0aWYgKGljb24pIHtcblx0XHRcdFx0XHRcdGlmIChpY29uLmNsYXNzTGlzdC5jb250YWlucyhpY29uT3BlbikpIHtcblx0XHRcdFx0XHRcdFx0aWNvbi5jbGFzc0xpc3QucmVtb3ZlKGljb25PcGVuKTtcblx0XHRcdFx0XHRcdFx0aWNvbi5jbGFzc0xpc3QuYWRkKGljb25DbG9zZSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHN3aXRjaGVyLmlubmVySFRNTCA9IF90aGlzLmV5ZUNsb3NlXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRlbGVtZW50LnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0Jyk7XG5cdFx0XHRcdF9zZWxmLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICd0cnVlJylcblx0XHRcdH1cblx0XHR9KTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBzaG93UGFzcztcbiIsIi8qKlxuICogZ2V0SGVpZ2h0IC0gZm9yIGVsZW1lbnRzIHdpdGggZGlzcGxheTpub25lXG4gKiBAcGFyYW0gZWxcbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKi9cbmZ1bmN0aW9uIGdldEhlaWdodChlbCkge1xuXHRsZXQgZWxfc3R5bGUgICAgICA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsKSxcblx0XHRlbF9kaXNwbGF5ICAgID0gZWxfc3R5bGUuZGlzcGxheSxcblx0XHRlbF9wb3NpdGlvbiAgID0gZWxfc3R5bGUucG9zaXRpb24sXG5cdFx0ZWxfdmlzaWJpbGl0eSA9IGVsX3N0eWxlLnZpc2liaWxpdHksXG5cdFx0ZWxfbWF4X2hlaWdodCA9IGVsX3N0eWxlLm1heEhlaWdodC5yZXBsYWNlKCdweCcsICcnKS5yZXBsYWNlKCclJywgJycpLFxuXG5cdFx0d2FudGVkX2hlaWdodCA9IDA7XG5cblxuXHQvLyBpZiBpdCdzIG5vdCBoaWRkZW4gd2UganVzdCByZXR1cm4gbm9ybWFsIGhlaWdodFxuXHRpZiAoZWxfZGlzcGxheSAhPT0gJ25vbmUnICYmIGVsX21heF9oZWlnaHQgIT09ICcwJykge1xuXHRcdHJldHVybiBlbC5vZmZzZXRIZWlnaHQ7XG5cdH1cblxuXHQvLyB0aGUgZWxlbWVudCBpcyBoaWRkZW4gc286XG5cdC8vIG1ha2luZyB0aGUgZWwgYmxvY2ssIHNvIHdlIGNhbiBtZWFzdXJlIGl0cyBoZWlnaHQgYnV0IHN0aWxsIGJlIGhpZGRlblxuXHRlbC5zdHlsZS5wb3NpdGlvbiAgID0gJ2Fic29sdXRlJztcblx0ZWwuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuXHRlbC5zdHlsZS5kaXNwbGF5ICAgID0gJ2Jsb2NrJztcblxuXHR3YW50ZWRfaGVpZ2h0ICAgICA9IGVsLm9mZnNldEhlaWdodDtcblxuXHQvLyByZXZlcnRpbmcgdG8gdGhlIG9yaWdpbmFsIHZhbHVlc1xuXHRlbC5zdHlsZS5kaXNwbGF5ICAgID0gZWxfZGlzcGxheTtcblx0ZWwuc3R5bGUucG9zaXRpb24gICA9IGVsX3Bvc2l0aW9uO1xuXHRlbC5zdHlsZS52aXNpYmlsaXR5ID0gZWxfdmlzaWJpbGl0eTtcblxuXHRyZXR1cm4gd2FudGVkX2hlaWdodDtcbn1cblxuLyoqXG4gKiB0b2dnbGVTbGlkZSBtaW1pY3MgdGhlIGpRdWVyeSB2ZXJzaW9uIG9mIHNsaWRlRG93biBhbmQgc2xpZGVVcFxuICogYWxsIGluIG9uZSBmdW5jdGlvbiBjb21wYXJpbmcgdGhlIG1heC1oZWlnaHQgdG8gMFxuICogQHBhcmFtIGVsXG4gKi9cbmZ1bmN0aW9uIHRvZ2dsZVNsaWRlKGVsKSB7XG5cdGlmIChlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbWF4LWhlaWdodCcpKSB7XG5cdFx0Ly8gd2UndmUgYWxyZWFkeSB1c2VkIHRoaXMgYmVmb3JlLCBzbyBldmVyeXRoaW5nIGlzIHNldCB1cFxuXHRcdGlmIChlbC5zdHlsZS5tYXhIZWlnaHQucmVwbGFjZSgncHgnLCAnJykucmVwbGFjZSgnJScsICcnKSA9PT0gJzAnKSB7XG5cdFx0XHRlbC5zdHlsZS5tYXhIZWlnaHQgPSBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbWF4LWhlaWdodCcpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRlbC5zdHlsZS5tYXhIZWlnaHQgPSAnMCc7XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdGxldCBlbF9tYXhfaGVpZ2h0ICAgICAgID0gZ2V0SGVpZ2h0KGVsKSArICdweCcgfHwgJzAnO1xuXHRcdGVsLnN0eWxlWyd0cmFuc2l0aW9uJ10gICAgICAgICA9ICdtYXgtaGVpZ2h0IDAuNXMgZWFzZS1pbi1vdXQnO1xuXHRcdGVsLnN0eWxlLm92ZXJmbG93WSAgICAgICAgICAgICA9ICdoaWRkZW4nO1xuXHRcdGVsLnN0eWxlLm1heEhlaWdodCAgICAgICAgICAgICA9ICcwJztcblx0XHRlbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtbWF4LWhlaWdodCcsIGVsX21heF9oZWlnaHQpO1xuXHRcdGVsLnN0eWxlLmRpc3BsYXkgICAgICAgICAgICAgICA9ICdibG9jayc7XG5cblx0XHQvLyB3ZSB1c2Ugc2V0VGltZW91dCB0byBtb2RpZnkgbWF4SGVpZ2h0IGxhdGVyIHRoYW4gZGlzcGxheSAodG8gd2UgaGF2ZSB0aGUgdHJhbnNpdGlvbiBlZmZlY3QpXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdGVsLnN0eWxlLm1heEhlaWdodCA9IGVsX21heF9oZWlnaHQ7XG5cdFx0fSwgMTApO1xuXHR9XG59XG5cbmV4cG9ydCB7dG9nZ2xlU2xpZGV9O1xuIiwiLyoqXHJcbiAqINCT0LvRg9Cx0L7QutC+0LUg0L7QsdGK0LXQtNC40L3QtdC90LjQtSDQvtCx0YrQtdC60YLQvtCyXHJcbiAqIEBwYXJhbSBvYmplY3RzXHJcbiAqIEByZXR1cm5zIHsqfVxyXG4gKi9cclxuY29uc3QgbWVyZ2VEZWVwT2JqZWN0ID0gZnVuY3Rpb24gKC4uLm9iamVjdHMpIHtcclxuXHRjb25zdCBpc09iamVjdCA9IG9iaiA9PiBvYmogJiYgdHlwZW9mIG9iaiA9PT0gJ29iamVjdCc7XHJcblxyXG5cdHJldHVybiBvYmplY3RzLnJlZHVjZSgocHJldiwgb2JqKSA9PiB7XHJcblx0XHRPYmplY3Qua2V5cyhvYmopLmZvckVhY2goa2V5ID0+IHtcclxuXHRcdFx0Y29uc3QgcFZhbCA9IHByZXZba2V5XTtcclxuXHRcdFx0Y29uc3Qgb1ZhbCA9IG9ialtrZXldO1xyXG5cclxuXHRcdFx0aWYgKEFycmF5LmlzQXJyYXkocFZhbCkgJiYgQXJyYXkuaXNBcnJheShvVmFsKSkge1xyXG5cdFx0XHRcdHByZXZba2V5XSA9IHBWYWwuY29uY2F0KC4uLm9WYWwpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgaWYgKGlzT2JqZWN0KHBWYWwpICYmIGlzT2JqZWN0KG9WYWwpKSB7XHJcblx0XHRcdFx0cHJldltrZXldID0gbWVyZ2VEZWVwT2JqZWN0KHBWYWwsIG9WYWwpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdHByZXZba2V5XSA9IG9WYWw7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiBwcmV2O1xyXG5cdH0sIHt9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbGxlY3QgRGF0YVxyXG4gKiBAcGFyYW0gZGF0YVxyXG4gKiBAcGFyYW0gZmllbGRzXHJcbiAqL1xyXG5jb25zdCBjb2xsZWN0RGF0YSA9IGZ1bmN0aW9uKGRhdGEsIGZpZWxkcykge1xyXG5cdGZvciAobGV0IG5hbWUgaW4gZmllbGRzKSB7XHJcblx0XHRpZiAodHlwZW9mIGZpZWxkc1tuYW1lXSA9PT0gJ29iamVjdCcpIHtcclxuXHRcdFx0Zm9yIChsZXQga2V5IGluIGZpZWxkc1tuYW1lXSkge1xyXG5cdFx0XHRcdGxldCBhcnIgPSBPYmplY3Qua2V5cyhmaWVsZHNbbmFtZV1ba2V5XSkubWFwKGZ1bmN0aW9uIChpKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gZmllbGRzW25hbWVdW2tleV1baV07XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0ZGF0YS5hcHBlbmQobmFtZSwgYXJyKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0ZGF0YS5hcHBlbmQobmFtZSwgZmllbGRzW25hbWVdKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldHVybiBkYXRhO1xyXG59XHJcblxyXG4vKipcclxuICogQUpBWCBSRVFVRVNUXHJcbiAqIEB0eXBlIHt7cG9zdDogYWpheC5wb3N0LCBnZXQ6IGFqYXguZ2V0LCB4OiAoKGZ1bmN0aW9uKCk6IChYTUxIdHRwUmVxdWVzdCkpfCopLCBzZW5kOiBhamF4LnNlbmR9fVxyXG4gKi9cclxuY29uc3QgYWpheCA9IHtcclxuXHR4OiBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRyZXR1cm4gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcblx0XHR9XHJcblx0XHRsZXQgdmVyc2lvbnMgPSBbXHJcblx0XHRcdFwiTVNYTUwyLlhtbEh0dHAuNi4wXCIsXHJcblx0XHRcdFwiTVNYTUwyLlhtbEh0dHAuNS4wXCIsXHJcblx0XHRcdFwiTVNYTUwyLlhtbEh0dHAuNC4wXCIsXHJcblx0XHRcdFwiTVNYTUwyLlhtbEh0dHAuMy4wXCIsXHJcblx0XHRcdFwiTVNYTUwyLlhtbEh0dHAuMi4wXCIsXHJcblx0XHRcdFwiTWljcm9zb2Z0LlhtbEh0dHBcIlxyXG5cdFx0XTtcclxuXHJcblx0XHRsZXQgeGhyO1xyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB2ZXJzaW9ucy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdHhociA9IG5ldyBBY3RpdmVYT2JqZWN0KHZlcnNpb25zW2ldKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0fSBjYXRjaCAoZSkge31cclxuXHRcdH1cclxuXHRcdHJldHVybiB4aHI7XHJcblx0fSxcclxuXHJcblx0c2VuZDogZnVuY3Rpb24gKHVybCwgY2FsbGJhY2ssIG1ldGhvZCwgZGF0YSwgYXN5bmMpIHtcclxuXHRcdGlmIChhc3luYyA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdGFzeW5jID0gdHJ1ZTtcclxuXHRcdH1cclxuXHRcdGxldCB4ID0gYWpheC54KCk7XHJcblx0XHR4Lm9wZW4obWV0aG9kLCB1cmwsIGFzeW5jKTtcclxuXHRcdHgub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAoeC5yZWFkeVN0YXRlID09PSA0KSB7XHJcblx0XHRcdFx0c3dpdGNoICh4LnN0YXR1cykge1xyXG5cdFx0XHRcdFx0Y2FzZSAyMDA6XHJcblx0XHRcdFx0XHRcdGNhbGxiYWNrKCdzdWNjZXNzJywgeC5yZXNwb25zZVRleHQpXHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRcdFx0Y2FsbGJhY2soJ2Vycm9yJywgeC5yZXNwb25zZVRleHQpXHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHRcdGlmIChtZXRob2QgPT09ICdQT1NUJykge1xyXG5cdFx0XHQvL3guc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcpO1xyXG5cdFx0fVxyXG5cdFx0eC5zZW5kKGRhdGEpXHJcblx0fSxcclxuXHJcblx0Z2V0OiBmdW5jdGlvbiAodXJsLCBkYXRhLCBjYWxsYmFjaywgYXN5bmMpIHtcclxuXHRcdGxldCBxdWVyeSA9IFtdO1xyXG5cdFx0Zm9yIChsZXQga2V5IG9mIGRhdGEpIHtcclxuXHRcdFx0cXVlcnkucHVzaChlbmNvZGVVUklDb21wb25lbnQoa2V5WzBdKSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudChrZXlbMV0pKTtcclxuXHRcdH1cclxuXHRcdGFqYXguc2VuZCh1cmwgKyAocXVlcnkubGVuZ3RoID8gJz8nICsgcXVlcnkuam9pbignJicpIDogJycpLCBjYWxsYmFjaywgJ0dFVCcsIG51bGwsIGFzeW5jKVxyXG5cdH0sXHJcblxyXG5cdHBvc3Q6IGZ1bmN0aW9uICh1cmwsIGRhdGEsIGNhbGxiYWNrLCBhc3luYykge1xyXG5cdFx0YWpheC5zZW5kKHVybCwgY2FsbGJhY2ssICdQT1NUJywgZGF0YSwgYXN5bmMpXHJcblx0fVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEVWRU5UU1xyXG4gKiBAdHlwZSB7e29uOiBldmVudEhhbmRsZXIub259fVxyXG4gKi9cclxuY29uc3QgZXZlbnRIYW5kbGVyID0ge1xyXG5cdG9uOiBmdW5jdGlvbiAoZWxlbWVudCwgZXZlbnQpIHtcclxuXHRcdGNvbnN0IGV2ZW50U3VjY2VzcyA9IG5ldyBDdXN0b21FdmVudChldmVudCwge1xyXG5cdFx0XHRidWJibGVzOiB0cnVlLFxyXG5cdFx0fSk7XHJcblxyXG5cdFx0ZWxlbWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50U3VjY2Vzcyk7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQge21lcmdlRGVlcE9iamVjdCwgY29sbGVjdERhdGEsIGFqYXgsIGV2ZW50SGFuZGxlcn1cclxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuL2FwcC9zY3NzL2FwcC5zY3NzXCI7XHJcbmltcG9ydCB7VkdGb3JtU2VuZGVyfSBmcm9tIFwiLi9hcHAvanMvYXBwXCI7XHJcblxyXG5leHBvcnQge1ZHRm9ybVNlbmRlcn07XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==