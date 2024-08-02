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
}

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
}

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
						callback('success', x.responseText)
						break;
					default:
						callback('error', x.responseText)
						break;
				}
			}
		};
		if (method === 'POST') {
			//x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		}
		x.send(data)
	},

	get: function (url, data, callback, async) {
		let query = [];
		for (let key of data) {
			query.push(encodeURIComponent(key[0]) + '=' + encodeURIComponent(key[1]));
		}
		ajax.send(url + (query.length ? '?' + query.join('&') : ''), callback, 'GET', null, async)
	},

	post: function (url, data, callback, async) {
		ajax.send(url, callback, 'POST', data, async)
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
}

export {mergeDeepObject, collectData, ajax, eventHandler}
