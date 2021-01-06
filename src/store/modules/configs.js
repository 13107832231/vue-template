import storage from '@/utils/storage.js'
import ElVars from '@/style/el-vars.scss'
const state = {
  theme: ElVars.theme,
}
const mutations = {
	//设置token
	setTheme(state, data) {
		state.theme = data
	}
}

const actions = {
	changeTheme({ commit }) {
		commit('setTheme')
	}
}

export default {
	state,
	mutations,
	actions
}
