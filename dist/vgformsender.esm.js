// @vegas-VGFormSender v3.0.0
function t(...e){const s=t=>t&&"object"==typeof t;return e.reduce(((e,a)=>(Object.keys(a).forEach((i=>{const r=e[i],l=a[i];Array.isArray(r)&&Array.isArray(l)?e[i]=r.concat(...l):s(r)&&s(l)?e[i]=t(r,l):e[i]=l})),e)),{})}const e={};function s(t){if(t.getAttribute("data-max-height"))"0"===t.style.maxHeight.replace("px","").replace("%","")?t.style.maxHeight=t.getAttribute("data-max-height"):t.style.maxHeight="0";else{let e=function(t){let e=window.getComputedStyle(t),s=e.display,a=e.position,i=e.visibility,r=e.maxHeight.replace("px","").replace("%",""),l=0;return"none"!==s&&"0"!==r?t.offsetHeight:(t.style.position="absolute",t.style.visibility="hidden",t.style.display="block",l=t.offsetHeight,t.style.display=s,t.style.position=a,t.style.visibility=i,l)}(t)+"px"||"0";t.style.transition="max-height 0.5s ease-in-out",t.style.overflowY="hidden",t.style.maxHeight="0",t.setAttribute("data-max-height",e),t.style.display="block",setTimeout((function(){t.style.maxHeight=e}),10)}}e.x=function(){if("undefined"!=typeof XMLHttpRequest)return new XMLHttpRequest;let t,e=["MSXML2.XmlHttp.6.0","MSXML2.XmlHttp.5.0","MSXML2.XmlHttp.4.0","MSXML2.XmlHttp.3.0","MSXML2.XmlHttp.2.0","Microsoft.XmlHttp"];for(let s=0;s<e.length;s++)try{t=new ActiveXObject(e[s]);break}catch(t){}return t},e.send=function(t,s,a,i,r){void 0===r&&(r=!0);let l=e.x();l.open(a,t,r),l.onreadystatechange=function(){4===l.readyState&&s(l.responseText)},"POST"===a&&l.setRequestHeader("Content-type","application/x-www-form-urlencoded"),l.send(i)},e.get=function(t,s,a,i){let r=[];for(let t of s)r.push(encodeURIComponent(t[0])+"="+encodeURIComponent(t[1]));e.send(t+(r.length?"?"+r.join("&"):""),a,"GET",null,i)},e.post=function(t,s,a,i){e.send(t,a,"POST",s,i)};class a extends class{constructor(e,s={}){if(this.form=e,this.settings=s,!e)return console.error("Первый параметр не должен быть пустым"),!1;{let a={action:e.getAttribute("action")||location.href,method:e.getAttribute("method")||"post",fields:null,jsonParse:"false"!==e.getAttribute("data-json-parse"),redirect:e.getAttribute("data-redirect")||!1,validate:e.getAttribute("data-validate")||!1,alert:"false"!==e.getAttribute("data-alert"),alertParams:{type:e.getAttribute("data-alert-type")||"modal"}};this.isInit=!1,this.form=e,this.settings=t(a,s),this.classes={general:"vg-form-sender"},this.settings.fields&&"function"==typeof this.settings.fields&&(this.settings.fields=this.settings.fields()),this.init()}}init(){const t=this;t.form.classList.add(t.classes.general),t.settings.validate&&(t.form.setAttribute("novalidate",""),t.form.classList.add("needs-validation")),t.isInit=!0}submit(t){if(!this.isInit)return!1;const e=this;e.form.onsubmit=function(s){let a=new FormData(e.form);return"object"==typeof e.settings.fields&&(e.data=function(t,e){for(let s in e)if("object"==typeof e[s])for(let a in e[s]){let i=Object.keys(e[s][a]).map((function(t){return e[s][a][t]}));t.append(s,i)}else t.append(s,e[s]);return t}(a,e.settings.fields)),e.settings.validate&&!e.form.checkValidity()?(s.preventDefault(),s.stopPropagation(),e.form.classList.add("was-validated"),!1):e.request(t,s)}}request(t,s){if(!this.isInit)return!1;const a=this;let i=a.settings.method.toLowerCase(),r=a.settings.action,l=a.data;return t&&"beforeSend"in t&&"function"==typeof t.beforeSend&&t.beforeSend(s,a.form),"post"===i&&e.post(r,l,(function(e){a.form.classList.remove("was-validated"),t&&"success"in t&&"function"==typeof t.success&&t.success(s,a.form,e)})),"get"===i&&e.get(r,l,(function(e){a.form.classList.remove("was-validated"),t&&"success"in t&&"function"==typeof t.success&&t.success(s,a.form,e)})),!1}}{constructor(e,s={}){super(e,s),this.isAlert=this.settings.alert;return this.classes=t(this.classes,{alert:{block:"vg-form-sender--alert-block",modal:"vg-form-sender--alert-modal"}}),this.alertElement=null,this.svg={error:'<svg viewbox="0 0 500 500" class="am_Error_Icon"><path class="am_SVG_circle" d="m444.34693,114.07007a236.95276,236.95276 0 0 1 44.1553,137.73747c0,129.97005 -106.94772,236.96443 -236.91777,236.96443s-236.91777,-106.94772 -236.91777,-236.91777s106.94772,-236.96443 236.91777,-236.96443a236.99941,236.99941 0 0 1 168.72548,70.59483"></path><line class="am_SVG_error1" y2="390" x2="390" y1="110" x1="110"></line><line class="am_SVG_error2" y2="390" x2="110" y1="110" x1="390"></line></svg>',success:'<svg viewbox="0 0 500 500" class="am_Success_Icon"><path class="am_SVG_circle" d="m443.0136,114.07007a236.95276,236.95276 0 0 1 44.1553,137.73747c0,129.97005 -106.94772,236.96443 -236.91777,236.96443s-236.91777,-106.94772 -236.91777,-236.91777s106.94772,-236.96443 236.91777,-236.96443a236.99941,236.99941 0 0 1 168.72548,70.59483"></path><polyline class="am_SVG_check" points="104.4892349243164,309.2001647949219 195.57406616210938,402.9600524902344 418.9292297363281,85.03718566894531 "></polyline></svg>',cross:'<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 224.512 224.512" style="enable-background:new 0 0 224.512 224.512;" xml:space="preserve"><g><polygon style="fill:#010002;" points="224.507,6.997 217.521,0 112.256,105.258 6.998,0 0.005,6.997 105.263,112.254 0.005,217.512 6.998,224.512 112.256,119.24 217.521,224.512 224.507,217.512 119.249,112.254 "/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>'},"block"===this.settings.alertParams.type&&(this.alertElement=this.drawAlertBlock(e)),"modal"===this.settings.alertParams.type&&(this.alertElement=this.drawAlertModal()),this}submit(t){if(this.isAlert){const e=this;return super.submit({beforeSend:function(s,a){t&&"beforeSend"in t&&"function"==typeof t.beforeSend&&t.beforeSend(s,a),e.btnSubmit(a,"before"),e.alert(a,{},"before")},success:function(s,a,i){t&&"success"in t&&"function"==typeof t.success&&t.success(s,a,i),e.settings.jsonParse&&"string"==typeof i&&(i=JSON.parse(i)),e.btnSubmit(a,"success"),e.alert(a,i,"success")}})}return super.submit(t)}alert(t,e,s){if(!this.isAlert)return!1;const a=this;"block"===a.settings.alertParams.type&&a.alertBlock(a.alertElement,e,s),"modal"===a.settings.alertParams.type&&"success"===s&&a.alertModal(a.alertElement,e,s)}btnSubmit(t,e){if(!this.isAlert)return!1;let s=t.querySelector('[type="submit"]');if(s||(s=document.querySelector('[form="'+t.id+'"]')),s){let t={send:s.getAttribute("data-text-send")||"Отправляем...",text:s.getAttribute("data-text")||"Отправить"};"before"===e?s.innerHTML=t.send:"success"===e&&(s.innerHTML=t.text)}}alertBlock(t,e,a){if("before"===a)t.classList.contains("active")&&(s(t),t.classList.remove("active"));else if("success"===a){t.classList.add("active");let i=t.querySelectorAll(".show");if(i.length)for(const l of i)l.classList.remove("show");function r(t,s){let a=t.querySelector(".vg-alert-"+s);if(a){let t=a.querySelector("[data-alert-"+s+"-text]");t&&"msg"in e&&(t.innerHTML=e.msg);let i=a.querySelector("[data-alert-"+s+"-title]");i&&"title"in e&&(i.innerHTML=e.title),a.classList.add("show")}else t.innerHTML=e.msg}e&&"errors"in e&&(e.errors?r(t,"danger"):r(t,"success")),s(t)}}alertModal(t,e){let s=t.querySelectorAll(".show");if(s.length)for(const t of s)t.classList.remove("show");function a(t,s){let a=t.querySelector(".vg-alert-content");if(a){let t=a.querySelector(".vg-alert-"+s);if(t){let a=t.querySelector("[data-alert-"+s+"-title]");a&&"msg"in e&&(a.innerHTML=e.title);let i=t.querySelector("[data-alert-"+s+"-text]");i&&"msg"in e&&(i.innerHTML=e.msg),t.classList.add("show")}else t.innerHTML=e.msg}else t.innerHTML=e.msg}e&&"errors"in e&&(e.errors?a(t,"danger"):a(t,"success"));new bootstrap.Modal("#"+this.classes.alert.modal,{}).show()}drawAlertBlock(t){const e=this;let s=t.querySelector("."+e.classes.alert.block);if(!s){let a=document.querySelector('[data-form="'+t.id+'"]');if(a)s=a;else{let a=document.createElement("div");a.classList.add(e.classes.alert.block),a.innerHTML='<div class="vg-alert vg-alert-danger">\t\t\t\t\t<div class="svg-area">'+e.svg.error+'</div>\t\t\t\t\t<div class="content-area">\t\t\t\t\t\t<div class="title-area" data-alert-danger-title></div>\t\t\t\t\t\t<div class="text-area" data-alert-danger-text></div>\t\t\t\t\t</div>\t\t\t\t</div>\t\t\t\t<div class="vg-alert vg-alert-success">\t\t\t\t\t<div class="svg-area">'+e.svg.success+'</div>\t\t\t\t\t<div class="content-area">\t\t\t\t\t\t<div class="title-area" data-alert-success-title></div>\t\t\t\t\t\t<div class="text-area" data-alert-success-text></div>\t\t\t\t\t</div>\t\t\t\t</div>',t.prepend(a),s=a}}return s}drawAlertModal(){const t=this;let e=document.querySelector("."+t.classes.alert.modal);if(e)return e;{let e=document.createElement("div");return e.classList.add("modal"),e.classList.add("fade"),e.classList.add(t.classes.alert.modal),e.setAttribute("id",t.classes.alert.modal),e.innerHTML='<div class="modal-dialog" role="document">        <div class="modal-content">            <button type="button" class="modal-close" data-bs-dismiss="modal" aria-label="Close">'+t.svg.cross+'</button>            <div class="vg-alert-content">                <div class="vg-alert vg-alert-danger">                     <div class="svg-area">'+t.svg.error+'</div>                     <div class="title-area" data-alert-danger-title></div>                     <div class="text-area" data-alert-danger-text></div>                </div>                <div class="vg-alert vg-alert-success">                     <div class="svg-area">'+t.svg.success+'</div>                     <div class="title-area" data-alert-success-title></div>                     <div class="text-area" data-alert-success-text></div>                </div>            </div>        </div>    </div>',document.body.append(e),e}}}export{a as VGFormSender};
