!function(e){function t(t){for(var o,r,a=t[0],i=t[1],c=t[2],s=0,l=[];s<a.length;s++)r=a[s],Object.prototype.hasOwnProperty.call(N,r)&&N[r]&&l.push(N[r][0]),N[r]=0;for(o in i)Object.prototype.hasOwnProperty.call(i,o)&&(e[o]=i[o]);for(j&&j(t);l.length;)l.shift()();return I.push.apply(I,c||[]),n()}function n(){for(var e,t=0;t<I.length;t++){for(var n=I[t],o=!0,r=1;r<n.length;r++){var a=n[r];0!==N[a]&&(o=!1)}o&&(I.splice(t--,1),e=D(D.s=n[0]))}return e}var o=window.webpackHotUpdate;window.webpackHotUpdate=function(e,t){!function(e,t){if(!S[e]||!k[e])return;for(var n in k[e]=!1,t)Object.prototype.hasOwnProperty.call(t,n)&&(g[n]=t[n]);0==--v&&0===b&&O()}(e,t),o&&o(e,t)};var r,a=!0,i="02c757fe4f2b5ab8c799",c=1e4,s={},l=[],u=[];function d(e){var t={_acceptedDependencies:{},_declinedDependencies:{},_selfAccepted:!1,_selfDeclined:!1,_disposeHandlers:[],_main:r!==e,active:!0,accept:function(e,n){if(void 0===e)t._selfAccepted=!0;else if("function"==typeof e)t._selfAccepted=e;else if("object"==typeof e)for(var o=0;o<e.length;o++)t._acceptedDependencies[e[o]]=n||function(){};else t._acceptedDependencies[e]=n||function(){}},decline:function(e){if(void 0===e)t._selfDeclined=!0;else if("object"==typeof e)for(var n=0;n<e.length;n++)t._declinedDependencies[e[n]]=!0;else t._declinedDependencies[e]=!0},dispose:function(e){t._disposeHandlers.push(e)},addDisposeHandler:function(e){t._disposeHandlers.push(e)},removeDisposeHandler:function(e){var n=t._disposeHandlers.indexOf(e);n>=0&&t._disposeHandlers.splice(n,1)},check:x,apply:_,status:function(e){if(!e)return h;p.push(e)},addStatusHandler:function(e){p.push(e)},removeStatusHandler:function(e){var t=p.indexOf(e);t>=0&&p.splice(t,1)},data:s[e]};return r=void 0,t}var p=[],h="idle";function f(e){h=e;for(var t=0;t<p.length;t++)p[t].call(null,e)}var m,g,y,v=0,b=0,w={},k={},S={};function P(e){return+e+""===e?+e:e}function x(e){if("idle"!==h)throw new Error("check() is only allowed in idle status");return a=e,f("check"),(t=c,t=t||1e4,new Promise((function(e,n){if("undefined"==typeof XMLHttpRequest)return n(new Error("No browser support"));try{var o=new XMLHttpRequest,r=D.p+""+i+".hot-update.json";o.open("GET",r,!0),o.timeout=t,o.send(null)}catch(e){return n(e)}o.onreadystatechange=function(){if(4===o.readyState)if(0===o.status)n(new Error("Manifest request to "+r+" timed out."));else if(404===o.status)e();else if(200!==o.status&&304!==o.status)n(new Error("Manifest request to "+r+" failed."));else{try{var t=JSON.parse(o.responseText)}catch(e){return void n(e)}e(t)}}}))).then((function(e){if(!e)return f("idle"),null;k={},w={},S=e.c,y=e.h,f("prepare");var t=new Promise((function(e,t){m={resolve:e,reject:t}}));for(var n in g={},N)C(n);return"prepare"===h&&0===b&&0===v&&O(),t}));var t}function C(e){S[e]?(k[e]=!0,v++,function(e){var t=document.createElement("script");t.charset="utf-8",t.src=D.p+""+e+"."+i+".hot-update.js",document.head.appendChild(t)}(e)):w[e]=!0}function O(){f("ready");var e=m;if(m=null,e)if(a)Promise.resolve().then((function(){return _(a)})).then((function(t){e.resolve(t)}),(function(t){e.reject(t)}));else{var t=[];for(var n in g)Object.prototype.hasOwnProperty.call(g,n)&&t.push(P(n));e.resolve(t)}}function _(t){if("ready"!==h)throw new Error("apply() is only allowed in ready status");var n,o,r,a,c;function u(e){for(var t=[e],n={},o=t.map((function(e){return{chain:[e],id:e}}));o.length>0;){var r=o.pop(),i=r.id,c=r.chain;if((a=E[i])&&!a.hot._selfAccepted){if(a.hot._selfDeclined)return{type:"self-declined",chain:c,moduleId:i};if(a.hot._main)return{type:"unaccepted",chain:c,moduleId:i};for(var s=0;s<a.parents.length;s++){var l=a.parents[s],u=E[l];if(u){if(u.hot._declinedDependencies[i])return{type:"declined",chain:c.concat([l]),moduleId:i,parentId:l};-1===t.indexOf(l)&&(u.hot._acceptedDependencies[i]?(n[l]||(n[l]=[]),d(n[l],[i])):(delete n[l],t.push(l),o.push({chain:c.concat([l]),id:l})))}}}}return{type:"accepted",moduleId:e,outdatedModules:t,outdatedDependencies:n}}function d(e,t){for(var n=0;n<t.length;n++){var o=t[n];-1===e.indexOf(o)&&e.push(o)}}t=t||{};var p={},m=[],v={},b=function(){console.warn("[HMR] unexpected require("+k.moduleId+") to disposed module")};for(var w in g)if(Object.prototype.hasOwnProperty.call(g,w)){var k;c=P(w);var x=!1,C=!1,O=!1,_="";switch((k=g[w]?u(c):{type:"disposed",moduleId:w}).chain&&(_="\nUpdate propagation: "+k.chain.join(" -> ")),k.type){case"self-declined":t.onDeclined&&t.onDeclined(k),t.ignoreDeclined||(x=new Error("Aborted because of self decline: "+k.moduleId+_));break;case"declined":t.onDeclined&&t.onDeclined(k),t.ignoreDeclined||(x=new Error("Aborted because of declined dependency: "+k.moduleId+" in "+k.parentId+_));break;case"unaccepted":t.onUnaccepted&&t.onUnaccepted(k),t.ignoreUnaccepted||(x=new Error("Aborted because "+c+" is not accepted"+_));break;case"accepted":t.onAccepted&&t.onAccepted(k),C=!0;break;case"disposed":t.onDisposed&&t.onDisposed(k),O=!0;break;default:throw new Error("Unexception type "+k.type)}if(x)return f("abort"),Promise.reject(x);if(C)for(c in v[c]=g[c],d(m,k.outdatedModules),k.outdatedDependencies)Object.prototype.hasOwnProperty.call(k.outdatedDependencies,c)&&(p[c]||(p[c]=[]),d(p[c],k.outdatedDependencies[c]));O&&(d(m,[k.moduleId]),v[c]=b)}var M,I=[];for(o=0;o<m.length;o++)c=m[o],E[c]&&E[c].hot._selfAccepted&&v[c]!==b&&I.push({module:c,errorHandler:E[c].hot._selfAccepted});f("dispose"),Object.keys(S).forEach((function(e){!1===S[e]&&function(e){delete N[e]}(e)}));for(var H,A,T=m.slice();T.length>0;)if(c=T.pop(),a=E[c]){var j={},q=a.hot._disposeHandlers;for(r=0;r<q.length;r++)(n=q[r])(j);for(s[c]=j,a.hot.active=!1,delete E[c],delete p[c],r=0;r<a.children.length;r++){var L=E[a.children[r]];L&&((M=L.parents.indexOf(c))>=0&&L.parents.splice(M,1))}}for(c in p)if(Object.prototype.hasOwnProperty.call(p,c)&&(a=E[c]))for(A=p[c],r=0;r<A.length;r++)H=A[r],(M=a.children.indexOf(H))>=0&&a.children.splice(M,1);for(c in f("apply"),i=y,v)Object.prototype.hasOwnProperty.call(v,c)&&(e[c]=v[c]);var U=null;for(c in p)if(Object.prototype.hasOwnProperty.call(p,c)&&(a=E[c])){A=p[c];var V=[];for(o=0;o<A.length;o++)if(H=A[o],n=a.hot._acceptedDependencies[H]){if(-1!==V.indexOf(n))continue;V.push(n)}for(o=0;o<V.length;o++){n=V[o];try{n(A)}catch(e){t.onErrored&&t.onErrored({type:"accept-errored",moduleId:c,dependencyId:A[o],error:e}),t.ignoreErrored||U||(U=e)}}}for(o=0;o<I.length;o++){var R=I[o];c=R.module,l=[c];try{D(c)}catch(e){if("function"==typeof R.errorHandler)try{R.errorHandler(e)}catch(n){t.onErrored&&t.onErrored({type:"self-accept-error-handler-errored",moduleId:c,error:n,originalError:e}),t.ignoreErrored||U||(U=n),U||(U=e)}else t.onErrored&&t.onErrored({type:"self-accept-errored",moduleId:c,error:e}),t.ignoreErrored||U||(U=e)}}return U?(f("fail"),Promise.reject(U)):(f("idle"),new Promise((function(e){e(m)})))}var E={},M={0:0},N=(M={0:0},{0:0}),I=[];function D(t){if(E[t])return E[t].exports;var n=E[t]={i:t,l:!1,exports:{},hot:d(t),parents:(u=l,l=[],u),children:[]};return e[t].call(n.exports,n,n.exports,function(e){var t=E[e];if(!t)return D;var n=function(n){return t.hot.active?(E[n]?-1===E[n].parents.indexOf(e)&&E[n].parents.push(e):(l=[e],r=n),-1===t.children.indexOf(n)&&t.children.push(n)):(console.warn("[HMR] unexpected require("+n+") from disposed module "+e),l=[]),D(n)},o=function(e){return{configurable:!0,enumerable:!0,get:function(){return D[e]},set:function(t){D[e]=t}}};for(var a in D)Object.prototype.hasOwnProperty.call(D,a)&&"e"!==a&&"t"!==a&&Object.defineProperty(n,a,o(a));return n.e=function(e){return"ready"===h&&f("prepare"),b++,D.e(e).then(t,(function(e){throw t(),e}));function t(){b--,"prepare"===h&&(w[e]||C(e),0===b&&0===v&&O())}},n.t=function(e,t){return 1&t&&(e=n(e)),D.t(e,-2&t)},n}(t)),n.l=!0,n.exports}D.e=function(e){var t=[],n={2:1,3:1,4:1,5:1,6:1,7:1,8:1,9:1,10:1,11:1,12:1,13:1,14:1,15:1,16:1,17:1,18:1,19:1,20:1,21:1};M[e]?t.push(M[e]):0!==M[e]&&n[e]&&t.push(M[e]=new Promise((function(t,n){for(var o=e+".css",r=D.p+o,a=document.getElementsByTagName("link"),i=0;i<a.length;i++){var c=(l=a[i]).getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(c===o||c===r))return t()}var s=document.getElementsByTagName("style");for(i=0;i<s.length;i++){var l;if((c=(l=s[i]).getAttribute("data-href"))===o||c===r)return t()}var u=document.createElement("link");u.rel="stylesheet",u.type="text/css",u.onload=t,u.onerror=function(t){var o=t&&t.target&&t.target.src||r,a=new Error("Loading CSS chunk "+e+" failed.\n("+o+")");a.code="CSS_CHUNK_LOAD_FAILED",a.request=o,delete M[e],u.parentNode.removeChild(u),n(a)},u.href=r,document.getElementsByTagName("head")[0].appendChild(u)})).then((function(){M[e]=0})));n={2:1,3:1,4:1,5:1,6:1,7:1,8:1,9:1,10:1,11:1,12:1,13:1,14:1,15:1,16:1,17:1,18:1,19:1,20:1,21:1};M[e]?t.push(M[e]):0!==M[e]&&n[e]&&t.push(M[e]=new Promise((function(t,n){for(var o=e+".css",r=D.p+o,a=document.getElementsByTagName("link"),i=0;i<a.length;i++){var c=(l=a[i]).getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(c===o||c===r))return t()}var s=document.getElementsByTagName("style");for(i=0;i<s.length;i++){var l;if((c=(l=s[i]).getAttribute("data-href"))===o||c===r)return t()}var u=document.createElement("link");u.rel="stylesheet",u.type="text/css",u.onload=t,u.onerror=function(t){var o=t&&t.target&&t.target.src||r,a=new Error("Loading CSS chunk "+e+" failed.\n("+o+")");a.code="CSS_CHUNK_LOAD_FAILED",a.request=o,delete M[e],u.parentNode.removeChild(u),n(a)},u.href=r,document.getElementsByTagName("head")[0].appendChild(u)})).then((function(){M[e]=0})));var o=N[e];if(0!==o)if(o)t.push(o[2]);else{var r=new Promise((function(t,n){o=N[e]=[t,n]}));t.push(o[2]=r);var a,c=document.createElement("script");c.charset="utf-8",c.timeout=120,D.nc&&c.setAttribute("nonce",D.nc),c.src=function(e){return D.p+""+({}[e]||e)+"."+i.substr(0,8)+".js"}(e);var s=new Error;a=function(t){c.onerror=c.onload=null,clearTimeout(l);var n=N[e];if(0!==n){if(n){var o=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src;s.message="Loading chunk "+e+" failed.\n("+o+": "+r+")",s.name="ChunkLoadError",s.type=o,s.request=r,n[1](s)}N[e]=void 0}};var l=setTimeout((function(){a({type:"timeout",target:c})}),12e4);c.onerror=c.onload=a,document.head.appendChild(c)}return Promise.all(t)},D.m=e,D.c=E,D.d=function(e,t,n){D.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},D.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},D.t=function(e,t){if(1&t&&(e=D(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(D.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)D.d(n,o,function(t){return e[t]}.bind(null,o));return n},D.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return D.d(t,"a",t),t},D.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},D.p="/",D.oe=function(e){throw console.error(e),e},D.h=function(){return i};var H=window.webpackJsonp=window.webpackJsonp||[],A=H.push.bind(H);H.push=t,H=H.slice();for(var T=0;T<H.length;T++)t(H[T]);var j=A;I.push([626,1]),n()}({35:function(e,t,n){"use strict";Vue.use(VueRouter);const o=[{path:"/",component:()=>n.e(2).then(n.bind(null,627)),meta:{title:"主页"}},{path:"/coupon/share",name:"coupon",component:()=>n.e(4).then(n.bind(null,629)),meta:{title:"购买商品"},children:[{path:"a",component:()=>n.e(11).then(n.bind(null,630)),meta:{title:"I18N"}}]},{path:"/detail/:value",component:()=>n.e(10).then(n.bind(null,631)),meta:{title:"购买商品"}},{path:"/manage",component:()=>n.e(3).then(n.bind(null,628)),meta:{title:"自述文件"},children:[{path:"dashboard",component:()=>n.e(5).then(n.bind(null,632)),meta:{title:"流量监控"}},{path:"allproducts",component:()=>n.e(15).then(n.bind(null,633)),meta:{title:"商品列表"}},{path:"allcoupons",component:()=>n.e(14).then(n.bind(null,634)),meta:{title:"优惠券列表"}},{path:"tabs",component:()=>n.e(21).then(n.bind(null,635)),meta:{title:"系统公告"}},{path:"i18n",component:()=>n.e(19).then(n.bind(null,636)),meta:{title:"国际化"}},{path:"allshops",component:()=>n.e(16).then(n.bind(null,637)),meta:{title:"所有商家"}},{path:"getallcoupons",component:()=>n.e(17).then(n.bind(null,638)),meta:{title:"优惠券列表"}},{path:"getallurls",component:()=>n.e(18).then(n.bind(null,639)),meta:{title:"Url列表"}},{path:"card",component:()=>n.e(22).then(n.bind(null,640)),meta:{title:"卡包"}},{path:"infoedit",component:()=>n.e(6).then(n.bind(null,641)),meta:{title:"修改信息"}},{path:"permission",component:()=>n.e(20).then(n.bind(null,642)),meta:{title:"权限测试",permission:!0}},{path:"403",component:()=>n.e(12).then(n.bind(null,643)),meta:{title:"403"}}]},{path:"/404",component:()=>n.e(13).then(n.bind(null,644)),meta:{title:"404"}},{path:"/login",component:()=>n.e(7).then(n.bind(null,645)),meta:{title:"登录"}},{path:"/register",component:()=>n.e(8).then(n.bind(null,646)),meta:{title:"注册"}},{path:"/smslogin",component:()=>n.e(9).then(n.bind(null,647)),meta:{title:"手机登录"}},{path:"*",redirect:"/404"}];t.a=new VueRouter({mode:"history",routes:o})},416:function(e,t,n){var o=n(417);"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);(0,n(158).default)("6b252250",o,!0,{})},417:function(e,t,n){},622:function(e,t,n){"use strict";n.r(t);var o=n(36),r=n.n(o),a=n(35);r.a.defaults.headers.common["X-Requested-With"]="XMLHttpRequest",r.a.defaults.withCredentials=!0,r.a.defaults.timeout=5e3,r.a.defaults.retry=5,r.a.defaults.retryDelay=1e3,r.a.defaults.baseURL="",r.a.interceptors.request.use((function(e){return console.log("in interceptor, request config: ",e),e}),(function(e){return Promise.reject(e)})),r.a.interceptors.response.use((function(e){return console.log("in interceptor, response: ",e),200!==e.data.code&&(console.log("errCode:",e.data.code),213===e.data.code&&(window.alert("你已在另一台机器登录，你已被逼下线"),localStorage.removeItem("ms_username"),localStorage.removeItem("identity"),localStorage.removeItem("ok"),console.log("before to login, current route path:",a.a.currentRoute.fullPath),a.a.push({path:"/login",query:{redirect:a.a.currentRoute.fullPath}}))),e}),(function(e){if(console.log("in interceptor, error1: ",e),console.log(e.response.status),e&&e.response){switch(e.response.status){case 400:e.message="请求错误(400)";break;case 401:e.message="Session过期",localStorage.removeItem("ms_username"),localStorage.removeItem("identity"),localStorage.removeItem("ok"),console.log("before to login, current route path:",a.a.currentRoute.fullPath),a.a.push({path:"/login",query:{redirect:a.a.currentRoute.fullPath}});break;case 403:e.message="拒绝访问(403)";break;case 404:e.message="请求出错(404)";break;case 408:e.message="请求超时(408)";break;case 500:e.message="服务器错误(500)";break;case 501:e.message="服务未实现(501)";break;case 502:e.message="网络错误(502)",this.$notify.error({title:"错误",message:"网络错误"});break;case 503:e.message="服务不可用(503)";break;case 504:e.message="网络超时(504)";break;case 505:e.message="HTTP版本不受支持(505)";break;default:e.message=`连接出错(${e.response.status})!`}console.log(e.message)}else e.message="连接服务器失败!";return Promise.reject(e)}))},623:function(e,t,n){"use strict";n.r(t);var o=n(157),r=n.n(o);r.a.mock("/ap/img","post",e=>({data:[{img:"http://localhost:808/assets/images/icon1_hover[1].png",title:"aa",detail:"a"},{img:"http://localhost:808/assets/images/icon3_hover[1].png",title:"bb",detail:"b"},{img:"http://localhost:808/assets/images/icon6_hover[1].png",title:"cc",detail:"c"},{img:"http://localhost:808/assets/images/icon7_hover[1].png",title:"dd",detail:"d"},{img:"http://localhost:808/assets/images/icon7_hover[1].png",title:"ee",detail:"e"},{img:"http://localhost:808/assets/images/icon7_hover[1].png",title:"ff",detail:"f"},{img:"http://localhost:808/assets/images/icon7_hover[1].png",title:"gg",detail:"g"},{img:"http://localhost:808/assets/images/icon7_hover[1].png",title:"gg",detail:"g"}]})),r.a.mock("/ap/cart","post",e=>({data:[{id:1,name:"Chicken Wing",category:"Food",qty:3,price:10},{id:2,name:"Pizza",category:"Food",qty:1,price:50},{id:3,name:"Hamburger",category:"Food",qty:1,price:12},{id:4,name:"Coca Cola",category:"Drink",qty:2,price:5},{id:5,name:"Orange Juice",category:"Drink",qty:1,price:15},{id:6,name:"Potato Chips",category:"Snack",qty:1,price:8}]}))},624:function(e,t,n){e.exports=n.p+"assets/images/error.png"},625:function(e,t,n){e.exports=n.p+"assets/images/loading.gif"},626:function(e,t,n){"use strict";n.r(t);var o=n(35),r={name:"App",components:{},mounted(){this.isMobile()?console.log("手机"):console.log("电脑")},methods:{isMobile:()=>navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone|MicroMessenger)/i)}},a=n(64),i=Object(a.a)(r,(function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)}),[],!1,null,null,null).exports,c=n(265),s=(n(335),n(350),n(358),n(369),n(380),n(386),n(389),n(395),n(36)),l=n.n(s),u=n(262),d=n.n(u),p=n(86),h=n(87),f=n.n(h);f.a.use(p.a);var m=new p.a({locale:localStorage.getItem("lang")||"zh",messages:{zh:{nav:{home:"首页",monitor:"监控",analyze:"分析",alarm:"报警",maintenance:"运维",config:"配置",device:"设备",scada:"画面",Processing:"处理中心",Workbench:"工作台",Order:"订单管理",Language:"语言",Login:"登录",Register:"注册",Join:"加入我们"},confirm:{ok:"确认",cancel:"取消",content:"你确认要退出系统吗？",logout:"退 出"},manager:{breadcrumb:"国际化产品",tips:"通过切换语言按钮，来改变当前内容的语言。",btn:"切换英文",title1:"常用用法",p1:"要是你把你的秘密告诉了风，那就别怪风把它带给树。",p2:"没有什么比信念更能支撑我们度过艰难的时光了。",p3:"只要能把自己的事做好，并让自己快乐，你就领先于大多数人了。",title2:"组件插值",info:"Element组件需要国际化，请参考 {action}。",value:"文档"}},en:{nav:{home:"Home",monitor:"Monitor",analyze:"Analyze",alarm:"Alarm",maintenance:"Maintenance",config:"Config",device:"Device",scada:"Scada",Processing:"Processing center",Workbench:"Workbench",Order:"Order",Language:"Language",Login:"Login",Register:"Register",Join:"Join us"},confirm:{ok:"Logout",cancel:"Cancel",content:"Are you sure you want to quit the system?",logout:"Logout"},manager:{breadcrumb:"International Products",tips:"Click on the button to change the current language. ",btn:"Switch Chinese",title1:"Common usage",p1:"If you reveal your secrets to the wind you should not blame the wind for  revealing them to the trees.",p2:"Nothing can help us endure dark times better than our faith. ",p3:"If you can do what you do best and be happy, you're further along in life  than most people.",title2:"Component interpolation",info:"The default language of Element is Chinese. If you wish to use another language, please refer to the {action}.",value:"documentation"}},ty:{nav:{home:"บ้าน",monitor:"หน้าจอ",analyze:"การวิเคราะห์",alarm:"สัญญาณเตือนภัย",maintenance:"การดำเนินงานและบำรุงรักษา",config:"องค์ประกอบ",device:"อุปกรณ์",scada:"ภาพ",Processing:"ศูนย์ประมวลผล",Workbench:"โต๊ะทำงาน",Order:"คำสั่ง",Language:"ภาษา",Login:"ล็อกอิน",Register:"ลงทะเบียน",Join:"เข้าร่วมกับเรา"},confirm:{ok:"ยืนยัน",cancel:"ยกเลิก",content:"คุณแน่ใจหรือว่าต้องการออกจากระบบ?",logout:"เลิก"}}}});Vue.use(Vuex);var g=new Vuex.Store({state:{count:1,message:"",couponnum:""},getters:{getStateCount:function(e){return e.count+1}},mutations:{add(e,t){e.count=e.count+1,e.message=t},reduction(e,t){e.count=e.count-t},count(e,t){e.couponnum=t}},actions:{addFun(e,t){e.commit("add",t)},countcp(e,t){e.commit("count",t)},reductionFun(e,t){e.commit("reduction",t)}}}),y=n(263),v=n(264),b=n.n(v);n(416);f.a.directive("dialogDrag",{bind(e,t,n,o){const r=e.querySelector(".el-dialog__header"),a=e.querySelector(".el-dialog");r.style.cssText+=";cursor:move;",a.style.cssText+=";top:0px;";const i=(()=>window.document.currentStyle?(e,t)=>e.currentStyle[t]:(e,t)=>getComputedStyle(e,!1)[t])();r.onmousedown=e=>{const t=e.clientX-r.offsetLeft,n=e.clientY-r.offsetTop,o=document.body.clientWidth,c=document.documentElement.clientHeight,s=a.offsetWidth,l=a.offsetHeight,u=a.offsetLeft,d=o-a.offsetLeft-s,p=a.offsetTop,h=c-a.offsetTop-l;let f=i(a,"left"),m=i(a,"top");f.includes("%")?(f=+document.body.clientWidth*(+f.replace(/\%/g,"")/100),m=+document.body.clientHeight*(+m.replace(/\%/g,"")/100)):(f=+f.replace(/\px/g,""),m=+m.replace(/\px/g,"")),document.onmousemove=function(e){let o=e.clientX-t,r=e.clientY-n;-o>u?o=-u:o>d&&(o=d),-r>p?r=-p:r>h&&(r=h),a.style.cssText+=`;left:${o+f}px;top:${r+m}px;`},document.onmouseup=function(e){document.onmousemove=null,document.onmouseup=null}}}});n(418);var w={name:"SIdentify",props:{identifyCode:{type:String,default:"1234"},fontSizeMin:{type:Number,default:16},fontSizeMax:{type:Number,default:40},backgroundColorMin:{type:Number,default:180},backgroundColorMax:{type:Number,default:240},colorMin:{type:Number,default:50},colorMax:{type:Number,default:160},lineColorMin:{type:Number,default:40},lineColorMax:{type:Number,default:180},dotColorMin:{type:Number,default:0},dotColorMax:{type:Number,default:255},contentWidth:{type:Number,default:112},contentHeight:{type:Number,default:38}},methods:{randomNum:(e,t)=>Math.floor(Math.random()*(t-e)+e),randomColor(e,t){return"rgb("+this.randomNum(e,t)+","+this.randomNum(e,t)+","+this.randomNum(e,t)+")"},drawPic(){let e=document.getElementById("s-canvas").getContext("2d");e.textBaseline="bottom",e.fillStyle=this.randomColor(this.backgroundColorMin,this.backgroundColorMax),e.fillRect(0,0,this.contentWidth,this.contentHeight);for(let t=0;t<this.identifyCode.length;t++)this.drawText(e,this.identifyCode[t],t);this.drawLine(e)},drawText(e,t,n){e.fillStyle=this.randomColor(this.colorMin,this.colorMax),e.font=this.randomNum(this.fontSizeMin,this.fontSizeMax)+"px SimHei";let o=(n+1)*(this.contentWidth/(this.identifyCode.length+1)),r=this.randomNum(this.fontSizeMax,this.contentHeight-5);var a=this.randomNum(-45,45);e.translate(o,r),e.rotate(a*Math.PI/180),e.fillText(t,0,0),e.rotate(-a*Math.PI/180),e.translate(-o,-r)},drawLine(e){for(let t=0;t<8;t++)e.strokeStyle=this.randomColor(this.lineColorMin,this.lineColorMax),e.beginPath(),e.moveTo(this.randomNum(0,this.contentWidth),this.randomNum(0,this.contentHeight)),e.lineTo(this.randomNum(0,this.contentWidth),this.randomNum(0,this.contentHeight)),e.stroke()},drawDot(e){for(let t=0;t<100;t++)e.fillStyle=this.randomColor(0,255),e.beginPath(),e.arc(this.randomNum(0,this.contentWidth),this.randomNum(0,this.contentHeight),1,0,2*Math.PI),e.fill()}},watch:{identifyCode(){this.drawPic()}},mounted(){this.drawPic()}},k=Object(a.a)(w,(function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"s-canvas"},[t("canvas",{attrs:{id:"s-canvas",width:this.contentWidth,height:this.contentHeight}})])}),[],!1,null,null,null).exports;function S(e,t,n){var o=new Date;o.setSeconds(o.getSeconds()+n),document.cookie=e+"="+escape(t)+"; expires="+o.toGMTString()}Vue.component("SIdentify",k),Vue.component("chart",c.a);var P=n(620);n(622),n(623),Vue.use(ELEMENT,{size:"small"}),Vue.use(y.a,{error:n(624),loading:n(625)}),Vue.use(d.a),Vue.use(P),Vue.use(p.a),Vue.config.productionTip=!1,Vue.prototype.$api={login:"/api/login",loginsms:"/api/login/sms",register:"/api/register",registersms:"/api/register/sms",productAll:"/api/merchant/productAll",getinfo:"/api/merchant/product/getinfo",getallcouponinfo:"/api/merchant/getallcouponinfo",getcouponinfo:"/api/merchant/getcouponinfo",couponOperate:"/api/merchant/couponOperate",getMerchant:"/api/share/getMerchant",sgetcouponinfo:"/api/share/getcouponinfo",getallcoupon:"/api/share/getallcoupon",generationShareUrl:"/api/share/generationShareUrl",getAllUrl:"/api/share/getAllUrl",sproductToSelect:"/api/share/productToSelect",cproductToSelect:"/api/customer/productToSelect",showAllCoupon:"/api/customer/showAllCoupon",cgetcouponinfo:"/api/customer/getcouponinfo",savecoupon:"/api/customer/savecoupon",saveorderid:"/api/customer/savecoupon/saveorderid",getuserinfo:"/api/getuserinfo",editUserPassword:"/api/editUserPassword",editUserPasswordsms:"/api/editUserPassword/sms",editUserPhone:"/api/editUserPhone",editUserPhonesms:"/api/editUserPhone/checkcode",getTop:"/api/gettop"},Vue.prototype.$cookieStore={setCookie:S,getCookie:function(e){if(document.cookie.length>0){let t=document.cookie.indexOf(e+"=");if(-1!=t){t=t+e.length+1;let n=document.cookie.indexOf(";",t);return-1==n&&(n=document.cookie.length),unescape(document.cookie.substring(t,n))}}return""},delCookie:function(e){S(e,"",-1)}},Vue.prototype.$axios=l.a,Vue.prototype.$qs=b.a,o.a.beforeEach((e,t,n)=>{document.title=`${e.meta.title} | Siushare`;const o=localStorage.getItem("identity");if("/"===e.path||"/register"===e.path||"/smslogin"===e.path?n():o||"/login"===e.path?o&&"/login"===e.path?n({path:"/"}):e.meta.permission?"2"===o?n():n("/manage/403"):navigator.userAgent.indexOf("MSIE")>-1&&"/editor"===e.path?Vue.prototype.$alert("vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看","浏览器不兼容通知",{confirmButtonText:"确定"}):n():n({path:"/login",query:{redirect:e.fullPath}}),t.query.channel)if(e.query.channel)n();else{let o=e.query;o.channel=t.query.channel,n({path:e.path,query:o})}else n()});const x=document.createElement("div");document.body.appendChild(x),new Vue({render:e=>e(i),store:g,i18n:m,router:o.a}).$mount(x)},87:function(e,t){e.exports=Vue}});