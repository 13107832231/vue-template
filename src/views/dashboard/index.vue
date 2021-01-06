<template>
	<div class="me-page">
		dashboard
		<div>
			<el-color-picker v-model="color" @change="themeChange"></el-color-picker>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				color: ''
			}
		},
		methods: {
			/**
			 * 切换主题
			 */
			themeChange(val) {
				this.$store.commit('setTheme', val)
				console.log(val)
			}
		}
	}
</script>
