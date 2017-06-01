import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'

Vue.use(ElementUI);

Vue.use(VueRouter);

Vue.use(VueResource);

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
	component: resolve => require(['./views/Contact'], resolve)
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

Vue.config.productionTip = false;
Vue.http.options.emulateJSON = true;

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
