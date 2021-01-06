<template>
	<el-upload
		v-loading="loading"
		class="oss-upload"
		action
		:accept="accept"
		v-bind="$attrs"
		v-on="$listeners"
		:file-list="uploadlist"
		:http-request="uploadOss"
		:before-upload="handleBeforeUpload"
		:on-success="handleSuccess"
		:on-remove="listRemove"
		:on-exceed="handleExceed"
		:on-change="fileChange"
	>
		<slot><i slot="default" class="el-icon-plus"></i></slot>
	</el-upload>
</template>
<script>
	import InitOSS from '@/utils/oss.js'
	export default {
		name: 'OssUpload',
		data() {
			return {
				loading: false,
				uploadlist: [],
				savePath: '',
				// 接受图片的类型
				accept: '.jpg,.jpeg,.png',
				ossCient: null
			}
		},
		props: {
			list: {
				type: Array,
				default: () => []
			},
			fileType: {
				type: String
			},
			small: {
				type: Boolean,
				default: false
			},
			tip: {
				type: String,
				default: ''
			}
		},
		watch: {
			list: {
				handler(val) {
					if (val) {
						this.uploadlist = val.map((v) => {
							return {
								url: v
							}
						})
					}
				},
				immediate: true
			}
		},
		methods: {
			/**
			 * 上传oss
			 *
			 */
			async uploadOss(res) {
				console.log('http:', res)
				this.loading = true
				const oc = await this.getOssToken(this.fileType)
				const file = await this.putFile(oc, res.file, this.path)
				this.uploadlist.push(file)
				// let urls = this.uploadlist.map((v) => v.url)
				//上成功
				// this.$emit('success', urls)
				// this.listToStr()
				this.loading = false
			},
			/**
			 *将filelist 转字符串
			 */
			listToStr() {
				let urls = this.uploadlist.map((v) => v.url)
				this.$emit('update:list', urls)
			},
			/**
			 * 移除文件
			 */
			listRemove(file, fileList) {
				let urls = fileList.map((v) => v.url)
				this.$emit('update:list', urls)
			},
			/**
			 * 获取上传权限
			 */
			getOssToken(type) {
				let params = {
					tokenName: 'web',
					fileType: type
				}
				return new Promise((reslove, reject) => {
					this.$api.getOSSToken(params).then((res) => {
						if (res.code !== 0) return this.$msg(res.msg)
						this.savePath = res.data.savePath + '/'
						let oc = InitOSS(res.data)
						reslove(oc)
						return oc
					})
				})
			},
			/**
			 * 上传
			 */
			async putFile(OC, data, path) {
				try {
					let timetamp = new Date().getTime()
					let name = this.randomString(6) // 随机字符串
					let ext = data.name.substr(data.name.indexOf('.')) // 文件扩展名
					let result = await OC.put(this.savePath + timetamp + name + ext, data)
					return result
				} catch (e) {}
			},
			handleExceed(files, fileList) {
				this.$message.warning(`最多只能上传9张图片`)
			},
			/**
			 * 选择
			 */
			fileChange(file, fileList) {
				console.log('change:', file, fileList)
			},
			/**
			 *上传成功
			 */
			handleSuccess(response, file, fileList) {
				console.log('success:', response, file, 'upload')
			},
			/**
			 * handleBeforeUpload
			 */
			handleBeforeUpload(file) {
				const imgTypes = ['image/jpeg', 'image/jpg', 'image/png']
				const isJPG = imgTypes.includes(file.type)
				const isLt8M = file.size / 1024 / 1024 < 8
				if (!isJPG) {
					this.$message.error('请上传JPG,PNG,JPEG等格式图片')
					return false
				}
				if (!isLt8M) {
					this.$message.error('上传图片大小不能超过 8MB!')
					return false
				}
				return isJPG && isLt8M
			},
			/**
			 * 创建随机字符串
			 * @param len
			 * @returns {string}
			 */
			randomString(len) {
				len = len || 32
				let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
				let res = ''
				for (let i = 0; i < len; i++) {
					var id = Math.ceil(Math.random() * 32)
					res += chars.split('')[id]
				}
				return res
			}
		}
	}
</script>
<style lang="less">
	.oss-upload {
		.el-upload {
			width: 100%;
			&.el-upload--picture-card {
				width: 100px;
				height: 100px;
				line-height: 100px;
			}
		}
		.el-upload-list--picture-card {
			.el-upload-list__item {
				width: 100px;
				height: 100px;
			}
		}
		.el-upload-dragger {
			width: 100%;
		}
		.tip-text {
			font-size: 12px;
		}
		img {
			width: 100%;
			height: 100%;
			object-fit: contain;
		}
	}
	.preview-img {
		height: 100%;
		width: 100%;
	}
</style>
