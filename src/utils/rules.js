export const applyRules = {
	// 参保人姓名
	insurantName: [
		{
			required: true,
			message: '请输入参保人姓名',
			trigger: ['blur', 'change']
		}
	],
	// 参保人身份证
	insurantIdCard: [
		{
			required: true,
			message: '请输入参保人身份证号',
			trigger: ['blur', 'change']
		},
		{
			pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
			message: '请填写正确的身份证号',
			trigger: 'blur'
		}
	],
	// 参保人所在地区,选择省市区县、街道/镇等
	insurantAreaCode: [
		{
			required: true,
			message: '请选择参保人所在地区',
			trigger: ['blur', 'change']
		}
	],
	// 参保人详细地址
	insurantAddress: [
		{
			required: true,
			message: '请输入参保人详细地址',
			trigger: ['blur', 'change']
		},
		{
			min: 5,
			max: 120,
			message: '详细地址长度需要在5-120个汉字或字符',
			trigger: ['blur', 'change']
		}
	],
	// 参保人手机号
	insurantTel: [
		{
			required: true,
			message: '请输入参保人手机号',
			trigger: ['blur', 'change']
		},
		// {
		//   type: 'number',
		//   pattern: /(^1[34578]\d{9}$)/,
		//   message: '请填写正确的手机',
		//   trigger: 'blur'
		// }
		{
			validator: function(rule, value, callback) {
				if (/^1[34578]\d{9}$/.test(value) == false) {
					callback(new Error('请输入正确的手机号'))
				} else {
					callback()
				}
			},
			trigger: 'blur'
		}
	],
	// 参保人医保类型 1-职工医保，2-新农合医保，3-城镇居民基本医疗保险
	insurantType: [
		{
			required: true,
			message: '请选择参保人医保类型 ',
			trigger: ['blur', 'change']
		}
	],
	// 参保人医保卡号
	insurantMedicalCard: [
		{
			required: true,
			message: '请输入参保人医保卡号',
			trigger: ['blur', 'change']
		}
	],
	// 申请人与参保人关系，1-本人、2-子女、3-配偶、4-兄弟、5-姐妹、6-其他
	relation: [
		{
			required: true,
			message: '请选择与参保人关系',
			trigger: ['blur', 'change']
		}
	],
	// 通知书领取方式，1-邮寄，2-自行领取,
	receiveType: [
		{
			required: true,
			message: '请选择通知书领取方式',
			trigger: ['blur', 'change']
		}
	],
	// 申请人姓名
	applierName: [
		{
			required: true,
			message: '请输入申请人姓名',
			trigger: ['blur', 'change']
		}
	],
	// 申请人身份证号
	applierIdCard: [
		{
			required: true,
			message: '请输入代申请人身份证号',
			trigger: ['blur', 'change']
		},
		{
			pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
			message: '请填写正确的身份证号',
			trigger: 'blur'
		}
	],
	// 申请人手机号
	applierTel: [
		{
			required: true,
			message: '请输入代申请人手机号',
			trigger: ['blur', 'change']
		},
		{
			validator: function(rule, value, callback) {
				if (/^1[34578]\d{9}$/.test(value) == false) {
					callback(new Error('请输入正确的手机号'))
				} else {
					callback()
				}
			},
			trigger: 'blur'
		}
	], // 参保人身份证正面
	insurantIdCardFront: [
		{
			required: true,
			message: '请上传参保人身份证正面',
			trigger: ['change']
		}
	],
	// 参保人身份证反面
	insurantIdCardBack: [
		{
			required: true,
			message: '请上传参保人身份证反面',
			trigger: ['blur', 'change']
		}
	],
	// 参保人医保卡正面
	insurantMedicalCardFront: [
		{
			required: true,
			message: '请上传参保人医保卡正面',
			trigger: ['blur', 'change']
		}
	],
	// 参保人医保卡反面
	insurantMedicalCardBack: [
		{
			required: true,
			message: '请上传参保人医保卡正面',
			trigger: ['change']
		}
	],
	//上传诊断病历资料最多上传9张照片
	insurantOtherFile: [
		{
			required: true,
			message: '请上传诊断病历资料',
			trigger: ['change']
		}
	],
	insurantOtherFileList: [
		{
			required: true,
			message: '请上传诊断病历资料',
			trigger: ['change']
		}
	]
}

export const agencyRules = {
	agencyName: [
		{
			required: true,
			message: '请输入机构名称',
			trigger: ['blur', 'change']
		}
	],
	contactName: [
		{
			required: true,
			message: '请输入机构联系人',
			trigger: ['blur', 'change']
		}
	],
	contactTel: [
		{
			required: true,
			message: '请输入机构联系电话',
			trigger: ['blur', 'change']
		},
		{
			validator: function(rule, value, callback) {
				if (/^1[34578]\d{9}$/.test(value) == false) {
					callback(new Error('请输入正确的手机号'))
				} else {
					callback()
				}
			},
			trigger: 'blur'
		}
	],
	agencyAddress: [
		{
			required: true,
			message: '请输入详细地址',
			trigger: ['blur', 'change']
		},
		{
			min: 5,
			max: 120,
			message: '详细地址长度需要在5-120个汉字或字符',
			trigger: ['blur', 'change']
		}
	],
	areaCode: [
		{
			required: true,
			message: '请选择营业地址'
		}
	],
	legalPerson: [
		{
			required: true,
			message: '请输入法人代表',
			trigger: ['blur', 'change']
		}
	],
	legalIdCard: [
		{
			required: true,
			message: '请输入法人身份证号',
			trigger: ['blur', 'change']
		},
		{
			pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
			message: '请填写正确的身份证号',
			trigger: 'blur'
		}
	],
	legalPhone: [
		{
			required: true,
			message: '请输入联系电话',
			trigger: ['blur', 'change']
		},
		{
			validator: function(rule, value, callback) {
				if (/^1[34578]\d{9}$/.test(value) == false) {
					callback(new Error('请输入正确的手机号'))
				} else {
					callback()
				}
			},
			trigger: 'blur'
		}
	],
	businessLicense: [
		{
			required: true,
			message: '请上传营业执照照片',
			trigger: ['blur', 'change']
		}
	],
	legalCertificateImg: [
		{
			required: true,
			message: '请上传法人身份证照片',
			trigger: ['blur', 'change']
		}
	]
}
