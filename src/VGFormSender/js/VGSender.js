import {ajax, collectData, eventHandler, setParams} from "../../util/functions";

const defaultParams = {
	'action': location.href,
	'method': 'post',
	'fields': [],
	'jsonParse': true,
	'redirect': null,
	'validate': false,
	'alert': true,
	'alertParams': {
		type: 'modal'
	}
}

class VGSender {
	constructor(form, arg = {}) {
		this.form = form;
		this.settings = arg;

		if (!form) {
			console.error('Первый параметр не должен быть пустым');
			return false;
		} else {
			this.isInit = false;

			this.form = form;
			this.settings = setParams(form, defaultParams, arg);
			this.classes = {
				general: 'vg-form-sender'
			}

			console.log(this.settings)

			if (this.settings.fields && typeof this.settings.fields == 'function') {
				this.settings.fields = this.settings.fields();
			}

			this.init();
		}
	}

	init() {
		const _this = this;

		// Add general class
		_this.form.classList.add(_this.classes.general);

		if (_this.settings.validate) {
			_this.form.setAttribute('novalidate', '');
			_this.form.classList.add('needs-validation');
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
			if (typeof callback.beforeSend === 'function') callback.beforeSend(event, _this.form);
		}

		if (method === 'post') {
			ajax.post(url, data, function(data) {
				_this.form.classList.remove('was-validated');

				if (callback && 'success' in callback) {
					if (typeof callback.success === 'function') callback.success(event, _this.form, data);
				}

				redirect();
			});
		}

		if (method === 'get') {
			ajax.get(url, data, function(data) {
				_this.form.classList.remove('was-validated');

				if (callback && 'success' in callback) {
					if (typeof callback.success === 'function') callback.success(event, _this.form, data);
				}

				eventHandler.on(_this.form, 'success');

				redirect();
			});
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
