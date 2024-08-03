import {getSvg} from "../../util/svg";

class VGModal {
	constructor(form, arg) {
		this.form = form;
		this.params = arg;
		this.classes = {
			container: 'vg-form-sender--alert-modal',
			backdrop:  'vg-form-sender--alert-backdrop'
		}
		this.element = null;
		this.backdrop = null;
	}

	init() {
		const _this = this;

		_this.element = _this.form.querySelector('.' + _this.classes.container);
		if (!_this.element) _this.element = _this.draw();

		_this.backdrop = document.createElement('div');
		_this.backdrop.classList.add(_this.classes.backdrop);

		_this.toggle();
	}

	toggle() {
		if (!document.body.classList.contains('vg-modal-open')) {
			return this.show();
		} else {
			return this.hide();
		}
	}

	show() {
		const _this = this;

		document.body.classList.add('vg-modal-open');
		_this.element.style.display = 'block';

		setTimeout(() => {
			_this.element.classList.add('active');
			_this.backdrop.classList.add('active');
		}, 100);

		document.body.append(_this.element);
		document.body.append(_this.backdrop);
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
		}, 100);
	}

	draw() {
		const _this = this;

		let modal = document.createElement('div');
		modal.classList.add(_this.classes.container);
		modal.innerHTML = '<div class="modal-content"></div>';

		return modal;
	}
}

export default VGModal;

/*
'   <div class="modal-content-body">' +
'       <div class="close"><a href="#" data-dismiss="alert-modal">' + getSvg('cross') + '</a></div>' +
'       <div class="vg-alert vg-alert-danger">' +
'	    <div class="svg-area">' + getSvg('error') + '</div>' +
'	    <div class="content-area">' +
'		    <div class="title-area" data-alert-danger-title></div>' +
'		    <div class="text-area" data-alert-danger-text></div>' +
'	    </div>' +
'   </div>' +
'   <div class="vg-alert vg-alert-success">' +
'	    <div class="svg-area">' + getSvg('success') + '</div>' +
'	    <div class="content-area">' +
'		    <div class="title-area" data-alert-success-title></div>' +
'		    <div class="text-area" data-alert-success-text></div>' +
'	    </div>' +
'   </div>' +
'   </div>' +*/
