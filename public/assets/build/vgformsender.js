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
/* harmony import */ var _util_functions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/functions */ "./app/util/functions.js");



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
        if (btnSubmit && _this.settings.isBtnText) {
          let btnText = {
            send: 'Отправляем...',
            text: 'Отправить'
          };
          if (btnSubmit.hasAttribute('data-spinner') && status === 'beforeSend') {
            btnSubmit.insertAdjacentHTML('afterbegin', '<span class="spinner-border spinner-border-sm me-2"></span>');
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
    setTimeout(() => {
      let type;
      if (this.settings.alert.params.type === 'block') type = 'divBlock';
      if (this.settings.alert.params.type === 'modal') type = 'VGModal';
      if (type) {
        this.settings.plugins.find(p => p[type])[type].enabled = true;
        this.settings.plugins.find(p => p[type])[type].params.data = data;
        this.settings.plugins.find(p => p[type])[type].params.status = status;
      }
      if ('plugins' in this.settings) {
        new _VGFormPlugins__WEBPACK_IMPORTED_MODULE_1__["default"](this).init();
      }
    }, this.settings.alert.delay);
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
  if ('plugins' in arg && arg.plugins.length) {
    arg.plugins.forEach(function (plugin, n) {
      for (const pluginElement in plugin) {
        params.plugins.forEach((p, i) => {
          for (const pElm in p) {
            if (pElm === pluginElement) {
              params.plugins[i] = (0,_util_functions__WEBPACK_IMPORTED_MODULE_0__.mergeDeepObject)(params.plugins[i], arg.plugins[n]);
            }
          }
        });
      }
    });
    delete arg.plugins;
  }
  let mParams = (0,_util_functions__WEBPACK_IMPORTED_MODULE_0__.mergeDeepObject)(params, arg);
  let data = [].filter.call(form.attributes, function (at) {
    return /^data-/.test(at.name);
  });
  for (let val of data) {
    if (val.name === 'data-alert-type' && val.value) mParams.alert.params.type = val.value;
    if (val.name === 'data-alert') mParams.alert.enabled = val.value !== 'false';
    if (val.name === 'data-submit') mParams.isSubmit = val.value !== 'false';
    if (val.name === 'data-show-text') mParams.isBtnText = val.value !== 'false';
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
      isBtnText: true,
      alert: {
        enabled: true,
        delay: 350,
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
/* harmony import */ var _util_functions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/functions */ "./app/util/functions.js");


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
        setTimeout(() => el.remove(), 500);
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
      _class = _this.params.status === 'error' ? 'danger' : _this.params.status;
    if (!data || _this.params.status === 'beforeSend') return false;
    if ((0,_util_functions__WEBPACK_IMPORTED_MODULE_1__.isObject)(data)) {
      if ('errors' in data && data.errors || 'error' in data && data.error) _class = 'danger';
    }
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
/* harmony import */ var _util_functions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/functions */ "./app/util/functions.js");


const EVENT_KEY_MODAL_OPEN = 'vg.fs.modal.open';
class VGModal {
  constructor(form, arg) {
    this.form = form;
    this.params = (0,_util_functions__WEBPACK_IMPORTED_MODULE_1__.mergeDeepObject)({
      content_over: true,
      hideDelay: 350,
      showDelay: 50
    }, arg);
    this.classes = {
      container: 'vg-form-sender--alert-modal',
      backdrop: 'vg-form-sender--alert-backdrop'
    };
    this.element = null;
    this.backdrop = null;
  }
  init() {
    const _this = this;
    if (_this.params.status === 'beforeSend') return false;
    _this.element = _this.form.querySelector('.' + _this.classes.container);
    if (!_this.element) _this.element = _this.draw();
    _this.backdrop = document.createElement('div');
    _this.backdrop.classList.add(_this.classes.backdrop);
    _this.toggle();
  }
  toggle() {
    const _this = this;
    if (!document.body.classList.contains('vg-modal-open')) {
      return _this.show();
    } else {
      return _this.hide();
    }
  }
  show() {
    const _this = this;
    document.body.classList.add('vg-modal-open');
    _this.element.style.display = 'block';
    if (_this.params.content_over) {
      document.body.style.paddingRight = window.innerWidth - document.documentElement.clientWidth + 'px';
      document.body.style.overflow = "hidden";
    }
    setTimeout(() => {
      _this.element.classList.add('active');
      _this.backdrop.classList.add('active');
      _util_functions__WEBPACK_IMPORTED_MODULE_1__.eventHandler.on(_this.element, EVENT_KEY_MODAL_OPEN, _this);
    }, _this.params.showDelay);
    document.body.append(_this.element);
    document.body.append(_this.backdrop);
    _this.setText(_this.element);
    window.addEventListener('keydown', event => {
      if (event.key === 'Escape' || event.key === 'Esc') {
        _this.hide();
      }
    });
    _this.element.onclick = function (e) {
      if (e.target === document.querySelector('.' + _this.classes.container)) {
        _this.hide();
      }
      return false;
    };
    let btnClose = _this.element.querySelector('[data-vg-dismiss="modal"]');
    if (btnClose) {
      btnClose.onclick = function () {
        _this.hide();
        return false;
      };
    }
  }
  hide() {
    const _this = this;
    document.body.classList.remove('vg-modal-open');
    _this.element.classList.remove('active');
    _this.backdrop.classList.remove('active');
    setTimeout(() => {
      _this.element.style.display = '';
      _this.backdrop.remove();
      _this.element.remove();
      if (_this.params.content_over) {
        document.body.style.paddingRight = "";
        document.body.style.overflow = "";
      }
    }, _this.params.hideDelay);
  }
  draw() {
    const _this = this;
    let modal = document.createElement('div');
    modal.classList.add(_this.classes.container);
    modal.innerHTML = '<div class="modal-content">' + '   <div class="close"><a href="#" data-vg-dismiss="modal">' + (0,_util_svg__WEBPACK_IMPORTED_MODULE_0__.getSvg)('cross') + '</a></div>' + '   <div class="modal-body vg-alert-content">' + '       <div class="vg-alert vg-alert-danger">' + '	        <div class="svg-area">' + (0,_util_svg__WEBPACK_IMPORTED_MODULE_0__.getSvg)('error') + '</div>' + '	        <div class="content-area">' + '		     <div class="title-area" data-alert-danger-title></div>' + '		     <div class="text-area" data-alert-danger-text></div>' + '	        </div>' + '       </div>' + '       <div class="vg-alert vg-alert-success">' + '	        <div class="svg-area">' + (0,_util_svg__WEBPACK_IMPORTED_MODULE_0__.getSvg)('success') + '</div>' + '	        <div class="content-area">' + '		        <div class="title-area" data-alert-success-title></div>' + '		        <div class="text-area" data-alert-success-text></div>' + '	        </div>' + '   </div>' + '</div>';
    return modal;
  }
  setText(el) {
    const _this = this;
    let data = _this.params.data,
      _class = _this.params.status === 'error' ? 'danger' : _this.params.status;
    if (!data && 'response' in data && !data.response) return false;
    let response = (0,_util_functions__WEBPACK_IMPORTED_MODULE_1__.normalizeData)(data.response);
    if ((0,_util_functions__WEBPACK_IMPORTED_MODULE_1__.isObject)(response)) {
      if ('errors' in data && response.errors || 'error' in response && response.error) _class = 'danger';
    }
    let $alert = el.querySelector('.vg-alert-' + _class);
    if ($alert) {
      let $text = $alert.querySelector('[data-alert-' + _class + '-text]'),
        $title = $alert.querySelector('[data-alert-' + _class + '-title]');
      if ($text) {
        if (!response) {
          if (_this.params.status === 'error') {
            $title.innerHTML = 'Ошибка';
            $text.innerHTML = data.text;
          }
        } else {
          if (typeof response === 'string') {
            $text.innerHTML = response;
          } else if ('message' in response && response.message) {
            let errors = (0,_util_functions__WEBPACK_IMPORTED_MODULE_1__.normalizeData)(response.errors) || null;
            if (Array.isArray(errors) || (0,_util_functions__WEBPACK_IMPORTED_MODULE_1__.isObject)(errors)) {
              if ((0,_util_functions__WEBPACK_IMPORTED_MODULE_1__.isObject)(errors)) {
                for (const error in errors) {
                  if (Array.isArray(errors[error])) {
                    errors[error].forEach(function (txt) {
                      $text.innerHTML += '<div>' + txt + '</div>';
                    });
                  } else {
                    $text.innerHTML = '<div>' + errors[error] + '</div>';
                  }
                }
              }
            } else {
              $text.innerHTML = response.message;
            }
            if ($title && 'title' in response) $title.innerHTML = response.title;
          }
        }
      }
      $alert.classList.add('show');
    } else {
      el.innerHTML = response;
    }
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
/* harmony export */   isObject: () => (/* binding */ isObject),
/* harmony export */   mergeDeepObject: () => (/* binding */ mergeDeepObject),
/* harmony export */   normalizeData: () => (/* binding */ normalizeData)
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
    x.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    x.onreadystatechange = function () {
      if (x.readyState === 4) {
        switch (x.status) {
          case 200:
            callback('success', {
              text: x.statusText,
              response: x.responseText
            });
            break;
          default:
            callback('error', {
              text: x.statusText,
              response: x.responseText,
              code: x.status
            });
            break;
        }
      } else {}
    };
    x.send(data);
    x.onerror = function () {
      console.log(`Произошла ошибка во время отправки: ${x.status}`);
    };
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
  on: function (element, event, detail = null) {
    const eventSuccess = new CustomEvent(event, {
      bubbles: true,
      detail: detail
    });
    element.dispatchEvent(eventSuccess);
  }
};

/**
 *
 */
const isObject = obj => obj && typeof obj === 'object';

/**
 *
 */
function normalizeData(value) {
  if (value === 'true') {
    return true;
  }
  if (value === 'false') {
    return false;
  }
  if (value === Number(value).toString()) {
    return Number(value);
  }
  if (value === '' || value === 'null') {
    return null;
  }
  if (typeof value !== 'string') {
    return value;
  }
  try {
    return JSON.parse(decodeURIComponent(value));
  } catch {
    return value;
  }
}


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmdmb3Jtc2VuZGVyLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUkE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7O0FDeElBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7O0FDNU9BO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFnQkE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyS0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBbUJBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7Ozs7Ozs7OztBQ2xNQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBSUE7QUFHQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDeEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ1JBOzs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3ZnLy4vYXBwL2FwcC5qcyIsIndlYnBhY2s6Ly92Zy8uL2FwcC9qcy9WR0Zvcm1QbHVnaW5zLmpzIiwid2VicGFjazovL3ZnLy4vYXBwL2pzL1ZHRm9ybVNlbmRlci5qcyIsIndlYnBhY2s6Ly92Zy8uL2FwcC9qcy9WR1NlbmRlci5qcyIsIndlYnBhY2s6Ly92Zy8uL2FwcC9wbHVnaW5zL2Jsb2NrL2RpdkJsb2NrLmpzIiwid2VicGFjazovL3ZnLy4vYXBwL3BsdWdpbnMvbW9kYWwvVkdNb2RhbC5qcyIsIndlYnBhY2s6Ly92Zy8uL2FwcC9wbHVnaW5zL3Nob3dQYXNzL3Nob3dQYXNzLmpzIiwid2VicGFjazovL3ZnLy4vYXBwL3V0aWwvZnVuY3Rpb25zLmpzIiwid2VicGFjazovL3ZnLy4vYXBwL3V0aWwvc3ZnLmpzIiwid2VicGFjazovL3ZnLy4vYXBwL2FwcC5zY3NzPzQ2YWIiLCJ3ZWJwYWNrOi8vdmcvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdmcvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3ZnL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdmcvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly92Zy8uL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBFeHBvcnQgUHVibGljIEFwaVxyXG4gKiDQkNCy0YLQvtGAOiBWZWdhcyBTdHVkaW9cclxuICog0JvQuNGG0LXQvdC30LjRjzog0YHQvNC+0YLRgNC4IExJQ0VOU0VcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICovXHJcblxyXG5pbXBvcnQgVkdGb3JtU2VuZGVyIGZyb20gXCIuL2pzL1ZHRm9ybVNlbmRlclwiO1xyXG5cclxuZXhwb3J0IHtcclxuXHRWR0Zvcm1TZW5kZXJcclxufTtcclxuIiwiaW1wb3J0IHNob3dQYXNzIGZyb20gXCIuLi9wbHVnaW5zL3Nob3dQYXNzL3Nob3dQYXNzXCI7XHJcbmltcG9ydCBkaXZCbG9jayBmcm9tIFwiLi4vcGx1Z2lucy9ibG9jay9kaXZCbG9ja1wiO1xyXG5pbXBvcnQgVkdNb2RhbCAgZnJvbSBcIi4uL3BsdWdpbnMvbW9kYWwvVkdNb2RhbFwiO1xyXG5cclxuY2xhc3MgVkdGb3JtUGx1Z2lucyB7XHJcblx0Y29uc3RydWN0b3IoZm9ybXNlbmRlcikge1xyXG5cdFx0dGhpcy5wbHVnaW5zID0gZm9ybXNlbmRlci5zZXR0aW5ncy5wbHVnaW5zO1xyXG5cdFx0dGhpcy5mb3Jtc2VuZGVyID0gZm9ybXNlbmRlcjtcclxuXHR9XHJcblxyXG5cdGluaXQoKSB7XHJcblx0XHRjb25zdCBfdGhpcyA9IHRoaXM7XHJcblxyXG5cdFx0aWYgKF90aGlzLnBsdWdpbnMubGVuZ3RoKSB7XHJcblx0XHRcdGZvciAoY29uc3QgcGx1Z2luIG9mIF90aGlzLnBsdWdpbnMpIHtcclxuXHRcdFx0XHRsZXQgbmFtZU1vZHVsZSA9IE9iamVjdC5rZXlzKHBsdWdpbilbMF07XHJcblxyXG5cdFx0XHRcdGlmIChwbHVnaW5bbmFtZU1vZHVsZV0uZW5hYmxlZCkge1xyXG5cdFx0XHRcdFx0c3dpdGNoIChuYW1lTW9kdWxlKSB7XHJcblx0XHRcdFx0XHRcdGNhc2UgXCJzaG93UGFzc1wiOlxyXG5cdFx0XHRcdFx0XHRcdGlmICh0eXBlb2Ygc2hvd1Bhc3MgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuXHRcdFx0XHRcdFx0XHRcdGxldCBtb2R1bGUgPSBuZXcgc2hvd1Bhc3MoX3RoaXMuZm9ybXNlbmRlci5mb3JtLCBwbHVnaW5bbmFtZU1vZHVsZV0ucGFyYW1zKTtcclxuXHRcdFx0XHRcdFx0XHRcdG1vZHVsZS5pbml0KCk7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdFx0Y2FzZSBcImRpdkJsb2NrXCI6XHJcblx0XHRcdFx0XHRcdFx0aWYgKHR5cGVvZiBkaXZCbG9jayAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG5cdFx0XHRcdFx0XHRcdFx0bGV0IG1vZHVsZSA9IG5ldyBkaXZCbG9jayhfdGhpcy5mb3Jtc2VuZGVyLmZvcm0sIHBsdWdpbltuYW1lTW9kdWxlXS5wYXJhbXMpO1xyXG5cdFx0XHRcdFx0XHRcdFx0bW9kdWxlLmluaXQoKTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRjYXNlIFwiVkdNb2RhbFwiOlxyXG5cdFx0XHRcdFx0XHRcdGlmICh0eXBlb2YgZGl2QmxvY2sgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuXHRcdFx0XHRcdFx0XHRcdGxldCBtb2R1bGUgPSBuZXcgVkdNb2RhbChfdGhpcy5mb3Jtc2VuZGVyLmZvcm0sIHBsdWdpbltuYW1lTW9kdWxlXS5wYXJhbXMpO1xyXG5cdFx0XHRcdFx0XHRcdFx0bW9kdWxlLmluaXQoKTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVkdGb3JtUGx1Z2lucztcclxuIiwiaW1wb3J0IFZHU2VuZGVyIGZyb20gXCIuL1ZHU2VuZGVyXCI7XHJcbmltcG9ydCBWR0Zvcm1QbHVnaW5zIGZyb20gXCIuL1ZHRm9ybVBsdWdpbnNcIjtcclxuaW1wb3J0IHttZXJnZURlZXBPYmplY3R9IGZyb20gXCIuLi91dGlsL2Z1bmN0aW9uc1wiO1xyXG5cclxuY2xhc3MgVkdGb3JtU2VuZGVyIGV4dGVuZHMgVkdTZW5kZXIge1xyXG5cdGNvbnN0cnVjdG9yKGZvcm0sIGFyZyA9e30pIHtcclxuXHRcdHN1cGVyKGZvcm0sIGFyZyk7XHJcblxyXG5cdFx0dGhpcy5pc0FsZXJ0ID0gdGhpcy5zZXR0aW5ncy5hbGVydC5lbmFibGVkO1xyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICog0JrQvtC70LHQtdC60Lgg0YHRgNCw0LHQsNGC0YvQstCw0Y7RgiDQtNC+INCy0YvQt9C+0LLQsCDQstC90YPRgtGA0LXQvdC90LjRhSDQtNC10LnRgdGC0LLQuNC5XHJcblx0ICogQHBhcmFtIGNhbGxiYWNrXHJcblx0ICogQHJldHVybnMge2Jvb2xlYW59XHJcblx0ICovXHJcblx0c3VibWl0KGNhbGxiYWNrKSB7XHJcblx0XHRpZiAoIXRoaXMuaXNBbGVydCkge1xyXG5cdFx0XHRyZXR1cm4gc3VwZXIuc3VibWl0KGNhbGxiYWNrKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGNvbnN0IF90aGlzID0gdGhpcztcclxuXHJcblx0XHRcdHJldHVybiBzdXBlci5zdWJtaXQoe1xyXG5cdFx0XHRcdGJlZm9yZVNlbmQ6IGZ1bmN0aW9uIChldmVudCwgdmdTZW5kZXIpIHtcclxuXHRcdFx0XHRcdGlmIChjYWxsYmFjayAmJiAnYmVmb3JlU2VuZCcgaW4gY2FsbGJhY2sgJiYgdHlwZW9mIGNhbGxiYWNrLmJlZm9yZVNlbmQgPT09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0XHRcdFx0Y2FsbGJhY2suYmVmb3JlU2VuZChldmVudCwgdmdTZW5kZXIpO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGJ1dHRvbkNvbmRpdGlvbih2Z1NlbmRlciwgJ2JlZm9yZVNlbmQnKTtcclxuXHRcdFx0XHRcdF90aGlzLmFsZXJ0KHZnU2VuZGVyLCBudWxsLCAnYmVmb3JlU2VuZCcpO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0ZXJyb3I6IGZ1bmN0aW9uIChldmVudCwgdmdTZW5kZXIsIGRhdGEpIHtcclxuXHRcdFx0XHRcdGlmIChjYWxsYmFjayAmJiAnZXJyb3InIGluIGNhbGxiYWNrICYmIHR5cGVvZiBjYWxsYmFjay5lcnJvciA9PT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdFx0XHRjYWxsYmFjay5lcnJvcihldmVudCwgdmdTZW5kZXIsIGRhdGEpO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGJ1dHRvbkNvbmRpdGlvbih2Z1NlbmRlcik7XHJcblx0XHRcdFx0XHRqc29uUGFyc2UoZGF0YSwgJ2Vycm9yJywgdmdTZW5kZXIpO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24gKGV2ZW50LCB2Z1NlbmRlciwgZGF0YSkge1xyXG5cdFx0XHRcdFx0aWYgKGNhbGxiYWNrICYmICdzdWNjZXNzJyBpbiBjYWxsYmFjayAmJiB0eXBlb2YgY2FsbGJhY2suc3VjY2VzcyA9PT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdFx0XHRjYWxsYmFjay5zdWNjZXNzKGV2ZW50LCB2Z1NlbmRlciwgZGF0YSk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0YnV0dG9uQ29uZGl0aW9uKHZnU2VuZGVyKTtcclxuXHRcdFx0XHRcdGpzb25QYXJzZShkYXRhLCAnc3VjY2VzcycsIHZnU2VuZGVyKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0ZnVuY3Rpb24gYnV0dG9uQ29uZGl0aW9uKHZnU2VuZGVyLCBzdGF0dXMgPSAnZGVmYXVsdCcpIHtcclxuXHRcdFx0XHRsZXQgYnRuU3VibWl0ID0gdmdTZW5kZXIuZXh0RWxlbWVudC5idXR0b247XHJcblx0XHRcdFx0aWYgKGJ0blN1Ym1pdCAmJiBfdGhpcy5zZXR0aW5ncy5pc0J0blRleHQpIHtcclxuXHRcdFx0XHRcdGxldCBidG5UZXh0ID0ge1xyXG5cdFx0XHRcdFx0XHRzZW5kOiAn0J7RgtC/0YDQsNCy0LvRj9C10LwuLi4nLFxyXG5cdFx0XHRcdFx0XHR0ZXh0OiAn0J7RgtC/0YDQsNCy0LjRgtGMJ1xyXG5cdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHRpZiAoYnRuU3VibWl0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1zcGlubmVyJykgJiYgc3RhdHVzID09PSAnYmVmb3JlU2VuZCcpIHtcclxuXHRcdFx0XHRcdFx0YnRuU3VibWl0Lmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsICc8c3BhbiBjbGFzcz1cInNwaW5uZXItYm9yZGVyIHNwaW5uZXItYm9yZGVyLXNtIG1lLTJcIj48L3NwYW4+JylcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRpZiAoYnRuU3VibWl0Lmhhc0F0dHJpYnV0ZSgnZGF0YS10ZXh0JykpIHtcclxuXHRcdFx0XHRcdFx0YnRuVGV4dC50ZXh0ID0gYnRuU3VibWl0LmdldEF0dHJpYnV0ZSgnZGF0YS10ZXh0Jyk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRsZXQgJGJ0blRleHQgPSBidG5TdWJtaXQucXVlcnlTZWxlY3RvcignW2RhdGEtdGV4dF0nKTtcclxuXHRcdFx0XHRcdFx0aWYgKCRidG5UZXh0KSB7XHJcblx0XHRcdFx0XHRcdFx0YnRuVGV4dC50ZXh0ID0gJGJ0blRleHQuZ2V0QXR0cmlidXRlKCdkYXRhLXRleHQnKTtcclxuXHRcdFx0XHRcdFx0XHRidG5TdWJtaXQgPSAkYnRuVGV4dDtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGlmIChidG5TdWJtaXQuaGFzQXR0cmlidXRlKCdkYXRhLXRleHQtc2VuZCcpKSB7XHJcblx0XHRcdFx0XHRcdGJ0blRleHQuc2VuZCA9IGJ0blN1Ym1pdC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGV4dC1zZW5kJyk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRsZXQgJGJ0blRleHRTZW5kID0gYnRuU3VibWl0LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXRleHQtc2VuZF0nKTtcclxuXHRcdFx0XHRcdFx0aWYgKCRidG5UZXh0U2VuZCkge1xyXG5cdFx0XHRcdFx0XHRcdGJ0blRleHQuc2VuZCA9ICRidG5UZXh0U2VuZC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGV4dC1zZW5kJyk7XHJcblx0XHRcdFx0XHRcdFx0YnRuU3VibWl0ID0gJGJ0blRleHRTZW5kO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0aWYgKHN0YXR1cyA9PT0gJ2JlZm9yZVNlbmQnKSB7XHJcblx0XHRcdFx0XHRcdGJ0blN1Ym1pdC5pbm5lckhUTUwgPSBidG5UZXh0LnNlbmQ7XHJcblx0XHRcdFx0XHRcdGJ0blN1Ym1pdC5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRidG5TdWJtaXQuaW5uZXJIVE1MID0gYnRuVGV4dC50ZXh0O1xyXG5cdFx0XHRcdFx0XHRidG5TdWJtaXQucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xyXG5cclxuXHRcdFx0XHRcdFx0bGV0IHNwaW5uZXIgPSB2Z1NlbmRlci5leHRFbGVtZW50LmJ1dHRvbi5xdWVyeVNlbGVjdG9yKCcuc3Bpbm5lci1ib3JkZXInKTtcclxuXHRcdFx0XHRcdFx0aWYgKHNwaW5uZXIpIHtcclxuXHRcdFx0XHRcdFx0XHRzcGlubmVyLnJlbW92ZSgpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRmdW5jdGlvbiBqc29uUGFyc2UoZGF0YSwgc3RhdHVzLCBzZW5kZXIpIHtcclxuXHRcdFx0XHRpZiAoX3RoaXMuc2V0dGluZ3MuaXNKc29uUGFyc2UgJiYgdHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XHJcblx0XHRcdFx0XHRsZXQgcGFyc2VyRGF0YSA9IHt9O1xyXG5cclxuXHRcdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRcdHBhcnNlckRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xyXG5cdFx0XHRcdFx0XHRfdGhpcy5hbGVydChzZW5kZXIsIHBhcnNlckRhdGEsIHN0YXR1cyk7XHJcblx0XHRcdFx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdFx0XHRcdF90aGlzLmFsZXJ0KHNlbmRlciwgZGF0YSwgc3RhdHVzKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0X3RoaXMuYWxlcnQoc2VuZGVyLCBkYXRhLCBzdGF0dXMpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YWxlcnQodmdTZW5kZXIsIGRhdGEsIHN0YXR1cykge1xyXG5cdFx0aWYgKCF0aGlzLmlzQWxlcnQpIHJldHVybiBmYWxzZTtcclxuXHJcblx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0bGV0IHR5cGU7XHJcblx0XHRcdGlmICh0aGlzLnNldHRpbmdzLmFsZXJ0LnBhcmFtcy50eXBlID09PSAnYmxvY2snKSB0eXBlID0gJ2RpdkJsb2NrJztcclxuXHRcdFx0aWYgKHRoaXMuc2V0dGluZ3MuYWxlcnQucGFyYW1zLnR5cGUgPT09ICdtb2RhbCcpIHR5cGUgPSAnVkdNb2RhbCc7XHJcblxyXG5cdFx0XHRpZiAodHlwZSkge1xyXG5cdFx0XHRcdHRoaXMuc2V0dGluZ3MucGx1Z2lucy5maW5kKHAgPT4gcFt0eXBlXSlbdHlwZV0uZW5hYmxlZCA9IHRydWU7XHJcblx0XHRcdFx0dGhpcy5zZXR0aW5ncy5wbHVnaW5zLmZpbmQocCA9PiBwW3R5cGVdKVt0eXBlXS5wYXJhbXMuZGF0YSA9IGRhdGE7XHJcblx0XHRcdFx0dGhpcy5zZXR0aW5ncy5wbHVnaW5zLmZpbmQocCA9PiBwW3R5cGVdKVt0eXBlXS5wYXJhbXMuc3RhdHVzID0gc3RhdHVzO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoJ3BsdWdpbnMnIGluIHRoaXMuc2V0dGluZ3MpIHtcclxuXHRcdFx0XHRuZXcgVkdGb3JtUGx1Z2lucyh0aGlzKS5pbml0KCk7XHJcblx0XHRcdH1cclxuXHRcdH0sIHRoaXMuc2V0dGluZ3MuYWxlcnQuZGVsYXkpXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBWR0Zvcm1TZW5kZXJcclxuIiwiaW1wb3J0IHthamF4LCBldmVudEhhbmRsZXIsIGNvbGxlY3REYXRhLCBtZXJnZURlZXBPYmplY3R9IGZyb20gXCIuLi91dGlsL2Z1bmN0aW9uc1wiO1xyXG5pbXBvcnQgVkdGb3JtUGx1Z2lucyBmcm9tIFwiLi9WR0Zvcm1QbHVnaW5zXCI7XHJcblxyXG5jb25zdCBFVkVOVF9LRVlfU1VDQ0VTUyA9ICd2Zy5mcy5zdWNjZXNzJztcclxuY29uc3QgRVZFTlRfS0VZX0VSUk9SICAgPSAndmcuZnMuZXJyb3InO1xyXG5jb25zdCBFVkVOVF9LRVlfQkVGT1JFICA9ICd2Zy5mcy5iZWZvcmUnO1xyXG5cclxuY29uc3Qgc2V0UGFyYW1zID0gZnVuY3Rpb24gKGZvcm0sIHBhcmFtcywgYXJnKSB7XHJcblx0aWYgKCdwbHVnaW5zJyBpbiBhcmcgJiYgYXJnLnBsdWdpbnMubGVuZ3RoKSB7XHJcblx0XHRhcmcucGx1Z2lucy5mb3JFYWNoKGZ1bmN0aW9uIChwbHVnaW4sIG4pIHtcclxuXHRcdFx0Zm9yIChjb25zdCBwbHVnaW5FbGVtZW50IGluIHBsdWdpbikge1xyXG5cdFx0XHRcdHBhcmFtcy5wbHVnaW5zLmZvckVhY2goKHAsIGkpID0+IHtcclxuXHRcdFx0XHRcdGZvciAoY29uc3QgcEVsbSBpbiBwKSB7XHJcblx0XHRcdFx0XHRcdGlmIChwRWxtID09PSBwbHVnaW5FbGVtZW50KSB7XHJcblx0XHRcdFx0XHRcdFx0cGFyYW1zLnBsdWdpbnNbaV0gPSBtZXJnZURlZXBPYmplY3QocGFyYW1zLnBsdWdpbnNbaV0sIGFyZy5wbHVnaW5zW25dKVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdGRlbGV0ZSBhcmcucGx1Z2lucztcclxuXHR9XHJcblxyXG5cdGxldCBtUGFyYW1zID0gbWVyZ2VEZWVwT2JqZWN0KHBhcmFtcywgYXJnKTtcclxuXHRsZXQgZGF0YSA9IFtdLmZpbHRlci5jYWxsKGZvcm0uYXR0cmlidXRlcywgZnVuY3Rpb24oYXQpIHsgcmV0dXJuIC9eZGF0YS0vLnRlc3QoYXQubmFtZSk7IH0pO1xyXG5cclxuXHRmb3IgKGxldCB2YWwgb2YgZGF0YSkge1xyXG5cdFx0aWYgKHZhbC5uYW1lID09PSAnZGF0YS1hbGVydC10eXBlJyAmJiB2YWwudmFsdWUpIG1QYXJhbXMuYWxlcnQucGFyYW1zLnR5cGUgPSB2YWwudmFsdWU7XHJcblx0XHRpZiAodmFsLm5hbWUgPT09ICdkYXRhLWFsZXJ0JykgbVBhcmFtcy5hbGVydC5lbmFibGVkID0gdmFsLnZhbHVlICE9PSAnZmFsc2UnO1xyXG5cdFx0aWYgKHZhbC5uYW1lID09PSAnZGF0YS1zdWJtaXQnKSBtUGFyYW1zLmlzU3VibWl0ID0gdmFsLnZhbHVlICE9PSAnZmFsc2UnO1xyXG5cdFx0aWYgKHZhbC5uYW1lID09PSAnZGF0YS1zaG93LXRleHQnKSBtUGFyYW1zLmlzQnRuVGV4dCA9IHZhbC52YWx1ZSAhPT0gJ2ZhbHNlJztcclxuXHRcdGlmICh2YWwubmFtZSA9PT0gJ2RhdGEtdmFsaWRhdGUnKSBtUGFyYW1zLmlzVmFsaWRhdGUgPSB2YWwudmFsdWUgIT09ICdmYWxzZSc7XHJcblx0XHRpZiAodmFsLm5hbWUgPT09ICdkYXRhLWpzb24tcGFyc2UnKSBtUGFyYW1zLmlzSnNvblBhcnNlID0gdmFsLnZhbHVlICE9PSAnZmFsc2UnO1xyXG5cdFx0aWYgKHZhbC5uYW1lID09PSAnZGF0YS1yZWRpcmVjdCcgJiYgdmFsLnZhbHVlKSBtUGFyYW1zLnJlZGlyZWN0ID0gdmFsLnZhbHVlO1xyXG5cdFx0aWYgKHZhbC5uYW1lID09PSAnZGF0YS1wbHVnaW5zJyAmJiB2YWwudmFsdWUpIG1QYXJhbXMucGx1Z2lucyA9IGRhdGFQbHVnaW5zKEpTT04ucGFyc2UodmFsLnZhbHVlKSk7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBkYXRhUGx1Z2lucyh2YWx1ZSkge1xyXG5cdFx0bGV0IHAgPSB7fVxyXG5cclxuXHRcdGZvciAoY29uc3QgcGx1Z2luIG9mIHBhcmFtcy5wbHVnaW5zKSB7XHJcblx0XHRcdGxldCBuYW1lUGx1Z2luID0gT2JqZWN0LmtleXMocGx1Z2luKVswXSxcclxuXHRcdFx0XHRuYW1lTW9kdWxlID0gT2JqZWN0LmtleXModmFsdWUpWzBdO1xyXG5cclxuXHRcdFx0aWYgKG5hbWVQbHVnaW4gPT09IG5hbWVNb2R1bGUpIHtcclxuXHRcdFx0XHRwID0gbWVyZ2VEZWVwT2JqZWN0KHBsdWdpbiwgdmFsdWUpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHA7XHJcblx0fVxyXG5cclxuXHRtUGFyYW1zLmFjdGlvbiA9IGZvcm0uZ2V0QXR0cmlidXRlKCdhY3Rpb24nKSB8fCBtUGFyYW1zLmFjdGlvbjtcclxuXHRtUGFyYW1zLm1ldGhvZCA9IGZvcm0uZ2V0QXR0cmlidXRlKCdtZXRob2QnKSB8fCBtUGFyYW1zLm1ldGhvZDtcclxuXHJcblx0cmV0dXJuIG1QYXJhbXNcclxufVxyXG5cclxuY2xhc3MgVkdTZW5kZXIge1xyXG5cdGNvbnN0cnVjdG9yKGZvcm0sIGFyZyA9IHt9KSB7XHJcblx0XHR0aGlzLmV4dEVsZW1lbnQgPSB7fTtcclxuXHRcdHRoaXMuc2V0dGluZ3MgPSB7fTtcclxuXHRcdHRoaXMuZm9ybSA9IG51bGw7XHJcblxyXG5cdFx0Y29uc3QgZGVmYXVsdFBhcmFtcyA9IHtcclxuXHRcdFx0YWN0aW9uOiBsb2NhdGlvbi5ocmVmLFxyXG5cdFx0XHRtZXRob2Q6ICdwb3N0JyxcclxuXHRcdFx0ZmllbGRzOiBbXSxcclxuXHRcdFx0cmVkaXJlY3Q6IG51bGwsXHJcblx0XHRcdGlzSnNvblBhcnNlOiB0cnVlLFxyXG5cdFx0XHRpc1ZhbGlkYXRlOiBmYWxzZSxcclxuXHRcdFx0aXNTdWJtaXQ6IHRydWUsXHJcblx0XHRcdGlzQnRuVGV4dDogdHJ1ZSxcclxuXHRcdFx0YWxlcnQ6IHtcclxuXHRcdFx0XHRlbmFibGVkOiB0cnVlLFxyXG5cdFx0XHRcdGRlbGF5OiAzNTAsXHJcblx0XHRcdFx0cGFyYW1zOiB7XHJcblx0XHRcdFx0XHR0eXBlOiAnbW9kYWwnXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fSxcclxuXHRcdFx0cGx1Z2luczogW1xyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdHNob3dQYXNzOiB7XHJcblx0XHRcdFx0XHRcdGVuYWJsZWQ6IHRydWUsXHJcblx0XHRcdFx0XHRcdHBhcmFtczoge31cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdGRpdkJsb2NrOiB7XHJcblx0XHRcdFx0XHRcdGVuYWJsZWQ6IGZhbHNlLFxyXG5cdFx0XHRcdFx0XHRwYXJhbXM6IHt9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRWR01vZGFsOiB7XHJcblx0XHRcdFx0XHRcdGVuYWJsZWQ6IGZhbHNlLFxyXG5cdFx0XHRcdFx0XHRwYXJhbXM6IHt9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRdXHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCFmb3JtKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoJ9Cf0LXRgNCy0YvQuSDQv9Cw0YDQsNC80LXRgtGAINC90LUg0LTQvtC70LbQtdC9INCx0YvRgtGMINC/0YPRgdGC0YvQvCcpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRpZiAodHlwZW9mIGZvcm0gPT09ICdzdHJpbmcnKSB7XHJcblx0XHRcdFx0bGV0ICRmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihmb3JtKTtcclxuXHRcdFx0XHRpZiAoJGZvcm0pIHtcclxuXHRcdFx0XHRcdHRoaXMuZm9ybSA9IGZvcm07XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuZm9ybSA9IGZvcm07XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICh0aGlzLmZvcm0pIHtcclxuXHRcdFx0XHR0aGlzLnNldHRpbmdzID0gc2V0UGFyYW1zKGZvcm0sIGRlZmF1bHRQYXJhbXMsIGFyZyk7XHJcblxyXG5cdFx0XHRcdHRoaXMuY2xhc3NlcyA9IHtcclxuXHRcdFx0XHRcdGdlbmVyYWw6ICd2Zy1mb3JtLXNlbmRlcidcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmICh0aGlzLnNldHRpbmdzLmZpZWxkcyAmJiB0eXBlb2YgdGhpcy5zZXR0aW5ncy5maWVsZHMgPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdFx0dGhpcy5zZXR0aW5ncy5maWVsZHMgPSB0aGlzLnNldHRpbmdzLmZpZWxkcygpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0dGhpcy5pbml0KCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGluaXQoKSB7XHJcblx0XHRjb25zdCBfdGhpcyA9IHRoaXM7XHJcblxyXG5cdFx0X3RoaXMuZm9ybS5jbGFzc0xpc3QuYWRkKF90aGlzLmNsYXNzZXMuZ2VuZXJhbCk7XHJcblxyXG5cdFx0aWYgKF90aGlzLnNldHRpbmdzLmlzVmFsaWRhdGUpIHtcclxuXHRcdFx0X3RoaXMuZm9ybS5zZXRBdHRyaWJ1dGUoJ25vdmFsaWRhdGUnLCAnJyk7XHJcblx0XHRcdF90aGlzLmZvcm0uY2xhc3NMaXN0LmFkZCgnbmVlZHMtdmFsaWRhdGlvbicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBidG5TdWJtaXQgPSBfdGhpcy5mb3JtLnF1ZXJ5U2VsZWN0b3IoJ1t0eXBlPVwic3VibWl0XCJdJyk7XHJcblx0XHRpZiAoIWJ0blN1Ym1pdCkgYnRuU3VibWl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2Zvcm09XCInICsgX3RoaXMuZm9ybS5pZCArICdcIl0nKTtcclxuXHRcdF90aGlzLmV4dEVsZW1lbnQuYnV0dG9uID0gYnRuU3VibWl0O1xyXG5cclxuXHRcdGlmICgncGx1Z2lucycgaW4gX3RoaXMuc2V0dGluZ3MpIHtcclxuXHRcdFx0bmV3IFZHRm9ybVBsdWdpbnMoX3RoaXMpLmluaXQoKTtcclxuXHRcdH1cclxuXHJcblx0XHRfdGhpcy5pc0luaXQgPSB0cnVlO1xyXG5cdH1cclxuXHJcblx0c3VibWl0KGNhbGxiYWNrKSB7XHJcblx0XHRpZiAoIXRoaXMuaXNJbml0KSByZXR1cm4gZmFsc2U7XHJcblx0XHRjb25zdCBfdGhpcyA9IHRoaXM7XHJcblxyXG5cdFx0X3RoaXMuZm9ybS5vbnN1Ym1pdCA9IGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRpZiAoX3RoaXMuc2V0dGluZ3MuaXNWYWxpZGF0ZSkge1xyXG5cdFx0XHRcdGlmICghX3RoaXMuZm9ybS5jaGVja1ZhbGlkaXR5KCkpIHtcclxuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcblx0XHRcdFx0XHRfdGhpcy5mb3JtLmNsYXNzTGlzdC5hZGQoJ3dhcy12YWxpZGF0ZWQnKTtcclxuXHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIV90aGlzLnNldHRpbmdzLmlzU3VibWl0KSByZXR1cm4gZmFsc2U7XHJcblxyXG5cdFx0XHRsZXQgZGF0YSA9IG5ldyBGb3JtRGF0YShfdGhpcy5mb3JtKTtcclxuXHRcdFx0aWYgKHR5cGVvZiBfdGhpcy5zZXR0aW5ncy5maWVsZHMgPT09ICdvYmplY3QnKSB7XHJcblx0XHRcdFx0X3RoaXMuZGF0YSA9IGNvbGxlY3REYXRhKGRhdGEsIF90aGlzLnNldHRpbmdzLmZpZWxkcyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBfdGhpcy5yZXF1ZXN0KGNhbGxiYWNrLCBldmVudCk7XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0cmVxdWVzdChjYWxsYmFjaywgZXZlbnQpIHtcclxuXHRcdGlmICghdGhpcy5pc0luaXQpIHJldHVybiBmYWxzZTtcclxuXHRcdGNvbnN0IF90aGlzID0gdGhpcztcclxuXHJcblx0XHRsZXQgbWV0aG9kID0gX3RoaXMuc2V0dGluZ3MubWV0aG9kLnRvTG93ZXJDYXNlKCksXHJcblx0XHRcdHVybCA9IF90aGlzLnNldHRpbmdzLmFjdGlvbixcclxuXHRcdFx0ZGF0YSA9IF90aGlzLmRhdGE7XHJcblxyXG5cdFx0aWYgKGNhbGxiYWNrICYmICdiZWZvcmVTZW5kJyBpbiBjYWxsYmFjaykge1xyXG5cdFx0XHRpZiAodHlwZW9mIGNhbGxiYWNrLmJlZm9yZVNlbmQgPT09ICdmdW5jdGlvbicpIGNhbGxiYWNrLmJlZm9yZVNlbmQoZXZlbnQsIF90aGlzKTtcclxuXHRcdH1cclxuXHJcblx0XHRldmVudEhhbmRsZXIub24oX3RoaXMuZm9ybSwgRVZFTlRfS0VZX0JFRk9SRSk7XHJcblxyXG5cdFx0aWYgKG1ldGhvZCA9PT0gJ3Bvc3QnKSB7XHJcblx0XHRcdGFqYXgucG9zdCh1cmwsIGRhdGEsIGZ1bmN0aW9uKHN0YXR1cywgZGF0YSkge1xyXG5cdFx0XHRcdGFuc3dlcihzdGF0dXMsIGRhdGEpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAobWV0aG9kID09PSAnZ2V0Jykge1xyXG5cdFx0XHRhamF4LmdldCh1cmwsIGRhdGEsIGZ1bmN0aW9uKHN0YXR1cywgZGF0YSkge1xyXG5cdFx0XHRcdGFuc3dlcihzdGF0dXMsIGRhdGEpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBhbnN3ZXIoc3RhdHVzLCBkYXRhKSB7XHJcblx0XHRcdF90aGlzLmZvcm0uY2xhc3NMaXN0LnJlbW92ZSgnd2FzLXZhbGlkYXRlZCcpO1xyXG5cclxuXHRcdFx0aWYgKHR5cGVvZiBzdGF0dXMgPT09ICdzdHJpbmcnICYmIHN0YXR1cyA9PT0gJ2Vycm9yJykge1xyXG5cdFx0XHRcdGlmIChjYWxsYmFjayAmJiAnZXJyb3InIGluIGNhbGxiYWNrKSB7XHJcblx0XHRcdFx0XHRpZiAodHlwZW9mIGNhbGxiYWNrLmVycm9yID09PSAnZnVuY3Rpb24nKSBjYWxsYmFjay5lcnJvcihldmVudCwgX3RoaXMsIGRhdGEpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0ZXZlbnRIYW5kbGVyLm9uKF90aGlzLmZvcm0sIEVWRU5UX0tFWV9FUlJPUik7XHJcblx0XHRcdH0gZWxzZSBpZiAodHlwZW9mIHN0YXR1cyA9PT0gJ3N0cmluZycgJiYgc3RhdHVzID09PSAnc3VjY2VzcycpIHtcclxuXHRcdFx0XHRpZiAoY2FsbGJhY2sgJiYgJ3N1Y2Nlc3MnIGluIGNhbGxiYWNrKSB7XHJcblx0XHRcdFx0XHRpZiAodHlwZW9mIGNhbGxiYWNrLnN1Y2Nlc3MgPT09ICdmdW5jdGlvbicpIGNhbGxiYWNrLnN1Y2Nlc3MoZXZlbnQsIF90aGlzLCBkYXRhKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGV2ZW50SGFuZGxlci5vbihfdGhpcy5mb3JtLCBFVkVOVF9LRVlfU1VDQ0VTUyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJlZGlyZWN0KCk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gcmVkaXJlY3QoKSB7XHJcblx0XHRcdGlmIChfdGhpcy5zZXR0aW5ncy5yZWRpcmVjdCkge1xyXG5cdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gX3RoaXMuc2V0dGluZ3MucmVkaXJlY3Q7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBWR1NlbmRlcjtcclxuIiwiaW1wb3J0IHtnZXRTdmd9IGZyb20gXCIuLi8uLi91dGlsL3N2Z1wiO1xyXG5pbXBvcnQge2lzT2JqZWN0fSBmcm9tIFwiLi4vLi4vdXRpbC9mdW5jdGlvbnNcIjtcclxuXHJcbmNsYXNzIGRpdkJsb2NrIHtcclxuXHRjb25zdHJ1Y3Rvcihmb3JtLCBhcmcpIHtcclxuXHRcdHRoaXMuZm9ybSA9IGZvcm07XHJcblx0XHR0aGlzLnBhcmFtcyA9IGFyZztcclxuXHRcdHRoaXMuY2xhc3NlcyA9IHtcclxuXHRcdFx0Y29udGFpbmVyOiAndmctZm9ybS1zZW5kZXItLWFsZXJ0LWJsb2NrJ1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0aW5pdCgpIHtcclxuXHRcdGNvbnN0IF90aGlzID0gdGhpcztcclxuXHJcblx0XHRsZXQgZWwgPSBfdGhpcy5mb3JtLnF1ZXJ5U2VsZWN0b3IoJy4nICsgX3RoaXMuY2xhc3Nlcy5jb250YWluZXIpO1xyXG5cdFx0aWYgKCFlbCkgZWwgPSBfdGhpcy5kcmF3KCk7XHJcblxyXG5cdFx0aWYgKF90aGlzLnBhcmFtcy5zdGF0dXMgPT09ICdiZWZvcmVTZW5kJykge1xyXG5cdFx0XHRpZiAoZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xyXG5cdFx0XHRcdF90aGlzLnRvZ2dsZVNsaWRlKGVsKTtcclxuXHRcdFx0XHRlbC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuXHJcblx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiBlbC5yZW1vdmUoKSwgNTAwKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0X3RoaXMuc2V0QWN0aXZlKGVsKTtcclxuXHRcdFx0X3RoaXMuc2V0VGV4dChlbCk7XHJcblx0XHRcdF90aGlzLmNsb3NlKGVsKTtcclxuXHRcdFx0X3RoaXMudG9nZ2xlU2xpZGUoZWwpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c2V0QWN0aXZlKGVsKSB7XHJcblx0XHRlbC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuXHRcdGxldCBlbFNob3cgPSBlbC5xdWVyeVNlbGVjdG9yQWxsKCcuc2hvdycpO1xyXG5cdFx0aWYgKGVsU2hvdy5sZW5ndGgpIHtcclxuXHRcdFx0Zm9yIChjb25zdCBlbGVtZW50IG9mIGVsU2hvdykge1xyXG5cdFx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRzZXRUZXh0KGVsKSB7XHJcblx0XHRjb25zdCBfdGhpcyA9IHRoaXM7XHJcblx0XHRsZXQgZGF0YSA9IF90aGlzLnBhcmFtcy5kYXRhLFxyXG5cdFx0XHRfY2xhc3MgPSBfdGhpcy5wYXJhbXMuc3RhdHVzID09PSAnZXJyb3InID8gJ2RhbmdlcicgOiBfdGhpcy5wYXJhbXMuc3RhdHVzO1xyXG5cclxuXHRcdGlmICghZGF0YSB8fCBfdGhpcy5wYXJhbXMuc3RhdHVzID09PSAnYmVmb3JlU2VuZCcpIHJldHVybiBmYWxzZTtcclxuXHJcblx0XHRpZiAoaXNPYmplY3QoZGF0YSkpIHtcclxuXHRcdFx0aWYgKCgnZXJyb3JzJyBpbiBkYXRhICYmIGRhdGEuZXJyb3JzKSB8fCAoJ2Vycm9yJyBpbiBkYXRhICYmIGRhdGEuZXJyb3IpKSBfY2xhc3MgPSAnZGFuZ2VyJztcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgJGFsZXJ0ID0gZWwucXVlcnlTZWxlY3RvcignLnZnLWFsZXJ0LScgKyBfY2xhc3MpO1xyXG5cdFx0aWYgKCRhbGVydCkge1xyXG5cdFx0XHRsZXQgJHRleHQgPSAkYWxlcnQucXVlcnlTZWxlY3RvcignW2RhdGEtYWxlcnQtJysgX2NsYXNzICsnLXRleHRdJyk7XHJcblx0XHRcdGlmICgkdGV4dCkge1xyXG5cdFx0XHRcdGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcclxuXHRcdFx0XHRcdCR0ZXh0LmlubmVySFRNTCA9IGRhdGE7XHJcblx0XHRcdFx0fSBlbHNlIGlmICgoJ21zZycgaW4gZGF0YSkpIHtcclxuXHRcdFx0XHRcdCR0ZXh0LmlubmVySFRNTCA9IGRhdGEubXNnO1xyXG5cclxuXHRcdFx0XHRcdGxldCAkdGl0bGUgPSAkYWxlcnQucXVlcnlTZWxlY3RvcignW2RhdGEtYWxlcnQtJysgX2NsYXNzICsnLXRpdGxlXScpO1xyXG5cdFx0XHRcdFx0aWYgKCR0aXRsZSAmJiAoJ3RpdGxlJyBpbiBkYXRhKSkgJHRpdGxlLmlubmVySFRNTCA9IGRhdGEudGl0bGU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQkYWxlcnQuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0ZWwuaW5uZXJIVE1MID0gZGF0YS5tc2dcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGNsb3NlKGVsKSB7XHJcblx0XHRjb25zdCBfdGhpcyA9IHRoaXM7XHJcblxyXG5cdFx0bGV0IGVsQ2xvc2UgPSBlbC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1kaXNtaXNzPVwiYWxlcnQtYmxvY2tcIl0nKTtcclxuXHRcdGlmIChlbENsb3NlKSB7XHJcblx0XHRcdGVsQ2xvc2Uub25jbGljayA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRfdGhpcy50b2dnbGVTbGlkZShlbCk7XHJcblx0XHRcdFx0ZWwuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcblxyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZHJhdygpIHtcclxuXHRcdGNvbnN0IF90aGlzID0gdGhpcztcclxuXHRcdGxldCBmb3JtID0gdGhpcy5mb3JtO1xyXG5cclxuXHRcdGxldCBlbEZvcm1JRCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZvcm09XCInICsgZm9ybS5pZCArICdcIl0nKTtcclxuXHRcdGlmIChlbEZvcm1JRCkgcmV0dXJuIGVsRm9ybUlEO1xyXG5cclxuXHRcdGxldCBlbEJsb2NrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblx0XHRlbEJsb2NrLmNsYXNzTGlzdC5hZGQoX3RoaXMuY2xhc3Nlcy5jb250YWluZXIpO1xyXG5cdFx0ZWxCbG9jay5pbm5lckhUTUwgPSAnPGRpdiBjbGFzcz1cImNsb3NlXCI+PGEgaHJlZj1cIiNcIiBkYXRhLWRpc21pc3M9XCJhbGVydC1ibG9ja1wiPicgKyBnZXRTdmcoJ2Nyb3NzJykgKyAnPC9hPjwvZGl2PicgK1xyXG5cdFx0XHQnPGRpdiBjbGFzcz1cInZnLWFsZXJ0IHZnLWFsZXJ0LWRhbmdlclwiPicgK1xyXG5cdFx0XHQnXHQ8ZGl2IGNsYXNzPVwic3ZnLWFyZWFcIj4nICsgZ2V0U3ZnKCdlcnJvcicpICsgJzwvZGl2PicgK1xyXG5cdFx0XHQnXHQ8ZGl2IGNsYXNzPVwiY29udGVudC1hcmVhXCI+JyArXHJcblx0XHRcdCdcdFx0PGRpdiBjbGFzcz1cInRpdGxlLWFyZWFcIiBkYXRhLWFsZXJ0LWRhbmdlci10aXRsZT48L2Rpdj4nICtcclxuXHRcdFx0J1x0XHQ8ZGl2IGNsYXNzPVwidGV4dC1hcmVhXCIgZGF0YS1hbGVydC1kYW5nZXItdGV4dD48L2Rpdj4nICtcclxuXHRcdFx0J1x0PC9kaXY+JyArXHJcblx0XHRcdCc8L2Rpdj4nICtcclxuXHRcdFx0JzxkaXYgY2xhc3M9XCJ2Zy1hbGVydCB2Zy1hbGVydC1zdWNjZXNzXCI+JyArXHJcblx0XHRcdCdcdDxkaXYgY2xhc3M9XCJzdmctYXJlYVwiPicgKyBnZXRTdmcoJ3N1Y2Nlc3MnKSArICc8L2Rpdj4nICtcclxuXHRcdFx0J1x0PGRpdiBjbGFzcz1cImNvbnRlbnQtYXJlYVwiPicgK1xyXG5cdFx0XHQnXHRcdDxkaXYgY2xhc3M9XCJ0aXRsZS1hcmVhXCIgZGF0YS1hbGVydC1zdWNjZXNzLXRpdGxlPjwvZGl2PicgK1xyXG5cdFx0XHQnXHRcdDxkaXYgY2xhc3M9XCJ0ZXh0LWFyZWFcIiBkYXRhLWFsZXJ0LXN1Y2Nlc3MtdGV4dD48L2Rpdj4nICtcclxuXHRcdFx0J1x0PC9kaXY+JyArXHJcblx0XHRcdCc8L2Rpdj4nO1xyXG5cclxuXHRcdGZvcm0ucHJlcGVuZChlbEJsb2NrKTtcclxuXHJcblx0XHRyZXR1cm4gZWxCbG9jaztcclxuXHR9XHJcblxyXG5cdHRvZ2dsZVNsaWRlKGVsKSB7XHJcblx0XHRpZiAoZWwuZ2V0QXR0cmlidXRlKCdkYXRhLW1heC1oZWlnaHQnKSkge1xyXG5cdFx0XHRpZiAoZWwuc3R5bGUubWF4SGVpZ2h0LnJlcGxhY2UoJ3B4JywgJycpLnJlcGxhY2UoJyUnLCAnJykgPT09ICcwJykge1xyXG5cdFx0XHRcdGVsLnN0eWxlLm1heEhlaWdodCA9IGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1tYXgtaGVpZ2h0Jyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0ZWwuc3R5bGUubWF4SGVpZ2h0ID0gJzAnO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRsZXQgZWxfbWF4X2hlaWdodCAgICAgICA9IGdldEhlaWdodChlbCkgKyAncHgnIHx8ICcwJztcclxuXHRcdFx0ZWwuc3R5bGVbJ3RyYW5zaXRpb24nXSAgICAgICAgID0gJ21heC1oZWlnaHQgMC41cyBlYXNlLWluLW91dCc7XHJcblx0XHRcdGVsLnN0eWxlLm92ZXJmbG93WSAgICAgICAgICAgICA9ICdoaWRkZW4nO1xyXG5cdFx0XHRlbC5zdHlsZS5tYXhIZWlnaHQgICAgICAgICAgICAgPSAnMCc7XHJcblx0XHRcdGVsLnNldEF0dHJpYnV0ZSgnZGF0YS1tYXgtaGVpZ2h0JywgZWxfbWF4X2hlaWdodCk7XHJcblx0XHRcdGVsLnN0eWxlLmRpc3BsYXkgICAgICAgICAgICAgICA9ICdibG9jayc7XHJcblxyXG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdGVsLnN0eWxlLm1heEhlaWdodCA9IGVsX21heF9oZWlnaHQ7XHJcblx0XHRcdH0sIDEwKTtcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBnZXRIZWlnaHQoZWwpIHtcclxuXHRcdFx0bGV0IGVsX3N0eWxlICAgICAgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbCksXHJcblx0XHRcdFx0ZWxfZGlzcGxheSAgICA9IGVsX3N0eWxlLmRpc3BsYXksXHJcblx0XHRcdFx0ZWxfcG9zaXRpb24gICA9IGVsX3N0eWxlLnBvc2l0aW9uLFxyXG5cdFx0XHRcdGVsX3Zpc2liaWxpdHkgPSBlbF9zdHlsZS52aXNpYmlsaXR5LFxyXG5cdFx0XHRcdGVsX21heF9oZWlnaHQgPSBlbF9zdHlsZS5tYXhIZWlnaHQucmVwbGFjZSgncHgnLCAnJykucmVwbGFjZSgnJScsICcnKSxcclxuXHRcdFx0XHR3YW50ZWRfaGVpZ2h0ID0gMDtcclxuXHJcblx0XHRcdGlmIChlbF9kaXNwbGF5ICE9PSAnbm9uZScgJiYgZWxfbWF4X2hlaWdodCAhPT0gJzAnKSB7XHJcblx0XHRcdFx0cmV0dXJuIGVsLm9mZnNldEhlaWdodDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZWwuc3R5bGUucG9zaXRpb24gICA9ICdhYnNvbHV0ZSc7XHJcblx0XHRcdGVsLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcclxuXHRcdFx0ZWwuc3R5bGUuZGlzcGxheSAgICA9ICdibG9jayc7XHJcblxyXG5cdFx0XHR3YW50ZWRfaGVpZ2h0ICAgICA9IGVsLm9mZnNldEhlaWdodDtcclxuXHJcblx0XHRcdGVsLnN0eWxlLmRpc3BsYXkgICAgPSBlbF9kaXNwbGF5O1xyXG5cdFx0XHRlbC5zdHlsZS5wb3NpdGlvbiAgID0gZWxfcG9zaXRpb247XHJcblx0XHRcdGVsLnN0eWxlLnZpc2liaWxpdHkgPSBlbF92aXNpYmlsaXR5O1xyXG5cclxuXHRcdFx0cmV0dXJuIHdhbnRlZF9oZWlnaHQ7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkaXZCbG9jaztcclxuIiwiaW1wb3J0IHtnZXRTdmd9IGZyb20gXCIuLi8uLi91dGlsL3N2Z1wiO1xyXG5pbXBvcnQge2V2ZW50SGFuZGxlciwgaXNPYmplY3QsIG1lcmdlRGVlcE9iamVjdCwgbm9ybWFsaXplRGF0YX0gZnJvbSBcIi4uLy4uL3V0aWwvZnVuY3Rpb25zXCI7XHJcblxyXG5jb25zdCBFVkVOVF9LRVlfTU9EQUxfT1BFTiAgPSAndmcuZnMubW9kYWwub3Blbic7XHJcblxyXG5jbGFzcyBWR01vZGFsIHtcclxuXHRjb25zdHJ1Y3Rvcihmb3JtLCBhcmcpIHtcclxuXHRcdHRoaXMuZm9ybSA9IGZvcm07XHJcblx0XHR0aGlzLnBhcmFtcyA9IG1lcmdlRGVlcE9iamVjdCh7XHJcblx0XHRcdGNvbnRlbnRfb3ZlcjogdHJ1ZSxcclxuXHRcdFx0aGlkZURlbGF5OiAzNTAsXHJcblx0XHRcdHNob3dEZWxheTogNTBcclxuXHRcdH0sIGFyZyk7XHJcblx0XHR0aGlzLmNsYXNzZXMgPSB7XHJcblx0XHRcdGNvbnRhaW5lcjogJ3ZnLWZvcm0tc2VuZGVyLS1hbGVydC1tb2RhbCcsXHJcblx0XHRcdGJhY2tkcm9wOiAgJ3ZnLWZvcm0tc2VuZGVyLS1hbGVydC1iYWNrZHJvcCdcclxuXHRcdH1cclxuXHRcdHRoaXMuZWxlbWVudCA9IG51bGw7XHJcblx0XHR0aGlzLmJhY2tkcm9wID0gbnVsbDtcclxuXHR9XHJcblxyXG5cdGluaXQoKSB7XHJcblx0XHRjb25zdCBfdGhpcyA9IHRoaXM7XHJcblxyXG5cdFx0aWYgKF90aGlzLnBhcmFtcy5zdGF0dXMgPT09ICdiZWZvcmVTZW5kJykgcmV0dXJuIGZhbHNlO1xyXG5cclxuXHRcdF90aGlzLmVsZW1lbnQgPSBfdGhpcy5mb3JtLnF1ZXJ5U2VsZWN0b3IoJy4nICsgX3RoaXMuY2xhc3Nlcy5jb250YWluZXIpO1xyXG5cdFx0aWYgKCFfdGhpcy5lbGVtZW50KSBfdGhpcy5lbGVtZW50ID0gX3RoaXMuZHJhdygpO1xyXG5cclxuXHRcdF90aGlzLmJhY2tkcm9wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblx0XHRfdGhpcy5iYWNrZHJvcC5jbGFzc0xpc3QuYWRkKF90aGlzLmNsYXNzZXMuYmFja2Ryb3ApO1xyXG5cclxuXHRcdF90aGlzLnRvZ2dsZSgpO1xyXG5cdH1cclxuXHJcblx0dG9nZ2xlKCkge1xyXG5cdFx0Y29uc3QgX3RoaXMgPSB0aGlzO1xyXG5cclxuXHRcdGlmICghZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuY29udGFpbnMoJ3ZnLW1vZGFsLW9wZW4nKSkge1xyXG5cdFx0XHRyZXR1cm4gX3RoaXMuc2hvdygpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIF90aGlzLmhpZGUoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHNob3coKSB7XHJcblx0XHRjb25zdCBfdGhpcyA9IHRoaXM7XHJcblxyXG5cdFx0ZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCd2Zy1tb2RhbC1vcGVuJyk7XHJcblx0XHRfdGhpcy5lbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG5cclxuXHRcdGlmIChfdGhpcy5wYXJhbXMuY29udGVudF9vdmVyKSB7XHJcblx0XHRcdGRvY3VtZW50LmJvZHkuc3R5bGUucGFkZGluZ1JpZ2h0ID0gKHdpbmRvdy5pbm5lcldpZHRoIC0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoKSArICdweCc7XHJcblx0XHRcdGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiO1xyXG5cdFx0fVxyXG5cclxuXHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG5cdFx0XHRfdGhpcy5iYWNrZHJvcC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuXHJcblx0XHRcdGV2ZW50SGFuZGxlci5vbihfdGhpcy5lbGVtZW50LCBFVkVOVF9LRVlfTU9EQUxfT1BFTiwgX3RoaXMpXHJcblx0XHR9LCBfdGhpcy5wYXJhbXMuc2hvd0RlbGF5KTtcclxuXHJcblx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZChfdGhpcy5lbGVtZW50KTtcclxuXHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kKF90aGlzLmJhY2tkcm9wKTtcclxuXHRcdF90aGlzLnNldFRleHQoX3RoaXMuZWxlbWVudCk7XHJcblxyXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZXZlbnQpID0+IHtcclxuXHRcdFx0aWYgKGV2ZW50LmtleSA9PT0gJ0VzY2FwZScgfHwgZXZlbnQua2V5ID09PSAnRXNjJykge1xyXG5cdFx0XHRcdF90aGlzLmhpZGUoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0X3RoaXMuZWxlbWVudC5vbmNsaWNrID0gZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0aWYgKGUudGFyZ2V0ID09PSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuJyArIF90aGlzLmNsYXNzZXMuY29udGFpbmVyKSkge1xyXG5cdFx0XHRcdF90aGlzLmhpZGUoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBidG5DbG9zZSA9IF90aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtdmctZGlzbWlzcz1cIm1vZGFsXCJdJyk7XHJcblx0XHRpZiAoYnRuQ2xvc2UpIHtcclxuXHRcdFx0YnRuQ2xvc2Uub25jbGljayA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRfdGhpcy5oaWRlKCk7XHJcblxyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0aGlkZSgpIHtcclxuXHRcdGNvbnN0IF90aGlzID0gdGhpcztcclxuXHJcblx0XHRkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3ZnLW1vZGFsLW9wZW4nKTtcclxuXHRcdF90aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcblx0XHRfdGhpcy5iYWNrZHJvcC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxyXG5cclxuXHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRfdGhpcy5lbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnJztcclxuXHRcdFx0X3RoaXMuYmFja2Ryb3AucmVtb3ZlKCk7XHJcblx0XHRcdF90aGlzLmVsZW1lbnQucmVtb3ZlKCk7XHJcblxyXG5cdFx0XHRpZiAoX3RoaXMucGFyYW1zLmNvbnRlbnRfb3Zlcikge1xyXG5cdFx0XHRcdGRvY3VtZW50LmJvZHkuc3R5bGUucGFkZGluZ1JpZ2h0ID0gXCJcIjtcclxuXHRcdFx0XHRkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gXCJcIjtcclxuXHRcdFx0fVxyXG5cdFx0fSwgX3RoaXMucGFyYW1zLmhpZGVEZWxheSk7XHJcblx0fVxyXG5cclxuXHRkcmF3KCkge1xyXG5cdFx0Y29uc3QgX3RoaXMgPSB0aGlzO1xyXG5cclxuXHRcdGxldCBtb2RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cdFx0bW9kYWwuY2xhc3NMaXN0LmFkZChfdGhpcy5jbGFzc2VzLmNvbnRhaW5lcik7XHJcblx0XHRtb2RhbC5pbm5lckhUTUwgPSAnPGRpdiBjbGFzcz1cIm1vZGFsLWNvbnRlbnRcIj4nICtcclxuXHRcdFx0JyAgIDxkaXYgY2xhc3M9XCJjbG9zZVwiPjxhIGhyZWY9XCIjXCIgZGF0YS12Zy1kaXNtaXNzPVwibW9kYWxcIj4nICsgZ2V0U3ZnKCdjcm9zcycpICsgJzwvYT48L2Rpdj4nICtcclxuXHRcdFx0JyAgIDxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5IHZnLWFsZXJ0LWNvbnRlbnRcIj4nICtcclxuXHRcdFx0JyAgICAgICA8ZGl2IGNsYXNzPVwidmctYWxlcnQgdmctYWxlcnQtZGFuZ2VyXCI+JyArXHJcblx0XHRcdCdcdCAgICAgICAgPGRpdiBjbGFzcz1cInN2Zy1hcmVhXCI+JyArIGdldFN2ZygnZXJyb3InKSArICc8L2Rpdj4nICtcclxuXHRcdFx0J1x0ICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGVudC1hcmVhXCI+JyArXHJcblx0XHRcdCdcdFx0ICAgICA8ZGl2IGNsYXNzPVwidGl0bGUtYXJlYVwiIGRhdGEtYWxlcnQtZGFuZ2VyLXRpdGxlPjwvZGl2PicgK1xyXG5cdFx0XHQnXHRcdCAgICAgPGRpdiBjbGFzcz1cInRleHQtYXJlYVwiIGRhdGEtYWxlcnQtZGFuZ2VyLXRleHQ+PC9kaXY+JyArXHJcblx0XHRcdCdcdCAgICAgICAgPC9kaXY+JyArXHJcblx0XHRcdCcgICAgICAgPC9kaXY+JyArXHJcblx0XHRcdCcgICAgICAgPGRpdiBjbGFzcz1cInZnLWFsZXJ0IHZnLWFsZXJ0LXN1Y2Nlc3NcIj4nICtcclxuXHRcdFx0J1x0ICAgICAgICA8ZGl2IGNsYXNzPVwic3ZnLWFyZWFcIj4nICsgZ2V0U3ZnKCdzdWNjZXNzJykgKyAnPC9kaXY+JyArXHJcblx0XHRcdCdcdCAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRlbnQtYXJlYVwiPicgK1xyXG5cdFx0XHQnXHRcdCAgICAgICAgPGRpdiBjbGFzcz1cInRpdGxlLWFyZWFcIiBkYXRhLWFsZXJ0LXN1Y2Nlc3MtdGl0bGU+PC9kaXY+JyArXHJcblx0XHRcdCdcdFx0ICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1hcmVhXCIgZGF0YS1hbGVydC1zdWNjZXNzLXRleHQ+PC9kaXY+JyArXHJcblx0XHRcdCdcdCAgICAgICAgPC9kaXY+JyArXHJcblx0XHRcdCcgICA8L2Rpdj4nICtcclxuXHRcdFx0JzwvZGl2Pic7XHJcblxyXG5cdFx0cmV0dXJuIG1vZGFsO1xyXG5cdH1cclxuXHJcblx0c2V0VGV4dChlbCkge1xyXG5cdFx0Y29uc3QgX3RoaXMgPSB0aGlzO1xyXG5cdFx0bGV0IGRhdGEgPSBfdGhpcy5wYXJhbXMuZGF0YSxcclxuXHRcdFx0X2NsYXNzID0gX3RoaXMucGFyYW1zLnN0YXR1cyA9PT0gJ2Vycm9yJyA/ICdkYW5nZXInIDogX3RoaXMucGFyYW1zLnN0YXR1cztcclxuXHJcblx0XHRpZiAoIWRhdGEgJiYgKCdyZXNwb25zZScgaW4gZGF0YSkgJiYgIWRhdGEucmVzcG9uc2UpIHJldHVybiBmYWxzZTtcclxuXHJcblx0XHRsZXQgcmVzcG9uc2UgPSBub3JtYWxpemVEYXRhKGRhdGEucmVzcG9uc2UpO1xyXG5cclxuXHRcdGlmIChpc09iamVjdChyZXNwb25zZSkpIHtcclxuXHRcdFx0aWYgKCgnZXJyb3JzJyBpbiBkYXRhICYmIHJlc3BvbnNlLmVycm9ycykgfHwgKCdlcnJvcicgaW4gcmVzcG9uc2UgJiYgcmVzcG9uc2UuZXJyb3IpKSBfY2xhc3MgPSAnZGFuZ2VyJztcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgJGFsZXJ0ID0gZWwucXVlcnlTZWxlY3RvcignLnZnLWFsZXJ0LScgKyBfY2xhc3MpO1xyXG5cdFx0aWYgKCRhbGVydCkge1xyXG5cdFx0XHRsZXQgJHRleHQgPSAkYWxlcnQucXVlcnlTZWxlY3RvcignW2RhdGEtYWxlcnQtJysgX2NsYXNzICsnLXRleHRdJyksXHJcblx0XHRcdFx0JHRpdGxlID0gJGFsZXJ0LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWFsZXJ0LScrIF9jbGFzcyArJy10aXRsZV0nKTtcclxuXHJcblx0XHRcdGlmICgkdGV4dCkge1xyXG5cdFx0XHRcdGlmICghcmVzcG9uc2UpIHtcclxuXHRcdFx0XHRcdGlmIChfdGhpcy5wYXJhbXMuc3RhdHVzID09PSAnZXJyb3InKSB7XHJcblx0XHRcdFx0XHRcdCR0aXRsZS5pbm5lckhUTUwgPSAn0J7RiNC40LHQutCwJztcclxuXHRcdFx0XHRcdFx0JHRleHQuaW5uZXJIVE1MID0gZGF0YS50ZXh0O1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRpZiAodHlwZW9mIHJlc3BvbnNlID09PSAnc3RyaW5nJykge1xyXG5cdFx0XHRcdFx0XHQkdGV4dC5pbm5lckhUTUwgPSByZXNwb25zZTtcclxuXHRcdFx0XHRcdH0gZWxzZSBpZiAoKCdtZXNzYWdlJyBpbiByZXNwb25zZSkgJiYgcmVzcG9uc2UubWVzc2FnZSkge1xyXG5cdFx0XHRcdFx0XHRsZXQgZXJyb3JzID0gbm9ybWFsaXplRGF0YShyZXNwb25zZS5lcnJvcnMpIHx8IG51bGw7XHJcblx0XHRcdFx0XHRcdGlmIChBcnJheS5pc0FycmF5KGVycm9ycykgfHwgaXNPYmplY3QoZXJyb3JzKSkge1xyXG5cdFx0XHRcdFx0XHRcdGlmIChpc09iamVjdChlcnJvcnMpKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRmb3IgKGNvbnN0IGVycm9yIGluIGVycm9ycykge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoQXJyYXkuaXNBcnJheShlcnJvcnNbZXJyb3JdKSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yc1tlcnJvcl0uZm9yRWFjaChmdW5jdGlvbiAodHh0KSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQkdGV4dC5pbm5lckhUTUwgKz0gJzxkaXY+JysgdHh0ICsnPC9kaXY+JztcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCR0ZXh0LmlubmVySFRNTCA9ICc8ZGl2PicrIGVycm9yc1tlcnJvcl0gKyc8L2Rpdj4nO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdCR0ZXh0LmlubmVySFRNTCA9IHJlc3BvbnNlLm1lc3NhZ2U7XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdGlmICgkdGl0bGUgJiYgKCd0aXRsZScgaW4gcmVzcG9uc2UpKSAkdGl0bGUuaW5uZXJIVE1MID0gcmVzcG9uc2UudGl0bGU7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQkYWxlcnQuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0ZWwuaW5uZXJIVE1MID0gcmVzcG9uc2VcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZHTW9kYWw7XHJcbiIsImNsYXNzIHNob3dQYXNzIHtcclxuXHRjb25zdHJ1Y3Rvcihmb3JtID0gbnVsbCwgYXJnID0ge30pIHtcclxuXHRcdHRoaXMuZm9ybSA9IGZvcm07XHJcblx0XHR0aGlzLnBhcmFtcyA9IGFyZztcclxuXHJcblx0XHR0aGlzLmV5ZU9wZW4gPSAnPHN2ZyB3aWR0aD1cIjI0cHhcIiBpZD1cInN2Z0V5ZU9wZW5cIiBoZWlnaHQ9XCIyNHB4XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxcbicgK1xyXG5cdFx0XHQnPHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTEyIDguMjVDOS45Mjg5MyA4LjI1IDguMjUgOS45Mjg5MyA4LjI1IDEyQzguMjUgMTQuMDcxMSA5LjkyODkzIDE1Ljc1IDEyIDE1Ljc1QzE0LjA3MTEgMTUuNzUgMTUuNzUgMTQuMDcxMSAxNS43NSAxMkMxNS43NSA5LjkyODkzIDE0LjA3MTEgOC4yNSAxMiA4LjI1Wk05Ljc1IDEyQzkuNzUgMTAuNzU3NCAxMC43NTc0IDkuNzUgMTIgOS43NUMxMy4yNDI2IDkuNzUgMTQuMjUgMTAuNzU3NCAxNC4yNSAxMkMxNC4yNSAxMy4yNDI2IDEzLjI0MjYgMTQuMjUgMTIgMTQuMjVDMTAuNzU3NCAxNC4yNSA5Ljc1IDEzLjI0MjYgOS43NSAxMlpcIiBmaWxsPVwiIzQ5NTA1N1wiLz5cXG4nICtcclxuXHRcdFx0JzxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCIgZD1cIk0xMiAzLjI1QzcuNDg1ODcgMy4yNSA0LjQ0NTI5IDUuOTU0MiAyLjY4MDU3IDguMjQ2ODZMMi42NDg3NCA4LjI4ODJDMi4yNDk2NCA4LjgwNjUzIDEuODgyMDYgOS4yODM5MiAxLjYzMjY5IDkuODQ4NEMxLjM2NTY0IDEwLjQ1MjkgMS4yNSAxMS4xMTE3IDEuMjUgMTJDMS4yNSAxMi44ODgzIDEuMzY1NjQgMTMuNTQ3MSAxLjYzMjY5IDE0LjE1MTZDMS44ODIwNiAxNC43MTYxIDIuMjQ5NjQgMTUuMTkzNSAyLjY0ODc1IDE1LjcxMThMMi42ODA1NyAxNS43NTMxQzQuNDQ1MjkgMTguMDQ1OCA3LjQ4NTg3IDIwLjc1IDEyIDIwLjc1QzE2LjUxNDEgMjAuNzUgMTkuNTU0NyAxOC4wNDU4IDIxLjMxOTQgMTUuNzUzMUwyMS4zNTEyIDE1LjcxMThDMjEuNzUwNCAxNS4xOTM1IDIyLjExNzkgMTQuNzE2MSAyMi4zNjczIDE0LjE1MTZDMjIuNjM0NCAxMy41NDcxIDIyLjc1IDEyLjg4ODMgMjIuNzUgMTJDMjIuNzUgMTEuMTExNyAyMi42MzQ0IDEwLjQ1MjkgMjIuMzY3MyA5Ljg0ODRDMjIuMTE3OSA5LjI4MzkxIDIxLjc1MDQgOC44MDY1MiAyMS4zNTEyIDguMjg4MThMMjEuMzE5NCA4LjI0Njg2QzE5LjU1NDcgNS45NTQyIDE2LjUxNDEgMy4yNSAxMiAzLjI1Wk0zLjg2OTIyIDkuMTYxOEM1LjQ5ODY0IDcuMDQ0OTIgOC4xNTAzNiA0Ljc1IDEyIDQuNzVDMTUuODQ5NiA0Ljc1IDE4LjUwMTQgNy4wNDQ5MiAyMC4xMzA4IDkuMTYxOEMyMC41Njk0IDkuNzMxNTkgMjAuODI2MyAxMC4wNzIxIDIwLjk5NTIgMTAuNDU0NUMyMS4xNTMyIDEwLjgxMiAyMS4yNSAxMS4yNDg5IDIxLjI1IDEyQzIxLjI1IDEyLjc1MTEgMjEuMTUzMiAxMy4xODggMjAuOTk1MiAxMy41NDU1QzIwLjgyNjMgMTMuOTI3OSAyMC41Njk0IDE0LjI2ODQgMjAuMTMwOCAxNC44MzgyQzE4LjUwMTQgMTYuOTU1MSAxNS44NDk2IDE5LjI1IDEyIDE5LjI1QzguMTUwMzYgMTkuMjUgNS40OTg2NCAxNi45NTUxIDMuODY5MjIgMTQuODM4MkMzLjQzMDY0IDE0LjI2ODQgMy4xNzM3NCAxMy45Mjc5IDMuMDA0NzYgMTMuNTQ1NUMyLjg0Njg0IDEzLjE4OCAyLjc1IDEyLjc1MTEgMi43NSAxMkMyLjc1IDExLjI0ODkgMi44NDY4NCAxMC44MTIgMy4wMDQ3NiAxMC40NTQ1QzMuMTczNzQgMTAuMDcyMSAzLjQzMDYzIDkuNzMxNTkgMy44NjkyMiA5LjE2MThaXCIgZmlsbD1cIiM0OTUwNTdcIi8+XFxuJyArXHJcblx0XHRcdCc8L3N2Zz4nO1xyXG5cdFx0dGhpcy5leWVDbG9zZSA9ICc8c3ZnIHdpZHRoPVwiMjRweFwiIGlkPVwic3ZnRXllQ2xvc2VcIiBoZWlnaHQ9XCIyNHB4XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxcbicgK1xyXG5cdFx0XHQnPHBhdGggZD1cIk0yLjY4OTM2IDYuNzA0NTZDMi41MjYxOSA2LjMyMzg0IDIuMDg1MjggNi4xNDc0NyAxLjcwNDU2IDYuMzEwNjRDMS4zMjM4NCA2LjQ3MzgxIDEuMTQ3NDcgNi45MTQ3MiAxLjMxMDY0IDcuMjk1NDRMMi42ODkzNiA2LjcwNDU2Wk0xNS41ODcyIDEzLjMyODdMMTUuMzEyNSAxMi42MzA4TDE1LjU4NzIgMTMuMzI4N1pNOS4wNDE0NSAxMy43Mzc3QzkuMjY3MzYgMTMuMzkwNiA5LjE2OTA0IDEyLjkyNiA4LjgyMTg1IDEyLjcwMDFDOC40NzQ2NiAxMi40NzQyIDguMDEwMDggMTIuNTcyNSA3Ljc4NDE3IDEyLjkxOTdMOS4wNDE0NSAxMy43Mzc3Wk02LjM3MTM2IDE1LjA5MUM2LjE0NTQ1IDE1LjQzODEgNi4yNDM3NyAxNS45MDI3IDYuNTkwOTYgMTYuMTI4NkM2LjkzODE1IDE2LjM1NDUgNy40MDI3MyAxNi4yNTYyIDcuNjI4NjQgMTUuOTA5TDYuMzcxMzYgMTUuMDkxWk0yMi42ODk0IDcuMjk1NDRDMjIuODUyNSA2LjkxNDcyIDIyLjY3NjIgNi40NzM4MSAyMi4yOTU0IDYuMzEwNjRDMjEuOTE0NyA2LjE0NzQ3IDIxLjQ3MzggNi4zMjM4NCAyMS4zMTA2IDYuNzA0NTZMMjIuNjg5NCA3LjI5NTQ0Wk0xOSAxMS4xMjg4TDE4LjQ4NjcgMTAuNTgyVjEwLjU4MkwxOSAxMS4xMjg4Wk0xOS45Njk3IDEzLjE1OTJDMjAuMjYyNiAxMy40NTIxIDIwLjczNzQgMTMuNDUyMSAyMS4wMzAzIDEzLjE1OTJDMjEuMzIzMiAxMi44NjYzIDIxLjMyMzIgMTIuMzkxNCAyMS4wMzAzIDEyLjA5ODVMMTkuOTY5NyAxMy4xNTkyWk0xMS4yNSAxNi41QzExLjI1IDE2LjkxNDIgMTEuNTg1OCAxNy4yNSAxMiAxNy4yNUMxMi40MTQyIDE3LjI1IDEyLjc1IDE2LjkxNDIgMTIuNzUgMTYuNUgxMS4yNVpNMTYuMzcxNCAxNS45MDlDMTYuNTk3MyAxNi4yNTYyIDE3LjA2MTkgMTYuMzU0NSAxNy40MDkgMTYuMTI4NkMxNy43NTYyIDE1LjkwMjcgMTcuODU0NSAxNS40MzgxIDE3LjYyODYgMTUuMDkxTDE2LjM3MTQgMTUuOTA5Wk01LjUzMDMzIDExLjY1OTJDNS44MjMyMiAxMS4zNjYzIDUuODIzMjIgMTAuODkxNCA1LjUzMDMzIDEwLjU5ODVDNS4yMzc0NCAxMC4zMDU2IDQuNzYyNTYgMTAuMzA1NiA0LjQ2OTY3IDEwLjU5ODVMNS41MzAzMyAxMS42NTkyWk0yLjk2OTY3IDEyLjA5ODVDMi42NzY3OCAxMi4zOTE0IDIuNjc2NzggMTIuODY2MyAyLjk2OTY3IDEzLjE1OTJDMy4yNjI1NiAxMy40NTIxIDMuNzM3NDQgMTMuNDUyMSA0LjAzMDMzIDEzLjE1OTJMMi45Njk2NyAxMi4wOTg1Wk0xMiAxMy4yNUM4Ljc3NjExIDEzLjI1IDYuNDYxMzMgMTEuNjQ0NiA0LjkyNDYgOS45ODk2NkM0LjE1NjQ1IDkuMTYyNDMgMy41OTMyNSA4LjMzMjg0IDMuMjIyNTkgNy43MTAxNEMzLjAzNzY5IDcuMzk5NSAyLjkwMTg3IDcuMTQyMzIgMi44MTM0IDYuOTY1MzdDMi43NjkxOSA2Ljg3Njk2IDIuNzM2ODkgNi44MDg3NSAyLjcxNjI3IDYuNzY0MTFDMi43MDU5NyA2Ljc0MTggMi42OTg1OSA2LjcyNTQgMi42OTQxMSA2LjcxNTMzQzIuNjkxODcgNi43MTAzIDIuNjkwMzYgNi43MDY4NCAyLjY4OTU3IDYuNzA1MDNDMi42ODkxNyA2LjcwNDEzIDIuNjg4OTYgNi43MDM2MyAyLjY4ODkyIDYuNzAzNTVDMi42ODg5MSA2LjcwMzUxIDIuNjg4OTMgNi43MDM1NyAyLjY4OTAxIDYuNzAzNzRDMi42ODkwNCA2LjcwMzgyIDIuNjg5MTMgNi43MDQwMyAyLjY4OTE1IDYuNzA0MDdDMi42ODkyNSA2LjcwNDMgMi42ODkzNiA2LjcwNDU2IDIgN0MxLjMxMDY0IDcuMjk1NDQgMS4zMTA3NyA3LjI5NTc1IDEuMzEwOTIgNy4yOTYwOUMxLjMxMDk4IDcuMjk2MjQgMS4zMTExNCA3LjI5NjYgMS4zMTEyNyA3LjI5NjlDMS4zMTE1MiA3LjI5NzQ5IDEuMzExODMgNy4yOTgyIDEuMzEyMTggNy4yOTlDMS4zMTI4NyA3LjMwMDYyIDEuMzEzNzYgNy4zMDI2NiAxLjMxNDgzIDcuMzA1MTJDMS4zMTY5OCA3LjMxMDAzIDEuMzE5ODggNy4zMTY2MiAxLjMyMzUzIDcuMzI0ODNDMS4zMzA4MyA3LjM0MTI1IDEuMzQxMTUgNy4zNjQxNSAxLjM1NDUzIDcuMzkzMTFDMS4zODEyNyA3LjQ1MTAyIDEuNDIwMjYgNy41MzMyIDEuNDcxNzYgNy42MzYxOUMxLjU3NDY5IDcuODQyMDYgMS43Mjc5NCA4LjEzMTc1IDEuOTMzNjYgOC40NzczNkMyLjM0NDI1IDkuMTY3MTYgMi45Njg1NSAxMC4wODc2IDMuODI1NCAxMS4wMTAzQzUuNTM4NjcgMTIuODU1NCA4LjIyMzg5IDE0Ljc1IDEyIDE0Ljc1VjEzLjI1Wk0xNS4zMTI1IDEyLjYzMDhDMTQuMzQyMSAxMy4wMTI4IDEzLjI0MTcgMTMuMjUgMTIgMTMuMjVWMTQuNzVDMTMuNDM4MiAxNC43NSAxNC43MjQ2IDE0LjQ3NDIgMTUuODYxOSAxNC4wMjY2TDE1LjMxMjUgMTIuNjMwOFpNNy43ODQxNyAxMi45MTk3TDYuMzcxMzYgMTUuMDkxTDcuNjI4NjQgMTUuOTA5TDkuMDQxNDUgMTMuNzM3N0w3Ljc4NDE3IDEyLjkxOTdaTTIyIDdDMjEuMzEwNiA2LjcwNDU2IDIxLjMxMDcgNi43MDQ0MSAyMS4zMTA4IDYuNzA0MjdDMjEuMzEwOCA2LjcwNDIzIDIxLjMxMDggNi43MDQxIDIxLjMxMDkgNi43MDQwMkMyMS4zMTA5IDYuNzAzODggMjEuMzExIDYuNzAzNzYgMjEuMzExIDYuNzAzNjhDMjEuMzExMSA2LjcwMzUyIDIxLjMxMTEgNi43MDM0OSAyMS4zMTExIDYuNzAzNkMyMS4zMTEgNi43MDM4IDIxLjMxMDcgNi43MDQ1MiAyMS4zMTAxIDYuNzA1NzZDMjEuMzA5IDYuNzA4MjMgMjEuMzA3IDYuNzEyNzUgMjEuMzA0MSA2LjcxOTI0QzIxLjI5ODMgNi43MzIyMyAyMS4yODg5IDYuNzUzMDkgMjEuMjc1OCA2Ljc4MTI1QzIxLjI0OTUgNi44Mzc1NyAyMS4yMDg2IDYuOTIyOTUgMjEuMTUyNiA3LjAzMjY3QzIxLjA0MDYgNy4yNTIyNyAyMC44NjkgNy41NjgzMSAyMC42MzU0IDcuOTQzMkMyMC4xNjY5IDguNjk1MTYgMTkuNDU2MyA5LjY3MTk3IDE4LjQ4NjcgMTAuNTgyTDE5LjUxMzMgMTEuNjc1N0MyMC42MDIzIDEwLjY1MzUgMjEuMzkxNyA5LjU2NTg3IDIxLjkwODUgOC43MzY0NkMyMi4xNjc2IDguMzIwNjggMjIuMzYgNy45NjY4IDIyLjQ4ODkgNy43MTQxNUMyMi41NTMzIDcuNTg3NzUgMjIuNjAyIDcuNDg2NDMgMjIuNjM1MyA3LjQxNTA3QzIyLjY1MTkgNy4zNzkzOSAyMi42NjQ3IDcuMzUxMTggMjIuNjczNyA3LjMzMTA0QzIyLjY3ODIgNy4zMjA5NyAyMi42ODE4IDcuMzEyOTIgMjIuNjg0NCA3LjMwNjk2QzIyLjY4NTcgNy4zMDM5OCAyMi42ODY3IDcuMzAxNTMgMjIuNjg3NiA3LjI5OTZDMjIuNjg4IDcuMjk4NjQgMjIuNjg4MyA3LjI5NzgxIDIyLjY4ODYgNy4yOTcxMkMyMi42ODg4IDcuMjk2NzcgMjIuNjg4OSA3LjI5NjQ2IDIyLjY4OSA3LjI5NjE4QzIyLjY4OTEgNy4yOTYwNCAyMi42ODkyIDcuMjk1ODUgMjIuNjg5MiA3LjI5NTc4QzIyLjY4OTMgNy4yOTU2MSAyMi42ODk0IDcuMjk1NDQgMjIgN1pNMTguNDg2NyAxMC41ODJDMTcuNjI3NyAxMS4zODgyIDE2LjU3MzkgMTIuMTM0MyAxNS4zMTI1IDEyLjYzMDhMMTUuODYxOSAxNC4wMjY2QzE3LjMzNTUgMTMuNDQ2NiAxOC41NDY2IDEyLjU4MyAxOS41MTMzIDExLjY3NTdMMTguNDg2NyAxMC41ODJaTTE4LjQ2OTcgMTEuNjU5MkwxOS45Njk3IDEzLjE1OTJMMjEuMDMwMyAxMi4wOTg1TDE5LjUzMDMgMTAuNTk4NUwxOC40Njk3IDExLjY1OTJaTTExLjI1IDE0VjE2LjVIMTIuNzVWMTRIMTEuMjVaTTE0Ljk1ODYgMTMuNzM3N0wxNi4zNzE0IDE1LjkwOUwxNy42Mjg2IDE1LjA5MUwxNi4yMTU4IDEyLjkxOTdMMTQuOTU4NiAxMy43Mzc3Wk00LjQ2OTY3IDEwLjU5ODVMMi45Njk2NyAxMi4wOTg1TDQuMDMwMzMgMTMuMTU5Mkw1LjUzMDMzIDExLjY1OTJMNC40Njk2NyAxMC41OTg1WlwiIGZpbGw9XCIjNDk1MDU3XCIvPlxcbicgK1xyXG5cdFx0XHQnPC9zdmc+JztcclxuXHR9XHJcblxyXG5cdGluaXQoKSB7XHJcblx0XHRjb25zdCBfdGhpcyA9IHRoaXM7XHJcblxyXG5cdFx0bGV0IGlucHV0UGFzc3dvcmRzID0gX3RoaXMuZm9ybS5xdWVyeVNlbGVjdG9yQWxsKCdbdHlwZT1cInBhc3N3b3JkXCJdJyk7XHJcblx0XHRpZiAoaW5wdXRQYXNzd29yZHMubGVuZ3RoKSB7XHJcblx0XHRcdGlucHV0UGFzc3dvcmRzLmZvckVhY2goZnVuY3Rpb24gKGVsbSkge1xyXG5cdFx0XHRcdGxldCBwYXJlbnQgPSBlbG0ucGFyZW50Tm9kZTtcclxuXHRcdFx0XHRpZiAocGFyZW50KSB7XHJcblx0XHRcdFx0XHRwYXJlbnQuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xyXG5cclxuXHRcdFx0XHRcdGxldCBzd2l0Y2hlciA9IHBhcmVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS12Zy10b2dnbGU9XCJzaG93LXBhc3NcIl0nKTtcclxuXHRcdFx0XHRcdGlmICghc3dpdGNoZXIpIHtcclxuXHRcdFx0XHRcdFx0c3dpdGNoZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcblx0XHRcdFx0XHRcdHN3aXRjaGVyLnNldEF0dHJpYnV0ZSgnZGF0YS12Zy10b2dnbGUnLCAnc2hvdy1wYXNzJyk7XHJcblx0XHRcdFx0XHRcdHN3aXRjaGVyLnNldEF0dHJpYnV0ZSgndGl0bGUnLCAn0J/QvtC60LDQt9Cw0YLRjCcpO1xyXG5cdFx0XHRcdFx0XHRzd2l0Y2hlci5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKTtcclxuXHRcdFx0XHRcdFx0c3dpdGNoZXIuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xyXG5cdFx0XHRcdFx0XHRzd2l0Y2hlci5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XHJcblx0XHRcdFx0XHRcdHN3aXRjaGVyLnN0eWxlLndpZHRoID0gJzI0cHgnO1xyXG5cdFx0XHRcdFx0XHRzd2l0Y2hlci5zdHlsZS5oZWlnaHQgPSAnMjRweCc7XHJcblx0XHRcdFx0XHRcdHN3aXRjaGVyLnN0eWxlLnRvcCA9ICc1MCUnO1xyXG5cdFx0XHRcdFx0XHRzd2l0Y2hlci5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWSgtNTAlKSc7XHJcblx0XHRcdFx0XHRcdHN3aXRjaGVyLnN0eWxlLnJpZ2h0ID0gJzEycHgnO1xyXG5cdFx0XHRcdFx0XHRzd2l0Y2hlci5pbm5lckhUTUwgPSBfdGhpcy5leWVPcGVuO1xyXG5cclxuXHRcdFx0XHRcdFx0cGFyZW50LmFwcGVuZChzd2l0Y2hlcilcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRfdGhpcy50b2dnbGUoc3dpdGNoZXIsIGVsbSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHRvZ2dsZShzd2l0Y2hlciwgZWxlbWVudCkge1xyXG5cdFx0Y29uc3QgX3RoaXMgPSB0aGlzO1xyXG5cclxuXHRcdHN3aXRjaGVyLm9uY2xpY2sgPSAoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRsZXQgX3NlbGYgPSB0aGlzLFxyXG5cdFx0XHRcdGljb25DbG9zZSA9IHN3aXRjaGVyLmRhdGFzZXQuaWNvbkNsb3NlLFxyXG5cdFx0XHRcdGljb25PcGVuID0gc3dpdGNoZXIuZGF0YXNldC5pY29uT3BlbjtcclxuXHJcblx0XHRcdGlmIChzd2l0Y2hlci5nZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnKSA9PT0gJ3RydWUnKSB7XHJcblx0XHRcdFx0aWYgKGljb25PcGVuKSB7XHJcblx0XHRcdFx0XHRsZXQgaWNvbiA9IHN3aXRjaGVyLnF1ZXJ5U2VsZWN0b3IoJ2knKTtcclxuXHRcdFx0XHRcdGlmIChpY29uKSB7XHJcblx0XHRcdFx0XHRcdGlmIChpY29uLmNsYXNzTGlzdC5jb250YWlucyhpY29uQ2xvc2UpKSB7XHJcblx0XHRcdFx0XHRcdFx0aWNvbi5jbGFzc0xpc3QucmVtb3ZlKGljb25DbG9zZSk7XHJcblx0XHRcdFx0XHRcdFx0aWNvbi5jbGFzc0xpc3QuYWRkKGljb25PcGVuKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRzd2l0Y2hlci5pbm5lckhUTUwgPSBfdGhpcy5leWVPcGVuXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsZW1lbnQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3Bhc3N3b3JkJyk7XHJcblx0XHRcdFx0X3NlbGYuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJylcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRpZiAoaWNvbkNsb3NlKSB7XHJcblx0XHRcdFx0XHRsZXQgaWNvbiA9IHN3aXRjaGVyLnF1ZXJ5U2VsZWN0b3IoJ2knKTtcclxuXHRcdFx0XHRcdGlmIChpY29uKSB7XHJcblx0XHRcdFx0XHRcdGlmIChpY29uLmNsYXNzTGlzdC5jb250YWlucyhpY29uT3BlbikpIHtcclxuXHRcdFx0XHRcdFx0XHRpY29uLmNsYXNzTGlzdC5yZW1vdmUoaWNvbk9wZW4pO1xyXG5cdFx0XHRcdFx0XHRcdGljb24uY2xhc3NMaXN0LmFkZChpY29uQ2xvc2UpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHN3aXRjaGVyLmlubmVySFRNTCA9IF90aGlzLmV5ZUNsb3NlXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRlbGVtZW50LnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0Jyk7XHJcblx0XHRcdFx0X3NlbGYuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ3RydWUnKVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHNob3dQYXNzO1xyXG4iLCIvKipcclxuICog0JPQu9GD0LHQvtC60L7QtSDQvtCx0YrQtdC00LjQvdC10L3QuNC1INC+0LHRitC10LrRgtC+0LJcclxuICogQHBhcmFtIG9iamVjdHNcclxuICogQHJldHVybnMgeyp9XHJcbiAqL1xyXG5jb25zdCBtZXJnZURlZXBPYmplY3QgPSBmdW5jdGlvbiAoLi4ub2JqZWN0cykge1xyXG5cdGNvbnN0IGlzT2JqZWN0ID0gb2JqID0+IG9iaiAmJiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JztcclxuXHJcblx0cmV0dXJuIG9iamVjdHMucmVkdWNlKChwcmV2LCBvYmopID0+IHtcclxuXHRcdE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChrZXkgPT4ge1xyXG5cdFx0XHRjb25zdCBwVmFsID0gcHJldltrZXldO1xyXG5cdFx0XHRjb25zdCBvVmFsID0gb2JqW2tleV07XHJcblxyXG5cdFx0XHRpZiAoQXJyYXkuaXNBcnJheShwVmFsKSAmJiBBcnJheS5pc0FycmF5KG9WYWwpKSB7XHJcblx0XHRcdFx0cHJldltrZXldID0gcFZhbC5jb25jYXQoLi4ub1ZhbCk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSBpZiAoaXNPYmplY3QocFZhbCkgJiYgaXNPYmplY3Qob1ZhbCkpIHtcclxuXHRcdFx0XHRwcmV2W2tleV0gPSBtZXJnZURlZXBPYmplY3QocFZhbCwgb1ZhbCk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0cHJldltrZXldID0gb1ZhbDtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIHByZXY7XHJcblx0fSwge30pO1xyXG59XHJcblxyXG4vKipcclxuICogQ29sbGVjdCBEYXRhXHJcbiAqIEBwYXJhbSBkYXRhXHJcbiAqIEBwYXJhbSBmaWVsZHNcclxuICovXHJcbmNvbnN0IGNvbGxlY3REYXRhID0gZnVuY3Rpb24oZGF0YSwgZmllbGRzKSB7XHJcblx0Zm9yIChsZXQgbmFtZSBpbiBmaWVsZHMpIHtcclxuXHRcdGlmICh0eXBlb2YgZmllbGRzW25hbWVdID09PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRmb3IgKGxldCBrZXkgaW4gZmllbGRzW25hbWVdKSB7XHJcblx0XHRcdFx0bGV0IGFyciA9IE9iamVjdC5rZXlzKGZpZWxkc1tuYW1lXVtrZXldKS5tYXAoZnVuY3Rpb24gKGkpIHtcclxuXHRcdFx0XHRcdHJldHVybiBmaWVsZHNbbmFtZV1ba2V5XVtpXTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRkYXRhLmFwcGVuZChuYW1lLCBhcnIpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRkYXRhLmFwcGVuZChuYW1lLCBmaWVsZHNbbmFtZV0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIGRhdGE7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBSkFYIFJFUVVFU1RcclxuICogQHR5cGUge3twb3N0OiBhamF4LnBvc3QsIGdldDogYWpheC5nZXQsIHg6ICgoZnVuY3Rpb24oKTogKFhNTEh0dHBSZXF1ZXN0KSl8KiksIHNlbmQ6IGFqYXguc2VuZH19XHJcbiAqL1xyXG5jb25zdCBhamF4ID0ge1xyXG5cdHg6IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgIT09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdHJldHVybiBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuXHRcdH1cclxuXHRcdGxldCB2ZXJzaW9ucyA9IFtcclxuXHRcdFx0XCJNU1hNTDIuWG1sSHR0cC42LjBcIixcclxuXHRcdFx0XCJNU1hNTDIuWG1sSHR0cC41LjBcIixcclxuXHRcdFx0XCJNU1hNTDIuWG1sSHR0cC40LjBcIixcclxuXHRcdFx0XCJNU1hNTDIuWG1sSHR0cC4zLjBcIixcclxuXHRcdFx0XCJNU1hNTDIuWG1sSHR0cC4yLjBcIixcclxuXHRcdFx0XCJNaWNyb3NvZnQuWG1sSHR0cFwiXHJcblx0XHRdO1xyXG5cclxuXHRcdGxldCB4aHI7XHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHZlcnNpb25zLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0eGhyID0gbmV3IEFjdGl2ZVhPYmplY3QodmVyc2lvbnNbaV0pO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9IGNhdGNoIChlKSB7fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB4aHI7XHJcblx0fSxcclxuXHJcblx0c2VuZDogZnVuY3Rpb24gKHVybCwgY2FsbGJhY2ssIG1ldGhvZCwgZGF0YSwgYXN5bmMpIHtcclxuXHRcdGlmIChhc3luYyA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdGFzeW5jID0gdHJ1ZTtcclxuXHRcdH1cclxuXHRcdGxldCB4ID0gYWpheC54KCk7XHJcblx0XHR4Lm9wZW4obWV0aG9kLCB1cmwsIGFzeW5jKTtcclxuXHRcdHguc2V0UmVxdWVzdEhlYWRlcihcIlgtUmVxdWVzdGVkLVdpdGhcIiwgXCJYTUxIdHRwUmVxdWVzdFwiKTtcclxuXHRcdHgub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAoeC5yZWFkeVN0YXRlID09PSA0KSB7XHJcblx0XHRcdFx0c3dpdGNoICh4LnN0YXR1cykge1xyXG5cdFx0XHRcdFx0Y2FzZSAyMDA6XHJcblx0XHRcdFx0XHRcdGNhbGxiYWNrKCdzdWNjZXNzJywge3RleHQ6IHguc3RhdHVzVGV4dCwgcmVzcG9uc2U6IHgucmVzcG9uc2VUZXh0fSlcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0XHRjYWxsYmFjaygnZXJyb3InLCB7dGV4dDogeC5zdGF0dXNUZXh0LCByZXNwb25zZTogeC5yZXNwb25zZVRleHQsIGNvZGU6IHguc3RhdHVzfSlcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHRcdHguc2VuZChkYXRhKTtcclxuXHRcdHgub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0Y29uc29sZS5sb2coYNCf0YDQvtC40LfQvtGI0LvQsCDQvtGI0LjQsdC60LAg0LLQviDQstGA0LXQvNGPINC+0YLQv9GA0LDQstC60Lg6ICR7eC5zdGF0dXN9YCk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0Z2V0OiBmdW5jdGlvbiAodXJsLCBkYXRhLCBjYWxsYmFjaywgYXN5bmMpIHtcclxuXHRcdGxldCBxdWVyeSA9IFtdO1xyXG5cdFx0Zm9yIChsZXQga2V5IG9mIGRhdGEpIHtcclxuXHRcdFx0cXVlcnkucHVzaChlbmNvZGVVUklDb21wb25lbnQoa2V5WzBdKSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudChrZXlbMV0pKTtcclxuXHRcdH1cclxuXHRcdGFqYXguc2VuZCh1cmwgKyAocXVlcnkubGVuZ3RoID8gJz8nICsgcXVlcnkuam9pbignJicpIDogJycpLCBjYWxsYmFjaywgJ0dFVCcsIG51bGwsIGFzeW5jKVxyXG5cdH0sXHJcblxyXG5cdHBvc3Q6IGZ1bmN0aW9uICh1cmwsIGRhdGEsIGNhbGxiYWNrLCBhc3luYykge1xyXG5cdFx0YWpheC5zZW5kKHVybCwgY2FsbGJhY2ssICdQT1NUJywgZGF0YSwgYXN5bmMpXHJcblx0fVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEVWRU5UU1xyXG4gKiBAdHlwZSB7e29uOiBldmVudEhhbmRsZXIub259fVxyXG4gKi9cclxuY29uc3QgZXZlbnRIYW5kbGVyID0ge1xyXG5cdG9uOiBmdW5jdGlvbiAoZWxlbWVudCwgZXZlbnQsIGRldGFpbCA9IG51bGwpIHtcclxuXHRcdGNvbnN0IGV2ZW50U3VjY2VzcyA9IG5ldyBDdXN0b21FdmVudChldmVudCwge1xyXG5cdFx0XHRidWJibGVzOiB0cnVlLFxyXG5cdFx0XHRkZXRhaWw6IGRldGFpbFxyXG5cdFx0fSk7XHJcblxyXG5cdFx0ZWxlbWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50U3VjY2Vzcyk7XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICpcclxuICovXHJcbmNvbnN0IGlzT2JqZWN0ID0gb2JqID0+IG9iaiAmJiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JztcclxuXHJcbi8qKlxyXG4gKlxyXG4gKi9cclxuZnVuY3Rpb24gbm9ybWFsaXplRGF0YSh2YWx1ZSkge1xyXG5cdGlmICh2YWx1ZSA9PT0gJ3RydWUnKSB7XHJcblx0XHRyZXR1cm4gdHJ1ZVxyXG5cdH1cclxuXHJcblx0aWYgKHZhbHVlID09PSAnZmFsc2UnKSB7XHJcblx0XHRyZXR1cm4gZmFsc2VcclxuXHR9XHJcblxyXG5cdGlmICh2YWx1ZSA9PT0gTnVtYmVyKHZhbHVlKS50b1N0cmluZygpKSB7XHJcblx0XHRyZXR1cm4gTnVtYmVyKHZhbHVlKVxyXG5cdH1cclxuXHJcblx0aWYgKHZhbHVlID09PSAnJyB8fCB2YWx1ZSA9PT0gJ251bGwnKSB7XHJcblx0XHRyZXR1cm4gbnVsbFxyXG5cdH1cclxuXHJcblx0aWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpIHtcclxuXHRcdHJldHVybiB2YWx1ZVxyXG5cdH1cclxuXHJcblx0dHJ5IHtcclxuXHRcdHJldHVybiBKU09OLnBhcnNlKGRlY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkpXHJcblx0fSBjYXRjaCB7XHJcblx0XHRyZXR1cm4gdmFsdWVcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCB7aXNPYmplY3QsIG1lcmdlRGVlcE9iamVjdCwgY29sbGVjdERhdGEsIGFqYXgsIGV2ZW50SGFuZGxlciwgbm9ybWFsaXplRGF0YX1cclxuIiwiZnVuY3Rpb24gZ2V0U3ZnKG5hbWUpIHtcclxuXHRjb25zdCBzdmcgPSAge1xyXG5cdFx0ZXJyb3I6ICc8c3ZnIHZpZXdib3g9XCIwIDAgNTAwIDUwMFwiIGNsYXNzPVwiYW1fRXJyb3JfSWNvblwiPjxwYXRoIGNsYXNzPVwiYW1fU1ZHX2NpcmNsZVwiIGQ9XCJtNDQ0LjM0NjkzLDExNC4wNzAwN2EyMzYuOTUyNzYsMjM2Ljk1Mjc2IDAgMCAxIDQ0LjE1NTMsMTM3LjczNzQ3YzAsMTI5Ljk3MDA1IC0xMDYuOTQ3NzIsMjM2Ljk2NDQzIC0yMzYuOTE3NzcsMjM2Ljk2NDQzcy0yMzYuOTE3NzcsLTEwNi45NDc3MiAtMjM2LjkxNzc3LC0yMzYuOTE3NzdzMTA2Ljk0NzcyLC0yMzYuOTY0NDMgMjM2LjkxNzc3LC0yMzYuOTY0NDNhMjM2Ljk5OTQxLDIzNi45OTk0MSAwIDAgMSAxNjguNzI1NDgsNzAuNTk0ODNcIj48L3BhdGg+PGxpbmUgY2xhc3M9XCJhbV9TVkdfZXJyb3IxXCIgeTI9XCIzOTBcIiB4Mj1cIjM5MFwiIHkxPVwiMTEwXCIgeDE9XCIxMTBcIj48L2xpbmU+PGxpbmUgY2xhc3M9XCJhbV9TVkdfZXJyb3IyXCIgeTI9XCIzOTBcIiB4Mj1cIjExMFwiIHkxPVwiMTEwXCIgeDE9XCIzOTBcIj48L2xpbmU+PC9zdmc+JyxcclxuXHRcdHN1Y2Nlc3M6ICc8c3ZnIHZpZXdib3g9XCIwIDAgNTAwIDUwMFwiIGNsYXNzPVwiYW1fU3VjY2Vzc19JY29uXCI+PHBhdGggY2xhc3M9XCJhbV9TVkdfY2lyY2xlXCIgZD1cIm00NDMuMDEzNiwxMTQuMDcwMDdhMjM2Ljk1Mjc2LDIzNi45NTI3NiAwIDAgMSA0NC4xNTUzLDEzNy43Mzc0N2MwLDEyOS45NzAwNSAtMTA2Ljk0NzcyLDIzNi45NjQ0MyAtMjM2LjkxNzc3LDIzNi45NjQ0M3MtMjM2LjkxNzc3LC0xMDYuOTQ3NzIgLTIzNi45MTc3NywtMjM2LjkxNzc3czEwNi45NDc3MiwtMjM2Ljk2NDQzIDIzNi45MTc3NywtMjM2Ljk2NDQzYTIzNi45OTk0MSwyMzYuOTk5NDEgMCAwIDEgMTY4LjcyNTQ4LDcwLjU5NDgzXCI+PC9wYXRoPjxwb2x5bGluZSBjbGFzcz1cImFtX1NWR19jaGVja1wiIHBvaW50cz1cIjEwNC40ODkyMzQ5MjQzMTY0LDMwOS4yMDAxNjQ3OTQ5MjE5IDE5NS41NzQwNjYxNjIxMDkzOCw0MDIuOTYwMDUyNDkwMjM0NCA0MTguOTI5MjI5NzM2MzI4MSw4NS4wMzcxODU2Njg5NDUzMSBcIj48L3BvbHlsaW5lPjwvc3ZnPicsXHJcblx0XHRjcm9zczogJzxzdmcgdmVyc2lvbj1cIjEuMVwiIGlkPVwiQ2FwYV8xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHg9XCIwcHhcIiB5PVwiMHB4XCIgdmlld0JveD1cIjAgMCAyMjQuNTEyIDIyNC41MTJcIiBzdHlsZT1cImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjI0LjUxMiAyMjQuNTEyO1wiIHhtbDpzcGFjZT1cInByZXNlcnZlXCI+PGc+PHBvbHlnb24gc3R5bGU9XCJmaWxsOiMwMTAwMDI7XCIgcG9pbnRzPVwiMjI0LjUwNyw2Ljk5NyAyMTcuNTIxLDAgMTEyLjI1NiwxMDUuMjU4IDYuOTk4LDAgMC4wMDUsNi45OTcgMTA1LjI2MywxMTIuMjU0IDAuMDA1LDIxNy41MTIgNi45OTgsMjI0LjUxMiAxMTIuMjU2LDExOS4yNCAyMTcuNTIxLDIyNC41MTIgMjI0LjUwNywyMTcuNTEyIDExOS4yNDksMTEyLjI1NCBcIi8+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjwvc3ZnPidcclxuXHR9O1xyXG5cclxuXHRyZXR1cm4gc3ZnW25hbWVdID8/IHt9O1xyXG59XHJcblxyXG5leHBvcnQge2dldFN2Z31cclxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuL2FwcC9hcHAuc2Nzc1wiO1xyXG5pbXBvcnQge1ZHRm9ybVNlbmRlcn0gZnJvbSBcIi4vYXBwL2FwcFwiO1xyXG5cclxuZXhwb3J0IHtWR0Zvcm1TZW5kZXJ9O1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=