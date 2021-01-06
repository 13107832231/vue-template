<template>
	<el-drawer class="me-drawer">
		<div class="me-drawer-footer">
			<slot name="footer"></slot>
		</div>
	</el-drawer>
</template>
<script>
	export default {
		name: 'MeDrawer',
		data() {
			return {}
		}
	}
</script>
<style lang="less" scoped>
	.me-drawer-footer {
		background-color: #f0f0f0;
		color: #37c9bc;
		height: 60px;
		display: flex;
		padding: 0 24px;
		margin-bottom: 0;
	}
</style>
