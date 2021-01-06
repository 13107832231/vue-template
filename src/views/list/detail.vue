<template>
	<hk-layout aside side-size="400px">
		<div slot="aside">
			<me-card title="基本信息">
				<div v-if="user.insurantName" class="user-card flow-row">
					<div class="user">
						<el-avatar
							class="avatar-proposer"
							:size="80"
							:src="
								user.insurantIdCardFront + '?x-oss-process=image/resize,w_300'
							"
						></el-avatar>
						<div class="user-baseTitle">
							<span>{{ user.insurantName }} </span>
							<span>{{ sex[user.insurantSex] }} </span>
							<span>{{ user.age }}岁</span>
						</div>
						<!-- <h3 class="user-title">
              <strong>{{ user.insurantName }}</strong>
              <span>{{ user.insurantSex }}</span>
              <span>{{ user.age }}岁</span>
            </h3> -->
					</div>

					<div class="user-info">
						<me-meta label="身份证号：" :value="user.insurantIdCard"></me-meta>
						<me-meta label="联系电话：" :value="user.insurantTel"></me-meta>
						<me-meta
							label="参保类型："
							:value="insurantType[user.insurantType]"
						></me-meta>
						<me-meta
							label="医保卡号："
							:value="user.insurantMedicalCard"
						></me-meta>
						<me-meta label="居住地址：" :value="user.insurantAddress"></me-meta>
					</div>
				</div>
			</me-card>
			<me-card title="相关数据">
				<div class="count-list">
					<div class="count-card">
						<label>申请次数</label>
						<strong>{{ user.applyCount }}</strong>
					</div>
					<div class="count-card">
						<label>评估次数</label>
						<strong>{{ user.evaluateCount }}</strong>
					</div>
					<!-- <div class="count-card">
						<label>护理申请次数</label>
						<strong>23</strong>
					</div>
					<div class="count-card">
						<label>服务次数</label>
						<strong>23</strong>
					</div>
					<div class="count-card">
						<label>服务时长/小时</label>
						<strong>23</strong>
					</div> -->
				</div>
			</me-card>
			<me-card title="相关证件">
				<div class="pro-tag">
					<el-tag effect="dark" size="small">身份证</el-tag>
				</div>
				<div class="pro-card">
					<img
						@click="() => viewImg([user.insurantIdCardFront])"
						:src="
							user.insurantIdCardFront + '?x-oss-process=image/resize,w_300'
						"
					/>
				</div>
				<div class="pro-tag">
					<el-tag effect="dark" size="small">医保卡</el-tag>
				</div>
				<div class="pro-card">
					<img
						@click="() => viewImg([user.insurantMedicalCardFront])"
						:src="
							user.insurantMedicalCardFront +
								'?x-oss-process=image/resize,w_300'
						"
					/>
				</div>
			</me-card>
		</div>

		<div class="apply-list">
			<me-card title="长护申请记录">
				<div class="apply-record">
					<me-card
						class="apply-card"
						shadow
						v-for="item in applyList"
						:key="item.id"
					>
						<div class="apply-content">
							<div>
								<me-meta label="申请时间：">{{ item.applyTime }}</me-meta>
								<me-meta label="资料初审：">{{
									statusType[item.status]
								}}</me-meta>
								<me-meta label="失能评估：">{{
									item.evaluateOrderStatus || item.evaluateOrderStatus === 0
										? item.evaluateOrderStatus == 2 ||
										  item.evaluateOrderStatus == 3
											? '已评估'
											: '待评估'
										: '-'
								}}</me-meta>
								<me-meta label="失能等级：">{{
									item.careDemandResult || '-'
								}}</me-meta>
								<me-meta label="护理状态：">-</me-meta>
							</div>
							<el-button type="primary" @click="visitDetail(item)">
								查看详情
							</el-button>
						</div>
					</me-card>
				</div>
			</me-card>
			<div class="flex-center">
				<el-button type="primary" plain @click="$router.go(-1)">返回</el-button>
			</div>
		</div>
		<!-- 显示详情 -->
		<el-drawer
			class="me-drawer"
			title="长护申请详情"
			:visible.sync="visibleOrder"
			:withHeader="false"
			size="1150px"
		>
		</el-drawer>
		<!-- 图片预览 -->
		<me-viewer
			:visible.sync="showViewer"
			:list="imgList"
			:currentIndex="currentIndex"
		/>
	</hk-layout>
</template>
<script>
	import {
		sex,
		insurantType,
		statusType,
		evaluationOrderStatus
	} from '@/utils/dictionary.js'
	export default {
		components: {},
		data() {
			return {
				sex,
				insurantType,
				statusType,
				evaluationOrderStatus,
				userId: '',
				idCard: '',
				applyList: [], //申请列表
				user: {},
				srcList: [],
				//查看报告分析
				reportId: '',
				visibleReport: false,
				//查看详情
				visibleOrder: false,
				orderId: '',
				showViewer: false,
				imgList: [],
				currentIndex: 0
			}
		},
		created() {
			this.userId = this.$route.query.id
			this.idCard = this.$route.query.idCard

			this.getInsurantDetail()
			this.getInsurantApplyList()
		},
		methods: {
			/**
			 * 获取保障对象的详情
			 */
			getInsurantDetail() {
				let params = {
					id: this.userId
				}
				this.$api.getInsurantDetail(params).then((data) => {
					if (data.code !== 0) return this.$msg(data.msg, error)
					this.user = data.data
				})
			},
			/**
			 * 获取申请列表
			 */
			getInsurantApplyList() {
				let params = {
					id: this.idCard
				}
				this.$api.getInsurantApplyList(params).then((data) => {
					if (data.code !== 0) return this.$msg(data.msg)
					this.applyList = data.data
				})
			},
			/**
			 * 查看报告
			 */
			showReport(item) {
				this.reportId = item.id
				this.visibleReport = true
			},
			/**
			 * 查看详情
			 */
			visitDetail(val) {
				this.orderId = val.id
				this.visibleOrder = true
			},
			/**
			 * 图片预览
			 */
			viewImg(url, index) {
				this.currentIndex = index || 0
				this.imgList = url
				this.showViewer = true
			}
		}
	}
</script>
<style lang="less" scoped>
	.list-actions {
		display: flex;
		align-items: center;
		margin-bottom: 12px;
		.list-actions-item {
			margin-right: 24px;
			&:last-child {
				margin-left: auto;
				margin-right: 0;
			}
		}
	}
	.me-list-title {
		display: flex;
		justify-content: space-between;
	}
	.apply-list {
		background-color: #fff;
		width: 100%;
		min-height: 100%;
	}
	.apply-record {
		// display: flex;
		// align-items: flex-start;
		.apply-card {
			margin: 0 16px 16px 0;
			width: 100%;
			font-size: 14px;

			.apply-content {
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
			.me-meta {
				margin-bottom: 12px;
			}
		}
	}

	.count-list {
		width: 100%;
		display: flex;
		align-items: flex-start;
		justify-content: flex-start;
		flex-wrap: wrap;
		.count-card {
			padding: 12px;
			width: 120px;
			margin: 0 12px 12px 12px;
			border-radius: 8px;
			background-color: #37c9bc;
			display: flex;
			align-items: center;
			flex-direction: column;
			color: #fff;
			label {
				display: flex;
				margin-bottom: 8px;
				font-size: 13px;
			}
			strong {
				font-size: 30px;
			}
		}
	}

	.pro-tag {
		margin-bottom: 12px;
		.el-tag {
			margin-right: 12px;
		}
	}
	.pro-card {
		max-width: 300px;
		width: 100%;
		height: 200px;
		margin-bottom: 24px;
		padding: 12px;
		border-radius: 8px;
		border: 1px dashed #37c9bc;
		img {
			width: 100%;
			height: 100%;
		}
	}
</style>
