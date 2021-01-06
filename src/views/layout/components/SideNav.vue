<template>
	<el-aside class="hkb-aside" :width="isCollapse ? '60px' : '240px'">
		<div class="hkb-side-logo">
			<img src="@/assets/logo.png" alt="长护" />
			<span v-if="!isCollapse">{{ $configs.title }}</span>
		</div>
		<div class="hkb-side-nav">
			<slot></slot>
		</div>
	</el-aside>
</template>
<script>
	export default {
		computed: {
			isCollapse() {
				return Boolean(+this.$store.state.page.asideMini)
			}
		},
		methods: {}
	}
</script>
