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
			_this.alertBlock(form, data, condition);
		}

		if (_this.settings.alertParams.type === 'modal' && condition === 'success') {
			_this.alertModal(form, data, condition);
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

	alertBlock(form, data, condition) {
		const _this = this;

		let el = form.querySelector('.' + _this.classes.alert.block);
		if (!el) {
			let elFormID = document.querySelector('[data-form="' + form.id + '"]');

			if (!elFormID) {
				let elBlock = document.createElement('div');
				elBlock.classList.add(_this.classes.alert.block);
				elBlock.innerHTML = '<div class="alert alert-danger"></div><div class="alert alert-success"></div>'
				form.prepend(elBlock);
				el = elBlock;
			} else {
				el = elFormID;
			}
		}

		if (condition === 'before') {
			if (el.classList.contains('active')) {
				toggleSlide(el);

				el.classList.remove('active');
			}
		} else if (condition === 'success') {
			el.classList.add('active')

			let elShow = el.querySelectorAll('.show');
			if (elShow.length) {
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

	alertModal(form, data, condition) {
		const _this = this;

		let alertModal = document.querySelector('.' + _this.classes.alert.modal);
		if (!alertModal) {
			let newAlertModal = document.createElement('div');
			newAlertModal.classList.add('modal');
			newAlertModal.classList.add('fade');
			newAlertModal.classList.add(_this.classes.alert.modal);
			newAlertModal.setAttribute('id', _this.classes.alert.modal)

			newAlertModal.innerHTML = '<div class="modal-dialog" role="document">' +
				'        <div class="modal-content"></div>' +
				'    </div>';

			document.body.append(newAlertModal);
			alertModal = newAlertModal;
		}

		/*const modal = new bootstrap.Modal(_this.classes.alert.modal);
		modal.show();*/
	}
}

export default VGFormSender
