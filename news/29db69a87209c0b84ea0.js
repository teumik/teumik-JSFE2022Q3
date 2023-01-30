(()=>{"use strict";var e={d:(t,n)=>{for(var s in n)e.o(n,s)&&!e.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:n[s]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{S:()=>a,W:()=>c});const t=class{baseLink;options;constructor(e,t){this.baseLink=e,this.options=t}getResp({endpoint:e,options:t={}},n){if(void 0===n)throw new Error("No callback for GET response");this.load("GET",e,n,t)}errorHandler(e){if(!e.ok){const t=new Error;throw t.message=`\nResponse code: ${e.status}\n${e.statusText}`,401!==e.status&&404!==e.status||(t.name=`${c[e.status]||"Unnamed"}`),t}return e}makeUrl(e,t){const n={...this.options,...e};let s=`${this.baseLink}${t}?`;return Object.keys(n).forEach((e=>{s+=`${e}=${n[e]}&`})),s.slice(0,-1)}load(e,t,n,s={}){fetch(this.makeUrl(s,t),{method:e}).then(this.errorHandler).then((e=>e.json())).then((e=>{n(e)})).catch((e=>{throw new Error(e)}))}},n=class extends t{constructor(){super("https://newsapi-redirect-production.up.railway.app/",{apiKey:"cac0c587301e4203ab77822adec8a54f"})}},s=class extends n{getSources(e,t=""){super.getResp({endpoint:"sources",options:{language:t}},e)}getNews(e,t){let{target:n}=e;const s=e.currentTarget;for(;n!==s;){if(n.classList.contains("source__item")){const e=String(n.getAttribute("data-source-id"));return void(s.getAttribute("data-source")!==e&&(s.setAttribute("data-source",e),super.getResp({endpoint:"everything",options:{sources:e}},t)))}n=n.parentNode}}};class r{news;sources;constructor(){this.news=new class{draw(e){const t=e.length>=10?e.filter(((e,t)=>t<10)):e,n=document.createDocumentFragment(),s=document.querySelector("#newsItemTemp");t.forEach(((e,t)=>{const r=s.content.cloneNode(!0);t%2&&r.querySelector(".news__item")?.classList.add("alt"),r.querySelector(".news__meta-photo").style.backgroundImage=`url(${e.urlToImage||"img/news_placeholder.jpg"})`,r.querySelector(".news__meta-author").textContent=e.author||e.source.name,r.querySelector(".news__meta-date").textContent=e.publishedAt.slice(0,10).split("-").reverse().join("-"),r.querySelector(".news__description-title").textContent=e.title,r.querySelector(".news__description-source").textContent=e.source.name,r.querySelector(".news__description-content").textContent=e.description,r.querySelector(".news__read-more a")?.setAttribute("href",e.url),n.append(r)})),document.querySelector(".news").innerHTML="",document.querySelector(".news").appendChild(n)}},this.sources=new class{draw(e){const t=document.createDocumentFragment(),n=document.querySelector("#sourceItemTemp");e.forEach((e=>{const s=n.content.cloneNode(!0);s instanceof DocumentFragment&&(s.querySelector(".source__item-name").textContent=e.name,s.querySelector(".source__item")?.setAttribute("data-source-id",e.id)),t.append(s)}));const s=document.querySelector(".sources");s&&(0!==s.childElementCount?s.replaceChildren(t):s.append(t))}}}drawNews(e){const t=e?.articles?e?.articles:[];this.news.draw(t)}drawSources(e){const t=e?.sources?e?.sources:[];this.sources.draw(t)}}class o{input;source;button;constructor(){this.input=document.querySelector(".search__input"),this.source=document.getElementsByClassName("source__item"),this.button=document.querySelector(".search__button")}onInput(e){if(!(e instanceof InputEvent))return;const{value:t}=e.target;Array.from(this.source).forEach((e=>{if(e instanceof HTMLDivElement){const n=e;n.hidden=!0,n.innerText.toLocaleUpperCase().trim().includes(t.trim().toLocaleUpperCase())&&(n.hidden=!1)}}))}onReset(){this.input.value="",Array.from(this.source).forEach((e=>{e instanceof HTMLDivElement&&(e.hidden=!1)}))}}var a,c;!function(e){e.ar="Arabic",e.de="German",e.en="English",e.es="Spanish",e.fr="French",e.he="Hebrew",e.it="Italian",e.nl="Dutch",e.no="Norwegian",e.pt="Portuguese",e.ru="Russian",e.se="Northern Sami",e.sv="Swedish",e.ud="Urdu",e.zh="Chinese"}(a||(a={})),function(e){e[e.Unauthorized=401]="Unauthorized",e[e["Not Found"]=404]="Not Found"}(c||(c={})),(new class{controller;view;lang;search;constructor(){this.controller=new s,this.view=new r,this.lang=new class{langValue;container;constructor(){this.container=document.querySelector(".languages"),this.langValue=""}set lang(e){this.langValue=e}get lang(){return this.langValue}changeStateMenu(){this.container.querySelector(".languages__items")?.classList.toggle("languages__items_visible")}changeStateItem(e,t){t&&e&&(this.container.querySelectorAll(".languages__item").forEach((e=>e.classList.remove("languages__item_active"))),e.classList.add("languages__item_active")),this.changeStateMenu()}drawMenuItems(e){if(e.sources){const t=document.createDocumentFragment();[...new Set(e.sources.map((e=>e.language)))].forEach((e=>{const n=document.createElement("div");n.dataset.langId=e,n.classList.add("languages__item"),n.innerHTML=a[e],t.append(n)}));const n=this.container.lastElementChild;n&&(0!==n.children.length?n.replaceChildren(t):n.append(t))}}},this.search=new o}start(){document.querySelector(".sources").addEventListener("click",(e=>this.controller.getNews(e,(e=>{this.view.drawNews(e)})))),this.controller.getSources((e=>{this.lang.drawMenuItems(e),this.view.drawSources(e)})),this.lang.container.addEventListener("click",(e=>{const{target:t}=e,{langId:n}=t.dataset;n?(this.lang.lang=n,this.lang.changeStateItem(t,n),this.search.onReset(),this.controller.getSources((e=>{this.view.drawSources(e)}),this.lang.lang)):this.lang.changeStateMenu()})),document.addEventListener("click",(e=>{const{target:t}=e,n=t.closest(".languages");document.querySelector(".languages__items_visible")&&!n&&this.lang.changeStateMenu()})),globalThis.addEventListener("load",(()=>{this.lang.container.lastElementChild.hidden=!1})),this.search.input.addEventListener("input",(e=>{this.search.onInput(e)})),this.search.button.addEventListener("click",(()=>{this.search.onReset()}))}}).start()})();