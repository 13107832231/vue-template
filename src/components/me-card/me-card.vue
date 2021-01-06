<template>
	<div class="me-card" :class="[{ border: border }, { shadow: shadow }]">
		<div class="me-card-head" v-if="title">
			<h3 class="me-card-title">
				{{ title }}
			</h3>
			<slot name="header"></slot>
		</div>
		<div class="me-card-body">
			<slot></slot>
		</div>
		<div class="me-card-actions" v-if="footer">
			<slot name="footer"></slot>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'MeCard',
		data() {
			return {
				collapse: true
			}
		},
		props: {
			border: {
				type: Boolean,
				default: false
			},
			shadow: {
				type: Boolean,
				default: false
			},
			footer: {
				type: Boolean,
				default: false
			},
			title: {
				type: String,
				default: ''
			}
		},
		methods: {
			collapseCard() {
				this.collapse = !this.collapse
			}
		}
	}
</script>

<style lang="less" scoped>
	@primaryColor: #37c9bc;
	.title(@size: 14px) {
		font-size: @size;
		font-weight: bold;
		color: #333;
	}

	.me-card {
		width: 100%;
		background-color: #fff;
		&.border {
			border: 1px solid @primaryColor;
		}
		&.shadow {
			box-shadow: 1px 5px 5px 2px rgba(0, 0, 0, 0.05);
		}
		.me-card-head {
			position: relative;
			display: flex;
			align-items: center;
			padding: 12px;
			border-bottom: 1px solid rgb(240, 240, 240);
			.me-card-title {
				.title(16px);
				display: flex;
				align-items: center;
				flex: auto;
				overflow: hidden;
				color: #37c9bc;
				font-weight: 700;
				line-height: 1.5715;
				white-space: nowrap;
				text-overflow: ellipsis;
				.bn-icon {
					margin-right: 8px;
					width: 16px;
					height: 16px;
					line-height: 12px;
					text-align: center;
					color: #fff;
					background-color: #ff8400;
				}
			}
			font-weight: bold;
			.me-collapse {
				position: absolute;
				right: 8px;
				font-size: 18px;
				cursor: pointer;
				&:hover {
					color: @primaryColor;
				}
			}
		}
		.me-card-body {
			padding: 24px;
			background-color: #fff;
		}
		.me-card-actions {
			border-top: 1px solid #eee;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 8px;
		}
	}
</style>
