import { get, post, del, put } from '../request'
import qs from 'qs'
import axios from '../axios.js'
const setParams = (params) =>
	qs.stringify(params, {
		arrayFormat: 'indices'
	})
//登录
export default {
	// 账号密码登录
	loginByCount: (params) =>
		axios({
			url: '/auth/oauth/token',
			headers: {
				Authorization: 'Basic dGVzdDp0ZXN0', //生产版
				'USER-TYPE': '6',
				'TENANT-ID': '1',
				'LOGIN-RESPONSE-TYPE': 'new'
			},
			method: 'post',
			params: { ...params }
		}),
	//获取手机短息验证码
	getSmsCode: (params) =>
		axios.get('/admin/mobile/commonSmsCode/' + `${params.phone}` + '/1/1'),
	//刷新roken
	refreshToken: post('/auth/oauth/token', {
		params: true,
		header: {
			'USER-TYPE': '6',
			'TENANT-ID': '1',
			Authorization: 'Basic bHRjOmx0Yw=='
		}
	}),
	//退出登录
	logout: del('/auth/token/logout')
}
