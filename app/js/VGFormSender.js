import VGSender from "./VGSender";
import VGFormPlugins from "./VGFormPlugins";
import {mergeDeepObject} from "../util/functions";

class VGFormSender extends VGSender {
	constructor(form, arg ={}) {
		super(form, arg);

		this.isAlert = this.settings.alert.enabled;

		return this;
	}

	/**
	 * Колбеки срабатывают до вызова внутренних действий
	 * @param callback
	 * @returns {boolean}
	 */
	submit(callback) {
		if (!this.isAlert) {
			return super.submit(callback);
		} else {
			const _this = this;

			return super.submit({
				beforeSend: function (event, vgSender) {
					if (callback && 'beforeSend' in callback && typeof callback.beforeSend === 'function') {
						callback.beforeSend(event, vgSender);
					}

					buttonCondition(vgSender, 'beforeSend');
					_this.alert(vgSender, null, 'beforeSend');
				},
				error: function (event, vgSender, data) {
					if (callback && 'error' in callback && typeof callback.error === 'function') {
						callback.error(event, vgSender, data);
					}

					buttonCondition(vgSender);
					jsonParse(data, 'error', vgSender);
				},
				success: function (event, vgSender, data) {
					if (callback && 'success' in callback && typeof callback.success === 'function') {
						callback.success(event, vgSender, data);
					}

					buttonCondition(vgSender);
					jsonParse(data, 'success', vgSender);
				}
			});

			function buttonCondition(vgSender, status = 'default') {
				let btnSubmit = vgSender.extElement.button;
				if (btnSubmit) {
					let btnText = {
						send: 'Отправляем...',
						text: 'Отправить'
					};

					if (btnSubmit.hasAttribute('data-spinner') && status === 'beforeSend') {
						btnSubmit.insertAdjacentHTML('afterbegin', '<span class="spinner-border spinner-border-sm me-2"></span>')
					}

					if (btnSubmit.hasAttribute('data-text')) {
						btnText.text = btnSubmit.getAttribute('data-text');
					} else {
						let $btnText = btnSubmit.querySelector('[data-text]');
						if ($btnText) {
							btnText.text = $btnText.getAttribute('data-text');
							btnSubmit = $btnText;
						}
					}

					if (btnSubmit.hasAttribute('data-text-send')) {
						btnText.send = btnSubmit.getAttribute('data-text-send');
					} else {
						let $btnTextSend = btnSubmit.querySelector('[data-text-send]');
						if ($btnTextSend) {
							btnText.send = $btnTextSend.getAttribute('data-text-send');
							btnSubmit = $btnTextSend;
						}
					}

					if (status === 'beforeSend') {
						btnSubmit.innerHTML = btnText.send;
						btnSubmit.setAttribute('disabled', 'disabled');
					} else {
						btnSubmit.innerHTML = btnText.text;
						btnSubmit.removeAttribute('disabled');

						let spinner = vgSender.extElement.button.querySelector('.spinner-border');
						if (spinner) {
							spinner.remove();
						}
					}
				}
			}

			function jsonParse(data, status, sender) {
				if (_this.settings.isJsonParse && typeof data === 'string') {
					let parserData = {};

					try {
						parserData = JSON.parse(data);
						_this.alert(sender, parserData, status);
					} catch (e) {
						_this.alert(sender, data, status);
					}
				} else {
					_this.alert(sender, data, status);
				}
			}
		}
	}

	alert(vgSender, data, status) {
		if (!this.isAlert) return false;

		console.log(this.settings.alert.delay)

		setTimeout(() => {
			let type;
			if (this.settings.alert.params.type === 'block') type = 'divBlock';
			if (this.settings.alert.params.type === 'modal') type = 'VGModal';

			if (type) {
				this.settings.plugins.find(p => p[type])[type].enabled = true;
				this.settings.plugins.find(p => p[type])[type].params.data = data;
				this.settings.plugins.find(p => p[type])[type].params.status = status;
			}

			if ('plugins' in this.settings) {
				new VGFormPlugins(this).init();
			}
		}, this.settings.alert.delay)
	}
}

export default VGFormSender
