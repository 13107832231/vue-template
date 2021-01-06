import Vue from 'vue'
import ElementUI from 'element-ui'
import { Message } from 'element-ui'
import './style/el-vars.scss'
import App from './App.vue'
import './style/style.less'
import router from './router'
import store from './store'
import api from './api/api'
import storage from './utils/storage.js'
import utils from './utils/utils.js'
import HkbUI from './components/index.js'
import dayjs from 'dayjs'
import configs from './config/index.js'
import CKEditor from '@ckeditor/ckeditor5-vue';


Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$storage = storage
Vue.prototype.$utils = utils
Vue.prototype.$dayjs = dayjs
Vue.prototype.$configs = configs
Vue.prototype.$msg = (data, type) =>
	Message({
		message: data,
		center: true,
		customClass: 'me-msg ' + `${type}`,
		type: `${type}` || 'success',
		offset: 100,
		duration: 3000
	})
Vue.use(CKEditor)
Vue.use(ElementUI)
Vue.use(HkbUI)
new Vue({
	router,
	store,
	render: (h) => h(App)
}).$mount('#app')
