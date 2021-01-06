import storage from '@/utils/storage.js'
const state = {
	asideMini: storage.get('asideMini') || 0
}
const mutations = {
	//设置token
	setAside(state, data) {
		if (state.asideMini) {
			storage.set('asideMini', 0)
		} else {
			storage.set('asideMini', 1)
		}
		state.asideMini = !state.asideMini
	}
}

const actions = {
	toggleAside({ commit }) {
		commit('setAside')
	}
}

export default {
	state,
	mutations,
	actions
}
