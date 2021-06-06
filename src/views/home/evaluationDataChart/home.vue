<template>
  <div class="main">
    <div class="chart-row">
      <div class="chart-item">
        <ChartCard>
          <div class="data-list-circle">
            <div class="data-row">
              <div
                class="data-item"
                v-for="(item, index) in dataList1"
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
      <div class="chart-item">
        <ChartCard title="评估订单">
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
            chartType="histogram"
            :data="chartData"
            :settings="pgOrderChartSettings"
            :extend="pgOrderExtend"
          />
        </ChartCard>
      </div>
    </div>

    <div class="chart-row" style="height:250px">
      <div class="chart-item">
        <ChartCard title="评估师占比">
          <DataChart
            chartType="ring"
            :data="pgsChartData"
            :settings="pgsChartSettings"
            :extend="pgsExtend"
          />
        </ChartCard>
      </div>
      <div class="chart-item">
        <ChartCard title="评估人数登记占比">
          <DataChart
            chartType="ring"
            :data="pgrsChartData"
            :settings="pgrsChartSettings"
            :extend="pgrsExtend"
          />
        </ChartCard>
      </div>
    </div>

    <div class="chart-row">
      <div class="chart-item">
        <ChartCard title="评估订单分布区域统计">
          <DataChart
            chartType="histogram"
            :data="pgAreaChartData"
            :settings="pgAreaChartSettings"
            :extend="pgAreaHistogramExtend"
          />
        </ChartCard>
      </div>
      <div class="chart-item">
        <ChartCard title="评估费用区域统计">
          <DataChart
            chartType="line"
            :data="pgFeeChartData"
            :settings="pgFeeChartSettings"
            :extend="pgFeeExtend"
          />
        </ChartCard>
      </div>
    </div>
    <div class="chart-row">
      <div class="chart-item">
        <ChartCard title="评估机构人员统计">
          <el-table
            height="250"
            size="small"
            :data="personTableData"
            style="width: 100%"
          >
            <el-table-column prop="evaluateOrg" label="评估机构">
            </el-table-column>
            <el-table-column prop="pgsCount" label="评估师人数">
            </el-table-column>
            <el-table-column prop="pgCount" label="评估次数"> </el-table-column>
            <el-table-column prop="amount" label="评估费用（万元）">
            </el-table-column>
          </el-table>
        </ChartCard>
      </div>
      <div class="chart-item">
        <ChartCard title="评估数据">
          <el-table
            height="250"
            size="small"
            :data="areaTableData"
            style="width: 100%"
          >
            <el-table-column prop="area" label="区县"> </el-table-column>
            <el-table-column prop="pgsCount" label="评估人数">
            </el-table-column>
            <el-table-column prop="pgCount" label="评估次数"> </el-table-column>
            <el-table-column prop="amount" label="复评次数"> </el-table-column>
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
    pgOrderChartSettings,
    pgOrderExtend,
    pgsChartSettings,
    pgsExtend,
    pgrsChartSettings,
    pgrsExtend,
    pgAreaChartSettings,
    pgAreaHistogramExtend,
    pgFeeChartSettings,
    pgFeeExtend
  } from './config'
  export default {
    components: {
      ChartCard,
      DataChart
    },
    data() {
      return {
        // 评估订单配置项
        pgOrderChartSettings,
        pgOrderExtend,
        // 评估师占比配置项
        pgsChartSettings,
        pgsExtend,
        // 评估人数登记占比配置项
        pgrsChartSettings,
        pgrsExtend,
        // 评估订单分布区域统计配置项
        pgAreaChartSettings,
        pgAreaHistogramExtend,
        // 评估费用区域统计配置项
        pgFeeChartSettings,
        pgFeeExtend,
        dataList1: [
          { title: '总评估人数', color: '#4AA9FF', count: 68, unit: '人' },
          { title: '总评估次数', color: '#FFB73F', count: 56000, unit: '次' },
          { title: '评估机构数', color: '#43D1BB', count: 21, unit: '个' },
          { title: '评估师人数', color: '#4ACEFF', count: 21, unit: '人' },
          { title: '报销金额', color: '#FF756E', count: 68.33, unit: '万元' }
        ],
        dataList2: [
          { title: '评估订单数', color: '#43D1BB', count: 68, unit: '单' },
          { title: '待评估', color: '#4ACEFF', count: 52, unit: '单' },
          { title: '已评估', color: '#61DC81', count: 21, unit: '单' },
          { title: '复评评估', color: '#4AA9FF', count: 33, unit: '单' },
          { title: '自费金额', color: '#FFB73F', count: 1.01, unit: '万元' }
        ],
        time: 'week',
        date: '',
        chartData: {
          // columns: ['日期', '首次申请', '再次申请', '复评申请'],
          columns: ['date', 'firstApply', 'againApply', 'reviewApply'],
          rows: [
            { date: '08-10', firstApply: 139, againApply: 33, reviewApply: 35 },
            { date: '08-11', firstApply: 353, againApply: 44, reviewApply: 23 },
            { date: '08-12', firstApply: 292, againApply: 55, reviewApply: 33 },
            { date: '08-13', firstApply: 172, againApply: 54, reviewApply: 21 },
            { date: '08-14', firstApply: 379, againApply: 35, reviewApply: 11 },
            { date: '08-15', firstApply: 459, againApply: 66, reviewApply: 12 },
            { date: '08-16', firstApply: 159, againApply: 77, reviewApply: 28 }
          ]
        },

        // 评估师占比
        pgsChartData: {
          // columns: ['职位', '人数'],
          columns: ['evaluatorType', 'count'],
          rows: [
            { evaluatorType: '能力评估师', count: 40 },
            { evaluatorType: '医疗评估师', count: 30 },
            { evaluatorType: '能力医疗评估师 ', count: 12 }
          ]
        },
        //评估人数登记占比
        pgrsChartData: {
          // columns: ['职位', '人数'],
          columns: ['abilityLevel', 'count'],
          rows: [
            { abilityLevel: '0级（能力完好）', count: 10 },
            { abilityLevel: '1级（轻度失能）', count: 40 },
            { abilityLevel: '2级（中度失能）', count: 30 },
            { abilityLevel: '3级（重度失能） ', count: 12 },
            { abilityLevel: '4级（极重度失能） ', count: 16 }
          ]
        },
        // 评估订单分布区域统计
        pgAreaChartData: {
          // columns: ['区域', '首次申请', '再次申请', '复评申请'],
          columns: ['area', 'firstApply', 'againApply', 'reviewApply'],
          rows: [
            {
              area: '梅列区',
              firstApply: 139,
              againApply: 33,
              reviewApply: 35
            },
            {
              area: '三元区',
              firstApply: 353,
              againApply: 44,
              reviewApply: 23
            },
            { area: '沙县', firstApply: 292, againApply: 55, reviewApply: 33 },
            {
              area: '永安市',
              firstApply: 172,
              againApply: 54,
              reviewApply: 21
            },
            {
              area: '尤溪县',
              firstApply: 379,
              againApply: 35,
              reviewApply: 11
            },
            {
              area: '大田县',
              firstApply: 459,
              againApply: 66,
              reviewApply: 12
            },
            {
              area: '将乐县',
              firstApply: 159,
              againApply: 77,
              reviewApply: 28
            },
            {
              area: '明溪县',
              firstApply: 222,
              againApply: 74,
              reviewApply: 25
            },
            { area: '宁化县', firstApply: 156, againApply: 57, reviewApply: 18 }
          ]
        },
        pgFeeChartData: {
          // columns: ['日期', '首次评估费用', '再次评估费用', '复评评估费用'],
          columns: [
            'date',
            'firstEvaluateFee',
            'againEvaluateFee',
            'reviewEvaluateFee'
          ],
          rows: [
            {
              date: '08-10',
              firstEvaluateFee: 9900,
              againEvaluateFee: 5500,
              reviewEvaluateFee: 3500
            },
            {
              date: '08-11',
              firstEvaluateFee: 8800,
              againEvaluateFee: 4400,
              reviewEvaluateFee: 2300
            },
            {
              date: '08-12',
              firstEvaluateFee: 9800,
              againEvaluateFee: 5500,
              reviewEvaluateFee: 3300
            },
            {
              date: '08-13',
              firstEvaluateFee: 7800,
              againEvaluateFee: 5400,
              reviewEvaluateFee: 2100
            },
            {
              date: '08-14',
              firstEvaluateFee: 9900,
              againEvaluateFee: 3500,
              reviewEvaluateFee: 1100
            },
            {
              date: '08-15',
              firstEvaluateFee: 9700,
              againEvaluateFee: 6600,
              reviewEvaluateFee: 1200
            },
            {
              date: '08-16',
              firstEvaluateFee: 8000,
              againEvaluateFee: 7700,
              reviewEvaluateFee: 2800
            }
          ]
        },
        personTableData: [
          {
            evaluateOrg: '三明评估机构',
            pgsCount: 200,
            pgCount: 100,
            amount: 1000.0
          },
          {
            evaluateOrg: '三明评估机构1',
            pgsCount: 200,
            pgCount: 100,
            amount: 1000.0
          },
          {
            evaluateOrg: '三明评估机构2',
            pgsCount: 200,
            pgCount: 100,
            amount: 1000.0
          },
          {
            evaluateOrg: '三明评估机构3',
            pgsCount: 200,
            pgCount: 100,
            amount: 1000.0
          },
          {
            evaluateOrg: '三明评估机构4',
            pgsCount: 200,
            pgCount: 100,
            amount: 1000.0
          },
          {
            evaluateOrg: '三明评估机构5',
            pgsCount: 200,
            pgCount: 100,
            amount: 1000.0
          }
        ],
        areaTableData: [
          {
            area: '梅列区',
            pgsCount: 200,
            pgCount: 100,
            amount: 1000.0
          },
          {
            area: '梅列区1',
            pgsCount: 200,
            pgCount: 100,
            amount: 1000.0
          },
          {
            area: '梅列区2',
            pgsCount: 200,
            pgCount: 100,
            amount: 1000.0
          },
          {
            area: '梅列区3',
            pgsCount: 200,
            pgCount: 100,
            amount: 1000.0
          },
          {
            area: '梅列区5',
            pgsCount: 200,
            pgCount: 100,
            amount: 1000.0
          },
          {
            area: '梅列区4',
            pgsCount: 200,
            pgCount: 100,
            amount: 1000.0
          }
        ]
      }
    },
    computed: {
      pgsTotal() {
        let total = this.pgsChartData.rows.reduce((a, b) => {
          return a + b.count
        }, 0)
        return total
      },
      pgrsTotal() {
        let total = this.pgrsChartData.rows.reduce((a, b) => {
          return a + b.count
        }, 0)
        return total
      }
    },
    created() {
      this.pgsExtend.title[0].text = this.pgsTotal + '人'
      this.pgrsExtend.title[0].text = this.pgrsTotal + '人'
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
        .data-list-circle {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          .data-row {
            display: flex;
            flex-wrap: wrap;
            .data-item {
              width: 20%;
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
      }
    }
  }
</style>
