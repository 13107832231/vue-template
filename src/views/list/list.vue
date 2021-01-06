<template>
	<div class="me-list-page">
		<div class="me-filters">
			<div class="me-filter-item">
				<label>申请日期</label>
				<el-date-picker
					v-model="daterange"
					size="small"
					type="daterange"
					value-format="yyyy-MM-dd"
					range-separator="-"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
				>
				</el-date-picker>
			</div>
			<div class="me-filter-item">
				<label>参保人姓名</label>
				<el-input
					v-model="apply.insurantName"
					clearable
					placeholder="请输入参保人姓名"
					size="small"
				></el-input>
			</div>
			<div class="me-filter-item">
				<label>身份证号</label>
				<el-input
					v-model="apply.insurantIdCard"
					clearable
					placeholder="请输入身份证号"
					size="small"
				></el-input>
			</div>
			<div class="me-filter-item">
				<label>状态</label>
				<el-select v-model="apply.status" clearable size="small">
					<el-option
						v-for="(v, k) in statusType"
						:key="k"
						:label="v"
						:value="k"
					>
					</el-option>
				</el-select>
			</div>
			<div class="me-filter-item">
				<label>申请类型</label>
				<el-select v-model="apply.applyType" clearable size="small">
					<el-option v-for="(v, k) in applyType" :key="k" :label="v" :value="k">
					</el-option>
				</el-select>
			</div>
			<div class="me-filter-item">
				<label>医保卡号</label>
				<el-input
					v-model="apply.insurantMedicalCard"
					clearable
					placeholder="请输入医保卡号"
					size="small"
				></el-input>
			</div>
			<div class="filter-actions">
				<el-button size="small" type="primary" @click="searchList">
					查询
				</el-button>
				<el-button size="small" type="primary" plain @click="cleanFilters">
					清空
				</el-button>
			</div>
		</div>
		<div class="me-table-list">
			<div class="me-table-action">
				<el-button size="small" type="primary" @click="addApply">
					新增申请
				</el-button>
			</div>
			<el-table class="me-table" :data="list" size="small" stripe>
				<el-table-column
					width="55"
					type="index"
					align="center"
					:index="indexMethod"
					label="序号"
				></el-table-column>
				<el-table-column
					prop="applyOrderNo"
					label="申请单号"
					show-overflow-tooltip
				></el-table-column>
				<el-table-column
					prop="applyTime"
					label="申请时间"
					show-overflow-tooltip
				></el-table-column>
				<el-table-column
					prop="applyType"
					label="申请类型"
					show-overflow-tooltip
				>
					<template slot-scope="scope">
						<span>{{ applyType[scope.row.applyType] }}</span>
					</template>
				</el-table-column>
				<el-table-column
					prop="insurantName"
					label="参保人姓名"
					show-overflow-tooltip
				>
				</el-table-column>

				<el-table-column
					prop="age"
					label="年龄"
					width="50"
					show-overflow-tooltip
				></el-table-column>
				<el-table-column
					prop="insurantIdCard"
					label="身份证号"
					show-overflow-tooltip
				></el-table-column>
				<el-table-column
					prop="insurantTel"
					label="联系电话"
					show-overflow-tooltip
				></el-table-column>
				<el-table-column
					prop="insurantType"
					label="医保类型"
					show-overflow-tooltip
				>
					<template slot-scope="scope">
						{{ insurantType[scope.row.insurantType] || '-' }}
					</template>
				</el-table-column>
				<el-table-column
					prop="applierName"
					label="代申请人姓名"
					show-overflow-tooltip
				></el-table-column>
				<el-table-column
					prop="applierTel"
					label="联系电话"
					show-overflow-tooltip
				></el-table-column>
				<el-table-column
					prop="relation"
					label="与参保人关系"
					show-overflow-tooltip
				>
					<template slot-scope="scope">
						{{ relationObj[scope.row.relation] || '-' }}
					</template>
				</el-table-column>
				<el-table-column
					prop="status"
					label="状态"
					width="80"
					show-overflow-tooltip
				>
					<template slot-scope="scope">
						{{ statusType[scope.row.status] || '-' }}
					</template>
				</el-table-column>
				<el-table-column label="操作" :width="160" align="center">
					<template slot-scope="scope">
						<div>
							<el-button type="text" @click="showDetail(scope.row)">
								{{ scope.row.status == 0 ? '审核' : '查看' }}
							</el-button>
							<el-button
								type="text"
								@click="orderReapply(scope.row)"
								v-if="scope.row.again === 1"
							>
								重新申请
							</el-button>
						</div>
					</template>
				</el-table-column>
			</el-table>
			<div class="me-table-page">
				<el-pagination
					background
					layout="total, sizes, prev, pager, next, jumper"
					:page-size.sync="size"
					:current-page.sync="page"
					@size-change="handleSizeChange"
					@current-change="getList"
					:total="total"
				>
				</el-pagination>
			</div>
		</div>
		<!-- 新增编辑 -->
		<el-drawer :visible.sync="visibleForm" title="新增申请单" size="1000px">
		</el-drawer>
	</div>
</template>
<script>
	export default {
		components: {},
		data() {
			return {
				daterange: null,
				apply: {
					insurantName: '',
					insurantType: '',
					insurantIdCard: '',
					status: '',
					applyType: ''
				},
				relationObj: {
					1: '本人',
					2: '子女',
					3: '配偶',
					4: '兄弟',
					5: '姐妹',
					6: '其他'
				},
				insurantType: {
					1: '职工医保',
					2: '新农合医保',
					3: '城镇居民基本医疗保险'
				},
				statusType: {
					0: '待审核',
					1: '审核通过',
					2: '审核不通过'
				},
				applyType: {
					1: '首次申请',
					2: '再次申请',
					3: '复评申请'
				},
				loading: false,
				//分页
				page: 0,
				total: 0,
				size: 10,
				list: [],
				visibleForm: false,
				// 再次申请
				orderId: ''
			}
		},
		created() {
			this.getList()
		},
		methods: {
			/**
			 * 获取列表数据
			 */
			getList() {
				this.loading = true
				let parmams = {
					current: this.page,
					size: this.size,
					...this.apply,
					applyTimeStart: this.daterange ? this.daterange[0] : null,
					applyTimeEnd: this.daterange ? this.daterange[1] : null
				}
				this.$api.getApplyList(parmams).then((res) => {
					this.loading = false
					if (res.code !== 0) return this.$msg.info(res.msg)
					this.list = res.data.records
					this.total = +res.data.total
				})
			},
			/**
			 * 分页
			 */
			handleSizeChange() {
				this.page = 1
				this.getList()
			},
			/**
			 * 获取序号
			 */
			indexMethod(index) {
				return index + 1
			},
			/**
			 * 条件查询
			 */
			searchList() {
				this.page = 1
				this.getList()
			},
			/**
			 * 清空搜索条件
			 */
			cleanFilters() {
				this.daterange = null
				this.apply = {
					insurantName: '',
					insurantType: '',
					insurantIdCard: '',
					status: '',
					applyType: ''
				}
			},
			/**
			 * 创建
			 */
			addApply() {
				this.visibleForm = true
			},
			/**
			 * 创建成功回调
			 */
			addSuccess() {
				this.visibleForm = false
				this.orderId = null
				this.getList()
			},
			/**
			 * 取消创建回调
			 */
			cancleApply() {
				this.visibleForm = false
				this.orderId = null
			},
			/**
			 * 查看详情
			 */
			showDetail(row) {
				this.$router.push({
					path: '/list/detail',
					query: {
						id: row.id
					}
				})
			},
			/**
			 * 重新申请
			 */
			orderReapply(row) {
				this.orderId = row.id
				this.visibleForm = true
			}
		}
	}
</script>
