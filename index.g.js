var I=Object.defineProperty;var a=(e,t)=>I(e,"name",{value:t,configurable:!0});var K=(e,t)=>{for(var r in t)I(e,r,{get:t[r],enumerable:!0})};var L=a((e,t)=>{if(!(e instanceof Element))throw new TypeError(`hyperRTE: ${t} of type (${e?.constructor?.name}), expected (Element)`)},"checkel"),k=a((e,t)=>{if(!(e instanceof Node))throw new TypeError(`hyperRTE: ${t} of type (${e?.constructor?.name}), expected (Node)`)},"checknode"),l=a((e,t)=>{if(typeof e!="string")throw new TypeError(`hyperRTE: ${t} of type (${e?.constructor?.name}), expected (String)`)},"checkstr"),f=a((e,t)=>{if(typeof e!="function")throw new TypeError(`hyperRTE: ${t} of type (${e?.constructor?.name}), expected (Function)`)},"checkfn"),g=a((e,t)=>{if(!Array.isArray(e))throw new TypeError(`hyperRTE: ${t} of type (${e?.constructor?.name}), expected (Array)`)},"checkarr");var q=a(e=>(e.forEach((t,r)=>{if(!(t instanceof Node))throw new TypeError(`hyperRTE: element at index (${r}) of type (${t?.constructor?.name}), expected (Element)`)}),e),"checkEls"),Q=/[a-z]/,V=a((e,t=document,r)=>{if(typeof e=="string"){if(e[0]?.match(Q))return[N(e,t instanceof Node?[]:t,r)];if(e[0]==="<"){let n=document.createElement("div");return n.innerHTML=e,Array.from(n.children)}return k(t,"root"),Array.from(t.querySelectorAll(e))}if(e instanceof Element)return[e];if(Array.isArray(e))return q(e);if(e?.length!==void 0)return q(Array.from(e));throw new TypeError(`hyperRTE: a of type (${e?.constructor?.name}), expected (String) or (Element) or (ArrayLike)}`)},"$el"),N=a((e,t={},r=[])=>{l(e,"tag"),g(r,"children");var n=document.createElement(e);for(let o in t){let s=t[o];if(o==="text")n.innerText=s;else if(o==="classList")n.classList=Array.isArray(s)?s.join(" "):s;else if(o==="style")Object.assign(n.style,s);else if(o==="attr")for(let i in s)n.setAttribute(i,s[i]);else if(o==="events")for(let i in s)n.addEventListener(i,s[i]);else n[o]=s}return n.append(...r),n},"create"),P=a((e,t=document)=>(l(e,"query"),k(t,"root"),Array.from(t.querySelectorAll(e))),"query"),h=a((e,t=!1)=>{l(e,"string");var r=document.createElement("div");return r.innerHTML=e,!t&&r.children.length===1?r.children[0]:Array.from(r.children)},"construct"),U=V;var $=class{static{a(this,"EventEmmiter")}constructor(t={},r={}){this.opts={addUndifined:!0,...t},this.events={};for(let n in r)this.add(n),g(r[n],"listners"),r[n].forEach(o=>this.on(n,o))}add(t){if(l(t,"name"),t in this.events)throw new ReferenceError(`events: adding defined event (${t})`);return this.events[t]=[],this}has(t){return l(t,"name"),t in this.events}on(t,r){if(typeof t=="object"){for(let n in t)this.on(n,t[n]);return this}if(l(t,"name"),f(r,"listner"),t in this.events)this.events[t].push(r);else if(this.opts.addUndifined)this.events[t]=[r];else throw new ReferenceError(`events: undefined event (${t})`);return this}off(t,r){if(l(t,"name"),f(r,"listner"),t in this.events)r?this.events[t].splice(this.events[t].indexOf(r),1):this.events[t]=[];else throw new ReferenceError(`events: undefined event (${t})`);return this}once(t,r){l(t,"name"),f(r,"listner");var n=a((...o)=>{r(...o),this.off(t,n)},"onceFn");return this.on(t,n)}trigger(t,...r){if(l(t,"name"),t in this.events)this.events[t].forEach(n=>n(...r));else throw new ReferenceError(`events: undefined event (${t})`);return this}};var _=a((e,t)=>{var r=e.mainEl=U(t)[0];if(!r)throw new Error(`HyperRTE: no element with selector (${t})`);r.classList.add("hrte");var n=e.toolbarEl=h('<div class="hrte-toolbar">');r.append(n);var o=e.contentEl=h('<div class="hrte-content">');r.append(o),o.contentEditable=!0,o.addEventListener("keyup",()=>e.trigger("stateChange")),o.addEventListener("mouseup",()=>e.trigger("stateChange")),o.addEventListener("input",s=>e.trigger("input",s)),o.addEventListener("cut",s=>e.trigger("cut",s)),o.addEventListener("copy",s=>e.trigger("copy",s)),o.addEventListener("paste",s=>e.trigger("paste",s))},"constructMainUI"),z=a((e,t)=>{var{buttons:r,toolbarEl:n}=e;t.forEach(o=>{if(o==="separator")return n.append(h("<span class='hrte-button-separator'>&nbsp;</span>"));var s=r[o];if(!s)throw new TypeError(`HyperRTE: undefined button (${o})`);var{title:i,creator:c,state:d,action:p}=s,u=h(`<button class='hrte-button' title='${i||""}'>`);c(u,e),p&&u.addEventListener("click",m=>{e.contentEl.focus(),e.doAction(o,p)}),d&&e.on("stateChange",()=>d(e,u)?u.classList.add("hrte-button-selected"):u.classList.remove("hrte-button-selected")),n.append(u)})},"constructToolbar");var B=a(e=>{e:if(e.children.length===1&&e.classList.contains("styled")){var t=e.children[0],r=e,n={};for(F(e,n);r.children.length===1&&r.childNodes.length===1&&t.tagName===r.tagName&&t.classList.contains("styled");)r=t,t=t.children[0],F(r,n);if(r===e)break e;Object.keys(n).forEach(o=>{r.classList.add("styled-"+o),r.style[o]=n[o]}),e.after(r),e.remove(),e=r}Array.from(e.children).forEach(o=>B(o))},"cleanStyles"),F=a((e,t)=>Array.from(e.classList).filter(r=>r.startsWith("styled-")).map(r=>{var n=r.slice(7);t[n]=e.style[n]}),"handleStyles");var A=a(e=>{L(e,"element"),e.after(...e.childNodes),e.remove()},"unwrap"),D=a(()=>{var e=getSelection();if(e.rangeCount){var t=e.getRangeAt(0),r=t.startContainer;for(r.nodeType!==r.ELEMENT_NODE&&(r=r.parentElement);!r.hasAttribute("contenteditable");){if(r===document.body)return;r=r.parentElement}return r}},"getContainer"),H=a((e,t,r)=>{L(e,"element"),t&&k(t,"offset element"),r&&L(r,"offset parent");var n=e.cloneNode(!1),o=Array.from(e.childNodes),s=!1;for(let i=0;i<o.length;i++){let c=o[i];(s||c===t)&&(s=!0,n.append(c))}return r?r.prepend(n):e.after(n),n},"splitEl"),w=a((e,t)=>{l(e,"tag"),t&&f(t,"function");var r=getSelection();if(r.rangeCount){var n=r.getRangeAt(0),o=D();if(o)for(var s=n.commonAncestorContainer;s!==o;){if(s.tagName===e.toUpperCase()&&(!t||t(s)))return s;s=s.parentElement}}},"getWrapped");var M=a((e,t,r=!0,n,o={})=>{L(e,"element"),l(t,"tag"),n&&f(n,"cleaner"),t=t.toLowerCase();var s=[...e.getElementsByTagName(t)];r&&e.tagName===t.toUpperCase()&&s.push(e),s=s.filter(i=>Array.from(i.classList).every(c=>c in S?S[c](i,o[c]):!0)),n&&(s=s.filter(n)),s.forEach(i=>A(i))},"clean"),O=a((e,t=[],r=[],n=[],o=new Set)=>{if(k(e,"node"),g(t,"doNotCleanTags"),e.nodeType===e.ELEMENT_NODE){var s=Array.from(e.childNodes),i=e.tagName.toLowerCase();if(n.includes(i))return;t.includes(i)||(e.childNodes.length===0?e.remove():r.includes(i)||(e.tagName===e.previousSibling?.tagName?(e.previousSibling.append(...s),e.remove()):o.has(i)&&!Array.from(e.classList).some(c=>c in S)&&(e.after(...s),e.remove()))),s.forEach(c=>O(c,t,r,n,new Set([...o,i])))}else e.nodeType===3&&(e.textContent===""?e.remove():e.previousSibling?.nodeType===e.TEXT_NODE&&(e.previousSibling.textContent+=e.textContent,e.remove()))},"cleanDom"),S={styled(e,t){if(!t)return!1;var[r,n]=t;return e.classList.contains(n+"-"+r)&&(e.classList.remove(n+"-"+r),e.style[r]=""),[...e.classList].reduce((o,s)=>s.startsWith(n)?o+1:o,0)===1}};var Y={unwrap:A,getContainer:D,splitEl:H,getWrapped:w,clean:M,cleanDom:O,cleanMap:S,isWrappedWith(e,t){return!!w(e,t)},surround(e,t=!0,r,n){L(e,"wrapper");var o=getSelection();if(!o.rangeCount)return{success:!1};var s=o.getRangeAt(0);return e.append(...s.cloneContents().childNodes),s.deleteContents(),t&&M(e,e.tagName,!1,r,n),s.insertNode(e),{success:!0,type:"surround",node:e}},undo(e,t,r){var n=getSelection();if(!n.rangeCount)return{success:!1};var o=n.getRangeAt(0),s=o.cloneContents();o.deleteContents();var i=document.createElement("span");i.append(s),M(i,e,!1,t,r),o.insertNode(i);var c=w(e,t);if(!c){var b=i.childNodes[0],y=i.childNodes[i.childNodes.length-1];return A(i),o.setStartBefore(b),o.setEndAfter(y),{success:!0,type:"undo"}}for(var d=i,p=[d];d!==c;)d=d.parentElement,p.unshift(d);var u;p.forEach((v,E)=>{v!==c&&(u=H(v.parentElement,v.nextSibling,u))});var m=p.reduce((v,E,x)=>{if(x===p.length-1)return v;var T=E.cloneNode(!1);return v===c?v.after(T):v.append(T),T});m===c?c.after(i):m.append(i);var b=i.childNodes[0],y=i.childNodes[i.childNodes.length-1];return A(i),o.setStartBefore(b),o.setEndAfter(y),{success:!0,type:"undo"}},replace(e="",t="text",r=!1){l(t,"replace type");var n=getSelection();if(!n.rangeCount)return{success:!1};var o=n.getRangeAt(0);if(o.deleteContents(),t==="node")o.insertNode(e);else{l(e,"topaste");let s=document.createElement("span");if(t==="text")s.innerText=e;else if(t==="html")s.innerHTML=e;else throw new TypeError("edit: undefined replace type ("+t+")");o.insertNode(s),r&&r(s)}return{success:!0,type:"replace"}},applyCss(e,t,r="span",n="styled",o=!0,s){l(e,"property"),l(t,"value");var i=document.createElement(r);return i.classList.add(n),i.classList.add(n+"-"+e),i.style[e]=t,this.surround(i,o,s,{styled:[e,n]})},copy(){var e=getSelection();if(!e.rangeCount)return"";var t=e.getRangeAt(0),r=document.createElement("div");return r.append(t.cloneContents()),r.innerHTML},cut(){var e=getSelection();if(!e.rangeCount)return"";var t=e.getRangeAt(0),r=document.createElement("div");return r.append(t.extractContents()),r.innerHTML},delete(){var e=getSelection();if(!e.rangeCount)return{success:!1};var t=e.getRangeAt(0);return t.deleteContents(),{success:!0,type:"delete"}},insert(e,t="text",r=!1){l(t,"insert type");var n=getSelection();if(!n.rangeCount)return{success:!1};var o=n.getRangeAt(0);if(t==="node")o.insertNode(e);else{l(e,"toinsert");var s=document.createElement("span");if(t==="text")s.innerText=e;else if(t==="html")s.innerHTML=e;else throw new Error("edit: undefined insert type ("+t+")");o.insertNode(s),r&&r(s)}return{success:!0,type:"insert"}},toggle(e,t=0,r,n,o){var s;if(e?.nodeType?(s=e,e=e.tagName.toLowerCase()):s=document.createElement(e),t===0)return this.isWrappedWith(e)?this.undo(e,n,o):this.surround(s,r,n,o);if(t===1)return this.surround(s,r,n,o);if(t===2)return this.undo(e,n,o);throw new Error("edit: toggle type is ("+t+"), expected 0, 1, or 2")},removeFormat(e=["b","i","u","s","sup","sub","span","div"]){g(e,"tagNames");var t=getSelection();if(!t.rangeCount)return{success:!1};var r=t.getRangeAt(0),n=t.toString();return r.deleteContents(),r.insertNode(new Text(n)),e.forEach(o=>this.undo(o)),{success:!0,type:"remove-format"}},getSelectedElement(){var e=getSelection();if(e.rangeCount){var t=e.getRangeAt(0).commonAncestorContainer;return t.nodeType===3?t.parentNode:t}},selectParagraph(){var e=getSelection();if(!e.rangeCount)return{success:!1};var t=e.getRangeAt(0),r=w("p");return r?(t.selectNode(r),{success:!0,type:"select"}):this.selectAll()},selectAll(){var e=getSelection();if(!e.rangeCount)return{success:!1};var t=e.getRangeAt(0),r=this.getContainer();return t.setStartBefore(r.firstChild),t.setEndAfter(r.lastChild),{success:!0,type:"select"}},bold(e){return this.toggle("b",e)},underline(e){return this.toggle("u",e)},italic(e){return this.toggle("i",e)},strikeThrough(e){return this.toggle("s",e)},subscript(e){return this.toggle("sub",e)},superscript(e){return this.toggle("sup",e)},backColor(e){return this.applyCss("background-color",e||"")},fontColor(e){return this.applyCss("color",e||"")},fontName(e){return this.applyCss("font-family",e||"")},fontSize(e){return this.applyCss("font-size",e||"")},link(e,t=!1){l(e,"url");var r=document.createElement("a");return r.href=e,t&&this.isWrappedWith("a")?this.undo("a"):this.surround(r)},img(e){l(e,"url");var t=document.createElement("img");return t.src=e,this.insert(t,"node")},heading(e=1,t){return this.toggle("h"+e,t)},orderedList(){var e=this.surround(document.createElement("li")),t=document.createElement("ol");return e.node.before(t),t.append(e.node),e},unorderedList(){var e=this.surround(document.createElement("li")),t=document.createElement("ul");return e.node.before(t),t.append(e.node),e},block(e){return this.toggle("div",e)},inline(e){return this.toggle("span",e)},paragraph(){var e=w("p");return e?(A(e),{success:!0,type:"undo"}):this.surround(document.createElement("p"))},quote(e){return this.toggle("q",e)},indent(e){return this.selectParagraph(),this.applyCss("text-indent",e||"","div")},align(e){return this.selectParagraph(),this.applyCss("text-align",e||"","div")},direction(e){return this.applyCss("direction",e||"","div")},hr(){return this.insert(document.createElement("hr"),"node")}},X=Y;var j={};K(j,{addColor:()=>re,addInput:()=>W,addInputs:()=>ne,addList:()=>ee,addMenu:()=>se,addNumber:()=>te,addPanel:()=>oe,createDialog:()=>Z,createDropDown:()=>R,createMenu:()=>G});var R=a((e=!0)=>{var t=h("<span class='hrte-dropDown'>"),r=a(s=>{e&&!t.contains(s.target)&&o()},"clickListner"),n=a(()=>{t.classList.add("hrte-dropDown-open"),document.body.addEventListener("click",r)},"open"),o=a(()=>{document.body.removeEventListener("click",r),t.classList.remove("hrte-dropDown-open")},"close");return[t,n,o]},"createDropDown"),Z=a((e=!0)=>{var t=h("<span class='hrte-dialog'>"),r=a(s=>{e&&!t.contains(s.target)&&o()},"clickListner"),n=a(()=>{t.classList.add("hrte-dialog-open"),document.body.addEventListener("click",r)},"open"),o=a(()=>{document.body.removeEventListener("click",r),t.classList.remove("hrte-dialog-open")},"close");return[t,n,o]},"createDialog"),ee=a((e,t,r)=>{var{title:n,icon:o,data:s,item:i,action:c,state:d}=r;g(s,"data"),l(o,"icon"),f(i,"item transformer"),f(c,"action"),e.addButton(t,{title:n,state:d,creator:p=>{var[u,m,b]=R();s.forEach((v,E)=>{E!==0&&u.append(h("<div class='hrte-list-separator'>"));var x=h("<div class='hrte-list-item'>");x.append(i(v,e)),x.addEventListener("click",()=>{b(),y(),e.doAction(t,()=>c(v,e))}),u.append(x)});var y;p.addEventListener("click",v=>{v.stopPropagation(),y=e.captureSelection(),m()}),e.toolbarEl.append(u),p.append(h(o))}})},"addList"),W=a((e,t,r)=>{var{title:n,icon:o,action:s,state:i,type:c,reset:d,...p}=r;l(o,"icon"),l(o,"type"),f(s,"action"),e.addButton(t,{title:n,state:i,creator:u=>{var[m,b,y]=R(),v;u.addEventListener("click",J=>{J.stopPropagation(),v=e.captureSelection(),b()});var E=h(c==="textarea"?"<textarea>":"<input>");c!=="textarea"&&(E.type=c),Object.assign(E,p);var x=h('<span class="hrte-button2">apply</span>');if(x.addEventListener("click",()=>{y(),v(),e.doAction(t,()=>s(E.value,e))}),d){var T=h('<span class="hrte-button2">remove</span>');T.addEventListener("click",()=>{y(),v(),e.doAction(t,()=>s("initial",e))})}else var T="";m.append(E,N("div",{},[x,T])),e.toolbarEl.append(m),u.append(h(o))}})},"addInput"),te=a((e,t,r)=>W(e,t,{type:"number",...r}),"addNumber"),re=a((e,t,r)=>W(e,t,{type:"color",reset:!0,...r}),"addColor"),ne=a((e,t,r)=>{var{title:n,icon:o,action:s,state:i,inputs:c}=r;g(c,"inputs"),f(s,"action"),e.addButton(t,{title:n,state:i,creator:d=>{var[p,u,m]=R(),b;d.addEventListener("click",E=>{E.stopPropagation(),b=e.captureSelection(),u()});var y=c.map(E=>{var x=N("input");return Object.assign(x,E),x}),v=h('<span class="hrte-button2">apply</span>');v.addEventListener("click",()=>{m(),b(),e.doAction(t,()=>s(...y.map(E=>E.value),e))}),p.append(...y,N("div",{},[v])),e.toolbarEl.append(p),d.append(h(o))}})},"addInputs"),oe=a((e,t,r)=>{var{title:n,icon:o,creator:s}=r;f(s,"creator");var i=a(()=>{c.style.display="none",e.toolbarEl.style.display="",e.contentEl.style.display="",e.trigger("showMain")},"back"),[c,d]=s(e,i);c.classList.add("hrte-panel"),c.style.display="none",e.mainEl.append(c),e.addButton(t,{title:n,creator:p=>{p.append(h(o)),p.addEventListener("click",()=>{c.style.display="",e.toolbarEl.style.display="none",e.contentEl.style.display="none",e.trigger("hideMain"),d(e)})}})},"addPanel"),G=a((e,t)=>{var[r,n,o]=R(),s,i=!0;for(let d in t){f(t[d],"menu item ("+d+")");let p=h(`<div class='hrte-list-item'>${d}`);p.addEventListener("click",()=>{s(),t[d](e),o()}),i||r.append(h("<div class='hrte-list-separator'>")),r.append(p),i=!1}var c=a(()=>{s=e.captureSelection(),n()},"open");return[r,c,o]},"createMenu"),se=a((e,t,r)=>{var{title:n,state:o,icon:s,...i}=r;l(s,"icon"),e.addButton(t,{title:n,state:o,creator:c=>{var[d,p]=G(e,i);c.addEventListener("click",u=>{u.stopPropagation(),p()}),e.toolbarEl.append(d),c.append(h(s))}})},"addMenu");var C=class{static{a(this,"HyperRTE")}buttons={};events=new $;constructor(t){var{el:r,plugins:n,toolbar:o,icons:s,clean:i}={el:null,plugins:[],toolbar:[],icons:"./icons/",clean:{cleanAfterAction:!0,doNotMergeTags:["div","span","p","li","ul","ol","a","mark"],doNotCleanTags:["hr","br","img","video","iframe","td","tr","table","caption"],skipTags:["svg","math"]},...t},{cleanAfterAction:c,doNotCleanTags:d,doNotMergeTags:p,skipTags:u}=i;this.cleanAfterAction=c,l(s,"icons path"),this.icons=s,g(d,"doNotCleanTags"),this.doNotCleanTags=d,g(p,"doNotMergeTags"),this.doNotMergeTags=p,g(u,"skipTags"),this.skipTags=u,["stateChange","beforeAction","afterAction","input","cut","copy","paste","export","showMain","hideMain"].forEach(m=>this.events.add(m)),_(this,r),g(n,"plugins"),n.forEach(m=>{f(m,"plugin"),m(this,t)}),g(o,"toolbar"),o.length===0&&(o=Object.keys(this.buttons)),z(this,o)}on(t,r){this.events.on(t,r)}off(t,r){this.events.off(t,r)}once(t,r){this.events.once(t,r)}trigger(t,...r){this.events.trigger(t,this,...r)}doAction(t,r,n=!1){l(t,"action name"),f(r,"handler"),!(!n&&!this.contentEl.contains(document.activeElement))&&(this.trigger("beforeAction",t),r(this),this.cleanAfterAction&&this.clean(),this.trigger("afterAction",t),this.contentEl.focus(),this.trigger("stateChange"))}get content(){return this.contentEl.innerHTML}set content(t){this.contentEl.innerHTML=t}clean(){this.contentEl.childNodes.length!==0&&(X.cleanDom(this.contentEl,this.doNotCleanTags,this.doNotMergeTags,this.skipTags),B(this.contentEl))}focus(){this.contentEl.focus()}export(){var t=this.contentEl.cloneNode(!0);return P(".styled",t).forEach(r=>Array.from(r.classList).forEach(n=>n.startsWith("styled")&&r.classList.remove(n))),this.trigger("export",t),t.innerHTML}captureSelection(){var t=getSelection();if(!t.rangeCount)return()=>{};var r=t.getRangeAt(0).cloneRange();return()=>{t.removeAllRanges(),t.addRange(r)}}addButton(t,r){if(l(t,"button name"),!r)throw new TypeError(`HyperRTE: definition of type (${r}), expected (Object)`);var{title:n,icon:o,creator:s,state:i,action:c}=r;l(n,"title"),o&&(l(o,"icon"),s=a(d=>d.append(h(o)),"creator")),f(s,"creator"),i&&f(i,"state"),c&&f(c,"action"),this.buttons[t]={title:n,creator:s,state:i,action:c}}};globalThis.HyperRTE=C;Object.assign(C,j);var Ge=C;export{re as addColor,W as addInput,ne as addInputs,ee as addList,se as addMenu,te as addNumber,oe as addPanel,Z as createDialog,R as createDropDown,G as createMenu,Ge as default};
