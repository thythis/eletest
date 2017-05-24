import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import App from './App'

Vue.use(ElementUI);

Vue.use(VueRouter)

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
}

]

const router = new VueRouter({
  routes
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
