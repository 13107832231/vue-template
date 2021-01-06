<template>
	<section class="hk-layout">
		<aside v-if="aside" class="hk-layout-aside" :style="'width:' + sideSize">
			<slot name="aside"></slot>
		</aside>
		<main class="hk-layout-main">
			<slot></slot>
		</main>
	</section>
</template>
<script>
	export default {
		name: 'HkLayout',
		data() {
			return {}
		},
		props: {
			aside: {
				type: Boolean,
				default: false
			},
			sideSize: {
				type: String,
				default: '360px'
			}
		}
	}
</script>
<style lang="less" scoped>
	.hk-layout {
		width: 100%;
		height: calc(100vh - 100px);
		display: flex;
		align-items: flex-start;
		&.cloum {
			flex-direction: column;
		}
		.hk-layout-aside {
			height: auto;
			margin-right: 24px;
		}
		.hk-layout-main {
			height: 100%;
			flex: 1;
		}
	}
</style>
