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
  getEvaluateAgency: get('/ltc/gov/evaluate-agency/page'),
  //修改机构停用状态
  setAgencyEnable: patch('/ltc/gov/evaluate-agency/status'),
  //新增机构
  addAgency: post('/ltc/gov/evaluate-agency'),
  //修改机构
  updateAgency: put('/ltc/gov/evaluate-agency'),
  //获取详情
  getAgencyDetail: (params) =>
    axios.get('/ltc/gov/evaluate-agency/' + `${params.id}`),
  //删除机构
  delAgency: (params) =>
    axios.delete('/ltc/gov/evaluate-agency/' + `${params.id}`),
  //获取评估师列表
  getEvaluatorList: get('/ltc/gov/evaluator/list'),
  //获取所有机构列表数据
  getAgencyAll: get('/ltc/gov/evaluator/agencyList'),
  //评估记录列表
  getEvaluateRecord: get('/ltc/gov/evaluator/recordList'),
  //根据ID查询评估师信息
  getEvaluatorInfo: (params) =>
    axios.get('/ltc/gov/evaluator/detail/' + params.id),
  //根据ID查询评估师统计信息
  getEvaluatorStatistics: (params) =>
    axios.get('/ltc/gov/evaluator/evaluatorStatis/' + params.id),
  //查看评估报告详情
  getOrderReportDetail: (params) =>
    axios.get('/ltc/gov/evaluate-order/getEvaluateReport/' + params.id)
}
