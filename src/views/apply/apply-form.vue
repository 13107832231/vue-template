<template>
	<div class="form-layout">
		<div class="form-step">
			{{ stepActive }} {{ formName[stepActive] }}
			<el-steps :active="stepActive" finish-status="success">
				<el-step title="基础信息"></el-step>
				<el-step title="资质信息"></el-step>
				<el-step title="法人信息"></el-step>
			</el-steps>
		</div>
		<div class="form-main">
			<component :is="formName[stepActive]"></component>
		</div>
		<div class="form-actions">
			<el-button type="primary" @click="prevStep">上一步</el-button>
			<el-button type="primary">保存</el-button>
			<el-button type="primary" @click="nextStep">下一步</el-button>
		</div>
	</div>
</template>
<script>
	import basics from './form/basics'
	import legal from './form/legal'
	import qualification from './form/qualification'
	export default {
		components: {
			basics,
			legal,
			qualification
		},
		data() {
			return {
				stepActive: 1,
				formName: {
					1: 'basics',
					2: 'qualification',
					3: 'legal'
				}
			}
		},
		methods: {
			nextStep() {
				if (this.stepActive == 3) return
				this.stepActive += 1
			},
			prevStep() {
				if (this.stepActive == 1) return
				this.stepActive -= 1
			}
		}
	}
</script>
<style lang="less" scoped>
	.form-layout {
		width: 100%;
		height: 100%;
		max-width: 1000px;
		margin: 0 auto;
		background-color: #fff;
		border-radius: 4px;
		box-shadow: 0 1px 2px rgba(150, 150, 150, 0.3);
		padding: 20px 30px 30px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		.form-step {
			width: 100%;
			border-bottom: 1px solid #eee;
			padding-bottom: 24px;
			.el-step {
				width: 100%;
			}
		}
		.form-main {
			flex: 1;
			overflow: auto;
		}
		.form-actions {
			height: 80px;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>
