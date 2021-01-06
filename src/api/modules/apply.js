import { get, post, del, put, patch } from '../request'
import qs from 'qs'
import axios from '../axios.js'
const setParams = (params) =>
	qs.stringify(params, {
		arrayFormat: 'indices'
	})
//登录
export default {
	//获取申请列表
	getApplyList: get('/ltc/gov/apply-order/apply-order-list'),
	//验证申请单信息
	preAddApplyOrder: post('/ltc/gov/apply-order/check-apply-order'),
	//添加申请
	addApplyOrder: post('/ltc/gov/apply-order/apply-order'),
	//获取详情
	getApplyDetail: (params) =>
		axios.get('/ltc/gov/apply-order/apply-order-detail/' + params.id),
	//审核
	auditApply: post('/ltc/gov/apply-order/audit-apply-order'),
	//查询保障对象列表
	getInsurantList: get('/ltc/gov/insurant/insurant-list'),
	//查询保障对象详情
	getInsurantDetail: (params) =>
		axios.get('/ltc/gov/insurant/insurant-detail/' + params.id),
	//获取保障
	getInsurantApplyList: (params) =>
		axios.get('/ltc/gov/insurant/insurant-apply-order-list/' + params.id),
	//获取申请想面
	getInsurantMessageDetail: (params) =>
		axios.get('/ltc/gov/insurant/message-detail/' + params.id),
	//获取申请单时间线
	getOrderTimeline: (params) =>
		axios.get('/ltc/gov/insurant/apply-order-timeline-list/' + params.id)
}
