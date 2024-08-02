import {getSvg} from "../../util/svg";

class VGModal {
	constructor(form, arg) {
		this.form = form;
		this.params = arg;
		this.classes = {
			container: 'vg-form-sender--alert-modal',
			backdrop:  'vg-form-sender--alert-backdrop'
		}
	}

	init() {
		const _this = this;

		let el = _this.form.querySelector('.' + _this.classes.container);
		if (!el) el = _this.draw();

		_this.toggle(el);
	}

	toggle(el) {
		let _this = this;

		let backdrop = document.createElement('div');
		backdrop.classList.add(_this.classes.backdrop);

		if (!document.body.classList.contains('vg-modal-open')) {
			document.body.classList.add('vg-modal-open');
			el.style.display = 'block';

			setTimeout(() => {
				el.classList.add('active');
				backdrop.classList.add('active');
			}, 100);

			document.body.append(backdrop);
		}
	}

	draw() {
		const _this = this;

		let alertModal = document.querySelector('.' + _this.classes.container);
		if (alertModal) {
			return alertModal;
		}

		let modal = document.createElement('div');
		modal.classList.add(_this.classes.container);
		modal.innerHTML = '<div class="modal-content"></div>';

		document.body.append(modal);

		return modal;
	}
}

/*window.addEventListener('keydown', (event) => {
	if (event.key === 'Escape' || event.key === 'Esc') {
		if (document.body.classList.contains('vg-modal-open')) {
			VGModal.close();
		}
	}
});*/

export default VGModal;
