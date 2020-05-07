// import Vue from 'vue'
// import VueRouter from 'vue-router'
Vue.use(VueRouter);
const routes = [
  {
    path: '/',
    component: () => import('../pages/Main.vue'),
    meta: { title: '主页' }
  },
  {
    path:'/coupon/share',
    name:'coupon',
    component:() => import('../components/Product/Model.vue'),
    meta: { title: '购买商品' },
    children:[
      {
        path: 'a',
        component: () => import('../components/Main/I18n.vue'),
        meta: {title: 'I18N'}
      }
    ]
  },
  {
    path:'/detail/:value',
    component:() => import( '../components/Product/Detail.vue'),
    meta: { title: '购买商品' }
  },
  {
    path: '/manage',
    component: () => import( '../pages/Home.vue'),
    meta: { title: '自述文件' },
    children: [
      {
        path: 'dashboard',
        component: () => import( '../components/Manage/page/Dashboard.vue'),
        meta: { title: '流量监控' }
      },
      {
        path: 'allproducts',
        component: () => import( '../components/Manage/page/AllProducts.vue'),
        meta: { title: '商品列表' }
      },
      {
        path: 'allcoupons',
        component: () => import( '../components/Manage/page/AllCoupons.vue'),
        meta: { title: '优惠券列表' }
      },
      {
        path: 'tabs',
        component: () => import('../components/Manage/page/Tabs.vue'),
        meta: { title: '系统公告' }
      },
      {
        // 国际化组件
        path: 'i18n',
        component: () => import( '../components/Manage/page/I18n.vue'),
        meta: { title: '国际化' }
      },
      {
        path: 'allshops',
        component: () => import( '../components/Manage/page/AllShop.vue'),
        meta: { title: '所有商家' }
      },
      {
        path: 'getallcoupons',
        component: () => import('../components/Manage/page/GetAllCoupons.vue'),
        meta: { title: '优惠券列表' }
      },
      {
        path: 'getallurls',
        component: () => import('../components/Manage/page/GetAllUrls.vue'),
        meta: { title: 'Url列表' }
      },
      {
        path: 'card',
        component: () => import( '../components/Manage/page/Card.vue'),
        meta: { title: '卡包' }
      },
      {
        path: 'infoedit',
        component: () => import('../components/Manage/page/InfoEdit.vue'),
        meta: { title: '修改信息' }
      },
      {
        // 权限页面
        path: 'permission',
        component: () => import( '../components/Manage/page/Permission.vue'),
        meta: { title: '权限测试', permission: true }
      },
      {
        path: '403',
        component: () => import('../components/Manage/page/403.vue'),
        meta: { title: '403' }
      }
    ]
  },
  {
    path: '/404',
    component: () => import('../components/Manage/page/404.vue'),
    meta: { title: '404' }
  },
  {
    path: '/login',
    component: () => import( '../components/Manage/page/Login.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/register',
    component: () => import('../components/Manage/page/Register.vue'),
    meta: { title: '注册' }
  },
  {
    path: '/smslogin',
    component: () => import('../components/Manage/page/smsLogin.vue'),
    meta: { title: '手机登录' }
  },
  {
    path: '*',
    redirect: '/404'
  },

]

export default new VueRouter({
  mode: 'history',
  routes
})
