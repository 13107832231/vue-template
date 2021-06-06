<template>
  <div class="main">
    <div class="chart-row" style="height:150px">
      <div class="chart-item">
        <div class="data-list">
          <div class="data-row">
            <div
              class="data-item"
              v-for="(item, index) in dataList1"
              :key="index"
            >
              <div class="data-content">
                <div class="count-box">
                  <span class="count">{{ item.count }}</span>
                  <span class="unit">{{ item.unit }}</span>
                </div>
                <el-progress
                  :percentage="item.ratio"
                  :color="item.color"
                ></el-progress>
                <p class="title">{{ item.title }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="chart-item">
        <ChartCard>
          <div class="data-list-circle">
            <div class="data-row">
              <div
                class="data-item"
                v-for="(item, index) in dataList2"
                :key="index"
              >
                <div class="circle" :style="{ 'border-color': item.color }">
                  <div class="count-box">
                    <span class="count">{{ item.count }}</span>
                    <span class="unit">{{ item.unit }}</span>
                  </div>
                </div>
                <p class="title">{{ item.title }}</p>
              </div>
            </div>
          </div>
        </ChartCard>
      </div>
    </div>
    <div class="chart-row">
      <div class="chart-item">
        <ChartCard title="订单数量">
          <template v-slot:header-right>
            <div>
              <el-radio-group
                v-model="time"
                size="small"
                style="margin-right:8px"
                @change="timeChange"
              >
                <el-radio-button label="week">本周</el-radio-button>
                <el-radio-button label="month">本月</el-radio-button>
                <el-radio-button label="year">本年</el-radio-button>
              </el-radio-group>
              <el-date-picker
                size="small"
                v-model="date"
                type="daterange"
                placeholder="选择日期"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </div>
          </template>
          <DataChart
            chartType="line"
            :data="careOrderChartData"
            :settings="careOrderChartSettings"
            :extend="careOrderExtend"
          />
        </ChartCard>
      </div>
      <div class="chart-item">
        <ChartCard title="订单统计与订单金额统计">
          <div class="graph-box">
            <div class="graph-item">
              <DataChart
                chartType="ring"
                :data="orderStatisticsData"
                :settings="orderStatisticsSettings"
                :extend="orderStatisticsExtend"
              />
            </div>
            <div class="graph-item">
              <DataChart
                chartType="ring"
                :data="orderAmountData"
                :settings="orderAmountSettings"
                :extend="orderAmountExtend"
              />
            </div>
          </div>
        </ChartCard>
      </div>
    </div>

    <div class="chart-row">
      <div class="chart-item">
        <ChartCard title="护理订单方式分布区域统计">
          <DataChart
            chartType="histogram"
            :data="careAreaChartData"
            :settings="careAreaChartSettings"
            :extend="careAreaHistogramExtend"
          />
        </ChartCard>
      </div>
      <div class="chart-item">
        <ChartCard title="护理包下单排行前十">
          <el-table
            height="240"
            size="small"
            :data="carePackTableData"
            style="width: 100%"
          >
            <el-table-column prop="carePackName" label="护理包">
            </el-table-column>
            <el-table-column prop="orderCount" label="订单数">
            </el-table-column>
            <el-table-column prop="ratio" label="比例">
              <template slot-scope="scope">
                <el-progress :percentage="scope.row.ratio"></el-progress>
              </template>
            </el-table-column>
          </el-table>
        </ChartCard>
      </div>
    </div>

    <div class="chart-row">
      <div class="chart-item">
        <ChartCard title="护理员职称构成与机构统计">
          <div class="graph-box">
            <div class="graph-item">
              <DataChart
                chartType="ring"
                :data="caregiverProfessionData"
                :settings="caregiverProfessionSettings"
                :extend="caregiverProfessionExtend"
              />
            </div>
            <div class="graph-item">
              <DataChart
                chartType="ring"
                :data="orgStatisticsData"
                :settings="orgStatisticsSettings"
                :extend="orgStatisticsExtend"
              />
            </div>
          </div>
        </ChartCard>
      </div>
      <div class="chart-item">
        <ChartCard title="区县数据统计">
          <el-table
            height="240"
            size="small"
            :data="areaTableData"
            style="width: 100%"
          >
            <el-table-column prop="area" label="区县"> </el-table-column>
            <el-table-column prop="orderCount" label="机构数">
            </el-table-column>
            <el-table-column prop="caregiverCount" label="护理员数">
            </el-table-column>
            <el-table-column prop="orderCount" label="订单数">
            </el-table-column>
            <el-table-column prop="wipeAmount" label="报销（万元）">
            </el-table-column>
            <el-table-column prop="selfAmount" label="自费（万元）">
            </el-table-column>
            <el-table-column prop="receiveRate" label="接单率">
            </el-table-column>
          </el-table>
        </ChartCard>
      </div>
    </div>
  </div>
</template>
<script>
  import ChartCard from '@/views/components/chartCard'
  import DataChart from '@/views/components/dataChart'
  import {
    careOrderChartSettings,
    careOrderExtend,
    careAreaChartSettings,
    careAreaHistogramExtend,
    // 订单统计配置项
    orderStatisticsSettings,
    orderStatisticsExtend,
    // 订单金额统计配置项
    orderAmountSettings,
    orderAmountExtend,
    // 护理员职称构成配置项
    caregiverProfessionSettings,
    caregiverProfessionExtend,
    // 机构统计配置项
    orgStatisticsSettings,
    orgStatisticsExtend
  } from './config'
  export default {
    components: {
      ChartCard,
      DataChart
    },
    data() {
      return {
        // 护理订单数量配置项
        careOrderChartSettings,
        careOrderExtend,

        // 护理订单方式分布区域统计配置项
        careAreaChartSettings,
        careAreaHistogramExtend,
        // 订单统计配置项
        orderStatisticsSettings,
        orderStatisticsExtend,
        // 订单金额统计配置项
        orderAmountSettings,
        orderAmountExtend,
        // 护理员职称构成配置项
        caregiverProfessionSettings,
        caregiverProfessionExtend,
        // 机构统计配置项
        orgStatisticsSettings,
        orgStatisticsExtend,

        dataList1: [
          {
            title: '申请人数',
            color: '#29CCB1',
            count: 438,
            ratio: 20,
            unit: '单'
          },
          {
            title: '参保人数',
            color: '#FFB73F',
            count: 12.34,
            ratio: 40,
            unit: '万元'
          }
        ],
        dataList2: [
          {
            title: '护理总人数',
            color: '#4AA9FF',
            count: 328,
            ratio: 10,
            unit: '人'
          },
          {
            title: '护理包数',
            color: '#FFB73F',
            count: 528,
            ratio: 35,
            unit: '人'
          },
          {
            title: '护理机构数',
            color: '#43D1BB',
            count: 528,
            ratio: 35,
            unit: '人'
          },
          {
            title: '护理员数',
            color: '#4ACEFF',
            count: 528,
            ratio: 35,
            unit: '人'
          }
        ],

        time: 'week',
        date: '',
        // 护理订单数量
        careOrderChartData: {
          // columns: ['日期', '居家护理', '居家补贴', '机构护理', '异地补贴', '设备租赁'],
          columns: [
            'date',
            'homeCare',
            'orgCare',
            'consumableCare',
            'familyCare',
            'equipmentCare'
          ],
          rows: [
            {
              date: '08-10',
              homeCare: 139,
              orgCare: 80,
              consumableCare: 666,
              familyCare: 40,
              equipmentCare: 888
            },
            {
              date: '08-11',
              homeCare: 353,
              orgCare: 90,
              consumableCare: 566,
              familyCare: 50,
              equipmentCare: 897
            },
            {
              date: '08-12',
              homeCare: 292,
              orgCare: 99,
              consumableCare: 386,
              familyCare: 65,
              equipmentCare: 566
            },
            {
              date: '08-13',
              homeCare: 172,
              orgCare: 90,
              consumableCare: 446,
              familyCare: 57,
              equipmentCare: 672
            },
            {
              date: '08-14',
              homeCare: 379,
              orgCare: 97,
              consumableCare: 456,
              familyCare: 56,
              equipmentCare: 641
            },
            {
              date: '08-15',
              homeCare: 459,
              orgCare: 88,
              consumableCare: 466,
              familyCare: 40,
              equipmentCare: 741
            },
            {
              date: '08-16',
              homeCare: 159,
              orgCare: 100,
              consumableCare: 566,
              familyCare: 67,
              equipmentCare: 812
            }
          ]
        },
        // 订单统计
        orderStatisticsData: {
          // columns: ['补贴方式订单', '单数'],
          columns: ['careTypeOrder', 'count'],
          rows: [
            { careTypeOrder: '居家护理订单', count: 100 },
            { careTypeOrder: '机构护理订单', count: 30 },
            { careTypeOrder: '居家补贴订单', count: 30 },
            { careTypeOrder: '设备租赁订单', count: 25 },
            { careTypeOrder: '异地补贴订单', count: 80 }
          ]
        },
        // 订单金额统计
        orderAmountData: {
          // columns: ['补贴方式金额', '金额'],
          columns: ['careTypeAmount', 'count'],
          rows: [
            { careTypeAmount: '居家护理金额', count: 100 },
            { careTypeAmount: '机构护理金额', count: 30 },
            { careTypeAmount: '居家补贴金额', count: 30 },
            { careTypeAmount: '设备租赁金额', count: 25 },
            { careTypeAmount: '异地补贴金额', count: 80 }
          ]
        },
        // 护理员职称构成
        caregiverProfessionData: {
          // columns: ['职称', '人数'],
          columns: ['profession', 'count'],
          rows: [
            { profession: '副主任护师', count: 100 },
            { profession: '主管护师', count: 30 },
            { profession: '护师', count: 30 },
            { profession: '护士', count: 25 },
            { profession: '其他', count: 80 }
          ]
        },

        // 机构统计
        orgStatisticsData: {
          // columns: ['机构', '数量'],
          columns: ['orgName', 'count'],
          rows: [
            { orgName: '护理机构', count: 100 },
            { orgName: '耗材供应商', count: 30 },
            { orgName: '设备租赁商', count: 30 }
          ]
        },
        // 护理订单方式分布区域统计
        careAreaChartData: {
          // columns: ['区域', '居家护理', '机构护理', '居家补贴', '异地补贴', '设备租赁'],
          columns: [
            'area',
            'homeCareNum',
            'orgCare',
            'consumableCareNum',
            'familyCareNum',
            'equipmentCare'
          ],
          rows: [
            {
              area: '梅列区',
              homeCareNum: 666,
              orgCare: 555,
              consumableCareNum: 444,
              familyCareNum: 333,
              equipmentCare: 222
            },
            {
              area: '三元区',
              homeCareNum: 660,
              orgCare: 550,
              consumableCareNum: 440,
              familyCareNum: 330,
              equipmentCare: 220
            },
            {
              area: '沙县',
              homeCareNum: 650,
              orgCare: 540,
              consumableCareNum: 430,
              familyCareNum: 320,
              equipmentCare: 210
            },
            {
              area: '永安市',
              homeCareNum: 670,
              orgCare: 560,
              consumableCareNum: 450,
              familyCareNum: 360,
              equipmentCare: 230
            },
            {
              area: '尤溪县',
              homeCareNum: 680,
              orgCare: 570,
              consumableCareNum: 460,
              familyCareNum: 370,
              equipmentCare: 240
            },
            {
              area: '大田县',
              homeCareNum: 670,
              orgCare: 560,
              consumableCareNum: 450,
              familyCareNum: 360,
              equipmentCare: 230
            },
            {
              area: '将乐县',
              homeCareNum: 670,
              orgCare: 560,
              consumableCareNum: 450,
              familyCareNum: 360,
              equipmentCare: 230
            },
            {
              area: '明溪县',
              homeCareNum: 670,
              orgCare: 560,
              consumableCareNum: 450,
              familyCareNum: 360,
              equipmentCare: 230
            },
            {
              area: '宁化县',
              homeCareNum: 670,
              orgCare: 560,
              consumableCareNum: 450,
              familyCareNum: 360,
              equipmentCare: 230
            }
          ]
        },
        areaTableData: [
          {
            area: '梅列区',
            orgCount: 200,
            caregiverCount: 100,
            orderCount: 1000.0,
            wipeAmount: 500.0,
            selfAmount: 200.0,
            receiveRate: '35.11%'
          },
          {
            area: '梅列区1',
            orgCount: 200,
            caregiverCount: 100,
            orderCount: 1000.0,
            wipeAmount: 500.0,
            selfAmount: 200.0,
            receiveRate: '35.11%'
          },
          {
            area: '梅列区2',
            orgCount: 200,
            caregiverCount: 100,
            orderCount: 1000.0,
            wipeAmount: 500.0,
            selfAmount: 200.0,
            receiveRate: '35.11%'
          },
          {
            area: '梅列区3',
            orgCount: 200,
            caregiverCount: 100,
            orderCount: 1000.0,
            wipeAmount: 500.0,
            selfAmount: 200.0,
            receiveRate: '35.11%'
          },
          {
            area: '梅列区5',
            orgCount: 200,
            caregiverCount: 100,
            orderCount: 1000.0,
            wipeAmount: 500.0,
            selfAmount: 200.0,
            receiveRate: '35.11%'
          },
          {
            area: '梅列区4',
            orgCount: 200,
            caregiverCount: 100,
            orderCount: 1000.0,
            wipeAmount: 500.0,
            selfAmount: 200.0,
            receiveRate: '35.11%'
          }
        ],
        carePackTableData: [
          { carePackName: '护理包a', orderCount: 123, ratio: 35 },
          { carePackName: '护理包b', orderCount: 123, ratio: 25 },
          { carePackName: '护理包c', orderCount: 123, ratio: 40 },
          { carePackName: '护理包d', orderCount: 123, ratio: 40 },
          { carePackName: '护理包e', orderCount: 123, ratio: 40 },
          { carePackName: '护理包f', orderCount: 123, ratio: 40 }
        ]
      }
    },
    computed: {
      orderAmountTotal() {
        let total = this.orderAmountData.rows.reduce((a, b) => {
          return a + b.count
        }, 0)
        return total
      },
      orderStatisticsTotal() {
        let total = this.orderStatisticsData.rows.reduce((a, b) => {
          return a + b.count
        }, 0)
        return total
      },
      caregiverProfessionTotal() {
        let total = this.caregiverProfessionData.rows.reduce((a, b) => {
          return a + b.count
        }, 0)
        return total
      },
      orgStatisticsTotal() {
        let total = this.orgStatisticsData.rows.reduce((a, b) => {
          return a + b.count
        }, 0)
        return total
      }
    },
    created() {
      this.caregiverProfessionExtend.title[0].text =
        this.caregiverProfessionTotal + '人'
      this.orgStatisticsExtend.title[0].text = this.orgStatisticsTotal + '个'
      this.orderAmountExtend.title[0].text = this.orderAmountTotal + '万元'
      this.orderStatisticsExtend.title[0].text =
        this.orderStatisticsTotal + '单'
      this.timeChange('week')
    },
    methods: {
      timeChange(value) {
        //获取本周、本月、今年
        const startDate = this.$dayjs().startOf(value)
        const endDate = this.$dayjs().endOf(value)
        this.date = [startDate, endDate]
      }
    }
  }
</script>
<style lang="less" scoped>
  .main {
    width: 100%;
    .chart-row {
      width: 100%;
      height: 300px;
      display: flex;
      padding-bottom: 18px;
      .chart-item:nth-of-type(2n-1) {
        padding-right: 8px;
      }
      .chart-item:nth-of-type(2n) {
        padding-left: 8px;
      }
      .chart-item {
        width: 50%;
        height: 100%;
        .data-list {
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: space-between;
          .data-row {
            display: flex;
            flex-wrap: wrap;
            .data-item:nth-of-type(2n-1) {
              padding-right: 8px;
            }
            .data-item:nth-of-type(2n) {
              padding-left: 8px;
            }
            .data-item {
              height: 134px;
              flex: 1;
              .data-content {
                height: 100%;
                padding: 0px 28px;
                background-color: #fff;
                border-radius: 5px;
                box-shadow: 0px 3px 10px 0px #e4ebe9;
                display: flex;
                flex-direction: column;
                justify-content: center;
                // align-items: center;
                .count {
                  font-size: 20px;
                  font-weight: bold;
                }
                .unit {
                  font-size: 12px;
                  color: #999;
                }
                .title {
                  font-size: 14px;
                }
              }
            }
          }
        }
        .data-list-circle {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          .data-row {
            display: flex;
            flex-wrap: wrap;
            .data-item {
              width: 25%;
              display: flex;
              flex-direction: column;
              align-items: center;
              .title {
                margin-top: 18px;
                font-size: 14px;
              }
              .circle {
                width: 72px;
                height: 72px;
                border-radius: 50%;
                border: 3px solid red;
                position: relative;
                .count-box {
                  position: absolute;
                  left: 50%;
                  top: 50%;
                  transform: translate(-50%, -50%);
                  .count {
                    font-size: 16px;
                    font-weight: bold;
                  }
                  .unit {
                    font-size: 12px;
                    color: #999;
                  }
                }
              }
            }
          }
        }

        .graph-box {
          height: 100%;
          display: flex;
          .graph-item {
            flex: 1;
          }
        }
      }
    }
  }
</style>
