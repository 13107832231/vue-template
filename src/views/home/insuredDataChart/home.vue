<template>
  <div class="main">
    <div class="chart-row">
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
          <div class="data-row">
            <div
              class="data-item"
              v-for="(item, index) in dataList2"
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
        <ChartCard title="申请人次趋势">
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
            :data="sqOrderChartData"
            :settings="sqOrderChartSettings"
            :extend="sqOrderExtend"
          />
        </ChartCard>
      </div>
    </div>

    <div class="chart-row">
      <div class="chart-item">
        <ChartCard title="保障对象参保类型占比">
          <DataChart
            chartType="ring"
            :data="cbChartData"
            :settings="cbChartSettings"
            :extend="cbExtend"
          />
        </ChartCard>
      </div>
      <div class="chart-item">
        <ChartCard title="保障对象年龄、性别分布占比">
          <div class="graph-box">
            <div class="graph-item">
              <DataChart
                chartType="pie"
                :data="ageChartData"
                :settings="ageChartSettings"
                :extend="ageExtend"
              />
            </div>
            <div class="graph-item">
              <DataChart
                chartType="ring"
                :data="sexChartData"
                :settings="sexChartSettings"
                :extend="sexExtend"
              />
            </div>
          </div>
        </ChartCard>
      </div>
    </div>

    <div class="chart-row">
      <div class="chart-item">
        <ChartCard title="保障对象失能等级占比">
          <DataChart
            chartType="ring"
            :data="pgrsChartData"
            :settings="pgrsChartSettings"
            :extend="pgrsExtend"
          />
        </ChartCard>
      </div>
      <div class="chart-item">
        <ChartCard title="保障对象分布区域统计">
          <DataChart
            chartType="histogram"
            :data="insuredAreaChartData"
            :settings="insuredAreaChartSettings"
            :extend="insuredAreaHistogramExtend"
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
    sqOrderChartSettings,
    sqOrderExtend,
    cbChartSettings,
    cbExtend,
    pgrsChartSettings,
    pgrsExtend,
    insuredAreaChartSettings,
    insuredAreaHistogramExtend,
    // 保障对象年龄分布占比配置项
    ageChartSettings,
    ageExtend,
    // 保障对象性别分布占比配置项
    sexChartSettings,
    sexExtend
  } from './config'
  export default {
    components: {
      ChartCard,
      DataChart
    },
    data() {
      return {
        // 申请人次趋势配置项
        sqOrderChartSettings,
        sqOrderExtend,
        // 保障对象参保类型占比配置项
        cbChartSettings,
        cbExtend,
        // 保障对象失能等级占比配置项
        pgrsChartSettings,
        pgrsExtend,
        // 保障对象分布区域统计配置项
        insuredAreaChartSettings,
        insuredAreaHistogramExtend,
        // 保障对象年龄分布占比配置项
        ageChartSettings,
        ageExtend,
        // 保障对象性别分布占比配置项
        sexChartSettings,
        sexExtend,

        dataList1: [
          {
            title: '申请人数',
            color: '#29CCB1',
            count: 438,
            ratio: 20,
            unit: '人'
          },
          {
            title: '参保人数',
            color: '#FFB73F',
            count: 12.34,
            ratio: 40,
            unit: '万人'
          }
        ],
        dataList2: [
          {
            title: '评估机构数',
            color: '#FF756E',
            count: 328,
            ratio: 10,
            unit: '人'
          },
          {
            title: '评估师人数',
            color: '#5EB1FB',
            count: 528,
            ratio: 35,
            unit: '人'
          }
        ],

        time: 'week',
        date: '',
        sqOrderChartData: {
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

        // 保障对象参保类型占比
        cbChartData: {
          // columns: ['职位', '人数'],
          columns: ['insuredType', 'count'],
          rows: [
            { insuredType: '职工医保', count: 40 },
            { insuredType: '新农合医保', count: 30 },
            { insuredType: '城乡居民基本医疗保险 ', count: 12 }
          ]
        },
        // 保障对象年龄分布占比
        ageChartData: {
          // columns: ['年龄', '人数'],
          columns: ['age', 'count'],
          rows: [
            { age: '60-69周岁', count: 100 },
            { age: '70-79周岁', count: 30 },
            { age: '80-99周岁', count: 30 },
            { age: '其他', count: 25 }
          ]
        },
        // 保障对象性别分布占比
        sexChartData: {
          // columns: ['性别', '人数'],
          columns: ['sex', 'count'],
          rows: [
            { sex: '男', count: 1000 },
            { sex: '女', count: 300 }
          ]
        },

        //保障对象失能等级占比
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
        // 保障对象分布区域统计
        insuredAreaChartData: {
          // columns: ['区域', '参保人数', '人数申请', '失能人数'],
          columns: ['area', 'insuredNum', 'applyNum', 'disabilityNum'],
          rows: [
            {
              area: '梅列区',
              insuredNum: 139,
              applyNum: 33,
              disabilityNum: 35
            },
            {
              area: '三元区',
              insuredNum: 353,
              applyNum: 44,
              disabilityNum: 23
            },
            { area: '沙县', insuredNum: 292, applyNum: 55, disabilityNum: 33 },
            {
              area: '永安市',
              insuredNum: 172,
              applyNum: 54,
              disabilityNum: 21
            },
            {
              area: '尤溪县',
              insuredNum: 379,
              applyNum: 35,
              disabilityNum: 11
            },
            {
              area: '大田县',
              insuredNum: 459,
              applyNum: 66,
              disabilityNum: 12
            },
            {
              area: '将乐县',
              insuredNum: 159,
              applyNum: 77,
              disabilityNum: 28
            },
            {
              area: '明溪县',
              insuredNum: 222,
              applyNum: 74,
              disabilityNum: 25
            },
            { area: '宁化县', insuredNum: 156, applyNum: 57, disabilityNum: 18 }
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
        }
      }
    },
    computed: {
      pgsTotal() {
        let total = this.cbChartData.rows.reduce((a, b) => {
          return a + b.count
        }, 0)
        return total
      },
      pgrsTotal() {
        let total = this.pgrsChartData.rows.reduce((a, b) => {
          return a + b.count
        }, 0)
        return total
      },
      sexTotal() {
        let total = this.sexChartData.rows.reduce((a, b) => {
          return a + b.count
        }, 0)
        return total
      }
    },
    created() {
      this.cbExtend.title[0].text = this.pgsTotal + '人'
      this.pgrsExtend.title[0].text = this.pgrsTotal + '人'
      this.sexExtend.title[0].text = this.sexTotal + '人'
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
        flex: 1;
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
