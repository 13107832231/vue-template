export default {
	get(name) {
		let val = localStorage.getItem(name)
		if (/^\{.*\}$/.test(val)) val = JSON.parse(val)
		return val
	},
	set(name, val) {
		if (typeof val === typeof {}) val = JSON.stringify(val)
		return localStorage.setItem(name, val)
	},
	remove(name) {
		return localStorage.removeItem(name)
	},
	clear() {
		return localStorage.clear()
	},
	getSession(name) {
		let val = sessionStorage.getItem(name)
		if (/^\{.*\}$/.test(val)) val = JSON.parse(val)
		return val
	},
	setSession(name, val) {
		if (typeof val === typeof {}) val = JSON.stringify(val)
		return sessionStorage.setItem(name, val)
	},
	removeSession(name) {
		return sessionStorage.removeItem(name)
	}
}
