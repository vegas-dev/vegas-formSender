var vg;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./app/app.js":
/*!********************!*\
  !*** ./app/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VGFormSender: () => (/* reexport safe */ _js_VGFormSender__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _js_VGFormSender__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/VGFormSender */ "./app/js/VGFormSender.js");
/**
 * --------------------------------------------------------------------------
 * Export Public Api
 * Автор: Vegas Studio
 * Лицензия: смотри LICENSE
 * --------------------------------------------------------------------------
 */




/***/ }),

/***/ "./app/js/VGFormPlugins.js":
/*!*********************************!*\
  !*** ./app/js/VGFormPlugins.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _plugins_showPass_showPass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../plugins/showPass/showPass */ "./app/plugins/showPass/showPass.js");
/* harmony import */ var _plugins_block_divBlock__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../plugins/block/divBlock */ "./app/plugins/block/divBlock.js");
/* harmony import */ var _plugins_modal_VGModal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../plugins/modal/VGModal */ "./app/plugins/modal/VGModal.js");



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
            case "divBlock":
              if (typeof _plugins_block_divBlock__WEBPACK_IMPORTED_MODULE_1__["default"] !== "undefined") {
                let module = new _plugins_block_divBlock__WEBPACK_IMPORTED_MODULE_1__["default"](_this.formsender.form, plugin[nameModule].params);
                module.init();
              }
              break;
            case "VGModal":
              if (typeof _plugins_block_divBlock__WEBPACK_IMPORTED_MODULE_1__["default"] !== "undefined") {
                let module = new _plugins_modal_VGModal__WEBPACK_IMPORTED_MODULE_2__["default"](_this.formsender.form, plugin[nameModule].params);
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
/* harmony import */ var _VGFormPlugins__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VGFormPlugins */ "./app/js/VGFormPlugins.js");


class VGFormSender extends _VGSender__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(form, arg = {}) {
    super(form, arg);
    this.isAlert = this.settings.alert.enabled;
    return this;
  }

  /**
   * Колбеки срабатывают до вызова внутренних действий
   * @param callback
   * @returns {boolean}
   */
  submit(callback) {
    if (!this.isAlert) {
      return super.submit(callback);
    } else {
      const _this = this;
      return super.submit({
        beforeSend: function (event, vgSender) {
          if (callback && 'beforeSend' in callback && typeof callback.beforeSend === 'function') {
            callback.beforeSend(event, vgSender);
          }
          buttonCondition(vgSender, 'beforeSend');
          _this.alert(vgSender, null, 'beforeSend');
        },
        error: function (event, vgSender, data) {
          if (callback && 'error' in callback && typeof callback.error === 'function') {
            callback.error(event, vgSender, data);
          }
          buttonCondition(vgSender);
          jsonParse(data, 'error', vgSender);
        },
        success: function (event, vgSender, data) {
          if (callback && 'success' in callback && typeof callback.success === 'function') {
            callback.success(event, vgSender, data);
          }
          buttonCondition(vgSender);
          jsonParse(data, 'success', vgSender);
        }
      });
      function buttonCondition(vgSender, status = 'default') {
        let btnSubmit = vgSender.extElement.button;
        if (btnSubmit) {
          let btnText = {
            send: 'Отправляем...',
            text: 'Отправить'
          };
          if (btnSubmit.hasAttribute('data-spinner') && status === 'beforeSend') {
            btnSubmit.insertAdjacentHTML('afterbegin', '<span class="spinner-border spinner-border-sm"></span>');
          }
          if (btnSubmit.hasAttribute('data-text')) {
            btnText.text = btnSubmit.getAttribute('data-text');
          } else {
            let $btnText = btnSubmit.querySelector('[data-text]');
            if ($btnText) {
              btnText.text = $btnText.getAttribute('data-text');
              btnSubmit = $btnText;
            }
          }
          if (btnSubmit.hasAttribute('data-text-send')) {
            btnText.send = btnSubmit.getAttribute('data-text-send');
          } else {
            let $btnTextSend = btnSubmit.querySelector('[data-text-send]');
            if ($btnTextSend) {
              btnText.send = $btnTextSend.getAttribute('data-text-send');
              btnSubmit = $btnTextSend;
            }
          }
          if (status === 'beforeSend') {
            btnSubmit.innerHTML = btnText.send;
            btnSubmit.setAttribute('disabled', 'disabled');
          } else {
            btnSubmit.innerHTML = btnText.text;
            btnSubmit.removeAttribute('disabled');
            let spinner = vgSender.extElement.button.querySelector('.spinner-border');
            if (spinner) {
              spinner.remove();
            }
          }
        }
      }
      function jsonParse(data, status, sender) {
        if (_this.settings.isJsonParse && typeof data === 'string') {
          let parserData = {};
          try {
            parserData = JSON.parse(data);
            _this.alert(sender, parserData, status);
          } catch (e) {
            _this.alert(sender, data, status);
          }
        } else {
          _this.alert(sender, data, status);
        }
      }
    }
  }
  alert(vgSender, data, status) {
    if (this.isAlert) {
      let type;
      if (this.settings.alert.params.type === 'block') type = 'divBlock';
      if (this.settings.alert.params.type === 'modal') type = 'VGModal';
      if (type) {
        this.settings.plugins.find(p => p[type])[type].enabled = true;
        this.settings.plugins.find(p => p[type])[type].params = {
          data: data,
          status: status
        };
      }
    }
    if ('plugins' in this.settings) {
      new _VGFormPlugins__WEBPACK_IMPORTED_MODULE_1__["default"](this).init();
    }
  }
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
/* harmony import */ var _util_functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/functions */ "./app/util/functions.js");
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
    if (val.name === 'data-submit') mParams.isSubmit = val.value !== 'false';
    if (val.name === 'data-validate') mParams.isValidate = val.value !== 'false';
    if (val.name === 'data-json-parse') mParams.isJsonParse = val.value !== 'false';
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
      redirect: null,
      isJsonParse: true,
      isValidate: false,
      isSubmit: true,
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
      }, {
        divBlock: {
          enabled: false,
          params: {}
        }
      }, {
        VGModal: {
          enabled: false,
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
    if (_this.settings.isValidate) {
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
      if (_this.settings.isValidate) {
        if (!_this.form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
          _this.form.classList.add('was-validated');
          return false;
        }
      }
      if (!_this.settings.isSubmit) return false;
      let data = new FormData(_this.form);
      if (typeof _this.settings.fields === 'object') {
        _this.data = (0,_util_functions__WEBPACK_IMPORTED_MODULE_0__.collectData)(data, _this.settings.fields);
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

/***/ "./app/plugins/block/divBlock.js":
/*!***************************************!*\
  !*** ./app/plugins/block/divBlock.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util/svg */ "./app/util/svg.js");

class divBlock {
  constructor(form, arg) {
    this.form = form;
    this.params = arg;
    this.classes = {
      container: 'vg-form-sender--alert-block'
    };
  }
  init() {
    const _this = this;
    let el = _this.form.querySelector('.' + _this.classes.container);
    if (!el) el = _this.draw();
    if (_this.params.status === 'beforeSend') {
      if (el.classList.contains('active')) {
        _this.toggleSlide(el);
        el.classList.remove('active');
      }
    } else {
      _this.setActive(el);
      _this.setText(el);
      _this.close(el);
      _this.toggleSlide(el);
    }
  }
  setActive(el) {
    el.classList.add('active');
    let elShow = el.querySelectorAll('.show');
    if (elShow.length) {
      for (const element of elShow) {
        element.classList.remove('show');
      }
    }
  }
  setText(el) {
    const _this = this;
    let data = _this.params.data,
      _class = _this.params.status;
    if ('errors' in data && data.errors || 'error' in data && data.error) _class = 'danger';
    let $alert = el.querySelector('.vg-alert-' + _class);
    if ($alert) {
      let $text = $alert.querySelector('[data-alert-' + _class + '-text]');
      if ($text) {
        if (typeof data === 'string') {
          $text.innerHTML = data;
        } else if ('msg' in data) {
          $text.innerHTML = data.msg;
          let $title = $alert.querySelector('[data-alert-' + _class + '-title]');
          if ($title && 'title' in data) $title.innerHTML = data.title;
        }
      }
      $alert.classList.add('show');
    } else {
      el.innerHTML = data.msg;
    }
  }
  close(el) {
    const _this = this;
    let elClose = el.querySelector('[data-dismiss="alert-block"]');
    if (elClose) {
      elClose.onclick = function () {
        _this.toggleSlide(el);
        el.classList.remove('active');
        return false;
      };
    }
  }
  draw() {
    const _this = this;
    let form = this.form;
    let elFormID = document.querySelector('[data-form="' + form.id + '"]');
    if (elFormID) return elFormID;
    let elBlock = document.createElement('div');
    elBlock.classList.add(_this.classes.container);
    elBlock.innerHTML = '<div class="close"><a href="#" data-dismiss="alert-block">' + (0,_util_svg__WEBPACK_IMPORTED_MODULE_0__.getSvg)('cross') + '</a></div>' + '<div class="vg-alert vg-alert-danger">' + '	<div class="svg-area">' + (0,_util_svg__WEBPACK_IMPORTED_MODULE_0__.getSvg)('error') + '</div>' + '	<div class="content-area">' + '		<div class="title-area" data-alert-danger-title></div>' + '		<div class="text-area" data-alert-danger-text></div>' + '	</div>' + '</div>' + '<div class="vg-alert vg-alert-success">' + '	<div class="svg-area">' + (0,_util_svg__WEBPACK_IMPORTED_MODULE_0__.getSvg)('success') + '</div>' + '	<div class="content-area">' + '		<div class="title-area" data-alert-success-title></div>' + '		<div class="text-area" data-alert-success-text></div>' + '	</div>' + '</div>';
    form.prepend(elBlock);
    return elBlock;
  }
  toggleSlide(el) {
    if (el.getAttribute('data-max-height')) {
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
      setTimeout(function () {
        el.style.maxHeight = el_max_height;
      }, 10);
    }
    function getHeight(el) {
      let el_style = window.getComputedStyle(el),
        el_display = el_style.display,
        el_position = el_style.position,
        el_visibility = el_style.visibility,
        el_max_height = el_style.maxHeight.replace('px', '').replace('%', ''),
        wanted_height = 0;
      if (el_display !== 'none' && el_max_height !== '0') {
        return el.offsetHeight;
      }
      el.style.position = 'absolute';
      el.style.visibility = 'hidden';
      el.style.display = 'block';
      wanted_height = el.offsetHeight;
      el.style.display = el_display;
      el.style.position = el_position;
      el.style.visibility = el_visibility;
      return wanted_height;
    }
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (divBlock);

/***/ }),

/***/ "./app/plugins/modal/VGModal.js":
/*!**************************************!*\
  !*** ./app/plugins/modal/VGModal.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class VGModal {
  constructor(form, arg) {
    this.form = form;
    this.params = arg;
    this.classes = {
      container: 'vg-form-sender--alert-modal'
    };
  }
  init() {
    const _this = this;
  }
  draw() {
    const _this = this;
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (VGModal);

/***/ }),

/***/ "./app/plugins/showPass/showPass.js":
/*!******************************************!*\
  !*** ./app/plugins/showPass/showPass.js ***!
  \******************************************/
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

/***/ "./app/util/functions.js":
/*!*******************************!*\
  !*** ./app/util/functions.js ***!
  \*******************************/
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

/***/ "./app/util/svg.js":
/*!*************************!*\
  !*** ./app/util/svg.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getSvg: () => (/* binding */ getSvg)
/* harmony export */ });
function getSvg(name) {
  const svg = {
    error: '<svg viewbox="0 0 500 500" class="am_Error_Icon"><path class="am_SVG_circle" d="m444.34693,114.07007a236.95276,236.95276 0 0 1 44.1553,137.73747c0,129.97005 -106.94772,236.96443 -236.91777,236.96443s-236.91777,-106.94772 -236.91777,-236.91777s106.94772,-236.96443 236.91777,-236.96443a236.99941,236.99941 0 0 1 168.72548,70.59483"></path><line class="am_SVG_error1" y2="390" x2="390" y1="110" x1="110"></line><line class="am_SVG_error2" y2="390" x2="110" y1="110" x1="390"></line></svg>',
    success: '<svg viewbox="0 0 500 500" class="am_Success_Icon"><path class="am_SVG_circle" d="m443.0136,114.07007a236.95276,236.95276 0 0 1 44.1553,137.73747c0,129.97005 -106.94772,236.96443 -236.91777,236.96443s-236.91777,-106.94772 -236.91777,-236.91777s106.94772,-236.96443 236.91777,-236.96443a236.99941,236.99941 0 0 1 168.72548,70.59483"></path><polyline class="am_SVG_check" points="104.4892349243164,309.2001647949219 195.57406616210938,402.9600524902344 418.9292297363281,85.03718566894531 "></polyline></svg>',
    cross: '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 224.512 224.512" style="enable-background:new 0 0 224.512 224.512;" xml:space="preserve"><g><polygon style="fill:#010002;" points="224.507,6.997 217.521,0 112.256,105.258 6.998,0 0.005,6.997 105.263,112.254 0.005,217.512 6.998,224.512 112.256,119.24 217.521,224.512 224.507,217.512 119.249,112.254 "/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>'
  };
  return svg[name] ?? {};
}


/***/ }),

/***/ "./app/app.scss":
/*!**********************!*\
  !*** ./app/app.scss ***!
  \**********************/
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
/* harmony export */   VGFormSender: () => (/* reexport safe */ _app_app__WEBPACK_IMPORTED_MODULE_1__.VGFormSender)
/* harmony export */ });
/* harmony import */ var _app_app_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.scss */ "./app/app.scss");
/* harmony import */ var _app_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app/app */ "./app/app.js");



vg = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmdmb3Jtc2VuZGVyLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUkE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1Q0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2SUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7Ozs7Ozs7O0FDek5BO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQWdCQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7Ozs7Ozs7QUNoS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFJQTtBQUdBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDL0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ1JBOzs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3ZnLy4vYXBwL2FwcC5qcyIsIndlYnBhY2s6Ly92Zy8uL2FwcC9qcy9WR0Zvcm1QbHVnaW5zLmpzIiwid2VicGFjazovL3ZnLy4vYXBwL2pzL1ZHRm9ybVNlbmRlci5qcyIsIndlYnBhY2s6Ly92Zy8uL2FwcC9qcy9WR1NlbmRlci5qcyIsIndlYnBhY2s6Ly92Zy8uL2FwcC9wbHVnaW5zL2Jsb2NrL2RpdkJsb2NrLmpzIiwid2VicGFjazovL3ZnLy4vYXBwL3BsdWdpbnMvbW9kYWwvVkdNb2RhbC5qcyIsIndlYnBhY2s6Ly92Zy8uL2FwcC9wbHVnaW5zL3Nob3dQYXNzL3Nob3dQYXNzLmpzIiwid2VicGFjazovL3ZnLy4vYXBwL3V0aWwvZnVuY3Rpb25zLmpzIiwid2VicGFjazovL3ZnLy4vYXBwL3V0aWwvc3ZnLmpzIiwid2VicGFjazovL3ZnLy4vYXBwL2FwcC5zY3NzIiwid2VicGFjazovL3ZnL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3ZnL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly92Zy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3ZnL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdmcvLi9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogRXhwb3J0IFB1YmxpYyBBcGlcclxuICog0JDQstGC0L7RgDogVmVnYXMgU3R1ZGlvXHJcbiAqINCb0LjRhtC10L3Qt9C40Y86INGB0LzQvtGC0YDQuCBMSUNFTlNFXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqL1xyXG5cclxuaW1wb3J0IFZHRm9ybVNlbmRlciBmcm9tIFwiLi9qcy9WR0Zvcm1TZW5kZXJcIjtcclxuXHJcbmV4cG9ydCB7XHJcblx0VkdGb3JtU2VuZGVyXHJcbn07XHJcbiIsImltcG9ydCBzaG93UGFzcyBmcm9tIFwiLi4vcGx1Z2lucy9zaG93UGFzcy9zaG93UGFzc1wiO1xuaW1wb3J0IGRpdkJsb2NrIGZyb20gXCIuLi9wbHVnaW5zL2Jsb2NrL2RpdkJsb2NrXCI7XG5pbXBvcnQgVkdNb2RhbCAgZnJvbSBcIi4uL3BsdWdpbnMvbW9kYWwvVkdNb2RhbFwiO1xuXG5jbGFzcyBWR0Zvcm1QbHVnaW5zIHtcblx0Y29uc3RydWN0b3IoZm9ybXNlbmRlcikge1xuXHRcdHRoaXMucGx1Z2lucyA9IGZvcm1zZW5kZXIuc2V0dGluZ3MucGx1Z2lucztcblx0XHR0aGlzLmZvcm1zZW5kZXIgPSBmb3Jtc2VuZGVyO1xuXHR9XG5cblx0aW5pdCgpIHtcblx0XHRjb25zdCBfdGhpcyA9IHRoaXM7XG5cblx0XHRpZiAoX3RoaXMucGx1Z2lucy5sZW5ndGgpIHtcblx0XHRcdGZvciAoY29uc3QgcGx1Z2luIG9mIF90aGlzLnBsdWdpbnMpIHtcblx0XHRcdFx0bGV0IG5hbWVNb2R1bGUgPSBPYmplY3Qua2V5cyhwbHVnaW4pWzBdO1xuXG5cdFx0XHRcdGlmIChwbHVnaW5bbmFtZU1vZHVsZV0uZW5hYmxlZCkge1xuXHRcdFx0XHRcdHN3aXRjaCAobmFtZU1vZHVsZSkge1xuXHRcdFx0XHRcdFx0Y2FzZSBcInNob3dQYXNzXCI6XG5cdFx0XHRcdFx0XHRcdGlmICh0eXBlb2Ygc2hvd1Bhc3MgIT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdFx0XHRcdFx0XHRsZXQgbW9kdWxlID0gbmV3IHNob3dQYXNzKF90aGlzLmZvcm1zZW5kZXIuZm9ybSwgcGx1Z2luW25hbWVNb2R1bGVdLnBhcmFtcyk7XG5cdFx0XHRcdFx0XHRcdFx0bW9kdWxlLmluaXQoKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRjYXNlIFwiZGl2QmxvY2tcIjpcblx0XHRcdFx0XHRcdFx0aWYgKHR5cGVvZiBkaXZCbG9jayAhPT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0XHRcdFx0XHRcdGxldCBtb2R1bGUgPSBuZXcgZGl2QmxvY2soX3RoaXMuZm9ybXNlbmRlci5mb3JtLCBwbHVnaW5bbmFtZU1vZHVsZV0ucGFyYW1zKTtcblx0XHRcdFx0XHRcdFx0XHRtb2R1bGUuaW5pdCgpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdGNhc2UgXCJWR01vZGFsXCI6XG5cdFx0XHRcdFx0XHRcdGlmICh0eXBlb2YgZGl2QmxvY2sgIT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdFx0XHRcdFx0XHRsZXQgbW9kdWxlID0gbmV3IFZHTW9kYWwoX3RoaXMuZm9ybXNlbmRlci5mb3JtLCBwbHVnaW5bbmFtZU1vZHVsZV0ucGFyYW1zKTtcblx0XHRcdFx0XHRcdFx0XHRtb2R1bGUuaW5pdCgpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVkdGb3JtUGx1Z2lucztcbiIsImltcG9ydCBWR1NlbmRlciBmcm9tIFwiLi9WR1NlbmRlclwiO1xyXG5pbXBvcnQgVkdGb3JtUGx1Z2lucyBmcm9tIFwiLi9WR0Zvcm1QbHVnaW5zXCI7XHJcblxyXG5jbGFzcyBWR0Zvcm1TZW5kZXIgZXh0ZW5kcyBWR1NlbmRlciB7XHJcblx0Y29uc3RydWN0b3IoZm9ybSwgYXJnID17fSkge1xyXG5cdFx0c3VwZXIoZm9ybSwgYXJnKTtcclxuXHJcblx0XHR0aGlzLmlzQWxlcnQgPSB0aGlzLnNldHRpbmdzLmFsZXJ0LmVuYWJsZWQ7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiDQmtC+0LvQsdC10LrQuCDRgdGA0LDQsdCw0YLRi9Cy0LDRjtGCINC00L4g0LLRi9C30L7QstCwINCy0L3Rg9GC0YDQtdC90L3QuNGFINC00LXQudGB0YLQstC40LlcclxuXHQgKiBAcGFyYW0gY2FsbGJhY2tcclxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuXHQgKi9cclxuXHRzdWJtaXQoY2FsbGJhY2spIHtcclxuXHRcdGlmICghdGhpcy5pc0FsZXJ0KSB7XHJcblx0XHRcdHJldHVybiBzdXBlci5zdWJtaXQoY2FsbGJhY2spO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y29uc3QgX3RoaXMgPSB0aGlzO1xyXG5cclxuXHRcdFx0cmV0dXJuIHN1cGVyLnN1Ym1pdCh7XHJcblx0XHRcdFx0YmVmb3JlU2VuZDogZnVuY3Rpb24gKGV2ZW50LCB2Z1NlbmRlcikge1xyXG5cdFx0XHRcdFx0aWYgKGNhbGxiYWNrICYmICdiZWZvcmVTZW5kJyBpbiBjYWxsYmFjayAmJiB0eXBlb2YgY2FsbGJhY2suYmVmb3JlU2VuZCA9PT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdFx0XHRjYWxsYmFjay5iZWZvcmVTZW5kKGV2ZW50LCB2Z1NlbmRlcik7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0YnV0dG9uQ29uZGl0aW9uKHZnU2VuZGVyLCAnYmVmb3JlU2VuZCcpO1xyXG5cdFx0XHRcdFx0X3RoaXMuYWxlcnQodmdTZW5kZXIsIG51bGwsICdiZWZvcmVTZW5kJyk7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRlcnJvcjogZnVuY3Rpb24gKGV2ZW50LCB2Z1NlbmRlciwgZGF0YSkge1xyXG5cdFx0XHRcdFx0aWYgKGNhbGxiYWNrICYmICdlcnJvcicgaW4gY2FsbGJhY2sgJiYgdHlwZW9mIGNhbGxiYWNrLmVycm9yID09PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0XHRcdGNhbGxiYWNrLmVycm9yKGV2ZW50LCB2Z1NlbmRlciwgZGF0YSk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0YnV0dG9uQ29uZGl0aW9uKHZnU2VuZGVyKTtcclxuXHRcdFx0XHRcdGpzb25QYXJzZShkYXRhLCAnZXJyb3InLCB2Z1NlbmRlcik7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbiAoZXZlbnQsIHZnU2VuZGVyLCBkYXRhKSB7XHJcblx0XHRcdFx0XHRpZiAoY2FsbGJhY2sgJiYgJ3N1Y2Nlc3MnIGluIGNhbGxiYWNrICYmIHR5cGVvZiBjYWxsYmFjay5zdWNjZXNzID09PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0XHRcdGNhbGxiYWNrLnN1Y2Nlc3MoZXZlbnQsIHZnU2VuZGVyLCBkYXRhKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRidXR0b25Db25kaXRpb24odmdTZW5kZXIpO1xyXG5cdFx0XHRcdFx0anNvblBhcnNlKGRhdGEsICdzdWNjZXNzJywgdmdTZW5kZXIpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRmdW5jdGlvbiBidXR0b25Db25kaXRpb24odmdTZW5kZXIsIHN0YXR1cyA9ICdkZWZhdWx0Jykge1xyXG5cdFx0XHRcdGxldCBidG5TdWJtaXQgPSB2Z1NlbmRlci5leHRFbGVtZW50LmJ1dHRvbjtcclxuXHRcdFx0XHRpZiAoYnRuU3VibWl0KSB7XHJcblx0XHRcdFx0XHRsZXQgYnRuVGV4dCA9IHtcclxuXHRcdFx0XHRcdFx0c2VuZDogJ9Ce0YLQv9GA0LDQstC70Y/QtdC8Li4uJyxcclxuXHRcdFx0XHRcdFx0dGV4dDogJ9Ce0YLQv9GA0LDQstC40YLRjCdcclxuXHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0aWYgKGJ0blN1Ym1pdC5oYXNBdHRyaWJ1dGUoJ2RhdGEtc3Bpbm5lcicpICYmIHN0YXR1cyA9PT0gJ2JlZm9yZVNlbmQnKSB7XHJcblx0XHRcdFx0XHRcdGJ0blN1Ym1pdC5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyYmVnaW4nLCAnPHNwYW4gY2xhc3M9XCJzcGlubmVyLWJvcmRlciBzcGlubmVyLWJvcmRlci1zbVwiPjwvc3Bhbj4nKVxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGlmIChidG5TdWJtaXQuaGFzQXR0cmlidXRlKCdkYXRhLXRleHQnKSkge1xyXG5cdFx0XHRcdFx0XHRidG5UZXh0LnRleHQgPSBidG5TdWJtaXQuZ2V0QXR0cmlidXRlKCdkYXRhLXRleHQnKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdGxldCAkYnRuVGV4dCA9IGJ0blN1Ym1pdC5xdWVyeVNlbGVjdG9yKCdbZGF0YS10ZXh0XScpO1xyXG5cdFx0XHRcdFx0XHRpZiAoJGJ0blRleHQpIHtcclxuXHRcdFx0XHRcdFx0XHRidG5UZXh0LnRleHQgPSAkYnRuVGV4dC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGV4dCcpO1xyXG5cdFx0XHRcdFx0XHRcdGJ0blN1Ym1pdCA9ICRidG5UZXh0O1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0aWYgKGJ0blN1Ym1pdC5oYXNBdHRyaWJ1dGUoJ2RhdGEtdGV4dC1zZW5kJykpIHtcclxuXHRcdFx0XHRcdFx0YnRuVGV4dC5zZW5kID0gYnRuU3VibWl0LmdldEF0dHJpYnV0ZSgnZGF0YS10ZXh0LXNlbmQnKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdGxldCAkYnRuVGV4dFNlbmQgPSBidG5TdWJtaXQucXVlcnlTZWxlY3RvcignW2RhdGEtdGV4dC1zZW5kXScpO1xyXG5cdFx0XHRcdFx0XHRpZiAoJGJ0blRleHRTZW5kKSB7XHJcblx0XHRcdFx0XHRcdFx0YnRuVGV4dC5zZW5kID0gJGJ0blRleHRTZW5kLmdldEF0dHJpYnV0ZSgnZGF0YS10ZXh0LXNlbmQnKTtcclxuXHRcdFx0XHRcdFx0XHRidG5TdWJtaXQgPSAkYnRuVGV4dFNlbmQ7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRpZiAoc3RhdHVzID09PSAnYmVmb3JlU2VuZCcpIHtcclxuXHRcdFx0XHRcdFx0YnRuU3VibWl0LmlubmVySFRNTCA9IGJ0blRleHQuc2VuZDtcclxuXHRcdFx0XHRcdFx0YnRuU3VibWl0LnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdGJ0blN1Ym1pdC5pbm5lckhUTUwgPSBidG5UZXh0LnRleHQ7XHJcblx0XHRcdFx0XHRcdGJ0blN1Ym1pdC5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XHJcblxyXG5cdFx0XHRcdFx0XHRsZXQgc3Bpbm5lciA9IHZnU2VuZGVyLmV4dEVsZW1lbnQuYnV0dG9uLnF1ZXJ5U2VsZWN0b3IoJy5zcGlubmVyLWJvcmRlcicpO1xyXG5cdFx0XHRcdFx0XHRpZiAoc3Bpbm5lcikge1xyXG5cdFx0XHRcdFx0XHRcdHNwaW5uZXIucmVtb3ZlKCk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGZ1bmN0aW9uIGpzb25QYXJzZShkYXRhLCBzdGF0dXMsIHNlbmRlcikge1xyXG5cdFx0XHRcdGlmIChfdGhpcy5zZXR0aW5ncy5pc0pzb25QYXJzZSAmJiB0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcclxuXHRcdFx0XHRcdGxldCBwYXJzZXJEYXRhID0ge307XHJcblxyXG5cdFx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdFx0cGFyc2VyRGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XHJcblx0XHRcdFx0XHRcdF90aGlzLmFsZXJ0KHNlbmRlciwgcGFyc2VyRGF0YSwgc3RhdHVzKTtcclxuXHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRcdFx0X3RoaXMuYWxlcnQoc2VuZGVyLCBkYXRhLCBzdGF0dXMpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRfdGhpcy5hbGVydChzZW5kZXIsIGRhdGEsIHN0YXR1cyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhbGVydCh2Z1NlbmRlciwgZGF0YSwgc3RhdHVzKSB7XHJcblx0XHRpZiAodGhpcy5pc0FsZXJ0KSB7XHJcblx0XHRcdGxldCB0eXBlO1xyXG5cdFx0XHRpZiAodGhpcy5zZXR0aW5ncy5hbGVydC5wYXJhbXMudHlwZSA9PT0gJ2Jsb2NrJykgdHlwZSA9ICdkaXZCbG9jayc7XHJcblx0XHRcdGlmICh0aGlzLnNldHRpbmdzLmFsZXJ0LnBhcmFtcy50eXBlID09PSAnbW9kYWwnKSB0eXBlID0gJ1ZHTW9kYWwnO1xyXG5cclxuXHRcdFx0aWYgKHR5cGUpIHtcclxuXHRcdFx0XHR0aGlzLnNldHRpbmdzLnBsdWdpbnMuZmluZChwID0+IHBbdHlwZV0pW3R5cGVdLmVuYWJsZWQgPSB0cnVlO1xyXG5cdFx0XHRcdHRoaXMuc2V0dGluZ3MucGx1Z2lucy5maW5kKHAgPT4gcFt0eXBlXSlbdHlwZV0ucGFyYW1zID0ge1xyXG5cdFx0XHRcdFx0ZGF0YTogZGF0YSxcclxuXHRcdFx0XHRcdHN0YXR1czogc3RhdHVzXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmICgncGx1Z2lucycgaW4gdGhpcy5zZXR0aW5ncykge1xyXG5cdFx0XHRuZXcgVkdGb3JtUGx1Z2lucyh0aGlzKS5pbml0KCk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBWR0Zvcm1TZW5kZXJcclxuIiwiaW1wb3J0IHthamF4LCBldmVudEhhbmRsZXIsIGNvbGxlY3REYXRhLCBtZXJnZURlZXBPYmplY3R9IGZyb20gXCIuLi91dGlsL2Z1bmN0aW9uc1wiO1xyXG5pbXBvcnQgVkdGb3JtUGx1Z2lucyBmcm9tIFwiLi9WR0Zvcm1QbHVnaW5zXCI7XHJcblxyXG5jb25zdCBFVkVOVF9LRVlfU1VDQ0VTUyA9ICd2Zy5mcy5zdWNjZXNzJztcclxuY29uc3QgRVZFTlRfS0VZX0VSUk9SICAgPSAndmcuZnMuZXJyb3InO1xyXG5jb25zdCBFVkVOVF9LRVlfQkVGT1JFICA9ICd2Zy5mcy5iZWZvcmUnO1xyXG5cclxuY29uc3Qgc2V0UGFyYW1zID0gZnVuY3Rpb24gKGZvcm0sIHBhcmFtcywgYXJnKSB7XHJcblx0bGV0IG1QYXJhbXMgPSBtZXJnZURlZXBPYmplY3QocGFyYW1zLCBhcmcpO1xyXG5cdGxldCBkYXRhID0gW10uZmlsdGVyLmNhbGwoZm9ybS5hdHRyaWJ1dGVzLCBmdW5jdGlvbihhdCkgeyByZXR1cm4gL15kYXRhLS8udGVzdChhdC5uYW1lKTsgfSk7XHJcblxyXG5cdGZvciAobGV0IHZhbCBvZiBkYXRhKSB7XHJcblx0XHRpZiAodmFsLm5hbWUgPT09ICdkYXRhLWFsZXJ0LXR5cGUnICYmIHZhbC52YWx1ZSkgbVBhcmFtcy5hbGVydC5wYXJhbXMudHlwZSA9IHZhbC52YWx1ZTtcclxuXHRcdGlmICh2YWwubmFtZSA9PT0gJ2RhdGEtYWxlcnQnKSBtUGFyYW1zLmFsZXJ0ID0gdmFsLnZhbHVlICE9PSAnZmFsc2UnO1xyXG5cdFx0aWYgKHZhbC5uYW1lID09PSAnZGF0YS1zdWJtaXQnKSBtUGFyYW1zLmlzU3VibWl0ID0gdmFsLnZhbHVlICE9PSAnZmFsc2UnO1xyXG5cdFx0aWYgKHZhbC5uYW1lID09PSAnZGF0YS12YWxpZGF0ZScpIG1QYXJhbXMuaXNWYWxpZGF0ZSA9IHZhbC52YWx1ZSAhPT0gJ2ZhbHNlJztcclxuXHRcdGlmICh2YWwubmFtZSA9PT0gJ2RhdGEtanNvbi1wYXJzZScpIG1QYXJhbXMuaXNKc29uUGFyc2UgPSB2YWwudmFsdWUgIT09ICdmYWxzZSc7XHJcblx0XHRpZiAodmFsLm5hbWUgPT09ICdkYXRhLXJlZGlyZWN0JyAmJiB2YWwudmFsdWUpIG1QYXJhbXMucmVkaXJlY3QgPSB2YWwudmFsdWU7XHJcblx0XHRpZiAodmFsLm5hbWUgPT09ICdkYXRhLXBsdWdpbnMnICYmIHZhbC52YWx1ZSkgbVBhcmFtcy5wbHVnaW5zID0gZGF0YVBsdWdpbnMoSlNPTi5wYXJzZSh2YWwudmFsdWUpKTtcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGRhdGFQbHVnaW5zKHZhbHVlKSB7XHJcblx0XHRsZXQgcCA9IHt9XHJcblxyXG5cdFx0Zm9yIChjb25zdCBwbHVnaW4gb2YgcGFyYW1zLnBsdWdpbnMpIHtcclxuXHRcdFx0bGV0IG5hbWVQbHVnaW4gPSBPYmplY3Qua2V5cyhwbHVnaW4pWzBdLFxyXG5cdFx0XHRcdG5hbWVNb2R1bGUgPSBPYmplY3Qua2V5cyh2YWx1ZSlbMF07XHJcblxyXG5cdFx0XHRpZiAobmFtZVBsdWdpbiA9PT0gbmFtZU1vZHVsZSkge1xyXG5cdFx0XHRcdHAgPSBtZXJnZURlZXBPYmplY3QocGx1Z2luLCB2YWx1ZSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcDtcclxuXHR9XHJcblxyXG5cdG1QYXJhbXMuYWN0aW9uID0gZm9ybS5nZXRBdHRyaWJ1dGUoJ2FjdGlvbicpIHx8IG1QYXJhbXMuYWN0aW9uO1xyXG5cdG1QYXJhbXMubWV0aG9kID0gZm9ybS5nZXRBdHRyaWJ1dGUoJ21ldGhvZCcpIHx8IG1QYXJhbXMubWV0aG9kO1xyXG5cclxuXHRyZXR1cm4gbVBhcmFtc1xyXG59XHJcblxyXG5jbGFzcyBWR1NlbmRlciB7XHJcblx0Y29uc3RydWN0b3IoZm9ybSwgYXJnID0ge30pIHtcclxuXHRcdHRoaXMuZXh0RWxlbWVudCA9IHt9O1xyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IHt9O1xyXG5cdFx0dGhpcy5mb3JtID0gbnVsbDtcclxuXHJcblx0XHRjb25zdCBkZWZhdWx0UGFyYW1zID0ge1xyXG5cdFx0XHRhY3Rpb246IGxvY2F0aW9uLmhyZWYsXHJcblx0XHRcdG1ldGhvZDogJ3Bvc3QnLFxyXG5cdFx0XHRmaWVsZHM6IFtdLFxyXG5cdFx0XHRyZWRpcmVjdDogbnVsbCxcclxuXHRcdFx0aXNKc29uUGFyc2U6IHRydWUsXHJcblx0XHRcdGlzVmFsaWRhdGU6IGZhbHNlLFxyXG5cdFx0XHRpc1N1Ym1pdDogdHJ1ZSxcclxuXHRcdFx0YWxlcnQ6IHtcclxuXHRcdFx0XHRlbmFibGVkOiB0cnVlLFxyXG5cdFx0XHRcdHBhcmFtczoge1xyXG5cdFx0XHRcdFx0dHlwZTogJ21vZGFsJ1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH0sXHJcblx0XHRcdHBsdWdpbnM6IFtcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRzaG93UGFzczoge1xyXG5cdFx0XHRcdFx0XHRlbmFibGVkOiB0cnVlLFxyXG5cdFx0XHRcdFx0XHRwYXJhbXM6IHt9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRkaXZCbG9jazoge1xyXG5cdFx0XHRcdFx0XHRlbmFibGVkOiBmYWxzZSxcclxuXHRcdFx0XHRcdFx0cGFyYW1zOiB7fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0VkdNb2RhbDoge1xyXG5cdFx0XHRcdFx0XHRlbmFibGVkOiBmYWxzZSxcclxuXHRcdFx0XHRcdFx0cGFyYW1zOiB7fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghZm9ybSkge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKCfQn9C10YDQstGL0Lkg0L/QsNGA0LDQvNC10YLRgCDQvdC1INC00L7Qu9C20LXQvSDQsdGL0YLRjCDQv9GD0YHRgtGL0LwnKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aWYgKHR5cGVvZiBmb3JtID09PSAnc3RyaW5nJykge1xyXG5cdFx0XHRcdGxldCAkZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZm9ybSk7XHJcblx0XHRcdFx0aWYgKCRmb3JtKSB7XHJcblx0XHRcdFx0XHR0aGlzLmZvcm0gPSBmb3JtO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLmZvcm0gPSBmb3JtO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAodGhpcy5mb3JtKSB7XHJcblx0XHRcdFx0dGhpcy5zZXR0aW5ncyA9IHNldFBhcmFtcyhmb3JtLCBkZWZhdWx0UGFyYW1zLCBhcmcpO1xyXG5cclxuXHRcdFx0XHR0aGlzLmNsYXNzZXMgPSB7XHJcblx0XHRcdFx0XHRnZW5lcmFsOiAndmctZm9ybS1zZW5kZXInXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAodGhpcy5zZXR0aW5ncy5maWVsZHMgJiYgdHlwZW9mIHRoaXMuc2V0dGluZ3MuZmllbGRzID09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0XHRcdHRoaXMuc2V0dGluZ3MuZmllbGRzID0gdGhpcy5zZXR0aW5ncy5maWVsZHMoKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHRoaXMuaW5pdCgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRpbml0KCkge1xyXG5cdFx0Y29uc3QgX3RoaXMgPSB0aGlzO1xyXG5cclxuXHRcdF90aGlzLmZvcm0uY2xhc3NMaXN0LmFkZChfdGhpcy5jbGFzc2VzLmdlbmVyYWwpO1xyXG5cclxuXHRcdGlmIChfdGhpcy5zZXR0aW5ncy5pc1ZhbGlkYXRlKSB7XHJcblx0XHRcdF90aGlzLmZvcm0uc2V0QXR0cmlidXRlKCdub3ZhbGlkYXRlJywgJycpO1xyXG5cdFx0XHRfdGhpcy5mb3JtLmNsYXNzTGlzdC5hZGQoJ25lZWRzLXZhbGlkYXRpb24nKTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgYnRuU3VibWl0ID0gX3RoaXMuZm9ybS5xdWVyeVNlbGVjdG9yKCdbdHlwZT1cInN1Ym1pdFwiXScpO1xyXG5cdFx0aWYgKCFidG5TdWJtaXQpIGJ0blN1Ym1pdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tmb3JtPVwiJyArIF90aGlzLmZvcm0uaWQgKyAnXCJdJyk7XHJcblx0XHRfdGhpcy5leHRFbGVtZW50LmJ1dHRvbiA9IGJ0blN1Ym1pdDtcclxuXHJcblx0XHRpZiAoJ3BsdWdpbnMnIGluIF90aGlzLnNldHRpbmdzKSB7XHJcblx0XHRcdG5ldyBWR0Zvcm1QbHVnaW5zKF90aGlzKS5pbml0KCk7XHJcblx0XHR9XHJcblxyXG5cdFx0X3RoaXMuaXNJbml0ID0gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdHN1Ym1pdChjYWxsYmFjaykge1xyXG5cdFx0aWYgKCF0aGlzLmlzSW5pdCkgcmV0dXJuIGZhbHNlO1xyXG5cdFx0Y29uc3QgX3RoaXMgPSB0aGlzO1xyXG5cclxuXHRcdF90aGlzLmZvcm0ub25zdWJtaXQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0aWYgKF90aGlzLnNldHRpbmdzLmlzVmFsaWRhdGUpIHtcclxuXHRcdFx0XHRpZiAoIV90aGlzLmZvcm0uY2hlY2tWYWxpZGl0eSgpKSB7XHJcblx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG5cdFx0XHRcdFx0X3RoaXMuZm9ybS5jbGFzc0xpc3QuYWRkKCd3YXMtdmFsaWRhdGVkJyk7XHJcblxyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCFfdGhpcy5zZXR0aW5ncy5pc1N1Ym1pdCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuXHRcdFx0bGV0IGRhdGEgPSBuZXcgRm9ybURhdGEoX3RoaXMuZm9ybSk7XHJcblx0XHRcdGlmICh0eXBlb2YgX3RoaXMuc2V0dGluZ3MuZmllbGRzID09PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRcdF90aGlzLmRhdGEgPSBjb2xsZWN0RGF0YShkYXRhLCBfdGhpcy5zZXR0aW5ncy5maWVsZHMpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gX3RoaXMucmVxdWVzdChjYWxsYmFjaywgZXZlbnQpO1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdHJlcXVlc3QoY2FsbGJhY2ssIGV2ZW50KSB7XHJcblx0XHRpZiAoIXRoaXMuaXNJbml0KSByZXR1cm4gZmFsc2U7XHJcblx0XHRjb25zdCBfdGhpcyA9IHRoaXM7XHJcblxyXG5cdFx0bGV0IG1ldGhvZCA9IF90aGlzLnNldHRpbmdzLm1ldGhvZC50b0xvd2VyQ2FzZSgpLFxyXG5cdFx0XHR1cmwgPSBfdGhpcy5zZXR0aW5ncy5hY3Rpb24sXHJcblx0XHRcdGRhdGEgPSBfdGhpcy5kYXRhO1xyXG5cclxuXHRcdGlmIChjYWxsYmFjayAmJiAnYmVmb3JlU2VuZCcgaW4gY2FsbGJhY2spIHtcclxuXHRcdFx0aWYgKHR5cGVvZiBjYWxsYmFjay5iZWZvcmVTZW5kID09PSAnZnVuY3Rpb24nKSBjYWxsYmFjay5iZWZvcmVTZW5kKGV2ZW50LCBfdGhpcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZXZlbnRIYW5kbGVyLm9uKF90aGlzLmZvcm0sIEVWRU5UX0tFWV9CRUZPUkUpO1xyXG5cclxuXHRcdGlmIChtZXRob2QgPT09ICdwb3N0Jykge1xyXG5cdFx0XHRhamF4LnBvc3QodXJsLCBkYXRhLCBmdW5jdGlvbihzdGF0dXMsIGRhdGEpIHtcclxuXHRcdFx0XHRhbnN3ZXIoc3RhdHVzLCBkYXRhKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKG1ldGhvZCA9PT0gJ2dldCcpIHtcclxuXHRcdFx0YWpheC5nZXQodXJsLCBkYXRhLCBmdW5jdGlvbihzdGF0dXMsIGRhdGEpIHtcclxuXHRcdFx0XHRhbnN3ZXIoc3RhdHVzLCBkYXRhKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gYW5zd2VyKHN0YXR1cywgZGF0YSkge1xyXG5cdFx0XHRfdGhpcy5mb3JtLmNsYXNzTGlzdC5yZW1vdmUoJ3dhcy12YWxpZGF0ZWQnKTtcclxuXHJcblx0XHRcdGlmICh0eXBlb2Ygc3RhdHVzID09PSAnc3RyaW5nJyAmJiBzdGF0dXMgPT09ICdlcnJvcicpIHtcclxuXHRcdFx0XHRpZiAoY2FsbGJhY2sgJiYgJ2Vycm9yJyBpbiBjYWxsYmFjaykge1xyXG5cdFx0XHRcdFx0aWYgKHR5cGVvZiBjYWxsYmFjay5lcnJvciA9PT0gJ2Z1bmN0aW9uJykgY2FsbGJhY2suZXJyb3IoZXZlbnQsIF90aGlzLCBkYXRhKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGV2ZW50SGFuZGxlci5vbihfdGhpcy5mb3JtLCBFVkVOVF9LRVlfRVJST1IpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGlmIChjYWxsYmFjayAmJiAnc3VjY2VzcycgaW4gY2FsbGJhY2spIHtcclxuXHRcdFx0XHRcdGlmICh0eXBlb2YgY2FsbGJhY2suc3VjY2VzcyA9PT0gJ2Z1bmN0aW9uJykgY2FsbGJhY2suc3VjY2VzcyhldmVudCwgX3RoaXMsIGRhdGEpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0ZXZlbnRIYW5kbGVyLm9uKF90aGlzLmZvcm0sIEVWRU5UX0tFWV9TVUNDRVNTKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmVkaXJlY3QoKTtcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiByZWRpcmVjdCgpIHtcclxuXHRcdFx0aWYgKF90aGlzLnNldHRpbmdzLnJlZGlyZWN0KSB7XHJcblx0XHRcdFx0d2luZG93LmxvY2F0aW9uLmhyZWYgPSBfdGhpcy5zZXR0aW5ncy5yZWRpcmVjdDtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZHU2VuZGVyO1xyXG4iLCJpbXBvcnQge2dldFN2Z30gZnJvbSBcIi4uLy4uL3V0aWwvc3ZnXCI7XG5cbmNsYXNzIGRpdkJsb2NrIHtcblx0Y29uc3RydWN0b3IoZm9ybSwgYXJnKSB7XG5cdFx0dGhpcy5mb3JtID0gZm9ybTtcblx0XHR0aGlzLnBhcmFtcyA9IGFyZztcblx0XHR0aGlzLmNsYXNzZXMgPSB7XG5cdFx0XHRjb250YWluZXI6ICd2Zy1mb3JtLXNlbmRlci0tYWxlcnQtYmxvY2snXG5cdFx0fVxuXHR9XG5cblx0aW5pdCgpIHtcblx0XHRjb25zdCBfdGhpcyA9IHRoaXM7XG5cblx0XHRsZXQgZWwgPSBfdGhpcy5mb3JtLnF1ZXJ5U2VsZWN0b3IoJy4nICsgX3RoaXMuY2xhc3Nlcy5jb250YWluZXIpO1xuXHRcdGlmICghZWwpIGVsID0gX3RoaXMuZHJhdygpO1xuXG5cdFx0aWYgKF90aGlzLnBhcmFtcy5zdGF0dXMgPT09ICdiZWZvcmVTZW5kJykge1xuXHRcdFx0aWYgKGVsLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcblx0XHRcdFx0X3RoaXMudG9nZ2xlU2xpZGUoZWwpO1xuXG5cdFx0XHRcdGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRfdGhpcy5zZXRBY3RpdmUoZWwpO1xuXHRcdFx0X3RoaXMuc2V0VGV4dChlbCk7XG5cdFx0XHRfdGhpcy5jbG9zZShlbCk7XG5cdFx0XHRfdGhpcy50b2dnbGVTbGlkZShlbCk7XG5cdFx0fVxuXHR9XG5cblx0c2V0QWN0aXZlKGVsKSB7XG5cdFx0ZWwuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG5cdFx0bGV0IGVsU2hvdyA9IGVsLnF1ZXJ5U2VsZWN0b3JBbGwoJy5zaG93Jyk7XG5cdFx0aWYgKGVsU2hvdy5sZW5ndGgpIHtcblx0XHRcdGZvciAoY29uc3QgZWxlbWVudCBvZiBlbFNob3cpIHtcblx0XHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0c2V0VGV4dChlbCkge1xuXHRcdGNvbnN0IF90aGlzID0gdGhpcztcblx0XHRsZXQgZGF0YSA9IF90aGlzLnBhcmFtcy5kYXRhLFxuXHRcdFx0X2NsYXNzID0gX3RoaXMucGFyYW1zLnN0YXR1cztcblxuXHRcdGlmICgoJ2Vycm9ycycgaW4gZGF0YSAmJiBkYXRhLmVycm9ycykgfHwgKCdlcnJvcicgaW4gZGF0YSAmJiBkYXRhLmVycm9yKSkgX2NsYXNzID0gJ2Rhbmdlcic7XG5cblx0XHRsZXQgJGFsZXJ0ID0gZWwucXVlcnlTZWxlY3RvcignLnZnLWFsZXJ0LScgKyBfY2xhc3MpO1xuXHRcdGlmICgkYWxlcnQpIHtcblx0XHRcdGxldCAkdGV4dCA9ICRhbGVydC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1hbGVydC0nKyBfY2xhc3MgKyctdGV4dF0nKTtcblx0XHRcdGlmICgkdGV4dCkge1xuXHRcdFx0XHRpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdFx0JHRleHQuaW5uZXJIVE1MID0gZGF0YTtcblx0XHRcdFx0fSBlbHNlIGlmICgoJ21zZycgaW4gZGF0YSkpIHtcblx0XHRcdFx0XHQkdGV4dC5pbm5lckhUTUwgPSBkYXRhLm1zZztcblxuXHRcdFx0XHRcdGxldCAkdGl0bGUgPSAkYWxlcnQucXVlcnlTZWxlY3RvcignW2RhdGEtYWxlcnQtJysgX2NsYXNzICsnLXRpdGxlXScpO1xuXHRcdFx0XHRcdGlmICgkdGl0bGUgJiYgKCd0aXRsZScgaW4gZGF0YSkpICR0aXRsZS5pbm5lckhUTUwgPSBkYXRhLnRpdGxlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdCRhbGVydC5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGVsLmlubmVySFRNTCA9IGRhdGEubXNnXG5cdFx0fVxuXHR9XG5cblx0Y2xvc2UoZWwpIHtcblx0XHRjb25zdCBfdGhpcyA9IHRoaXM7XG5cblx0XHRsZXQgZWxDbG9zZSA9IGVsLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWRpc21pc3M9XCJhbGVydC1ibG9ja1wiXScpO1xuXHRcdGlmIChlbENsb3NlKSB7XG5cdFx0XHRlbENsb3NlLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdF90aGlzLnRvZ2dsZVNsaWRlKGVsKTtcblx0XHRcdFx0ZWwuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG5cblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGRyYXcoKSB7XG5cdFx0Y29uc3QgX3RoaXMgPSB0aGlzO1xuXHRcdGxldCBmb3JtID0gdGhpcy5mb3JtO1xuXG5cdFx0bGV0IGVsRm9ybUlEID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZm9ybT1cIicgKyBmb3JtLmlkICsgJ1wiXScpO1xuXHRcdGlmIChlbEZvcm1JRCkgcmV0dXJuIGVsRm9ybUlEO1xuXG5cdFx0bGV0IGVsQmxvY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRlbEJsb2NrLmNsYXNzTGlzdC5hZGQoX3RoaXMuY2xhc3Nlcy5jb250YWluZXIpO1xuXG5cdFx0ZWxCbG9jay5pbm5lckhUTUwgPSAnPGRpdiBjbGFzcz1cImNsb3NlXCI+PGEgaHJlZj1cIiNcIiBkYXRhLWRpc21pc3M9XCJhbGVydC1ibG9ja1wiPicgKyBnZXRTdmcoJ2Nyb3NzJykgKyAnPC9hPjwvZGl2PicgK1xuXHRcdFx0JzxkaXYgY2xhc3M9XCJ2Zy1hbGVydCB2Zy1hbGVydC1kYW5nZXJcIj4nICtcblx0XHRcdCdcdDxkaXYgY2xhc3M9XCJzdmctYXJlYVwiPicgKyBnZXRTdmcoJ2Vycm9yJykgKyAnPC9kaXY+JyArXG5cdFx0XHQnXHQ8ZGl2IGNsYXNzPVwiY29udGVudC1hcmVhXCI+JyArXG5cdFx0XHQnXHRcdDxkaXYgY2xhc3M9XCJ0aXRsZS1hcmVhXCIgZGF0YS1hbGVydC1kYW5nZXItdGl0bGU+PC9kaXY+JyArXG5cdFx0XHQnXHRcdDxkaXYgY2xhc3M9XCJ0ZXh0LWFyZWFcIiBkYXRhLWFsZXJ0LWRhbmdlci10ZXh0PjwvZGl2PicgK1xuXHRcdFx0J1x0PC9kaXY+JyArXG5cdFx0XHQnPC9kaXY+JyArXG5cdFx0XHQnPGRpdiBjbGFzcz1cInZnLWFsZXJ0IHZnLWFsZXJ0LXN1Y2Nlc3NcIj4nICtcblx0XHRcdCdcdDxkaXYgY2xhc3M9XCJzdmctYXJlYVwiPicgKyBnZXRTdmcoJ3N1Y2Nlc3MnKSArICc8L2Rpdj4nICtcblx0XHRcdCdcdDxkaXYgY2xhc3M9XCJjb250ZW50LWFyZWFcIj4nICtcblx0XHRcdCdcdFx0PGRpdiBjbGFzcz1cInRpdGxlLWFyZWFcIiBkYXRhLWFsZXJ0LXN1Y2Nlc3MtdGl0bGU+PC9kaXY+JyArXG5cdFx0XHQnXHRcdDxkaXYgY2xhc3M9XCJ0ZXh0LWFyZWFcIiBkYXRhLWFsZXJ0LXN1Y2Nlc3MtdGV4dD48L2Rpdj4nICtcblx0XHRcdCdcdDwvZGl2PicgK1xuXHRcdFx0JzwvZGl2Pic7XG5cblx0XHRmb3JtLnByZXBlbmQoZWxCbG9jayk7XG5cblx0XHRyZXR1cm4gZWxCbG9jaztcblx0fVxuXG5cdHRvZ2dsZVNsaWRlKGVsKSB7XG5cdFx0aWYgKGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1tYXgtaGVpZ2h0JykpIHtcblx0XHRcdGlmIChlbC5zdHlsZS5tYXhIZWlnaHQucmVwbGFjZSgncHgnLCAnJykucmVwbGFjZSgnJScsICcnKSA9PT0gJzAnKSB7XG5cdFx0XHRcdGVsLnN0eWxlLm1heEhlaWdodCA9IGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1tYXgtaGVpZ2h0Jyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRlbC5zdHlsZS5tYXhIZWlnaHQgPSAnMCc7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGxldCBlbF9tYXhfaGVpZ2h0ICAgICAgID0gZ2V0SGVpZ2h0KGVsKSArICdweCcgfHwgJzAnO1xuXHRcdFx0ZWwuc3R5bGVbJ3RyYW5zaXRpb24nXSAgICAgICAgID0gJ21heC1oZWlnaHQgMC41cyBlYXNlLWluLW91dCc7XG5cdFx0XHRlbC5zdHlsZS5vdmVyZmxvd1kgICAgICAgICAgICAgPSAnaGlkZGVuJztcblx0XHRcdGVsLnN0eWxlLm1heEhlaWdodCAgICAgICAgICAgICA9ICcwJztcblx0XHRcdGVsLnNldEF0dHJpYnV0ZSgnZGF0YS1tYXgtaGVpZ2h0JywgZWxfbWF4X2hlaWdodCk7XG5cdFx0XHRlbC5zdHlsZS5kaXNwbGF5ICAgICAgICAgICAgICAgPSAnYmxvY2snO1xuXG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRlbC5zdHlsZS5tYXhIZWlnaHQgPSBlbF9tYXhfaGVpZ2h0O1xuXHRcdFx0fSwgMTApO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGdldEhlaWdodChlbCkge1xuXHRcdFx0bGV0IGVsX3N0eWxlICAgICAgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbCksXG5cdFx0XHRcdGVsX2Rpc3BsYXkgICAgPSBlbF9zdHlsZS5kaXNwbGF5LFxuXHRcdFx0XHRlbF9wb3NpdGlvbiAgID0gZWxfc3R5bGUucG9zaXRpb24sXG5cdFx0XHRcdGVsX3Zpc2liaWxpdHkgPSBlbF9zdHlsZS52aXNpYmlsaXR5LFxuXHRcdFx0XHRlbF9tYXhfaGVpZ2h0ID0gZWxfc3R5bGUubWF4SGVpZ2h0LnJlcGxhY2UoJ3B4JywgJycpLnJlcGxhY2UoJyUnLCAnJyksXG5cdFx0XHRcdHdhbnRlZF9oZWlnaHQgPSAwO1xuXG5cdFx0XHRpZiAoZWxfZGlzcGxheSAhPT0gJ25vbmUnICYmIGVsX21heF9oZWlnaHQgIT09ICcwJykge1xuXHRcdFx0XHRyZXR1cm4gZWwub2Zmc2V0SGVpZ2h0O1xuXHRcdFx0fVxuXG5cdFx0XHRlbC5zdHlsZS5wb3NpdGlvbiAgID0gJ2Fic29sdXRlJztcblx0XHRcdGVsLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcblx0XHRcdGVsLnN0eWxlLmRpc3BsYXkgICAgPSAnYmxvY2snO1xuXG5cdFx0XHR3YW50ZWRfaGVpZ2h0ICAgICA9IGVsLm9mZnNldEhlaWdodDtcblxuXHRcdFx0ZWwuc3R5bGUuZGlzcGxheSAgICA9IGVsX2Rpc3BsYXk7XG5cdFx0XHRlbC5zdHlsZS5wb3NpdGlvbiAgID0gZWxfcG9zaXRpb247XG5cdFx0XHRlbC5zdHlsZS52aXNpYmlsaXR5ID0gZWxfdmlzaWJpbGl0eTtcblxuXHRcdFx0cmV0dXJuIHdhbnRlZF9oZWlnaHQ7XG5cdFx0fVxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGRpdkJsb2NrO1xuIiwiY2xhc3MgVkdNb2RhbCB7XG5cdGNvbnN0cnVjdG9yKGZvcm0sIGFyZykge1xuXHRcdHRoaXMuZm9ybSA9IGZvcm07XG5cdFx0dGhpcy5wYXJhbXMgPSBhcmc7XG5cdFx0dGhpcy5jbGFzc2VzID0ge1xuXHRcdFx0Y29udGFpbmVyOiAndmctZm9ybS1zZW5kZXItLWFsZXJ0LW1vZGFsJ1xuXHRcdH1cblx0fVxuXG5cdGluaXQoKSB7XG5cdFx0Y29uc3QgX3RoaXMgPSB0aGlzO1xuXHR9XG5cblx0ZHJhdygpIHtcblx0XHRjb25zdCBfdGhpcyA9IHRoaXM7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVkdNb2RhbDtcbiIsImNsYXNzIHNob3dQYXNzIHtcblx0Y29uc3RydWN0b3IoZm9ybSA9IG51bGwsIGFyZyA9IHt9KSB7XG5cdFx0dGhpcy5mb3JtID0gZm9ybTtcblx0XHR0aGlzLnBhcmFtcyA9IGFyZztcblxuXHRcdHRoaXMuZXllT3BlbiA9ICc8c3ZnIHdpZHRoPVwiMjRweFwiIGlkPVwic3ZnRXllT3BlblwiIGhlaWdodD1cIjI0cHhcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XFxuJyArXG5cdFx0XHQnPHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTEyIDguMjVDOS45Mjg5MyA4LjI1IDguMjUgOS45Mjg5MyA4LjI1IDEyQzguMjUgMTQuMDcxMSA5LjkyODkzIDE1Ljc1IDEyIDE1Ljc1QzE0LjA3MTEgMTUuNzUgMTUuNzUgMTQuMDcxMSAxNS43NSAxMkMxNS43NSA5LjkyODkzIDE0LjA3MTEgOC4yNSAxMiA4LjI1Wk05Ljc1IDEyQzkuNzUgMTAuNzU3NCAxMC43NTc0IDkuNzUgMTIgOS43NUMxMy4yNDI2IDkuNzUgMTQuMjUgMTAuNzU3NCAxNC4yNSAxMkMxNC4yNSAxMy4yNDI2IDEzLjI0MjYgMTQuMjUgMTIgMTQuMjVDMTAuNzU3NCAxNC4yNSA5Ljc1IDEzLjI0MjYgOS43NSAxMlpcIiBmaWxsPVwiIzQ5NTA1N1wiLz5cXG4nICtcblx0XHRcdCc8cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNMTIgMy4yNUM3LjQ4NTg3IDMuMjUgNC40NDUyOSA1Ljk1NDIgMi42ODA1NyA4LjI0Njg2TDIuNjQ4NzQgOC4yODgyQzIuMjQ5NjQgOC44MDY1MyAxLjg4MjA2IDkuMjgzOTIgMS42MzI2OSA5Ljg0ODRDMS4zNjU2NCAxMC40NTI5IDEuMjUgMTEuMTExNyAxLjI1IDEyQzEuMjUgMTIuODg4MyAxLjM2NTY0IDEzLjU0NzEgMS42MzI2OSAxNC4xNTE2QzEuODgyMDYgMTQuNzE2MSAyLjI0OTY0IDE1LjE5MzUgMi42NDg3NSAxNS43MTE4TDIuNjgwNTcgMTUuNzUzMUM0LjQ0NTI5IDE4LjA0NTggNy40ODU4NyAyMC43NSAxMiAyMC43NUMxNi41MTQxIDIwLjc1IDE5LjU1NDcgMTguMDQ1OCAyMS4zMTk0IDE1Ljc1MzFMMjEuMzUxMiAxNS43MTE4QzIxLjc1MDQgMTUuMTkzNSAyMi4xMTc5IDE0LjcxNjEgMjIuMzY3MyAxNC4xNTE2QzIyLjYzNDQgMTMuNTQ3MSAyMi43NSAxMi44ODgzIDIyLjc1IDEyQzIyLjc1IDExLjExMTcgMjIuNjM0NCAxMC40NTI5IDIyLjM2NzMgOS44NDg0QzIyLjExNzkgOS4yODM5MSAyMS43NTA0IDguODA2NTIgMjEuMzUxMiA4LjI4ODE4TDIxLjMxOTQgOC4yNDY4NkMxOS41NTQ3IDUuOTU0MiAxNi41MTQxIDMuMjUgMTIgMy4yNVpNMy44NjkyMiA5LjE2MThDNS40OTg2NCA3LjA0NDkyIDguMTUwMzYgNC43NSAxMiA0Ljc1QzE1Ljg0OTYgNC43NSAxOC41MDE0IDcuMDQ0OTIgMjAuMTMwOCA5LjE2MThDMjAuNTY5NCA5LjczMTU5IDIwLjgyNjMgMTAuMDcyMSAyMC45OTUyIDEwLjQ1NDVDMjEuMTUzMiAxMC44MTIgMjEuMjUgMTEuMjQ4OSAyMS4yNSAxMkMyMS4yNSAxMi43NTExIDIxLjE1MzIgMTMuMTg4IDIwLjk5NTIgMTMuNTQ1NUMyMC44MjYzIDEzLjkyNzkgMjAuNTY5NCAxNC4yNjg0IDIwLjEzMDggMTQuODM4MkMxOC41MDE0IDE2Ljk1NTEgMTUuODQ5NiAxOS4yNSAxMiAxOS4yNUM4LjE1MDM2IDE5LjI1IDUuNDk4NjQgMTYuOTU1MSAzLjg2OTIyIDE0LjgzODJDMy40MzA2NCAxNC4yNjg0IDMuMTczNzQgMTMuOTI3OSAzLjAwNDc2IDEzLjU0NTVDMi44NDY4NCAxMy4xODggMi43NSAxMi43NTExIDIuNzUgMTJDMi43NSAxMS4yNDg5IDIuODQ2ODQgMTAuODEyIDMuMDA0NzYgMTAuNDU0NUMzLjE3Mzc0IDEwLjA3MjEgMy40MzA2MyA5LjczMTU5IDMuODY5MjIgOS4xNjE4WlwiIGZpbGw9XCIjNDk1MDU3XCIvPlxcbicgK1xuXHRcdFx0Jzwvc3ZnPic7XG5cdFx0dGhpcy5leWVDbG9zZSA9ICc8c3ZnIHdpZHRoPVwiMjRweFwiIGlkPVwic3ZnRXllQ2xvc2VcIiBoZWlnaHQ9XCIyNHB4XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxcbicgK1xuXHRcdFx0JzxwYXRoIGQ9XCJNMi42ODkzNiA2LjcwNDU2QzIuNTI2MTkgNi4zMjM4NCAyLjA4NTI4IDYuMTQ3NDcgMS43MDQ1NiA2LjMxMDY0QzEuMzIzODQgNi40NzM4MSAxLjE0NzQ3IDYuOTE0NzIgMS4zMTA2NCA3LjI5NTQ0TDIuNjg5MzYgNi43MDQ1NlpNMTUuNTg3MiAxMy4zMjg3TDE1LjMxMjUgMTIuNjMwOEwxNS41ODcyIDEzLjMyODdaTTkuMDQxNDUgMTMuNzM3N0M5LjI2NzM2IDEzLjM5MDYgOS4xNjkwNCAxMi45MjYgOC44MjE4NSAxMi43MDAxQzguNDc0NjYgMTIuNDc0MiA4LjAxMDA4IDEyLjU3MjUgNy43ODQxNyAxMi45MTk3TDkuMDQxNDUgMTMuNzM3N1pNNi4zNzEzNiAxNS4wOTFDNi4xNDU0NSAxNS40MzgxIDYuMjQzNzcgMTUuOTAyNyA2LjU5MDk2IDE2LjEyODZDNi45MzgxNSAxNi4zNTQ1IDcuNDAyNzMgMTYuMjU2MiA3LjYyODY0IDE1LjkwOUw2LjM3MTM2IDE1LjA5MVpNMjIuNjg5NCA3LjI5NTQ0QzIyLjg1MjUgNi45MTQ3MiAyMi42NzYyIDYuNDczODEgMjIuMjk1NCA2LjMxMDY0QzIxLjkxNDcgNi4xNDc0NyAyMS40NzM4IDYuMzIzODQgMjEuMzEwNiA2LjcwNDU2TDIyLjY4OTQgNy4yOTU0NFpNMTkgMTEuMTI4OEwxOC40ODY3IDEwLjU4MlYxMC41ODJMMTkgMTEuMTI4OFpNMTkuOTY5NyAxMy4xNTkyQzIwLjI2MjYgMTMuNDUyMSAyMC43Mzc0IDEzLjQ1MjEgMjEuMDMwMyAxMy4xNTkyQzIxLjMyMzIgMTIuODY2MyAyMS4zMjMyIDEyLjM5MTQgMjEuMDMwMyAxMi4wOTg1TDE5Ljk2OTcgMTMuMTU5MlpNMTEuMjUgMTYuNUMxMS4yNSAxNi45MTQyIDExLjU4NTggMTcuMjUgMTIgMTcuMjVDMTIuNDE0MiAxNy4yNSAxMi43NSAxNi45MTQyIDEyLjc1IDE2LjVIMTEuMjVaTTE2LjM3MTQgMTUuOTA5QzE2LjU5NzMgMTYuMjU2MiAxNy4wNjE5IDE2LjM1NDUgMTcuNDA5IDE2LjEyODZDMTcuNzU2MiAxNS45MDI3IDE3Ljg1NDUgMTUuNDM4MSAxNy42Mjg2IDE1LjA5MUwxNi4zNzE0IDE1LjkwOVpNNS41MzAzMyAxMS42NTkyQzUuODIzMjIgMTEuMzY2MyA1LjgyMzIyIDEwLjg5MTQgNS41MzAzMyAxMC41OTg1QzUuMjM3NDQgMTAuMzA1NiA0Ljc2MjU2IDEwLjMwNTYgNC40Njk2NyAxMC41OTg1TDUuNTMwMzMgMTEuNjU5MlpNMi45Njk2NyAxMi4wOTg1QzIuNjc2NzggMTIuMzkxNCAyLjY3Njc4IDEyLjg2NjMgMi45Njk2NyAxMy4xNTkyQzMuMjYyNTYgMTMuNDUyMSAzLjczNzQ0IDEzLjQ1MjEgNC4wMzAzMyAxMy4xNTkyTDIuOTY5NjcgMTIuMDk4NVpNMTIgMTMuMjVDOC43NzYxMSAxMy4yNSA2LjQ2MTMzIDExLjY0NDYgNC45MjQ2IDkuOTg5NjZDNC4xNTY0NSA5LjE2MjQzIDMuNTkzMjUgOC4zMzI4NCAzLjIyMjU5IDcuNzEwMTRDMy4wMzc2OSA3LjM5OTUgMi45MDE4NyA3LjE0MjMyIDIuODEzNCA2Ljk2NTM3QzIuNzY5MTkgNi44NzY5NiAyLjczNjg5IDYuODA4NzUgMi43MTYyNyA2Ljc2NDExQzIuNzA1OTcgNi43NDE4IDIuNjk4NTkgNi43MjU0IDIuNjk0MTEgNi43MTUzM0MyLjY5MTg3IDYuNzEwMyAyLjY5MDM2IDYuNzA2ODQgMi42ODk1NyA2LjcwNTAzQzIuNjg5MTcgNi43MDQxMyAyLjY4ODk2IDYuNzAzNjMgMi42ODg5MiA2LjcwMzU1QzIuNjg4OTEgNi43MDM1MSAyLjY4ODkzIDYuNzAzNTcgMi42ODkwMSA2LjcwMzc0QzIuNjg5MDQgNi43MDM4MiAyLjY4OTEzIDYuNzA0MDMgMi42ODkxNSA2LjcwNDA3QzIuNjg5MjUgNi43MDQzIDIuNjg5MzYgNi43MDQ1NiAyIDdDMS4zMTA2NCA3LjI5NTQ0IDEuMzEwNzcgNy4yOTU3NSAxLjMxMDkyIDcuMjk2MDlDMS4zMTA5OCA3LjI5NjI0IDEuMzExMTQgNy4yOTY2IDEuMzExMjcgNy4yOTY5QzEuMzExNTIgNy4yOTc0OSAxLjMxMTgzIDcuMjk4MiAxLjMxMjE4IDcuMjk5QzEuMzEyODcgNy4zMDA2MiAxLjMxMzc2IDcuMzAyNjYgMS4zMTQ4MyA3LjMwNTEyQzEuMzE2OTggNy4zMTAwMyAxLjMxOTg4IDcuMzE2NjIgMS4zMjM1MyA3LjMyNDgzQzEuMzMwODMgNy4zNDEyNSAxLjM0MTE1IDcuMzY0MTUgMS4zNTQ1MyA3LjM5MzExQzEuMzgxMjcgNy40NTEwMiAxLjQyMDI2IDcuNTMzMiAxLjQ3MTc2IDcuNjM2MTlDMS41NzQ2OSA3Ljg0MjA2IDEuNzI3OTQgOC4xMzE3NSAxLjkzMzY2IDguNDc3MzZDMi4zNDQyNSA5LjE2NzE2IDIuOTY4NTUgMTAuMDg3NiAzLjgyNTQgMTEuMDEwM0M1LjUzODY3IDEyLjg1NTQgOC4yMjM4OSAxNC43NSAxMiAxNC43NVYxMy4yNVpNMTUuMzEyNSAxMi42MzA4QzE0LjM0MjEgMTMuMDEyOCAxMy4yNDE3IDEzLjI1IDEyIDEzLjI1VjE0Ljc1QzEzLjQzODIgMTQuNzUgMTQuNzI0NiAxNC40NzQyIDE1Ljg2MTkgMTQuMDI2NkwxNS4zMTI1IDEyLjYzMDhaTTcuNzg0MTcgMTIuOTE5N0w2LjM3MTM2IDE1LjA5MUw3LjYyODY0IDE1LjkwOUw5LjA0MTQ1IDEzLjczNzdMNy43ODQxNyAxMi45MTk3Wk0yMiA3QzIxLjMxMDYgNi43MDQ1NiAyMS4zMTA3IDYuNzA0NDEgMjEuMzEwOCA2LjcwNDI3QzIxLjMxMDggNi43MDQyMyAyMS4zMTA4IDYuNzA0MSAyMS4zMTA5IDYuNzA0MDJDMjEuMzEwOSA2LjcwMzg4IDIxLjMxMSA2LjcwMzc2IDIxLjMxMSA2LjcwMzY4QzIxLjMxMTEgNi43MDM1MiAyMS4zMTExIDYuNzAzNDkgMjEuMzExMSA2LjcwMzZDMjEuMzExIDYuNzAzOCAyMS4zMTA3IDYuNzA0NTIgMjEuMzEwMSA2LjcwNTc2QzIxLjMwOSA2LjcwODIzIDIxLjMwNyA2LjcxMjc1IDIxLjMwNDEgNi43MTkyNEMyMS4yOTgzIDYuNzMyMjMgMjEuMjg4OSA2Ljc1MzA5IDIxLjI3NTggNi43ODEyNUMyMS4yNDk1IDYuODM3NTcgMjEuMjA4NiA2LjkyMjk1IDIxLjE1MjYgNy4wMzI2N0MyMS4wNDA2IDcuMjUyMjcgMjAuODY5IDcuNTY4MzEgMjAuNjM1NCA3Ljk0MzJDMjAuMTY2OSA4LjY5NTE2IDE5LjQ1NjMgOS42NzE5NyAxOC40ODY3IDEwLjU4MkwxOS41MTMzIDExLjY3NTdDMjAuNjAyMyAxMC42NTM1IDIxLjM5MTcgOS41NjU4NyAyMS45MDg1IDguNzM2NDZDMjIuMTY3NiA4LjMyMDY4IDIyLjM2IDcuOTY2OCAyMi40ODg5IDcuNzE0MTVDMjIuNTUzMyA3LjU4Nzc1IDIyLjYwMiA3LjQ4NjQzIDIyLjYzNTMgNy40MTUwN0MyMi42NTE5IDcuMzc5MzkgMjIuNjY0NyA3LjM1MTE4IDIyLjY3MzcgNy4zMzEwNEMyMi42NzgyIDcuMzIwOTcgMjIuNjgxOCA3LjMxMjkyIDIyLjY4NDQgNy4zMDY5NkMyMi42ODU3IDcuMzAzOTggMjIuNjg2NyA3LjMwMTUzIDIyLjY4NzYgNy4yOTk2QzIyLjY4OCA3LjI5ODY0IDIyLjY4ODMgNy4yOTc4MSAyMi42ODg2IDcuMjk3MTJDMjIuNjg4OCA3LjI5Njc3IDIyLjY4ODkgNy4yOTY0NiAyMi42ODkgNy4yOTYxOEMyMi42ODkxIDcuMjk2MDQgMjIuNjg5MiA3LjI5NTg1IDIyLjY4OTIgNy4yOTU3OEMyMi42ODkzIDcuMjk1NjEgMjIuNjg5NCA3LjI5NTQ0IDIyIDdaTTE4LjQ4NjcgMTAuNTgyQzE3LjYyNzcgMTEuMzg4MiAxNi41NzM5IDEyLjEzNDMgMTUuMzEyNSAxMi42MzA4TDE1Ljg2MTkgMTQuMDI2NkMxNy4zMzU1IDEzLjQ0NjYgMTguNTQ2NiAxMi41ODMgMTkuNTEzMyAxMS42NzU3TDE4LjQ4NjcgMTAuNTgyWk0xOC40Njk3IDExLjY1OTJMMTkuOTY5NyAxMy4xNTkyTDIxLjAzMDMgMTIuMDk4NUwxOS41MzAzIDEwLjU5ODVMMTguNDY5NyAxMS42NTkyWk0xMS4yNSAxNFYxNi41SDEyLjc1VjE0SDExLjI1Wk0xNC45NTg2IDEzLjczNzdMMTYuMzcxNCAxNS45MDlMMTcuNjI4NiAxNS4wOTFMMTYuMjE1OCAxMi45MTk3TDE0Ljk1ODYgMTMuNzM3N1pNNC40Njk2NyAxMC41OTg1TDIuOTY5NjcgMTIuMDk4NUw0LjAzMDMzIDEzLjE1OTJMNS41MzAzMyAxMS42NTkyTDQuNDY5NjcgMTAuNTk4NVpcIiBmaWxsPVwiIzQ5NTA1N1wiLz5cXG4nICtcblx0XHRcdCc8L3N2Zz4nO1xuXHR9XG5cblx0aW5pdCgpIHtcblx0XHRjb25zdCBfdGhpcyA9IHRoaXM7XG5cblx0XHRsZXQgaW5wdXRQYXNzd29yZHMgPSBfdGhpcy5mb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJ1t0eXBlPVwicGFzc3dvcmRcIl0nKTtcblx0XHRpZiAoaW5wdXRQYXNzd29yZHMubGVuZ3RoKSB7XG5cdFx0XHRpbnB1dFBhc3N3b3Jkcy5mb3JFYWNoKGZ1bmN0aW9uIChlbG0pIHtcblx0XHRcdFx0bGV0IHBhcmVudCA9IGVsbS5wYXJlbnROb2RlO1xuXHRcdFx0XHRpZiAocGFyZW50KSB7XG5cdFx0XHRcdFx0cGFyZW50LnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcblxuXHRcdFx0XHRcdGxldCBzd2l0Y2hlciA9IHBhcmVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS12Zy10b2dnbGU9XCJzaG93LXBhc3NcIl0nKTtcblx0XHRcdFx0XHRpZiAoIXN3aXRjaGVyKSB7XG5cdFx0XHRcdFx0XHRzd2l0Y2hlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblx0XHRcdFx0XHRcdHN3aXRjaGVyLnNldEF0dHJpYnV0ZSgnZGF0YS12Zy10b2dnbGUnLCAnc2hvdy1wYXNzJyk7XG5cdFx0XHRcdFx0XHRzd2l0Y2hlci5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgJ9Cf0L7QutCw0LfQsNGC0YwnKTtcblx0XHRcdFx0XHRcdHN3aXRjaGVyLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICdmYWxzZScpO1xuXHRcdFx0XHRcdFx0c3dpdGNoZXIuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuXHRcdFx0XHRcdFx0c3dpdGNoZXIuc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuXHRcdFx0XHRcdFx0c3dpdGNoZXIuc3R5bGUud2lkdGggPSAnMjRweCc7XG5cdFx0XHRcdFx0XHRzd2l0Y2hlci5zdHlsZS5oZWlnaHQgPSAnMjRweCc7XG5cdFx0XHRcdFx0XHRzd2l0Y2hlci5zdHlsZS50b3AgPSAnNTAlJztcblx0XHRcdFx0XHRcdHN3aXRjaGVyLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVZKC01MCUpJztcblx0XHRcdFx0XHRcdHN3aXRjaGVyLnN0eWxlLnJpZ2h0ID0gJzEycHgnO1xuXHRcdFx0XHRcdFx0c3dpdGNoZXIuaW5uZXJIVE1MID0gX3RoaXMuZXllT3BlbjtcblxuXHRcdFx0XHRcdFx0cGFyZW50LmFwcGVuZChzd2l0Y2hlcilcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRfdGhpcy50b2dnbGUoc3dpdGNoZXIsIGVsbSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdHRvZ2dsZShzd2l0Y2hlciwgZWxlbWVudCkge1xuXHRcdGNvbnN0IF90aGlzID0gdGhpcztcblxuXHRcdHN3aXRjaGVyLm9uY2xpY2sgPSAoZnVuY3Rpb24gKCkge1xuXHRcdFx0bGV0IF9zZWxmID0gdGhpcyxcblx0XHRcdFx0aWNvbkNsb3NlID0gc3dpdGNoZXIuZGF0YXNldC5pY29uQ2xvc2UsXG5cdFx0XHRcdGljb25PcGVuID0gc3dpdGNoZXIuZGF0YXNldC5pY29uT3BlbjtcblxuXHRcdFx0aWYgKHN3aXRjaGVyLmdldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcpID09PSAndHJ1ZScpIHtcblx0XHRcdFx0aWYgKGljb25PcGVuKSB7XG5cdFx0XHRcdFx0bGV0IGljb24gPSBzd2l0Y2hlci5xdWVyeVNlbGVjdG9yKCdpJyk7XG5cdFx0XHRcdFx0aWYgKGljb24pIHtcblx0XHRcdFx0XHRcdGlmIChpY29uLmNsYXNzTGlzdC5jb250YWlucyhpY29uQ2xvc2UpKSB7XG5cdFx0XHRcdFx0XHRcdGljb24uY2xhc3NMaXN0LnJlbW92ZShpY29uQ2xvc2UpO1xuXHRcdFx0XHRcdFx0XHRpY29uLmNsYXNzTGlzdC5hZGQoaWNvbk9wZW4pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRzd2l0Y2hlci5pbm5lckhUTUwgPSBfdGhpcy5leWVPcGVuXG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAncGFzc3dvcmQnKTtcblx0XHRcdFx0X3NlbGYuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJylcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChpY29uQ2xvc2UpIHtcblx0XHRcdFx0XHRsZXQgaWNvbiA9IHN3aXRjaGVyLnF1ZXJ5U2VsZWN0b3IoJ2knKTtcblx0XHRcdFx0XHRpZiAoaWNvbikge1xuXHRcdFx0XHRcdFx0aWYgKGljb24uY2xhc3NMaXN0LmNvbnRhaW5zKGljb25PcGVuKSkge1xuXHRcdFx0XHRcdFx0XHRpY29uLmNsYXNzTGlzdC5yZW1vdmUoaWNvbk9wZW4pO1xuXHRcdFx0XHRcdFx0XHRpY29uLmNsYXNzTGlzdC5hZGQoaWNvbkNsb3NlKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0c3dpdGNoZXIuaW5uZXJIVE1MID0gX3RoaXMuZXllQ2xvc2Vcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGVsZW1lbnQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKTtcblx0XHRcdFx0X3NlbGYuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ3RydWUnKVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHNob3dQYXNzO1xuIiwiLyoqXHJcbiAqINCT0LvRg9Cx0L7QutC+0LUg0L7QsdGK0LXQtNC40L3QtdC90LjQtSDQvtCx0YrQtdC60YLQvtCyXHJcbiAqIEBwYXJhbSBvYmplY3RzXHJcbiAqIEByZXR1cm5zIHsqfVxyXG4gKi9cclxuY29uc3QgbWVyZ2VEZWVwT2JqZWN0ID0gZnVuY3Rpb24gKC4uLm9iamVjdHMpIHtcclxuXHRjb25zdCBpc09iamVjdCA9IG9iaiA9PiBvYmogJiYgdHlwZW9mIG9iaiA9PT0gJ29iamVjdCc7XHJcblxyXG5cdHJldHVybiBvYmplY3RzLnJlZHVjZSgocHJldiwgb2JqKSA9PiB7XHJcblx0XHRPYmplY3Qua2V5cyhvYmopLmZvckVhY2goa2V5ID0+IHtcclxuXHRcdFx0Y29uc3QgcFZhbCA9IHByZXZba2V5XTtcclxuXHRcdFx0Y29uc3Qgb1ZhbCA9IG9ialtrZXldO1xyXG5cclxuXHRcdFx0aWYgKEFycmF5LmlzQXJyYXkocFZhbCkgJiYgQXJyYXkuaXNBcnJheShvVmFsKSkge1xyXG5cdFx0XHRcdHByZXZba2V5XSA9IHBWYWwuY29uY2F0KC4uLm9WYWwpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgaWYgKGlzT2JqZWN0KHBWYWwpICYmIGlzT2JqZWN0KG9WYWwpKSB7XHJcblx0XHRcdFx0cHJldltrZXldID0gbWVyZ2VEZWVwT2JqZWN0KHBWYWwsIG9WYWwpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdHByZXZba2V5XSA9IG9WYWw7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiBwcmV2O1xyXG5cdH0sIHt9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbGxlY3QgRGF0YVxyXG4gKiBAcGFyYW0gZGF0YVxyXG4gKiBAcGFyYW0gZmllbGRzXHJcbiAqL1xyXG5jb25zdCBjb2xsZWN0RGF0YSA9IGZ1bmN0aW9uKGRhdGEsIGZpZWxkcykge1xyXG5cdGZvciAobGV0IG5hbWUgaW4gZmllbGRzKSB7XHJcblx0XHRpZiAodHlwZW9mIGZpZWxkc1tuYW1lXSA9PT0gJ29iamVjdCcpIHtcclxuXHRcdFx0Zm9yIChsZXQga2V5IGluIGZpZWxkc1tuYW1lXSkge1xyXG5cdFx0XHRcdGxldCBhcnIgPSBPYmplY3Qua2V5cyhmaWVsZHNbbmFtZV1ba2V5XSkubWFwKGZ1bmN0aW9uIChpKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gZmllbGRzW25hbWVdW2tleV1baV07XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0ZGF0YS5hcHBlbmQobmFtZSwgYXJyKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0ZGF0YS5hcHBlbmQobmFtZSwgZmllbGRzW25hbWVdKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldHVybiBkYXRhO1xyXG59XHJcblxyXG4vKipcclxuICogQUpBWCBSRVFVRVNUXHJcbiAqIEB0eXBlIHt7cG9zdDogYWpheC5wb3N0LCBnZXQ6IGFqYXguZ2V0LCB4OiAoKGZ1bmN0aW9uKCk6IChYTUxIdHRwUmVxdWVzdCkpfCopLCBzZW5kOiBhamF4LnNlbmR9fVxyXG4gKi9cclxuY29uc3QgYWpheCA9IHtcclxuXHR4OiBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRyZXR1cm4gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcblx0XHR9XHJcblx0XHRsZXQgdmVyc2lvbnMgPSBbXHJcblx0XHRcdFwiTVNYTUwyLlhtbEh0dHAuNi4wXCIsXHJcblx0XHRcdFwiTVNYTUwyLlhtbEh0dHAuNS4wXCIsXHJcblx0XHRcdFwiTVNYTUwyLlhtbEh0dHAuNC4wXCIsXHJcblx0XHRcdFwiTVNYTUwyLlhtbEh0dHAuMy4wXCIsXHJcblx0XHRcdFwiTVNYTUwyLlhtbEh0dHAuMi4wXCIsXHJcblx0XHRcdFwiTWljcm9zb2Z0LlhtbEh0dHBcIlxyXG5cdFx0XTtcclxuXHJcblx0XHRsZXQgeGhyO1xyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB2ZXJzaW9ucy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdHhociA9IG5ldyBBY3RpdmVYT2JqZWN0KHZlcnNpb25zW2ldKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0fSBjYXRjaCAoZSkge31cclxuXHRcdH1cclxuXHRcdHJldHVybiB4aHI7XHJcblx0fSxcclxuXHJcblx0c2VuZDogZnVuY3Rpb24gKHVybCwgY2FsbGJhY2ssIG1ldGhvZCwgZGF0YSwgYXN5bmMpIHtcclxuXHRcdGlmIChhc3luYyA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdGFzeW5jID0gdHJ1ZTtcclxuXHRcdH1cclxuXHRcdGxldCB4ID0gYWpheC54KCk7XHJcblx0XHR4Lm9wZW4obWV0aG9kLCB1cmwsIGFzeW5jKTtcclxuXHRcdHgub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAoeC5yZWFkeVN0YXRlID09PSA0KSB7XHJcblx0XHRcdFx0c3dpdGNoICh4LnN0YXR1cykge1xyXG5cdFx0XHRcdFx0Y2FzZSAyMDA6XHJcblx0XHRcdFx0XHRcdGNhbGxiYWNrKCdzdWNjZXNzJywgeC5yZXNwb25zZVRleHQpXHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRcdFx0Y2FsbGJhY2soJ2Vycm9yJywgeC5yZXNwb25zZVRleHQpXHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHRcdGlmIChtZXRob2QgPT09ICdQT1NUJykge1xyXG5cdFx0XHQvL3guc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcpO1xyXG5cdFx0fVxyXG5cdFx0eC5zZW5kKGRhdGEpXHJcblx0fSxcclxuXHJcblx0Z2V0OiBmdW5jdGlvbiAodXJsLCBkYXRhLCBjYWxsYmFjaywgYXN5bmMpIHtcclxuXHRcdGxldCBxdWVyeSA9IFtdO1xyXG5cdFx0Zm9yIChsZXQga2V5IG9mIGRhdGEpIHtcclxuXHRcdFx0cXVlcnkucHVzaChlbmNvZGVVUklDb21wb25lbnQoa2V5WzBdKSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudChrZXlbMV0pKTtcclxuXHRcdH1cclxuXHRcdGFqYXguc2VuZCh1cmwgKyAocXVlcnkubGVuZ3RoID8gJz8nICsgcXVlcnkuam9pbignJicpIDogJycpLCBjYWxsYmFjaywgJ0dFVCcsIG51bGwsIGFzeW5jKVxyXG5cdH0sXHJcblxyXG5cdHBvc3Q6IGZ1bmN0aW9uICh1cmwsIGRhdGEsIGNhbGxiYWNrLCBhc3luYykge1xyXG5cdFx0YWpheC5zZW5kKHVybCwgY2FsbGJhY2ssICdQT1NUJywgZGF0YSwgYXN5bmMpXHJcblx0fVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEVWRU5UU1xyXG4gKiBAdHlwZSB7e29uOiBldmVudEhhbmRsZXIub259fVxyXG4gKi9cclxuY29uc3QgZXZlbnRIYW5kbGVyID0ge1xyXG5cdG9uOiBmdW5jdGlvbiAoZWxlbWVudCwgZXZlbnQpIHtcclxuXHRcdGNvbnN0IGV2ZW50U3VjY2VzcyA9IG5ldyBDdXN0b21FdmVudChldmVudCwge1xyXG5cdFx0XHRidWJibGVzOiB0cnVlLFxyXG5cdFx0fSk7XHJcblxyXG5cdFx0ZWxlbWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50U3VjY2Vzcyk7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQge21lcmdlRGVlcE9iamVjdCwgY29sbGVjdERhdGEsIGFqYXgsIGV2ZW50SGFuZGxlcn1cclxuIiwiZnVuY3Rpb24gZ2V0U3ZnKG5hbWUpIHtcblx0Y29uc3Qgc3ZnID0gIHtcblx0XHRlcnJvcjogJzxzdmcgdmlld2JveD1cIjAgMCA1MDAgNTAwXCIgY2xhc3M9XCJhbV9FcnJvcl9JY29uXCI+PHBhdGggY2xhc3M9XCJhbV9TVkdfY2lyY2xlXCIgZD1cIm00NDQuMzQ2OTMsMTE0LjA3MDA3YTIzNi45NTI3NiwyMzYuOTUyNzYgMCAwIDEgNDQuMTU1MywxMzcuNzM3NDdjMCwxMjkuOTcwMDUgLTEwNi45NDc3MiwyMzYuOTY0NDMgLTIzNi45MTc3NywyMzYuOTY0NDNzLTIzNi45MTc3NywtMTA2Ljk0NzcyIC0yMzYuOTE3NzcsLTIzNi45MTc3N3MxMDYuOTQ3NzIsLTIzNi45NjQ0MyAyMzYuOTE3NzcsLTIzNi45NjQ0M2EyMzYuOTk5NDEsMjM2Ljk5OTQxIDAgMCAxIDE2OC43MjU0OCw3MC41OTQ4M1wiPjwvcGF0aD48bGluZSBjbGFzcz1cImFtX1NWR19lcnJvcjFcIiB5Mj1cIjM5MFwiIHgyPVwiMzkwXCIgeTE9XCIxMTBcIiB4MT1cIjExMFwiPjwvbGluZT48bGluZSBjbGFzcz1cImFtX1NWR19lcnJvcjJcIiB5Mj1cIjM5MFwiIHgyPVwiMTEwXCIgeTE9XCIxMTBcIiB4MT1cIjM5MFwiPjwvbGluZT48L3N2Zz4nLFxuXHRcdHN1Y2Nlc3M6ICc8c3ZnIHZpZXdib3g9XCIwIDAgNTAwIDUwMFwiIGNsYXNzPVwiYW1fU3VjY2Vzc19JY29uXCI+PHBhdGggY2xhc3M9XCJhbV9TVkdfY2lyY2xlXCIgZD1cIm00NDMuMDEzNiwxMTQuMDcwMDdhMjM2Ljk1Mjc2LDIzNi45NTI3NiAwIDAgMSA0NC4xNTUzLDEzNy43Mzc0N2MwLDEyOS45NzAwNSAtMTA2Ljk0NzcyLDIzNi45NjQ0MyAtMjM2LjkxNzc3LDIzNi45NjQ0M3MtMjM2LjkxNzc3LC0xMDYuOTQ3NzIgLTIzNi45MTc3NywtMjM2LjkxNzc3czEwNi45NDc3MiwtMjM2Ljk2NDQzIDIzNi45MTc3NywtMjM2Ljk2NDQzYTIzNi45OTk0MSwyMzYuOTk5NDEgMCAwIDEgMTY4LjcyNTQ4LDcwLjU5NDgzXCI+PC9wYXRoPjxwb2x5bGluZSBjbGFzcz1cImFtX1NWR19jaGVja1wiIHBvaW50cz1cIjEwNC40ODkyMzQ5MjQzMTY0LDMwOS4yMDAxNjQ3OTQ5MjE5IDE5NS41NzQwNjYxNjIxMDkzOCw0MDIuOTYwMDUyNDkwMjM0NCA0MTguOTI5MjI5NzM2MzI4MSw4NS4wMzcxODU2Njg5NDUzMSBcIj48L3BvbHlsaW5lPjwvc3ZnPicsXG5cdFx0Y3Jvc3M6ICc8c3ZnIHZlcnNpb249XCIxLjFcIiBpZD1cIkNhcGFfMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB4PVwiMHB4XCIgeT1cIjBweFwiIHZpZXdCb3g9XCIwIDAgMjI0LjUxMiAyMjQuNTEyXCIgc3R5bGU9XCJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDIyNC41MTIgMjI0LjUxMjtcIiB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiPjxnPjxwb2x5Z29uIHN0eWxlPVwiZmlsbDojMDEwMDAyO1wiIHBvaW50cz1cIjIyNC41MDcsNi45OTcgMjE3LjUyMSwwIDExMi4yNTYsMTA1LjI1OCA2Ljk5OCwwIDAuMDA1LDYuOTk3IDEwNS4yNjMsMTEyLjI1NCAwLjAwNSwyMTcuNTEyIDYuOTk4LDIyNC41MTIgMTEyLjI1NiwxMTkuMjQgMjE3LjUyMSwyMjQuNTEyIDIyNC41MDcsMjE3LjUxMiAxMTkuMjQ5LDExMi4yNTQgXCIvPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48L3N2Zz4nXG5cdH07XG5cblx0cmV0dXJuIHN2Z1tuYW1lXSA/PyB7fTtcbn1cblxuZXhwb3J0IHtnZXRTdmd9XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4vYXBwL2FwcC5zY3NzXCI7XHJcbmltcG9ydCB7VkdGb3JtU2VuZGVyfSBmcm9tIFwiLi9hcHAvYXBwXCI7XHJcblxyXG5leHBvcnQge1ZHRm9ybVNlbmRlcn07XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==