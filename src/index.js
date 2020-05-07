// import Vue from 'vue';
import App from './App.vue';
import ECharts from 'vue-echarts';
import "echarts/lib/chart/bar";
import "echarts/lib/chart/line";
import "echarts/lib/chart/pie";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";
import "echarts/lib/component/markPoint";
import "echarts/lib/component/markLine";
import "echarts/lib/component/graphic";
import axios from 'axios';
import VueClipboard from 'vue-clipboard2'
import router from './router';
import VueI18n from 'vue-i18n';
import i18n from "./i18n/config";
import store from "./store";
import VueLazyload from 'vue-lazyload';
import Qs from 'qs';
import api from './request/api'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css'
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/styles/icon.css';
import './components/common/directives'
import 'babel-polyfill';
import SIdentify from './components/Manage/page/Identify.vue';    //自定义组件
import {setCookie,getCookie,delCookie} from './assets/cookie.js'
Vue.component("SIdentify",SIdentify)
Vue.component('chart', ECharts);
var VueCookie = require('vue-cookie');
require('./request');
require('./mock.js');
// Vue.use(ElementUI, {
//   size: 'small'
// });
Vue.use(ELEMENT, {
  size: 'small'
});
Vue.use(VueLazyload,{
  error:require('./assets/img/error.png'), //加载失败的图
  loading:require('./assets/img/loading.gif') //加载中的默认图
});
Vue.use(VueClipboard);
Vue.use(VueCookie);
Vue.use(VueI18n); // 通过插件的形式挂载
Vue.config.productionTip = false;
Vue.prototype.$api = api;
Vue.prototype.$cookieStore = {setCookie,getCookie,delCookie};
Vue.prototype.$axios = axios;//使用axios
Vue.prototype.$qs = Qs;// 格式化post请求的请求

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
  // console.log(to.meta.title);
  // console.log(from.meta.title);
  document.title = `${to.meta.title} | Siushare`;
  const role = localStorage.getItem('identity');
  if(to.path==='/'||to.path==='/register'||to.path==='/smslogin'){
    next();
  }else if (!role && to.path !== '/login') {
    next({path:'/login', query:{redirect:to.fullPath}})
  }else if (role && to.path === '/login') {
    next({path:'/'})
  } else if (to.meta.permission) {
    // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
    role === '2' ? next() : next('/manage/403');
  } else {
    // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
    if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
      Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
        confirmButtonText: '确定'
      });
    } else {
      next();
    }
  }
  if(from.query.channel){
    //路由切换时，如果没有就添加，有就跳过执行，添加固定参数
    if (!to.query.channel) {
      //准备一个跳转的query对象
      let query = to.query;
      query.channel = from.query.channel;
      next({
        path: to.path,
        query: query
      })
    } else {
      next()
    }
  }else{
    next()
  }
});
const root = document.createElement('div');
document.body.appendChild(root);
new Vue({
  render: (h) => h(App),
  store,
  i18n,
  router,
}).$mount(root)
