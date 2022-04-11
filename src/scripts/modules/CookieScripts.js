export class CookieScripts {

	static getCookie(name) {
		let matches = document.cookie.match(new RegExp(
			"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		));
		return matches ? decodeURIComponent(matches[1]) : undefined;
	}

	static setCookie(name, value, options = {}) {

		options = {
			path: '/',
			// при необходимости добавьте другие значения по умолчанию
			...options
		};

		if (options.expires instanceof Date) {
			options.expires = options.expires.toUTCString();
		}

		let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

		for (let optionKey in options) {
			updatedCookie += "; " + optionKey;
			let optionValue = options[optionKey];
			if (optionValue !== true) {
				updatedCookie += "=" + optionValue;
			}
		}

		document.cookie = updatedCookie;
	}

	static deleteCookie(name) {
		this.setCookie(name, "", {
			'max-age': -1
		});
	}

	static getCookiesMap() {
		let cookies = new Map();
		let all = document.cookie;
		let cookiesList = all.split(';');

		for (let cookie of cookiesList) {
			if (!cookie.includes("=")) continue;

			let p = cookie.indexOf("=");
			let name = cookie.substring(0, p);
			let value = cookie.substring(p + 1);

			value = decodeURIComponent(value);
			cookies.set(name, value);
		}

		return cookies;
	}

}
