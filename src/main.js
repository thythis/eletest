import Vue from 'vue'
import ElementUI from 'element-ui'
import AMap from 'vue-amap';
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import myfun from './assets/js/test.js'
import App from './App'

Vue.use(AMap);

Vue.use(ElementUI);

Vue.use(VueRouter);

Vue.use(VueResource);

Vue.prototype.BB_INDEX = myfun.fetch().currenbaby;

AMap.initAMapApiLoader({
  // 高德的key
  key: '52fbab570d9f67a1df71cfb8ba8e77c9',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor']
});

const routes = [{
	path: '/',
	component: resolve => require(['./components/Form'], resolve),
	redirect: '/reg',
	children: [
		{
			path: '/reg',
			component: resolve => require(['./views/Reg'], resolve)
		},
		{
			path: '/login',
			component: resolve => require(['./views/Login'], resolve)
		}
	]
},{
	path: '/home',
	component: resolve => require(['./views/Main'], resolve)
},{
	path: '/eva',
	component: resolve => require(['./views/Evaluate'], resolve)
},{
	path: '/app',
	component: resolve => require(['./views/Download'], resolve)
},{
	path: '/contact',
	component: resolve => require(['./views/pc'], resolve),
  redirect: '/bbmana',
	children: [
		{
			path: '/bbmana',
			component: resolve => require(['./components/bbmana.vue'], resolve)
		},{
			path: '/rcode',
			component: resolve => require(['./components/RedeemCode.vue'], resolve)
		},{
			path: '/history',
			component: resolve => require(['./components/EvHistory.vue'], resolve)
		},{
			path: '/fittest',
			component: resolve => require(['./components/FitTest.vue'], resolve)
		}
	]
},{
	path: '/news',
	component: resolve => require(['./views/News'], resolve)
},{
	path: '/partners',
	component: resolve => require(['./views/Partners'], resolve)
},{
	path: '/baby',
	component: resolve => require(['./views/Baby'], resolve)
}

]

const router = new VueRouter({
  routes
})

Vue.http.options.xhr = { withCredentials: true };
Vue.http.options.emulateJSON = true;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
