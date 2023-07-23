import {ajax, collectData, mergeDeepObject} from "../../util/functions";

class VGSender {
	constructor(form, arg = {}) {
		this.form = form;
		this.settings = arg;

		if (!form) {
			console.error('Первый параметр не должен быть пустым');
			return false;
		} else {
			let params = {
				'action': form.getAttribute('action') || location.href,
				'method': form.getAttribute('method') || 'get',
				'fields': null,
				'jsonParse': form.getAttribute('data-json-parse') !== 'false',
				'redirect': form.getAttribute('data-redirect') || false,
				'validate': form.getAttribute('data-validate') || false, // from bootstrap < 5.3.0
				'alert': form.getAttribute('data-alert') !== 'false',
				'alertParams': {
					type: form.getAttribute('data-alert-type') || 'modal' // there is also a "block" view
				}
			}

			this.isInit = false;

			this.form = form;
			this.settings = mergeDeepObject(params, arg);
			this.classes = {
				general: 'vg-form-sender',
				selector: 'vg-form-sender__selector'
			}

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

		// wrapping the form elements
		let $inputs = _this.form.querySelectorAll('input, textarea');
		if ($inputs.length) {
			for (const $input of $inputs) {
				$input.parentElement.classList.add(_this.classes.selector)
			}
		}

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
			let data = new FormData(this);

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

			return _this.request(callback);
		};
	}

	request(callback) {
		if (!this.isInit) return false;
		const _this = this;

		let method = _this.settings.method.toLowerCase(),
			url = _this.settings.action,
			data = _this.data;

		if (callback && 'beforeSend' in callback) {
			if (typeof callback.beforeSend === 'function') callback.beforeSend(_this.form);
		}

		if (method === 'post') {
			ajax.post(url, data, function(data) {
				_this.form.classList.remove('was-validated');

				if (callback && 'success' in callback) {
					if (typeof callback.success === 'function') callback.success(_this.form, data);
				}
			});
		}

		if (method === 'get') {
			ajax.get(url, data, function(data) {
				_this.form.classList.remove('was-validated');

				if (callback && 'success' in callback) {
					if (typeof callback.success === 'function') callback.success(_this.form, data);
				}
			});
		}

		return false;
	}
}

export default VGSender;
