<template>
	<div class="me-upload-list">
		<div class="img-item" v-for="(item, index) in value" :key="index">
			<el-image
				class="img"
				:preview-src-list="value"
				fit="cover"
				:src="item"
			></el-image>
			<div class="img-action">
				<el-button
					class="action"
					type="text"
					size="small"
					v-if="showPreview"
					icon="el-icon-zoom-in"
					@click="preview(index)"
				></el-button>
				<el-button
					class="action"
					type="text"
					@click="remove(index)"
					icon="el-icon-delete"
				></el-button>
			</div>
		</div>
		<slot></slot>
		<!-- 预览 -->
		<el-dialog
			class="preview-dialog"
			width="640px"
			:visible.sync="visiblePreview"
		>
			<div class="img-big">
				<img :src="imgUrl" />
			</div>
		</el-dialog>
	</div>
</template>
<script>
	export default {
		name: 'MeUploadList',
		props: {
			//是否可以预览
			showPreview: {
				type: Boolean,
				default: true
			},
			value: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				visiblePreview: false,
				imgUrl: ''
			}
		},
		methods: {
			/**
			 * 移除
			 */
			remove(index) {
				this.value.splice(index, 1)
			},
			/**
			 * 预览
			 */
			preview(index) {
				this.imgUrl = this.value[index]
				this.visiblePreview = true
			}
		}
	}
</script>
<style lang="less" scoped>
	.me-upload-list {
		display: inline-flex;
		align-items: flex-start;
		.img-item {
			position: relative;
			width: 100px;
			height: 100px;
			margin-right: 8px;
			border-radius: 5px;
			overflow: hidden;
			.img {
				width: 100%;
				height: 100%;
			}
			&:hover {
				.img-action {
					visibility: visible;
				}
			}
			.img-action {
				position: absolute;
				visibility: hidden;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background-color: rgba(0, 0, 0, 0.5);
				color: #fff;
				display: flex;
				align-items: center;
				justify-content: center;
				.action {
					color: #fff;
					font-size: 20px;
				}
			}
		}
	}
	.preview-dialog {
		/deep/.el-dialog__header,
		/deep/ .el-dialog__body {
			padding: 0;
		}
	}
	.img-big {
		max-height: 600px;
		width: 100%;
		img {
			width: 100%;
		}
	}
</style>
