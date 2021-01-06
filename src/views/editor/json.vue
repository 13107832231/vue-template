<template>
	<json-editor
		v-model="code"
		v-loading="loading"
		@reset="getList"
		@save="saveJson"
	></json-editor>
</template>
<script>
	import JsonEditor from '@/components/json-editor/index.js'
	export default {
		components: {
			JsonEditor
		},
		data() {
			return {
				loading: false,
				code: ''
			}
		},
		created() {
			this.getList()
		},
		methods: {
			/**
			 * 获取列表列表
			 */
			getList() {
				this.loading = true
				this.$api
					.getStandardJson()
					.then((data) => {
						this.loading = false
						this.code = data.data
					})
					.catch((err) => {
						this.loading = false
					})
			},
			/**
			 * 保存
			 */
			saveJson() {
				let params = JSON.parse(this.code)
				this.$confirm('提交后将直接生效，你试否确定提交？', '提交', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				})
					.then(() => {
						this.$msg('保存成功')
					})
					.catch(() => {})
			}
		}
	}
</script>
