import axios from './axios.js'
const link = (url) => `${url}`
export const get = (url) => (params) => axios.get(link(url), { params })
export const post = (url) => (params) => axios.post(link(url), params)
export const put = (url) => (params) => axios.put(link(url), params)
export const del = (url) => (params) => axios.delete(link(url), params)
export const patch = (url) => (params) => axios.patch(link(url), params)
