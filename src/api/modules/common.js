import { get } from '../request'
//登录
export default {
	getOSSToken: get('/admin/sys-file/getALiYunOSSToken'),
	getAreaList: get('/ltc/sys/area/area-on-tree'),
	getAreaCode: get('/bfd/adminarea/queryArea'),
	//获取护理等级
	getLevelList: get(
		'/ltc/gov/evaluate-standard/care-demand-level/queryCareDemandLevelList'
	)
}
