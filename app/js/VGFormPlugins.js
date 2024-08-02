import showPass from "../plugins/showPass/showPass";
import divBlock from "../plugins/block/divBlock";
import VGModal  from "../plugins/modal/VGModal";

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
						case "divBlock":
							if (typeof divBlock !== "undefined") {
								let module = new divBlock(_this.formsender.form, plugin[nameModule].params);
								module.init();
							}
						break;
						case "VGModal":
							if (typeof divBlock !== "undefined") {
								let module = new VGModal(_this.formsender.form, plugin[nameModule].params);
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
