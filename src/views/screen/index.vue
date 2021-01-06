<template>
	<div class="me-screen">
		<header class="me-screen-header">
			<h1>综合养老监管平台</h1>
		</header>
		<main class="me-screen-main">
			<div class="group">
				<div class="chart-groups column grid2">
					<ChatCard title="老年人统计分析"></ChatCard>
					<ChatCard title="特殊对象"></ChatCard>
				</div>
				<div class="chart-groups grid1">
					<ChatCard></ChatCard>
				</div>
				<div class="chart-groups row-reverse grid4">
					<ChatCard title="服务情况统计"></ChatCard>
					<ChatCard title="从业人员统计"></ChatCard>
					<ChatCard title="床位统计"></ChatCard>
					<ChatCard title="老站点建设统计"></ChatCard>
				</div>
			</div>
			<div class="group-footer">
				<div class="chart-groups grid2">
					<ChatCard title="老年人统计分析"></ChatCard>
					<ChatCard title="特殊对象"></ChatCard>
				</div>
				<div class="chart-groups grid1">
					<ChatCard title="助老补贴"></ChatCard>
				</div>
				<div class="chart-groups grid2">
					<ChatCard title="近三年购买服务费用"></ChatCard>
					<ChatCard title="近三年购买服务次数"></ChatCard>
				</div>
			</div>
		</main>
	</div>
</template>
<script>
	import ChatCard from './chart-card'
	export default {
		components: {
			ChatCard
		},
		data() {
			return {}
		}
	}
</script>
<style lang="less" scoped>
	.me-screen {
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background-image: linear-gradient(90deg, #00092b, #031a2f);
		color: #ffffff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-direction: column;
		.me-screen-header {
			height: 60px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			h1 {
				font-size: 36px;
				letter-spacing: 5px;
				font-weight: bold;
				background: linear-gradient(to bottom, #ffffff, #01243f);
				-webkit-background-clip: text;
				color: transparent;
			}
		}
		.me-screen-main {
			width: 100%;
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-between;
			.group {
				width: 100%;
				height: 500px;
				display: flex;
				.chart-groups {
					flex: 1;
					overflow: hidden;
				}
			}
			.group-footer {
				width: 100%;
				display: flex;
				align-items: flex-start;
				flex: 1;
				height: calc(100vh - 450px);
			}
		}
	}

	.chart-groups {
		flex: 1;
		display: flex;
		height: 100%;
		overflow: hidden;
		&.column {
			flex-direction: column;
			&.grid2 {
				.chart-card {
					margin: 4px;
					width: calc(100% - 8px);
					height: calc(50% - 8px);
				}
			}
		}
		&.row-reverse {
			flex-wrap: wrap-reverse;
		}
		.chart-card {
			margin: 4px;
		}
		&.grid1 {
			.chart-card {
				margin: 4px;
				width: calc(100% - 8px);
				height: calc(100% - 8px);
			}
		}
		&.grid2 {
			.chart-card {
				margin: 4px;
				width: calc(50% - 8px);
				height: calc(100% - 8px);
			}
		}
		&.grid4 {
			.chart-card {
				margin: 4px;
				flex: auto;
				width: calc(50% - 8px);
				height: calc(50% - 8px);
			}
		}
	}
</style>
