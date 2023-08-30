import {ajax, eventHandler, collectData, mergeDeepObject, setModal} from "../../util/functions";
import VGFormPlugins from "./VGFormPlugins";

const EVENT_KEY_SUCCESS = 'vg.fs.success';
const EVENT_KEY_ERROR   = 'vg.fs.error';
const EVENT_KEY_BEFORE  = 'vg.fs.before';

class VGSender {
	constructor(form, arg = {}) {
		this.extElement = {};
		this.settings = {};
		this.form = null;

		const defaultParams = {
			'action': location.href,
			'method': 'post',
			'fields': [],
			'jsonParse': true,
			'redirect': null,
			'validate': false,
			'alert': {
				enabled: true,
				params: {
					type: 'modal'
				},
			},
			'plugins': [
				{
					'showPass': {
						enabled: true,
						params: {}
					}
				}
			]
		}

		if (!form) {
			console.error('Первый параметр не должен быть пустым');
			return false;
		} else {
			if (typeof form === 'string') {
				let $form = document.querySelector(form);
				if ($form) {
					this.form = form;
				}
			} else {
				this.form = form;
			}

			if (this.form) {
				this.settings = mergeDeepObject(defaultParams, arg);
				this.classes = {
					general: 'vg-form-sender'
				}

				if (this.settings.fields && typeof this.settings.fields == 'function') {
					this.settings.fields = this.settings.fields();
				}

				this.init();
			}
		}
	}

	init() {
		const _this = this;

		let data = _this.form.dataset;

		if ('alertType' in data && data.alertType) this.settings.alert.params.type = data.alertType;
	}
}

export default VGSender;
