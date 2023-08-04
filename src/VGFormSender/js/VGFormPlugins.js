import showPass from "./plugins/showPass/showPass";

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

export default VGFormPlugins;
