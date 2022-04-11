export class UrlScripts {

	static _getUrlObject() {

		const urlObj = new URL(document.location);
		return urlObj;

	}

	static getSearchParams() {
		const ar = [...this._getUrlObject().search.split('&')];
    const pairs = {};
    
		ar.forEach(item => {
			item = item.split("=");
			pairs[item[0]] = item[1];
		});

		console.log("🚀 ~ file: UrlScripts.js ~ line 13 ~ UrlScripts ~ getSearchParams ~ pairs", pairs);

		// const paramsList = new Map();

	}



}
