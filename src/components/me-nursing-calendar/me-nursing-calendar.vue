<template>
	<div class="container">
		<div class="calendar-header">
			<i @click="preMonth" class="el-icon-arrow-left btn"> </i>
			<span class="title">{{ title }}</span>
			<i @click="nextMonth" class="el-icon-arrow-right btn"> </i>
		</div>
		<el-calendar ref="meCalendar" class="me-calendar" v-model="selectDate">
			<!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
			<template slot="dateCell" slot-scope="{ date, data }">
				<p>
					{{
						data.day
							.split('-')
							.slice(2)
							.join('-')
					}}

					<span
						class="dots"
						:style="{
							backgroundColor: isOverTime(data.day) ? '#fc4f25' : '#20b18a'
						}"
						v-if="markData.hasOwnProperty(data.day)"
					></span>
				</p>
			</template>
		</el-calendar>
		<div class="date-slot" v-if="markData[selectDate]">
			<el-table
				class="me-table selection-hide"
				:data="markData[selectDate]"
				size="small"
				stripe
				border
			>
				<el-table-column
					width="55"
					type="index"
					align="center"
					:index="indexMethod"
					label="序号"
				></el-table-column>
				<el-table-column
					prop="careItemNo"
					label="项目编号"
					show-overflow-tooltip
				></el-table-column>
				<el-table-column prop="typeName" label="项目分类" show-overflow-tooltip>
				</el-table-column>

				<el-table-column prop="name" label="项目名称" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="count" label="次数" show-overflow-tooltip>
				</el-table-column>
			</el-table>
		</div>
		<div v-else class="planNull">暂无护理计划</div>
	</div>
</template>
<script>
	// import * as datePanel from 'element-ui/packages/date-picker/src/panel/date.vue'
	export default {
		name: 'MeNursingCalendar',
		props: {
			careOrderDetail: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		data() {
			return {
				title: '',
				selectDate: '',
				markData: [],
				dailyCareServiceRecords: []
			}
		},
		mounted() {
			this.i18nDate()
		},
		watch: {
			selectDate: {
				handler(val) {
					if (val) {
						this.selectDate = this.$dayjs(val).format('YYYY-MM-DD')
						this.$nextTick(() => {
							this.i18nDate()
						})
					}
				}
			},
			careOrderDetail: {
				handler(val) {
					if (val && val.carePlan && val.carePlan.dailyCareServiceRecords) {
						this.selectDate = this.$dayjs(val.carePlan.startTime).format(
							'YYYY-MM-DD'
						)
						let markData = {}
						val.carePlan.dailyCareServiceRecords.forEach((item) => {
							if (item.day && item.plan.length) markData[item.day] = []
							item.plan.forEach((planItem) => {
								planItem.careServiceRecordItems.forEach((taskItem) => {
									const matchIndex = markData[item.day].findIndex(
										(target) =>
											target.carePackageItemId == taskItem.carePackageItemId
									)
									if (matchIndex != -1) {
										markData[item.day][matchIndex].count =
											markData[item.day][matchIndex].count + taskItem.count
									} else {
										markData[item.day].push(taskItem)
									}
								})
							})
						})
						this.markData = markData
					}
				},
				immediate: true
			}
		},
		methods: {
			isOverTime(date) {
				//标记的时间是否大于当前天时间
				return this.$dayjs(date).valueOf() > this.$dayjs().valueOf()
			},
			i18nDate() {
				this.title = this.$refs.meCalendar.i18nDate
			},
			preMonth() {
				// 上一月
				this.$refs.meCalendar.selectDate('prev-month')
				this.$nextTick(() => {
					this.i18nDate()
				})
			},
			nextMonth() {
				// 下一月
				this.$refs.meCalendar.selectDate('next-month')
				this.$nextTick(() => {
					this.i18nDate()
				})
			},
			/**
			 * 获取序号
			 */
			indexMethod(index) {
				return index + 1
			}
		}
	}
</script>
<style lang="less" scoped>
	.container {
		width: 100%;
		.planNull {
			padding: 30px;
			text-align: center;
			background-color: #fff;
			color: #999;
		}
		.calendar-header {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			height: 60px;
			background-color: white;
			border-bottom: 1px solid#EBEEF5;
			.title {
				font-size: 18px;
				padding: 0px 10px;
			}
			.btn {
				cursor: pointer;
				padding: 10px;
			}
		}
	}
	.date-slot {
		padding: 0 20px;
	}
</style>
<style lang="less">
	.me-calendar {
		.el-calendar__header {
			display: none;
			// position: relative;
			// .el-calendar__title {
			//   position: absolute;
			//   top: 50%;
			//   left: 50%;
			//   transform: translate(-50%, -50%);
			// }
		}
		.el-calendar-table {
			thead {
				th {
					font-size: 14px;
				}
			}
			td {
				.el-calendar-day {
					height: 2.5rem;
					font-size: 14px;
				}
				&.is-selected {
					background-color: #3ad6ac;
					color: #fff;
					.el-calendar-day {
						color: #fff;
					}

					&:hover {
						background-color: #3ad6ac;
						.el-calendar-day {
							background-color: #3ad6ac;
						}
					}
				}

				&.is-today {
					color: #3ad6ac;
				}
			}
		}

		.dots {
			width: 8px;
			height: 8px;
			border-radius: 50%;
			display: inline-block;
		}
	}
</style>
