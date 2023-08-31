(function (exports) {
	'use strict';

	/**
	 * Глубокое объединение объектов
	 * @param objects
	 * @returns {*}
	 */
	const mergeDeepObject = function (...objects) {
		const isObject = obj => obj && typeof obj === 'object';

		return objects.reduce((prev, obj) => {
			Object.keys(obj).forEach(key => {
				const pVal = prev[key];
				const oVal = obj[key];

				if (Array.isArray(pVal) && Array.isArray(oVal)) {
					prev[key] = pVal.concat(...oVal);
				}
				else if (isObject(pVal) && isObject(oVal)) {
					prev[key] = mergeDeepObject(pVal, oVal);
				}
				else {
					prev[key] = oVal;
				}
			});

			return prev;
		}, {});
	};

	/**
	 * Collect Data
	 * @param data
	 * @param fields
	 */
	const collectData = function(data, fields) {
		for (let name in fields) {
			if (typeof fields[name] === 'object') {
				for (let key in fields[name]) {
					let arr = Object.keys(fields[name][key]).map(function (i) {
						return fields[name][key][i];
					});
					data.append(name, arr);
				}
			} else {
				data.append(name, fields[name]);
			}
		}

		return data;
	};

	/**
	 * AJAX REQUEST
	 * @type {{post: ajax.post, get: ajax.get, x: ((function(): (XMLHttpRequest))|*), send: ajax.send}}
	 */
	const ajax = {
		x: function () {
			if (typeof XMLHttpRequest !== 'undefined') {
				return new XMLHttpRequest();
			}
			let versions = [
				"MSXML2.XmlHttp.6.0",
				"MSXML2.XmlHttp.5.0",
				"MSXML2.XmlHttp.4.0",
				"MSXML2.XmlHttp.3.0",
				"MSXML2.XmlHttp.2.0",
				"Microsoft.XmlHttp"
			];

			let xhr;
			for (let i = 0; i < versions.length; i++) {
				try {
					xhr = new ActiveXObject(versions[i]);
					break;
				} catch (e) {}
			}
			return xhr;
		},

		send: function (url, callback, method, data, async) {
			if (async === undefined) {
				async = true;
			}
			let x = ajax.x();
			x.open(method, url, async);
			x.onreadystatechange = function () {
				if (x.readyState === 4) {
					switch (x.status) {
						case 200:
							callback('success', x.responseText);
							break;
						default:
							callback('error', x.responseText);
							break;
					}
				}
			};
			x.send(data);
		},

		get: function (url, data, callback, async) {
			let query = [];
			for (let key of data) {
				query.push(encodeURIComponent(key[0]) + '=' + encodeURIComponent(key[1]));
			}
			ajax.send(url + (query.length ? '?' + query.join('&') : ''), callback, 'GET', null, async);
		},

		post: function (url, data, callback, async) {
			ajax.send(url, callback, 'POST', data, async);
		}
	};

	/**
	 * EVENTS
	 * @type {{on: eventHandler.on}}
	 */
	const eventHandler = {
		on: function (element, event) {
			const eventSuccess = new CustomEvent(event, {
				bubbles: true,
			});

			element.dispatchEvent(eventSuccess);
		}
	};

	/**
	 * Set Modal
	 * @param el
	 * @returns {bootstrap.Modal|Modal|boolean}
	 */
	const setModal = function (el) {
		if (!el) return false;

		if (typeof el === "string") {
			el = '#' + el;
		}

		if (typeof bootstrap !== "undefined") {
			return new bootstrap.Modal(el, {});
		} else if (typeof Modal !== "undefined") {
			return new Modal(el, {});
		} else {
			console.error('The Modal component was not found');

			return false;
		}
	};

	class showPass {
		constructor(form = null, arg = {}) {
			this.form = form;
			this.params = arg;

			this.eyeOpen = '<svg width="24px" id="svgEyeOpen" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
				'<path fill-rule="evenodd" clip-rule="evenodd" d="M12 8.25C9.92893 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25ZM9.75 12C9.75 10.7574 10.7574 9.75 12 9.75C13.2426 9.75 14.25 10.7574 14.25 12C14.25 13.2426 13.2426 14.25 12 14.25C10.7574 14.25 9.75 13.2426 9.75 12Z" fill="#495057"/>\n' +
				'<path fill-rule="evenodd" clip-rule="evenodd" d="M12 3.25C7.48587 3.25 4.44529 5.9542 2.68057 8.24686L2.64874 8.2882C2.24964 8.80653 1.88206 9.28392 1.63269 9.8484C1.36564 10.4529 1.25 11.1117 1.25 12C1.25 12.8883 1.36564 13.5471 1.63269 14.1516C1.88206 14.7161 2.24964 15.1935 2.64875 15.7118L2.68057 15.7531C4.44529 18.0458 7.48587 20.75 12 20.75C16.5141 20.75 19.5547 18.0458 21.3194 15.7531L21.3512 15.7118C21.7504 15.1935 22.1179 14.7161 22.3673 14.1516C22.6344 13.5471 22.75 12.8883 22.75 12C22.75 11.1117 22.6344 10.4529 22.3673 9.8484C22.1179 9.28391 21.7504 8.80652 21.3512 8.28818L21.3194 8.24686C19.5547 5.9542 16.5141 3.25 12 3.25ZM3.86922 9.1618C5.49864 7.04492 8.15036 4.75 12 4.75C15.8496 4.75 18.5014 7.04492 20.1308 9.1618C20.5694 9.73159 20.8263 10.0721 20.9952 10.4545C21.1532 10.812 21.25 11.2489 21.25 12C21.25 12.7511 21.1532 13.188 20.9952 13.5455C20.8263 13.9279 20.5694 14.2684 20.1308 14.8382C18.5014 16.9551 15.8496 19.25 12 19.25C8.15036 19.25 5.49864 16.9551 3.86922 14.8382C3.43064 14.2684 3.17374 13.9279 3.00476 13.5455C2.84684 13.188 2.75 12.7511 2.75 12C2.75 11.2489 2.84684 10.812 3.00476 10.4545C3.17374 10.0721 3.43063 9.73159 3.86922 9.1618Z" fill="#495057"/>\n' +
				'</svg>';
			this.eyeClose = '<svg width="24px" id="svgEyeClose" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
				'<path d="M2.68936 6.70456C2.52619 6.32384 2.08528 6.14747 1.70456 6.31064C1.32384 6.47381 1.14747 6.91472 1.31064 7.29544L2.68936 6.70456ZM15.5872 13.3287L15.3125 12.6308L15.5872 13.3287ZM9.04145 13.7377C9.26736 13.3906 9.16904 12.926 8.82185 12.7001C8.47466 12.4742 8.01008 12.5725 7.78417 12.9197L9.04145 13.7377ZM6.37136 15.091C6.14545 15.4381 6.24377 15.9027 6.59096 16.1286C6.93815 16.3545 7.40273 16.2562 7.62864 15.909L6.37136 15.091ZM22.6894 7.29544C22.8525 6.91472 22.6762 6.47381 22.2954 6.31064C21.9147 6.14747 21.4738 6.32384 21.3106 6.70456L22.6894 7.29544ZM19 11.1288L18.4867 10.582V10.582L19 11.1288ZM19.9697 13.1592C20.2626 13.4521 20.7374 13.4521 21.0303 13.1592C21.3232 12.8663 21.3232 12.3914 21.0303 12.0985L19.9697 13.1592ZM11.25 16.5C11.25 16.9142 11.5858 17.25 12 17.25C12.4142 17.25 12.75 16.9142 12.75 16.5H11.25ZM16.3714 15.909C16.5973 16.2562 17.0619 16.3545 17.409 16.1286C17.7562 15.9027 17.8545 15.4381 17.6286 15.091L16.3714 15.909ZM5.53033 11.6592C5.82322 11.3663 5.82322 10.8914 5.53033 10.5985C5.23744 10.3056 4.76256 10.3056 4.46967 10.5985L5.53033 11.6592ZM2.96967 12.0985C2.67678 12.3914 2.67678 12.8663 2.96967 13.1592C3.26256 13.4521 3.73744 13.4521 4.03033 13.1592L2.96967 12.0985ZM12 13.25C8.77611 13.25 6.46133 11.6446 4.9246 9.98966C4.15645 9.16243 3.59325 8.33284 3.22259 7.71014C3.03769 7.3995 2.90187 7.14232 2.8134 6.96537C2.76919 6.87696 2.73689 6.80875 2.71627 6.76411C2.70597 6.7418 2.69859 6.7254 2.69411 6.71533C2.69187 6.7103 2.69036 6.70684 2.68957 6.70503C2.68917 6.70413 2.68896 6.70363 2.68892 6.70355C2.68891 6.70351 2.68893 6.70357 2.68901 6.70374C2.68904 6.70382 2.68913 6.70403 2.68915 6.70407C2.68925 6.7043 2.68936 6.70456 2 7C1.31064 7.29544 1.31077 7.29575 1.31092 7.29609C1.31098 7.29624 1.31114 7.2966 1.31127 7.2969C1.31152 7.29749 1.31183 7.2982 1.31218 7.299C1.31287 7.30062 1.31376 7.30266 1.31483 7.30512C1.31698 7.31003 1.31988 7.31662 1.32353 7.32483C1.33083 7.34125 1.34115 7.36415 1.35453 7.39311C1.38127 7.45102 1.42026 7.5332 1.47176 7.63619C1.57469 7.84206 1.72794 8.13175 1.93366 8.47736C2.34425 9.16716 2.96855 10.0876 3.8254 11.0103C5.53867 12.8554 8.22389 14.75 12 14.75V13.25ZM15.3125 12.6308C14.3421 13.0128 13.2417 13.25 12 13.25V14.75C13.4382 14.75 14.7246 14.4742 15.8619 14.0266L15.3125 12.6308ZM7.78417 12.9197L6.37136 15.091L7.62864 15.909L9.04145 13.7377L7.78417 12.9197ZM22 7C21.3106 6.70456 21.3107 6.70441 21.3108 6.70427C21.3108 6.70423 21.3108 6.7041 21.3109 6.70402C21.3109 6.70388 21.311 6.70376 21.311 6.70368C21.3111 6.70352 21.3111 6.70349 21.3111 6.7036C21.311 6.7038 21.3107 6.70452 21.3101 6.70576C21.309 6.70823 21.307 6.71275 21.3041 6.71924C21.2983 6.73223 21.2889 6.75309 21.2758 6.78125C21.2495 6.83757 21.2086 6.92295 21.1526 7.03267C21.0406 7.25227 20.869 7.56831 20.6354 7.9432C20.1669 8.69516 19.4563 9.67197 18.4867 10.582L19.5133 11.6757C20.6023 10.6535 21.3917 9.56587 21.9085 8.73646C22.1676 8.32068 22.36 7.9668 22.4889 7.71415C22.5533 7.58775 22.602 7.48643 22.6353 7.41507C22.6519 7.37939 22.6647 7.35118 22.6737 7.33104C22.6782 7.32097 22.6818 7.31292 22.6844 7.30696C22.6857 7.30398 22.6867 7.30153 22.6876 7.2996C22.688 7.29864 22.6883 7.29781 22.6886 7.29712C22.6888 7.29677 22.6889 7.29646 22.689 7.29618C22.6891 7.29604 22.6892 7.29585 22.6892 7.29578C22.6893 7.29561 22.6894 7.29544 22 7ZM18.4867 10.582C17.6277 11.3882 16.5739 12.1343 15.3125 12.6308L15.8619 14.0266C17.3355 13.4466 18.5466 12.583 19.5133 11.6757L18.4867 10.582ZM18.4697 11.6592L19.9697 13.1592L21.0303 12.0985L19.5303 10.5985L18.4697 11.6592ZM11.25 14V16.5H12.75V14H11.25ZM14.9586 13.7377L16.3714 15.909L17.6286 15.091L16.2158 12.9197L14.9586 13.7377ZM4.46967 10.5985L2.96967 12.0985L4.03033 13.1592L5.53033 11.6592L4.46967 10.5985Z" fill="#495057"/>\n' +
				'</svg>';
		}

		init() {
			const _this = this;

			let inputPasswords = _this.form.querySelectorAll('[type="password"]');
			if (inputPasswords.length) {
				inputPasswords.forEach(function (elm) {
					let parent = elm.parentNode;
					if (parent) {
						parent.style.position = 'relative';

						let switcher = parent.querySelector('[data-vg-toggle="show-pass"]');
						if (!switcher) {
							switcher = document.createElement('span');
							switcher.setAttribute('data-vg-toggle', 'show-pass');
							switcher.setAttribute('title', 'Показать');
							switcher.setAttribute('aria-expanded', 'false');
							switcher.style.position = 'absolute';
							switcher.style.cursor = 'pointer';
							switcher.style.width = '24px';
							switcher.style.height = '24px';
							switcher.style.top = '50%';
							switcher.style.transform = 'translateY(-50%)';
							switcher.style.right = '12px';
							switcher.innerHTML = _this.eyeOpen;

							parent.append(switcher);
						}

						_this.toggle(switcher, elm);
					}
				});
			}
		}

		toggle(switcher, element) {
			const _this = this;

			switcher.onclick = (function () {
				let _self = this,
					iconClose = switcher.dataset.iconClose,
					iconOpen = switcher.dataset.iconOpen;

				if (switcher.getAttribute('aria-expanded') === 'true') {
					if (iconOpen) {
						let icon = switcher.querySelector('i');
						if (icon) {
							if (icon.classList.contains(iconClose)) {
								icon.classList.remove(iconClose);
								icon.classList.add(iconOpen);
							}
						}
					} else {
						switcher.innerHTML = _this.eyeOpen;
					}
					element.setAttribute('type', 'password');
					_self.setAttribute('aria-expanded', 'false');
				} else {
					if (iconClose) {
						let icon = switcher.querySelector('i');
						if (icon) {
							if (icon.classList.contains(iconOpen)) {
								icon.classList.remove(iconOpen);
								icon.classList.add(iconClose);
							}
						}
					} else {
						switcher.innerHTML = _this.eyeClose;
					}

					element.setAttribute('type', 'text');
					_self.setAttribute('aria-expanded', 'true');
				}
			});
		}
	}

	class VGFormPlugins {
		constructor(formsender) {
			this.plugins = formsender.settings.plugins;
			this.formsender = formsender;
		}

		init() {
			const _this = this;

			if (_this.plugins.length) {
				for (const plugin of _this.plugins) {
					let nameModule = Object.keys(plugin)[0];

					if (plugin[nameModule].enabled) {
						switch (nameModule) {
							case "showPass":
								if (typeof showPass !== "undefined") {
									let module = new showPass(_this.formsender.form, plugin[nameModule].params);
									module.init();
								}
							break;
						}
					}
				}
			}
		}
	}

	const EVENT_KEY_SUCCESS = 'vg.fs.success';
	const EVENT_KEY_ERROR   = 'vg.fs.error';
	const EVENT_KEY_BEFORE  = 'vg.fs.before';

	const setParams = function (form, params, arg) {
		let mParams = mergeDeepObject(params, arg);
		let data = [].filter.call(form.attributes, function(at) { return /^data-/.test(at.name); });

		for (let val of data) {
			if (val.name === 'data-alert-type' && val.value) mParams.alert.params.type = val.value;
			if (val.name === 'data-alert') mParams.alert = val.value !== 'false';
			if (val.name === 'data-validate') mParams.validate = val.value !== 'false';
			if (val.name === 'data-json-parse') mParams.jsonParse = val.value !== 'false';
			if (val.name === 'data-redirect' && val.value) mParams.redirect = val.value;
			if (val.name === 'data-plugins' && val.value) mParams.plugins = dataPlugins(JSON.parse(val.value));
		}

		function dataPlugins(value) {
			let p = {};

			for (const plugin of params.plugins) {
				let namePlugin = Object.keys(plugin)[0],
					nameModule = Object.keys(value)[0];

				if (namePlugin === nameModule) {
					p = mergeDeepObject(plugin, value);
				}
			}

			return p;
		}

		mParams.action = form.getAttribute('action') || mParams.action;
		mParams.method = form.getAttribute('method') || mParams.method;

		return mParams
	};

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
			};

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
					this.settings = setParams(form, defaultParams, arg);

					this.classes = {
						general: 'vg-form-sender'
					};

					if (this.settings.fields && typeof this.settings.fields == 'function') {
						this.settings.fields = this.settings.fields();
					}

					this.init();
				}
			}
		}

		init() {
			const _this = this;

			_this.form.classList.add(_this.classes.general);

			if (_this.settings.validate) {
				_this.form.setAttribute('novalidate', '');
				_this.form.classList.add('needs-validation');
			}

			let modalParent = _this.form.closest('.modal');
			if (modalParent) _this.extElement.modal = setModal(modalParent);

			let btnSubmit = _this.form.querySelector('[type="submit"]');
			if (!btnSubmit) btnSubmit = document.querySelector('[form="' + _this.form.id + '"]');
			_this.extElement.button = btnSubmit;

			if ('plugins' in _this.settings) {
				new VGFormPlugins(_this).init();
			}

			_this.isInit = true;
		}

		submit(callback) {
			if (!this.isInit) return false;
			const _this = this;

			_this.form.onsubmit = function (event) {
				let data = new FormData(_this.form);

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

				return _this.request(callback, event);
			};
		}

		request(callback, event) {
			if (!this.isInit) return false;
			const _this = this;

			let method = _this.settings.method.toLowerCase(),
				url = _this.settings.action,
				data = _this.data;

			if (callback && 'beforeSend' in callback) {
				if (typeof callback.beforeSend === 'function') callback.beforeSend(event, _this);
			}

			eventHandler.on(_this.form, EVENT_KEY_BEFORE);

			if (method === 'post') {
				ajax.post(url, data, function(status, data) {
					answer(status, data);
				});
			}

			if (method === 'get') {
				ajax.get(url, data, function(status, data) {
					answer(status, data);
				});
			}

			function answer(status, data) {
				_this.form.classList.remove('was-validated');

				if (typeof status === 'string' && status === 'error') {
					if (callback && 'error' in callback) {
						if (typeof callback.error === 'function') callback.error(event, _this, data);
					}

					eventHandler.on(_this.form, EVENT_KEY_ERROR);
				} else {
					if (callback && 'success' in callback) {
						if (typeof callback.success === 'function') callback.success(event, _this, data);
					}

					eventHandler.on(_this.form, EVENT_KEY_SUCCESS);
				}

				redirect();
			}

			function redirect() {
				if (_this.settings.redirect) {
					window.location.href = _this.settings.redirect;
				}
			}

			return false;
		}
	}

	/**
	 * getHeight - for elements with display:none
	 * @param el
	 * @returns {number}
	 */
	function getHeight(el) {
		let el_style      = window.getComputedStyle(el),
			el_display    = el_style.display,
			el_position   = el_style.position,
			el_visibility = el_style.visibility,
			el_max_height = el_style.maxHeight.replace('px', '').replace('%', ''),

			wanted_height = 0;


		// if it's not hidden we just return normal height
		if (el_display !== 'none' && el_max_height !== '0') {
			return el.offsetHeight;
		}

		// the element is hidden so:
		// making the el block, so we can measure its height but still be hidden
		el.style.position   = 'absolute';
		el.style.visibility = 'hidden';
		el.style.display    = 'block';

		wanted_height     = el.offsetHeight;

		// reverting to the original values
		el.style.display    = el_display;
		el.style.position   = el_position;
		el.style.visibility = el_visibility;

		return wanted_height;
	}

	/**
	 * toggleSlide mimics the jQuery version of slideDown and slideUp
	 * all in one function comparing the max-height to 0
	 * @param el
	 */
	function toggleSlide(el) {
		if (el.getAttribute('data-max-height')) {
			// we've already used this before, so everything is set up
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

			// we use setTimeout to modify maxHeight later than display (to we have the transition effect)
			setTimeout(function() {
				el.style.maxHeight = el_max_height;
			}, 10);
		}
	}

	const svg =  {
		error: '<svg viewbox="0 0 500 500" class="am_Error_Icon"><path class="am_SVG_circle" d="m444.34693,114.07007a236.95276,236.95276 0 0 1 44.1553,137.73747c0,129.97005 -106.94772,236.96443 -236.91777,236.96443s-236.91777,-106.94772 -236.91777,-236.91777s106.94772,-236.96443 236.91777,-236.96443a236.99941,236.99941 0 0 1 168.72548,70.59483"></path><line class="am_SVG_error1" y2="390" x2="390" y1="110" x1="110"></line><line class="am_SVG_error2" y2="390" x2="110" y1="110" x1="390"></line></svg>',
		success: '<svg viewbox="0 0 500 500" class="am_Success_Icon"><path class="am_SVG_circle" d="m443.0136,114.07007a236.95276,236.95276 0 0 1 44.1553,137.73747c0,129.97005 -106.94772,236.96443 -236.91777,236.96443s-236.91777,-106.94772 -236.91777,-236.91777s106.94772,-236.96443 236.91777,-236.96443a236.99941,236.99941 0 0 1 168.72548,70.59483"></path><polyline class="am_SVG_check" points="104.4892349243164,309.2001647949219 195.57406616210938,402.9600524902344 418.9292297363281,85.03718566894531 "></polyline></svg>',
		cross: '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 224.512 224.512" style="enable-background:new 0 0 224.512 224.512;" xml:space="preserve"><g><polygon style="fill:#010002;" points="224.507,6.997 217.521,0 112.256,105.258 6.998,0 0.005,6.997 105.263,112.254 0.005,217.512 6.998,224.512 112.256,119.24 217.521,224.512 224.507,217.512 119.249,112.254 "/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>'
	};

	class VGFormSender extends VGSender {
		constructor(form, arg ={}) {
			super(form, arg);

			this.isAlert = this.settings.alert.enabled;

			let classes = {
				alert: {
					block: 'vg-form-sender--alert-block',
					modal: 'vg-form-sender--alert-modal',
				}
			};
			this.classes = mergeDeepObject(this.classes, classes);

			this.alertElement = null;

			if (this.settings.alert.params.type === 'block') {
				this.alertElement = this._drawAlertBlock(form);
			}

			if (this.settings.alert.params.type === 'modal') {
				this.alertElement = this._drawAlertModal();
			}

			return this;
		}

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

						_this.btnSubmit(vgSender, 'beforeSend');
						_this.alert(vgSender, null, 'beforeSend');
					},

					error: function (event, vgSender, data) {
						if (callback && 'error' in callback && typeof callback.error === 'function') {
							callback.error(event, vgSender, data);
						}

						_this.btnSubmit(vgSender, 'default');

						if (_this.settings.jsonParse && typeof data === 'string') {
							let parserData = {};

							try {
								parserData = JSON.parse(data);
								_this.alert(vgSender, parserData, 'error');
							} catch (e) {
								_this.alert(vgSender, data, 'error');
							}
						} else {
							_this.alert(vgSender, data, 'error');
						}
					},

					success: function (event, vgSender, data) {
						if (callback && 'success' in callback && typeof callback.success === 'function') {
							callback.success(event, vgSender, data);
						}

						_this.btnSubmit(vgSender, 'default');

						if (_this.settings.jsonParse && typeof data === 'string') {
							let parserData = {};

							try {
								parserData = JSON.parse(data);
								_this.alert(vgSender, parserData, 'success');
							} catch (e) {
								_this.alert(vgSender, data, 'success');
							}
						} else {
							_this.alert(vgSender, data, 'success');
						}
					}
				});
			}
		}

		btnSubmit(vgSender, status) {
			if (!this.isAlert) return false;

			let btnSubmit = vgSender.extElement.button;
			if (btnSubmit) {
				let btnText = {
					send: 'Отправляем...',
					text: 'Отправить'
				};

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
				} else if (status === 'default') {
					btnSubmit.innerHTML = btnText.text;
				}
			}
		}

		alert(vgSender, data, status) {
			if (!this.isAlert) return false;
			const _this = this;

			vgSender.alertElement = _this.alertElement;

			if (_this.settings.alert.params.type === 'block') {
				_this.alertBlock(vgSender, data, status);
			}

			if (_this.settings.alert.params.type === 'modal') {
				_this.alertModal(vgSender, data, status);
			}
		}

		alertBlock(vgSender, data, status) {
			let el = vgSender.alertElement;

			if (status === 'beforeSend') {
				if (el.classList.contains('active')) {
					toggleSlide(el);

					el.classList.remove('active');
				}
			} else if (status === 'success') {
				setActiveBlock(el);

				setAlertText(el, data,'success');

				toggleSlide(el);

				closeCurrentBlock(el);
			} else if (status === 'error') {
				setActiveBlock(el);

				setAlertText(el, data,'danger');

				toggleSlide(el);

				closeCurrentBlock(el);
			}

			function setActiveBlock(el) {
				el.classList.add('active');
				let elShow = el.querySelectorAll('.show');
				if (elShow.length) {
					for (const element of elShow) {
						element.classList.remove('show');
					}
				}
			}

			function closeCurrentBlock(el) {
				let elClose = el.querySelector('[data-dismiss="alert-block"]');
				if (elClose) {
					elClose.onclick = function () {
						toggleSlide(el);
						el.classList.remove('active');

						return false;
					};
				}
			}

			function setAlertText (el, data, _class) {
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
					el.innerHTML = data.msg;
				}
			}
		}

		alertModal(vgSender, data, status) {
			const _this = this;

			let el = vgSender.alertElement,
			elShow = el.querySelectorAll('.show');

			if (elShow.length) {
				for (const element of elShow) {
					element.classList.remove('show');
				}
			}

			if (data !== null) {
				if (vgSender.extElement.modal) {
					vgSender.extElement.modal.hide();
				}

				switch (status) {
					case 'success':
						setAlertText(el, data, 'success');
						break;
					case 'error':
						setAlertText(el, data, 'danger');
						break;
				}

				let modal = setModal(_this.classes.alert.modal);
				if (modal) modal.show();
			}

			function setAlertText (el, data, _class) {
				let $alertContent = el.querySelector('.vg-alert-content');
				if ($alertContent) {
					let $alert = $alertContent.querySelector('.vg-alert-' + _class );
					if ($alert) {
						let $text = $alert.querySelector('[data-alert-'+ _class +'-text]');
						if (typeof data === 'string') {
							$text.innerHTML = data;
						} else {
							let $title = $alert.querySelector('[data-alert-'+ _class +'-title]');
							if ($title && 'msg' in data) $title.innerHTML = data.title;

							if ($text && 'msg' in data) $text.innerHTML = data.msg;
						}

						$alert.classList.add('show');
					} else {
						if (typeof data === 'string') $alert.innerHTML = data;
						else $alert.innerHTML = data.msg;
					}
				} else {
					if (typeof data === 'string') el.innerHTML = data;
					else el.innerHTML = data.msg;
				}
			}
		}

		_drawAlertBlock(form) {
			const _this = this;

			let el = form.querySelector('.' + _this.classes.alert.block);
			if (!el) {
				let elFormID = document.querySelector('[data-form="' + form.id + '"]');

				if (!elFormID) {
					let elBlock = document.createElement('div');
					elBlock.classList.add(_this.classes.alert.block);
					elBlock.innerHTML = '<div class="close"><a href="#" data-dismiss="alert-block">' + svg.cross + '</a></div>' +
						'<div class="vg-alert vg-alert-danger">' +
						'					<div class="svg-area">' + svg.error + '</div>' +
						'					<div class="content-area">' +
						'						<div class="title-area" data-alert-danger-title></div>' +
						'						<div class="text-area" data-alert-danger-text></div>' +
						'					</div>' +
						'				</div>' +
						'				<div class="vg-alert vg-alert-success">' +
						'					<div class="svg-area">' + svg.success + '</div>' +
						'					<div class="content-area">' +
						'						<div class="title-area" data-alert-success-title></div>' +
						'						<div class="text-area" data-alert-success-text></div>' +
						'					</div>' +
						'				</div>';
					form.prepend(elBlock);
					el = elBlock;
				} else {
					el = elFormID;
				}
			}

			return el;
		}

		_drawAlertModal() {
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
					'            <button type="button" class="modal-close" data-bs-dismiss="modal" aria-label="Close">' + svg.cross + '</button>' +
					'            <div class="vg-alert-content">' +
					'                <div class="vg-alert vg-alert-danger">' +
					'                     <div class="svg-area">' + svg.error + '</div>' +
					'                     <div class="title-area" data-alert-danger-title></div>' +
					'                     <div class="text-area" data-alert-danger-text></div>' +
					'                </div>' +
					'                <div class="vg-alert vg-alert-success">' +
					'                     <div class="svg-area">' + svg.success + '</div>' +
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

	exports.VGFormSender = VGFormSender;

})(this.window = this.window || {});
