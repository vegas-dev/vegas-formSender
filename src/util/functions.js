/**
 * Глубокое объединение объектов
 * @param objects
 * @returns {*}
 */
function mergeDeepObject(...objects) {
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
}

/**
 * Collect Data
 * @param data
 * @param fields
 */
function collectData(data, fields) {
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
}

const ajax = {};
ajax.x = function () {
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
};

ajax.send = function (url, callback, method, data, async) {
	if (async === undefined) {
		async = true;
	}
	let x = ajax.x();
	x.open(method, url, async);
	x.onreadystatechange = function () {
		if (x.readyState === 4) {
			callback(x.responseText)
		}
	};
	if (method === 'POST') {
		x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	}
	x.send(data)
};

ajax.get = function (url, data, callback, async) {
	let query = [];
	for (let key in data) {
		query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
	}
	ajax.send(url + (query.length ? '?' + query.join('&') : ''), callback, 'GET', null, async)
};

ajax.post = function (url, data, callback, async) {
	let query = [];
	for (let key in data) {
		query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
	}
	ajax.send(url, callback, 'POST', query.join('&'), async)
};

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

export {mergeDeepObject, collectData, ajax, toggleSlide}
