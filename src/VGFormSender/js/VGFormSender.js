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
		this.alertElement = null;

		this.svg =  {
			error: '<svg viewbox="0 0 500 500" class="am_Error_Icon"><path class="am_SVG_circle" d="m444.34693,114.07007a236.95276,236.95276 0 0 1 44.1553,137.73747c0,129.97005 -106.94772,236.96443 -236.91777,236.96443s-236.91777,-106.94772 -236.91777,-236.91777s106.94772,-236.96443 236.91777,-236.96443a236.99941,236.99941 0 0 1 168.72548,70.59483"></path><line class="am_SVG_error1" y2="390" x2="390" y1="110" x1="110"></line><line class="am_SVG_error2" y2="390" x2="110" y1="110" x1="390"></line></svg>',
			success: '<svg viewbox="0 0 500 500" class="am_Success_Icon"><path class="am_SVG_circle" d="m443.0136,114.07007a236.95276,236.95276 0 0 1 44.1553,137.73747c0,129.97005 -106.94772,236.96443 -236.91777,236.96443s-236.91777,-106.94772 -236.91777,-236.91777s106.94772,-236.96443 236.91777,-236.96443a236.99941,236.99941 0 0 1 168.72548,70.59483"></path><polyline class="am_SVG_check" points="104.4892349243164,309.2001647949219 195.57406616210938,402.9600524902344 418.9292297363281,85.03718566894531 "></polyline></svg>',
			cross: '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 224.512 224.512" style="enable-background:new 0 0 224.512 224.512;" xml:space="preserve"><g><polygon style="fill:#010002;" points="224.507,6.997 217.521,0 112.256,105.258 6.998,0 0.005,6.997 105.263,112.254 0.005,217.512 6.998,224.512 112.256,119.24 217.521,224.512 224.507,217.512 119.249,112.254 "/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>'
		};

		if (this.settings.alertParams.type === 'block') {
			this.alertElement = this.drawAlertBlock(form);
		}

		if (this.settings.alertParams.type === 'modal') {
			this.alertElement = this.drawAlertModal();
		}
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
			_this.alertBlock(_this.alertElement, data, condition);
		}

		if (_this.settings.alertParams.type === 'modal' && condition === 'success') {
			_this.alertModal(_this.alertElement, data, condition);
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
				let $alert = el.querySelector('.vg-alert-' + _class);
				if ($alert) {
					let $text = $alert.querySelector('[data-alert-'+ _class +'-text]');
					if ($text && ('msg' in data)) $text.innerHTML = data.msg;

					let $title = $alert.querySelector('[data-alert-'+ _class +'-title]');
					if ($title && ('title' in data)) $title.innerHTML = data.title;

					$alert.classList.add('show');
				} else {
					el.innerHTML = data.msg
				}
			}

			toggleSlide(el);
		}
	}

	alertModal(el, data) {
		const _this = this;

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
			let $alertContent = el.querySelector('.vg-alert-content');
			if ($alertContent) {
				let $alert = $alertContent.querySelector('.vg-alert-' + _class );
				if ($alert) {
					let $title = $alert.querySelector('[data-alert-'+ _class +'-title]');
					if ($title && 'msg' in data) $title.innerHTML = data.title;

					let $text = $alert.querySelector('[data-alert-'+ _class +'-text]');
					if ($text && 'msg' in data) $text.innerHTML = data.msg;

					$alert.classList.add('show');
				} else {
					$alert.innerHTML = data.msg;
				}
			} else {
				el.innerHTML = data.msg;
			}
		}

		const modal = new bootstrap.Modal('#' + _this.classes.alert.modal, {});
		modal.show();
	}

	drawAlertBlock(form) {
		const _this = this;

		let el = form.querySelector('.' + _this.classes.alert.block);
		if (!el) {
			let elFormID = document.querySelector('[data-form="' + form.id + '"]');

			if (!elFormID) {
				let elBlock = document.createElement('div');
				elBlock.classList.add(_this.classes.alert.block);
				elBlock.innerHTML = '<div class="vg-alert vg-alert-danger">' +
					'					<div class="svg-area">' + _this.svg.error + '</div>' +
					'					<div class="content-area">' +
					'						<div class="title-area" data-alert-danger-title></div>' +
					'						<div class="text-area" data-alert-danger-text></div>' +
					'					</div>' +
					'				</div>' +
					'				<div class="vg-alert vg-alert-success">' +
					'					<div class="svg-area">' + _this.svg.success + '</div>' +
					'					<div class="content-area">' +
					'						<div class="title-area" data-alert-success-title></div>' +
					'						<div class="text-area" data-alert-success-text></div>' +
					'					</div>' +
					'				</div>'
				form.prepend(elBlock);
				el = elBlock;
			} else {
				el = elFormID;
			}
		}

		return el;
	}

	drawAlertModal() {
		const _this = this;

		let alertModal = document.querySelector('.' + _this.classes.alert.modal);
		if (!alertModal) {
			let newAlertModal = document.createElement('div');
			newAlertModal.classList.add('modal');
			newAlertModal.classList.add('fade');
			newAlertModal.classList.add(_this.classes.alert.modal);
			newAlertModal.setAttribute('id', _this.classes.alert.modal);

			newAlertModal.innerHTML = '<div class="modal-dialog" role="document">' +
				'        <div class="modal-content">' +
				'            <button type="button" class="modal-close" data-bs-dismiss="modal" aria-label="Close">' + _this.svg.cross + '</button>' +
				'            <div class="vg-alert-content">' +
				'                <div class="vg-alert vg-alert-danger">' +
				'                     <div class="svg-area">' + _this.svg.error + '</div>' +
				'                     <div class="title-area" data-alert-danger-title></div>' +
				'                     <div class="text-area" data-alert-danger-text></div>' +
				'                </div>' +
				'                <div class="vg-alert vg-alert-success">' +
				'                     <div class="svg-area">' + _this.svg.success + '</div>' +
				'                     <div class="title-area" data-alert-success-title></div>' +
				'                     <div class="text-area" data-alert-success-text></div>' +
				'                </div>' +
				'            </div>' +
				'        </div>' +
				'    </div>';

			document.body.append(newAlertModal);
			return newAlertModal;
		} else {
			return alertModal;
		}
	}
}

export default VGFormSender
