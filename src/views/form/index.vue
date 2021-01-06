<template>
	<div class="form-editor">
		<div class="form-options">
			<h3>表单控件</h3>
			<draggable>
				<div class="item-list">
					<div class="item" v-for="item in Items" :key="item.type">
						<h4>{{ item.title }}</h4>
						<label>{{ item.type }}</label>
					</div>
				</div>
			</draggable>
		</div>
		<div class="form-content">
			<el-form :model="formData">
				<el-form-item
					:label="item.label"
					v-for="(item, index) in formItems"
					:key="index"
				></el-form-item>
			</el-form>
		</div>
		<div class="form-configs"></div>
	</div>
</template>
<script>
	import draggable from 'vuedraggable'
	export default {
		component: {
			draggable
		},
		data() {
			return {
				formData: {},
				formItems: [],
				Items: [
					{
						type: 'input',
						title: '输入框'
					},
					{
						type: 'textarea',
						title: '文本域'
					},
					{
						type: 'select',
						title: '选择器'
					},
					{
						type: 'checkbox',
						title: '多选框'
					},
					{
						type: 'radio',
						title: '单选框'
					},
					{
						type: 'switch',
						title: '开关'
					},
					{
						type: 'timepicker',
						title: '时间选择'
					},
					{
						type: 'DatePicker',
						title: '日期选择'
					},
					{
						type: 'DateTimePicker ',
						title: '日期时间选择器'
					},
					{
						type: 'Upload',
						title: '上传'
					},
					{
						type: 'Rate',
						title: '评分'
					},
					{
						type: 'Cascader',
						title: '级联选择器'
					},
					{
						type: 'Slider',
						title: '滑块'
					},
					{
						type: 'ColorPicker',
						title: '颜色选择器'
					}
				],
				formitems: [
					{
						value: '',
						type: 'input',
						label: '字段名称',
						required: false
					},
					{
						value: '',
						type: 'select',
						label: '字段名称',
						required: false
					}
				]
			}
		}
	}
</script>
<style lang="less" scoped>
	.form-editor {
		flex: 1;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		.form-content {
			flex: 1;
			margin: 0 24px;
			background-color: #fff;
		}
		.form-options {
			width: 240px;
			height: 100%;
			background-color: #fff;
			overflow: auto;
			h3 {
				font-size: 16px;
				padding: 12px;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.item-list {
				padding: 0 12px;
				.item {
					padding: 8px 12px;
					border: 1px solid #efefef;
					border-radius: 5px;
					margin-bottom: 12px;
					h4 {
						font-size: 14px;
						color: #333;
					}
					label {
						font-size: 13px;
						color: #999;
					}
				}
			}
		}
		.form-fonfigs {
			width: 300px;
		}
	}
</style>
