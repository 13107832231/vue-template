<template>
	<me-card title="OSS Upload">
		<div class="demo">
			<me-upload-list v-model="list" class="demo-item">
				<me-upload
					osstype="feed_back_img"
					multiple
					:limit="6"
					:list.sync="list"
					:show-file-list="false"
					@success="uploadSuccess"
				></me-upload>
			</me-upload-list>
			<div class="demo-item">
				<pre class="demo-code">list:{{ list }}</pre>
			</div>
		</div>
		<div class="demo">
			<div class="demo-item">
				<me-upload
					osstype="feed_back_img"
					:show-file-list="false"
					@success="uploadSingelSuccess"
				>
					<img v-if="imageUrl" :src="imageUrl" />
					<i v-else class="el-icon-plus me-upload-icon"></i>
				</me-upload>
			</div>
			<div class="demo-item">
				<pre class="demo-code">imageUrl:{{ imageUrl }}</pre>
			</div>
		</div>
		<div class="demo">
			<div class="demo-item">
				<me-upload
					drag
					width="200"
					height="150"
					osstype="feed_back_img"
					:show-file-list="false"
					@success="uploadSingelSuccess"
				>
					<img v-if="imageUrl" :src="imageUrl" />
					<i v-else class="el-icon-plus me-upload-icon"></i>
				</me-upload>
			</div>
			<div class="demo-item">
				<pre class="demo-code">imageUrl:{{ imageUrl }}</pre>
			</div>
		</div>
	</me-card>
</template>
<script>
	export default {
		data() {
			return {
				list: [
					'http://kycic-test1.oss-cn-shanghai.aliyuncs.com/temp/ltc/care/feed_back_img/1608623950131anjERf.jpg',
					'http://kycic-test1.oss-cn-shanghai.aliyuncs.com/temp/ltc/care/feed_back_img/1608624200194YeChcJ.png'
				],
				imageUrl: ''
			}
		},
		methods: {
			uploadSuccess(val) {
				console.log(val)
				this.list = val
			},
			uploadSingelSuccess(val) {
				this.imageUrl = val[0]
			}
		}
	}
</script>
<style lang="less" scoped>
	.demo {
		display: flex;
		width: 100%;
		margin-bottom: 24px;

		.demo-item {
			width: 50%;
			overflow: hidden;
			.demo-code {
				width: 100%;
				padding: 24px;
				background-color: #333;
				color: #fff;
				word-break: break-all;
				white-space: pre-wrap;
			}
		}
	}
</style>
