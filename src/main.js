import Vue from 'vue'
import ElementUI from 'element-ui'
import AMap from 'vue-amap';
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import myfun from './assets/js/test.js'
import App from './App'


import {
  Dialog,
  Autocomplete,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxGroup,
  Option,
  OptionGroup,
  Button,
  ButtonGroup,
  Table,
  TableColumn,
  DatePicker,
  Popover,
  Tooltip,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Tag,
  Icon,
  Row,
  Col,
  Progress,
  Spinner,
  Steps,
  Step,
  Carousel,
  Scrollbar,
  CarouselItem,
  Collapse,
  CollapseItem,
  Loading,
  MessageBox,
  Notification,
  Message
} from 'element-ui'

Vue.use(Dialog)
Vue.use(Autocomplete)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(DatePicker)
Vue.use(Popover)
Vue.use(Tooltip)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Tag)
Vue.use(Icon)
Vue.use(Row)
Vue.use(Col)
Vue.use(Progress)
Vue.use(Spinner)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Carousel)
Vue.use(Scrollbar)
Vue.use(CarouselItem)
Vue.use(Collapse)
Vue.use(CollapseItem)

Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message


Vue.use(AMap);


Vue.use(VueRouter);

Vue.use(VueResource);

Vue.use(Vuex);

Vue.prototype.BB_INDEX = 0;

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

const store = new Vuex.Store({
  state: {
    count: 0,
    bbpgblist: []
  },
  mutations: {
  	increment: state => state.count++,
    decrement: state => state.count--,
    setCount(state, num) {
      state.count = num;
    },
    bblist(state, list) {
      state.bbpgblist = list;
    }
  }
})

Vue.http.options.xhr = { withCredentials: true };
Vue.http.options.emulateJSON = true;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
