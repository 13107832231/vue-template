import storage from '@/utils/storage.js'
import api from '@/api/api.js'
import { Promise } from 'core-js'
const state = {
	token: storage.get('token') || '',
	refreshToken: storage.get('refreshToken') || '',
	logged: storage.get('logged') || false,
	user: storage.get('user') || false
}
const mutations = {
	//设置token
	setToken(state, data) {
		state.token = data
		storage.set('token', data)
	},
	//设置refreshtoken
	setRefreshToken(state, data) {
		state.refreshToken = data
		storage.set('refreshToken', data)
	},
	//设置登录状态
	setLoged(state, data) {
		state.logged = data
		storage.set('logged', data)
	},
	//设置用户信息
	setUser(state, data) {
		state.user = data
		storage.set('user', data)
	}
}

const actions = {
	//自动登录
	login({ commit }) {
		let user = storage.get('user')
		if (!user) {
			uni.reLaunch({
				url: '/pages/login/index'
			})
			return
		}
		return new Promise((resolve, reject) => {
			api
				.requestLogin(user)
				.then((data) => {
					if (data.code !== 0) {
						uni.reLaunch({
							url: '/pages/login/index'
						})
						return
					}
					commit('setToken', data.data.token)
					commit('setLoged', data.data)
					let pages = getCurrentPages() //跳转页面成功之后
					if (!pages) return
					pages[0].onLoad()
					resolve(data)
				})
				.catch((err) => {
					reject(err)
				})
		})
	},
	//token 刷新，
	// 刷新token
	RefreshToken({ commit, state }) {
		commit('setToken', 'bHRjOmx0Yw==')
		return new Promise((resolve, reject) => {
			let params = {
				refresh_token: state.refreshToken,
				grant_type: 'refresh_token',
				scope: 'server'
			}
			api
				.refreshToken(params)
				.then((res) => {
					const data = res.data
					commit('setToken', data.access_token)
					commit('setRefreshToken', data.refresh_token)
					resolve()
				})
				.catch((error) => {
					reject(error)
				})
		})
	},
	/**
	 * 退出登录
	 * @param {*} commit
	 */
	logout({ commit }) {
		return new Promise((reslove, reject) => {
			let params = {}
			api.logout(params).then((res) => {
				commit('setUser', '')
				commit('setToken', '')
				commit('setRefreshToken', '')
				storage.clear()
			})
		})
	}
}

export default {
	state,
	mutations,
	actions
}
