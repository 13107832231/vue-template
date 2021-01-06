<template>
	<div class="doc">
		<h1>
			机构申请说明
		</h1>
		<div>
			机构申请说明 我已阅读并同意《长期护理机构平台服务协议》 下一步
			为了方便您更顺畅地完成申请并通过审核，入驻前请认真查看申请流程。
			点击下一步进入机构信息页 （一） 发布信息 （二）
			资料受理及审查：自接收服务机构申请材料之日起7天工作日内，审核结果会以短信
			方式告知服务机构。 （三）
			现场核查：作出受理核查决定之日起15个工作日内，完成核查。 （四）
			集体评估：在完成本批次现场核查后10个工作日内，完成评估。 （五） 名单公示期
			（六） 业务培训 （七） 安装系统 （八） 签订服务协议
		</div>
		<div>
			<el-button type="primary" @click="$router.push('/apply/form')"
				>下一步</el-button
			>
		</div>
	</div>
</template>
<script>
	export default {}
</script>
<style lang="less" scoped>
	.doc {
		background-color: #fff;
		margin: 0 auto;
		padding: 24px;
		max-width: 1000px;
		height: 100%;
		display: flex;
		align-items: center;
		flex-direction: column;
	}
</style>
