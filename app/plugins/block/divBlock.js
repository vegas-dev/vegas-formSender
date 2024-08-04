import {getSvg} from "../../util/svg";
import {isObject} from "../../util/functions";

class divBlock {
	constructor(form, arg) {
		this.form = form;
		this.params = arg;
		this.classes = {
			container: 'vg-form-sender--alert-block'
		}
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

	close(el) {
		const _this = this;

		let elClose = el.querySelector('[data-dismiss="alert-block"]');
		if (elClose) {
			elClose.onclick = function () {
				_this.toggleSlide(el);
				el.classList.remove('active');

				return false;
			}
		}
	}

	draw() {
		const _this = this;
		let form = this.form;

		let elFormID = document.querySelector('[data-form="' + form.id + '"]');
		if (elFormID) return elFormID;

		let elBlock = document.createElement('div');
		elBlock.classList.add(_this.classes.container);
		elBlock.innerHTML = '<div class="close"><a href="#" data-dismiss="alert-block">' + getSvg('cross') + '</a></div>' +
			'<div class="vg-alert vg-alert-danger">' +
			'	<div class="svg-area">' + getSvg('error') + '</div>' +
			'	<div class="content-area">' +
			'		<div class="title-area" data-alert-danger-title></div>' +
			'		<div class="text-area" data-alert-danger-text></div>' +
			'	</div>' +
			'</div>' +
			'<div class="vg-alert vg-alert-success">' +
			'	<div class="svg-area">' + getSvg('success') + '</div>' +
			'	<div class="content-area">' +
			'		<div class="title-area" data-alert-success-title></div>' +
			'		<div class="text-area" data-alert-success-text></div>' +
			'	</div>' +
			'</div>';

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
			let el_max_height       = getHeight(el) + 'px' || '0';
			el.style['transition']         = 'max-height 0.5s ease-in-out';
			el.style.overflowY             = 'hidden';
			el.style.maxHeight             = '0';
			el.setAttribute('data-max-height', el_max_height);
			el.style.display               = 'block';

			setTimeout(function() {
				el.style.maxHeight = el_max_height;
			}, 10);
		}

		function getHeight(el) {
			let el_style      = window.getComputedStyle(el),
				el_display    = el_style.display,
				el_position   = el_style.position,
				el_visibility = el_style.visibility,
				el_max_height = el_style.maxHeight.replace('px', '').replace('%', ''),
				wanted_height = 0;

			if (el_display !== 'none' && el_max_height !== '0') {
				return el.offsetHeight;
			}

			el.style.position   = 'absolute';
			el.style.visibility = 'hidden';
			el.style.display    = 'block';

			wanted_height     = el.offsetHeight;

			el.style.display    = el_display;
			el.style.position   = el_position;
			el.style.visibility = el_visibility;

			return wanted_height;
		}
	}
}

export default divBlock;
