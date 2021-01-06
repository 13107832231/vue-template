import { get, post, del, put, patch } from '../request'
import qs from 'qs'
import axios from '../axios.js'
const setParams = (params) =>
  qs.stringify(params, {
    arrayFormat: 'indices'
  })
//基础设置
export default {
  //获取-能力标准维度
  getAbilityEvaluationDimension: get(
    '/ltc/gov/evaluate-standard/ability-evaluate-dimension/queryAbilityEvaluateDimension'
  ),
  //添加-能力标准维度
  addAbilityEvaluationDimension: (params) =>
    axios.get(
      '/ltc/gov/evaluate-standard/ability-evaluate-dimension/addAbilityEvaluateDimension/' +
        params.name
    ),
  //编辑-能力标准维度
  editAbilityEvaluationDimension: post(
    '/ltc/gov/evaluate-standard/ability-evaluate-dimension/editAbilityEvaluateDimension'
  ),
  //删除-能力标准维度
  delAbilityEvaluationDimension: (params) =>
    axios.delete(
      '/ltc/gov/evaluate-standard/ability-evaluate-dimension/' +
        params.name
    ),
  //获取-能力等级
  getAbilityLevel: get(
    '/ltc/gov/evaluate-standard/ability-level/queryAbilityLevelList'
  ),
  //添加-能力等级
  addAbilityLevel: (params) =>
    axios.get(
      '/ltc/gov/evaluate-standard/ability-level/addAbilityLevel/' + params.name
    ),
  //编辑-能力等级
  editAbilityLevel: post(
    '/ltc/gov/evaluate-standard/ability-level/editAbilityLevel'
  ),
  //删除-能力等级
  delAbilityLevel: (params) =>
    axios.delete(
      'ltc/gov/evaluate-standard/ability-level/' + params.name
    ),
  //获取-护理等级名称
  getCareLevel: get(
    '/ltc/gov/evaluate-standard/care-demand-level/queryCareDemandLevelList'
  ),
  //添加-护理等级名称
  addCareLevel: post(
    '/ltc/gov/evaluate-standard/care-demand-level/addCareDemandLevel'
  ),
  //编辑-护理等级名称
  editCareLevel: post(
    '/ltc/gov/evaluate-standard/care-demand-level/editCareDemandLevel'
  ),
  //删除-护理等级名称
  delCareLevel: (params) =>
    axios.delete(
      '/ltc/gov/evaluate-standard/care-demand-level/' +
        params.name
    )
}
