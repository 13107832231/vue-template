<template>
  <div class="main">
    <div class="chart-filters">
      <div class="chart-filter-item">
        <label>时间：</label>
        <el-select v-model="year" placeholder="" size="small">
          <el-option
            v-for="item in yearsList"
            :label="item"
            :value="item"
            :key="item"
            >{{ item }}</el-option
          >
        </el-select>
      </div>
      <div class="chart-filter-item">
        <label>区县：</label>
        <el-select v-model="area" placeholder="" size="small">
          <el-option
            v-for="item in areaList"
            :label="item"
            :value="item"
            :key="item"
            >{{ item }}</el-option
          >
        </el-select>
      </div>
      <div class="chart-filter-item">
        <el-radio-group size="small" v-model="chartRadio">
          <el-radio-button label="home">首页</el-radio-button>
          <el-radio-button label="insured">保障对象分析</el-radio-button>
          <el-radio-button label="evaluation">评估业务分析</el-radio-button>
          <el-radio-button label="careBusiness">护理业务分析</el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <home-data-chart v-if="chartRadio === 'home'" />
    <insured-data-chart v-if="chartRadio === 'insured'" />
    <evaluation-data-chart v-if="chartRadio === 'evaluation'" />
    <care-business-data-chart v-if="chartRadio === 'careBusiness'" />
  </div>
</template>
<script>
  import ChartCard from '@/views/components/chartCard'
  import DataChart from '@/views/components/dataChart'
  import HomeDataChart from './homeDataChart/home.vue'
  import InsuredDataChart from './insuredDataChart/home.vue'
  import EvaluationDataChart from './evaluationDataChart/home.vue'
  import CareBusinessDataChart from './careBusinessDataChart/home.vue'
  export default {
    components: {
      ChartCard,
      DataChart,
      HomeDataChart,
      InsuredDataChart,
      EvaluationDataChart,
      CareBusinessDataChart
    },
    data() {
      return {
        year: 2020,
        yearsList: [2019, 2020, 2021],
        area: '全部',
        areaList: ['全部', '大田', '梅列'],
        chartRadio: 'home'
      }
    },

    created() {},
    methods: {}
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
