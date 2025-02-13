var vg;(()=>{"use strict";var e={d:(t,s)=>{for(var i in s)e.o(s,i)&&!e.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:s[i]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{VGFormSender:()=>g});const s=function(...e){const t=e=>e&&"object"==typeof e;return e.reduce(((e,i)=>(Object.keys(i).forEach((r=>{const a=e[r],n=i[r];Array.isArray(a)&&Array.isArray(n)?e[r]=a.concat(...n):t(a)&&t(n)?e[r]=s(a,n):e[r]=n})),e)),{})},i={x:function(){if("undefined"!=typeof XMLHttpRequest)return new XMLHttpRequest;let e,t=["MSXML2.XmlHttp.6.0","MSXML2.XmlHttp.5.0","MSXML2.XmlHttp.4.0","MSXML2.XmlHttp.3.0","MSXML2.XmlHttp.2.0","Microsoft.XmlHttp"];for(let s=0;s<t.length;s++)try{e=new ActiveXObject(t[s]);break}catch(e){}return e},send:function(e,t,s,r,a){void 0===a&&(a=!0);let n=i.x();n.open(s,e,a),n.setRequestHeader("X-Requested-With","XMLHttpRequest"),n.onreadystatechange=function(){4===n.readyState&&(200===n.status?t("success",{text:n.statusText,response:n.responseText}):t("error",{text:n.statusText,response:n.responseText}))},n.send(r)},get:function(e,t,s,r){let a=[];for(let e of t)a.push(encodeURIComponent(e[0])+"="+encodeURIComponent(e[1]));i.send(e+(a.length?"?"+a.join("&"):""),s,"GET",null,r)},post:function(e,t,s,r){i.send(e,s,"POST",t,r)}},r=function(e,t,s=null){const i=new CustomEvent(t,{bubbles:!0,detail:s});e.dispatchEvent(i)},a=e=>e&&"object"==typeof e;function n(e){if("true"===e)return!0;if("false"===e)return!1;if(e===Number(e).toString())return Number(e);if(""===e||"null"===e)return null;if("string"!=typeof e)return e;try{return JSON.parse(decodeURIComponent(e))}catch{return e}}const o=class{constructor(e=null,t={}){this.form=e,this.params=t,this.eyeOpen='<svg width="24px" id="svgEyeOpen" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path fill-rule="evenodd" clip-rule="evenodd" d="M12 8.25C9.92893 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25ZM9.75 12C9.75 10.7574 10.7574 9.75 12 9.75C13.2426 9.75 14.25 10.7574 14.25 12C14.25 13.2426 13.2426 14.25 12 14.25C10.7574 14.25 9.75 13.2426 9.75 12Z" fill="#495057"/>\n<path fill-rule="evenodd" clip-rule="evenodd" d="M12 3.25C7.48587 3.25 4.44529 5.9542 2.68057 8.24686L2.64874 8.2882C2.24964 8.80653 1.88206 9.28392 1.63269 9.8484C1.36564 10.4529 1.25 11.1117 1.25 12C1.25 12.8883 1.36564 13.5471 1.63269 14.1516C1.88206 14.7161 2.24964 15.1935 2.64875 15.7118L2.68057 15.7531C4.44529 18.0458 7.48587 20.75 12 20.75C16.5141 20.75 19.5547 18.0458 21.3194 15.7531L21.3512 15.7118C21.7504 15.1935 22.1179 14.7161 22.3673 14.1516C22.6344 13.5471 22.75 12.8883 22.75 12C22.75 11.1117 22.6344 10.4529 22.3673 9.8484C22.1179 9.28391 21.7504 8.80652 21.3512 8.28818L21.3194 8.24686C19.5547 5.9542 16.5141 3.25 12 3.25ZM3.86922 9.1618C5.49864 7.04492 8.15036 4.75 12 4.75C15.8496 4.75 18.5014 7.04492 20.1308 9.1618C20.5694 9.73159 20.8263 10.0721 20.9952 10.4545C21.1532 10.812 21.25 11.2489 21.25 12C21.25 12.7511 21.1532 13.188 20.9952 13.5455C20.8263 13.9279 20.5694 14.2684 20.1308 14.8382C18.5014 16.9551 15.8496 19.25 12 19.25C8.15036 19.25 5.49864 16.9551 3.86922 14.8382C3.43064 14.2684 3.17374 13.9279 3.00476 13.5455C2.84684 13.188 2.75 12.7511 2.75 12C2.75 11.2489 2.84684 10.812 3.00476 10.4545C3.17374 10.0721 3.43063 9.73159 3.86922 9.1618Z" fill="#495057"/>\n</svg>',this.eyeClose='<svg width="24px" id="svgEyeClose" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path d="M2.68936 6.70456C2.52619 6.32384 2.08528 6.14747 1.70456 6.31064C1.32384 6.47381 1.14747 6.91472 1.31064 7.29544L2.68936 6.70456ZM15.5872 13.3287L15.3125 12.6308L15.5872 13.3287ZM9.04145 13.7377C9.26736 13.3906 9.16904 12.926 8.82185 12.7001C8.47466 12.4742 8.01008 12.5725 7.78417 12.9197L9.04145 13.7377ZM6.37136 15.091C6.14545 15.4381 6.24377 15.9027 6.59096 16.1286C6.93815 16.3545 7.40273 16.2562 7.62864 15.909L6.37136 15.091ZM22.6894 7.29544C22.8525 6.91472 22.6762 6.47381 22.2954 6.31064C21.9147 6.14747 21.4738 6.32384 21.3106 6.70456L22.6894 7.29544ZM19 11.1288L18.4867 10.582V10.582L19 11.1288ZM19.9697 13.1592C20.2626 13.4521 20.7374 13.4521 21.0303 13.1592C21.3232 12.8663 21.3232 12.3914 21.0303 12.0985L19.9697 13.1592ZM11.25 16.5C11.25 16.9142 11.5858 17.25 12 17.25C12.4142 17.25 12.75 16.9142 12.75 16.5H11.25ZM16.3714 15.909C16.5973 16.2562 17.0619 16.3545 17.409 16.1286C17.7562 15.9027 17.8545 15.4381 17.6286 15.091L16.3714 15.909ZM5.53033 11.6592C5.82322 11.3663 5.82322 10.8914 5.53033 10.5985C5.23744 10.3056 4.76256 10.3056 4.46967 10.5985L5.53033 11.6592ZM2.96967 12.0985C2.67678 12.3914 2.67678 12.8663 2.96967 13.1592C3.26256 13.4521 3.73744 13.4521 4.03033 13.1592L2.96967 12.0985ZM12 13.25C8.77611 13.25 6.46133 11.6446 4.9246 9.98966C4.15645 9.16243 3.59325 8.33284 3.22259 7.71014C3.03769 7.3995 2.90187 7.14232 2.8134 6.96537C2.76919 6.87696 2.73689 6.80875 2.71627 6.76411C2.70597 6.7418 2.69859 6.7254 2.69411 6.71533C2.69187 6.7103 2.69036 6.70684 2.68957 6.70503C2.68917 6.70413 2.68896 6.70363 2.68892 6.70355C2.68891 6.70351 2.68893 6.70357 2.68901 6.70374C2.68904 6.70382 2.68913 6.70403 2.68915 6.70407C2.68925 6.7043 2.68936 6.70456 2 7C1.31064 7.29544 1.31077 7.29575 1.31092 7.29609C1.31098 7.29624 1.31114 7.2966 1.31127 7.2969C1.31152 7.29749 1.31183 7.2982 1.31218 7.299C1.31287 7.30062 1.31376 7.30266 1.31483 7.30512C1.31698 7.31003 1.31988 7.31662 1.32353 7.32483C1.33083 7.34125 1.34115 7.36415 1.35453 7.39311C1.38127 7.45102 1.42026 7.5332 1.47176 7.63619C1.57469 7.84206 1.72794 8.13175 1.93366 8.47736C2.34425 9.16716 2.96855 10.0876 3.8254 11.0103C5.53867 12.8554 8.22389 14.75 12 14.75V13.25ZM15.3125 12.6308C14.3421 13.0128 13.2417 13.25 12 13.25V14.75C13.4382 14.75 14.7246 14.4742 15.8619 14.0266L15.3125 12.6308ZM7.78417 12.9197L6.37136 15.091L7.62864 15.909L9.04145 13.7377L7.78417 12.9197ZM22 7C21.3106 6.70456 21.3107 6.70441 21.3108 6.70427C21.3108 6.70423 21.3108 6.7041 21.3109 6.70402C21.3109 6.70388 21.311 6.70376 21.311 6.70368C21.3111 6.70352 21.3111 6.70349 21.3111 6.7036C21.311 6.7038 21.3107 6.70452 21.3101 6.70576C21.309 6.70823 21.307 6.71275 21.3041 6.71924C21.2983 6.73223 21.2889 6.75309 21.2758 6.78125C21.2495 6.83757 21.2086 6.92295 21.1526 7.03267C21.0406 7.25227 20.869 7.56831 20.6354 7.9432C20.1669 8.69516 19.4563 9.67197 18.4867 10.582L19.5133 11.6757C20.6023 10.6535 21.3917 9.56587 21.9085 8.73646C22.1676 8.32068 22.36 7.9668 22.4889 7.71415C22.5533 7.58775 22.602 7.48643 22.6353 7.41507C22.6519 7.37939 22.6647 7.35118 22.6737 7.33104C22.6782 7.32097 22.6818 7.31292 22.6844 7.30696C22.6857 7.30398 22.6867 7.30153 22.6876 7.2996C22.688 7.29864 22.6883 7.29781 22.6886 7.29712C22.6888 7.29677 22.6889 7.29646 22.689 7.29618C22.6891 7.29604 22.6892 7.29585 22.6892 7.29578C22.6893 7.29561 22.6894 7.29544 22 7ZM18.4867 10.582C17.6277 11.3882 16.5739 12.1343 15.3125 12.6308L15.8619 14.0266C17.3355 13.4466 18.5466 12.583 19.5133 11.6757L18.4867 10.582ZM18.4697 11.6592L19.9697 13.1592L21.0303 12.0985L19.5303 10.5985L18.4697 11.6592ZM11.25 14V16.5H12.75V14H11.25ZM14.9586 13.7377L16.3714 15.909L17.6286 15.091L16.2158 12.9197L14.9586 13.7377ZM4.46967 10.5985L2.96967 12.0985L4.03033 13.1592L5.53033 11.6592L4.46967 10.5985Z" fill="#495057"/>\n</svg>'}init(){const e=this;let t=e.form.querySelectorAll('[type="password"]');t.length&&t.forEach((function(t){let s=t.parentNode;if(s){s.style.position="relative";let i=s.querySelector('[data-vg-toggle="show-pass"]');i||(i=document.createElement("span"),i.setAttribute("data-vg-toggle","show-pass"),i.setAttribute("title","Показать"),i.setAttribute("aria-expanded","false"),i.style.position="absolute",i.style.cursor="pointer",i.style.width="24px",i.style.height="24px",i.style.top="50%",i.style.transform="translateY(-50%)",i.style.right="12px",i.innerHTML=e.eyeOpen,s.append(i)),e.toggle(i,t)}}))}toggle(e,t){const s=this;e.onclick=function(){let i=this,r=e.dataset.iconClose,a=e.dataset.iconOpen;if("true"===e.getAttribute("aria-expanded")){if(a){let t=e.querySelector("i");t&&t.classList.contains(r)&&(t.classList.remove(r),t.classList.add(a))}else e.innerHTML=s.eyeOpen;t.setAttribute("type","password"),i.setAttribute("aria-expanded","false")}else{if(r){let t=e.querySelector("i");t&&t.classList.contains(a)&&(t.classList.remove(a),t.classList.add(r))}else e.innerHTML=s.eyeClose;t.setAttribute("type","text"),i.setAttribute("aria-expanded","true")}}}};function l(e){return{error:'<svg viewbox="0 0 500 500" class="am_Error_Icon"><path class="am_SVG_circle" d="m444.34693,114.07007a236.95276,236.95276 0 0 1 44.1553,137.73747c0,129.97005 -106.94772,236.96443 -236.91777,236.96443s-236.91777,-106.94772 -236.91777,-236.91777s106.94772,-236.96443 236.91777,-236.96443a236.99941,236.99941 0 0 1 168.72548,70.59483"></path><line class="am_SVG_error1" y2="390" x2="390" y1="110" x1="110"></line><line class="am_SVG_error2" y2="390" x2="110" y1="110" x1="390"></line></svg>',success:'<svg viewbox="0 0 500 500" class="am_Success_Icon"><path class="am_SVG_circle" d="m443.0136,114.07007a236.95276,236.95276 0 0 1 44.1553,137.73747c0,129.97005 -106.94772,236.96443 -236.91777,236.96443s-236.91777,-106.94772 -236.91777,-236.91777s106.94772,-236.96443 236.91777,-236.96443a236.99941,236.99941 0 0 1 168.72548,70.59483"></path><polyline class="am_SVG_check" points="104.4892349243164,309.2001647949219 195.57406616210938,402.9600524902344 418.9292297363281,85.03718566894531 "></polyline></svg>',cross:'<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 224.512 224.512" style="enable-background:new 0 0 224.512 224.512;" xml:space="preserve"><g><polygon style="fill:#010002;" points="224.507,6.997 217.521,0 112.256,105.258 6.998,0 0.005,6.997 105.263,112.254 0.005,217.512 6.998,224.512 112.256,119.24 217.521,224.512 224.507,217.512 119.249,112.254 "/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>'}[e]??{}}const d=class{constructor(e,t){this.form=e,this.params=t,this.classes={container:"vg-form-sender--alert-block"}}init(){const e=this;let t=e.form.querySelector("."+e.classes.container);t||(t=e.draw()),"beforeSend"===e.params.status?t.classList.contains("active")&&(e.toggleSlide(t),t.classList.remove("active"),setTimeout((()=>t.remove()),500)):(e.setActive(t),e.setText(t),e.close(t),e.toggleSlide(t))}setActive(e){e.classList.add("active");let t=e.querySelectorAll(".show");if(t.length)for(const e of t)e.classList.remove("show")}setText(e){const t=this;let s=t.params.data,i="error"===t.params.status?"danger":t.params.status;if(!s||"beforeSend"===t.params.status)return!1;a(s)&&("errors"in s&&s.errors||"error"in s&&s.error)&&(i="danger");let r=e.querySelector(".vg-alert-"+i);if(r){let e=r.querySelector("[data-alert-"+i+"-text]");if(e)if("string"==typeof s)e.innerHTML=s;else if("msg"in s){e.innerHTML=s.msg;let t=r.querySelector("[data-alert-"+i+"-title]");t&&"title"in s&&(t.innerHTML=s.title)}r.classList.add("show")}else e.innerHTML=s.msg}close(e){const t=this;let s=e.querySelector('[data-dismiss="alert-block"]');s&&(s.onclick=function(){return t.toggleSlide(e),e.classList.remove("active"),!1})}draw(){let e=this.form,t=document.querySelector('[data-form="'+e.id+'"]');if(t)return t;let s=document.createElement("div");return s.classList.add(this.classes.container),s.innerHTML='<div class="close"><a href="#" data-dismiss="alert-block">'+l("cross")+'</a></div><div class="vg-alert vg-alert-danger">\t<div class="svg-area">'+l("error")+'</div>\t<div class="content-area">\t\t<div class="title-area" data-alert-danger-title></div>\t\t<div class="text-area" data-alert-danger-text></div>\t</div></div><div class="vg-alert vg-alert-success">\t<div class="svg-area">'+l("success")+'</div>\t<div class="content-area">\t\t<div class="title-area" data-alert-success-title></div>\t\t<div class="text-area" data-alert-success-text></div>\t</div></div>',e.prepend(s),s}toggleSlide(e){if(e.getAttribute("data-max-height"))"0"===e.style.maxHeight.replace("px","").replace("%","")?e.style.maxHeight=e.getAttribute("data-max-height"):e.style.maxHeight="0";else{let t=function(e){let t=window.getComputedStyle(e),s=t.display,i=t.position,r=t.visibility,a=t.maxHeight.replace("px","").replace("%",""),n=0;return"none"!==s&&"0"!==a?e.offsetHeight:(e.style.position="absolute",e.style.visibility="hidden",e.style.display="block",n=e.offsetHeight,e.style.display=s,e.style.position=i,e.style.visibility=r,n)}(e)+"px"||0;e.style.transition="max-height 0.5s ease-in-out",e.style.overflowY="hidden",e.style.maxHeight="0",e.setAttribute("data-max-height",t),e.style.display="block",setTimeout((function(){e.style.maxHeight=t}),10)}}},c=class{constructor(e,t){this.form=e,this.params=s({content_over:!0,hideDelay:350,showDelay:50},t),this.classes={container:"vg-form-sender--alert-modal",backdrop:"vg-form-sender--alert-backdrop"},this.element=null,this.backdrop=null}init(){const e=this;if("beforeSend"===e.params.status)return!1;e.element=e.form.querySelector("."+e.classes.container),e.element||(e.element=e.draw()),e.backdrop=document.createElement("div"),e.backdrop.classList.add(e.classes.backdrop),e.toggle()}toggle(){return document.body.classList.contains("vg-modal-open")?this.hide():this.show()}show(){const e=this;document.body.classList.add("vg-modal-open"),e.element.style.display="block",e.params.content_over&&(document.body.style.paddingRight=window.innerWidth-document.documentElement.clientWidth+"px",document.body.style.overflow="hidden"),setTimeout((()=>{e.element.classList.add("active"),e.backdrop.classList.add("active"),r(e.element,"vg.fs.modal.open",e)}),e.params.showDelay),document.body.append(e.element),document.body.append(e.backdrop),e.setText(e.element),window.addEventListener("keydown",(t=>{"Escape"!==t.key&&"Esc"!==t.key||e.hide()})),e.element.onclick=function(t){return t.target===document.querySelector("."+e.classes.container)&&e.hide(),!1};let t=e.element.querySelector('[data-vg-dismiss="modal"]');t&&(t.onclick=function(){return e.hide(),!1})}hide(){const e=this;document.body.classList.remove("vg-modal-open"),e.element.classList.remove("active"),e.backdrop.classList.remove("active"),setTimeout((()=>{e.element.style.display="",e.backdrop.remove(),e.element.remove(),e.params.content_over&&(document.body.style.paddingRight="",document.body.style.overflow="")}),e.params.hideDelay)}draw(){let e=document.createElement("div");return e.classList.add(this.classes.container),e.innerHTML='<div class="modal-content">   <div class="close"><a href="#" data-vg-dismiss="modal">'+l("cross")+'</a></div>   <div class="modal-body vg-alert-content">       <div class="vg-alert vg-alert-danger">\t        <div class="svg-area">'+l("error")+'</div>\t        <div class="content-area">\t\t     <div class="title-area" data-alert-danger-title></div>\t\t     <div class="text-area" data-alert-danger-text></div>\t        </div>       </div>       <div class="vg-alert vg-alert-success">\t        <div class="svg-area">'+l("success")+'</div>\t        <div class="content-area">\t\t        <div class="title-area" data-alert-success-title></div>\t\t        <div class="text-area" data-alert-success-text></div>\t        </div>   </div></div>',e}setText(e){const t=this;let s=t.params.data,i="error"===t.params.status?"danger":t.params.status;if(!s&&"response"in s&&!s.response)return!1;let r=n(s.response);a(r)&&("errors"in s&&r.errors||"error"in r&&r.error)&&(i="danger");let o=e.querySelector(".vg-alert-"+i);if(o){let e=o.querySelector("[data-alert-"+i+"-text]"),l=o.querySelector("[data-alert-"+i+"-title]");if(e)if(r){if("string"==typeof r)e.innerHTML=r;else if("message"in r&&r.message){let t=n(r.errors)||null;if(Array.isArray(t)||a(t)){if(a(t))for(const s in t)Array.isArray(t[s])?t[s].forEach((function(t){e.innerHTML+="<div>"+t+"</div>"})):e.innerHTML="<div>"+t[s]+"</div>"}else e.innerHTML=r.message;l&&"title"in r&&(l.innerHTML=r.title)}}else"error"===t.params.status&&(l.innerHTML="Ошибка",e.innerHTML=s.text);o.classList.add("show")}else e.innerHTML=r}},u=class{constructor(e){this.plugins=e.settings.plugins,this.formsender=e}init(){const e=this;if(e.plugins.length)for(const t of e.plugins){let s=Object.keys(t)[0];if(t[s].enabled)switch(s){case"showPass":void 0!==o&&new o(e.formsender.form,t[s].params).init();break;case"divBlock":void 0!==d&&new d(e.formsender.form,t[s].params).init();break;case"VGModal":void 0!==d&&new c(e.formsender.form,t[s].params).init()}}}},f=class{constructor(e,t={}){this.extElement={},this.settings={},this.form=null;const i={action:location.href,method:"post",fields:[],redirect:null,isJsonParse:!0,isValidate:!1,isSubmit:!0,isBtnText:!0,alert:{enabled:!0,delay:350,params:{type:"modal"}},plugins:[{showPass:{enabled:!0,params:{}}},{divBlock:{enabled:!1,params:{}}},{VGModal:{enabled:!1,params:{}}}]};if(!e)return console.error("Первый параметр не должен быть пустым"),!1;"string"==typeof e?document.querySelector(e)&&(this.form=e):this.form=e,this.form&&(this.settings=function(e,t,i){"plugins"in i&&i.plugins.length&&(i.plugins.forEach((function(e,r){for(const a in e)t.plugins.forEach(((e,n)=>{for(const o in e)o===a&&(t.plugins[n]=s(t.plugins[n],i.plugins[r]))}))})),delete i.plugins);let r=s(t,i),a=[].filter.call(e.attributes,(function(e){return/^data-/.test(e.name)}));for(let e of a)"data-alert-type"===e.name&&e.value&&(r.alert.params.type=e.value),"data-alert"===e.name&&(r.alert.enabled="false"!==e.value),"data-submit"===e.name&&(r.isSubmit="false"!==e.value),"data-show-text"===e.name&&(r.isBtnText="false"!==e.value),"data-validate"===e.name&&(r.isValidate="false"!==e.value),"data-json-parse"===e.name&&(r.isJsonParse="false"!==e.value),"data-redirect"===e.name&&e.value&&(r.redirect=e.value),"data-plugins"===e.name&&e.value&&(r.plugins=n(JSON.parse(e.value)));function n(e){let i={};for(const r of t.plugins)Object.keys(r)[0]===Object.keys(e)[0]&&(i=s(r,e));return i}return r.action=e.getAttribute("action")||r.action,r.method=e.getAttribute("method")||r.method,r}(e,i,t),this.classes={general:"vg-form-sender"},this.settings.fields&&"function"==typeof this.settings.fields&&(this.settings.fields=this.settings.fields()),this.init())}init(){const e=this;e.form.classList.add(e.classes.general),e.settings.isValidate&&(e.form.setAttribute("novalidate",""),e.form.classList.add("needs-validation"));let t=e.form.querySelector('[type="submit"]');t||(t=document.querySelector('[form="'+e.form.id+'"]')),e.extElement.button=t,"plugins"in e.settings&&new u(e).init(),e.isInit=!0}submit(e){if(!this.isInit)return!1;const t=this;t.form.onsubmit=function(s){if(t.settings.isValidate&&!t.form.checkValidity())return s.preventDefault(),s.stopPropagation(),t.form.classList.add("was-validated"),!1;if(!t.settings.isSubmit)return!1;let i=new FormData(t.form);return"object"==typeof t.settings.fields&&(t.data=function(e,t){for(let s in t)if("object"==typeof t[s])for(let i in t[s]){let r=Object.keys(t[s][i]).map((function(e){return t[s][i][e]}));e.append(s,r)}else e.append(s,t[s]);return e}(i,t.settings.fields)),t.request(e,s)}}request(e,t){if(!this.isInit)return!1;const s=this;let a=s.settings.method.toLowerCase(),n=s.settings.action,o=s.data;function l(i,a){s.form.classList.remove("was-validated"),"string"==typeof i&&"error"===i?(e&&"error"in e&&"function"==typeof e.error&&e.error(t,s,a),r(s.form,"vg.fs.error")):"string"==typeof i&&"success"===i&&(e&&"success"in e&&"function"==typeof e.success&&e.success(t,s,a),r(s.form,"vg.fs.success")),s.settings.redirect&&(window.location.href=s.settings.redirect)}return e&&"beforeSend"in e&&"function"==typeof e.beforeSend&&e.beforeSend(t,s),r(s.form,"vg.fs.before"),"post"===a&&i.post(n,o,(function(e,t){l(e,t)})),"get"===a&&i.get(n,o,(function(e,t){l(e,t)})),!1}},g=class extends f{constructor(e,t={}){return super(e,t),this.isAlert=this.settings.alert.enabled,this}submit(e){if(this.isAlert){const t=this;return super.submit({beforeSend:function(i,r){e&&"beforeSend"in e&&"function"==typeof e.beforeSend&&e.beforeSend(i,r),s(r,"beforeSend"),t.alert(r,null,"beforeSend")},error:function(t,r,a){e&&"error"in e&&"function"==typeof e.error&&e.error(t,r,a),s(r),i(a,"error",r)},success:function(t,r,a){e&&"success"in e&&"function"==typeof e.success&&e.success(t,r,a),s(r),i(a,"success",r)}});function s(e,s="default"){let i=e.extElement.button;if(i&&t.settings.isBtnText){let t={send:"Отправляем...",text:"Отправить"};if(i.hasAttribute("data-spinner")&&"beforeSend"===s&&i.insertAdjacentHTML("afterbegin",'<span class="spinner-border spinner-border-sm me-2"></span>'),i.hasAttribute("data-text"))t.text=i.getAttribute("data-text");else{let e=i.querySelector("[data-text]");e&&(t.text=e.getAttribute("data-text"),i=e)}if(i.hasAttribute("data-text-send"))t.send=i.getAttribute("data-text-send");else{let e=i.querySelector("[data-text-send]");e&&(t.send=e.getAttribute("data-text-send"),i=e)}if("beforeSend"===s)i.innerHTML=t.send,i.setAttribute("disabled","disabled");else{i.innerHTML=t.text,i.removeAttribute("disabled");let s=e.extElement.button.querySelector(".spinner-border");s&&s.remove()}}}function i(e,s,i){if(t.settings.isJsonParse&&"string"==typeof e){let r={};try{r=JSON.parse(e),t.alert(i,r,s)}catch(r){t.alert(i,e,s)}}else t.alert(i,e,s)}}return super.submit(e)}alert(e,t,s){if(!this.isAlert)return!1;setTimeout((()=>{let e;"block"===this.settings.alert.params.type&&(e="divBlock"),"modal"===this.settings.alert.params.type&&(e="VGModal"),e&&(this.settings.plugins.find((t=>t[e]))[e].enabled=!0,this.settings.plugins.find((t=>t[e]))[e].params.data=t,this.settings.plugins.find((t=>t[e]))[e].params.status=s),"plugins"in this.settings&&new u(this).init()}),this.settings.alert.delay)}};vg=t})();
//# sourceMappingURL=vgformsender.js.map