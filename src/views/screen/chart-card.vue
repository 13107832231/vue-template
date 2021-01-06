<template>
	<div class="chart-card">
		<div class="chart-card-head" v-if="title">
			<h3>{{ title }}</h3>
		</div>
		<div class="chart-card-body">
			<slot></slot>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'ChatCard',
		props: {
			title: {
				type: String,
				default: ''
			}
		}
	}
</script>
<style lang="less" scoped>
	.chart-card {
		flex: 1;
		width: 100%;
		height: 100%;
		display: flex;
		background-color: rgba(0, 0, 0, 0.1);
		.chart-card-head {
			height: 45px;
			display: flex;
			align-items: center;

			opacity: 0.8;
			h3 {
				font-size: 16px;
				padding: 0 24px;
				font-weight: 500;
				letter-spacing: 3px;
				font-weight: bold;
				background: linear-gradient(180deg, #ffffff, #01243f);
				-webkit-background-clip: text;
				color: transparent;
			}
		}
		.chart-card-body {
			flex: 1;
		}
	}
</style>
