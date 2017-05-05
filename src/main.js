// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App'
import router from './router'

// import { Button, Select, Option, Menu, MenuItem, Submenu } from 'element-ui'
// Vue.use(Button)
// Vue.use(Select)
// Vue.use(Option)
// Vue.use(Menu)
// Vue.use(MenuItem)
// Vue.use(Submenu)

Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
