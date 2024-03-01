(function (exports, Popper) {
	'use strict';

	function _interopNamespace(e) {
		if (e && e.__esModule) return e;
		var n = Object.create(null);
		if (e) {
			Object.keys(e).forEach(function (k) {
				if (k !== 'default') {
					var d = Object.getOwnPropertyDescriptor(e, k);
					Object.defineProperty(n, k, d.get ? d : {
						enumerable: true,
						get: function () { return e[k]; }
					});
				}
			});
		}
		n["default"] = e;
		return Object.freeze(n);
	}

	var Popper__namespace = /*#__PURE__*/_interopNamespace(Popper);

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

	/*!
	  * Bootstrap v5.3.3 (https://getbootstrap.com/)
	  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */
	const elementMap=new Map,Data={set(e,t,n){elementMap.has(e)||elementMap.set(e,new Map);const i=elementMap.get(e);i.has(t)||0===i.size?i.set(t,n):console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(i.keys())[0]}.`);},get:(e,t)=>elementMap.has(e)&&elementMap.get(e).get(t)||null,remove(e,t){if(!elementMap.has(e))return;const n=elementMap.get(e);n.delete(t),0===n.size&&elementMap.delete(e);}},TRANSITION_END="transitionend",parseSelector=e=>(e&&window.CSS&&window.CSS.escape&&(e=e.replace(/#([^\s"#']+)/g,((e,t)=>`#${CSS.escape(t)}`))),e),toType=e=>null==e?`${e}`:Object.prototype.toString.call(e).match(/\s([a-z]+)/i)[1].toLowerCase(),getUID=e=>{do{e+=Math.floor(1e6*Math.random());}while(document.getElementById(e));return e},getTransitionDurationFromElement=e=>{if(!e)return 0;let{transitionDuration:t,transitionDelay:n}=window.getComputedStyle(e);const i=Number.parseFloat(t),s=Number.parseFloat(n);return i||s?(t=t.split(",")[0],n=n.split(",")[0],1e3*(Number.parseFloat(t)+Number.parseFloat(n))):0},triggerTransitionEnd=e=>{e.dispatchEvent(new Event(TRANSITION_END));},isElement=e=>!(!e||"object"!=typeof e)&&(void 0!==e.jquery&&(e=e[0]),void 0!==e.nodeType),getElement=e=>isElement(e)?e.jquery?e[0]:e:"string"==typeof e&&e.length>0?document.querySelector(parseSelector(e)):null,isVisible=e=>{if(!isElement(e)||0===e.getClientRects().length)return !1;const t="visible"===getComputedStyle(e).getPropertyValue("visibility"),n=e.closest("details:not([open])");if(!n)return t;if(n!==e){const t=e.closest("summary");if(t&&t.parentNode!==n)return !1;if(null===t)return !1}return t},isDisabled=e=>!e||e.nodeType!==Node.ELEMENT_NODE||!!e.classList.contains("disabled")||(void 0!==e.disabled?e.disabled:e.hasAttribute("disabled")&&"false"!==e.getAttribute("disabled")),findShadowRoot=e=>{if(!document.documentElement.attachShadow)return null;if("function"==typeof e.getRootNode){const t=e.getRootNode();return t instanceof ShadowRoot?t:null}return e instanceof ShadowRoot?e:e.parentNode?findShadowRoot(e.parentNode):null},noop=()=>{},reflow=e=>{e.offsetHeight;},getjQuery=()=>window.jQuery&&!document.body.hasAttribute("data-bs-no-jquery")?window.jQuery:null,DOMContentLoadedCallbacks=[],onDOMContentLoaded=e=>{"loading"===document.readyState?(DOMContentLoadedCallbacks.length||document.addEventListener("DOMContentLoaded",(()=>{for(const e of DOMContentLoadedCallbacks)e();})),DOMContentLoadedCallbacks.push(e)):e();},isRTL=()=>"rtl"===document.documentElement.dir,defineJQueryPlugin=e=>{onDOMContentLoaded((()=>{const t=getjQuery();if(t){const n=e.NAME,i=t.fn[n];t.fn[n]=e.jQueryInterface,t.fn[n].Constructor=e,t.fn[n].noConflict=()=>(t.fn[n]=i,e.jQueryInterface);}}));},execute=(e,t=[],n=e)=>"function"==typeof e?e(...t):n,executeAfterTransition=(e,t,n=!0)=>{if(!n)return void execute(e);const i=getTransitionDurationFromElement(t)+5;let s=!1;const o=({target:n})=>{n===t&&(s=!0,t.removeEventListener(TRANSITION_END,o),execute(e));};t.addEventListener(TRANSITION_END,o),setTimeout((()=>{s||triggerTransitionEnd(t);}),i);},getNextActiveElement=(e,t,n,i)=>{const s=e.length;let o=e.indexOf(t);return -1===o?!n&&i?e[s-1]:e[0]:(o+=n?1:-1,i&&(o=(o+s)%s),e[Math.max(0,Math.min(o,s-1))])},namespaceRegex=/[^.]*(?=\..*)\.|.*/,stripNameRegex=/\..*/,stripUidRegex=/::\d+$/,eventRegistry={};let uidEvent=1;const customEvents={mouseenter:"mouseover",mouseleave:"mouseout"},nativeEvents=new Set(["click","dblclick","mouseup","mousedown","contextmenu","mousewheel","DOMMouseScroll","mouseover","mouseout","mousemove","selectstart","selectend","keydown","keypress","keyup","orientationchange","touchstart","touchmove","touchend","touchcancel","pointerdown","pointermove","pointerup","pointerleave","pointercancel","gesturestart","gesturechange","gestureend","focus","blur","change","reset","select","submit","focusin","focusout","load","unload","beforeunload","resize","move","DOMContentLoaded","readystatechange","error","abort","scroll"]);function makeEventUid(e,t){return t&&`${t}::${uidEvent++}`||e.uidEvent||uidEvent++}function getElementEvents(e){const t=makeEventUid(e);return e.uidEvent=t,eventRegistry[t]=eventRegistry[t]||{},eventRegistry[t]}function bootstrapHandler(e,t){return function n(i){return hydrateObj(i,{delegateTarget:e}),n.oneOff&&EventHandler.off(e,i.type,t),t.apply(e,[i])}}function bootstrapDelegationHandler(e,t,n){return function i(s){const o=e.querySelectorAll(t);for(let{target:r}=s;r&&r!==this;r=r.parentNode)for(const a of o)if(a===r)return hydrateObj(s,{delegateTarget:r}),i.oneOff&&EventHandler.off(e,s.type,t,n),n.apply(r,[s])}}function findHandler(e,t,n=null){return Object.values(e).find((e=>e.callable===t&&e.delegationSelector===n))}function normalizeParameters(e,t,n){const i="string"==typeof t,s=i?n:t||n;let o=getTypeEvent(e);return nativeEvents.has(o)||(o=e),[i,s,o]}function addHandler(e,t,n,i,s){if("string"!=typeof t||!e)return;let[o,r,a]=normalizeParameters(t,n,i);if(t in customEvents){const e=e=>function(t){if(!t.relatedTarget||t.relatedTarget!==t.delegateTarget&&!t.delegateTarget.contains(t.relatedTarget))return e.call(this,t)};r=e(r);}const l=getElementEvents(e),c=l[a]||(l[a]={}),_=findHandler(c,r,o?n:null);if(_)return void(_.oneOff=_.oneOff&&s);const E=makeEventUid(r,t.replace(namespaceRegex,"")),h=o?bootstrapDelegationHandler(e,n,r):bootstrapHandler(e,r);h.delegationSelector=o?n:null,h.callable=r,h.oneOff=s,h.uidEvent=E,c[E]=h,e.addEventListener(a,h,o);}function removeHandler(e,t,n,i,s){const o=findHandler(t[n],i,s);o&&(e.removeEventListener(n,o,Boolean(s)),delete t[n][o.uidEvent]);}function removeNamespacedHandlers(e,t,n,i){const s=t[n]||{};for(const[o,r]of Object.entries(s))o.includes(i)&&removeHandler(e,t,n,r.callable,r.delegationSelector);}function getTypeEvent(e){return e=e.replace(stripNameRegex,""),customEvents[e]||e}const EventHandler={on(e,t,n,i){addHandler(e,t,n,i,!1);},one(e,t,n,i){addHandler(e,t,n,i,!0);},off(e,t,n,i){if("string"!=typeof t||!e)return;const[s,o,r]=normalizeParameters(t,n,i),a=r!==t,l=getElementEvents(e),c=l[r]||{},_=t.startsWith(".");if(void 0===o){if(_)for(const n of Object.keys(l))removeNamespacedHandlers(e,l,n,t.slice(1));for(const[n,i]of Object.entries(c)){const s=n.replace(stripUidRegex,"");a&&!t.includes(s)||removeHandler(e,l,r,i.callable,i.delegationSelector);}}else {if(!Object.keys(c).length)return;removeHandler(e,l,r,o,s?n:null);}},trigger(e,t,n){if("string"!=typeof t||!e)return null;const i=getjQuery();let s=null,o=!0,r=!0,a=!1;t!==getTypeEvent(t)&&i&&(s=i.Event(t,n),i(e).trigger(s),o=!s.isPropagationStopped(),r=!s.isImmediatePropagationStopped(),a=s.isDefaultPrevented());const l=hydrateObj(new Event(t,{bubbles:o,cancelable:!0}),n);return a&&l.preventDefault(),r&&e.dispatchEvent(l),l.defaultPrevented&&s&&s.preventDefault(),l}};function hydrateObj(e,t={}){for(const[n,i]of Object.entries(t))try{e[n]=i;}catch(t){Object.defineProperty(e,n,{configurable:!0,get:()=>i});}return e}function normalizeData(e){if("true"===e)return !0;if("false"===e)return !1;if(e===Number(e).toString())return Number(e);if(""===e||"null"===e)return null;if("string"!=typeof e)return e;try{return JSON.parse(decodeURIComponent(e))}catch(t){return e}}function normalizeDataKey(e){return e.replace(/[A-Z]/g,(e=>`-${e.toLowerCase()}`))}const Manipulator={setDataAttribute(e,t,n){e.setAttribute(`data-bs-${normalizeDataKey(t)}`,n);},removeDataAttribute(e,t){e.removeAttribute(`data-bs-${normalizeDataKey(t)}`);},getDataAttributes(e){if(!e)return {};const t={},n=Object.keys(e.dataset).filter((e=>e.startsWith("bs")&&!e.startsWith("bsConfig")));for(const i of n){let n=i.replace(/^bs/,"");n=n.charAt(0).toLowerCase()+n.slice(1,n.length),t[n]=normalizeData(e.dataset[i]);}return t},getDataAttribute:(e,t)=>normalizeData(e.getAttribute(`data-bs-${normalizeDataKey(t)}`))};class Config{static get Default(){return {}}static get DefaultType(){return {}}static get NAME(){throw new Error('You have to implement the static method "NAME", for each component!')}_getConfig(e){return e=this._mergeConfigObj(e),e=this._configAfterMerge(e),this._typeCheckConfig(e),e}_configAfterMerge(e){return e}_mergeConfigObj(e,t){const n=isElement(t)?Manipulator.getDataAttribute(t,"config"):{};return {...this.constructor.Default,..."object"==typeof n?n:{},...isElement(t)?Manipulator.getDataAttributes(t):{},..."object"==typeof e?e:{}}}_typeCheckConfig(e,t=this.constructor.DefaultType){for(const[n,i]of Object.entries(t)){const t=e[n],s=isElement(t)?"element":toType(t);if(!new RegExp(i).test(s))throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${n}" provided type "${s}" but expected type "${i}".`)}}}class BaseComponent extends Config{constructor(e,t){super(),(e=getElement(e))&&(this._element=e,this._config=this._getConfig(t),Data.set(this._element,this.constructor.DATA_KEY,this));}dispose(){Data.remove(this._element,this.constructor.DATA_KEY),EventHandler.off(this._element,this.constructor.EVENT_KEY);for(const e of Object.getOwnPropertyNames(this))this[e]=null;}_queueCallback(e,t,n=!0){executeAfterTransition(e,t,n);}_getConfig(e){return e=this._mergeConfigObj(e,this._element),e=this._configAfterMerge(e),this._typeCheckConfig(e),e}static getInstance(e){return Data.get(getElement(e),this.DATA_KEY)}static getOrCreateInstance(e,t={}){return this.getInstance(e)||new this(e,"object"==typeof t?t:null)}static get VERSION(){return "5.3.3"}static get DATA_KEY(){return `bs.${this.NAME}`}static get EVENT_KEY(){return `.${this.DATA_KEY}`}static eventName(e){return `${e}${this.EVENT_KEY}`}}const getSelector=e=>{let t=e.getAttribute("data-bs-target");if(!t||"#"===t){let n=e.getAttribute("href");if(!n||!n.includes("#")&&!n.startsWith("."))return null;n.includes("#")&&!n.startsWith("#")&&(n=`#${n.split("#")[1]}`),t=n&&"#"!==n?n.trim():null;}return t?t.split(",").map((e=>parseSelector(e))).join(","):null},SelectorEngine={find:(e,t=document.documentElement)=>[].concat(...Element.prototype.querySelectorAll.call(t,e)),findOne:(e,t=document.documentElement)=>Element.prototype.querySelector.call(t,e),children:(e,t)=>[].concat(...e.children).filter((e=>e.matches(t))),parents(e,t){const n=[];let i=e.parentNode.closest(t);for(;i;)n.push(i),i=i.parentNode.closest(t);return n},prev(e,t){let n=e.previousElementSibling;for(;n;){if(n.matches(t))return [n];n=n.previousElementSibling;}return []},next(e,t){let n=e.nextElementSibling;for(;n;){if(n.matches(t))return [n];n=n.nextElementSibling;}return []},focusableChildren(e){const t=["a","button","input","textarea","select","details","[tabindex]",'[contenteditable="true"]'].map((e=>`${e}:not([tabindex^="-"])`)).join(",");return this.find(t,e).filter((e=>!isDisabled(e)&&isVisible(e)))},getSelectorFromElement(e){const t=getSelector(e);return t&&SelectorEngine.findOne(t)?t:null},getElementFromSelector(e){const t=getSelector(e);return t?SelectorEngine.findOne(t):null},getMultipleElementsFromSelector(e){const t=getSelector(e);return t?SelectorEngine.find(t):[]}},enableDismissTrigger=(e,t="hide")=>{const n=`click.dismiss${e.EVENT_KEY}`,i=e.NAME;EventHandler.on(document,n,`[data-bs-dismiss="${i}"]`,(function(n){if(["A","AREA"].includes(this.tagName)&&n.preventDefault(),isDisabled(this))return;const s=SelectorEngine.getElementFromSelector(this)||this.closest(`.${i}`);e.getOrCreateInstance(s)[t]();}));},NAME$f="alert",EVENT_CLOSE="close.bs.alert",EVENT_CLOSED="closed.bs.alert";class Alert extends BaseComponent{static get NAME(){return NAME$f}close(){if(EventHandler.trigger(this._element,EVENT_CLOSE).defaultPrevented)return;this._element.classList.remove("show");const e=this._element.classList.contains("fade");this._queueCallback((()=>this._destroyElement()),this._element,e);}_destroyElement(){this._element.remove(),EventHandler.trigger(this._element,EVENT_CLOSED),this.dispose();}static jQueryInterface(e){return this.each((function(){const t=Alert.getOrCreateInstance(this);if("string"==typeof e){if(void 0===t[e]||e.startsWith("_")||"constructor"===e)throw new TypeError(`No method named "${e}"`);t[e](this);}}))}}enableDismissTrigger(Alert,"close"),defineJQueryPlugin(Alert);const NAME$e="button",DATA_KEY$9="bs.button",EVENT_KEY$a=`.${DATA_KEY$9}`,SELECTOR_DATA_TOGGLE$5='[data-bs-toggle="button"]',EVENT_CLICK_DATA_API$6=`click${EVENT_KEY$a}.data-api`;class Button extends BaseComponent{static get NAME(){return NAME$e}toggle(){this._element.setAttribute("aria-pressed",this._element.classList.toggle("active"));}static jQueryInterface(e){return this.each((function(){const t=Button.getOrCreateInstance(this);"toggle"===e&&t[e]();}))}}EventHandler.on(document,EVENT_CLICK_DATA_API$6,SELECTOR_DATA_TOGGLE$5,(e=>{e.preventDefault();const t=e.target.closest(SELECTOR_DATA_TOGGLE$5);Button.getOrCreateInstance(t).toggle();})),defineJQueryPlugin(Button);const NAME$d="swipe",EVENT_TOUCHSTART="touchstart.bs.swipe",EVENT_TOUCHMOVE="touchmove.bs.swipe",EVENT_TOUCHEND="touchend.bs.swipe",EVENT_POINTERDOWN="pointerdown.bs.swipe",EVENT_POINTERUP="pointerup.bs.swipe",Default$c={endCallback:null,leftCallback:null,rightCallback:null},DefaultType$c={endCallback:"(function|null)",leftCallback:"(function|null)",rightCallback:"(function|null)"};class Swipe extends Config{constructor(e,t){super(),this._element=e,e&&Swipe.isSupported()&&(this._config=this._getConfig(t),this._deltaX=0,this._supportPointerEvents=Boolean(window.PointerEvent),this._initEvents());}static get Default(){return Default$c}static get DefaultType(){return DefaultType$c}static get NAME(){return NAME$d}dispose(){EventHandler.off(this._element,".bs.swipe");}_start(e){this._supportPointerEvents?this._eventIsPointerPenTouch(e)&&(this._deltaX=e.clientX):this._deltaX=e.touches[0].clientX;}_end(e){this._eventIsPointerPenTouch(e)&&(this._deltaX=e.clientX-this._deltaX),this._handleSwipe(),execute(this._config.endCallback);}_move(e){this._deltaX=e.touches&&e.touches.length>1?0:e.touches[0].clientX-this._deltaX;}_handleSwipe(){const e=Math.abs(this._deltaX);if(e<=40)return;const t=e/this._deltaX;this._deltaX=0,t&&execute(t>0?this._config.rightCallback:this._config.leftCallback);}_initEvents(){this._supportPointerEvents?(EventHandler.on(this._element,EVENT_POINTERDOWN,(e=>this._start(e))),EventHandler.on(this._element,EVENT_POINTERUP,(e=>this._end(e))),this._element.classList.add("pointer-event")):(EventHandler.on(this._element,EVENT_TOUCHSTART,(e=>this._start(e))),EventHandler.on(this._element,EVENT_TOUCHMOVE,(e=>this._move(e))),EventHandler.on(this._element,EVENT_TOUCHEND,(e=>this._end(e))));}_eventIsPointerPenTouch(e){return this._supportPointerEvents&&("pen"===e.pointerType||"touch"===e.pointerType)}static isSupported(){return "ontouchstart"in document.documentElement||navigator.maxTouchPoints>0}}const NAME$c="carousel",DATA_KEY$8="bs.carousel",EVENT_KEY$8=`.${DATA_KEY$8}`,EVENT_SLIDE=`slide${EVENT_KEY$8}`,EVENT_SLID=`slid${EVENT_KEY$8}`,EVENT_KEYDOWN$1=`keydown${EVENT_KEY$8}`,EVENT_MOUSEENTER$1=`mouseenter${EVENT_KEY$8}`,EVENT_MOUSELEAVE$1=`mouseleave${EVENT_KEY$8}`,EVENT_DRAG_START=`dragstart${EVENT_KEY$8}`,EVENT_LOAD_DATA_API$3=`load${EVENT_KEY$8}.data-api`,EVENT_CLICK_DATA_API$5=`click${EVENT_KEY$8}.data-api`,CLASS_NAME_END="carousel-item-end",CLASS_NAME_START="carousel-item-start",CLASS_NAME_NEXT="carousel-item-next",CLASS_NAME_PREV="carousel-item-prev",SELECTOR_ITEM=".carousel-item",SELECTOR_ACTIVE_ITEM=".active.carousel-item",SELECTOR_ITEM_IMG=".carousel-item img",SELECTOR_INDICATORS=".carousel-indicators",SELECTOR_DATA_SLIDE="[data-bs-slide], [data-bs-slide-to]",SELECTOR_DATA_RIDE='[data-bs-ride="carousel"]',KEY_TO_DIRECTION={ArrowLeft:"right",ArrowRight:"left"},Default$b={interval:5e3,keyboard:!0,pause:"hover",ride:!1,touch:!0,wrap:!0},DefaultType$b={interval:"(number|boolean)",keyboard:"boolean",pause:"(string|boolean)",ride:"(boolean|string)",touch:"boolean",wrap:"boolean"};class Carousel extends BaseComponent{constructor(e,t){super(e,t),this._interval=null,this._activeElement=null,this._isSliding=!1,this.touchTimeout=null,this._swipeHelper=null,this._indicatorsElement=SelectorEngine.findOne(SELECTOR_INDICATORS,this._element),this._addEventListeners(),"carousel"===this._config.ride&&this.cycle();}static get Default(){return Default$b}static get DefaultType(){return DefaultType$b}static get NAME(){return NAME$c}next(){this._slide("next");}nextWhenVisible(){!document.hidden&&isVisible(this._element)&&this.next();}prev(){this._slide("prev");}pause(){this._isSliding&&triggerTransitionEnd(this._element),this._clearInterval();}cycle(){this._clearInterval(),this._updateInterval(),this._interval=setInterval((()=>this.nextWhenVisible()),this._config.interval);}_maybeEnableCycle(){this._config.ride&&(this._isSliding?EventHandler.one(this._element,EVENT_SLID,(()=>this.cycle())):this.cycle());}to(e){const t=this._getItems();if(e>t.length-1||e<0)return;if(this._isSliding)return void EventHandler.one(this._element,EVENT_SLID,(()=>this.to(e)));const n=this._getItemIndex(this._getActive());if(n===e)return;const i=e>n?"next":"prev";this._slide(i,t[e]);}dispose(){this._swipeHelper&&this._swipeHelper.dispose(),super.dispose();}_configAfterMerge(e){return e.defaultInterval=e.interval,e}_addEventListeners(){this._config.keyboard&&EventHandler.on(this._element,EVENT_KEYDOWN$1,(e=>this._keydown(e))),"hover"===this._config.pause&&(EventHandler.on(this._element,EVENT_MOUSEENTER$1,(()=>this.pause())),EventHandler.on(this._element,EVENT_MOUSELEAVE$1,(()=>this._maybeEnableCycle()))),this._config.touch&&Swipe.isSupported()&&this._addTouchEventListeners();}_addTouchEventListeners(){for(const e of SelectorEngine.find(SELECTOR_ITEM_IMG,this._element))EventHandler.on(e,EVENT_DRAG_START,(e=>e.preventDefault()));const e={leftCallback:()=>this._slide(this._directionToOrder("left")),rightCallback:()=>this._slide(this._directionToOrder("right")),endCallback:()=>{"hover"===this._config.pause&&(this.pause(),this.touchTimeout&&clearTimeout(this.touchTimeout),this.touchTimeout=setTimeout((()=>this._maybeEnableCycle()),500+this._config.interval));}};this._swipeHelper=new Swipe(this._element,e);}_keydown(e){if(/input|textarea/i.test(e.target.tagName))return;const t=KEY_TO_DIRECTION[e.key];t&&(e.preventDefault(),this._slide(this._directionToOrder(t)));}_getItemIndex(e){return this._getItems().indexOf(e)}_setActiveIndicatorElement(e){if(!this._indicatorsElement)return;const t=SelectorEngine.findOne(".active",this._indicatorsElement);t.classList.remove("active"),t.removeAttribute("aria-current");const n=SelectorEngine.findOne(`[data-bs-slide-to="${e}"]`,this._indicatorsElement);n&&(n.classList.add("active"),n.setAttribute("aria-current","true"));}_updateInterval(){const e=this._activeElement||this._getActive();if(!e)return;const t=Number.parseInt(e.getAttribute("data-bs-interval"),10);this._config.interval=t||this._config.defaultInterval;}_slide(e,t=null){if(this._isSliding)return;const n=this._getActive(),i="next"===e,s=t||getNextActiveElement(this._getItems(),n,i,this._config.wrap);if(s===n)return;const o=this._getItemIndex(s),r=t=>EventHandler.trigger(this._element,t,{relatedTarget:s,direction:this._orderToDirection(e),from:this._getItemIndex(n),to:o});if(r(EVENT_SLIDE).defaultPrevented)return;if(!n||!s)return;const a=Boolean(this._interval);this.pause(),this._isSliding=!0,this._setActiveIndicatorElement(o),this._activeElement=s;const l=i?CLASS_NAME_START:CLASS_NAME_END,c=i?CLASS_NAME_NEXT:CLASS_NAME_PREV;s.classList.add(c),reflow(s),n.classList.add(l),s.classList.add(l),this._queueCallback((()=>{s.classList.remove(l,c),s.classList.add("active"),n.classList.remove("active",c,l),this._isSliding=!1,r(EVENT_SLID);}),n,this._isAnimated()),a&&this.cycle();}_isAnimated(){return this._element.classList.contains("slide")}_getActive(){return SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM,this._element)}_getItems(){return SelectorEngine.find(SELECTOR_ITEM,this._element)}_clearInterval(){this._interval&&(clearInterval(this._interval),this._interval=null);}_directionToOrder(e){return isRTL()?"left"===e?"prev":"next":"left"===e?"next":"prev"}_orderToDirection(e){return isRTL()?"prev"===e?"left":"right":"prev"===e?"right":"left"}static jQueryInterface(e){return this.each((function(){const t=Carousel.getOrCreateInstance(this,e);if("number"!=typeof e){if("string"==typeof e){if(void 0===t[e]||e.startsWith("_")||"constructor"===e)throw new TypeError(`No method named "${e}"`);t[e]();}}else t.to(e);}))}}EventHandler.on(document,EVENT_CLICK_DATA_API$5,SELECTOR_DATA_SLIDE,(function(e){const t=SelectorEngine.getElementFromSelector(this);if(!t||!t.classList.contains("carousel"))return;e.preventDefault();const n=Carousel.getOrCreateInstance(t),i=this.getAttribute("data-bs-slide-to");return i?(n.to(i),void n._maybeEnableCycle()):"next"===Manipulator.getDataAttribute(this,"slide")?(n.next(),void n._maybeEnableCycle()):(n.prev(),void n._maybeEnableCycle())})),EventHandler.on(window,EVENT_LOAD_DATA_API$3,(()=>{const e=SelectorEngine.find(SELECTOR_DATA_RIDE);for(const t of e)Carousel.getOrCreateInstance(t);})),defineJQueryPlugin(Carousel);const NAME$b="collapse",DATA_KEY$7="bs.collapse",EVENT_KEY$7=`.${DATA_KEY$7}`,EVENT_SHOW$6=`show${EVENT_KEY$7}`,EVENT_SHOWN$6=`shown${EVENT_KEY$7}`,EVENT_HIDE$6=`hide${EVENT_KEY$7}`,EVENT_HIDDEN$6=`hidden${EVENT_KEY$7}`,EVENT_CLICK_DATA_API$4=`click${EVENT_KEY$7}.data-api`,CLASS_NAME_DEEPER_CHILDREN=":scope .collapse .collapse",WIDTH="width",HEIGHT="height",SELECTOR_ACTIVES=".collapse.show, .collapse.collapsing",SELECTOR_DATA_TOGGLE$4='[data-bs-toggle="collapse"]',Default$a={parent:null,toggle:!0},DefaultType$a={parent:"(null|element)",toggle:"boolean"};class Collapse extends BaseComponent{constructor(e,t){super(e,t),this._isTransitioning=!1,this._triggerArray=[];const n=SelectorEngine.find(SELECTOR_DATA_TOGGLE$4);for(const e of n){const t=SelectorEngine.getSelectorFromElement(e),n=SelectorEngine.find(t).filter((e=>e===this._element));null!==t&&n.length&&this._triggerArray.push(e);}this._initializeChildren(),this._config.parent||this._addAriaAndCollapsedClass(this._triggerArray,this._isShown()),this._config.toggle&&this.toggle();}static get Default(){return Default$a}static get DefaultType(){return DefaultType$a}static get NAME(){return NAME$b}toggle(){this._isShown()?this.hide():this.show();}show(){if(this._isTransitioning||this._isShown())return;let e=[];if(this._config.parent&&(e=this._getFirstLevelChildren(SELECTOR_ACTIVES).filter((e=>e!==this._element)).map((e=>Collapse.getOrCreateInstance(e,{toggle:!1})))),e.length&&e[0]._isTransitioning)return;if(EventHandler.trigger(this._element,EVENT_SHOW$6).defaultPrevented)return;for(const t of e)t.hide();const t=this._getDimension();this._element.classList.remove("collapse"),this._element.classList.add("collapsing"),this._element.style[t]=0,this._addAriaAndCollapsedClass(this._triggerArray,!0),this._isTransitioning=!0;const n=`scroll${t[0].toUpperCase()+t.slice(1)}`;this._queueCallback((()=>{this._isTransitioning=!1,this._element.classList.remove("collapsing"),this._element.classList.add("collapse","show"),this._element.style[t]="",EventHandler.trigger(this._element,EVENT_SHOWN$6);}),this._element,!0),this._element.style[t]=`${this._element[n]}px`;}hide(){if(this._isTransitioning||!this._isShown())return;if(EventHandler.trigger(this._element,EVENT_HIDE$6).defaultPrevented)return;const e=this._getDimension();this._element.style[e]=`${this._element.getBoundingClientRect()[e]}px`,reflow(this._element),this._element.classList.add("collapsing"),this._element.classList.remove("collapse","show");for(const e of this._triggerArray){const t=SelectorEngine.getElementFromSelector(e);t&&!this._isShown(t)&&this._addAriaAndCollapsedClass([e],!1);}this._isTransitioning=!0,this._element.style[e]="",this._queueCallback((()=>{this._isTransitioning=!1,this._element.classList.remove("collapsing"),this._element.classList.add("collapse"),EventHandler.trigger(this._element,EVENT_HIDDEN$6);}),this._element,!0);}_isShown(e=this._element){return e.classList.contains("show")}_configAfterMerge(e){return e.toggle=Boolean(e.toggle),e.parent=getElement(e.parent),e}_getDimension(){return this._element.classList.contains("collapse-horizontal")?WIDTH:HEIGHT}_initializeChildren(){if(!this._config.parent)return;const e=this._getFirstLevelChildren(SELECTOR_DATA_TOGGLE$4);for(const t of e){const e=SelectorEngine.getElementFromSelector(t);e&&this._addAriaAndCollapsedClass([t],this._isShown(e));}}_getFirstLevelChildren(e){const t=SelectorEngine.find(CLASS_NAME_DEEPER_CHILDREN,this._config.parent);return SelectorEngine.find(e,this._config.parent).filter((e=>!t.includes(e)))}_addAriaAndCollapsedClass(e,t){if(e.length)for(const n of e)n.classList.toggle("collapsed",!t),n.setAttribute("aria-expanded",t);}static jQueryInterface(e){const t={};return "string"==typeof e&&/show|hide/.test(e)&&(t.toggle=!1),this.each((function(){const n=Collapse.getOrCreateInstance(this,t);if("string"==typeof e){if(void 0===n[e])throw new TypeError(`No method named "${e}"`);n[e]();}}))}}EventHandler.on(document,EVENT_CLICK_DATA_API$4,SELECTOR_DATA_TOGGLE$4,(function(e){("A"===e.target.tagName||e.delegateTarget&&"A"===e.delegateTarget.tagName)&&e.preventDefault();for(const e of SelectorEngine.getMultipleElementsFromSelector(this))Collapse.getOrCreateInstance(e,{toggle:!1}).toggle();})),defineJQueryPlugin(Collapse);const NAME$a="dropdown",DATA_KEY$6="bs.dropdown",EVENT_KEY$6=`.${DATA_KEY$6}`,ARROW_UP_KEY$1="ArrowUp",ARROW_DOWN_KEY$1="ArrowDown",EVENT_HIDE$5=`hide${EVENT_KEY$6}`,EVENT_HIDDEN$5=`hidden${EVENT_KEY$6}`,EVENT_SHOW$5=`show${EVENT_KEY$6}`,EVENT_SHOWN$5=`shown${EVENT_KEY$6}`,EVENT_CLICK_DATA_API$3=`click${EVENT_KEY$6}.data-api`,EVENT_KEYDOWN_DATA_API=`keydown${EVENT_KEY$6}.data-api`,EVENT_KEYUP_DATA_API=`keyup${EVENT_KEY$6}.data-api`,SELECTOR_DATA_TOGGLE$3='[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)',SELECTOR_DATA_TOGGLE_SHOWN=`${SELECTOR_DATA_TOGGLE$3}.show`,SELECTOR_MENU=".dropdown-menu",SELECTOR_VISIBLE_ITEMS=".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",PLACEMENT_TOP=isRTL()?"top-end":"top-start",PLACEMENT_TOPEND=isRTL()?"top-start":"top-end",PLACEMENT_BOTTOM=isRTL()?"bottom-end":"bottom-start",PLACEMENT_BOTTOMEND=isRTL()?"bottom-start":"bottom-end",PLACEMENT_RIGHT=isRTL()?"left-start":"right-start",PLACEMENT_LEFT=isRTL()?"right-start":"left-start",Default$9={autoClose:!0,boundary:"clippingParents",display:"dynamic",offset:[0,2],popperConfig:null,reference:"toggle"},DefaultType$9={autoClose:"(boolean|string)",boundary:"(string|element)",display:"string",offset:"(array|string|function)",popperConfig:"(null|object|function)",reference:"(string|element|object)"};class Dropdown extends BaseComponent{constructor(e,t){super(e,t),this._popper=null,this._parent=this._element.parentNode,this._menu=SelectorEngine.next(this._element,SELECTOR_MENU)[0]||SelectorEngine.prev(this._element,SELECTOR_MENU)[0]||SelectorEngine.findOne(SELECTOR_MENU,this._parent),this._inNavbar=this._detectNavbar();}static get Default(){return Default$9}static get DefaultType(){return DefaultType$9}static get NAME(){return NAME$a}toggle(){return this._isShown()?this.hide():this.show()}show(){if(isDisabled(this._element)||this._isShown())return;const e={relatedTarget:this._element};if(!EventHandler.trigger(this._element,EVENT_SHOW$5,e).defaultPrevented){if(this._createPopper(),"ontouchstart"in document.documentElement&&!this._parent.closest(".navbar-nav"))for(const e of [].concat(...document.body.children))EventHandler.on(e,"mouseover",noop);this._element.focus(),this._element.setAttribute("aria-expanded",!0),this._menu.classList.add("show"),this._element.classList.add("show"),EventHandler.trigger(this._element,EVENT_SHOWN$5,e);}}hide(){if(isDisabled(this._element)||!this._isShown())return;const e={relatedTarget:this._element};this._completeHide(e);}dispose(){this._popper&&this._popper.destroy(),super.dispose();}update(){this._inNavbar=this._detectNavbar(),this._popper&&this._popper.update();}_completeHide(e){if(!EventHandler.trigger(this._element,EVENT_HIDE$5,e).defaultPrevented){if("ontouchstart"in document.documentElement)for(const e of [].concat(...document.body.children))EventHandler.off(e,"mouseover",noop);this._popper&&this._popper.destroy(),this._menu.classList.remove("show"),this._element.classList.remove("show"),this._element.setAttribute("aria-expanded","false"),Manipulator.removeDataAttribute(this._menu,"popper"),EventHandler.trigger(this._element,EVENT_HIDDEN$5,e);}}_getConfig(e){if("object"==typeof(e=super._getConfig(e)).reference&&!isElement(e.reference)&&"function"!=typeof e.reference.getBoundingClientRect)throw new TypeError(`${NAME$a.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);return e}_createPopper(){if(void 0===Popper__namespace)throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");let e=this._element;"parent"===this._config.reference?e=this._parent:isElement(this._config.reference)?e=getElement(this._config.reference):"object"==typeof this._config.reference&&(e=this._config.reference);const t=this._getPopperConfig();this._popper=Popper__namespace.createPopper(e,this._menu,t);}_isShown(){return this._menu.classList.contains("show")}_getPlacement(){const e=this._parent;if(e.classList.contains("dropend"))return PLACEMENT_RIGHT;if(e.classList.contains("dropstart"))return PLACEMENT_LEFT;if(e.classList.contains("dropup-center"))return "top";if(e.classList.contains("dropdown-center"))return "bottom";const t="end"===getComputedStyle(this._menu).getPropertyValue("--bs-position").trim();return e.classList.contains("dropup")?t?PLACEMENT_TOPEND:PLACEMENT_TOP:t?PLACEMENT_BOTTOMEND:PLACEMENT_BOTTOM}_detectNavbar(){return null!==this._element.closest(".navbar")}_getOffset(){const{offset:e}=this._config;return "string"==typeof e?e.split(",").map((e=>Number.parseInt(e,10))):"function"==typeof e?t=>e(t,this._element):e}_getPopperConfig(){const e={placement:this._getPlacement(),modifiers:[{name:"preventOverflow",options:{boundary:this._config.boundary}},{name:"offset",options:{offset:this._getOffset()}}]};return (this._inNavbar||"static"===this._config.display)&&(Manipulator.setDataAttribute(this._menu,"popper","static"),e.modifiers=[{name:"applyStyles",enabled:!1}]),{...e,...execute(this._config.popperConfig,[e])}}_selectMenuItem({key:e,target:t}){const n=SelectorEngine.find(SELECTOR_VISIBLE_ITEMS,this._menu).filter((e=>isVisible(e)));n.length&&getNextActiveElement(n,t,e===ARROW_DOWN_KEY$1,!n.includes(t)).focus();}static jQueryInterface(e){return this.each((function(){const t=Dropdown.getOrCreateInstance(this,e);if("string"==typeof e){if(void 0===t[e])throw new TypeError(`No method named "${e}"`);t[e]();}}))}static clearMenus(e){if(2===e.button||"keyup"===e.type&&"Tab"!==e.key)return;const t=SelectorEngine.find(SELECTOR_DATA_TOGGLE_SHOWN);for(const n of t){const t=Dropdown.getInstance(n);if(!t||!1===t._config.autoClose)continue;const i=e.composedPath(),s=i.includes(t._menu);if(i.includes(t._element)||"inside"===t._config.autoClose&&!s||"outside"===t._config.autoClose&&s)continue;if(t._menu.contains(e.target)&&("keyup"===e.type&&"Tab"===e.key||/input|select|option|textarea|form/i.test(e.target.tagName)))continue;const o={relatedTarget:t._element};"click"===e.type&&(o.clickEvent=e),t._completeHide(o);}}static dataApiKeydownHandler(e){const t=/input|textarea/i.test(e.target.tagName),n="Escape"===e.key,i=[ARROW_UP_KEY$1,ARROW_DOWN_KEY$1].includes(e.key);if(!i&&!n)return;if(t&&!n)return;e.preventDefault();const s=this.matches(SELECTOR_DATA_TOGGLE$3)?this:SelectorEngine.prev(this,SELECTOR_DATA_TOGGLE$3)[0]||SelectorEngine.next(this,SELECTOR_DATA_TOGGLE$3)[0]||SelectorEngine.findOne(SELECTOR_DATA_TOGGLE$3,e.delegateTarget.parentNode),o=Dropdown.getOrCreateInstance(s);if(i)return e.stopPropagation(),o.show(),void o._selectMenuItem(e);o._isShown()&&(e.stopPropagation(),o.hide(),s.focus());}}EventHandler.on(document,EVENT_KEYDOWN_DATA_API,SELECTOR_DATA_TOGGLE$3,Dropdown.dataApiKeydownHandler),EventHandler.on(document,EVENT_KEYDOWN_DATA_API,SELECTOR_MENU,Dropdown.dataApiKeydownHandler),EventHandler.on(document,EVENT_CLICK_DATA_API$3,Dropdown.clearMenus),EventHandler.on(document,EVENT_KEYUP_DATA_API,Dropdown.clearMenus),EventHandler.on(document,EVENT_CLICK_DATA_API$3,SELECTOR_DATA_TOGGLE$3,(function(e){e.preventDefault(),Dropdown.getOrCreateInstance(this).toggle();})),defineJQueryPlugin(Dropdown);const NAME$9="backdrop",EVENT_MOUSEDOWN=`mousedown.bs.${NAME$9}`,Default$8={className:"modal-backdrop",clickCallback:null,isAnimated:!1,isVisible:!0,rootElement:"body"},DefaultType$8={className:"string",clickCallback:"(function|null)",isAnimated:"boolean",isVisible:"boolean",rootElement:"(element|string)"};class Backdrop extends Config{constructor(e){super(),this._config=this._getConfig(e),this._isAppended=!1,this._element=null;}static get Default(){return Default$8}static get DefaultType(){return DefaultType$8}static get NAME(){return NAME$9}show(e){if(!this._config.isVisible)return void execute(e);this._append();const t=this._getElement();this._config.isAnimated&&reflow(t),t.classList.add("show"),this._emulateAnimation((()=>{execute(e);}));}hide(e){this._config.isVisible?(this._getElement().classList.remove("show"),this._emulateAnimation((()=>{this.dispose(),execute(e);}))):execute(e);}dispose(){this._isAppended&&(EventHandler.off(this._element,EVENT_MOUSEDOWN),this._element.remove(),this._isAppended=!1);}_getElement(){if(!this._element){const e=document.createElement("div");e.className=this._config.className,this._config.isAnimated&&e.classList.add("fade"),this._element=e;}return this._element}_configAfterMerge(e){return e.rootElement=getElement(e.rootElement),e}_append(){if(this._isAppended)return;const e=this._getElement();this._config.rootElement.append(e),EventHandler.on(e,EVENT_MOUSEDOWN,(()=>{execute(this._config.clickCallback);})),this._isAppended=!0;}_emulateAnimation(e){executeAfterTransition(e,this._getElement(),this._config.isAnimated);}}const NAME$8="focustrap",DATA_KEY$5="bs.focustrap",EVENT_KEY$5=`.${DATA_KEY$5}`,EVENT_FOCUSIN$2=`focusin${EVENT_KEY$5}`,EVENT_KEYDOWN_TAB=`keydown.tab${EVENT_KEY$5}`,Default$7={autofocus:!0,trapElement:null},DefaultType$7={autofocus:"boolean",trapElement:"element"};class FocusTrap extends Config{constructor(e){super(),this._config=this._getConfig(e),this._isActive=!1,this._lastTabNavDirection=null;}static get Default(){return Default$7}static get DefaultType(){return DefaultType$7}static get NAME(){return NAME$8}activate(){this._isActive||(this._config.autofocus&&this._config.trapElement.focus(),EventHandler.off(document,EVENT_KEY$5),EventHandler.on(document,EVENT_FOCUSIN$2,(e=>this._handleFocusin(e))),EventHandler.on(document,EVENT_KEYDOWN_TAB,(e=>this._handleKeydown(e))),this._isActive=!0);}deactivate(){this._isActive&&(this._isActive=!1,EventHandler.off(document,EVENT_KEY$5));}_handleFocusin(e){const{trapElement:t}=this._config;if(e.target===document||e.target===t||t.contains(e.target))return;const n=SelectorEngine.focusableChildren(t);0===n.length?t.focus():"backward"===this._lastTabNavDirection?n[n.length-1].focus():n[0].focus();}_handleKeydown(e){"Tab"===e.key&&(this._lastTabNavDirection=e.shiftKey?"backward":"forward");}}const SELECTOR_FIXED_CONTENT=".fixed-top, .fixed-bottom, .is-fixed, .sticky-top";class ScrollBarHelper{constructor(){this._element=document.body;}getWidth(){const e=document.documentElement.clientWidth;return Math.abs(window.innerWidth-e)}hide(){const e=this.getWidth();this._disableOverFlow(),this._setElementAttributes(this._element,"padding-right",(t=>t+e)),this._setElementAttributes(SELECTOR_FIXED_CONTENT,"padding-right",(t=>t+e)),this._setElementAttributes(".sticky-top","margin-right",(t=>t-e));}reset(){this._resetElementAttributes(this._element,"overflow"),this._resetElementAttributes(this._element,"padding-right"),this._resetElementAttributes(SELECTOR_FIXED_CONTENT,"padding-right"),this._resetElementAttributes(".sticky-top","margin-right");}isOverflowing(){return this.getWidth()>0}_disableOverFlow(){this._saveInitialAttribute(this._element,"overflow"),this._element.style.overflow="hidden";}_setElementAttributes(e,t,n){const i=this.getWidth();this._applyManipulationCallback(e,(e=>{if(e!==this._element&&window.innerWidth>e.clientWidth+i)return;this._saveInitialAttribute(e,t);const s=window.getComputedStyle(e).getPropertyValue(t);e.style.setProperty(t,`${n(Number.parseFloat(s))}px`);}));}_saveInitialAttribute(e,t){const n=e.style.getPropertyValue(t);n&&Manipulator.setDataAttribute(e,t,n);}_resetElementAttributes(e,t){this._applyManipulationCallback(e,(e=>{const n=Manipulator.getDataAttribute(e,t);null!==n?(Manipulator.removeDataAttribute(e,t),e.style.setProperty(t,n)):e.style.removeProperty(t);}));}_applyManipulationCallback(e,t){if(isElement(e))t(e);else for(const n of SelectorEngine.find(e,this._element))t(n);}}const NAME$7="modal",EVENT_HIDE$4="hide.bs.modal",EVENT_HIDE_PREVENTED$1="hidePrevented.bs.modal",EVENT_HIDDEN$4="hidden.bs.modal",EVENT_SHOW$4="show.bs.modal",EVENT_SHOWN$4="shown.bs.modal",EVENT_RESIZE$1="resize.bs.modal",EVENT_CLICK_DISMISS="click.dismiss.bs.modal",EVENT_MOUSEDOWN_DISMISS="mousedown.dismiss.bs.modal",EVENT_KEYDOWN_DISMISS$1="keydown.dismiss.bs.modal",EVENT_CLICK_DATA_API$2="click.bs.modal.data-api",SELECTOR_DATA_TOGGLE$2='[data-bs-toggle="modal"]',Default$6={backdrop:!0,focus:!0,keyboard:!0},DefaultType$6={backdrop:"(boolean|string)",focus:"boolean",keyboard:"boolean"};class Modal extends BaseComponent{constructor(e,t){super(e,t),this._dialog=SelectorEngine.findOne(".modal-dialog",this._element),this._backdrop=this._initializeBackDrop(),this._focustrap=this._initializeFocusTrap(),this._isShown=!1,this._isTransitioning=!1,this._scrollBar=new ScrollBarHelper,this._addEventListeners();}static get Default(){return Default$6}static get DefaultType(){return DefaultType$6}static get NAME(){return NAME$7}toggle(e){return this._isShown?this.hide():this.show(e)}show(e){this._isShown||this._isTransitioning||EventHandler.trigger(this._element,EVENT_SHOW$4,{relatedTarget:e}).defaultPrevented||(this._isShown=!0,this._isTransitioning=!0,this._scrollBar.hide(),document.body.classList.add("modal-open"),this._adjustDialog(),this._backdrop.show((()=>this._showElement(e))));}hide(){this._isShown&&!this._isTransitioning&&(EventHandler.trigger(this._element,EVENT_HIDE$4).defaultPrevented||(this._isShown=!1,this._isTransitioning=!0,this._focustrap.deactivate(),this._element.classList.remove("show"),this._queueCallback((()=>this._hideModal()),this._element,this._isAnimated())));}dispose(){EventHandler.off(window,".bs.modal"),EventHandler.off(this._dialog,".bs.modal"),this._backdrop.dispose(),this._focustrap.deactivate(),super.dispose();}handleUpdate(){this._adjustDialog();}_initializeBackDrop(){return new Backdrop({isVisible:Boolean(this._config.backdrop),isAnimated:this._isAnimated()})}_initializeFocusTrap(){return new FocusTrap({trapElement:this._element})}_showElement(e){document.body.contains(this._element)||document.body.append(this._element),this._element.style.display="block",this._element.removeAttribute("aria-hidden"),this._element.setAttribute("aria-modal",!0),this._element.setAttribute("role","dialog"),this._element.scrollTop=0;const t=SelectorEngine.findOne(".modal-body",this._dialog);t&&(t.scrollTop=0),reflow(this._element),this._element.classList.add("show"),this._queueCallback((()=>{this._config.focus&&this._focustrap.activate(),this._isTransitioning=!1,EventHandler.trigger(this._element,EVENT_SHOWN$4,{relatedTarget:e});}),this._dialog,this._isAnimated());}_addEventListeners(){EventHandler.on(this._element,EVENT_KEYDOWN_DISMISS$1,(e=>{"Escape"===e.key&&(this._config.keyboard?this.hide():this._triggerBackdropTransition());})),EventHandler.on(window,EVENT_RESIZE$1,(()=>{this._isShown&&!this._isTransitioning&&this._adjustDialog();})),EventHandler.on(this._element,EVENT_MOUSEDOWN_DISMISS,(e=>{EventHandler.one(this._element,EVENT_CLICK_DISMISS,(t=>{this._element===e.target&&this._element===t.target&&("static"!==this._config.backdrop?this._config.backdrop&&this.hide():this._triggerBackdropTransition());}));}));}_hideModal(){this._element.style.display="none",this._element.setAttribute("aria-hidden",!0),this._element.removeAttribute("aria-modal"),this._element.removeAttribute("role"),this._isTransitioning=!1,this._backdrop.hide((()=>{document.body.classList.remove("modal-open"),this._resetAdjustments(),this._scrollBar.reset(),EventHandler.trigger(this._element,EVENT_HIDDEN$4);}));}_isAnimated(){return this._element.classList.contains("fade")}_triggerBackdropTransition(){if(EventHandler.trigger(this._element,EVENT_HIDE_PREVENTED$1).defaultPrevented)return;const e=this._element.scrollHeight>document.documentElement.clientHeight,t=this._element.style.overflowY;"hidden"===t||this._element.classList.contains("modal-static")||(e||(this._element.style.overflowY="hidden"),this._element.classList.add("modal-static"),this._queueCallback((()=>{this._element.classList.remove("modal-static"),this._queueCallback((()=>{this._element.style.overflowY=t;}),this._dialog);}),this._dialog),this._element.focus());}_adjustDialog(){const e=this._element.scrollHeight>document.documentElement.clientHeight,t=this._scrollBar.getWidth(),n=t>0;if(n&&!e){const e=isRTL()?"paddingLeft":"paddingRight";this._element.style[e]=`${t}px`;}if(!n&&e){const e=isRTL()?"paddingRight":"paddingLeft";this._element.style[e]=`${t}px`;}}_resetAdjustments(){this._element.style.paddingLeft="",this._element.style.paddingRight="";}static jQueryInterface(e,t){return this.each((function(){const n=Modal.getOrCreateInstance(this,e);if("string"==typeof e){if(void 0===n[e])throw new TypeError(`No method named "${e}"`);n[e](t);}}))}}EventHandler.on(document,EVENT_CLICK_DATA_API$2,SELECTOR_DATA_TOGGLE$2,(function(e){const t=SelectorEngine.getElementFromSelector(this);["A","AREA"].includes(this.tagName)&&e.preventDefault(),EventHandler.one(t,EVENT_SHOW$4,(e=>{e.defaultPrevented||EventHandler.one(t,EVENT_HIDDEN$4,(()=>{isVisible(this)&&this.focus();}));}));const n=SelectorEngine.findOne(".modal.show");n&&Modal.getInstance(n).hide(),Modal.getOrCreateInstance(t).toggle(this);})),enableDismissTrigger(Modal),defineJQueryPlugin(Modal);const NAME$6="offcanvas",DATA_KEY$3="bs.offcanvas",EVENT_KEY$3=`.${DATA_KEY$3}`,EVENT_LOAD_DATA_API$2=`load${EVENT_KEY$3}.data-api`,CLASS_NAME_BACKDROP="offcanvas-backdrop",OPEN_SELECTOR=".offcanvas.show",EVENT_SHOW$3=`show${EVENT_KEY$3}`,EVENT_SHOWN$3=`shown${EVENT_KEY$3}`,EVENT_HIDE$3=`hide${EVENT_KEY$3}`,EVENT_HIDE_PREVENTED=`hidePrevented${EVENT_KEY$3}`,EVENT_HIDDEN$3=`hidden${EVENT_KEY$3}`,EVENT_RESIZE=`resize${EVENT_KEY$3}`,EVENT_CLICK_DATA_API$1=`click${EVENT_KEY$3}.data-api`,EVENT_KEYDOWN_DISMISS=`keydown.dismiss${EVENT_KEY$3}`,SELECTOR_DATA_TOGGLE$1='[data-bs-toggle="offcanvas"]',Default$5={backdrop:!0,keyboard:!0,scroll:!1},DefaultType$5={backdrop:"(boolean|string)",keyboard:"boolean",scroll:"boolean"};class Offcanvas extends BaseComponent{constructor(e,t){super(e,t),this._isShown=!1,this._backdrop=this._initializeBackDrop(),this._focustrap=this._initializeFocusTrap(),this._addEventListeners();}static get Default(){return Default$5}static get DefaultType(){return DefaultType$5}static get NAME(){return NAME$6}toggle(e){return this._isShown?this.hide():this.show(e)}show(e){this._isShown||EventHandler.trigger(this._element,EVENT_SHOW$3,{relatedTarget:e}).defaultPrevented||(this._isShown=!0,this._backdrop.show(),this._config.scroll||(new ScrollBarHelper).hide(),this._element.setAttribute("aria-modal",!0),this._element.setAttribute("role","dialog"),this._element.classList.add("showing"),this._queueCallback((()=>{this._config.scroll&&!this._config.backdrop||this._focustrap.activate(),this._element.classList.add("show"),this._element.classList.remove("showing"),EventHandler.trigger(this._element,EVENT_SHOWN$3,{relatedTarget:e});}),this._element,!0));}hide(){this._isShown&&(EventHandler.trigger(this._element,EVENT_HIDE$3).defaultPrevented||(this._focustrap.deactivate(),this._element.blur(),this._isShown=!1,this._element.classList.add("hiding"),this._backdrop.hide(),this._queueCallback((()=>{this._element.classList.remove("show","hiding"),this._element.removeAttribute("aria-modal"),this._element.removeAttribute("role"),this._config.scroll||(new ScrollBarHelper).reset(),EventHandler.trigger(this._element,EVENT_HIDDEN$3);}),this._element,!0)));}dispose(){this._backdrop.dispose(),this._focustrap.deactivate(),super.dispose();}_initializeBackDrop(){const e=Boolean(this._config.backdrop);return new Backdrop({className:CLASS_NAME_BACKDROP,isVisible:e,isAnimated:!0,rootElement:this._element.parentNode,clickCallback:e?()=>{"static"!==this._config.backdrop?this.hide():EventHandler.trigger(this._element,EVENT_HIDE_PREVENTED);}:null})}_initializeFocusTrap(){return new FocusTrap({trapElement:this._element})}_addEventListeners(){EventHandler.on(this._element,EVENT_KEYDOWN_DISMISS,(e=>{"Escape"===e.key&&(this._config.keyboard?this.hide():EventHandler.trigger(this._element,EVENT_HIDE_PREVENTED));}));}static jQueryInterface(e){return this.each((function(){const t=Offcanvas.getOrCreateInstance(this,e);if("string"==typeof e){if(void 0===t[e]||e.startsWith("_")||"constructor"===e)throw new TypeError(`No method named "${e}"`);t[e](this);}}))}}EventHandler.on(document,EVENT_CLICK_DATA_API$1,SELECTOR_DATA_TOGGLE$1,(function(e){const t=SelectorEngine.getElementFromSelector(this);if(["A","AREA"].includes(this.tagName)&&e.preventDefault(),isDisabled(this))return;EventHandler.one(t,EVENT_HIDDEN$3,(()=>{isVisible(this)&&this.focus();}));const n=SelectorEngine.findOne(OPEN_SELECTOR);n&&n!==t&&Offcanvas.getInstance(n).hide(),Offcanvas.getOrCreateInstance(t).toggle(this);})),EventHandler.on(window,EVENT_LOAD_DATA_API$2,(()=>{for(const e of SelectorEngine.find(OPEN_SELECTOR))Offcanvas.getOrCreateInstance(e).show();})),EventHandler.on(window,EVENT_RESIZE,(()=>{for(const e of SelectorEngine.find("[aria-modal][class*=show][class*=offcanvas-]"))"fixed"!==getComputedStyle(e).position&&Offcanvas.getOrCreateInstance(e).hide();})),enableDismissTrigger(Offcanvas),defineJQueryPlugin(Offcanvas);const ARIA_ATTRIBUTE_PATTERN=/^aria-[\w-]*$/i,DefaultAllowlist={"*":["class","dir","id","lang","role",ARIA_ATTRIBUTE_PATTERN],a:["target","href","title","rel"],area:[],b:[],br:[],col:[],code:[],dd:[],div:[],dl:[],dt:[],em:[],hr:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],i:[],img:["src","srcset","alt","title","width","height"],li:[],ol:[],p:[],pre:[],s:[],small:[],span:[],sub:[],sup:[],strong:[],u:[],ul:[]},uriAttributes=new Set(["background","cite","href","itemtype","longdesc","poster","src","xlink:href"]),SAFE_URL_PATTERN=/^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i,allowedAttribute=(e,t)=>{const n=e.nodeName.toLowerCase();return t.includes(n)?!uriAttributes.has(n)||Boolean(SAFE_URL_PATTERN.test(e.nodeValue)):t.filter((e=>e instanceof RegExp)).some((e=>e.test(n)))};function sanitizeHtml(e,t,n){if(!e.length)return e;if(n&&"function"==typeof n)return n(e);const i=(new window.DOMParser).parseFromString(e,"text/html"),s=[].concat(...i.body.querySelectorAll("*"));for(const e of s){const n=e.nodeName.toLowerCase();if(!Object.keys(t).includes(n)){e.remove();continue}const i=[].concat(...e.attributes),s=[].concat(t["*"]||[],t[n]||[]);for(const t of i)allowedAttribute(t,s)||e.removeAttribute(t.nodeName);}return i.body.innerHTML}const NAME$5="TemplateFactory",Default$4={allowList:DefaultAllowlist,content:{},extraClass:"",html:!1,sanitize:!0,sanitizeFn:null,template:"<div></div>"},DefaultType$4={allowList:"object",content:"object",extraClass:"(string|function)",html:"boolean",sanitize:"boolean",sanitizeFn:"(null|function)",template:"string"},DefaultContentType={entry:"(string|element|function|null)",selector:"(string|element)"};class TemplateFactory extends Config{constructor(e){super(),this._config=this._getConfig(e);}static get Default(){return Default$4}static get DefaultType(){return DefaultType$4}static get NAME(){return NAME$5}getContent(){return Object.values(this._config.content).map((e=>this._resolvePossibleFunction(e))).filter(Boolean)}hasContent(){return this.getContent().length>0}changeContent(e){return this._checkContent(e),this._config.content={...this._config.content,...e},this}toHtml(){const e=document.createElement("div");e.innerHTML=this._maybeSanitize(this._config.template);for(const[t,n]of Object.entries(this._config.content))this._setContent(e,n,t);const t=e.children[0],n=this._resolvePossibleFunction(this._config.extraClass);return n&&t.classList.add(...n.split(" ")),t}_typeCheckConfig(e){super._typeCheckConfig(e),this._checkContent(e.content);}_checkContent(e){for(const[t,n]of Object.entries(e))super._typeCheckConfig({selector:t,entry:n},DefaultContentType);}_setContent(e,t,n){const i=SelectorEngine.findOne(n,e);i&&((t=this._resolvePossibleFunction(t))?isElement(t)?this._putElementInTemplate(getElement(t),i):this._config.html?i.innerHTML=this._maybeSanitize(t):i.textContent=t:i.remove());}_maybeSanitize(e){return this._config.sanitize?sanitizeHtml(e,this._config.allowList,this._config.sanitizeFn):e}_resolvePossibleFunction(e){return execute(e,[this])}_putElementInTemplate(e,t){if(this._config.html)return t.innerHTML="",void t.append(e);t.textContent=e.textContent;}}const NAME$4="tooltip",DISALLOWED_ATTRIBUTES=new Set(["sanitize","allowList","sanitizeFn"]),AttachmentMap={AUTO:"auto",TOP:"top",RIGHT:isRTL()?"left":"right",BOTTOM:"bottom",LEFT:isRTL()?"right":"left"},Default$3={allowList:DefaultAllowlist,animation:!0,boundary:"clippingParents",container:!1,customClass:"",delay:0,fallbackPlacements:["top","right","bottom","left"],html:!1,offset:[0,6],placement:"top",popperConfig:null,sanitize:!0,sanitizeFn:null,selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',title:"",trigger:"hover focus"},DefaultType$3={allowList:"object",animation:"boolean",boundary:"(string|element)",container:"(string|element|boolean)",customClass:"(string|function)",delay:"(number|object)",fallbackPlacements:"array",html:"boolean",offset:"(array|string|function)",placement:"(string|function)",popperConfig:"(null|object|function)",sanitize:"boolean",sanitizeFn:"(null|function)",selector:"(string|boolean)",template:"string",title:"(string|element|function)",trigger:"string"};class Tooltip extends BaseComponent{constructor(e,t){if(void 0===Popper__namespace)throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");super(e,t),this._isEnabled=!0,this._timeout=0,this._isHovered=null,this._activeTrigger={},this._popper=null,this._templateFactory=null,this._newContent=null,this.tip=null,this._setListeners(),this._config.selector||this._fixTitle();}static get Default(){return Default$3}static get DefaultType(){return DefaultType$3}static get NAME(){return NAME$4}enable(){this._isEnabled=!0;}disable(){this._isEnabled=!1;}toggleEnabled(){this._isEnabled=!this._isEnabled;}toggle(){this._isEnabled&&(this._activeTrigger.click=!this._activeTrigger.click,this._isShown()?this._leave():this._enter());}dispose(){clearTimeout(this._timeout),EventHandler.off(this._element.closest(".modal"),"hide.bs.modal",this._hideModalHandler),this._element.getAttribute("data-bs-original-title")&&this._element.setAttribute("title",this._element.getAttribute("data-bs-original-title")),this._disposePopper(),super.dispose();}show(){if("none"===this._element.style.display)throw new Error("Please use show on visible elements");if(!this._isWithContent()||!this._isEnabled)return;const e=EventHandler.trigger(this._element,this.constructor.eventName("show")),t=(findShadowRoot(this._element)||this._element.ownerDocument.documentElement).contains(this._element);if(e.defaultPrevented||!t)return;this._disposePopper();const n=this._getTipElement();this._element.setAttribute("aria-describedby",n.getAttribute("id"));const{container:i}=this._config;if(this._element.ownerDocument.documentElement.contains(this.tip)||(i.append(n),EventHandler.trigger(this._element,this.constructor.eventName("inserted"))),this._popper=this._createPopper(n),n.classList.add("show"),"ontouchstart"in document.documentElement)for(const e of [].concat(...document.body.children))EventHandler.on(e,"mouseover",noop);this._queueCallback((()=>{EventHandler.trigger(this._element,this.constructor.eventName("shown")),!1===this._isHovered&&this._leave(),this._isHovered=!1;}),this.tip,this._isAnimated());}hide(){if(this._isShown()&&!EventHandler.trigger(this._element,this.constructor.eventName("hide")).defaultPrevented){if(this._getTipElement().classList.remove("show"),"ontouchstart"in document.documentElement)for(const e of [].concat(...document.body.children))EventHandler.off(e,"mouseover",noop);this._activeTrigger.click=!1,this._activeTrigger.focus=!1,this._activeTrigger.hover=!1,this._isHovered=null,this._queueCallback((()=>{this._isWithActiveTrigger()||(this._isHovered||this._disposePopper(),this._element.removeAttribute("aria-describedby"),EventHandler.trigger(this._element,this.constructor.eventName("hidden")));}),this.tip,this._isAnimated());}}update(){this._popper&&this._popper.update();}_isWithContent(){return Boolean(this._getTitle())}_getTipElement(){return this.tip||(this.tip=this._createTipElement(this._newContent||this._getContentForTemplate())),this.tip}_createTipElement(e){const t=this._getTemplateFactory(e).toHtml();if(!t)return null;t.classList.remove("fade","show"),t.classList.add(`bs-${this.constructor.NAME}-auto`);const n=getUID(this.constructor.NAME).toString();return t.setAttribute("id",n),this._isAnimated()&&t.classList.add("fade"),t}setContent(e){this._newContent=e,this._isShown()&&(this._disposePopper(),this.show());}_getTemplateFactory(e){return this._templateFactory?this._templateFactory.changeContent(e):this._templateFactory=new TemplateFactory({...this._config,content:e,extraClass:this._resolvePossibleFunction(this._config.customClass)}),this._templateFactory}_getContentForTemplate(){return {".tooltip-inner":this._getTitle()}}_getTitle(){return this._resolvePossibleFunction(this._config.title)||this._element.getAttribute("data-bs-original-title")}_initializeOnDelegatedTarget(e){return this.constructor.getOrCreateInstance(e.delegateTarget,this._getDelegateConfig())}_isAnimated(){return this._config.animation||this.tip&&this.tip.classList.contains("fade")}_isShown(){return this.tip&&this.tip.classList.contains("show")}_createPopper(e){const t=execute(this._config.placement,[this,e,this._element]),n=AttachmentMap[t.toUpperCase()];return Popper__namespace.createPopper(this._element,e,this._getPopperConfig(n))}_getOffset(){const{offset:e}=this._config;return "string"==typeof e?e.split(",").map((e=>Number.parseInt(e,10))):"function"==typeof e?t=>e(t,this._element):e}_resolvePossibleFunction(e){return execute(e,[this._element])}_getPopperConfig(e){const t={placement:e,modifiers:[{name:"flip",options:{fallbackPlacements:this._config.fallbackPlacements}},{name:"offset",options:{offset:this._getOffset()}},{name:"preventOverflow",options:{boundary:this._config.boundary}},{name:"arrow",options:{element:`.${this.constructor.NAME}-arrow`}},{name:"preSetPlacement",enabled:!0,phase:"beforeMain",fn:e=>{this._getTipElement().setAttribute("data-popper-placement",e.state.placement);}}]};return {...t,...execute(this._config.popperConfig,[t])}}_setListeners(){const e=this._config.trigger.split(" ");for(const t of e)if("click"===t)EventHandler.on(this._element,this.constructor.eventName("click"),this._config.selector,(e=>{this._initializeOnDelegatedTarget(e).toggle();}));else if("manual"!==t){const e="hover"===t?this.constructor.eventName("mouseenter"):this.constructor.eventName("focusin"),n="hover"===t?this.constructor.eventName("mouseleave"):this.constructor.eventName("focusout");EventHandler.on(this._element,e,this._config.selector,(e=>{const t=this._initializeOnDelegatedTarget(e);t._activeTrigger["focusin"===e.type?"focus":"hover"]=!0,t._enter();})),EventHandler.on(this._element,n,this._config.selector,(e=>{const t=this._initializeOnDelegatedTarget(e);t._activeTrigger["focusout"===e.type?"focus":"hover"]=t._element.contains(e.relatedTarget),t._leave();}));}this._hideModalHandler=()=>{this._element&&this.hide();},EventHandler.on(this._element.closest(".modal"),"hide.bs.modal",this._hideModalHandler);}_fixTitle(){const e=this._element.getAttribute("title");e&&(this._element.getAttribute("aria-label")||this._element.textContent.trim()||this._element.setAttribute("aria-label",e),this._element.setAttribute("data-bs-original-title",e),this._element.removeAttribute("title"));}_enter(){this._isShown()||this._isHovered?this._isHovered=!0:(this._isHovered=!0,this._setTimeout((()=>{this._isHovered&&this.show();}),this._config.delay.show));}_leave(){this._isWithActiveTrigger()||(this._isHovered=!1,this._setTimeout((()=>{this._isHovered||this.hide();}),this._config.delay.hide));}_setTimeout(e,t){clearTimeout(this._timeout),this._timeout=setTimeout(e,t);}_isWithActiveTrigger(){return Object.values(this._activeTrigger).includes(!0)}_getConfig(e){const t=Manipulator.getDataAttributes(this._element);for(const e of Object.keys(t))DISALLOWED_ATTRIBUTES.has(e)&&delete t[e];return e={...t,..."object"==typeof e&&e?e:{}},e=this._mergeConfigObj(e),e=this._configAfterMerge(e),this._typeCheckConfig(e),e}_configAfterMerge(e){return e.container=!1===e.container?document.body:getElement(e.container),"number"==typeof e.delay&&(e.delay={show:e.delay,hide:e.delay}),"number"==typeof e.title&&(e.title=e.title.toString()),"number"==typeof e.content&&(e.content=e.content.toString()),e}_getDelegateConfig(){const e={};for(const[t,n]of Object.entries(this._config))this.constructor.Default[t]!==n&&(e[t]=n);return e.selector=!1,e.trigger="manual",e}_disposePopper(){this._popper&&(this._popper.destroy(),this._popper=null),this.tip&&(this.tip.remove(),this.tip=null);}static jQueryInterface(e){return this.each((function(){const t=Tooltip.getOrCreateInstance(this,e);if("string"==typeof e){if(void 0===t[e])throw new TypeError(`No method named "${e}"`);t[e]();}}))}}defineJQueryPlugin(Tooltip);const NAME$3="popover",SELECTOR_TITLE=".popover-header",Default$2={...Tooltip.Default,content:"",offset:[0,8],placement:"right",template:'<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',trigger:"click"},DefaultType$2={...Tooltip.DefaultType,content:"(null|string|element|function)"};class Popover extends Tooltip{static get Default(){return Default$2}static get DefaultType(){return DefaultType$2}static get NAME(){return NAME$3}_isWithContent(){return this._getTitle()||this._getContent()}_getContentForTemplate(){return {[SELECTOR_TITLE]:this._getTitle(),".popover-body":this._getContent()}}_getContent(){return this._resolvePossibleFunction(this._config.content)}static jQueryInterface(e){return this.each((function(){const t=Popover.getOrCreateInstance(this,e);if("string"==typeof e){if(void 0===t[e])throw new TypeError(`No method named "${e}"`);t[e]();}}))}}defineJQueryPlugin(Popover);const NAME$2="scrollspy",DATA_KEY$2="bs.scrollspy",EVENT_KEY$2=`.${DATA_KEY$2}`,EVENT_ACTIVATE=`activate${EVENT_KEY$2}`,EVENT_CLICK=`click${EVENT_KEY$2}`,EVENT_LOAD_DATA_API$1=`load${EVENT_KEY$2}.data-api`,SELECTOR_DATA_SPY='[data-bs-spy="scroll"]',SELECTOR_LINK_ITEMS=".nav-link, .nav-item > .nav-link, .list-group-item",Default$1={offset:null,rootMargin:"0px 0px -25%",smoothScroll:!1,target:null,threshold:[.1,.5,1]},DefaultType$1={offset:"(number|null)",rootMargin:"string",smoothScroll:"boolean",target:"element",threshold:"array"};class ScrollSpy extends BaseComponent{constructor(e,t){super(e,t),this._targetLinks=new Map,this._observableSections=new Map,this._rootElement="visible"===getComputedStyle(this._element).overflowY?null:this._element,this._activeTarget=null,this._observer=null,this._previousScrollData={visibleEntryTop:0,parentScrollTop:0},this.refresh();}static get Default(){return Default$1}static get DefaultType(){return DefaultType$1}static get NAME(){return NAME$2}refresh(){this._initializeTargetsAndObservables(),this._maybeEnableSmoothScroll(),this._observer?this._observer.disconnect():this._observer=this._getNewObserver();for(const e of this._observableSections.values())this._observer.observe(e);}dispose(){this._observer.disconnect(),super.dispose();}_configAfterMerge(e){return e.target=getElement(e.target)||document.body,e.rootMargin=e.offset?`${e.offset}px 0px -30%`:e.rootMargin,"string"==typeof e.threshold&&(e.threshold=e.threshold.split(",").map((e=>Number.parseFloat(e)))),e}_maybeEnableSmoothScroll(){this._config.smoothScroll&&(EventHandler.off(this._config.target,EVENT_CLICK),EventHandler.on(this._config.target,EVENT_CLICK,"[href]",(e=>{const t=this._observableSections.get(e.target.hash);if(t){e.preventDefault();const n=this._rootElement||window,i=t.offsetTop-this._element.offsetTop;if(n.scrollTo)return void n.scrollTo({top:i,behavior:"smooth"});n.scrollTop=i;}})));}_getNewObserver(){const e={root:this._rootElement,threshold:this._config.threshold,rootMargin:this._config.rootMargin};return new IntersectionObserver((e=>this._observerCallback(e)),e)}_observerCallback(e){const t=e=>this._targetLinks.get(`#${e.target.id}`),n=e=>{this._previousScrollData.visibleEntryTop=e.target.offsetTop,this._process(t(e));},i=(this._rootElement||document.documentElement).scrollTop,s=i>=this._previousScrollData.parentScrollTop;this._previousScrollData.parentScrollTop=i;for(const o of e){if(!o.isIntersecting){this._activeTarget=null,this._clearActiveClass(t(o));continue}const e=o.target.offsetTop>=this._previousScrollData.visibleEntryTop;if(s&&e){if(n(o),!i)return}else s||e||n(o);}}_initializeTargetsAndObservables(){this._targetLinks=new Map,this._observableSections=new Map;const e=SelectorEngine.find("[href]",this._config.target);for(const t of e){if(!t.hash||isDisabled(t))continue;const e=SelectorEngine.findOne(decodeURI(t.hash),this._element);isVisible(e)&&(this._targetLinks.set(decodeURI(t.hash),t),this._observableSections.set(t.hash,e));}}_process(e){this._activeTarget!==e&&(this._clearActiveClass(this._config.target),this._activeTarget=e,e.classList.add("active"),this._activateParents(e),EventHandler.trigger(this._element,EVENT_ACTIVATE,{relatedTarget:e}));}_activateParents(e){if(e.classList.contains("dropdown-item"))SelectorEngine.findOne(".dropdown-toggle",e.closest(".dropdown")).classList.add("active");else for(const t of SelectorEngine.parents(e,".nav, .list-group"))for(const e of SelectorEngine.prev(t,SELECTOR_LINK_ITEMS))e.classList.add("active");}_clearActiveClass(e){e.classList.remove("active");const t=SelectorEngine.find("[href].active",e);for(const e of t)e.classList.remove("active");}static jQueryInterface(e){return this.each((function(){const t=ScrollSpy.getOrCreateInstance(this,e);if("string"==typeof e){if(void 0===t[e]||e.startsWith("_")||"constructor"===e)throw new TypeError(`No method named "${e}"`);t[e]();}}))}}EventHandler.on(window,EVENT_LOAD_DATA_API$1,(()=>{for(const e of SelectorEngine.find(SELECTOR_DATA_SPY))ScrollSpy.getOrCreateInstance(e);})),defineJQueryPlugin(ScrollSpy);const EVENT_HIDE$1="hide.bs.tab",EVENT_HIDDEN$1="hidden.bs.tab",EVENT_SHOW$1="show.bs.tab",EVENT_SHOWN$1="shown.bs.tab",EVENT_KEYDOWN="keydown.bs.tab",ARROW_LEFT_KEY="ArrowLeft",ARROW_RIGHT_KEY="ArrowRight",ARROW_UP_KEY="ArrowUp",ARROW_DOWN_KEY="ArrowDown",HOME_KEY="Home",END_KEY="End",SELECTOR_TAB_PANEL='.list-group, .nav, [role="tablist"]',SELECTOR_OUTER=".nav-item, .list-group-item",SELECTOR_INNER='.nav-link:not(.dropdown-toggle), .list-group-item:not(.dropdown-toggle), [role="tab"]:not(.dropdown-toggle)',SELECTOR_DATA_TOGGLE='[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',SELECTOR_INNER_ELEM=`${SELECTOR_INNER}, ${SELECTOR_DATA_TOGGLE}`,SELECTOR_DATA_TOGGLE_ACTIVE='.active[data-bs-toggle="tab"], .active[data-bs-toggle="pill"], .active[data-bs-toggle="list"]';class Tab extends BaseComponent{constructor(e){super(e),this._parent=this._element.closest(SELECTOR_TAB_PANEL),this._parent&&(this._setInitialAttributes(this._parent,this._getChildren()),EventHandler.on(this._element,EVENT_KEYDOWN,(e=>this._keydown(e))));}static get NAME(){return "tab"}show(){const e=this._element;if(this._elemIsActive(e))return;const t=this._getActiveElem(),n=t?EventHandler.trigger(t,EVENT_HIDE$1,{relatedTarget:e}):null;EventHandler.trigger(e,EVENT_SHOW$1,{relatedTarget:t}).defaultPrevented||n&&n.defaultPrevented||(this._deactivate(t,e),this._activate(e,t));}_activate(e,t){e&&(e.classList.add("active"),this._activate(SelectorEngine.getElementFromSelector(e)),this._queueCallback((()=>{"tab"===e.getAttribute("role")?(e.removeAttribute("tabindex"),e.setAttribute("aria-selected",!0),this._toggleDropDown(e,!0),EventHandler.trigger(e,EVENT_SHOWN$1,{relatedTarget:t})):e.classList.add("show");}),e,e.classList.contains("fade")));}_deactivate(e,t){e&&(e.classList.remove("active"),e.blur(),this._deactivate(SelectorEngine.getElementFromSelector(e)),this._queueCallback((()=>{"tab"===e.getAttribute("role")?(e.setAttribute("aria-selected",!1),e.setAttribute("tabindex","-1"),this._toggleDropDown(e,!1),EventHandler.trigger(e,EVENT_HIDDEN$1,{relatedTarget:t})):e.classList.remove("show");}),e,e.classList.contains("fade")));}_keydown(e){if(![ARROW_LEFT_KEY,ARROW_RIGHT_KEY,ARROW_UP_KEY,ARROW_DOWN_KEY,HOME_KEY,END_KEY].includes(e.key))return;e.stopPropagation(),e.preventDefault();const t=this._getChildren().filter((e=>!isDisabled(e)));let n;if([HOME_KEY,END_KEY].includes(e.key))n=t[e.key===HOME_KEY?0:t.length-1];else {const i=[ARROW_RIGHT_KEY,ARROW_DOWN_KEY].includes(e.key);n=getNextActiveElement(t,e.target,i,!0);}n&&(n.focus({preventScroll:!0}),Tab.getOrCreateInstance(n).show());}_getChildren(){return SelectorEngine.find(SELECTOR_INNER_ELEM,this._parent)}_getActiveElem(){return this._getChildren().find((e=>this._elemIsActive(e)))||null}_setInitialAttributes(e,t){this._setAttributeIfNotExists(e,"role","tablist");for(const e of t)this._setInitialAttributesOnChild(e);}_setInitialAttributesOnChild(e){e=this._getInnerElement(e);const t=this._elemIsActive(e),n=this._getOuterElement(e);e.setAttribute("aria-selected",t),n!==e&&this._setAttributeIfNotExists(n,"role","presentation"),t||e.setAttribute("tabindex","-1"),this._setAttributeIfNotExists(e,"role","tab"),this._setInitialAttributesOnTargetPanel(e);}_setInitialAttributesOnTargetPanel(e){const t=SelectorEngine.getElementFromSelector(e);t&&(this._setAttributeIfNotExists(t,"role","tabpanel"),e.id&&this._setAttributeIfNotExists(t,"aria-labelledby",`${e.id}`));}_toggleDropDown(e,t){const n=this._getOuterElement(e);if(!n.classList.contains("dropdown"))return;const i=(e,i)=>{const s=SelectorEngine.findOne(e,n);s&&s.classList.toggle(i,t);};i(".dropdown-toggle","active"),i(".dropdown-menu","show"),n.setAttribute("aria-expanded",t);}_setAttributeIfNotExists(e,t,n){e.hasAttribute(t)||e.setAttribute(t,n);}_elemIsActive(e){return e.classList.contains("active")}_getInnerElement(e){return e.matches(SELECTOR_INNER_ELEM)?e:SelectorEngine.findOne(SELECTOR_INNER_ELEM,e)}_getOuterElement(e){return e.closest(SELECTOR_OUTER)||e}static jQueryInterface(e){return this.each((function(){const t=Tab.getOrCreateInstance(this);if("string"==typeof e){if(void 0===t[e]||e.startsWith("_")||"constructor"===e)throw new TypeError(`No method named "${e}"`);t[e]();}}))}}EventHandler.on(document,"click.bs.tab",SELECTOR_DATA_TOGGLE,(function(e){["A","AREA"].includes(this.tagName)&&e.preventDefault(),isDisabled(this)||Tab.getOrCreateInstance(this).show();})),EventHandler.on(window,"load.bs.tab",(()=>{for(const e of SelectorEngine.find(SELECTOR_DATA_TOGGLE_ACTIVE))Tab.getOrCreateInstance(e);})),defineJQueryPlugin(Tab);const NAME="toast",DATA_KEY="bs.toast",EVENT_KEY=`.${DATA_KEY}`,EVENT_MOUSEOVER=`mouseover${EVENT_KEY}`,EVENT_MOUSEOUT=`mouseout${EVENT_KEY}`,EVENT_FOCUSIN=`focusin${EVENT_KEY}`,EVENT_FOCUSOUT=`focusout${EVENT_KEY}`,EVENT_HIDE=`hide${EVENT_KEY}`,EVENT_HIDDEN=`hidden${EVENT_KEY}`,EVENT_SHOW=`show${EVENT_KEY}`,EVENT_SHOWN=`shown${EVENT_KEY}`,DefaultType={animation:"boolean",autohide:"boolean",delay:"number"},Default={animation:!0,autohide:!0,delay:5e3};class Toast extends BaseComponent{constructor(e,t){super(e,t),this._timeout=null,this._hasMouseInteraction=!1,this._hasKeyboardInteraction=!1,this._setListeners();}static get Default(){return Default}static get DefaultType(){return DefaultType}static get NAME(){return NAME}show(){EventHandler.trigger(this._element,EVENT_SHOW).defaultPrevented||(this._clearTimeout(),this._config.animation&&this._element.classList.add("fade"),this._element.classList.remove("hide"),reflow(this._element),this._element.classList.add("show","showing"),this._queueCallback((()=>{this._element.classList.remove("showing"),EventHandler.trigger(this._element,EVENT_SHOWN),this._maybeScheduleHide();}),this._element,this._config.animation));}hide(){this.isShown()&&(EventHandler.trigger(this._element,EVENT_HIDE).defaultPrevented||(this._element.classList.add("showing"),this._queueCallback((()=>{this._element.classList.add("hide"),this._element.classList.remove("showing","show"),EventHandler.trigger(this._element,EVENT_HIDDEN);}),this._element,this._config.animation)));}dispose(){this._clearTimeout(),this.isShown()&&this._element.classList.remove("show"),super.dispose();}isShown(){return this._element.classList.contains("show")}_maybeScheduleHide(){this._config.autohide&&(this._hasMouseInteraction||this._hasKeyboardInteraction||(this._timeout=setTimeout((()=>{this.hide();}),this._config.delay)));}_onInteraction(e,t){switch(e.type){case"mouseover":case"mouseout":this._hasMouseInteraction=t;break;case"focusin":case"focusout":this._hasKeyboardInteraction=t;}if(t)return void this._clearTimeout();const n=e.relatedTarget;this._element===n||this._element.contains(n)||this._maybeScheduleHide();}_setListeners(){EventHandler.on(this._element,EVENT_MOUSEOVER,(e=>this._onInteraction(e,!0))),EventHandler.on(this._element,EVENT_MOUSEOUT,(e=>this._onInteraction(e,!1))),EventHandler.on(this._element,EVENT_FOCUSIN,(e=>this._onInteraction(e,!0))),EventHandler.on(this._element,EVENT_FOCUSOUT,(e=>this._onInteraction(e,!1)));}_clearTimeout(){clearTimeout(this._timeout),this._timeout=null;}static jQueryInterface(e){return this.each((function(){const t=Toast.getOrCreateInstance(this,e);if("string"==typeof e){if(void 0===t[e])throw new TypeError(`No method named "${e}"`);t[e](this);}}))}}enableDismissTrigger(Toast),defineJQueryPlugin(Toast);

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
			if (modalParent) _this.extElement.modal = new Modal(modalParent, {backdrop: true, keyboard: true, focus: true});

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

			if ('modal' in arg) {
				this.settings.modal = arg.modal;
			}

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
					btnSubmit.setAttribute('disabled', 'disabled');
				} else if (status === 'default') {
					btnSubmit.innerHTML = btnText.text;
					btnSubmit.removeAttribute('disabled');
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

				let modal = new Modal('#' + _this.classes.alert.modal, {backdrop: true, keyboard: true, focus: true});
				modal.show();
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

})(this.window = this.window || {}, Popper);
