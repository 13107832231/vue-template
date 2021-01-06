<template>
	<div class="pdf-page">
		<div id="reports">
			<div class="reports print">
				<div class="base-info">
					<div class="user-info">
						<span>姓名：{{ reporDetail.insurantName }}</span>
						<span>身份证号：{{ reporDetail.insurantIdCard }}</span>
					</div>
					<div>评估结果</div>
					<h2>{{ reporDetail.careDemandResult }}</h2>
					<div class="base-list">
						<div
							v-for="(item,
							index) in evaluateResult.abilityEvaluateDimensionList"
							:key="index"
							class="base-item"
							@click="() => jumpToDetail(index)"
						>
							<span>{{ item.name }}</span>
							<span>{{ item.totalScore }} 分</span>
						</div>
						<div
							class="base-item"
							v-if="evaluateResult.medicalEvaluateDimension"
							@click="() => jumpToDetail(999)"
						>
							<span>{{ evaluateResult.medicalEvaluateDimension.name }}</span>
							<span>{{ evaluateResult.medicalEvaluateDimension.score }}项</span>
						</div>
					</div>

					<div class="report-info">
						<div
							v-if="
								reporDetail.abilityEvaluatorName ===
									reporDetail.medicalEvaluatorName
							"
						>
							评估师：{{ reporDetail.abilityEvaluatorName }}
						</div>
						<div v-else>
							评估师：{{ reporDetail.abilityEvaluatorName }}、{{
								reporDetail.medicalEvaluatorName
							}}
						</div>
						<div>本报告由{{ reporDetail.agencyName }}提供</div>
					</div>
				</div>
				<div
					class="report-result"
					:class="{ active: reporDetail.status === 3 }"
				>
					{{ reporDetail.status === 2 ? '待公示' : '已公示' }}
				</div>
				<div
					class="report-group"
					:id="`report-block-${index}`"
					v-for="(item, index) in evaluateResult.abilityEvaluateDimensionList"
					:key="index"
				>
					<h3>{{ item.name }}</h3>
					<div
						class="report"
						v-for="(report, i) in item.itemList"
						:key="report.name"
					>
						<div class="report-title">
							<h4>{{ i + 1 }}.{{ report.itemName }}</h4>
							<el-tag size="small" effect="dark"
								>{{ report.score || 0 }}分</el-tag
							>
						</div>
						<div class="report-info">
							<p>{{ getItemInfo(report) }}</p>
						</div>
					</div>
					<div class="signature">
						<div class="signature-item">
							<div>评估师签名：<img :src="item.evaluatorSignName" /></div>
							<div
								v-if="
									evaluateResult.abilityEvaluateDimensionList.length - 1 ===
										index
								"
							>
								家属签名：<img :src="evaluateResult.abilityInsurantSignName" />
							</div>
						</div>
						<div class="option-level">
							受损等级：<span>{{ item.level }}</span>
						</div>
						<p>
							评估时间：{{
								$dayjs(item.evaluateTime).format('YYYY-MM-DD HH:mm:ss')
							}}
						</p>
					</div>
					<div class="remark">
						<h4>结论备注：</h4>
						<p>{{ item.evaluateRemark }}</p>
					</div>
				</div>

				<div
					:id="`report-block-999`"
					class="report-group"
					v-if="evaluateResult.medicalEvaluateDimension"
				>
					<h3>{{ evaluateResult.medicalEvaluateDimension.name }}</h3>
					<div
						class="report"
						v-for="(report, i) in evaluateResult.medicalEvaluateDimension
							.itemList"
						:key="report.name"
					>
						<div class="report-title">
							<h4>{{ i + 1 }}.{{ report.option }}</h4>
							<span>{{ report.value == 1 ? '有' : '无' }}</span>
						</div>

						<div v-if="report.value == 1" class="report-detail">
							<div
								v-for="(option, optionIndex) in report.optionList"
								:key="optionIndex"
							>
								<div class="info-item-image" v-if="option.type === 'upload'">
									<div>{{ option.option }}</div>
									<div class="report-image-box">
										<img
											v-for="(img, imgIndex) in getTypeValue(option)"
											:key="imgIndex"
											@click="() => viewImg(getTypeValue(option), imgIndex)"
											:src="img + '?x-oss-process=image/resize,w_300'"
										/>
									</div>
								</div>
								<!-- 选项 -->
								<div v-else-if="option.type === 'radio'">
									<div class="report-detail-item">
										<span>{{ option.option }}</span>

										<span>
											{{ option.value == 1 ? '有' : '无' }}
										</span>
									</div>
									<div v-if="option.value == 1">
										<div
											v-for="(sub, subIndex) in option.optionList"
											:key="subIndex"
										>
											<div
												class="info-item-image"
												v-if="sub.type === 'upload' && sub.value"
											>
												<div>{{ sub.option }}</div>
												<div class="report-image-box">
													<!-- <img
                        v-for="(img, imgIndex) in getTypeValue(sub)"
                        :key="imgIndex"
                        :src="img"
                      /> -->
													<img
														v-for="(img, imgIndex) in getTypeValue(sub)"
														:key="imgIndex"
														@click="() => viewImg(getTypeValue(sub), imgIndex)"
														:src="img + '?x-oss-process=image/resize,w_300'"
													/>
												</div>
											</div>

											<div class="report-detail-item" v-else>
												<span>{{ sub.option }}</span>

												<span>{{ getTypeValue(sub) }}</span>
											</div>
										</div>
									</div>
								</div>
								<div class="report-detail-item" v-else>
									<span>{{ option.option }}</span>

									<span>{{ getTypeValue(option) }}</span>
								</div>
							</div>
						</div>
					</div>
					<div class="signature">
						<div class="signature-item">
							<div>
								评估师签名：<img
									:src="
										evaluateResult.medicalEvaluateDimension.evaluatorSignName
									"
								/>
							</div>
							<div>
								家属签名：<img :src="evaluateResult.medicalInsurantSignName" />
							</div>
						</div>

						<p>
							评估时间：{{
								$dayjs(
									evaluateResult.medicalEvaluateDimension.evaluateTime
								).format('YYYY-MM-DD HH:mm:ss')
							}}
						</p>
					</div>
					<div class="remark">
						<h4>结论备注：</h4>
						<p>{{ evaluateResult.medicalEvaluateDimension.evaluateRemark }}</p>
					</div>
				</div>
			</div>

			<!-- 图片预览 -->
			<me-viewer
				:visible.sync="showViewer"
				:list="imgList"
				:currentIndex="currentIndex"
			/>
		</div>
		<div class="view" v-html="reportHtml"></div>
		<el-button type="primary" @click="savePdf">下载pdf</el-button>
		<router-link to="/pdf/dowm" target="_blank">打印报告</router-link>
		<el-button type="primary" @click="() => $router.push('/pdf/dowm')"
			>打印报告</el-button
		>
	</div>
</template>
<script>
	import { jsPDF } from 'jspdf'
	import { JSDOM } from 'jsdom'
	import html2Canvas from 'html2canvas'
	import printJS from 'print-js'
	export default {
		name: 'Report',
		data() {
			return {
				reporDetail: {}, //评估报告详情
				evaluateResult: {}, //评估报告结果
				showViewer: false,
				imgList: [],
				currentIndex: 0,
				reportHtml: ''
			}
		},
		props: {
			id: {
				type: [String, Number],
				default: '87089'
			}
		},
		watch: {
			id: {
				handler(val) {
					if (val) {
						const params = {
							id: val
						}
						this.$api.getOrderReportDetail(params).then((res) => {
							if (res.code !== 0) return this.$msg(res.msg, 'error')
							this.reporDetail = {
								...res.data
							}
							this.evaluateResult = JSON.parse(res.data.evaluateResult)
							this.$nextTick(() => {
								this.pringPdf()
							})
						})
					}
				},
				immediate: true
			}
		},
		created() {},
		mounted() {},
		methods: {
			/**
			 * getItemInfo
			 */
			getItemInfo(report) {
				let label = ''
				report.optionList.forEach((v) => {
					if (v.value == report.score) {
						label = v.option
					}
				})
				return label
			},
			getTypeValue(option) {
				// 具体细项根据类型获取
				let data = null
				if (
					option.type === 'date' ||
					option.type === 'text' ||
					option.type === 'textarea'
				) {
					data = option.value
				}
				if (option.type === 'radio') {
					data = option.value == '1' ? '是' : '否'
				}
				if (option.type === 'upload') {
					data = option.value ? option.value.split(',') : []
				}
				if (
					option.type === 'checkboxgroup' &&
					option.value &&
					option.optionList
				) {
					const values = option.value.split(',')
					option.optionList.forEach((item) => {
						if (values.includes(item.value)) {
							data = data ? data + '，' + item.option : item.option
						}
					})
				}
				return data
			},
			jumpToDetail(index) {
				// 点击跳转到对应位置

				const height = document.getElementById(`report-block-${index}`)
					.offsetTop
				const reportsDom = document.getElementById('reports')

				reportsDom.scrollTop = height
			},
			/**
			 * 图片预览
			 */
			viewImg(url, index) {
				this.currentIndex = index || 0
				this.imgList = url
				this.showViewer = true
			},
			/**
			 * savePdf
			 */
			savePdf() {
				let title = '评估报告'
				this.reportHtml = document.querySelector('#reports').innerHTML
			},
			/**
			 * 打印
			 */
			pringPdf() {
				printJS({
					printable: 'reports',
					type: 'html',
					style: 'height:auto',
					targetStyles: ['*']
				})

				// window.document.body.innerHTML = document.getElementById(
				// 	'reports'
				// ).innerHTML
				// //调用打印功能
				// window.print()
				// window.document.body.innerHTML = this.reportHtml //重新给页面内容赋值；
			}
		}
	}
</script>
<style lang="less" scope>
	.reports {
		width: 100%;
		height: 75vh;
		padding: 24px;
		overflow: auto;
		background-color: #fff;
		position: relative;
		.base-info {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin-bottom: 50px;
			.user-info {
				padding-bottom: 30px;
				span {
					margin-left: 20px;
				}
			}
			.base-list {
				width: 100%;
				.base-item {
					width: 100%;
					font-size: 15px;
					padding: 10px;
					display: flex;
					justify-content: space-between;
					border-radius: 40px;
					border: 0.5px solid #e6e6e6;
					margin: 20px 0;
				}
			}
		}
		.report-result {
			position: absolute;
			top: 45px;
			right: 24px;
			width: 120px;
			height: 36px;
			line-height: 36px;
			text-align: center;
			border: 1px solid#37c9bc;
			transform: rotate(23deg);
			color: #37c9bc;
			&.active {
				color: #ff0000;
				border: 1px solid #ff0000;
			}
		}

		.report-group {
			h3 {
				text-align: center;
				margin-bottom: 24px;
			}
			.report {
				width: 100%;
				margin-bottom: 24px;
				.report-title {
					margin-bottom: 12px;
					display: flex;
					align-items: center;
					justify-content: space-between;
				}
				.report-info {
					padding: 0 12px;
					color: rgba(0, 0, 0, 0.65);
				}
				.report-detail {
					.report-detail-item {
						display: flex;
						justify-content: space-between;
						color: #999999;
						font-size: 13px;
						margin: 10px 0;
						span:first-child {
							width: 90px;
							white-space: nowrap;
							margin-right: 20px;
						}
						span:last-child {
							flex: 1;
							text-align: right;
						}
					}
					.info-item-image {
						color: #999999;

						.report-image-box {
							img {
								width: 31%;
								height: 100px;
								// margin: 10px 20px 10px 0;
								margin: 10px 3.5% 10px 0;
								&:nth-child(3n) {
									margin-right: 0px;
								}
							}
						}
					}
				}
			}
			.signature {
				margin: 15px 0;
				.signature-item {
					display: flex;
					div {
						display: flex;
						align-items: center;
					}
					img {
						width: 100px;
						height: 50px;
					}
				}
			}
			.option-level {
				margin: 10px 0;
			}
			.remark {
				margin: 15px 0;
			}
		}
	}
	@media pring {
		.print {
			height: auto;
		}
	}
</style>
