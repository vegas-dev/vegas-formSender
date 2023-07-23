import VGSender from "./VGSender";
import {mergeDeepObject, toggleSlide} from "../../util/functions";

class VGFormSender extends VGSender {
	constructor(form, arg ={}) {
		super(form, arg);

		this.isAlert = this.settings.alert;

		let classes = {
			alert: {
				block: 'vg-form-sender--alert-block',
				modal: 'vg-form-sender--alert-modal',
			}
		}

		this.classes = mergeDeepObject(this.classes, classes);
	}

	submit(callback) {
		if (!this.isAlert) {
			return super.submit(callback);
		} else {
			const _this = this;

			return super.submit({
				beforeSend: function (form) {
					_this.btnSubmit(form, 'before');
					_this.alert(form, {}, 'before');

					if (callback && 'beforeSend' in callback && typeof callback.beforeSend === 'function') {
						callback.beforeSend(form);
					}
				},
				success: function (form, data) {
					if (_this.settings.jsonParse && typeof data === 'string') {
						data = JSON.parse(data);
					}

					_this.btnSubmit(form, 'success');
					_this.alert(form, data, 'success');

					if (callback && 'success' in callback && typeof callback.success === 'function') {
						callback.success(form, data);
					}
				}
			});
		}
	}

	alert(form, data, condition) {
		if (!this.isAlert) return false;
		const _this = this;

		if (_this.settings.alertParams.type === 'block') {
			let alertBlock = form.querySelector('.' + _this.classes.alert.block);
			if (!alertBlock) {
				alertBlock = document.querySelector('[data-form="' + form.id + '"]');

				if (!alertBlock) {
					let alertBlock = document.createElement('div');
					alertBlock.classList.add(_this.classes.alert.block);
					alertBlock.innerHTML = '<div class="alert alert-danger"></div><div class="alert alert-success"></div>'
					form.prepend(alertBlock);
				}
			}

			_this.alertBlock(alertBlock, data, condition);
		}
	}

	btnSubmit(form, condition) {
		if (!this.isAlert) return false;

		let btnSubmit = form.querySelector('[type="submit"]');
		if (!btnSubmit) {
			btnSubmit = document.querySelector('[form="' + form.id + '"]');
		}

		if (btnSubmit) {
			let btnText = {
				send: btnSubmit.getAttribute('data-text-send') || 'Отправляем...',
				text: btnSubmit.getAttribute('data-text') || 'Отправить'
			}

			if (condition === 'before') {
				btnSubmit.innerHTML = btnText.send;
			} else if (condition === 'success') {
				btnSubmit.innerHTML = btnText.text;
			}
		}
	}

	alertBlock(el, data, condition) {
		if (el) {
			if (condition === 'before') {
				if (el.classList.contains('active')) {
					toggleSlide(el);

					el.classList.remove('active');
				}
			} else if (condition === 'success') {
				el.classList.add('active')

				let elShow = el.querySelectorAll('.show');
				if(elShow.length) {
					for (const element of elShow) {
						element.classList.remove('show');
					}
				}

				if (data && 'errors' in data) {
					if (data.errors) {
						setAlertText(el, 'danger');
					} else {
						setAlertText(el, 'success');
					}
				}

				function setAlertText (el, _class) {
					let $alert = el.querySelector('.alert-' + _class);
					if ($alert) {
						let $text = $alert.querySelector('[data-alert-text-'+ _class +']');
						if ($text) {
							let text = $text.getAttribute('data-alert-text-'+ _class);
							if (text) {
								$text.innerHTML = text;
							} else {
								if ('msg' in data) $text.innerHTML = data.msg
							}
						} else {
							if ('msg' in data) $alert.innerHTML = data.msg
						}

						$alert.classList.add('show');
					} else {
						el.innerHTML = data.msg
					}
				}

				toggleSlide(el);
			}
		}
	}
}

export default VGFormSender
