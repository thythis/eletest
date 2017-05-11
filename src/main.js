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
			component: resolve => require(['./components/Reg'], resolve)
		},
		{
			path: '/login',
			component: resolve => require(['./components/Login'], resolve)	
		}
	]
},{
	path: '/home',
	component: resolve => require(['./components/Main'], resolve)
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
