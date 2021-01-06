import { get, post, del, put, patch } from '../request'
import qs from 'qs'
import axios from '../axios.js'
const setParams = (params) =>
  qs.stringify(params, {
    arrayFormat: 'indices'
  })
//登录
export default {
  //获取机构列表
  getEvaluationProgress: get(
    '/ltc/gov/evaluate-order/get-evaluation-progress-page'
  ),

  //获取评估详情
  getEvaluateOrder: (params) =>
    axios.get('/ltc/gov/evaluate-order/' + params.id),
  //公示
  evaluatePublicity: post('/ltc/gov/evaluate-order/publicity'),
  //申请复评
  orderReapply: (params) =>
    axios.get('/ltc/gov/evaluate-order/re-apply-order/' + params.id)
}
