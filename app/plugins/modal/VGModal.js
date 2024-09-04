import {getSvg} from "../../util/svg";
import {isObject, mergeDeepObject} from "../../util/functions";

class VGModal {
	constructor(form, arg) {
		this.form = form;
		this.params = mergeDeepObject({
			content_over: true,
			hideDelay: 350,
			showDelay: 50
		}, arg);
		this.classes = {
			container: 'vg-form-sender--alert-modal',
			backdrop:  'vg-form-sender--alert-backdrop'
		}
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
			document.body.style.paddingRight = (window.innerWidth - document.documentElement.clientWidth) + 'px';
			document.body.style.overflow = "hidden";
		}

		setTimeout(() => {
			_this.element.classList.add('active');
			_this.backdrop.classList.add('active');
		}, _this.params.showDelay);

		document.body.append(_this.element);
		document.body.append(_this.backdrop);
		_this.setText(_this.element);

		window.addEventListener('keydown', (event) => {
			if (event.key === 'Escape' || event.key === 'Esc') {
				_this.hide();
			}
		});

		_this.element.onclick = function (e) {
			if (e.target === document.querySelector('.' + _this.classes.container)) {
				_this.hide();
			}

			return false;
		}

		let btnClose = _this.element.querySelector('[data-vg-dismiss="modal"]');
		if (btnClose) {
			btnClose.onclick = function () {
				_this.hide();

				return false;
			}
		}
	}

	hide() {
		const _this = this;

		document.body.classList.remove('vg-modal-open');
		_this.element.classList.remove('active');
		_this.backdrop.classList.remove('active')

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
		modal.innerHTML = '<div class="modal-content">' +
			'   <div class="close"><a href="#" data-vg-dismiss="modal">' + getSvg('cross') + '</a></div>' +
			'   <div class="modal-body vg-alert-content">' +
			'       <div class="vg-alert vg-alert-danger">' +
			'	        <div class="svg-area">' + getSvg('error') + '</div>' +
			'	        <div class="content-area">' +
			'		     <div class="title-area" data-alert-danger-title></div>' +
			'		     <div class="text-area" data-alert-danger-text></div>' +
			'	        </div>' +
			'       </div>' +
			'       <div class="vg-alert vg-alert-success">' +
			'	        <div class="svg-area">' + getSvg('success') + '</div>' +
			'	        <div class="content-area">' +
			'		        <div class="title-area" data-alert-success-title></div>' +
			'		        <div class="text-area" data-alert-success-text></div>' +
			'	        </div>' +
			'   </div>' +
			'</div>';

		return modal;
	}

	setText(el) {
		const _this = this;
		let data = _this.params.data,
			_class = _this.params.status === 'error' ? 'danger' : _this.params.status;

		if (!data) return false;

		if (isObject(data)) {
			if (('errors' in data && data.errors) || ('error' in data && data.error)) _class = 'danger';
		}

		let $alert = el.querySelector('.vg-alert-' + _class);
		if ($alert) {
			let $text = $alert.querySelector('[data-alert-'+ _class +'-text]');
			if ($text) {
				if (typeof data === 'string') {
					$text.innerHTML = data;
				} else if (('msg' in data)) {
					$text.innerHTML = data.msg;

					let $title = $alert.querySelector('[data-alert-'+ _class +'-title]');
					if ($title && ('title' in data)) $title.innerHTML = data.title;
				}
			}

			$alert.classList.add('show');
		} else {
			el.innerHTML = data.msg
		}
	}
}

export default VGModal;
