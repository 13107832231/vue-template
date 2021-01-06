import axios from 'axios'
import store from '@/store/index'
import router from '@/router'
import { Message } from 'element-ui'
import { debounce } from '@/utils/utils.js'
axios.defaults.baseURL = process.env.VUE_APP_BASE_API
console.log(process.env)
// axios.defaults.baseURL = 'https://api-test.haokangmengmeng.com'
axios.defaults.timeout = 20000
axios.interceptors.request.use(
	(config) => {
		if (store.state.login.token) {
			config.headers['Authorization'] = 'Bearer ' + `${store.state.login.token}`
		}
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)
// response interceptor
axios.interceptors.response.use(
	(response) => {
		return response.data
	},
	(error) => {
		let res
		let status = error.response.status
		if (error.response) {
			// 处理全局特殊请求错误信息
			switch (status) {
				case 401:
					debounce(() => {
						Message({
							customClass: 'me-msg error',
							message: '用户凭证已过期，请重新登录。',
							type: 'error'
						})
						router.push({
							path: '/login',
							query: {
								redirect: router.currentRoute.fullPath
							}
						})
					})

					break
				case 500:
					Message({
						customClass: 'me-msg error',
						message: error.response.data.msg,
						type: 'error'
					})
					break
				case 503:
					Message({
						customClass: 'me-msg error',
						message: '服务器异常，请稍后再试。',
						type: 'error'
					})
					break
				default:
					break
			}
			res = error.response.data
		} else {
			//服务器异常
			res = '服务器繁忙'
		}
		return Promise.reject(res)
	}
)

export default axios
