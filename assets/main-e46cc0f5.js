(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))c(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&c(i)}).observe(document,{childList:!0,subtree:!0});function n(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function c(o){if(o.ep)return;o.ep=!0;const r=n(o);fetch(o.href,r)}})();window.addEventListener("resize",S);function S(){const e=window.innerWidth,t=document.querySelector(".container").offsetWidth,n=document.querySelector(".map-info");n!=null&&(e>=1024?n.style.left=(e-t)/2+"px":n.removeAttribute("style"))}S();document.querySelector(".disclamer_switch").addEventListener("click",function(e){e.preventDefault(),document.querySelector(".disclamer").style.display=document.querySelector(".disclamer").style.display==="none"?"block":"none",window.scrollTo({top:document.body.scrollHeight,behavior:"smooth"})});document.querySelectorAll(".color-link").forEach(function(e){e.addEventListener("click",function(t){if(t.preventDefault(),this.classList.contains("active"))return!1;const n=this.closest(".model"),c=n.getAttribute("data-dir"),o=this.getAttribute("data-color"),r=this.getAttribute("title");n.querySelectorAll(".color-link.active").forEach(i=>{i.classList.remove("active")}),n.querySelectorAll(`[data-color="${o}"]`).forEach(i=>{i.classList.add("active")}),n.querySelectorAll(".color-img-preview").forEach(i=>{i.setAttribute("src",`img/${c}/${o}.png`)}),n.querySelectorAll(".color-name").forEach(i=>{i.textContent=r})})});const d="map";function q(){document.getElementById(d)!=null&&ymaps.ready(function(){var e="./img/map.balloon.png",t=[-21,-58],n=[43,62],c=new ymaps.Map(d,{center:[53.184186,50.152134],zoom:16,controls:["zoomControl"]},{searchControlProvider:"yandex#search"});c.behaviors.disable("scrollZoom");var o=new ymaps.Placemark([53.184186,50.152134],{balloonContent:"г. Самара, ул. Ново-Урицкая, д. 22",hintContent:"г. Самара, ул. Ново-Урицкая, д. 22"},{iconLayout:"default#image",iconImageHref:e,iconImageSize:n,iconImageOffset:t});c.geoObjects.add(o)})}function x(){function e(c,o){var r=document.createElement("script");r.readyState?r.onreadystatechange=function(){(r.readyState=="loaded"||r.readyState=="complete")&&(r.onreadystatechange=null,o())}:r.onload=function(){o()},r.src=c,document.getElementsByTagName("head")[0].appendChild(r)}var t=0;function n(){t==0&&(t=1,e("https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;loadByRequire=1",function(){ymaps.load(q)}))}if(document.getElementById(d)!=null){const c=document.getElementById(d);c.addEventListener("touchstart",function(){n()}),c.addEventListener("mouseenter",function(){n()}),c.click(function(){n()})}}x();const u=e=>document.querySelectorAll(e);function w(e){let t=this.value.replace(/^(\+7|8)/g,"").replace(/\D/g,"").split(/(?=.)/),n=t.length;0<=n&&t.unshift("+7"),1<=n&&t.splice(1,0," "),4<=n&&t.splice(5,0," "),7<=n&&t.splice(9,0,"-"),9<=n&&t.splice(12,0,"-"),11<=n&&t.splice(15,t.length-15),this.value=t.join(""),this.nextSibling.nextElementSibling.classList.add("hidden")}u("input[name=phone]").forEach(function(e){e.addEventListener("focus",w),e.addEventListener("input",w)});u("input[name=agree]").forEach(function(e){let t=e.parentElement.querySelector(".agree");e.addEventListener("change",n=>{n.target.checked?t.classList.add("hidden"):t.classList.remove("hidden")})});const b=10,E=(e,t)=>{e.value.length>=t&&e.nextSibling.nextElementSibling.classList.add("hidden")};u("textarea").forEach(function(e){e.addEventListener?e.addEventListener("input",function(){E(e,b)},!1):e.attachEvent&&e.attachEvent("onpropertychange",function(){E(e,b)})});const s=(e,t,n=!1)=>{e.value=t,e.disabled=n},l=(e,t,n)=>{let c=e.querySelector(t);c.innerText=n,c.classList.remove("hidden")},p=(e,t,n)=>{document.querySelectorAll(".modal-overlay").forEach(c=>{c.classList.add("hidden")}),e.querySelector("#icon").innerHTML=t,e.querySelector("p").innerHTML=n,e.classList.remove("hidden")};u("form").forEach(e=>{const t=e.querySelector('input[type="submit"]');e.onsubmit=async n=>{n.preventDefault(),s(t,"Отправляем...",!0);const c=e.querySelector('[name="agree"]'),o=e.querySelector('[name="phone"]'),r='<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><path fill="#ed1c24" d="M26,0A26,26,0,1,0,52,26,26,26,0,0,0,26,0Zm9.6,17.5a1.94,1.94,0,0,1,2,2,2,2,0,1,1-2-2Zm-19.2,0a1.94,1.94,0,0,1,2,2,2,2,0,1,1-2-2ZM39.65,40.69a.93.93,0,0,1-.45.11,1,1,0,0,1-.89-.55,13.81,13.81,0,0,0-24.62,0,1,1,0,1,1-1.78-.9,15.8,15.8,0,0,1,28.18,0A1,1,0,0,1,39.65,40.69Z"></path></svg>',i='<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><path fill="#279548" d="M26,0A26,26,0,1,0,52,26,26,26,0,0,0,26,0Zm9.6,17.5a1.94,1.94,0,0,1,2,2,2,2,0,1,1-2-2Zm-19.2,0a2,2,0,1,1-2,2A2,2,0,0,1,16.4,17.5ZM40.09,32.15a15.8,15.8,0,0,1-28.18,0,1,1,0,0,1,1.78-.9,13.81,13.81,0,0,0,24.62,0,1,1,0,1,1,1.78.9Z"></path></svg>',h='<b class="text-bold block text-2xl mb-4">Упс!</b> Что-то пошло не так. Перезагрузите страницу и попробуйте снова. ';let y="";const f=document.getElementById("message-modal");if(y='<b class="text-bold block text-2xl mb-4">Спасибо!</b> В скором времени мы свяжемся с Вами!',o.value.length){if(!new RegExp(/^\+7 [0-9]{3} [0-9]{3}-[0-9]{2}-[0-9]{2}$/).test(o.value)){l(e,".phone","Введен некорректный номер телефона"),s(t,"Отправить");return}}else{l(e,".phone","Телефон является обязательным полем"),s(t,"Отправить");return}if(!c.checked){l(e,".agree","Чтобы продолжить, установите флажок"),s(t,"Отправить");return}let m=new FormData(e);const g=new URLSearchParams([...new FormData(n.target).entries()]);m.append("page_url",window.location.origin+window.location.pathname),window.location.search.slice(1).split("&").forEach(function(a){var v=a.split("=");m.append(v[0],v[1])});for(const a of m)g.append(a[0],a[1]);return await fetch("https://alexsab.ru/lead/jetour/alpha/",{method:"POST",mode:"cors",cache:"no-cache",credentials:"same-origin",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:g}).then(a=>a.json()).then(a=>{if(console.log(a),s(t,"Отправить"),a.answer=="required"){l(e,a.field,a.message);return}else a.answer=="error"?p(f,r,h+"<br>"+a.error):p(f,i,y);e.reset()}).catch(a=>{console.error("Ошибка отправки данных формы: "+a),p(f,r,h+"<br>"+a),s(t,"Отправить")}),!1}});document.querySelectorAll(".popup-link").forEach(e=>e.onclick=t=>{t.preventDefault();let n=e.getAttribute("href");if(n==="#"||!n)return;const c=document.getElementById(n.replace("#",""));if(!c)return;c.classList.remove("hidden");const o=c.querySelector(".caption");o&&(o.innerText=e.dataset.title);const r=e.dataset.form_name,i=c.querySelector('input[name="form"]');r&&i&&(i.value=r),document.body.classList.add("overflow-hidden")});document.querySelectorAll(".modal-overlay").forEach(e=>{document.addEventListener("keydown",t=>{t.key=="Escape"&&L(e)}),e.addEventListener("click",t=>{typeof t.target.dataset.close<"u"&&L(e)})});function L(e){const t=e.querySelector("form");t&&t.reset(),document.querySelectorAll(".error-message").forEach(n=>{n.classList.add("hidden")}),e.classList.add("hidden"),document.body.classList.remove("overflow-hidden")}
