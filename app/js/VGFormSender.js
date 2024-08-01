import VGSender from "./VGSender";
import {mergeDeepObject} from "./util/functions";
import {toggleSlide} from "./util/animation";

const svg =  {
	error: '<svg viewbox="0 0 500 500" class="am_Error_Icon"><path class="am_SVG_circle" d="m444.34693,114.07007a236.95276,236.95276 0 0 1 44.1553,137.73747c0,129.97005 -106.94772,236.96443 -236.91777,236.96443s-236.91777,-106.94772 -236.91777,-236.91777s106.94772,-236.96443 236.91777,-236.96443a236.99941,236.99941 0 0 1 168.72548,70.59483"></path><line class="am_SVG_error1" y2="390" x2="390" y1="110" x1="110"></line><line class="am_SVG_error2" y2="390" x2="110" y1="110" x1="390"></line></svg>',
	success: '<svg viewbox="0 0 500 500" class="am_Success_Icon"><path class="am_SVG_circle" d="m443.0136,114.07007a236.95276,236.95276 0 0 1 44.1553,137.73747c0,129.97005 -106.94772,236.96443 -236.91777,236.96443s-236.91777,-106.94772 -236.91777,-236.91777s106.94772,-236.96443 236.91777,-236.96443a236.99941,236.99941 0 0 1 168.72548,70.59483"></path><polyline class="am_SVG_check" points="104.4892349243164,309.2001647949219 195.57406616210938,402.9600524902344 418.9292297363281,85.03718566894531 "></polyline></svg>',
	cross: '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 224.512 224.512" style="enable-background:new 0 0 224.512 224.512;" xml:space="preserve"><g><polygon style="fill:#010002;" points="224.507,6.997 217.521,0 112.256,105.258 6.998,0 0.005,6.997 105.263,112.254 0.005,217.512 6.998,224.512 112.256,119.24 217.521,224.512 224.507,217.512 119.249,112.254 "/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>'
};

class VGFormSender extends VGSender {
	constructor(form, arg ={}) {
		super(form, arg);

		return this;
	}

	submit(callback) {

	}
}

export default VGFormSender
