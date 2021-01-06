import { get, post, del, put, patch } from '../request'
import qs from 'qs'
import axios from '../axios.js'
const setParams = (params) =>
	qs.stringify(params, {
		arrayFormat: 'indices'
	})
//登录
export default {
		//获取标准对象json
		getStandardJson: get('/ltc/gov/evaluate-standard/get-standard-initial-data'),
		//保存标准对象Json
		saveStandarJson:post('/ltc/gov/evaluate-standard/set-standard-initial-data'),
	//获取-待遇标准管理
	getTreatmentStandard: get('/ltc/gov/treatment-standard/all-treatment'),
	//添加-待遇标准管理
	addTreatmentStandard: post('/ltc/gov/treatment-standard/treatment-item'),
	//编辑-待遇标准管理
	editTreatmentStandard: put('/ltc/gov/treatment-standard/treatment-item'),
	//删除-待遇标准管理
	delTreatmentStandard: (params) =>
		axios.delete(
			'/ltc/gov/treatment-standard/treatment-item' +
				'/' +
				`${params.careDemandLevel}` +
				'/' +
				`${params.careType}`
		),
	//查询-护理需求等级列表
	getCareDemandLevelList: get(
		'/ltc/gov/evaluate-standard/care-demand-level/queryCareDemandLevelList'
	),
	//查询能力评估维度
	getAbilityEvaluateDimensionList: get(
		'/ltc/gov/evaluate-standard/ability-evaluate-dimension/queryAbilityEvaluateDimension'
	),
	//查看评估标准细项
	getAbilityEvaluateItemList: (params) =>
		axios.get(
			'/ltc/gov/evaluate-standard/ability-evaluate-item/queryItemList' +
				'/' +
				`${params.dimensionName}`
		),
	//添加评估标准细项
	addAbilityEvaluateItem: post(
		'/ltc/gov/evaluate-standard/ability-evaluate-item'
	),
	//修改评估标准细项
	editAbilityEvaluateItem: put(
		'/ltc/gov/evaluate-standard/ability-evaluate-item'
	),
	//删除评估标准细项
	delAbilityEvaluateItem: (params) =>
		axios.delete(
			'/ltc/gov/evaluate-standard/ability-evaluate-item' +
				'/' +
				`${params.dimensionName}` +
				'/' +
				`${params.abilityEvaluateItemName}`
		),
	//能力等级查看
	getAbilityLevelList: get(
		'/ltc/gov/evaluate-standard/ability-level/queryAbilityLevelList'
	),
	//能力对照表
	getAbilityEvaluateCompareTable: get(
		'/ltc/gov/evaluate-standard/ability-evaluate-compare-table/queryAbilityEvaluateCompareTable'
	),
	//更新能力对照表
	updateAbilityEvaluateCompareTable: post(
		'/ltc/gov/evaluate-standard/ability-evaluate-compare-table/updateAbilityEvaluateCompareTable'
	),
	//护理需求等级查看
	getCareDemandLevelList: get(
		'/ltc/gov/evaluate-standard/care-demand-level/queryCareDemandLevelList'
	),
	//获取护理需求等级评定
	getCareDemandEvaluateCompareTable: get(
		'/ltc/gov/evaluate-standard/care-demand-evaluate-compare-table/queryCareDemandEvaluateCompareTable'
	),
	//获取维度
	getSingleAbilityCompareTable: (params) =>
		axios.get(
			'/ltc/gov/evaluate-standard/single-dimension-ability-evaluate-compare-table/' +
				`${params.name}`
		),
	//添加能力维度
	addSingleAbilityCompareTable: post(
		'/ltc/gov/evaluate-standard/single-dimension-ability-evaluate-compare-table'
	),
	//编辑能力维度
	updateSingleAbilityCompareTable: put(
		'/ltc/gov/evaluate-standard/single-dimension-ability-evaluate-compare-table'
	),
	/**
	 *删除或者修改护理需求等级评定对照表
	 */
	updateCareDemandEvaluateCompareTable: post(
		'/ltc/gov/evaluate-standard/care-demand-evaluate-compare-table/updateCareDemandEvaluateCompareTable'
	),

	//删除能力维度
	delSingleAbilityCompareTable: (params) =>
		axios.delete(
			'ltc/gov/evaluate-standard/single-dimension-ability-evaluate-compare-table/' +
				`${params.name}` +
				'/' +
				`${params.score}`
		)
}
