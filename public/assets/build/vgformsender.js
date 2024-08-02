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
        },
        anyway: function (event, vgSender, data) {
          if (callback && 'anyway' in callback && typeof callback.anyway === 'function') {
            callback.anyway(event, vgSender, data);
          }
          buttonCondition(vgSender);
          jsonParse(data, 'anyway', vgSender);
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
    if (!this.isAlert) return false;
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
const EVENT_KEY_ANYWAY = 'vg.fs.anyway';
const setParams = function (form, params, arg) {
  let mParams = (0,_util_functions__WEBPACK_IMPORTED_MODULE_0__.mergeDeepObject)(params, arg);
  let data = [].filter.call(form.attributes, function (at) {
    return /^data-/.test(at.name);
  });
  for (let val of data) {
    if (val.name === 'data-alert-type' && val.value) mParams.alert.params.type = val.value;
    if (val.name === 'data-alert') mParams.alert.enabled = val.value !== 'false';
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
      } else if (typeof status === 'string' && status === 'success') {
        if (callback && 'success' in callback) {
          if (typeof callback.success === 'function') callback.success(event, _this, data);
        }
        _util_functions__WEBPACK_IMPORTED_MODULE_0__.eventHandler.on(_this.form, EVENT_KEY_SUCCESS);
      } else {
        if (typeof callback.anyway === 'function') callback.anyway(event, _this, data);
        _util_functions__WEBPACK_IMPORTED_MODULE_0__.eventHandler.on(_this.form, EVENT_KEY_ANYWAY);
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
/* harmony import */ var _util_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util/svg */ "./app/util/svg.js");

class VGModal {
  constructor(form, arg) {
    this.form = form;
    this.params = arg;
    this.classes = {
      container: 'vg-form-sender--alert-modal',
      backdrop: 'vg-form-sender--alert-backdrop'
    };
  }
  init() {
    const _this = this;
    let el = _this.form.querySelector('.' + _this.classes.container);
    if (!el) el = _this.draw();
    _this.toggle(el);
  }
  toggle(el) {
    let _this = this;
    let backdrop = document.createElement('div');
    backdrop.classList.add(_this.classes.backdrop);
    if (!document.body.classList.contains('vg-modal-open')) {
      document.body.classList.add('vg-modal-open');
      el.style.display = 'block';
      setTimeout(() => {
        el.classList.add('active');
        backdrop.classList.add('active');
      }, 100);
      document.body.append(backdrop);
    }
  }
  draw() {
    const _this = this;
    let alertModal = document.querySelector('.' + _this.classes.container);
    if (alertModal) {
      return alertModal;
    }
    let modal = document.createElement('div');
    modal.classList.add(_this.classes.container);
    modal.innerHTML = '<div class="modal-content"></div>';
    document.body.append(modal);
    return modal;
  }
}

/*window.addEventListener('keydown', (event) => {
	if (event.key === 'Escape' || event.key === 'Esc') {
		if (document.body.classList.contains('vg-modal-open')) {
			VGModal.close();
		}
	}
});*/

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmdmb3Jtc2VuZGVyLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUkE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1Q0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvSUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7QUM3TkE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBZ0JBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7QUMvSkE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FDbEVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFJQTtBQUdBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDL0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ1JBOzs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3ZnLy4vYXBwL2FwcC5qcyIsIndlYnBhY2s6Ly92Zy8uL2FwcC9qcy9WR0Zvcm1QbHVnaW5zLmpzIiwid2VicGFjazovL3ZnLy4vYXBwL2pzL1ZHRm9ybVNlbmRlci5qcyIsIndlYnBhY2s6Ly92Zy8uL2FwcC9qcy9WR1NlbmRlci5qcyIsIndlYnBhY2s6Ly92Zy8uL2FwcC9wbHVnaW5zL2Jsb2NrL2RpdkJsb2NrLmpzIiwid2VicGFjazovL3ZnLy4vYXBwL3BsdWdpbnMvbW9kYWwvVkdNb2RhbC5qcyIsIndlYnBhY2s6Ly92Zy8uL2FwcC9wbHVnaW5zL3Nob3dQYXNzL3Nob3dQYXNzLmpzIiwid2VicGFjazovL3ZnLy4vYXBwL3V0aWwvZnVuY3Rpb25zLmpzIiwid2VicGFjazovL3ZnLy4vYXBwL3V0aWwvc3ZnLmpzIiwid2VicGFjazovL3ZnLy4vYXBwL2FwcC5zY3NzIiwid2VicGFjazovL3ZnL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3ZnL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly92Zy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3ZnL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdmcvLi9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogRXhwb3J0IFB1YmxpYyBBcGlcclxuICog0JDQstGC0L7RgDogVmVnYXMgU3R1ZGlvXHJcbiAqINCb0LjRhtC10L3Qt9C40Y86INGB0LzQvtGC0YDQuCBMSUNFTlNFXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqL1xyXG5cclxuaW1wb3J0IFZHRm9ybVNlbmRlciBmcm9tIFwiLi9qcy9WR0Zvcm1TZW5kZXJcIjtcclxuXHJcbmV4cG9ydCB7XHJcblx0VkdGb3JtU2VuZGVyXHJcbn07XHJcbiIsImltcG9ydCBzaG93UGFzcyBmcm9tIFwiLi4vcGx1Z2lucy9zaG93UGFzcy9zaG93UGFzc1wiO1xyXG5pbXBvcnQgZGl2QmxvY2sgZnJvbSBcIi4uL3BsdWdpbnMvYmxvY2svZGl2QmxvY2tcIjtcclxuaW1wb3J0IFZHTW9kYWwgIGZyb20gXCIuLi9wbHVnaW5zL21vZGFsL1ZHTW9kYWxcIjtcclxuXHJcbmNsYXNzIFZHRm9ybVBsdWdpbnMge1xyXG5cdGNvbnN0cnVjdG9yKGZvcm1zZW5kZXIpIHtcclxuXHRcdHRoaXMucGx1Z2lucyA9IGZvcm1zZW5kZXIuc2V0dGluZ3MucGx1Z2lucztcclxuXHRcdHRoaXMuZm9ybXNlbmRlciA9IGZvcm1zZW5kZXI7XHJcblx0fVxyXG5cclxuXHRpbml0KCkge1xyXG5cdFx0Y29uc3QgX3RoaXMgPSB0aGlzO1xyXG5cclxuXHRcdGlmIChfdGhpcy5wbHVnaW5zLmxlbmd0aCkge1xyXG5cdFx0XHRmb3IgKGNvbnN0IHBsdWdpbiBvZiBfdGhpcy5wbHVnaW5zKSB7XHJcblx0XHRcdFx0bGV0IG5hbWVNb2R1bGUgPSBPYmplY3Qua2V5cyhwbHVnaW4pWzBdO1xyXG5cclxuXHRcdFx0XHRpZiAocGx1Z2luW25hbWVNb2R1bGVdLmVuYWJsZWQpIHtcclxuXHRcdFx0XHRcdHN3aXRjaCAobmFtZU1vZHVsZSkge1xyXG5cdFx0XHRcdFx0XHRjYXNlIFwic2hvd1Bhc3NcIjpcclxuXHRcdFx0XHRcdFx0XHRpZiAodHlwZW9mIHNob3dQYXNzICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRsZXQgbW9kdWxlID0gbmV3IHNob3dQYXNzKF90aGlzLmZvcm1zZW5kZXIuZm9ybSwgcGx1Z2luW25hbWVNb2R1bGVdLnBhcmFtcyk7XHJcblx0XHRcdFx0XHRcdFx0XHRtb2R1bGUuaW5pdCgpO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRcdGNhc2UgXCJkaXZCbG9ja1wiOlxyXG5cdFx0XHRcdFx0XHRcdGlmICh0eXBlb2YgZGl2QmxvY2sgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuXHRcdFx0XHRcdFx0XHRcdGxldCBtb2R1bGUgPSBuZXcgZGl2QmxvY2soX3RoaXMuZm9ybXNlbmRlci5mb3JtLCBwbHVnaW5bbmFtZU1vZHVsZV0ucGFyYW1zKTtcclxuXHRcdFx0XHRcdFx0XHRcdG1vZHVsZS5pbml0KCk7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdFx0Y2FzZSBcIlZHTW9kYWxcIjpcclxuXHRcdFx0XHRcdFx0XHRpZiAodHlwZW9mIGRpdkJsb2NrICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRsZXQgbW9kdWxlID0gbmV3IFZHTW9kYWwoX3RoaXMuZm9ybXNlbmRlci5mb3JtLCBwbHVnaW5bbmFtZU1vZHVsZV0ucGFyYW1zKTtcclxuXHRcdFx0XHRcdFx0XHRcdG1vZHVsZS5pbml0KCk7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZHRm9ybVBsdWdpbnM7XHJcbiIsImltcG9ydCBWR1NlbmRlciBmcm9tIFwiLi9WR1NlbmRlclwiO1xyXG5pbXBvcnQgVkdGb3JtUGx1Z2lucyBmcm9tIFwiLi9WR0Zvcm1QbHVnaW5zXCI7XHJcblxyXG5jbGFzcyBWR0Zvcm1TZW5kZXIgZXh0ZW5kcyBWR1NlbmRlciB7XHJcblx0Y29uc3RydWN0b3IoZm9ybSwgYXJnID17fSkge1xyXG5cdFx0c3VwZXIoZm9ybSwgYXJnKTtcclxuXHJcblx0XHR0aGlzLmlzQWxlcnQgPSB0aGlzLnNldHRpbmdzLmFsZXJ0LmVuYWJsZWQ7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiDQmtC+0LvQsdC10LrQuCDRgdGA0LDQsdCw0YLRi9Cy0LDRjtGCINC00L4g0LLRi9C30L7QstCwINCy0L3Rg9GC0YDQtdC90L3QuNGFINC00LXQudGB0YLQstC40LlcclxuXHQgKiBAcGFyYW0gY2FsbGJhY2tcclxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuXHQgKi9cclxuXHRzdWJtaXQoY2FsbGJhY2spIHtcclxuXHRcdGlmICghdGhpcy5pc0FsZXJ0KSB7XHJcblx0XHRcdHJldHVybiBzdXBlci5zdWJtaXQoY2FsbGJhY2spO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y29uc3QgX3RoaXMgPSB0aGlzO1xyXG5cclxuXHRcdFx0cmV0dXJuIHN1cGVyLnN1Ym1pdCh7XHJcblx0XHRcdFx0YmVmb3JlU2VuZDogZnVuY3Rpb24gKGV2ZW50LCB2Z1NlbmRlcikge1xyXG5cdFx0XHRcdFx0aWYgKGNhbGxiYWNrICYmICdiZWZvcmVTZW5kJyBpbiBjYWxsYmFjayAmJiB0eXBlb2YgY2FsbGJhY2suYmVmb3JlU2VuZCA9PT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdFx0XHRjYWxsYmFjay5iZWZvcmVTZW5kKGV2ZW50LCB2Z1NlbmRlcik7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0YnV0dG9uQ29uZGl0aW9uKHZnU2VuZGVyLCAnYmVmb3JlU2VuZCcpO1xyXG5cdFx0XHRcdFx0X3RoaXMuYWxlcnQodmdTZW5kZXIsIG51bGwsICdiZWZvcmVTZW5kJyk7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRlcnJvcjogZnVuY3Rpb24gKGV2ZW50LCB2Z1NlbmRlciwgZGF0YSkge1xyXG5cdFx0XHRcdFx0aWYgKGNhbGxiYWNrICYmICdlcnJvcicgaW4gY2FsbGJhY2sgJiYgdHlwZW9mIGNhbGxiYWNrLmVycm9yID09PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0XHRcdGNhbGxiYWNrLmVycm9yKGV2ZW50LCB2Z1NlbmRlciwgZGF0YSk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0YnV0dG9uQ29uZGl0aW9uKHZnU2VuZGVyKTtcclxuXHRcdFx0XHRcdGpzb25QYXJzZShkYXRhLCAnZXJyb3InLCB2Z1NlbmRlcik7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbiAoZXZlbnQsIHZnU2VuZGVyLCBkYXRhKSB7XHJcblx0XHRcdFx0XHRpZiAoY2FsbGJhY2sgJiYgJ3N1Y2Nlc3MnIGluIGNhbGxiYWNrICYmIHR5cGVvZiBjYWxsYmFjay5zdWNjZXNzID09PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0XHRcdGNhbGxiYWNrLnN1Y2Nlc3MoZXZlbnQsIHZnU2VuZGVyLCBkYXRhKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRidXR0b25Db25kaXRpb24odmdTZW5kZXIpO1xyXG5cdFx0XHRcdFx0anNvblBhcnNlKGRhdGEsICdzdWNjZXNzJywgdmdTZW5kZXIpO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0YW55d2F5OiBmdW5jdGlvbiAoZXZlbnQsIHZnU2VuZGVyLCBkYXRhKSB7XHJcblx0XHRcdFx0XHRpZiAoY2FsbGJhY2sgJiYgJ2FueXdheScgaW4gY2FsbGJhY2sgJiYgdHlwZW9mIGNhbGxiYWNrLmFueXdheSA9PT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdFx0XHRjYWxsYmFjay5hbnl3YXkoZXZlbnQsIHZnU2VuZGVyLCBkYXRhKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRidXR0b25Db25kaXRpb24odmdTZW5kZXIpO1xyXG5cdFx0XHRcdFx0anNvblBhcnNlKGRhdGEsICdhbnl3YXknLCB2Z1NlbmRlcik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGZ1bmN0aW9uIGJ1dHRvbkNvbmRpdGlvbih2Z1NlbmRlciwgc3RhdHVzID0gJ2RlZmF1bHQnKSB7XHJcblx0XHRcdFx0bGV0IGJ0blN1Ym1pdCA9IHZnU2VuZGVyLmV4dEVsZW1lbnQuYnV0dG9uO1xyXG5cdFx0XHRcdGlmIChidG5TdWJtaXQpIHtcclxuXHRcdFx0XHRcdGxldCBidG5UZXh0ID0ge1xyXG5cdFx0XHRcdFx0XHRzZW5kOiAn0J7RgtC/0YDQsNCy0LvRj9C10LwuLi4nLFxyXG5cdFx0XHRcdFx0XHR0ZXh0OiAn0J7RgtC/0YDQsNCy0LjRgtGMJ1xyXG5cdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHRpZiAoYnRuU3VibWl0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1zcGlubmVyJykgJiYgc3RhdHVzID09PSAnYmVmb3JlU2VuZCcpIHtcclxuXHRcdFx0XHRcdFx0YnRuU3VibWl0Lmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsICc8c3BhbiBjbGFzcz1cInNwaW5uZXItYm9yZGVyIHNwaW5uZXItYm9yZGVyLXNtXCI+PC9zcGFuPicpXHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0aWYgKGJ0blN1Ym1pdC5oYXNBdHRyaWJ1dGUoJ2RhdGEtdGV4dCcpKSB7XHJcblx0XHRcdFx0XHRcdGJ0blRleHQudGV4dCA9IGJ0blN1Ym1pdC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGV4dCcpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0bGV0ICRidG5UZXh0ID0gYnRuU3VibWl0LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXRleHRdJyk7XHJcblx0XHRcdFx0XHRcdGlmICgkYnRuVGV4dCkge1xyXG5cdFx0XHRcdFx0XHRcdGJ0blRleHQudGV4dCA9ICRidG5UZXh0LmdldEF0dHJpYnV0ZSgnZGF0YS10ZXh0Jyk7XHJcblx0XHRcdFx0XHRcdFx0YnRuU3VibWl0ID0gJGJ0blRleHQ7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRpZiAoYnRuU3VibWl0Lmhhc0F0dHJpYnV0ZSgnZGF0YS10ZXh0LXNlbmQnKSkge1xyXG5cdFx0XHRcdFx0XHRidG5UZXh0LnNlbmQgPSBidG5TdWJtaXQuZ2V0QXR0cmlidXRlKCdkYXRhLXRleHQtc2VuZCcpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0bGV0ICRidG5UZXh0U2VuZCA9IGJ0blN1Ym1pdC5xdWVyeVNlbGVjdG9yKCdbZGF0YS10ZXh0LXNlbmRdJyk7XHJcblx0XHRcdFx0XHRcdGlmICgkYnRuVGV4dFNlbmQpIHtcclxuXHRcdFx0XHRcdFx0XHRidG5UZXh0LnNlbmQgPSAkYnRuVGV4dFNlbmQuZ2V0QXR0cmlidXRlKCdkYXRhLXRleHQtc2VuZCcpO1xyXG5cdFx0XHRcdFx0XHRcdGJ0blN1Ym1pdCA9ICRidG5UZXh0U2VuZDtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGlmIChzdGF0dXMgPT09ICdiZWZvcmVTZW5kJykge1xyXG5cdFx0XHRcdFx0XHRidG5TdWJtaXQuaW5uZXJIVE1MID0gYnRuVGV4dC5zZW5kO1xyXG5cdFx0XHRcdFx0XHRidG5TdWJtaXQuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0YnRuU3VibWl0LmlubmVySFRNTCA9IGJ0blRleHQudGV4dDtcclxuXHRcdFx0XHRcdFx0YnRuU3VibWl0LnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcclxuXHJcblx0XHRcdFx0XHRcdGxldCBzcGlubmVyID0gdmdTZW5kZXIuZXh0RWxlbWVudC5idXR0b24ucXVlcnlTZWxlY3RvcignLnNwaW5uZXItYm9yZGVyJyk7XHJcblx0XHRcdFx0XHRcdGlmIChzcGlubmVyKSB7XHJcblx0XHRcdFx0XHRcdFx0c3Bpbm5lci5yZW1vdmUoKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZnVuY3Rpb24ganNvblBhcnNlKGRhdGEsIHN0YXR1cywgc2VuZGVyKSB7XHJcblx0XHRcdFx0aWYgKF90aGlzLnNldHRpbmdzLmlzSnNvblBhcnNlICYmIHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xyXG5cdFx0XHRcdFx0bGV0IHBhcnNlckRhdGEgPSB7fTtcclxuXHJcblx0XHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0XHRwYXJzZXJEYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcclxuXHRcdFx0XHRcdFx0X3RoaXMuYWxlcnQoc2VuZGVyLCBwYXJzZXJEYXRhLCBzdGF0dXMpO1xyXG5cdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRcdFx0XHRfdGhpcy5hbGVydChzZW5kZXIsIGRhdGEsIHN0YXR1cyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdF90aGlzLmFsZXJ0KHNlbmRlciwgZGF0YSwgc3RhdHVzKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFsZXJ0KHZnU2VuZGVyLCBkYXRhLCBzdGF0dXMpIHtcclxuXHRcdGlmICghdGhpcy5pc0FsZXJ0KSByZXR1cm4gZmFsc2U7XHJcblxyXG5cdFx0bGV0IHR5cGU7XHJcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5hbGVydC5wYXJhbXMudHlwZSA9PT0gJ2Jsb2NrJykgdHlwZSA9ICdkaXZCbG9jayc7XHJcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5hbGVydC5wYXJhbXMudHlwZSA9PT0gJ21vZGFsJykgdHlwZSA9ICdWR01vZGFsJztcclxuXHJcblx0XHRpZiAodHlwZSkge1xyXG5cdFx0XHR0aGlzLnNldHRpbmdzLnBsdWdpbnMuZmluZChwID0+IHBbdHlwZV0pW3R5cGVdLmVuYWJsZWQgPSB0cnVlO1xyXG5cdFx0XHR0aGlzLnNldHRpbmdzLnBsdWdpbnMuZmluZChwID0+IHBbdHlwZV0pW3R5cGVdLnBhcmFtcyA9IHtcclxuXHRcdFx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0XHRcdHN0YXR1czogc3RhdHVzXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCdwbHVnaW5zJyBpbiB0aGlzLnNldHRpbmdzKSB7XHJcblx0XHRcdG5ldyBWR0Zvcm1QbHVnaW5zKHRoaXMpLmluaXQoKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZHRm9ybVNlbmRlclxyXG4iLCJpbXBvcnQge2FqYXgsIGV2ZW50SGFuZGxlciwgY29sbGVjdERhdGEsIG1lcmdlRGVlcE9iamVjdH0gZnJvbSBcIi4uL3V0aWwvZnVuY3Rpb25zXCI7XHJcbmltcG9ydCBWR0Zvcm1QbHVnaW5zIGZyb20gXCIuL1ZHRm9ybVBsdWdpbnNcIjtcclxuXHJcbmNvbnN0IEVWRU5UX0tFWV9TVUNDRVNTID0gJ3ZnLmZzLnN1Y2Nlc3MnO1xyXG5jb25zdCBFVkVOVF9LRVlfRVJST1IgICA9ICd2Zy5mcy5lcnJvcic7XHJcbmNvbnN0IEVWRU5UX0tFWV9CRUZPUkUgID0gJ3ZnLmZzLmJlZm9yZSc7XHJcbmNvbnN0IEVWRU5UX0tFWV9BTllXQVkgID0gJ3ZnLmZzLmFueXdheSc7XHJcblxyXG5jb25zdCBzZXRQYXJhbXMgPSBmdW5jdGlvbiAoZm9ybSwgcGFyYW1zLCBhcmcpIHtcclxuXHRsZXQgbVBhcmFtcyA9IG1lcmdlRGVlcE9iamVjdChwYXJhbXMsIGFyZyk7XHJcblx0bGV0IGRhdGEgPSBbXS5maWx0ZXIuY2FsbChmb3JtLmF0dHJpYnV0ZXMsIGZ1bmN0aW9uKGF0KSB7IHJldHVybiAvXmRhdGEtLy50ZXN0KGF0Lm5hbWUpOyB9KTtcclxuXHJcblx0Zm9yIChsZXQgdmFsIG9mIGRhdGEpIHtcclxuXHRcdGlmICh2YWwubmFtZSA9PT0gJ2RhdGEtYWxlcnQtdHlwZScgJiYgdmFsLnZhbHVlKSBtUGFyYW1zLmFsZXJ0LnBhcmFtcy50eXBlID0gdmFsLnZhbHVlO1xyXG5cdFx0aWYgKHZhbC5uYW1lID09PSAnZGF0YS1hbGVydCcpIG1QYXJhbXMuYWxlcnQuZW5hYmxlZCA9IHZhbC52YWx1ZSAhPT0gJ2ZhbHNlJztcclxuXHRcdGlmICh2YWwubmFtZSA9PT0gJ2RhdGEtc3VibWl0JykgbVBhcmFtcy5pc1N1Ym1pdCA9IHZhbC52YWx1ZSAhPT0gJ2ZhbHNlJztcclxuXHRcdGlmICh2YWwubmFtZSA9PT0gJ2RhdGEtdmFsaWRhdGUnKSBtUGFyYW1zLmlzVmFsaWRhdGUgPSB2YWwudmFsdWUgIT09ICdmYWxzZSc7XHJcblx0XHRpZiAodmFsLm5hbWUgPT09ICdkYXRhLWpzb24tcGFyc2UnKSBtUGFyYW1zLmlzSnNvblBhcnNlID0gdmFsLnZhbHVlICE9PSAnZmFsc2UnO1xyXG5cdFx0aWYgKHZhbC5uYW1lID09PSAnZGF0YS1yZWRpcmVjdCcgJiYgdmFsLnZhbHVlKSBtUGFyYW1zLnJlZGlyZWN0ID0gdmFsLnZhbHVlO1xyXG5cdFx0aWYgKHZhbC5uYW1lID09PSAnZGF0YS1wbHVnaW5zJyAmJiB2YWwudmFsdWUpIG1QYXJhbXMucGx1Z2lucyA9IGRhdGFQbHVnaW5zKEpTT04ucGFyc2UodmFsLnZhbHVlKSk7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBkYXRhUGx1Z2lucyh2YWx1ZSkge1xyXG5cdFx0bGV0IHAgPSB7fVxyXG5cclxuXHRcdGZvciAoY29uc3QgcGx1Z2luIG9mIHBhcmFtcy5wbHVnaW5zKSB7XHJcblx0XHRcdGxldCBuYW1lUGx1Z2luID0gT2JqZWN0LmtleXMocGx1Z2luKVswXSxcclxuXHRcdFx0XHRuYW1lTW9kdWxlID0gT2JqZWN0LmtleXModmFsdWUpWzBdO1xyXG5cclxuXHRcdFx0aWYgKG5hbWVQbHVnaW4gPT09IG5hbWVNb2R1bGUpIHtcclxuXHRcdFx0XHRwID0gbWVyZ2VEZWVwT2JqZWN0KHBsdWdpbiwgdmFsdWUpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHA7XHJcblx0fVxyXG5cclxuXHRtUGFyYW1zLmFjdGlvbiA9IGZvcm0uZ2V0QXR0cmlidXRlKCdhY3Rpb24nKSB8fCBtUGFyYW1zLmFjdGlvbjtcclxuXHRtUGFyYW1zLm1ldGhvZCA9IGZvcm0uZ2V0QXR0cmlidXRlKCdtZXRob2QnKSB8fCBtUGFyYW1zLm1ldGhvZDtcclxuXHJcblx0cmV0dXJuIG1QYXJhbXNcclxufVxyXG5cclxuY2xhc3MgVkdTZW5kZXIge1xyXG5cdGNvbnN0cnVjdG9yKGZvcm0sIGFyZyA9IHt9KSB7XHJcblx0XHR0aGlzLmV4dEVsZW1lbnQgPSB7fTtcclxuXHRcdHRoaXMuc2V0dGluZ3MgPSB7fTtcclxuXHRcdHRoaXMuZm9ybSA9IG51bGw7XHJcblxyXG5cdFx0Y29uc3QgZGVmYXVsdFBhcmFtcyA9IHtcclxuXHRcdFx0YWN0aW9uOiBsb2NhdGlvbi5ocmVmLFxyXG5cdFx0XHRtZXRob2Q6ICdwb3N0JyxcclxuXHRcdFx0ZmllbGRzOiBbXSxcclxuXHRcdFx0cmVkaXJlY3Q6IG51bGwsXHJcblx0XHRcdGlzSnNvblBhcnNlOiB0cnVlLFxyXG5cdFx0XHRpc1ZhbGlkYXRlOiBmYWxzZSxcclxuXHRcdFx0aXNTdWJtaXQ6IHRydWUsXHJcblx0XHRcdGFsZXJ0OiB7XHJcblx0XHRcdFx0ZW5hYmxlZDogdHJ1ZSxcclxuXHRcdFx0XHRwYXJhbXM6IHtcclxuXHRcdFx0XHRcdHR5cGU6ICdtb2RhbCdcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9LFxyXG5cdFx0XHRwbHVnaW5zOiBbXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0c2hvd1Bhc3M6IHtcclxuXHRcdFx0XHRcdFx0ZW5hYmxlZDogdHJ1ZSxcclxuXHRcdFx0XHRcdFx0cGFyYW1zOiB7fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0ZGl2QmxvY2s6IHtcclxuXHRcdFx0XHRcdFx0ZW5hYmxlZDogZmFsc2UsXHJcblx0XHRcdFx0XHRcdHBhcmFtczoge31cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdFZHTW9kYWw6IHtcclxuXHRcdFx0XHRcdFx0ZW5hYmxlZDogZmFsc2UsXHJcblx0XHRcdFx0XHRcdHBhcmFtczoge31cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdF1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIWZvcm0pIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcign0J/QtdGA0LLRi9C5INC/0LDRgNCw0LzQtdGC0YAg0L3QtSDQtNC+0LvQttC10L0g0LHRi9GC0Ywg0L/Rg9GB0YLRi9C8Jyk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGlmICh0eXBlb2YgZm9ybSA9PT0gJ3N0cmluZycpIHtcclxuXHRcdFx0XHRsZXQgJGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGZvcm0pO1xyXG5cdFx0XHRcdGlmICgkZm9ybSkge1xyXG5cdFx0XHRcdFx0dGhpcy5mb3JtID0gZm9ybTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5mb3JtID0gZm9ybTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHRoaXMuZm9ybSkge1xyXG5cdFx0XHRcdHRoaXMuc2V0dGluZ3MgPSBzZXRQYXJhbXMoZm9ybSwgZGVmYXVsdFBhcmFtcywgYXJnKTtcclxuXHJcblx0XHRcdFx0dGhpcy5jbGFzc2VzID0ge1xyXG5cdFx0XHRcdFx0Z2VuZXJhbDogJ3ZnLWZvcm0tc2VuZGVyJ1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKHRoaXMuc2V0dGluZ3MuZmllbGRzICYmIHR5cGVvZiB0aGlzLnNldHRpbmdzLmZpZWxkcyA9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0XHR0aGlzLnNldHRpbmdzLmZpZWxkcyA9IHRoaXMuc2V0dGluZ3MuZmllbGRzKCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR0aGlzLmluaXQoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0aW5pdCgpIHtcclxuXHRcdGNvbnN0IF90aGlzID0gdGhpcztcclxuXHJcblx0XHRfdGhpcy5mb3JtLmNsYXNzTGlzdC5hZGQoX3RoaXMuY2xhc3Nlcy5nZW5lcmFsKTtcclxuXHJcblx0XHRpZiAoX3RoaXMuc2V0dGluZ3MuaXNWYWxpZGF0ZSkge1xyXG5cdFx0XHRfdGhpcy5mb3JtLnNldEF0dHJpYnV0ZSgnbm92YWxpZGF0ZScsICcnKTtcclxuXHRcdFx0X3RoaXMuZm9ybS5jbGFzc0xpc3QuYWRkKCduZWVkcy12YWxpZGF0aW9uJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGJ0blN1Ym1pdCA9IF90aGlzLmZvcm0ucXVlcnlTZWxlY3RvcignW3R5cGU9XCJzdWJtaXRcIl0nKTtcclxuXHRcdGlmICghYnRuU3VibWl0KSBidG5TdWJtaXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZm9ybT1cIicgKyBfdGhpcy5mb3JtLmlkICsgJ1wiXScpO1xyXG5cdFx0X3RoaXMuZXh0RWxlbWVudC5idXR0b24gPSBidG5TdWJtaXQ7XHJcblxyXG5cdFx0aWYgKCdwbHVnaW5zJyBpbiBfdGhpcy5zZXR0aW5ncykge1xyXG5cdFx0XHRuZXcgVkdGb3JtUGx1Z2lucyhfdGhpcykuaW5pdCgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdF90aGlzLmlzSW5pdCA9IHRydWU7XHJcblx0fVxyXG5cclxuXHRzdWJtaXQoY2FsbGJhY2spIHtcclxuXHRcdGlmICghdGhpcy5pc0luaXQpIHJldHVybiBmYWxzZTtcclxuXHRcdGNvbnN0IF90aGlzID0gdGhpcztcclxuXHJcblx0XHRfdGhpcy5mb3JtLm9uc3VibWl0ID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdGlmIChfdGhpcy5zZXR0aW5ncy5pc1ZhbGlkYXRlKSB7XHJcblx0XHRcdFx0aWYgKCFfdGhpcy5mb3JtLmNoZWNrVmFsaWRpdHkoKSkge1xyXG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuXHRcdFx0XHRcdF90aGlzLmZvcm0uY2xhc3NMaXN0LmFkZCgnd2FzLXZhbGlkYXRlZCcpO1xyXG5cclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICghX3RoaXMuc2V0dGluZ3MuaXNTdWJtaXQpIHJldHVybiBmYWxzZTtcclxuXHJcblx0XHRcdGxldCBkYXRhID0gbmV3IEZvcm1EYXRhKF90aGlzLmZvcm0pO1xyXG5cdFx0XHRpZiAodHlwZW9mIF90aGlzLnNldHRpbmdzLmZpZWxkcyA9PT0gJ29iamVjdCcpIHtcclxuXHRcdFx0XHRfdGhpcy5kYXRhID0gY29sbGVjdERhdGEoZGF0YSwgX3RoaXMuc2V0dGluZ3MuZmllbGRzKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIF90aGlzLnJlcXVlc3QoY2FsbGJhY2ssIGV2ZW50KTtcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRyZXF1ZXN0KGNhbGxiYWNrLCBldmVudCkge1xyXG5cdFx0aWYgKCF0aGlzLmlzSW5pdCkgcmV0dXJuIGZhbHNlO1xyXG5cdFx0Y29uc3QgX3RoaXMgPSB0aGlzO1xyXG5cclxuXHRcdGxldCBtZXRob2QgPSBfdGhpcy5zZXR0aW5ncy5tZXRob2QudG9Mb3dlckNhc2UoKSxcclxuXHRcdFx0dXJsID0gX3RoaXMuc2V0dGluZ3MuYWN0aW9uLFxyXG5cdFx0XHRkYXRhID0gX3RoaXMuZGF0YTtcclxuXHJcblx0XHRpZiAoY2FsbGJhY2sgJiYgJ2JlZm9yZVNlbmQnIGluIGNhbGxiYWNrKSB7XHJcblx0XHRcdGlmICh0eXBlb2YgY2FsbGJhY2suYmVmb3JlU2VuZCA9PT0gJ2Z1bmN0aW9uJykgY2FsbGJhY2suYmVmb3JlU2VuZChldmVudCwgX3RoaXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGV2ZW50SGFuZGxlci5vbihfdGhpcy5mb3JtLCBFVkVOVF9LRVlfQkVGT1JFKTtcclxuXHJcblx0XHRpZiAobWV0aG9kID09PSAncG9zdCcpIHtcclxuXHRcdFx0YWpheC5wb3N0KHVybCwgZGF0YSwgZnVuY3Rpb24oc3RhdHVzLCBkYXRhKSB7XHJcblx0XHRcdFx0YW5zd2VyKHN0YXR1cywgZGF0YSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChtZXRob2QgPT09ICdnZXQnKSB7XHJcblx0XHRcdGFqYXguZ2V0KHVybCwgZGF0YSwgZnVuY3Rpb24oc3RhdHVzLCBkYXRhKSB7XHJcblx0XHRcdFx0YW5zd2VyKHN0YXR1cywgZGF0YSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIGFuc3dlcihzdGF0dXMsIGRhdGEpIHtcclxuXHRcdFx0X3RoaXMuZm9ybS5jbGFzc0xpc3QucmVtb3ZlKCd3YXMtdmFsaWRhdGVkJyk7XHJcblxyXG5cdFx0XHRpZiAodHlwZW9mIHN0YXR1cyA9PT0gJ3N0cmluZycgJiYgc3RhdHVzID09PSAnZXJyb3InKSB7XHJcblx0XHRcdFx0aWYgKGNhbGxiYWNrICYmICdlcnJvcicgaW4gY2FsbGJhY2spIHtcclxuXHRcdFx0XHRcdGlmICh0eXBlb2YgY2FsbGJhY2suZXJyb3IgPT09ICdmdW5jdGlvbicpIGNhbGxiYWNrLmVycm9yKGV2ZW50LCBfdGhpcywgZGF0YSk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRldmVudEhhbmRsZXIub24oX3RoaXMuZm9ybSwgRVZFTlRfS0VZX0VSUk9SKTtcclxuXHRcdFx0fSBlbHNlIGlmICh0eXBlb2Ygc3RhdHVzID09PSAnc3RyaW5nJyAmJiBzdGF0dXMgPT09ICdzdWNjZXNzJykge1xyXG5cdFx0XHRcdGlmIChjYWxsYmFjayAmJiAnc3VjY2VzcycgaW4gY2FsbGJhY2spIHtcclxuXHRcdFx0XHRcdGlmICh0eXBlb2YgY2FsbGJhY2suc3VjY2VzcyA9PT0gJ2Z1bmN0aW9uJykgY2FsbGJhY2suc3VjY2VzcyhldmVudCwgX3RoaXMsIGRhdGEpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0ZXZlbnRIYW5kbGVyLm9uKF90aGlzLmZvcm0sIEVWRU5UX0tFWV9TVUNDRVNTKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRpZiAodHlwZW9mIGNhbGxiYWNrLmFueXdheSA9PT0gJ2Z1bmN0aW9uJykgY2FsbGJhY2suYW55d2F5KGV2ZW50LCBfdGhpcywgZGF0YSk7XHJcblx0XHRcdFx0ZXZlbnRIYW5kbGVyLm9uKF90aGlzLmZvcm0sIEVWRU5UX0tFWV9BTllXQVkpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZWRpcmVjdCgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIHJlZGlyZWN0KCkge1xyXG5cdFx0XHRpZiAoX3RoaXMuc2V0dGluZ3MucmVkaXJlY3QpIHtcclxuXHRcdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZiA9IF90aGlzLnNldHRpbmdzLnJlZGlyZWN0O1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVkdTZW5kZXI7XHJcbiIsImltcG9ydCB7Z2V0U3ZnfSBmcm9tIFwiLi4vLi4vdXRpbC9zdmdcIjtcclxuXHJcbmNsYXNzIGRpdkJsb2NrIHtcclxuXHRjb25zdHJ1Y3Rvcihmb3JtLCBhcmcpIHtcclxuXHRcdHRoaXMuZm9ybSA9IGZvcm07XHJcblx0XHR0aGlzLnBhcmFtcyA9IGFyZztcclxuXHRcdHRoaXMuY2xhc3NlcyA9IHtcclxuXHRcdFx0Y29udGFpbmVyOiAndmctZm9ybS1zZW5kZXItLWFsZXJ0LWJsb2NrJ1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0aW5pdCgpIHtcclxuXHRcdGNvbnN0IF90aGlzID0gdGhpcztcclxuXHJcblx0XHRsZXQgZWwgPSBfdGhpcy5mb3JtLnF1ZXJ5U2VsZWN0b3IoJy4nICsgX3RoaXMuY2xhc3Nlcy5jb250YWluZXIpO1xyXG5cdFx0aWYgKCFlbCkgZWwgPSBfdGhpcy5kcmF3KCk7XHJcblxyXG5cdFx0aWYgKF90aGlzLnBhcmFtcy5zdGF0dXMgPT09ICdiZWZvcmVTZW5kJykge1xyXG5cdFx0XHRpZiAoZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xyXG5cdFx0XHRcdF90aGlzLnRvZ2dsZVNsaWRlKGVsKTtcclxuXHRcdFx0XHRlbC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0X3RoaXMuc2V0QWN0aXZlKGVsKTtcclxuXHRcdFx0X3RoaXMuc2V0VGV4dChlbCk7XHJcblx0XHRcdF90aGlzLmNsb3NlKGVsKTtcclxuXHRcdFx0X3RoaXMudG9nZ2xlU2xpZGUoZWwpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c2V0QWN0aXZlKGVsKSB7XHJcblx0XHRlbC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuXHRcdGxldCBlbFNob3cgPSBlbC5xdWVyeVNlbGVjdG9yQWxsKCcuc2hvdycpO1xyXG5cdFx0aWYgKGVsU2hvdy5sZW5ndGgpIHtcclxuXHRcdFx0Zm9yIChjb25zdCBlbGVtZW50IG9mIGVsU2hvdykge1xyXG5cdFx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRzZXRUZXh0KGVsKSB7XHJcblx0XHRjb25zdCBfdGhpcyA9IHRoaXM7XHJcblx0XHRsZXQgZGF0YSA9IF90aGlzLnBhcmFtcy5kYXRhLFxyXG5cdFx0XHRfY2xhc3MgPSBfdGhpcy5wYXJhbXMuc3RhdHVzO1xyXG5cclxuXHRcdGlmICgoJ2Vycm9ycycgaW4gZGF0YSAmJiBkYXRhLmVycm9ycykgfHwgKCdlcnJvcicgaW4gZGF0YSAmJiBkYXRhLmVycm9yKSkgX2NsYXNzID0gJ2Rhbmdlcic7XHJcblxyXG5cdFx0bGV0ICRhbGVydCA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy52Zy1hbGVydC0nICsgX2NsYXNzKTtcclxuXHRcdGlmICgkYWxlcnQpIHtcclxuXHRcdFx0bGV0ICR0ZXh0ID0gJGFsZXJ0LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWFsZXJ0LScrIF9jbGFzcyArJy10ZXh0XScpO1xyXG5cdFx0XHRpZiAoJHRleHQpIHtcclxuXHRcdFx0XHRpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XHJcblx0XHRcdFx0XHQkdGV4dC5pbm5lckhUTUwgPSBkYXRhO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAoKCdtc2cnIGluIGRhdGEpKSB7XHJcblx0XHRcdFx0XHQkdGV4dC5pbm5lckhUTUwgPSBkYXRhLm1zZztcclxuXHJcblx0XHRcdFx0XHRsZXQgJHRpdGxlID0gJGFsZXJ0LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWFsZXJ0LScrIF9jbGFzcyArJy10aXRsZV0nKTtcclxuXHRcdFx0XHRcdGlmICgkdGl0bGUgJiYgKCd0aXRsZScgaW4gZGF0YSkpICR0aXRsZS5pbm5lckhUTUwgPSBkYXRhLnRpdGxlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JGFsZXJ0LmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGVsLmlubmVySFRNTCA9IGRhdGEubXNnXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRjbG9zZShlbCkge1xyXG5cdFx0Y29uc3QgX3RoaXMgPSB0aGlzO1xyXG5cclxuXHRcdGxldCBlbENsb3NlID0gZWwucXVlcnlTZWxlY3RvcignW2RhdGEtZGlzbWlzcz1cImFsZXJ0LWJsb2NrXCJdJyk7XHJcblx0XHRpZiAoZWxDbG9zZSkge1xyXG5cdFx0XHRlbENsb3NlLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0X3RoaXMudG9nZ2xlU2xpZGUoZWwpO1xyXG5cdFx0XHRcdGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGRyYXcoKSB7XHJcblx0XHRjb25zdCBfdGhpcyA9IHRoaXM7XHJcblx0XHRsZXQgZm9ybSA9IHRoaXMuZm9ybTtcclxuXHJcblx0XHRsZXQgZWxGb3JtSUQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mb3JtPVwiJyArIGZvcm0uaWQgKyAnXCJdJyk7XHJcblx0XHRpZiAoZWxGb3JtSUQpIHJldHVybiBlbEZvcm1JRDtcclxuXHJcblx0XHRsZXQgZWxCbG9jayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cdFx0ZWxCbG9jay5jbGFzc0xpc3QuYWRkKF90aGlzLmNsYXNzZXMuY29udGFpbmVyKTtcclxuXHJcblx0XHRlbEJsb2NrLmlubmVySFRNTCA9ICc8ZGl2IGNsYXNzPVwiY2xvc2VcIj48YSBocmVmPVwiI1wiIGRhdGEtZGlzbWlzcz1cImFsZXJ0LWJsb2NrXCI+JyArIGdldFN2ZygnY3Jvc3MnKSArICc8L2E+PC9kaXY+JyArXHJcblx0XHRcdCc8ZGl2IGNsYXNzPVwidmctYWxlcnQgdmctYWxlcnQtZGFuZ2VyXCI+JyArXHJcblx0XHRcdCdcdDxkaXYgY2xhc3M9XCJzdmctYXJlYVwiPicgKyBnZXRTdmcoJ2Vycm9yJykgKyAnPC9kaXY+JyArXHJcblx0XHRcdCdcdDxkaXYgY2xhc3M9XCJjb250ZW50LWFyZWFcIj4nICtcclxuXHRcdFx0J1x0XHQ8ZGl2IGNsYXNzPVwidGl0bGUtYXJlYVwiIGRhdGEtYWxlcnQtZGFuZ2VyLXRpdGxlPjwvZGl2PicgK1xyXG5cdFx0XHQnXHRcdDxkaXYgY2xhc3M9XCJ0ZXh0LWFyZWFcIiBkYXRhLWFsZXJ0LWRhbmdlci10ZXh0PjwvZGl2PicgK1xyXG5cdFx0XHQnXHQ8L2Rpdj4nICtcclxuXHRcdFx0JzwvZGl2PicgK1xyXG5cdFx0XHQnPGRpdiBjbGFzcz1cInZnLWFsZXJ0IHZnLWFsZXJ0LXN1Y2Nlc3NcIj4nICtcclxuXHRcdFx0J1x0PGRpdiBjbGFzcz1cInN2Zy1hcmVhXCI+JyArIGdldFN2Zygnc3VjY2VzcycpICsgJzwvZGl2PicgK1xyXG5cdFx0XHQnXHQ8ZGl2IGNsYXNzPVwiY29udGVudC1hcmVhXCI+JyArXHJcblx0XHRcdCdcdFx0PGRpdiBjbGFzcz1cInRpdGxlLWFyZWFcIiBkYXRhLWFsZXJ0LXN1Y2Nlc3MtdGl0bGU+PC9kaXY+JyArXHJcblx0XHRcdCdcdFx0PGRpdiBjbGFzcz1cInRleHQtYXJlYVwiIGRhdGEtYWxlcnQtc3VjY2Vzcy10ZXh0PjwvZGl2PicgK1xyXG5cdFx0XHQnXHQ8L2Rpdj4nICtcclxuXHRcdFx0JzwvZGl2Pic7XHJcblxyXG5cdFx0Zm9ybS5wcmVwZW5kKGVsQmxvY2spO1xyXG5cclxuXHRcdHJldHVybiBlbEJsb2NrO1xyXG5cdH1cclxuXHJcblx0dG9nZ2xlU2xpZGUoZWwpIHtcclxuXHRcdGlmIChlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbWF4LWhlaWdodCcpKSB7XHJcblx0XHRcdGlmIChlbC5zdHlsZS5tYXhIZWlnaHQucmVwbGFjZSgncHgnLCAnJykucmVwbGFjZSgnJScsICcnKSA9PT0gJzAnKSB7XHJcblx0XHRcdFx0ZWwuc3R5bGUubWF4SGVpZ2h0ID0gZWwuZ2V0QXR0cmlidXRlKCdkYXRhLW1heC1oZWlnaHQnKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRlbC5zdHlsZS5tYXhIZWlnaHQgPSAnMCc7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGxldCBlbF9tYXhfaGVpZ2h0ICAgICAgID0gZ2V0SGVpZ2h0KGVsKSArICdweCcgfHwgJzAnO1xyXG5cdFx0XHRlbC5zdHlsZVsndHJhbnNpdGlvbiddICAgICAgICAgPSAnbWF4LWhlaWdodCAwLjVzIGVhc2UtaW4tb3V0JztcclxuXHRcdFx0ZWwuc3R5bGUub3ZlcmZsb3dZICAgICAgICAgICAgID0gJ2hpZGRlbic7XHJcblx0XHRcdGVsLnN0eWxlLm1heEhlaWdodCAgICAgICAgICAgICA9ICcwJztcclxuXHRcdFx0ZWwuc2V0QXR0cmlidXRlKCdkYXRhLW1heC1oZWlnaHQnLCBlbF9tYXhfaGVpZ2h0KTtcclxuXHRcdFx0ZWwuc3R5bGUuZGlzcGxheSAgICAgICAgICAgICAgID0gJ2Jsb2NrJztcclxuXHJcblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0ZWwuc3R5bGUubWF4SGVpZ2h0ID0gZWxfbWF4X2hlaWdodDtcclxuXHRcdFx0fSwgMTApO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIGdldEhlaWdodChlbCkge1xyXG5cdFx0XHRsZXQgZWxfc3R5bGUgICAgICA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsKSxcclxuXHRcdFx0XHRlbF9kaXNwbGF5ICAgID0gZWxfc3R5bGUuZGlzcGxheSxcclxuXHRcdFx0XHRlbF9wb3NpdGlvbiAgID0gZWxfc3R5bGUucG9zaXRpb24sXHJcblx0XHRcdFx0ZWxfdmlzaWJpbGl0eSA9IGVsX3N0eWxlLnZpc2liaWxpdHksXHJcblx0XHRcdFx0ZWxfbWF4X2hlaWdodCA9IGVsX3N0eWxlLm1heEhlaWdodC5yZXBsYWNlKCdweCcsICcnKS5yZXBsYWNlKCclJywgJycpLFxyXG5cdFx0XHRcdHdhbnRlZF9oZWlnaHQgPSAwO1xyXG5cclxuXHRcdFx0aWYgKGVsX2Rpc3BsYXkgIT09ICdub25lJyAmJiBlbF9tYXhfaGVpZ2h0ICE9PSAnMCcpIHtcclxuXHRcdFx0XHRyZXR1cm4gZWwub2Zmc2V0SGVpZ2h0O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRlbC5zdHlsZS5wb3NpdGlvbiAgID0gJ2Fic29sdXRlJztcclxuXHRcdFx0ZWwuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xyXG5cdFx0XHRlbC5zdHlsZS5kaXNwbGF5ICAgID0gJ2Jsb2NrJztcclxuXHJcblx0XHRcdHdhbnRlZF9oZWlnaHQgICAgID0gZWwub2Zmc2V0SGVpZ2h0O1xyXG5cclxuXHRcdFx0ZWwuc3R5bGUuZGlzcGxheSAgICA9IGVsX2Rpc3BsYXk7XHJcblx0XHRcdGVsLnN0eWxlLnBvc2l0aW9uICAgPSBlbF9wb3NpdGlvbjtcclxuXHRcdFx0ZWwuc3R5bGUudmlzaWJpbGl0eSA9IGVsX3Zpc2liaWxpdHk7XHJcblxyXG5cdFx0XHRyZXR1cm4gd2FudGVkX2hlaWdodDtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRpdkJsb2NrO1xyXG4iLCJpbXBvcnQge2dldFN2Z30gZnJvbSBcIi4uLy4uL3V0aWwvc3ZnXCI7XHJcblxyXG5jbGFzcyBWR01vZGFsIHtcclxuXHRjb25zdHJ1Y3Rvcihmb3JtLCBhcmcpIHtcclxuXHRcdHRoaXMuZm9ybSA9IGZvcm07XHJcblx0XHR0aGlzLnBhcmFtcyA9IGFyZztcclxuXHRcdHRoaXMuY2xhc3NlcyA9IHtcclxuXHRcdFx0Y29udGFpbmVyOiAndmctZm9ybS1zZW5kZXItLWFsZXJ0LW1vZGFsJyxcclxuXHRcdFx0YmFja2Ryb3A6ICAndmctZm9ybS1zZW5kZXItLWFsZXJ0LWJhY2tkcm9wJ1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0aW5pdCgpIHtcclxuXHRcdGNvbnN0IF90aGlzID0gdGhpcztcclxuXHJcblx0XHRsZXQgZWwgPSBfdGhpcy5mb3JtLnF1ZXJ5U2VsZWN0b3IoJy4nICsgX3RoaXMuY2xhc3Nlcy5jb250YWluZXIpO1xyXG5cdFx0aWYgKCFlbCkgZWwgPSBfdGhpcy5kcmF3KCk7XHJcblxyXG5cdFx0X3RoaXMudG9nZ2xlKGVsKTtcclxuXHR9XHJcblxyXG5cdHRvZ2dsZShlbCkge1xyXG5cdFx0bGV0IF90aGlzID0gdGhpcztcclxuXHJcblx0XHRsZXQgYmFja2Ryb3AgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHRcdGJhY2tkcm9wLmNsYXNzTGlzdC5hZGQoX3RoaXMuY2xhc3Nlcy5iYWNrZHJvcCk7XHJcblxyXG5cdFx0aWYgKCFkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5jb250YWlucygndmctbW9kYWwtb3BlbicpKSB7XHJcblx0XHRcdGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgndmctbW9kYWwtb3BlbicpO1xyXG5cdFx0XHRlbC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuXHJcblx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRcdGVsLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG5cdFx0XHRcdGJhY2tkcm9wLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG5cdFx0XHR9LCAxMDApO1xyXG5cclxuXHRcdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmQoYmFja2Ryb3ApO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZHJhdygpIHtcclxuXHRcdGNvbnN0IF90aGlzID0gdGhpcztcclxuXHJcblx0XHRsZXQgYWxlcnRNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy4nICsgX3RoaXMuY2xhc3Nlcy5jb250YWluZXIpO1xyXG5cdFx0aWYgKGFsZXJ0TW9kYWwpIHtcclxuXHRcdFx0cmV0dXJuIGFsZXJ0TW9kYWw7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IG1vZGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblx0XHRtb2RhbC5jbGFzc0xpc3QuYWRkKF90aGlzLmNsYXNzZXMuY29udGFpbmVyKTtcclxuXHRcdG1vZGFsLmlubmVySFRNTCA9ICc8ZGl2IGNsYXNzPVwibW9kYWwtY29udGVudFwiPjwvZGl2Pic7XHJcblxyXG5cdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmQobW9kYWwpO1xyXG5cclxuXHRcdHJldHVybiBtb2RhbDtcclxuXHR9XHJcbn1cclxuXHJcbi8qd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZXZlbnQpID0+IHtcclxuXHRpZiAoZXZlbnQua2V5ID09PSAnRXNjYXBlJyB8fCBldmVudC5rZXkgPT09ICdFc2MnKSB7XHJcblx0XHRpZiAoZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuY29udGFpbnMoJ3ZnLW1vZGFsLW9wZW4nKSkge1xyXG5cdFx0XHRWR01vZGFsLmNsb3NlKCk7XHJcblx0XHR9XHJcblx0fVxyXG59KTsqL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVkdNb2RhbDtcclxuIiwiY2xhc3Mgc2hvd1Bhc3Mge1xyXG5cdGNvbnN0cnVjdG9yKGZvcm0gPSBudWxsLCBhcmcgPSB7fSkge1xyXG5cdFx0dGhpcy5mb3JtID0gZm9ybTtcclxuXHRcdHRoaXMucGFyYW1zID0gYXJnO1xyXG5cclxuXHRcdHRoaXMuZXllT3BlbiA9ICc8c3ZnIHdpZHRoPVwiMjRweFwiIGlkPVwic3ZnRXllT3BlblwiIGhlaWdodD1cIjI0cHhcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XFxuJyArXHJcblx0XHRcdCc8cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNMTIgOC4yNUM5LjkyODkzIDguMjUgOC4yNSA5LjkyODkzIDguMjUgMTJDOC4yNSAxNC4wNzExIDkuOTI4OTMgMTUuNzUgMTIgMTUuNzVDMTQuMDcxMSAxNS43NSAxNS43NSAxNC4wNzExIDE1Ljc1IDEyQzE1Ljc1IDkuOTI4OTMgMTQuMDcxMSA4LjI1IDEyIDguMjVaTTkuNzUgMTJDOS43NSAxMC43NTc0IDEwLjc1NzQgOS43NSAxMiA5Ljc1QzEzLjI0MjYgOS43NSAxNC4yNSAxMC43NTc0IDE0LjI1IDEyQzE0LjI1IDEzLjI0MjYgMTMuMjQyNiAxNC4yNSAxMiAxNC4yNUMxMC43NTc0IDE0LjI1IDkuNzUgMTMuMjQyNiA5Ljc1IDEyWlwiIGZpbGw9XCIjNDk1MDU3XCIvPlxcbicgK1xyXG5cdFx0XHQnPHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTEyIDMuMjVDNy40ODU4NyAzLjI1IDQuNDQ1MjkgNS45NTQyIDIuNjgwNTcgOC4yNDY4NkwyLjY0ODc0IDguMjg4MkMyLjI0OTY0IDguODA2NTMgMS44ODIwNiA5LjI4MzkyIDEuNjMyNjkgOS44NDg0QzEuMzY1NjQgMTAuNDUyOSAxLjI1IDExLjExMTcgMS4yNSAxMkMxLjI1IDEyLjg4ODMgMS4zNjU2NCAxMy41NDcxIDEuNjMyNjkgMTQuMTUxNkMxLjg4MjA2IDE0LjcxNjEgMi4yNDk2NCAxNS4xOTM1IDIuNjQ4NzUgMTUuNzExOEwyLjY4MDU3IDE1Ljc1MzFDNC40NDUyOSAxOC4wNDU4IDcuNDg1ODcgMjAuNzUgMTIgMjAuNzVDMTYuNTE0MSAyMC43NSAxOS41NTQ3IDE4LjA0NTggMjEuMzE5NCAxNS43NTMxTDIxLjM1MTIgMTUuNzExOEMyMS43NTA0IDE1LjE5MzUgMjIuMTE3OSAxNC43MTYxIDIyLjM2NzMgMTQuMTUxNkMyMi42MzQ0IDEzLjU0NzEgMjIuNzUgMTIuODg4MyAyMi43NSAxMkMyMi43NSAxMS4xMTE3IDIyLjYzNDQgMTAuNDUyOSAyMi4zNjczIDkuODQ4NEMyMi4xMTc5IDkuMjgzOTEgMjEuNzUwNCA4LjgwNjUyIDIxLjM1MTIgOC4yODgxOEwyMS4zMTk0IDguMjQ2ODZDMTkuNTU0NyA1Ljk1NDIgMTYuNTE0MSAzLjI1IDEyIDMuMjVaTTMuODY5MjIgOS4xNjE4QzUuNDk4NjQgNy4wNDQ5MiA4LjE1MDM2IDQuNzUgMTIgNC43NUMxNS44NDk2IDQuNzUgMTguNTAxNCA3LjA0NDkyIDIwLjEzMDggOS4xNjE4QzIwLjU2OTQgOS43MzE1OSAyMC44MjYzIDEwLjA3MjEgMjAuOTk1MiAxMC40NTQ1QzIxLjE1MzIgMTAuODEyIDIxLjI1IDExLjI0ODkgMjEuMjUgMTJDMjEuMjUgMTIuNzUxMSAyMS4xNTMyIDEzLjE4OCAyMC45OTUyIDEzLjU0NTVDMjAuODI2MyAxMy45Mjc5IDIwLjU2OTQgMTQuMjY4NCAyMC4xMzA4IDE0LjgzODJDMTguNTAxNCAxNi45NTUxIDE1Ljg0OTYgMTkuMjUgMTIgMTkuMjVDOC4xNTAzNiAxOS4yNSA1LjQ5ODY0IDE2Ljk1NTEgMy44NjkyMiAxNC44MzgyQzMuNDMwNjQgMTQuMjY4NCAzLjE3Mzc0IDEzLjkyNzkgMy4wMDQ3NiAxMy41NDU1QzIuODQ2ODQgMTMuMTg4IDIuNzUgMTIuNzUxMSAyLjc1IDEyQzIuNzUgMTEuMjQ4OSAyLjg0Njg0IDEwLjgxMiAzLjAwNDc2IDEwLjQ1NDVDMy4xNzM3NCAxMC4wNzIxIDMuNDMwNjMgOS43MzE1OSAzLjg2OTIyIDkuMTYxOFpcIiBmaWxsPVwiIzQ5NTA1N1wiLz5cXG4nICtcclxuXHRcdFx0Jzwvc3ZnPic7XHJcblx0XHR0aGlzLmV5ZUNsb3NlID0gJzxzdmcgd2lkdGg9XCIyNHB4XCIgaWQ9XCJzdmdFeWVDbG9zZVwiIGhlaWdodD1cIjI0cHhcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XFxuJyArXHJcblx0XHRcdCc8cGF0aCBkPVwiTTIuNjg5MzYgNi43MDQ1NkMyLjUyNjE5IDYuMzIzODQgMi4wODUyOCA2LjE0NzQ3IDEuNzA0NTYgNi4zMTA2NEMxLjMyMzg0IDYuNDczODEgMS4xNDc0NyA2LjkxNDcyIDEuMzEwNjQgNy4yOTU0NEwyLjY4OTM2IDYuNzA0NTZaTTE1LjU4NzIgMTMuMzI4N0wxNS4zMTI1IDEyLjYzMDhMMTUuNTg3MiAxMy4zMjg3Wk05LjA0MTQ1IDEzLjczNzdDOS4yNjczNiAxMy4zOTA2IDkuMTY5MDQgMTIuOTI2IDguODIxODUgMTIuNzAwMUM4LjQ3NDY2IDEyLjQ3NDIgOC4wMTAwOCAxMi41NzI1IDcuNzg0MTcgMTIuOTE5N0w5LjA0MTQ1IDEzLjczNzdaTTYuMzcxMzYgMTUuMDkxQzYuMTQ1NDUgMTUuNDM4MSA2LjI0Mzc3IDE1LjkwMjcgNi41OTA5NiAxNi4xMjg2QzYuOTM4MTUgMTYuMzU0NSA3LjQwMjczIDE2LjI1NjIgNy42Mjg2NCAxNS45MDlMNi4zNzEzNiAxNS4wOTFaTTIyLjY4OTQgNy4yOTU0NEMyMi44NTI1IDYuOTE0NzIgMjIuNjc2MiA2LjQ3MzgxIDIyLjI5NTQgNi4zMTA2NEMyMS45MTQ3IDYuMTQ3NDcgMjEuNDczOCA2LjMyMzg0IDIxLjMxMDYgNi43MDQ1NkwyMi42ODk0IDcuMjk1NDRaTTE5IDExLjEyODhMMTguNDg2NyAxMC41ODJWMTAuNTgyTDE5IDExLjEyODhaTTE5Ljk2OTcgMTMuMTU5MkMyMC4yNjI2IDEzLjQ1MjEgMjAuNzM3NCAxMy40NTIxIDIxLjAzMDMgMTMuMTU5MkMyMS4zMjMyIDEyLjg2NjMgMjEuMzIzMiAxMi4zOTE0IDIxLjAzMDMgMTIuMDk4NUwxOS45Njk3IDEzLjE1OTJaTTExLjI1IDE2LjVDMTEuMjUgMTYuOTE0MiAxMS41ODU4IDE3LjI1IDEyIDE3LjI1QzEyLjQxNDIgMTcuMjUgMTIuNzUgMTYuOTE0MiAxMi43NSAxNi41SDExLjI1Wk0xNi4zNzE0IDE1LjkwOUMxNi41OTczIDE2LjI1NjIgMTcuMDYxOSAxNi4zNTQ1IDE3LjQwOSAxNi4xMjg2QzE3Ljc1NjIgMTUuOTAyNyAxNy44NTQ1IDE1LjQzODEgMTcuNjI4NiAxNS4wOTFMMTYuMzcxNCAxNS45MDlaTTUuNTMwMzMgMTEuNjU5MkM1LjgyMzIyIDExLjM2NjMgNS44MjMyMiAxMC44OTE0IDUuNTMwMzMgMTAuNTk4NUM1LjIzNzQ0IDEwLjMwNTYgNC43NjI1NiAxMC4zMDU2IDQuNDY5NjcgMTAuNTk4NUw1LjUzMDMzIDExLjY1OTJaTTIuOTY5NjcgMTIuMDk4NUMyLjY3Njc4IDEyLjM5MTQgMi42NzY3OCAxMi44NjYzIDIuOTY5NjcgMTMuMTU5MkMzLjI2MjU2IDEzLjQ1MjEgMy43Mzc0NCAxMy40NTIxIDQuMDMwMzMgMTMuMTU5MkwyLjk2OTY3IDEyLjA5ODVaTTEyIDEzLjI1QzguNzc2MTEgMTMuMjUgNi40NjEzMyAxMS42NDQ2IDQuOTI0NiA5Ljk4OTY2QzQuMTU2NDUgOS4xNjI0MyAzLjU5MzI1IDguMzMyODQgMy4yMjI1OSA3LjcxMDE0QzMuMDM3NjkgNy4zOTk1IDIuOTAxODcgNy4xNDIzMiAyLjgxMzQgNi45NjUzN0MyLjc2OTE5IDYuODc2OTYgMi43MzY4OSA2LjgwODc1IDIuNzE2MjcgNi43NjQxMUMyLjcwNTk3IDYuNzQxOCAyLjY5ODU5IDYuNzI1NCAyLjY5NDExIDYuNzE1MzNDMi42OTE4NyA2LjcxMDMgMi42OTAzNiA2LjcwNjg0IDIuNjg5NTcgNi43MDUwM0MyLjY4OTE3IDYuNzA0MTMgMi42ODg5NiA2LjcwMzYzIDIuNjg4OTIgNi43MDM1NUMyLjY4ODkxIDYuNzAzNTEgMi42ODg5MyA2LjcwMzU3IDIuNjg5MDEgNi43MDM3NEMyLjY4OTA0IDYuNzAzODIgMi42ODkxMyA2LjcwNDAzIDIuNjg5MTUgNi43MDQwN0MyLjY4OTI1IDYuNzA0MyAyLjY4OTM2IDYuNzA0NTYgMiA3QzEuMzEwNjQgNy4yOTU0NCAxLjMxMDc3IDcuMjk1NzUgMS4zMTA5MiA3LjI5NjA5QzEuMzEwOTggNy4yOTYyNCAxLjMxMTE0IDcuMjk2NiAxLjMxMTI3IDcuMjk2OUMxLjMxMTUyIDcuMjk3NDkgMS4zMTE4MyA3LjI5ODIgMS4zMTIxOCA3LjI5OUMxLjMxMjg3IDcuMzAwNjIgMS4zMTM3NiA3LjMwMjY2IDEuMzE0ODMgNy4zMDUxMkMxLjMxNjk4IDcuMzEwMDMgMS4zMTk4OCA3LjMxNjYyIDEuMzIzNTMgNy4zMjQ4M0MxLjMzMDgzIDcuMzQxMjUgMS4zNDExNSA3LjM2NDE1IDEuMzU0NTMgNy4zOTMxMUMxLjM4MTI3IDcuNDUxMDIgMS40MjAyNiA3LjUzMzIgMS40NzE3NiA3LjYzNjE5QzEuNTc0NjkgNy44NDIwNiAxLjcyNzk0IDguMTMxNzUgMS45MzM2NiA4LjQ3NzM2QzIuMzQ0MjUgOS4xNjcxNiAyLjk2ODU1IDEwLjA4NzYgMy44MjU0IDExLjAxMDNDNS41Mzg2NyAxMi44NTU0IDguMjIzODkgMTQuNzUgMTIgMTQuNzVWMTMuMjVaTTE1LjMxMjUgMTIuNjMwOEMxNC4zNDIxIDEzLjAxMjggMTMuMjQxNyAxMy4yNSAxMiAxMy4yNVYxNC43NUMxMy40MzgyIDE0Ljc1IDE0LjcyNDYgMTQuNDc0MiAxNS44NjE5IDE0LjAyNjZMMTUuMzEyNSAxMi42MzA4Wk03Ljc4NDE3IDEyLjkxOTdMNi4zNzEzNiAxNS4wOTFMNy42Mjg2NCAxNS45MDlMOS4wNDE0NSAxMy43Mzc3TDcuNzg0MTcgMTIuOTE5N1pNMjIgN0MyMS4zMTA2IDYuNzA0NTYgMjEuMzEwNyA2LjcwNDQxIDIxLjMxMDggNi43MDQyN0MyMS4zMTA4IDYuNzA0MjMgMjEuMzEwOCA2LjcwNDEgMjEuMzEwOSA2LjcwNDAyQzIxLjMxMDkgNi43MDM4OCAyMS4zMTEgNi43MDM3NiAyMS4zMTEgNi43MDM2OEMyMS4zMTExIDYuNzAzNTIgMjEuMzExMSA2LjcwMzQ5IDIxLjMxMTEgNi43MDM2QzIxLjMxMSA2LjcwMzggMjEuMzEwNyA2LjcwNDUyIDIxLjMxMDEgNi43MDU3NkMyMS4zMDkgNi43MDgyMyAyMS4zMDcgNi43MTI3NSAyMS4zMDQxIDYuNzE5MjRDMjEuMjk4MyA2LjczMjIzIDIxLjI4ODkgNi43NTMwOSAyMS4yNzU4IDYuNzgxMjVDMjEuMjQ5NSA2LjgzNzU3IDIxLjIwODYgNi45MjI5NSAyMS4xNTI2IDcuMDMyNjdDMjEuMDQwNiA3LjI1MjI3IDIwLjg2OSA3LjU2ODMxIDIwLjYzNTQgNy45NDMyQzIwLjE2NjkgOC42OTUxNiAxOS40NTYzIDkuNjcxOTcgMTguNDg2NyAxMC41ODJMMTkuNTEzMyAxMS42NzU3QzIwLjYwMjMgMTAuNjUzNSAyMS4zOTE3IDkuNTY1ODcgMjEuOTA4NSA4LjczNjQ2QzIyLjE2NzYgOC4zMjA2OCAyMi4zNiA3Ljk2NjggMjIuNDg4OSA3LjcxNDE1QzIyLjU1MzMgNy41ODc3NSAyMi42MDIgNy40ODY0MyAyMi42MzUzIDcuNDE1MDdDMjIuNjUxOSA3LjM3OTM5IDIyLjY2NDcgNy4zNTExOCAyMi42NzM3IDcuMzMxMDRDMjIuNjc4MiA3LjMyMDk3IDIyLjY4MTggNy4zMTI5MiAyMi42ODQ0IDcuMzA2OTZDMjIuNjg1NyA3LjMwMzk4IDIyLjY4NjcgNy4zMDE1MyAyMi42ODc2IDcuMjk5NkMyMi42ODggNy4yOTg2NCAyMi42ODgzIDcuMjk3ODEgMjIuNjg4NiA3LjI5NzEyQzIyLjY4ODggNy4yOTY3NyAyMi42ODg5IDcuMjk2NDYgMjIuNjg5IDcuMjk2MThDMjIuNjg5MSA3LjI5NjA0IDIyLjY4OTIgNy4yOTU4NSAyMi42ODkyIDcuMjk1NzhDMjIuNjg5MyA3LjI5NTYxIDIyLjY4OTQgNy4yOTU0NCAyMiA3Wk0xOC40ODY3IDEwLjU4MkMxNy42Mjc3IDExLjM4ODIgMTYuNTczOSAxMi4xMzQzIDE1LjMxMjUgMTIuNjMwOEwxNS44NjE5IDE0LjAyNjZDMTcuMzM1NSAxMy40NDY2IDE4LjU0NjYgMTIuNTgzIDE5LjUxMzMgMTEuNjc1N0wxOC40ODY3IDEwLjU4MlpNMTguNDY5NyAxMS42NTkyTDE5Ljk2OTcgMTMuMTU5MkwyMS4wMzAzIDEyLjA5ODVMMTkuNTMwMyAxMC41OTg1TDE4LjQ2OTcgMTEuNjU5MlpNMTEuMjUgMTRWMTYuNUgxMi43NVYxNEgxMS4yNVpNMTQuOTU4NiAxMy43Mzc3TDE2LjM3MTQgMTUuOTA5TDE3LjYyODYgMTUuMDkxTDE2LjIxNTggMTIuOTE5N0wxNC45NTg2IDEzLjczNzdaTTQuNDY5NjcgMTAuNTk4NUwyLjk2OTY3IDEyLjA5ODVMNC4wMzAzMyAxMy4xNTkyTDUuNTMwMzMgMTEuNjU5Mkw0LjQ2OTY3IDEwLjU5ODVaXCIgZmlsbD1cIiM0OTUwNTdcIi8+XFxuJyArXHJcblx0XHRcdCc8L3N2Zz4nO1xyXG5cdH1cclxuXHJcblx0aW5pdCgpIHtcclxuXHRcdGNvbnN0IF90aGlzID0gdGhpcztcclxuXHJcblx0XHRsZXQgaW5wdXRQYXNzd29yZHMgPSBfdGhpcy5mb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJ1t0eXBlPVwicGFzc3dvcmRcIl0nKTtcclxuXHRcdGlmIChpbnB1dFBhc3N3b3Jkcy5sZW5ndGgpIHtcclxuXHRcdFx0aW5wdXRQYXNzd29yZHMuZm9yRWFjaChmdW5jdGlvbiAoZWxtKSB7XHJcblx0XHRcdFx0bGV0IHBhcmVudCA9IGVsbS5wYXJlbnROb2RlO1xyXG5cdFx0XHRcdGlmIChwYXJlbnQpIHtcclxuXHRcdFx0XHRcdHBhcmVudC5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XHJcblxyXG5cdFx0XHRcdFx0bGV0IHN3aXRjaGVyID0gcGFyZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXZnLXRvZ2dsZT1cInNob3ctcGFzc1wiXScpO1xyXG5cdFx0XHRcdFx0aWYgKCFzd2l0Y2hlcikge1xyXG5cdFx0XHRcdFx0XHRzd2l0Y2hlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuXHRcdFx0XHRcdFx0c3dpdGNoZXIuc2V0QXR0cmlidXRlKCdkYXRhLXZnLXRvZ2dsZScsICdzaG93LXBhc3MnKTtcclxuXHRcdFx0XHRcdFx0c3dpdGNoZXIuc2V0QXR0cmlidXRlKCd0aXRsZScsICfQn9C+0LrQsNC30LDRgtGMJyk7XHJcblx0XHRcdFx0XHRcdHN3aXRjaGVyLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICdmYWxzZScpO1xyXG5cdFx0XHRcdFx0XHRzd2l0Y2hlci5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XHJcblx0XHRcdFx0XHRcdHN3aXRjaGVyLnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcclxuXHRcdFx0XHRcdFx0c3dpdGNoZXIuc3R5bGUud2lkdGggPSAnMjRweCc7XHJcblx0XHRcdFx0XHRcdHN3aXRjaGVyLnN0eWxlLmhlaWdodCA9ICcyNHB4JztcclxuXHRcdFx0XHRcdFx0c3dpdGNoZXIuc3R5bGUudG9wID0gJzUwJSc7XHJcblx0XHRcdFx0XHRcdHN3aXRjaGVyLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVZKC01MCUpJztcclxuXHRcdFx0XHRcdFx0c3dpdGNoZXIuc3R5bGUucmlnaHQgPSAnMTJweCc7XHJcblx0XHRcdFx0XHRcdHN3aXRjaGVyLmlubmVySFRNTCA9IF90aGlzLmV5ZU9wZW47XHJcblxyXG5cdFx0XHRcdFx0XHRwYXJlbnQuYXBwZW5kKHN3aXRjaGVyKVxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdF90aGlzLnRvZ2dsZShzd2l0Y2hlciwgZWxtKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0dG9nZ2xlKHN3aXRjaGVyLCBlbGVtZW50KSB7XHJcblx0XHRjb25zdCBfdGhpcyA9IHRoaXM7XHJcblxyXG5cdFx0c3dpdGNoZXIub25jbGljayA9IChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGxldCBfc2VsZiA9IHRoaXMsXHJcblx0XHRcdFx0aWNvbkNsb3NlID0gc3dpdGNoZXIuZGF0YXNldC5pY29uQ2xvc2UsXHJcblx0XHRcdFx0aWNvbk9wZW4gPSBzd2l0Y2hlci5kYXRhc2V0Lmljb25PcGVuO1xyXG5cclxuXHRcdFx0aWYgKHN3aXRjaGVyLmdldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcpID09PSAndHJ1ZScpIHtcclxuXHRcdFx0XHRpZiAoaWNvbk9wZW4pIHtcclxuXHRcdFx0XHRcdGxldCBpY29uID0gc3dpdGNoZXIucXVlcnlTZWxlY3RvcignaScpO1xyXG5cdFx0XHRcdFx0aWYgKGljb24pIHtcclxuXHRcdFx0XHRcdFx0aWYgKGljb24uY2xhc3NMaXN0LmNvbnRhaW5zKGljb25DbG9zZSkpIHtcclxuXHRcdFx0XHRcdFx0XHRpY29uLmNsYXNzTGlzdC5yZW1vdmUoaWNvbkNsb3NlKTtcclxuXHRcdFx0XHRcdFx0XHRpY29uLmNsYXNzTGlzdC5hZGQoaWNvbk9wZW4pO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHN3aXRjaGVyLmlubmVySFRNTCA9IF90aGlzLmV5ZU9wZW5cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAncGFzc3dvcmQnKTtcclxuXHRcdFx0XHRfc2VsZi5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGlmIChpY29uQ2xvc2UpIHtcclxuXHRcdFx0XHRcdGxldCBpY29uID0gc3dpdGNoZXIucXVlcnlTZWxlY3RvcignaScpO1xyXG5cdFx0XHRcdFx0aWYgKGljb24pIHtcclxuXHRcdFx0XHRcdFx0aWYgKGljb24uY2xhc3NMaXN0LmNvbnRhaW5zKGljb25PcGVuKSkge1xyXG5cdFx0XHRcdFx0XHRcdGljb24uY2xhc3NMaXN0LnJlbW92ZShpY29uT3Blbik7XHJcblx0XHRcdFx0XHRcdFx0aWNvbi5jbGFzc0xpc3QuYWRkKGljb25DbG9zZSk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0c3dpdGNoZXIuaW5uZXJIVE1MID0gX3RoaXMuZXllQ2xvc2VcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGVsZW1lbnQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKTtcclxuXHRcdFx0XHRfc2VsZi5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAndHJ1ZScpXHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgc2hvd1Bhc3M7XHJcbiIsIi8qKlxyXG4gKiDQk9C70YPQsdC+0LrQvtC1INC+0LHRitC10LTQuNC90LXQvdC40LUg0L7QsdGK0LXQutGC0L7QslxyXG4gKiBAcGFyYW0gb2JqZWN0c1xyXG4gKiBAcmV0dXJucyB7Kn1cclxuICovXHJcbmNvbnN0IG1lcmdlRGVlcE9iamVjdCA9IGZ1bmN0aW9uICguLi5vYmplY3RzKSB7XHJcblx0Y29uc3QgaXNPYmplY3QgPSBvYmogPT4gb2JqICYmIHR5cGVvZiBvYmogPT09ICdvYmplY3QnO1xyXG5cclxuXHRyZXR1cm4gb2JqZWN0cy5yZWR1Y2UoKHByZXYsIG9iaikgPT4ge1xyXG5cdFx0T2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKGtleSA9PiB7XHJcblx0XHRcdGNvbnN0IHBWYWwgPSBwcmV2W2tleV07XHJcblx0XHRcdGNvbnN0IG9WYWwgPSBvYmpba2V5XTtcclxuXHJcblx0XHRcdGlmIChBcnJheS5pc0FycmF5KHBWYWwpICYmIEFycmF5LmlzQXJyYXkob1ZhbCkpIHtcclxuXHRcdFx0XHRwcmV2W2tleV0gPSBwVmFsLmNvbmNhdCguLi5vVmFsKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIGlmIChpc09iamVjdChwVmFsKSAmJiBpc09iamVjdChvVmFsKSkge1xyXG5cdFx0XHRcdHByZXZba2V5XSA9IG1lcmdlRGVlcE9iamVjdChwVmFsLCBvVmFsKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRwcmV2W2tleV0gPSBvVmFsO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gcHJldjtcclxuXHR9LCB7fSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb2xsZWN0IERhdGFcclxuICogQHBhcmFtIGRhdGFcclxuICogQHBhcmFtIGZpZWxkc1xyXG4gKi9cclxuY29uc3QgY29sbGVjdERhdGEgPSBmdW5jdGlvbihkYXRhLCBmaWVsZHMpIHtcclxuXHRmb3IgKGxldCBuYW1lIGluIGZpZWxkcykge1xyXG5cdFx0aWYgKHR5cGVvZiBmaWVsZHNbbmFtZV0gPT09ICdvYmplY3QnKSB7XHJcblx0XHRcdGZvciAobGV0IGtleSBpbiBmaWVsZHNbbmFtZV0pIHtcclxuXHRcdFx0XHRsZXQgYXJyID0gT2JqZWN0LmtleXMoZmllbGRzW25hbWVdW2tleV0pLm1hcChmdW5jdGlvbiAoaSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGZpZWxkc1tuYW1lXVtrZXldW2ldO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdGRhdGEuYXBwZW5kKG5hbWUsIGFycik7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGRhdGEuYXBwZW5kKG5hbWUsIGZpZWxkc1tuYW1lXSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gZGF0YTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEFKQVggUkVRVUVTVFxyXG4gKiBAdHlwZSB7e3Bvc3Q6IGFqYXgucG9zdCwgZ2V0OiBhamF4LmdldCwgeDogKChmdW5jdGlvbigpOiAoWE1MSHR0cFJlcXVlc3QpKXwqKSwgc2VuZDogYWpheC5zZW5kfX1cclxuICovXHJcbmNvbnN0IGFqYXggPSB7XHJcblx0eDogZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0cmV0dXJuIG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5cdFx0fVxyXG5cdFx0bGV0IHZlcnNpb25zID0gW1xyXG5cdFx0XHRcIk1TWE1MMi5YbWxIdHRwLjYuMFwiLFxyXG5cdFx0XHRcIk1TWE1MMi5YbWxIdHRwLjUuMFwiLFxyXG5cdFx0XHRcIk1TWE1MMi5YbWxIdHRwLjQuMFwiLFxyXG5cdFx0XHRcIk1TWE1MMi5YbWxIdHRwLjMuMFwiLFxyXG5cdFx0XHRcIk1TWE1MMi5YbWxIdHRwLjIuMFwiLFxyXG5cdFx0XHRcIk1pY3Jvc29mdC5YbWxIdHRwXCJcclxuXHRcdF07XHJcblxyXG5cdFx0bGV0IHhocjtcclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdmVyc2lvbnMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHR4aHIgPSBuZXcgQWN0aXZlWE9iamVjdCh2ZXJzaW9uc1tpXSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH0gY2F0Y2ggKGUpIHt9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4geGhyO1xyXG5cdH0sXHJcblxyXG5cdHNlbmQ6IGZ1bmN0aW9uICh1cmwsIGNhbGxiYWNrLCBtZXRob2QsIGRhdGEsIGFzeW5jKSB7XHJcblx0XHRpZiAoYXN5bmMgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRhc3luYyA9IHRydWU7XHJcblx0XHR9XHJcblx0XHRsZXQgeCA9IGFqYXgueCgpO1xyXG5cdFx0eC5vcGVuKG1ldGhvZCwgdXJsLCBhc3luYyk7XHJcblx0XHR4Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0aWYgKHgucmVhZHlTdGF0ZSA9PT0gNCkge1xyXG5cdFx0XHRcdHN3aXRjaCAoeC5zdGF0dXMpIHtcclxuXHRcdFx0XHRcdGNhc2UgMjAwOlxyXG5cdFx0XHRcdFx0XHRjYWxsYmFjaygnc3VjY2VzcycsIHgucmVzcG9uc2VUZXh0KVxyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0XHRcdGNhbGxiYWNrKCdlcnJvcicsIHgucmVzcG9uc2VUZXh0KVxyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblx0XHRpZiAobWV0aG9kID09PSAnUE9TVCcpIHtcclxuXHRcdFx0Ly94LnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtdHlwZScsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnKTtcclxuXHRcdH1cclxuXHRcdHguc2VuZChkYXRhKVxyXG5cdH0sXHJcblxyXG5cdGdldDogZnVuY3Rpb24gKHVybCwgZGF0YSwgY2FsbGJhY2ssIGFzeW5jKSB7XHJcblx0XHRsZXQgcXVlcnkgPSBbXTtcclxuXHRcdGZvciAobGV0IGtleSBvZiBkYXRhKSB7XHJcblx0XHRcdHF1ZXJ5LnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KGtleVswXSkgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQoa2V5WzFdKSk7XHJcblx0XHR9XHJcblx0XHRhamF4LnNlbmQodXJsICsgKHF1ZXJ5Lmxlbmd0aCA/ICc/JyArIHF1ZXJ5LmpvaW4oJyYnKSA6ICcnKSwgY2FsbGJhY2ssICdHRVQnLCBudWxsLCBhc3luYylcclxuXHR9LFxyXG5cclxuXHRwb3N0OiBmdW5jdGlvbiAodXJsLCBkYXRhLCBjYWxsYmFjaywgYXN5bmMpIHtcclxuXHRcdGFqYXguc2VuZCh1cmwsIGNhbGxiYWNrLCAnUE9TVCcsIGRhdGEsIGFzeW5jKVxyXG5cdH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBFVkVOVFNcclxuICogQHR5cGUge3tvbjogZXZlbnRIYW5kbGVyLm9ufX1cclxuICovXHJcbmNvbnN0IGV2ZW50SGFuZGxlciA9IHtcclxuXHRvbjogZnVuY3Rpb24gKGVsZW1lbnQsIGV2ZW50KSB7XHJcblx0XHRjb25zdCBldmVudFN1Y2Nlc3MgPSBuZXcgQ3VzdG9tRXZlbnQoZXZlbnQsIHtcclxuXHRcdFx0YnViYmxlczogdHJ1ZSxcclxuXHRcdH0pO1xyXG5cclxuXHRcdGVsZW1lbnQuZGlzcGF0Y2hFdmVudChldmVudFN1Y2Nlc3MpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IHttZXJnZURlZXBPYmplY3QsIGNvbGxlY3REYXRhLCBhamF4LCBldmVudEhhbmRsZXJ9XHJcbiIsImZ1bmN0aW9uIGdldFN2ZyhuYW1lKSB7XHJcblx0Y29uc3Qgc3ZnID0gIHtcclxuXHRcdGVycm9yOiAnPHN2ZyB2aWV3Ym94PVwiMCAwIDUwMCA1MDBcIiBjbGFzcz1cImFtX0Vycm9yX0ljb25cIj48cGF0aCBjbGFzcz1cImFtX1NWR19jaXJjbGVcIiBkPVwibTQ0NC4zNDY5MywxMTQuMDcwMDdhMjM2Ljk1Mjc2LDIzNi45NTI3NiAwIDAgMSA0NC4xNTUzLDEzNy43Mzc0N2MwLDEyOS45NzAwNSAtMTA2Ljk0NzcyLDIzNi45NjQ0MyAtMjM2LjkxNzc3LDIzNi45NjQ0M3MtMjM2LjkxNzc3LC0xMDYuOTQ3NzIgLTIzNi45MTc3NywtMjM2LjkxNzc3czEwNi45NDc3MiwtMjM2Ljk2NDQzIDIzNi45MTc3NywtMjM2Ljk2NDQzYTIzNi45OTk0MSwyMzYuOTk5NDEgMCAwIDEgMTY4LjcyNTQ4LDcwLjU5NDgzXCI+PC9wYXRoPjxsaW5lIGNsYXNzPVwiYW1fU1ZHX2Vycm9yMVwiIHkyPVwiMzkwXCIgeDI9XCIzOTBcIiB5MT1cIjExMFwiIHgxPVwiMTEwXCI+PC9saW5lPjxsaW5lIGNsYXNzPVwiYW1fU1ZHX2Vycm9yMlwiIHkyPVwiMzkwXCIgeDI9XCIxMTBcIiB5MT1cIjExMFwiIHgxPVwiMzkwXCI+PC9saW5lPjwvc3ZnPicsXHJcblx0XHRzdWNjZXNzOiAnPHN2ZyB2aWV3Ym94PVwiMCAwIDUwMCA1MDBcIiBjbGFzcz1cImFtX1N1Y2Nlc3NfSWNvblwiPjxwYXRoIGNsYXNzPVwiYW1fU1ZHX2NpcmNsZVwiIGQ9XCJtNDQzLjAxMzYsMTE0LjA3MDA3YTIzNi45NTI3NiwyMzYuOTUyNzYgMCAwIDEgNDQuMTU1MywxMzcuNzM3NDdjMCwxMjkuOTcwMDUgLTEwNi45NDc3MiwyMzYuOTY0NDMgLTIzNi45MTc3NywyMzYuOTY0NDNzLTIzNi45MTc3NywtMTA2Ljk0NzcyIC0yMzYuOTE3NzcsLTIzNi45MTc3N3MxMDYuOTQ3NzIsLTIzNi45NjQ0MyAyMzYuOTE3NzcsLTIzNi45NjQ0M2EyMzYuOTk5NDEsMjM2Ljk5OTQxIDAgMCAxIDE2OC43MjU0OCw3MC41OTQ4M1wiPjwvcGF0aD48cG9seWxpbmUgY2xhc3M9XCJhbV9TVkdfY2hlY2tcIiBwb2ludHM9XCIxMDQuNDg5MjM0OTI0MzE2NCwzMDkuMjAwMTY0Nzk0OTIxOSAxOTUuNTc0MDY2MTYyMTA5MzgsNDAyLjk2MDA1MjQ5MDIzNDQgNDE4LjkyOTIyOTczNjMyODEsODUuMDM3MTg1NjY4OTQ1MzEgXCI+PC9wb2x5bGluZT48L3N2Zz4nLFxyXG5cdFx0Y3Jvc3M6ICc8c3ZnIHZlcnNpb249XCIxLjFcIiBpZD1cIkNhcGFfMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB4PVwiMHB4XCIgeT1cIjBweFwiIHZpZXdCb3g9XCIwIDAgMjI0LjUxMiAyMjQuNTEyXCIgc3R5bGU9XCJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDIyNC41MTIgMjI0LjUxMjtcIiB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiPjxnPjxwb2x5Z29uIHN0eWxlPVwiZmlsbDojMDEwMDAyO1wiIHBvaW50cz1cIjIyNC41MDcsNi45OTcgMjE3LjUyMSwwIDExMi4yNTYsMTA1LjI1OCA2Ljk5OCwwIDAuMDA1LDYuOTk3IDEwNS4yNjMsMTEyLjI1NCAwLjAwNSwyMTcuNTEyIDYuOTk4LDIyNC41MTIgMTEyLjI1NiwxMTkuMjQgMjE3LjUyMSwyMjQuNTEyIDIyNC41MDcsMjE3LjUxMiAxMTkuMjQ5LDExMi4yNTQgXCIvPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48L3N2Zz4nXHJcblx0fTtcclxuXHJcblx0cmV0dXJuIHN2Z1tuYW1lXSA/PyB7fTtcclxufVxyXG5cclxuZXhwb3J0IHtnZXRTdmd9XHJcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi9hcHAvYXBwLnNjc3NcIjtcclxuaW1wb3J0IHtWR0Zvcm1TZW5kZXJ9IGZyb20gXCIuL2FwcC9hcHBcIjtcclxuXHJcbmV4cG9ydCB7VkdGb3JtU2VuZGVyfTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9