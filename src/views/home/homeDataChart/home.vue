<template>
  <div class="main">
    <div class="chart-row">
      <div class="chart-item">
        <ChartCard title="参保人数据分析">
          <DataChart
            chartType="funnel"
            :data="funnelData"
            :extend="funnelExtend"
          />
        </ChartCard>
      </div>
      <div class="chart-item">
        <ChartCard title="签约机构及护理员统计">
          <div class="bar-list">
            <div class="bar-item">
              <DataChart
                chartType="bar"
                :data="chartData"
                :settings="chartSettings"
                :extend="pgOrderExtend"
              />
            </div>
            <div class="bar-item">
              <DataChart
                chartType="bar"
                :data="chartData1"
                :settings="chartSettings"
                :extend="pgOrderExtend"
              />
            </div>
          </div>
        </ChartCard>
      </div>
    </div>

    <div class="chart-row" style="height:250px">
      <div class="chart-item">
        <ChartCard title="费用分析">
          <div class="circle-box">
            <div class="item">
              <div class="circle" style="border-color: rgb(255, 183, 63)">
                <span class="circle-content">11.00万元</span>
              </div>
              <p>同比10.00%</p>
              <p>总保费</p>
            </div>
            <div class="item">
              <div class="circle" style="border-color: rgb(74, 169, 255)">
                <span class="circle-content">11.00万元</span>
              </div>
              <p>同比10.00%</p>
              <p>总赔付</p>
            </div>
            <div class="item">
              <div class="circle" style="border-color: rgb(67, 209, 187)">
                <span class="circle-content">99.0%</span>
              </div>
              <p>同比10.00%</p>
              <p>理赔率</p>
            </div>
            <div class="item">
              <div class="circle" style="border-color: rgb(74, 169, 255)">
                <span class="circle-content">99.0%</span>
              </div>
              <p>同比10.00%</p>
              <p>赔付率</p>
            </div>
          </div>
        </ChartCard>
      </div>
      <div class="chart-item">
        <ChartCard title="补贴方式人次趋势">
          <DataChart
            chartType="histogram"
            :data="subsidyTypeData"
            :extend="subsidyExtend"
            :settings="{ yAxisName: ['人次'] }"
          />
        </ChartCard>
      </div>
    </div>

    <div class="chart-row" style="height:250px">
      <div class="chart-item">
        <ChartCard title="失能等级人数占比">
          <DataChart
            chartType="ring"
            :data="pgsChartData"
            :settings="pgsChartSettings"
            :extend="pgsExtend"
          />
        </ChartCard>
      </div>
      <div class="chart-item">
        <ChartCard title="补贴费用分析">
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
        <ChartCard title="评估趋势统计">
          <DataChart
            chartType="histogram"
            :data="pgAreaChartData"
            :settings="pgAreaChartSettings"
            :extend="pgAreaHistogramExtend"
          />
        </ChartCard>
      </div>
      <div class="chart-item">
        <ChartCard title="补贴趋势统计">
          <DataChart
            chartType="histogram"
            :data="pgAreaChartData"
            :settings="pgAreaChartSettings"
            :extend="pgAreaHistogramExtend"
          />
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
        year: 2020,
        yearsList: [2019, 2020, 2021],
        area: '全部',
        areaList: ['全部', '大田', '梅列'],
        funnelData: {
          columns: ['label', 'value'],
          rows: [
            { label: '参保人数', value: 100 },
            { label: '申请总人数', value: 75 },
            { label: '评估人数', value: 50 },
            { label: '补贴人数', value: 25 }
          ]
        },
        funnelExtend: {
          legend: {
            top: 50,
            left: 0,
            orient: 'vertical',
            icon: 'roundRect',
            itemGap: 15,
            itemWidth: 14,
            itemHeight: 6,
            textStyle: {
              fontSize: 12,
              rich: {
                name: {
                  width: 55
                }
              }
            }
          },
          series: {
            left: '25%',
            top: 30,
            width: '50%',
            minSize: 100,
            label: {
              show: true,
              position: 'inside',
              fontSize: '14',
              formatter: (d) => {
                var ins = d.data.name + '：' + d.data.value

                return ins
              }
            }
          }
        },
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
          columns: ['label', 'value'],
          rows: [
            { label: '医疗机构', value: 13 },
            { label: '护理院', value: 10 },
            { label: '养老院', value: 8 },
            { label: '社区卫生机构', value: 3 },
            { label: '其他', value: 13 }
          ]
        },
        chartData1: {
          columns: ['label', 'value'],
          rows: [
            { label: '副主任护师', value: 13 },
            { label: '主管护师', value: 10 },
            { label: '护师', value: 8 },
            { label: '护士', value: 3 },
            { label: '其他', value: 13 }
          ]
        },
        chartSettings: {
          dimension: ['label'],
          metrics: ['value']
        },

        // 评估师占比
        pgsChartData: {
          columns: ['abilityLevel', 'count'],
          rows: [
            { abilityLevel: '0级（能力完好）', count: 10 },
            { abilityLevel: '1级（轻度失能）', count: 40 },
            { abilityLevel: '2级（中度失能）', count: 30 },
            { abilityLevel: '3级（重度失能） ', count: 12 },
            { abilityLevel: '4级（极重度失能） ', count: 16 }
          ]
        },
        //评估人数登记占比
        pgrsChartData: {
          // columns: ['职位', '人数'],
          columns: ['abilityLevel', 'count'],
          rows: [
            { abilityLevel: '居家护理金额', count: 10 },
            { abilityLevel: '医养结合机构护理金额', count: 40 },
            { abilityLevel: '养老机构护理金额 ', count: 30 },
            { abilityLevel: '异地补贴金额 ', count: 12 }
          ]
        },

        /* 补贴方式人次趋势 */
        subsidyTypeData: {
          columns: ['label', 'value'],
          rows: [
            {
              label: '居家护理',
              value: 50
            },
            {
              label: '医养结合机构护理',
              value: 30
            },
            {
              label: '养老机构护理',
              value: 40
            },
            {
              label: '异地补贴',
              value: 24
            }
          ]
        },
        subsidyExtend: {
          series: {
            symbol: 'circle',
            symbolSize: 6,
            smooth: false,
            barMaxWidth: 30
          },
          grid: {
            left: 20,
            right: 40,
            bottom: 30,
            top: 40,
            containLabel: true
          },
          icon: 'circle',
          legend: {
            show: false
          },
          yAxis(item) {
            item[0].splitLine = {
              show: false
            }
            item[0].axisLine = {
              show: true,
              lineStyle: {
                color: '#aaa'
              }
            }
            return item
          },
          xAxis: {
            splitLine: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#aaa'
              }
            }
          }
        },

        // 评估订单分布区域统计
        pgAreaChartData: {
          // columns: ['区域', '首次申请', '再次申请', '复评申请'],
          columns: ['label', 'value', 'count'],
          rows: [
            {
              label: '1月',
              value: 139,
              count: 33
            },
            {
              label: '2月',
              value: 149,
              count: 20
            },
            {
              label: '3月',
              value: 99,
              count: 18
            },
            {
              label: '4月',
              value: 200,
              count: 45
            },
            {
              label: '5月',
              value: 50,
              count: 10
            },
            {
              label: '6月',
              value: 120,
              count: 60
            },
            {
              label: '7月',
              value: 250,
              count: 100
            },
            {
              label: '8月',
              value: 139,
              count: 33
            },
            {
              label: '9月',
              value: 156,
              count: 24
            },
            {
              label: '10月',
              value: 88,
              count: 12
            },
            {
              label: '11月',
              value: 240,
              count: 50
            },
            {
              label: '12月',
              value: 286,
              count: 120
            }
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
        ],
        chartRadio: 'home'
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
      this.pgrsExtend.title[0].text = this.pgrsTotal + '万元'
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
  .chart-filters {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .chart-filter-item {
      margin-right: 24px;
      font-size: 14px;
    }
  }
  .bar-list {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    .bar-item {
      height: 100%;
      width: 50%;
      overflow: hidden;
      flex: 1;
    }
  }
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
  .circle-box {
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
    .item {
      .circle {
        width: 100px;
        height: 100px;
        border: solid 5px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      p {
        text-align: center;
        font-size: 12px;
        line-height: 24px;
      }
    }
  }
</style>
