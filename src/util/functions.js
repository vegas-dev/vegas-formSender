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
	for (let key of data) {
		query.push(encodeURIComponent(key[0]) + '=' + encodeURIComponent(key[1]));
	}
	ajax.send(url + (query.length ? '?' + query.join('&') : ''), callback, 'GET', null, async)
};

ajax.post = function (url, data, callback, async) {
	ajax.send(url, callback, 'POST', data, async)
};

export {mergeDeepObject, collectData, ajax}
