import {ajax, eventHandler, collectData, mergeDeepObject, setModal} from "../../util/functions";
import VGFormPlugins from "./VGFormPlugins";

const EVENT_KEY_SUCCESS = 'vg.fs.success';
const EVENT_KEY_ERROR   = 'vg.fs.error';
const EVENT_KEY_BEFORE  = 'vg.fs.before';

const setParams = function (form, params, arg) {
	let mParams = mergeDeepObject(params, arg);
	let data = [].filter.call(form.attributes, function(at) { return /^data-/.test(at.name); });

	for (let val of data) {
		if (val.name === 'data-alert-type' && val.value) mParams.alert.params.type = val.value;
		if (val.name === 'data-alert') mParams.alert = val.value !== 'false';
		if (val.name === 'data-validate') mParams.validate = val.value !== 'false';
		if (val.name === 'data-json-parse') mParams.jsonParse = val.value !== 'false';
		if (val.name === 'data-redirect' && val.value) mParams.redirect = val.value;
		if (val.name === 'data-plugins' && val.value) mParams.plugins = dataPlugins(JSON.parse(val.value));
	}

	function dataPlugins(value) {
		let p = {}

		for (const plugin of params.plugins) {
			let namePlugin = Object.keys(plugin)[0],
				nameModule = Object.keys(value)[0];

			if (namePlugin === nameModule) {
				p = mergeDeepObject(plugin, value);
			}
		}

		return p;
	}

	mParams.action = form.getAttribute('action') || mParams.action;
	mParams.method = form.getAttribute('method') || mParams.method;

	return mParams
}

class VGSender {
	constructor(form, arg = {}) {
		this.extElement = {};
		this.settings = {};
		this.form = null;

		const defaultParams = {
			'action': location.href,
			'method': 'post',
			'fields': [],
			'jsonParse': true,
			'redirect': null,
			'validate': false,
			'alert': {
				enabled: true,
				params: {
					type: 'modal'
				},
			},
			'plugins': [
				{
					'showPass': {
						enabled: true,
						params: {}
					}
				}
			]
		}

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
				}

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

		let modalParent = _this.form.closest('.modal');
		if (modalParent) _this.extElement.modal = setModal(modalParent);

		let btnSubmit = _this.form.querySelector('[type="submit"]');
		if (!btnSubmit) btnSubmit = document.querySelector('[form="' + _this.form.id + '"]');
		_this.extElement.button = btnSubmit;

		if ('plugins' in _this.settings) {
			new VGFormPlugins(_this).init();
		}

		_this.isInit = true;
	}

	submit(callback) {
		if (!this.isInit) return false;
		const _this = this;

		_this.form.onsubmit = function (event) {
			let data = new FormData(_this.form);

			if (typeof _this.settings.fields === 'object') {
				_this.data = collectData(data, _this.settings.fields);
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

		eventHandler.on(_this.form, EVENT_KEY_BEFORE);

		if (method === 'post') {
			ajax.post(url, data, function(status, data) {
				answer(status, data);
			});
		}

		if (method === 'get') {
			ajax.get(url, data, function(status, data) {
				answer(status, data);
			});
		}

		function answer(status, data) {
			_this.form.classList.remove('was-validated');

			if (typeof status === 'string' && status === 'error') {
				if (callback && 'error' in callback) {
					if (typeof callback.error === 'function') callback.error(event, _this, data);
				}

				eventHandler.on(_this.form, EVENT_KEY_ERROR);
			} else {
				if (callback && 'success' in callback) {
					if (typeof callback.success === 'function') callback.success(event, _this, data);
				}

				eventHandler.on(_this.form, EVENT_KEY_SUCCESS);
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

export default VGSender;
