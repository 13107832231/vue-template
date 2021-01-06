<template>
	<div class="policy">
		<div class="policy-list">
			<div
				class="policy-item"
				:class="{ active: current == item.id }"
				v-for="item in list"
				@click="pickItem(item)"
				:key="item.id"
			>
				{{ item.title }}
			</div>
		</div>
		<div class="policy-content">
			<me-editor v-model="rich"></me-editor>
		</div>
	</div>
</template>

<script>
	import MeEditor from '@/components/me-editor/index'
	import { text, text1, text2 } from './text'
	export default {
		components: {
			MeEditor
		},
		data() {
			return {
				rich: text,
				current: 0,
				list: [
					{
						id: 0,
						value: text,
						title: '《xx市长期护理保险失能评定》政策解读'
					},
					{
						id: 1,
						value: text1,
						title: '《长期护理保险使用指南》'
					},
					{
						id: 2,
						value: text2,
						title: '《用户服务协议》'
					}
				]
			}
		},
		mounted() {},
		methods: {
			/**
			 * 切换政策
			 */
			pickItem(item) {
				this.current = item.id
				this.rich = item.value
			}
		}
	}
</script>
<style lang="less" scoped>
	.policy {
		background-color: #fff;
		display: flex;
		align-items: flex-start;
		width: 100%;
		height: 100%;
		.policy-list {
			width: 298px;
			height: 100%;
			border-right: 1px solid #eee;
			.policy-item {
				padding: 24px;
				color: #666;
				border-bottom: 1px solid #efefef;
				transition: all 0.3s;
				font-size: 14px;
				cursor: pointer;
				font-weight: 500;
				&:hover {
					background-color: #f9f9f9;
					transition: all 0.3s;
					color: #37c9bc;
				}
				&.active {
					background-color: #fff;
					transition: all 0.3s;
					color: #37c9bc;
				}
			}
		}
		.policy-content {
			flex: 1;
			height: 100%;
			max-width: calc(100% - 300px);
			padding: 0 24px;
		}
	}
</style>
